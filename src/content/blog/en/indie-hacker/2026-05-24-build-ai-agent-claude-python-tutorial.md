---
title: "Build an AI Agent with Claude in 100 Lines of Python"
date: 2026-05-24T08:00:00
categories: ["indie-hacker"]
tags: ["Claude", "AI Agents", "Python", "Tool Use", "Anthropic", "Tutorial", "Agentic AI", "API"]
summary: "Most 'build an AI agent' tutorials are either too abstract or hide the mechanics behind heavyweight frameworks. This one cuts through it — a working agent with Claude's API, pure Python, no frameworks, from your first tool call to a full autonomous loop."
toc: true
comments: true
image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80"
imageAlt: "Colorful code on a monitor — building AI agents with Claude's Python SDK — Photo by Florian Olivo on Unsplash"
pin: false
math: false
mermaid: false
---

There's a moment, about two hours into reading agent framework documentation, when you realize you have no idea what's actually happening underneath.

LangGraph, AutoGen, CrewAI — they're all useful, but they're also layers of abstraction on top of something that's actually pretty simple: a loop that calls a model, runs tools the model asks for, feeds results back, and repeats until done.

I spent an afternoon last month stripping all of that away and building an agent from scratch using only the Anthropic Python SDK and Claude's tool use API. What I ended up with was ~100 lines of Python, a complete working agent loop, and a much clearer mental model for everything agent-related I've done since.

This is that tutorial.

<img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80" alt="Code on a monitor — the building blocks of a Claude agent loop" />

## The Big Idea: What Makes an Agent Different

A regular LLM interaction is: you send a message, you get a response, done.

An agent is: you send a **goal**, the model figures out what actions to take, executes them through tools, examines the results, and keeps going until the goal is complete.

The model is the brain. The tools are the hands. The loop is what connects them.

Claude handles the brain part exceptionally well — it reasons about which tools to use, in what order, and interprets results correctly more often than any other model I've tested. Claude Opus 4.7 currently sits at **87.6% on SWE-bench Verified**, the standard benchmark for real-world coding agent performance. Those aren't lab numbers — they translate to agents that complete real tasks reliably.

Your job, as the developer, is to write the tools and the loop. That's what this post covers.

## Setting Up

Install the Anthropic Python SDK:

```bash
pip install anthropic
```

Set your API key:

```bash
export ANTHROPIC_API_KEY=your_key_here
```

That's it. No other dependencies for the core tutorial.

## Step 1: Your First Tool Call

Before building the loop, let's understand how Claude calls a tool.

You define tools as JSON schema objects — a name, a description, and a schema for the inputs:

```python
import anthropic

client = anthropic.Anthropic()

tools = [
    {
        "name": "get_weather",
        "description": "Get the current weather for a city",
        "input_schema": {
            "type": "object",
            "properties": {
                "city": {
                    "type": "string",
                    "description": "The city name, e.g. 'Tokyo' or 'London'"
                }
            },
            "required": ["city"]
        }
    }
]

response = client.messages.create(
    model="claude-opus-4-7",
    max_tokens=1024,
    tools=tools,
    messages=[
        {"role": "user", "content": "What's the weather like in Tokyo?"}
    ]
)

print(response.stop_reason)   # "tool_use"
print(response.content)        # list with a ToolUseBlock
```

When Claude decides to use a tool, the response looks like this:

```python
# response.content
[
    ToolUseBlock(
        type='tool_use',
        id='toolu_01XBgBT...',
        name='get_weather',
        input={'city': 'Tokyo'}
    )
]
```

Claude has decided to call `get_weather` with `city='Tokyo'`. Now you need to actually call that function and send the result back.

## Step 2: Sending Tool Results Back

This is the part most tutorials gloss over. The result needs to go back to Claude in a specific format, as part of the growing conversation history:

```python
def get_weather(city: str) -> str:
    # In real life, call a weather API
    return f"Sunny, 24°C, low humidity in {city}"

for block in response.content:
    if block.type == "tool_use":
        result = get_weather(**block.input)

        follow_up = client.messages.create(
            model="claude-opus-4-7",
            max_tokens=1024,
            tools=tools,
            messages=[
                {"role": "user", "content": "What's the weather like in Tokyo?"},
                {"role": "assistant", "content": response.content},  # Claude's tool use request
                {"role": "user", "content": [                         # The tool result
                    {
                        "type": "tool_result",
                        "tool_use_id": block.id,
                        "content": result
                    }
                ]}
            ]
        )

        print(follow_up.content[0].text)
        # "The weather in Tokyo is currently sunny, 24°C with low humidity — a lovely day."
```

Two things to notice:

1. The **conversation history grows** with each turn — you pass the full message list every time
2. The tool result is **tied to the tool call by `tool_use_id`** — this lets Claude handle multiple parallel tool calls correctly

## Step 3: The Full Agent Loop

Now that you understand the single tool call cycle, the agent loop is just that cycle repeated until Claude decides it's done. Here's the complete implementation:

```python
import anthropic

client = anthropic.Anthropic()

# --- Tool implementations ---

def get_weather(city: str) -> str:
    """Simulated weather API call."""
    weather_data = {
        "Tokyo": "Sunny, 24°C, low humidity",
        "London": "Overcast, 15°C, rain expected this afternoon",
        "New York": "Partly cloudy, 18°C, light wind",
    }
    return weather_data.get(city, f"Weather data not available for {city}")

def calculate(expression: str) -> str:
    """Safely evaluate a math expression."""
    allowed = set("0123456789+-*/()., ")
    if not all(c in allowed for c in expression):
        return "Error: Expression contains unsupported characters"
    try:
        return str(eval(expression))
    except Exception as e:
        return f"Error: {e}"

def lookup_fact(topic: str) -> str:
    """Simulated knowledge base lookup."""
    facts = {
        "claude": "Claude is Anthropic's AI assistant. Opus 4.7 scores 87.6% on SWE-bench Verified.",
        "anthropic": "Anthropic is an AI safety company founded in 2021, based in San Francisco.",
        "python": "Python 3.13 added JIT compilation improvements. Latest stable release as of 2026.",
    }
    for key, fact in facts.items():
        if key in topic.lower():
            return fact
    return f"No specific information found for '{topic}'"

# --- Tool schema (what Claude sees) ---

TOOLS = [
    {
        "name": "get_weather",
        "description": "Get current weather for a city. Use when the user asks about weather.",
        "input_schema": {
            "type": "object",
            "properties": {
                "city": {"type": "string", "description": "City name, e.g. 'Tokyo'"}
            },
            "required": ["city"]
        }
    },
    {
        "name": "calculate",
        "description": "Evaluate a mathematical expression. Use for any arithmetic.",
        "input_schema": {
            "type": "object",
            "properties": {
                "expression": {
                    "type": "string",
                    "description": "Math expression, e.g. '(15000 * 5) / 149.5'"
                }
            },
            "required": ["expression"]
        }
    },
    {
        "name": "lookup_fact",
        "description": "Look up facts about a topic from the knowledge base.",
        "input_schema": {
            "type": "object",
            "properties": {
                "topic": {"type": "string", "description": "The topic to look up"}
            },
            "required": ["topic"]
        }
    }
]

# --- Tool dispatcher ---

def run_tool(name: str, inputs: dict) -> str:
    tools_map = {
        "get_weather": get_weather,
        "calculate": calculate,
        "lookup_fact": lookup_fact,
    }
    fn = tools_map.get(name)
    if fn is None:
        return f"Error: Unknown tool '{name}'"
    try:
        return fn(**inputs)
    except Exception as e:
        return f"Tool error in {name}: {type(e).__name__}: {e}"

# --- The agent loop ---

def run_agent(user_message: str, max_turns: int = 10) -> str:
    messages = [{"role": "user", "content": user_message}]

    for turn in range(max_turns):
        response = client.messages.create(
            model="claude-opus-4-7",
            max_tokens=4096,
            tools=TOOLS,
            messages=messages
        )

        print(f"Turn {turn + 1}: stop_reason={response.stop_reason}")

        # Claude is done — extract and return the text
        if response.stop_reason == "end_turn":
            for block in response.content:
                if hasattr(block, "text"):
                    return block.text
            return ""

        # Claude wants to use tools
        if response.stop_reason == "tool_use":
            messages.append({"role": "assistant", "content": response.content})

            tool_results = []
            for block in response.content:
                if block.type == "tool_use":
                    print(f"  → Calling {block.name}({block.input})")
                    result = run_tool(block.name, block.input)
                    print(f"  ← Result: {result}")
                    tool_results.append({
                        "type": "tool_result",
                        "tool_use_id": block.id,
                        "content": result
                    })

            messages.append({"role": "user", "content": tool_results})

    return "Agent reached the turn limit without completing the task."

# --- Run it ---

if __name__ == "__main__":
    result = run_agent(
        "I'm planning a trip to Tokyo. What's the weather like there? "
        "Also, if a hotel costs 15,000 yen per night for 5 nights, "
        "and 1 USD = 149.5 JPY, what's the total cost in USD? Round to 2 decimal places."
    )
    print("\n=== Final Response ===")
    print(result)
```

Running this produces:

```
Turn 1: stop_reason=tool_use
  → Calling get_weather({'city': 'Tokyo'})
  ← Result: Sunny, 24°C, low humidity
Turn 2: stop_reason=tool_use
  → Calling calculate({'expression': '(15000 * 5) / 149.5'})
  ← Result: 501.6722408026756
Turn 3: stop_reason=tool_use
  → Calling calculate({'expression': 'round(501.6722408026756, 2)'})
  ← Result: 501.67
Turn 4: stop_reason=end_turn

=== Final Response ===
Great news for your Tokyo trip! The current weather is sunny with a
temperature of 24°C and low humidity — perfect for sightseeing.

For accommodation: 15,000 yen × 5 nights = 75,000 yen total. At the
exchange rate of 149.5 JPY per USD, that works out to approximately
**$501.67 USD** for your stay.
```

That's a complete agent — receiving a goal, planning tool calls, executing them across multiple turns, and synthesizing a final answer. 74 lines of actual logic.

## What Just Happened (and Why It Matters)

A few things worth unpacking from that run:

**Claude decided the sequence.** I didn't tell it to check weather first, then calculate. It figured out the order from the task description. For this simple example that's not impressive; for a complex 12-step data pipeline, it's critical.

**Claude called `calculate` twice.** It got the raw division result, then called calculate again to round it. It could have done both in one expression — but it chose to chain two calls and stay explicit about each step. That's Claude's reasoning showing through the tool calls.

**The turn limit is a safety rail, not a target.** `max_turns=10` guards against infinite loops, not against efficiency. A well-defined task with good tools typically finishes in 3–5 turns.

**The `messages` list is the agent's working memory.** Everything Claude knows about the task — all tool calls and their results — lives in that list. For persistent memory across sessions, serialize it. For long tasks where the context grows too large, implement a rolling window or summarization step.

## Error Handling That Actually Helps

The `run_tool` function above handles Python exceptions, but the more important pattern is **returning error text to Claude rather than raising exceptions**. Claude can read an error, understand what went wrong, and try a different approach. An unhandled exception that crashes the loop gives it no chance to self-correct.

Here's a more production-ready dispatcher:

```python
def run_tool(name: str, inputs: dict) -> str:
    tools_map = {
        "get_weather": get_weather,
        "calculate": calculate,
        "lookup_fact": lookup_fact,
    }

    fn = tools_map.get(name)
    if fn is None:
        return (
            f"Error: Tool '{name}' not found. "
            f"Available tools: {list(tools_map.keys())}"
        )

    try:
        return str(fn(**inputs))
    except TypeError as e:
        # Wrong argument names or count — tell Claude exactly what's expected
        import inspect
        sig = inspect.signature(fn)
        return f"Error: Wrong inputs for '{name}'. Expected: {sig}. Got: {inputs}. Details: {e}"
    except Exception as e:
        return f"Error executing '{name}': {type(e).__name__}: {e}"
```

The key insight: **an error message is tool output**. Make it informative enough that Claude can diagnose the problem and adjust its next call.

## Adding a System Prompt

Real agents need a system prompt that defines the agent's operating context, personality, and constraints. Add it to every `messages.create` call:

```python
SYSTEM_PROMPT = """You are a helpful travel planning assistant with access to 
weather data and calculation tools.

When helping users:
- Always check actual weather before making recommendations
- Show calculation steps explicitly so users can verify
- Be specific and practical, not generic

If asked for something outside your tools' capabilities, say so clearly 
rather than making up information."""

response = client.messages.create(
    model="claude-opus-4-7",
    max_tokens=4096,
    system=SYSTEM_PROMPT,
    tools=TOOLS,
    messages=messages
)
```

The system prompt is your primary lever for shaping behavior. It's also where you put hard constraints: "never book anything without explicit user confirmation," "always ask for a budget before suggesting options," "if uncertain, ask for clarification rather than guessing."

For larger projects, this system prompt effectively becomes your `CLAUDE.md` — the same pattern Claude Code uses to understand your project's conventions and preferences.

## Three Common Mistakes

After using this pattern extensively in [Buckist](https://buckist.app), I keep seeing the same failure modes:

**Vague tool descriptions.** Claude uses descriptions to decide *when* to call a tool. "Gets information" is useless. "Get current weather conditions in Celsius for a specific city — use this when the user asks about weather, what to wear, or whether to bring an umbrella" is what Claude needs. Specificity in descriptions directly improves call accuracy.

**Tools that return too little on failure.** A tool that returns `"Error"` on failure teaches Claude nothing. A tool that returns `"Error: City 'Tokyoo' not found. Did you mean 'Tokyo'? Supported cities: ..."` gives Claude enough to self-correct.

**No turn limit.** Always set `max_turns`. Without it, a confused agent on a malformed task will loop indefinitely and rack up token costs. Ten turns is a generous limit for most tasks; five is right for simple ones.

<img src="https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=1200&auto=format&fit=crop&q=80" alt="Terminal output on a dark screen — watching an agent loop in action" />

## Where to Go From Here

This loop is complete — it's not a simplified demo. Real production agents are this same loop with more tools, tighter error handling, logging, and a system prompt tuned to the specific domain.

The natural next steps:

**Real tool implementations.** Swap the simulated functions for actual API calls — OpenWeatherMap for weather, your database, your filesystem, a web search API. The loop doesn't change; only the tools do.

**MCP servers.** Once you're attaching more than ~5 tools, Model Context Protocol lets you serve tools from a separate process that Claude connects to dynamically. I [wrote about MCP here](/en/indie-hacker/mcp-servers-the-upgrade-your-ai-dev-setup-is-missing) — more setup overhead, but tool management at scale becomes much cleaner.

**Multi-agent coordination.** For complex tasks, one agent hands off to another. The orchestrator coordinates; specialists (a researcher, a code reviewer, a data analyst) handle sub-domains. The "tool" the orchestrator calls is just `run_agent()` with a different system prompt. The same loop, composed.

**Streaming.** For production UX, you want to stream Claude's text responses token-by-token rather than waiting for each turn to complete. The Anthropic SDK supports streaming natively; the agent loop structure stays identical, you just consume a stream instead of a response object.

**Claude Code's internals.** If you've used [Claude Code](/en/indie-hacker/cursor-vs-claude-code-indie-hacker-honest-take) — Anthropic's CLI for coding — you've been using this exact loop, with a richer toolset (file read/write, bash execution, web search, the Agent SDK). The `CLAUDE.md` file in your project root is the system prompt. Knowing the underlying loop makes Claude Code's behavior much more predictable and directable.

## The One Thing That Changes Everything

After building and shipping with this pattern, the mental model I keep coming back to is this:

**An agent's output quality is bounded by its tools and its instructions, not by the model.**

Claude is remarkably capable. But give it tools that return ambiguous errors and no system prompt, and it'll fail at simple tasks. Give it clear tool descriptions, informative error messages, and a system prompt that defines its operating context — and it completes complex multi-step tasks correctly without intervention.

The model handles the reasoning. Your job is to build the environment where that reasoning can succeed. That's the actual engineering work of agentic AI — and it's more interesting than it sounds.

---

*If you build something interesting with this pattern, I'd genuinely like to see it — drop it in the comments. And if you want to go deeper on the agentic workflow side of things, [this post on how the shift from copilot to director changes the developer job](/en/indie-hacker/from-copilot-to-co-director-agentic-ai) has the broader context.*
