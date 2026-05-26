---
title: "How I Cut My Claude API Bill by 90%: Prompt Caching in Practice"
date: 2026-05-25T08:00:00
categories: ["indie-hacker"]
tags: ["Claude", "Anthropic", "Prompt Caching", "API", "Cost Optimization", "Python", "AI", "Indie Hacker", "Tutorial"]
summary: "Most developers using Claude's API are paying 10x more than they need to. Prompt caching drops input token costs to 10 cents on the dollar — two lines of code, immediate effect. Here's the math, the implementation, and the patterns that actually move the needle."
toc: true
comments: true
image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80"
imageAlt: "Blue-lit server racks in a data center — Photo by Taylor Vick on Unsplash"
pin: false
math: false
mermaid: false
---

Three weeks after launching a Claude-powered feature in [Buckist](https://buckist.app), I opened my Anthropic console and stared at a number that made no sense.

The feature was working great. Users loved it. But the API cost was running about $180/month for a level of usage I'd estimated at $20. I went back through the math. Correct number of requests, correct token counts, correct model. The arithmetic was right. The bill was wrong.

The problem wasn't my math. It was that I was sending a 12,000-token system prompt on every single request — and paying full input price for it every time. The system prompt hadn't changed once. I was paying for the same 12,000 tokens, over and over, as if Claude had never seen them before.

Prompt caching fixes this. And it took me two lines of code to fix the entire problem.

<img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80" alt="Server racks bathed in blue light — every API call processes your tokens from scratch unless you cache them" />

## What Prompt Caching Actually Is

Here's the thing: when you send a request to the Claude API, the model processes every token in your prompt from scratch. Every time. Your 8,000-token system prompt that describes your app's personality, your few-shot examples, your domain knowledge — processed fresh on each call, billed as new input tokens every time.

Prompt caching changes this. You mark parts of your prompt as cacheable. On the first request, Claude processes those tokens and stores them as a cached "prefix." On subsequent requests with the same prefix, Claude reads from cache instead of reprocessing — and cache reads cost **10% of the standard input price**.

That's not a 10% discount. It's a 90% reduction on the cached portion.

The cache is keyed on the exact content of the prefix. If your system prompt hasn't changed (and why would it?), every request after the first is a cache hit.

## The Math: Why This Is a Bigger Deal Than It Sounds

Let me run the numbers for a realistic Claude-powered app.

**Scenario:** A coding assistant with a 10,000-token system prompt (detailed instructions, few-shot examples, style guide). You're running 500 requests/day on Claude Sonnet 4.6.

**Without caching:**
- 10,000 tokens × 500 requests = 5,000,000 input tokens/day
- At $3/MTok: **$15/day → $450/month** just for the system prompt

**With 5-minute caching:**
- Day 1 first request: 10,000 cache write tokens ($3.75/MTok) = $0.0375
- Every subsequent request: 10,000 cache read tokens ($0.30/MTok) = $0.003
- 499 cache hits/day = $1.497/day from the system prompt
- **$1.50/day → ~$45/month**

That's a drop from $450 to $45 — **for the system prompt alone**, with zero change in what Claude receives or outputs.

For a larger system prompt on Opus 4.7 — say, a 50,000-token context — the savings are even more extreme. Without caching: $125/day for the system prompt at 500 requests. With caching: ~$7.50/day.

## The Code: Two Minutes to Set Up

There are two ways to enable caching. **Automatic caching** is the easiest:

```python
import anthropic

client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    cache_control={"type": "ephemeral"},  # This one line
    system="Your detailed system prompt here...",
    messages=[
        {"role": "user", "content": "User's question"}
    ]
)
```

That single `cache_control` field tells the API to automatically cache everything up to the last stable content block. For multi-turn conversations, subsequent messages in the growing history also get cached automatically. You don't manage any of it — the API figures out what's stable.

Check if it worked:

```python
print(f"Cache write: {response.usage.cache_creation_input_tokens}")
print(f"Cache read: {response.usage.cache_read_input_tokens}")
print(f"Regular input: {response.usage.input_tokens}")
```

On the first request: `cache_creation_input_tokens` will show the tokens written. On every subsequent request with the same system prompt: `cache_read_input_tokens` will show your savings.

### Explicit Breakpoints for Fine-Grained Control

If you want precise control over what's cached — useful when different parts of your prompt change at different rates — use explicit `cache_control` on individual content blocks:

```python
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    system=[
        {
            "type": "text",
            "text": "You are a code review assistant for Python projects.",
            "cache_control": {"type": "ephemeral"}  # Static persona — always cache
        },
        {
            "type": "text",
            "text": open("codebase_context.txt").read(),  # 8k tokens of project context
            "cache_control": {"type": "ephemeral"}  # Changes daily, not per-request
        }
    ],
    messages=[
        {
            "role": "user",
            "content": f"Review this PR: {pr_diff}"  # Changes every request — not cached
        }
    ]
)
```

The rule: cache content that's identical across requests. Don't put `cache_control` on anything that changes per request — a cache miss every time means you're paying the 1.25x write cost with zero benefit.

<img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80" alt="Analytics dashboard showing cost trends — watching cache hit rates is deeply satisfying" />

## Three Patterns That Pay Off Most

### 1. The Large System Prompt Agent

This is the scenario from the intro. If you've built anything with Claude that has a detailed system prompt — personality, instructions, examples, constraints — you're almost certainly leaving money on the table.

The fix is exactly the snippet above. Mark your system prompt as `ephemeral`. First request writes the cache, every subsequent request within 5 minutes is a hit.

For an agent that runs many requests in sequence (like the agent loop from [the previous tutorial](/en/indie-hacker/build-ai-agent-claude-python-tutorial)), the savings compound: every turn of the agent loop has the same system prompt, and every turn after the first is a cache hit.

```python
SYSTEM_PROMPT = """You are an expert travel planning assistant with deep knowledge
of flight booking, hotel recommendations, local attractions, and visa requirements.

[... 5,000 tokens of detailed instructions and examples ...]
"""

def run_agent(user_message: str):
    messages = [{"role": "user", "content": user_message}]

    for _ in range(10):
        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=4096,
            cache_control={"type": "ephemeral"},  # Cache the whole growing context
            system=SYSTEM_PROMPT,
            tools=TOOLS,
            messages=messages
        )

        if response.stop_reason == "end_turn":
            return response.content[0].text

        # Append assistant response + tool results; next turn reads from cache
        messages.append({"role": "assistant", "content": response.content})
        tool_results = execute_tools(response.content)
        messages.append({"role": "user", "content": tool_results})
```

In a 5-turn agent loop, turns 2–5 all hit the cache. The system prompt cost drops by 90% for the entire session.

### 2. Document Analysis at Scale

You have a large document (contract, codebase, research paper) and you want to ask multiple questions about it. Without caching, you're re-sending the document on every question — paying full input price each time.

With caching, you pay once to write the document to cache and then read it cheaply for every question:

```python
document_text = open("contract.pdf.txt").read()  # 30,000 tokens

questions = [
    "What are the payment terms?",
    "Are there any auto-renewal clauses?",
    "What's the liability cap?",
    "What are the termination conditions?",
]

for question in questions:
    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        system=[
            {
                "type": "text",
                "text": "You are a legal document analyst. Answer questions accurately and cite specific clauses.",
                "cache_control": {"type": "ephemeral"}
            },
            {
                "type": "text",
                "text": document_text,
                "cache_control": {"type": "ephemeral"}
            }
        ],
        messages=[{"role": "user", "content": question}]
    )
    print(f"Q: {question}\nA: {response.content[0].text}\n")
```

First question: 30,000+ tokens written to cache. Questions 2–4: 30,000 tokens read from cache at $0.30/MTok instead of $3/MTok. For 4 questions on Sonnet 4.6, you go from $0.36 to $0.10. Across thousands of documents and hundreds of questions, this is significant.

### 3. Multi-Turn Conversations with Growing History

Chatbots and AI assistants accumulate conversation history. By turn 10, you might have 20,000 tokens of prior context — and you're re-sending it all every turn at full price.

Automatic caching handles this perfectly. The `cache_control` at the request level automatically caches the growing conversation, so each new turn only pays for the new messages, not the entire history:

```python
conversation = []

while True:
    user_input = input("You: ")
    conversation.append({"role": "user", "content": user_input})

    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        cache_control={"type": "ephemeral"},  # Caches up to the latest stable content
        system=SYSTEM_PROMPT,
        messages=conversation
    )

    assistant_reply = response.content[0].text
    conversation.append({"role": "assistant", "content": assistant_reply})

    print(f"Claude: {assistant_reply}")
    # By turn 10: previous 9 turns are cached, you pay only for the new turn
```

For a support chat session averaging 15 turns, caching reduces the per-session cost by 70–85% on earlier turns of the conversation.

## What Not to Cache: The Common Mistakes

**Don't cache dynamic content.** Anything with per-request variation — timestamps, user IDs, session state, the actual user query — should never get a `cache_control` marker. Every cache miss on a marked block costs 1.25x instead of 1x, meaning you pay a penalty for content that never actually caches.

**Don't cache tiny prefixes.** Claude Sonnet 4.6 requires a minimum of 1,024 tokens before caching activates. If your system prompt is 800 tokens, caching is a no-op — you get charged the write cost but no cache is stored. Check the response's `cache_creation_input_tokens` field; if it's 0, you didn't meet the minimum. The fix: expand your system prompt with more detail, examples, or context until you exceed the threshold.

**Don't forget about TTL.** The default cache lasts 5 minutes. If your users have sessions longer than 5 minutes (most do), use the 1-hour TTL for content that needs to persist across a full session.

## The 1-Hour TTL: When to Use It

By default, the cache is valid for 5 minutes. If a request comes in after 5 minutes, the cache miss re-writes it (at 1.25x cost) and the 5-minute window resets.

For long-running sessions or infrequent requests, 5 minutes isn't enough. The 1-hour TTL costs 2x the base input price to write but pays off if you get 2 or more cache reads within the hour:

```python
system=[
    {
        "type": "text",
        "text": LARGE_SYSTEM_PROMPT,
        "cache_control": {"type": "ephemeral", "ttl": "1h"}  # Persists for an hour
    }
]
```

You can mix TTLs in the same request — 1-hour for the stable system prompt, 5-minute for the semi-stable document context that might rotate:

```python
system=[
    {
        "type": "text",
        "text": SYSTEM_PROMPT,
        "cache_control": {"type": "ephemeral", "ttl": "1h"}  # Static, cache for an hour
    },
    {
        "type": "text",
        "text": session_context,
        "cache_control": {"type": "ephemeral"}  # Session-specific, 5 minutes is fine
    }
]
```

The rule: use 1-hour TTL for anything that's stable across user sessions. Use 5-minute for anything that's stable within a session but might rotate between them.

## Pre-Warming: Eliminating Cold Start Latency

One subtlety: the first user request in any session still pays the cache write cost and the full processing time. If latency matters (and it usually does), you can pre-warm the cache before users arrive:

```python
# Run this on server startup, before the first user request
prewarm_response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=0,  # No output needed — just write the cache
    system=[
        {
            "type": "text",
            "text": SYSTEM_PROMPT,
            "cache_control": {"type": "ephemeral", "ttl": "1h"}
        }
    ],
    messages=[{"role": "user", "content": "warmup"}]
)

# Now every actual user request is a cache hit from the start
```

`max_tokens=0` tells the API to process the prompt and write the cache without generating a response — you pay only the cache write cost, and every subsequent request gets the fast, cheap cache read path.

## Stack It with Batch API for Maximum Savings

If you have workloads that aren't time-sensitive — nightly reports, bulk processing, background enrichment — the Batch API gives you a 50% discount on top of prompt caching.

The combination is powerful: cache read tokens already cost 10% of standard. The Batch API applies a 50% discount on that. You're looking at **5% of standard input price** for cached tokens in batch mode.

For a 50,000-token system prompt on Sonnet 4.6 at $3/MTok standard:
- Uncached, real-time: $0.15 per request
- Cached, real-time: $0.015 per request (cache read at $0.30/MTok)
- Cached, batch: $0.0075 per request

Running 1,000 such requests: $150 standard → $7.50 cached → **$3.75 cached + batch**.

For non-interactive processing that can wait minutes or hours, this is the most cost-efficient path to Claude currently available.

<img src="https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&auto=format&fit=crop&q=80" alt="Laptop with code on screen at night — small API changes, big bill impacts" />

## Checking Your Work

Add this to any Claude call to see what's actually happening:

```python
def log_cache_stats(response, label=""):
    usage = response.usage
    cache_read = getattr(usage, 'cache_read_input_tokens', 0)
    cache_write = getattr(usage, 'cache_creation_input_tokens', 0)
    regular = usage.input_tokens

    total_tokens = cache_read + cache_write + regular

    # Cost calculation (Sonnet 4.6 rates)
    standard_cost = total_tokens * 3 / 1_000_000
    actual_cost = (
        cache_write * 3.75 / 1_000_000 +
        cache_read * 0.30 / 1_000_000 +
        regular * 3 / 1_000_000
    )
    savings = standard_cost - actual_cost

    print(f"[{label}] Cache write: {cache_write} | Cache read: {cache_read} | Regular: {regular}")
    print(f"         Standard cost: ${standard_cost:.4f} | Actual: ${actual_cost:.4f} | Saved: ${savings:.4f}")
```

If `cache_read_input_tokens` is consistently 0, something is wrong: the prefix isn't matching (content is changing), you're under the minimum token threshold, or the cache expired between requests.

## The One Thing Most Developers Miss

After fixing Buckist and helping a few other indie hackers audit their Claude API bills, I keep seeing the same pattern: developers who are using Claude heavily, building real things, and completely unaware that they could be paying a fraction of what they're paying.

The fix is almost always the same: add `cache_control` to the system prompt, verify the cache hits in the usage fields, and watch the bill drop.

For the agent loop I [built in the last post](/en/indie-hacker/build-ai-agent-claude-python-tutorial), adding caching reduced the per-session cost from $0.48 to $0.08 for a typical 5-turn session — a number that now actually fits into a freemium tier without bleeding money on every user.

If you're building anything Claude-powered that has more than a minimal system prompt, check your cache hit rate before you do anything else. It's the highest-ROI five minutes you'll spend on your API costs.

---

*Running a Claude-powered app and want to compare notes on API costs? Drop it in the comments — I'm curious whether the numbers others are seeing match what I've found. And if you haven't built the agent loop yet, [start here](/en/indie-hacker/build-ai-agent-claude-python-tutorial) before diving into caching.*
