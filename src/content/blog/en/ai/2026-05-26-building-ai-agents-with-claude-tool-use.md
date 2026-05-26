---
title: "From Chatbot to Agent: Building Real AI Workflows with Claude's Tool Use API"
date: 2026-05-26T08:00:00
categories: ["ai"]
tags: ["AI", "Claude", "AI Agents", "Tool Use", "MCP", "Python", "Developer Productivity"]
summary: "There's a fundamental difference between asking Claude a question and letting Claude actually do the work. Here's how tool use turns Claude from a chatbot into an agent — with real code you can run today."
toc: true
comments: true
image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&auto=format&fit=crop"
---

For the past year, I've been using Claude every single day. Not just for code suggestions or answering questions — I mean *actually using it to do work*. Read files, write code, review PRs, run tests, fix failures, commit changes.

But there's a critical difference between "Claude as a very smart search engine" and "Claude as an agent that actually does things." The dividing line is **tool use** — and once you cross it, you can't go back to just chatting with an AI.

This post is about that shift: how tool use works in the Claude API, how to build a real agent loop, and what six months of daily agent use has taught me.

<img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&auto=format&fit=crop" alt="Neural network visualization — the architecture powering AI agents that reason and act."/>

## The Mental Model Shift

When most developers first try Claude, they treat it like a very fast Stack Overflow. You ask → it answers. The interaction is stateless and passive: Claude doesn't browse your repo, doesn't know what your CI is doing, can't run your test suite.

That changes with tool use.

**Tool use** (sometimes called function calling) lets you define a set of *capabilities* and hand them to Claude. Claude can then decide when and how to invoke them while working through your task. Instead of just generating text, it generates *actions*.

The mental model flip: Claude isn't answering your question anymore. **You're giving Claude a goal, and Claude is figuring out the steps to accomplish it.**

That's what makes it an agent.

## How Tool Use Works in the Claude API

The API is simpler than you'd expect. You define tools as JSON schemas — a name, a description, and a parameter spec. Claude reads these definitions and, when it decides to use a tool, emits a `tool_use` content block instead of plain text. You execute the tool and send back the result. This loop continues until Claude has everything it needs to give a final answer.

### Defining Tools

```python
import anthropic

client = anthropic.Anthropic()

tools = [
    {
        "name": "read_file",
        "description": (
            "Read the full contents of a file from the local filesystem. "
            "Use this to inspect source code, config files, or any text file. "
            "Returns the file contents as a string."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "path": {
                    "type": "string",
                    "description": "The relative or absolute path to the file"
                }
            },
            "required": ["path"]
        }
    },
    {
        "name": "run_command",
        "description": (
            "Execute a shell command and return its stdout and stderr. "
            "Use for running tests, linters, builds, or any CLI operation. "
            "Timeout is 60 seconds. Returns output as a string."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "command": {
                    "type": "string",
                    "description": "The shell command to run"
                }
            },
            "required": ["command"]
        }
    },
    {
        "name": "write_file",
        "description": (
            "Write content to a file, creating it if it doesn't exist. "
            "Use this to apply code fixes, generate new files, or update configs."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "path": {"type": "string", "description": "Path to write to"},
                "content": {"type": "string", "description": "Content to write"}
            },
            "required": ["path", "content"]
        }
    }
]
```

Notice the verbosity in the descriptions. This is not accidental — I'll come back to why this matters.

### The Agent Loop

Here's the core loop that powers every agent I've built:

```python
import subprocess

def execute_tool(tool_name: str, tool_input: dict) -> str:
    if tool_name == "read_file":
        try:
            with open(tool_input["path"]) as f:
                return f.read()
        except FileNotFoundError:
            return f"Error: File not found: {tool_input['path']}"

    elif tool_name == "run_command":
        try:
            result = subprocess.run(
                tool_input["command"],
                shell=True,
                capture_output=True,
                text=True,
                timeout=60
            )
            return f"exit_code: {result.returncode}\nstdout: {result.stdout}\nstderr: {result.stderr}"
        except subprocess.TimeoutExpired:
            return "Error: Command timed out after 60 seconds"

    elif tool_name == "write_file":
        with open(tool_input["path"], "w") as f:
            f.write(tool_input["content"])
        return f"Successfully wrote {len(tool_input['content'])} chars to {tool_input['path']}"

    return f"Unknown tool: {tool_name}"


def run_agent(task: str, max_iterations: int = 20) -> str:
    messages = [{"role": "user", "content": task}]
    iterations = 0

    while iterations < max_iterations:
        response = client.messages.create(
            model="claude-opus-4-7",
            max_tokens=4096,
            tools=tools,
            messages=messages
        )
        iterations += 1

        # Claude finished — extract the final text response
        if response.stop_reason == "end_turn":
            return next(
                (block.text for block in response.content if hasattr(block, "text")),
                "Task completed."
            )

        # Claude wants to call tools
        if response.stop_reason == "tool_use":
            messages.append({"role": "assistant", "content": response.content})

            tool_results = []
            for block in response.content:
                if block.type == "tool_use":
                    print(f"  → {block.name}({block.input})")  # visibility into what the agent is doing
                    result = execute_tool(block.name, block.input)
                    tool_results.append({
                        "type": "tool_result",
                        "tool_use_id": block.id,
                        "content": result
                    })

            messages.append({"role": "user", "content": tool_results})

    return "Max iterations reached — task may be incomplete."
```

Now you can do this:

```python
result = run_agent(
    "Read src/auth/login.py, run its tests with pytest tests/test_auth.py, "
    "and if any tests fail, fix them in the source file. "
    "Run the tests again to confirm they pass before finishing."
)
print(result)
```

Claude will: read the file, run the tests, inspect the failures, reason about the bug, write a fix, run the tests again, and confirm they pass — all without you touching a thing. A task that takes 10 minutes of context-switching collapses to 30 seconds of waiting.

That's the agent loop in action.

<img src="https://images.unsplash.com/photo-1555066931-bf19f8fd1085?w=1200&auto=format&fit=crop" alt="Code editor in dark mode — where AI agents spend most of their time."/>

## A Real Example: PR Review Agent

One of the most useful things I've built is a lightweight pre-commit review agent. It reads changed files, checks for common issues, and gives me a structured code review — before I push. Here's a simplified version:

```python
REVIEW_SYSTEM = """
You are a senior software engineer doing a code review.

Use the tools to:
1. Get the current git diff (run: git diff HEAD)
2. Read any changed files in full if you need more context
3. Search for related code with grep if you need to assess impact

Then give a structured review covering:
- Bugs or logic errors
- Security issues (injection, auth, secrets)  
- Performance concerns
- Code quality and maintainability
- Anything that would block merging

Be specific — include file names and approximate line numbers.
Don't review formatting or style unless it impacts readability.
"""

def review_current_changes() -> str:
    response = client.messages.create(
        model="claude-opus-4-7",
        max_tokens=4096,
        system=REVIEW_SYSTEM,
        tools=tools,
        messages=[{"role": "user", "content": "Review my current uncommitted changes."}]
    )
    # ... same loop as above
```

I alias this to `git review` in my shell. It runs in under a minute and consistently catches things I miss when I've been staring at the same code for three hours.

Not perfect — it occasionally flags non-issues, and it can't understand domain-specific business logic that lives in my head. But for catching obvious bugs and security issues before they hit review? It's earned its place in my workflow.

## Enter MCP: Claude Gets Real Capabilities

If tool use is the first unlock, **MCP (Model Context Protocol)** is the second.

MCP is an open protocol that standardizes how AI models connect to external tools and data sources. Instead of hardcoding tools into every agent you write, you run MCP servers that expose capabilities — and any compatible client can discover and use them dynamically.

The analogy: tool use is building a custom Swiss Army knife for each agent. MCP is giving your agent access to an entire hardware store.

The ecosystem has grown fast. MCP servers now exist for:
- Filesystems and editors
- Git and GitHub
- PostgreSQL, SQLite, Redis
- Web browsing
- Slack, Linear, Jira, Notion
- Docker and Kubernetes

**Claude Code** — which I use daily as my terminal-based agentic assistant — runs on MCP internally. When it navigates my codebase, runs my tests, or makes commits, it's making MCP tool calls under the hood. The difference between "I use Claude Code" and "I built my own agent" is getting thinner every month.

You can build your own MCP servers too. I have a small one that connects Claude to my [Buckist](https://buckist.app) backend's internal analytics APIs. I can now ask Claude to query production data directly, which eliminates the copy-paste cycle that was eating 20 minutes of every debugging session.

## What Six Months of Daily Use Has Taught Me

No amount of reading substitutes for building. Here's what I've actually learned.

### Tool descriptions matter more than your system prompt

The biggest lever on agent performance isn't your prompt engineering — it's how well you describe your tools. Claude decides *when* and *whether* to call a tool based entirely on understanding what it does and when it's appropriate.

Bad tool description:
```
"name": "db_query", "description": "Query the database."
```

Good tool description:
```
"name": "db_query",
"description": "Execute a read-only SELECT query against the production PostgreSQL database.
Use this to look up users, orders, or analytics data. Returns results as JSON.
Avoid full-table scans (add WHERE clauses). DO NOT use for INSERT/UPDATE/DELETE operations."
```

That extra 40 words eliminates hours of agent misbehavior. Every guardrail you'd put in a code review comment belongs in the description.

### Vague tasks produce confident wrong answers

If your task is ambiguous, Claude will pick an interpretation and execute it with full confidence. The agent loop doesn't pause to ask for clarification unless you design a tool that explicitly allows it to do so.

My rule: the task should be specific enough that I could hand it to a junior developer with zero follow-up questions. If *I'd* need to clarify, so would Claude — but it won't ask.

### Long context degrades reasoning

After 20–30 tool exchanges, I've noticed agent reasoning quality drops. Claude starts making decisions based on earlier context it has effectively "half-forgotten." For complex multi-hour tasks, I checkpoint: ask Claude to summarize what it has done so far, then start a fresh conversation with that summary.

This is a known limitation of current context windows, not a Claude-specific flaw. It'll improve. For now, design your agents to work in bounded increments.

### Build your `max_iterations` guard early

Without a limit, a buggy tool or an ambiguous task can produce an infinite loop of increasingly confused tool calls — and every iteration costs tokens. Add the guard from day one, not as an afterthought.

## What Doesn't Work Yet

Honesty matters here.

**Write operations need human review.** I don't let agents write to production systems without me seeing the output first. The agent proposes, I approve. Fully autonomous writes to anything that matters is a future capability, not today's.

**Non-determinism is real.** The same task run twice can take different paths. Agents are great for exploratory, creative tasks — not for anything that needs to be bit-for-bit reproducible. Don't replace your test suite with an agent.

**Cost accumulates invisibly.** A runaway agent on a complex task burns tokens fast. I log token usage on every iteration and set hard limits. Instrument this before you need it.

**Parallelism is hard.** Most of my agents are sequential — one tool call at a time. The API supports parallelism, but the state management gets complex quickly. For most tasks, sequential is fine. For bulk operations (reading 50 files, running 20 tests), you'll eventually want it.

## The Shift That's Actually Happening

The most important thing about building agents isn't the technology — it's the shift in how you think about automation.

You're not writing a script that follows explicit steps. You're defining a goal, providing tools, and trusting a reasoning system to figure out the path. That's genuinely new. It requires thinking differently about what "writing software" means.

The engineers who will build the most interesting things in the next few years are the ones learning to think in agents — who can look at a multi-step workflow and ask "what tools would Claude need to do this end-to-end?" rather than "what code do I need to write to do this?"

I'm still learning that. Every week I find something new I can offload to an agent. And every week I find something I thought I could offload that I can't — yet. The boundary moves a little further every month.

If you want to start, don't overthink it. Define two tools (read file + run command), write a real task you do at work, and run it. The first time it completes a task end-to-end without you — that's when the mental model clicks.

Drop a comment if you build something. I'm collecting examples.

Happy building! 🤖
