---
title: "Claude Computer Use: I Gave Claude Eyes and Let It Browse the Web"
date: 2026-05-30T08:00:00
categories: ["ai"]
tags: ["AI", "Claude", "Computer Use", "Browser Automation", "Python", "Playwright"]
summary: "I stopped writing CSS selectors. Now I take a screenshot and let Claude figure out what to click. Here's the real implementation of a Claude Computer Use browser agent — the interaction loop, working Python code with Playwright, and an honest breakdown of when it's magic vs. when to stick with regular APIs."
toc: true
comments: true
image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&auto=format&fit=crop&q=80"
imageAlt: "A web browser displayed on a screen — the viewport Claude sees when you give it eyes"
---

Previous posts in this series covered [tool use](/en/ai/building-ai-agents-with-claude-tool-use) (giving Claude APIs to call) and [multi-agent systems](/en/ai/multi-agent-systems-with-claude-orchestrator-worker) (orchestrating specialist agents in parallel). Both of those approaches follow the same fundamental model: you write code that defines *what tools exist*, and Claude decides *when to call them*.

This post is different.

**Computer Use gives Claude eyes.** Instead of calling a function you've wired up, Claude looks at a screenshot of an actual browser window and decides what to click, what to type, and where to navigate — exactly the way a human would. No CSS selectors. No XPath. No API client. Just a screenshot and an instruction.

I want to show you how this works, give you real code you can run today, and be honest about where this changes everything vs. where you should absolutely still use regular APIs.

<img src="https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&auto=format&fit=crop&q=80" alt="A web browser on a modern display — what the browser agent sees on each step" />

## Why This Is a Different Paradigm

All the Claude tool use patterns I've written about share a structural assumption: **the world exposes an interface you can describe upfront**. You write a JSON schema for each tool. You give Claude a list. Claude picks tools and calls them.

That assumption breaks down constantly in real work:

- The admin dashboard your company uses has no API. It has a UI.
- You want to verify a form submission actually worked — not just that the POST request returned 200.
- You're automating something on a site you don't control, and the underlying API is undocumented or rate-limited.
- You need to test UI flows the way a user would experience them, not the way your API tests think they would.

Computer Use handles all of these. It doesn't need an API. It needs a screen.

## The Interaction Loop

The mental model is simple:

```
1. Take a screenshot of the current browser state
2. Send the screenshot + task to Claude
3. Claude responds with an action (click, type, scroll, navigate…)
4. Execute the action
5. Take a new screenshot
6. Send the screenshot back to Claude
7. Repeat until Claude says "done"
```

Each screenshot is a fresh observation. Each action is a step toward the goal. The whole thing is a conversation where half the messages are images.

Here's the full implementation. We'll use **Playwright** as the browser driver and the **Anthropic Python SDK** for Claude.

## Setup

```bash
pip install anthropic playwright
playwright install chromium
```

## The Core Agent

Let's start with the agent structure, then build up the pieces:

```python
import anthropic
import base64
import json
from playwright.sync_api import sync_playwright, Page

client = anthropic.Anthropic()

BROWSER_SYSTEM = """
You are a browser automation agent. You control a Chromium browser to complete tasks.

On each step you receive:
- The current URL
- A screenshot of the current page

You respond with ONE of the following:

1. A JSON action object:
   {"action": "click", "selector": "CSS selector or descriptive text", "description": "why"}
   {"action": "type", "selector": "CSS selector or descriptive text", "text": "text to type", "description": "why"}
   {"action": "navigate", "url": "https://...", "description": "why"}
   {"action": "scroll", "direction": "down", "description": "why"}
   {"action": "press", "key": "Enter", "description": "why"}

2. If the task is complete:
   DONE: <summary of what was accomplished>

3. If the task is impossible or you're stuck:
   STUCK: <explanation of why you can't proceed>

Rules:
- Prefer clicking visible elements. Describe what you see when choosing selectors.
- Never fabricate results. If you can't confirm something from the screenshot, say so.
- If a page is loading, scroll down to see if more content loaded.
- Be specific about selectors — use text content, ARIA labels, or visible identifiers.
"""


def screenshot_b64(page: Page) -> str:
    return base64.standard_b64encode(page.screenshot()).decode()


def execute_action(page: Page, action: dict) -> str:
    kind = action.get("action")

    if kind == "click":
        try:
            page.click(action["selector"], timeout=5000)
            return f"Clicked: {action['selector']}"
        except Exception:
            # Fall back to trying the text as visible content
            page.get_by_text(action["selector"]).first.click()
            return f"Clicked by text: {action['selector']}"

    if kind == "type":
        page.fill(action["selector"], action["text"])
        return f"Typed into: {action['selector']}"

    if kind == "navigate":
        page.goto(action["url"])
        page.wait_for_load_state("networkidle", timeout=10000)
        return f"Navigated to: {action['url']}"

    if kind == "scroll":
        direction = action.get("direction", "down")
        page.keyboard.press("PageDown" if direction == "down" else "PageUp")
        return f"Scrolled {direction}"

    if kind == "press":
        page.keyboard.press(action["key"])
        return f"Pressed: {action['key']}"

    return f"Unknown action: {kind}"


def run_browser_agent(task: str, start_url: str, max_steps: int = 20) -> str:
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 800})
        page.goto(start_url)
        page.wait_for_load_state("networkidle", timeout=10000)

        messages = []

        for step in range(max_steps):
            shot = screenshot_b64(page)
            current_url = page.url

            if step == 0:
                user_content = [
                    {"type": "text", "text": f"Task: {task}\n\nCurrent URL: {current_url}\n\nHere is the current browser state:"},
                    {"type": "image", "source": {"type": "base64", "media_type": "image/png", "data": shot}},
                    {"type": "text", "text": "What is your first action?"},
                ]
            else:
                user_content = [
                    {"type": "text", "text": f"Action executed. Current URL: {current_url}\n\nUpdated browser state:"},
                    {"type": "image", "source": {"type": "base64", "media_type": "image/png", "data": shot}},
                    {"type": "text", "text": "What is your next action?"},
                ]

            messages.append({"role": "user", "content": user_content})

            response = client.messages.create(
                model="claude-opus-4-8",
                max_tokens=512,
                system=BROWSER_SYSTEM,
                messages=messages,
            )

            response_text = response.content[0].text.strip()
            messages.append({"role": "assistant", "content": response_text})

            print(f"Step {step + 1}: {response_text[:120]}")

            if response_text.startswith("DONE:"):
                browser.close()
                return response_text[5:].strip()

            if response_text.startswith("STUCK:"):
                browser.close()
                return f"Agent stuck: {response_text[6:].strip()}"

            # Parse and execute the action
            try:
                action = json.loads(response_text)
                result = execute_action(page, action)
                print(f"  → {result}")
                page.wait_for_timeout(500)  # brief pause for page updates
            except json.JSONDecodeError:
                print(f"  → Could not parse action, continuing...")

        browser.close()
        return "Max steps reached without completion."
```

## Running It

```python
if __name__ == "__main__":
    result = run_browser_agent(
        task="Find the current weather in Ho Chi Minh City and tell me the temperature.",
        start_url="https://www.google.com",
    )
    print(f"\nResult: {result}")
```

Output:
```
Step 1: {"action": "type", "selector": "textarea[name='q']", "text": "weather Ho Chi Minh City", "description": "Search for weather"}
  → Typed into: textarea[name='q']
Step 2: {"action": "press", "key": "Enter", "description": "Submit search"}
  → Pressed: Enter
Step 3: DONE: The current temperature in Ho Chi Minh City is 34°C (93°F) with partly cloudy skies.
```

Three steps. No scraper code. No API key for a weather service. Claude just read the page.

<img src="https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1200&auto=format&fit=crop&q=80" alt="Developer writing Python code at a laptop — building the browser agent loop step by step" />

## A More Useful Example: Automating a Legacy Dashboard

Weather lookups are a toy. Let me show you the actual use case that made me take this seriously.

I manage a project that uses an internal deployment dashboard — old enterprise software, no API, mandatory for our workflow. Every Friday I was manually clicking through four screens to generate a weekly status report.

Here's the agent I wrote:

```python
def weekly_status_report(dashboard_url: str, credentials: dict) -> str:
    """Navigate the legacy dashboard and extract the weekly report."""
    
    task = f"""
    Log in to the dashboard with username '{credentials["username"]}' 
    and password '{credentials["password"]}'.
    
    Then navigate to: Reports → Weekly Summary → Current Week.
    
    Extract the following data from the report page:
    - Total deployments this week
    - Failed deployments (count and names)
    - Average deployment duration
    - Any alerts or warnings shown
    
    Return the data as a structured summary.
    """
    
    return run_browser_agent(task, dashboard_url, max_steps=30)
```

This replaced 15 minutes of Friday clicking. The agent handles login, navigates three nested menus, reads a table, and returns structured text I can paste directly into my weekly update.

The dashboard has never had an API. It never will. Computer Use is the only way.

## Comparing Cost and Speed: The Honest Numbers

Before you rewrite everything to use Computer Use, here's what you're signing up for:

| | Tool Use | Computer Use |
|---|---|---|
| **Latency per step** | ~0.5–2s | ~3–8s |
| **Cost per task** | Low (text only) | Higher (images are large) |
| **Reliability** | Deterministic (API responses) | Variable (depends on visual state) |
| **Setup required** | API client + tool schema | Browser + screenshot loop |
| **Works on** | APIs with documentation | Any UI |

A task that takes 5 tool calls (fast, cheap) might take 10–15 Computer Use steps (slower, more expensive). For a workflow I run once a day, that's fine. For something running 10,000 times a day, it's not.

**The decision rule I use:**

1. Does the thing I need have an API? **Use tool use.** Always faster, always cheaper, always more reliable.
2. Is there no API, but I only need to do this occasionally? **Computer Use is fine.**
3. Is there no API, and I need to do this at scale? **Consider building a scraper or asking for API access.** Computer Use isn't a substitute for infrastructure.

## Patterns That Actually Work

After running this for a few months, here are the patterns that matter:

**Keep the message history.** The agent needs to see what it's already tried. Don't create a new conversation on each step — the `messages` list accumulates context. Claude uses prior screenshots to understand navigation state.

**Use Claude Opus.** I've tested this with Sonnet and Haiku. Opus 4.8 (with the 2,576-pixel vision improvements in recent releases) is dramatically better at reading small UI elements, understanding layout, and recovering from unexpected states. Downgrading models here costs you reliability, not just quality.

**Always wait for load state.** `page.wait_for_load_state("networkidle")` after navigation is essential. Claude will misread a half-loaded page and take the wrong action. The 500ms pause after actions (`page.wait_for_timeout(500)`) handles page updates that aren't full navigations.

**Cap max steps and handle STUCK explicitly.** Some pages are genuinely inaccessible (login walls, CAPTCHAs, JavaScript that doesn't render in headless mode). Build a ceiling and a graceful failure path. Don't let the agent spin forever on an impossible task.

**Run headless for production, headed for debugging.** Change `headless=True` to `headless=False` when something isn't working. Watching Claude navigate in real time tells you immediately where the agent is confused.

## Where This Fits in the Agent Stack

After building with tool use, multi-agent systems, and now Computer Use, here's the mental model I've settled on:

- **Tool use** → structured data, APIs, programmatic interfaces. Fast, reliable, should be your default.
- **Multi-agent orchestration** → complex tasks with independent domains that benefit from specialization. Build when a single agent can't hold enough depth.
- **Computer Use** → the last resort that actually works. When there's no API, no clean interface, just a screen.

They're not competing patterns. Real automation pipelines use all three. An orchestrator might use tool use to call your own APIs, spin up specialist agents for different analysis domains, and hand off to a Computer Use agent when the only way to get one piece of data is to log into a 2009-era dashboard.

## Getting Started

If you want to try this today:

1. Install Playwright and run the basic agent against a simple task (Google search, Wikipedia navigation).
2. Watch it fail a few times in headed mode — this is the fastest way to understand what Claude can and can't see.
3. Tune the system prompt based on what you observe. Claude's visual reasoning is good, but your prompt shapes how it describes selectors and when it decides it's done.

The thing that surprised me most: Computer Use doesn't feel like writing automation code. It feels like writing a task description for a junior developer and watching them figure it out. The failures are human failures (misread a label, clicked the wrong button, didn't scroll to see more content) rather than brittle failures (selector changed, API endpoint moved).

Whether that's a feature or a bug depends on your use case. For mine, it's been a net positive. The weekly dashboard automation has run without a code change for eleven weeks, through three UI updates that would have broken any hand-written scraper.

---

*This is the fourth post in an informal series on building things with Claude. Previous posts: [tool use basics](/en/ai/building-ai-agents-with-claude-tool-use), [Claude Code custom skills](/en/ai/claude-code-skills-build-your-own-slash-commands), and [multi-agent orchestration](/en/ai/multi-agent-systems-with-claude-orchestrator-worker). Next up: memory and persistence — what happens when you want your agent to remember things across sessions.*
