---
title: "Claude Extended Thinking: When to Let the Model Actually Reason"
date: 2026-06-01T08:00:00
categories: ["ai"]
tags: ["AI", "Claude", "Extended Thinking", "Adaptive Thinking", "Claude API", "Python", "Developer Productivity", "LLM"]
summary: "Extended thinking gives Claude a private scratchpad to reason before answering. In 2026, that's evolved into adaptive thinking — where Claude decides how hard to think per request. Here's the practical guide: what it is, when it pays off, and the cost math that determines when to skip it."
toc: true
comments: true
image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=1200&auto=format&fit=crop&q=80"
imageAlt: "Close-up of a glowing neuron synapse — the biological metaphor for Claude's extended thinking process"
---

Three months ago I was building a Claude-powered code reviewer. The task sounded simple: analyze a pull request, identify potential race conditions, and explain the fix. Standard stuff.

Except it wasn't working. The answers came back fast, they sounded reasonable, and they were confidently wrong. Claude would miss the actual race condition and flag something irrelevant. I bumped up the context, rewrote the prompt, added more examples. Still wrong — or right by luck.

The problem wasn't my prompt. The problem was that I was asking Claude to simultaneously parse concurrent code patterns, trace execution across threads, and articulate a fix — all in one shot, with no room to work through it. I was expecting a well-reasoned answer from a process that had no space to reason.

Enabling extended thinking fixed it in one line.

That's when I started taking Claude's thinking capabilities seriously. This post is what I wish I'd read before wasting two days on prompt engineering that wasn't the right tool.

<img src="https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=1200&auto=format&fit=crop&q=80" alt="A glowing neuron synapse — the reasoning pathway Claude uses when extended thinking is enabled" />

## What Extended Thinking Actually Is

The mental model is simple: extended thinking gives Claude a private scratchpad.

Without it, Claude goes straight from your message to an answer. With it, Claude gets an internal monologue first — a space to explore the problem, change direction, contradict itself, and arrive at a considered position before generating the response you see.

That scratchpad is the **thinking block**. Depending on your configuration, you may or may not see it in the API response — but the reasoning happens either way, and you pay for it either way.

The thinking block isn't prompted. Claude decides what to put there. On complex problems, it'll reason through multiple approaches, identify where it's uncertain, and backtrack from dead ends. On simple problems, it uses the budget minimally or skips deep reasoning altogether (especially with adaptive thinking, which I'll get to in a moment).

What this changes in practice: Claude can hold a problem in working memory across many reasoning steps without losing the thread. The single-shot answer you got before wasn't bad because Claude is bad — it was bad because the problem required internal back-and-forth that couldn't happen in the answer space alone.

## How the Response Looks

Before touching code, it helps to understand what the API actually returns. When extended thinking is enabled, the `content` array contains thinking blocks alongside text blocks:

```json
{
  "content": [
    {
      "type": "thinking",
      "thinking": "Let me trace the execution path here. Thread A acquires lock X, then tries to acquire lock Y. Thread B does the opposite — acquires Y first, then tries to acquire X. If these two threads run concurrently...",
      "signature": "WaUjzkypQ2mUEVM36O2TxuC..."
    },
    {
      "type": "text",
      "text": "This code has a classic deadlock pattern, not a race condition. Thread A and Thread B each hold a lock the other needs..."
    }
  ]
}
```

Two things to notice:

**The thinking block can be much longer than the answer.** That's by design. Claude is exploring the problem space; the answer is the distilled result. On hard problems, I regularly see thinking blocks that are 3-5x the length of the final response.

**The `signature` field matters if you're doing multi-turn conversations.** It's an encrypted reference to the full thinking trace. If you're building an agent loop where Claude calls tools and then continues reasoning, you must pass thinking blocks back unchanged in the assistant turn — otherwise subsequent calls fail or behave incorrectly.

## Enabling Extended Thinking

Here's the basic setup in Python:

```python
import anthropic

client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=16000,
    thinking={
        "type": "enabled",
        "budget_tokens": 10000
    },
    messages=[
        {
            "role": "user",
            "content": "Analyze this Go code for potential deadlock conditions: [code here]"
        }
    ]
)

# Separate thinking from the final answer
for block in response.content:
    if block.type == "thinking":
        print("REASONING:\n", block.thinking)
    elif block.type == "text":
        print("ANSWER:\n", block.text)
```

The `budget_tokens` parameter caps how many tokens Claude can use for internal reasoning. Set it lower than `max_tokens` — Claude needs room for the actual answer after the thinking phase.

A few things about `budget_tokens` that burned me early:

- Claude doesn't always use the full budget. On straightforward tasks it'll finish reasoning in far fewer tokens. You're paying for what gets used, not what you budgeted.
- On very hard problems, Claude may feel constrained by a low budget and produce shallower reasoning. I ran experiments and found that for algorithmic analysis, going below 4,000 tokens noticeably degrades quality.
- Setting it extremely high (>32k) doesn't always help — there are diminishing returns past a certain depth for most tasks.

My starting point: 8,000 tokens for reasoning-heavy tasks, 4,000 for analysis-light tasks.

## 2026: The Shift to Adaptive Thinking

In early 2026, Anthropic introduced adaptive thinking — and on Claude Opus 4.6, Sonnet 4.6, and newer models, it's now the recommended approach.

Instead of you specifying `budget_tokens`, the model decides how much to think based on what the question actually requires. Simple questions get minimal thinking. Hard questions get deep reasoning. You stop managing a token budget and start describing the *effort level* you want.

```python
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=16000,
    thinking={
        "type": "adaptive"
    },
    messages=[
        {
            "role": "user",
            "content": "What's 2 + 2?"
        }
    ]
)
```

Claude won't burn 10,000 thinking tokens on a simple arithmetic question. With `budget_tokens`, it would've used a fraction and you'd have wasted the overhead of allocating it. With adaptive thinking, it self-regulates.

On Claude Opus 4.7 and newer, `budget_tokens` isn't just deprecated — it returns a 400 error. Adaptive is the only mode.

If you want to hint at depth without micromanaging tokens, use the `effort` parameter (currently in beta on supported models):

```python
response = client.messages.create(
    model="claude-opus-4-8",
    max_tokens=32000,
    thinking={
        "type": "adaptive",
        "effort": "high"   # "low" | "medium" | "high"
    },
    messages=[{"role": "user", "content": "..."}]
)
```

`"high"` tells Claude this problem deserves serious reasoning. `"low"` signals you want a fast answer and don't need deep analysis. The model calibrates accordingly — you're describing intent, not token counts.

**Migration checklist if you're on older code:**

```python
# Old (deprecated on Opus 4.6+, broken on Opus 4.7+)
thinking={"type": "enabled", "budget_tokens": 8000}

# New (works everywhere, required on Opus 4.7+)
thinking={"type": "adaptive"}

# New with effort hint (beta, newer models only)
thinking={"type": "adaptive", "effort": "high"}
```

<img src="https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&auto=format&fit=crop&q=80" alt="Abstract lines branching into complex patterns — the shape of multi-step reasoning when Claude works through a hard problem" />

## The Decision Framework: When to Turn It On

Extended thinking isn't always better. I built a simple mental model for when to reach for it:

**Turn it on when the problem has multiple valid paths and the right one isn't obvious.** Race conditions, security vulnerabilities, algorithm selection, system design trade-offs. These are problems where a wrong first instinct leads to a confidently wrong answer. The thinking space lets Claude second-guess itself productively.

**Turn it on when the answer requires holding a lot of context simultaneously.** Analyzing how a change in module A ripples into modules C, D, and E — that's hard to do in one pass. The thinking trace lets Claude build up the picture incrementally.

**Skip it for tasks that are transformational, not analytical.** Summarization, translation, reformatting, generating variations of a template — these don't benefit from extended reasoning. You're adding cost and latency with no quality gain.

**Skip it for tasks where latency matters more than depth.** Real-time UX, autocomplete, live search suggestions. Extended thinking adds seconds to response time. Users will feel it.

Quick reference:

| Task | Use thinking? |
|---|---|
| Deadlock analysis | Yes |
| Security audit of a diff | Yes |
| Complex algorithm design | Yes |
| Multi-constraint optimization | Yes |
| Summarizing a document | No |
| Translating text | No |
| Generating a commit message | No |
| Autocomplete suggestions | No |
| Answering a factual question | No |

## The Cost Math You Can't Skip

Thinking tokens are billed at the output token rate — the most expensive token type. This isn't a rounding error; it's a 10-20x cost multiplier over standard input tokens on some models.

A realistic example: you send a 2,000-token prompt and Claude uses 8,000 thinking tokens to produce a 600-token answer. You're billed for:
- 2,000 input tokens (cheap)
- 8,000 thinking tokens (output rate)
- 600 output tokens (output rate)

The thinking tokens are 93% of your output-rate spend on that call. For a request where you would've otherwise paid $0.02, you're now paying $0.18. Across thousands of requests, this compounds fast.

The break-even question: *would a standard Claude call, given the same prompt, produce results good enough that you'd have to manually fix them anyway?* If yes, and if that manual fix time costs more than the thinking premium, extended thinking pays for itself. If the standard call is good enough, don't enable it.

My rule of thumb: extended thinking is worth it when the cost of a wrong answer (debugging time, user trust, downstream errors) exceeds ~$0.10. For a code reviewer that catches real bugs, easily. For a first-pass draft generator, not really.

**Prompt caching and thinking tokens interact in a useful way.** Your system prompt caches normally even when thinking parameters change. A large reference document in your system prompt that you mark as cacheable will still hit the cache across calls with different `budget_tokens` or `effort` values. Only the message-level cache invalidates on parameter changes. Structure your prompts accordingly.

## Streaming with Extended Thinking

For UI work or long reasoning tasks, streaming helps — but there's a subtlety worth knowing.

With `display: "summarized"` (the default on Claude 4 models), you get a concise version of the thinking streamed to you. With `display: "omitted"`, you get no thinking content streamed — just the final text, faster:

```python
with client.messages.stream(
    model="claude-sonnet-4-6",
    max_tokens=16000,
    thinking={
        "type": "adaptive",
        "effort": "high"
    },
    messages=[{"role": "user", "content": "Analyze this distributed system design for bottlenecks: ..."}]
) as stream:
    for event in stream:
        if event.type == "content_block_delta":
            if event.delta.type == "thinking_delta":
                # Streaming the reasoning — useful to show "Claude is thinking..."
                print(".", end="", flush=True)
            elif event.delta.type == "text_delta":
                print(event.delta.text, end="", flush=True)
```

In production UIs, I stream a "thinking..." indicator while `thinking_delta` events arrive, then transition to displaying the streamed text once they stop. Users see that the model is working, which buys patience for the extra latency.

## Tool Use with Thinking: The Gotcha

If you're building agent loops that combine extended thinking with tool use, there's one rule you absolutely cannot forget: **preserve thinking blocks in the conversation history**.

When Claude thinks, then calls a tool, then continues — the next API call must include the thinking block from the previous turn in the `assistant` message. If you strip it, the API either errors or the model loses coherence:

```python
# First turn: Claude thinks and requests a tool
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=16000,
    thinking={"type": "adaptive"},
    tools=[code_analysis_tool],
    messages=[{"role": "user", "content": "Review this PR for thread safety issues."}]
)

# Extract blocks from the response
thinking_block = next(b for b in response.content if b.type == "thinking")
tool_use_block = next(b for b in response.content if b.type == "tool_use")

# Run your tool
tool_result = run_analysis(tool_use_block.input)

# Second turn: MUST include the thinking block
continuation = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=16000,
    thinking={"type": "adaptive"},
    tools=[code_analysis_tool],
    messages=[
        {"role": "user", "content": "Review this PR for thread safety issues."},
        {
            "role": "assistant",
            "content": [thinking_block, tool_use_block]  # both blocks, in order
        },
        {
            "role": "user",
            "content": [{
                "type": "tool_result",
                "tool_use_id": tool_use_block.id,
                "content": tool_result
            }]
        }
    ]
)
```

The thinking block carries the signature that links it to the session. Dropping it severs that link.

One more constraint: you can't force a specific tool when extended thinking is enabled. Only `tool_choice: {"type": "auto"}` or `tool_choice: {"type": "none"}` work. If your workflow requires `any` or a specific forced tool, you'll need to restructure around that.

## What I Actually Use It For

After three months of daily use, my patterns have settled:

**Security and correctness analysis.** Race conditions, SQL injection vectors, authentication edge cases. Anything where a shallow read gets a confidently wrong answer. The thinking trace also tells me what Claude checked, which makes it easier to verify the analysis.

**Architecture trade-off discussions.** "Should I use Postgres or a document store for this use case, given these constraints?" Without thinking, Claude defaults to a reasonable generic answer. With thinking, it actually works through the constraints and reaches a position I can push back on meaningfully.

**Debug sessions on gnarly bugs.** I paste the stack trace, the relevant code, and the logs, and ask Claude to reason through what could cause it. The thinking trace shows the hypotheses it ruled out, which saves me from chasing the same dead ends.

**Not using it for:** first drafts, refactoring suggestions, explaining concepts, generating boilerplate, summarizing PRs. Standard Claude handles all of that well and the faster response time matters more than marginal reasoning quality.

The real unlock came when I stopped treating extended thinking as "better Claude" and started treating it as "Claude for a different class of problem." Reasoning depth and response speed are a trade-off. Adaptive thinking in 2026 makes that trade-off more automatic — but you still need to know when the trade-off is worth making in the first place.

---

*More from this series: [building agents with Claude's tool use API](/en/ai/building-ai-agents-with-claude-tool-use), [multi-agent orchestration](/en/ai/multi-agent-systems-with-claude-orchestrator-worker), [MCP: wiring Claude into everything](/en/ai/mcp-model-context-protocol-wire-claude-into-everything).*
