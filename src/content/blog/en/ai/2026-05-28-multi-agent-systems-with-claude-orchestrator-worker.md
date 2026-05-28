---
title: "Multi-Agent Systems with Claude: When One Agent Isn't Enough"
date: 2026-05-28T08:00:00
categories: ["ai"]
tags: ["AI", "Claude", "AI Agents", "Multi-Agent", "Orchestration", "Python", "Architecture", "Developer Productivity"]
summary: "Single Claude agents are powerful — but they hit a ceiling. Here's how I moved from solo agents to agent teams: an orchestrator that breaks down complex tasks and delegates to specialist sub-agents, with real Python code you can run today."
toc: true
comments: true
image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80"
imageAlt: "Glowing network of connected nodes seen from above — the architecture of coordinated AI agents working together"
---

A few weeks after [building my first Claude agent loop](/en/ai/building-ai-agents-with-claude-tool-use), I had a problem I didn't expect.

My agent was technically capable. It could read files, run commands, search the codebase, and write code. But when I asked it to do something genuinely complex — *"Review this PR for security issues, suggest missing tests, and check if the architecture fits our patterns"* — something subtle broke down.

The review came back competent but shallow. The security section was surface-level. The test suggestions were generic. The architecture commentary missed domain-specific conventions that should've been obvious from the codebase.

The problem wasn't Claude. The problem was that I had assigned one entity three very different jobs at once — security analyst, QA engineer, and software architect — while it also had to manage tool calls, track conversation state, and synthesize everything into one response. No wonder the depth suffered.

This is the ceiling of single-agent systems. And the solution is the same one humans found a long time ago: **specialization and delegation**.

<img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80" alt="A network of glowing nodes seen from above — each node a specialist, each connection a message between agents." />

## Why Single Agents Hit a Ceiling

The core limitation is cognitive load — or its AI equivalent: context saturation.

When you give a single agent a sprawling task, a few things happen:

**Context competes for attention.** A long system prompt describing three different roles (security expert + test engineer + architect) dilutes the depth of each. The model's "attention" — in the loose sense — is divided. A tightly scoped prompt that says "you are a security engineer, look only for vulnerabilities" will consistently outperform a prompt that says "you are everything, look for everything."

**Tool call history grows.** After reading 15 files, running 6 commands, and tracking intermediate results, the conversation history bloats. Early context degrades in influence. The agent starts making decisions based on half-remembered early results. (I wrote about this in the previous post: after ~20–30 tool exchanges, reasoning quality visibly drops.)

**Parallelism is impossible.** A single agent does one thing at a time. Security review → test analysis → architecture review, serially. If these tasks are independent, you're wasting wall-clock time.

Multi-agent architecture addresses all three. Each specialist has a clean, scoped context. The orchestrator keeps the high-level state, not the specialists. And specialists can run in parallel.

## The Orchestrator-Worker Pattern

The pattern is simple to describe, surprisingly powerful to deploy:

```
User Task
    │
    ▼
┌─────────────┐
│ Orchestrator │  ← Breaks down task, routes to specialists,
│   (Claude)  │    synthesizes final result
└──────┬──────┘
       │
  ┌────┴────┐
  │         │
  ▼         ▼
Worker A  Worker B   ← Specialist agents, each with a narrow
(Claude)  (Claude)     scope, dedicated tools, and focused prompt
```

The orchestrator is Claude with one job: understand the task, decide which specialists to call and with what sub-tasks, collect their outputs, and produce a final synthesis.

The workers are also Claude (or a smaller/cheaper model, depending on the task) — but each has a narrowly defined role, a tightly scoped system prompt, and only the tools relevant to their specialty.

The communication is just text. Orchestrator sends a sub-task description to a worker. Worker returns a structured report. Orchestrator accumulates reports, decides what to do next.

## Building the Orchestrator

Let me show the actual code. I'll build a PR review pipeline with three specialists: a security reviewer, a test coverage analyzer, and an architecture reviewer.

First, the base agent runner (same pattern as the previous post, but pulled into a reusable function):

```python
import anthropic
from typing import Callable

client = anthropic.Anthropic()

def run_agent(
    system: str,
    task: str,
    tools: list[dict],
    tool_executor: Callable[[str, dict], str],
    model: str = "claude-sonnet-4-6",
    max_iterations: int = 15,
) -> str:
    """Run a single agent to completion. Returns final text output."""
    messages = [{"role": "user", "content": task}]

    for _ in range(max_iterations):
        response = client.messages.create(
            model=model,
            max_tokens=4096,
            system=system,
            tools=tools,
            messages=messages,
        )

        if response.stop_reason == "end_turn":
            return next(
                (b.text for b in response.content if hasattr(b, "text")),
                "No output."
            )

        if response.stop_reason == "tool_use":
            messages.append({"role": "assistant", "content": response.content})
            results = [
                {
                    "type": "tool_result",
                    "tool_use_id": b.id,
                    "content": tool_executor(b.name, b.input),
                }
                for b in response.content
                if b.type == "tool_use"
            ]
            messages.append({"role": "user", "content": results})

    return "Max iterations reached."
```

Now the shared tools that all specialists can use:

```python
import subprocess

SHARED_TOOLS = [
    {
        "name": "read_file",
        "description": "Read the full content of a file from the repository.",
        "input_schema": {
            "type": "object",
            "properties": {"path": {"type": "string", "description": "File path to read"}},
            "required": ["path"],
        },
    },
    {
        "name": "run_command",
        "description": (
            "Run a shell command and return stdout + stderr. "
            "Use for git commands, grep, find, running tests. "
            "Timeout: 60s. Read-only operations only."
        ),
        "input_schema": {
            "type": "object",
            "properties": {"command": {"type": "string", "description": "Shell command to run"}},
            "required": ["command"],
        },
    },
]


def execute_shared_tool(name: str, inputs: dict) -> str:
    if name == "read_file":
        try:
            return open(inputs["path"]).read()
        except FileNotFoundError:
            return f"File not found: {inputs['path']}"

    if name == "run_command":
        try:
            result = subprocess.run(
                inputs["command"], shell=True, capture_output=True, text=True, timeout=60
            )
            return f"exit={result.returncode}\n{result.stdout}{result.stderr}"
        except subprocess.TimeoutExpired:
            return "Command timed out."

    return f"Unknown tool: {name}"
```

## Building the Specialist Agents

Each specialist has one job, clearly defined in its system prompt:

```python
SECURITY_SYSTEM = """
You are a senior application security engineer doing a focused security code review.

Your ONLY job is to identify security vulnerabilities in the changes provided.
Do not comment on code style, architecture, or test coverage — that's someone else's job.

For every issue found, provide:
- Severity: Critical / High / Medium / Low
- Location: file name and approximate line
- Vulnerability type (OWASP category if applicable)
- Why it's a problem
- Concrete fix recommendation

Use the tools to read changed files and examine context. Run `git diff HEAD` to see
what changed. Read related files if you need to understand the full attack surface.

If you find no security issues, say so explicitly with a brief explanation of what
you checked.
"""

TEST_SYSTEM = """
You are a senior QA engineer reviewing test coverage for a code change.

Your ONLY job is to analyze whether the changed code has adequate test coverage.
Do not comment on security issues or architecture — that's someone else's job.

For every gap you find:
- Identify which behavior or branch is untested
- Suggest a specific test case (describe it in plain English — don't write full test code)
- Estimate the risk if this behavior is left untested

Check whether existing tests still cover the changed code correctly.
Run the test suite if possible (`npm test`, `pytest`, or whatever fits the project).

Use the tools to read test files, find existing coverage patterns, and run tests.
"""

ARCHITECTURE_SYSTEM = """
You are a staff software architect reviewing a code change for design quality.

Your ONLY job is to identify architectural issues: coupling, abstraction violations,
naming problems, design pattern misuse, or patterns that will cause maintenance pain.
Do not comment on security or test coverage — that's someone else's job.

For every concern:
- Describe the issue and why it will cause problems over time
- Reference any established patterns in the existing codebase it violates
- Suggest a specific structural improvement

Look at the broader context: how does this change fit into the surrounding code?
Does it introduce inconsistency with established patterns elsewhere in the repo?
"""


def run_security_review(diff_summary: str) -> str:
    return run_agent(
        system=SECURITY_SYSTEM,
        task=f"Review these changes for security issues:\n\n{diff_summary}",
        tools=SHARED_TOOLS,
        tool_executor=execute_shared_tool,
    )


def run_test_review(diff_summary: str) -> str:
    return run_agent(
        system=TEST_SYSTEM,
        task=f"Review test coverage for these changes:\n\n{diff_summary}",
        tools=SHARED_TOOLS,
        tool_executor=execute_shared_tool,
    )


def run_architecture_review(diff_summary: str) -> str:
    return run_agent(
        system=ARCHITECTURE_SYSTEM,
        task=f"Review the architectural quality of these changes:\n\n{diff_summary}",
        tools=SHARED_TOOLS,
        tool_executor=execute_shared_tool,
    )
```

<img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&auto=format&fit=crop&q=80" alt="Abstract visualization of network nodes — specialist agents each focused on one domain." />

## The Orchestrator

The orchestrator's job: understand the task, dispatch to specialists (in parallel if appropriate), collect results, and synthesize a final verdict.

```python
import concurrent.futures

ORCHESTRATOR_SYSTEM = """
You are a principal engineer coordinating a multi-specialist code review.

You have already dispatched the changed code to three specialist reviewers:
- Security Engineer: looked for vulnerabilities
- QA Engineer: assessed test coverage  
- Architect: assessed design quality

Your job is to synthesize their findings into a unified review.

Structure your output as:
1. **Overall Verdict**: go / needs-changes / block — and one sentence explaining why
2. **Must Fix Before Merge** (blockers only — security critical, broken tests, etc.)
3. **Should Fix Soon** (high-value improvements that aren't blockers)
4. **Suggestions** (lower-priority improvements worth noting)
5. **PR Description** (a clean, paste-ready PR description for GitHub, 3-5 sentences)

Resolve conflicts between reviewers when they overlap. Don't repeat the same finding
three times. Merge related concerns into a single, clear action item.
"""


def run_pr_review(pr_branch: str = "HEAD") -> str:
    # Get a diff summary to pass to all specialists
    diff = subprocess.run(
        f"git diff main...{pr_branch} --stat && git diff main...{pr_branch}",
        shell=True,
        capture_output=True,
        text=True,
        timeout=30,
    ).stdout[:8000]  # Cap at 8k chars to avoid overwhelming specialists

    print("Dispatching to specialist agents in parallel...")

    # Run all three specialists concurrently
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as executor:
        security_future = executor.submit(run_security_review, diff)
        test_future = executor.submit(run_test_review, diff)
        arch_future = executor.submit(run_architecture_review, diff)

        security_report = security_future.result()
        test_report = test_future.result()
        arch_report = arch_future.result()

    print("Specialists done. Running orchestrator synthesis...")

    synthesis_task = f"""
Here are the reports from your three specialist reviewers:

## Security Review
{security_report}

## Test Coverage Review
{test_report}

## Architecture Review
{arch_report}

Synthesize these into a unified code review.
"""

    return run_agent(
        system=ORCHESTRATOR_SYSTEM,
        task=synthesis_task,
        tools=[],  # Orchestrator works only on text — no tool calls needed
        tool_executor=lambda n, i: "",
        model="claude-opus-4-8",  # Use a stronger model for synthesis
        max_iterations=3,
    )


# Run it
if __name__ == "__main__":
    result = run_pr_review()
    print(result)
```

Running `python pr_review.py` triggers three Claude agents in parallel — each reading the diff independently through its specialist lens — then hands all three reports to an orchestrator that synthesizes a single, unified review in about 45 seconds.

The output quality is meaningfully different from a single-agent review. The security section is sharp because that agent did nothing else. The test gaps are concrete because that agent spent all its tokens on coverage. The architecture feedback is grounded in the actual codebase patterns because that agent read broadly, not deeply.

## Parallelism: The Underrated Win

The `ThreadPoolExecutor` with `max_workers=3` in the example above is doing something important: all three specialist reviews run at the same time.

A single-agent serial review of the same changes would take ~90 seconds (30 seconds per domain, one after another). The parallel multi-agent review takes ~30 seconds — the wall-clock time of whichever specialist runs longest.

For a workflow you're running on every PR push, that 3x latency improvement matters. For bulk operations (reviewing 20 PRs at once, analyzing a whole codebase), parallelism turns hours into minutes.

The cost is slightly higher (3× the Claude calls), but each specialist uses fewer tokens because its context is narrower. In practice, the total token count for the multi-agent approach is comparable to the bloated single-agent approach that was trying to do all three jobs at once.

## When Not to Use Multi-Agent

Multi-agent isn't always the right tool. Here's when I still use a single agent:

**Simple, bounded tasks.** "Read this file and suggest a better name for the `processData` function." One agent, one task, done in five seconds. Spinning up an orchestrator would be absurd.

**Tasks that require shared state throughout.** Some tasks are genuinely serial and interdependent: read the codebase → understand the architecture → write a feature that fits. If Step B requires the full output of Step A, parallel specialization doesn't help. A single agent with good context management is cleaner.

**When coordination overhead exceeds the benefit.** For a task that takes 30 seconds with one agent, adding three agents and an orchestrator might take 40 seconds with extra complexity. Always benchmark before committing to the multi-agent pattern.

The mental model I use: if the task has **multiple independent domains** that a single human expert couldn't simultaneously be fluent in, multi-agent is probably worth it. If it's one domain done well, a single agent is usually sufficient.

## Patterns I've Found Useful

### The Reviewer-Corrector Pattern

One agent reviews output, another generates corrections:

```python
# Agent A writes code
draft_code = run_agent(system=CODER_SYSTEM, task=feature_spec, ...)

# Agent B reviews it without knowing Agent A wrote it
review = run_agent(system=REVIEWER_SYSTEM, task=f"Review this:\n{draft_code}", ...)

# Agent C (or Agent A again with fresh context) applies the fixes
final_code = run_agent(system=CODER_SYSTEM, task=f"Rewrite this based on review:\n{review}", ...)
```

The key insight: Agent B has no emotional investment in Agent A's code. It will flag issues that a single agent in a long conversation would rationalize away (because it just wrote them).

### The Structured Output Protocol

Specialists work best when they return structured output that the orchestrator can parse reliably. I've started having specialists return a consistent format:

```python
SECURITY_SYSTEM = """
...
Always end your response with a JSON block in this exact format:
```json
{
  "severity_summary": "critical|high|medium|low|none",
  "issue_count": 3,
  "blocker": true,
  "issues": [
    {"severity": "high", "location": "auth/login.py:42", "description": "..."}
  ]
}
```
"""
```

The orchestrator can then parse the JSON to make routing decisions (skip the architecture review if security flagged something critical that blocks merge anyway).

### The Specialist Disagreement Check

Sometimes two specialists contradict each other. I've added an explicit step to the orchestrator prompt:

```
If any two specialists make contradictory assessments, resolve the conflict explicitly.
Don't silently pick one — explain which assessment you're accepting and why.
```

This surfaces genuine ambiguity in the code instead of hiding it under a false consensus.

<img src="https://images.unsplash.com/photo-1555066931-bf19f8fd1085?w=1200&auto=format&fit=crop&q=80" alt="Code editor at night showing a complex refactor — the kind of task that benefits most from multiple specialist perspectives." />

## What This Changes About How I Work

The shift that surprised me most: multi-agent systems change *what tasks are worth automating*.

With a single agent, I'd only automate tasks that were narrow enough to do well in one shot. Multi-agent expands the frontier. Tasks that required three different kinds of expertise — that I'd previously thought needed a human team — are now automatable by giving each piece to a specialist.

My PR review pipeline runs on every push now. In the past month it's caught: two SQL injection vectors I missed on a tired Friday afternoon, a test file I accidentally deleted without noticing, and an architecture decision that was inconsistent with how we'd solved the same problem three months earlier.

None of those would have been caught by a single-agent review doing all three jobs at once. The depth just isn't there.

## Getting Started

If you want to try this, don't start with a full orchestration system. Start with two agents:

1. Take a single-agent workflow you already have.
2. Split it into two parts: one agent does the work, a second agent reviews the output.
3. Compare the review quality to what you got with a single agent doing both.

That simple two-step pattern — generate, then review with fresh context — is often enough to see the quality difference immediately. Once you feel that difference, the three-specialist PR review pipeline starts to feel obvious.

The infrastructure cost is one function and a `ThreadPoolExecutor`. The benefit is agent output that's qualitatively deeper, not just marginally better.

Build a team. You've earned it.

---

*This builds on [the single-agent tool use post](/en/ai/building-ai-agents-with-claude-tool-use) and [the prompt caching post](/en/indie-hacker/claude-prompt-caching-cut-api-costs-90-percent) — prompt caching on the system prompt of each specialist agent cuts the cost of running three agents to be comparable to running one. If you're running a multi-agent system at any scale, cache everything you can.*
