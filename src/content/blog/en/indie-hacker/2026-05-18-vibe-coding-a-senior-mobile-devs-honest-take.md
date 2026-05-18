---
title: "Vibe Coding: 3 Months In — A Senior Mobile Dev's Honest Take"
date: 2026-05-18T08:00:00
categories: ["indie-hacker"]
tags: ["Vibe Coding", "AI", "Cursor", "Claude Code", "Developer Productivity", "Indie Hacker"]
summary: "I've been vibe coding for 3 months. Here's what actually works, what fails, and whether a senior dev should care."
toc: true
comments: true
image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop"
---

If you haven't heard the term "vibe coding" yet, you probably will very soon. Collins Dictionary named it their **Word of the Year in 2025**. Tech Twitter has been losing its mind over it. And somewhere in your Slack or Discord, someone is almost certainly saying either "this is going to replace all developers" or "this is useless garbage" — with absolutely nothing in between.

I've been experimenting with vibe coding for 3 months now — building features for [Buckist](https://buckist.app), prototyping side projects, integrating it into my daily mobile development workflow. And after all that, I finally feel ready to give you an honest take. Not hype, not doomerism. Just what I actually observed.

<img src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop" alt="An AI coding assistant interface — the new pair programmer."/>

## What Even Is Vibe Coding?

The term was coined by Andrej Karpathy (former Tesla AI director, one of the OGs of deep learning) in early 2025. His original description was almost poetic: instead of writing code line by line, you **describe what you want at a high level** and let an AI system build it for you. You stay in the "vibe" of the product — the user experience, the flow, the feel — while the AI handles the keystrokes.

In practice, this means using tools like:
- **Cursor** — an IDE built on VSCode with deeply integrated AI that understands your whole codebase
- **Claude Code** — an agent that runs in your terminal, can browse files, run commands, and autonomously execute multi-step tasks
- **GitHub Copilot** in agent mode — similar agentic capabilities baked right into VSCode

The pitch is this: instead of being a typist who translates logic into syntax, you become a **director**. You describe the goal, review the output, iterate.

Sounds too good to be true? Let's find out.

## My First Week: Full Skepticism Mode

I'll be honest — my initial reaction was dismissal. I've been writing Android code for 10+ years. I know Kotlin better than some of my family members. The idea that an AI could understand my codebase — with all its context, architecture decisions, legacy quirks, and unwritten rules — seemed borderline ridiculous.

So I tested it the way a senior dev would: I gave it hard things first.

I pointed Claude Code at one of Buckist's most complex modules — the habit scheduling engine — and asked it to add a new recurrence pattern.

And... it got it about 70% right on the first try. Not perfect, but not garbage either. It understood the architecture. It followed the existing patterns. Where it failed was a subtle business rule that lives only in my head — an edge case around timezone handling that wasn't obvious from the code alone.

That failure taught me the most important lesson of the whole 3 months.

## Where Vibe Coding Actually Helps

After 3 months, here's where I genuinely reach for AI tools:

### Boilerplate That Drains Your Brain

New Room entity with migrations? New Retrofit interface with full error handling? A new Fragment with standard MVVM wiring? This stuff takes 5–15 minutes of mechanical typing that requires concentration but generates zero creative value. Claude Code handles these in seconds — and usually follows the patterns in your existing codebase better than a new junior hire would.

### Tests. So Many Tests.

I hate writing unit tests for straightforward utility functions. I know they're important. I know TDD is great in theory. But writing `@Test fun given_X_when_Y_then_Z()` for the 400th time is soul-crushing. AI tools write these fast and they're usually correct. This alone has measurably increased my test coverage.

### Debugging With a Second Brain

Paste a stack trace, describe the context, ask "what's happening here?" This is remarkably useful — not because AI always knows the answer, but because explaining a bug clearly to *anyone* (even an AI) often unlocks your own understanding. The Feynman Technique as a debugging tool.

### Rapid Prototyping for Indie Projects

For a new side project where I just need to validate an idea fast, vibe coding is genuinely transformative. What used to take a weekend to scaffold now takes an afternoon. I built and shipped a working prototype in under 4 hours last month. That's not an exaggeration.

<img src="https://images.unsplash.com/photo-1555066931-bf19f8fd1085?w=1200&auto=format&fit=crop" alt="Dark-mode code on screen — the natural habitat of a vibe coder."/>

## Where It Fails (And This Part Matters More)

Here's where the hype train glosses over the details.

### Anything Architecture-Level

Ask AI to add a feature → great. Ask AI to redesign your data layer → you will end up with a mess. Architecture decisions require holistic understanding of trade-offs, team constraints, long-term maintenance burden, and historical context that AI simply doesn't have. It'll give you *an* answer, and it'll sound confident, but it's pattern-matching from training data — not reasoning from your specific situation.

### Security-Sensitive Code

A 2025 audit found that **45% of AI-generated code contained security vulnerabilities** — command injection, hardcoded secrets, insecure API calls. The AI isn't malicious; it's just optimizing for "code that works" rather than "code that's safe." Always manually review anything touching authentication, payments, or user data. Always.

### The Subtle Business Logic Problem

Like my timezone edge case in Buckist: the rules that live in your head, in Slack threads from two years ago, in a code review comment that nobody reads anymore — AI doesn't know any of that. It'll implement the obvious interpretation. The obvious interpretation is often wrong.

## My Current Setup

After 3 months of experimenting, here's what I actually use day to day:

- **Claude Code** for heavy autonomous tasks — refactoring a module, generating multiple files at once, investigating a bug across the whole codebase. It runs in the terminal and operates independently. I give it a task and context-switch while it works.
- **Cursor** for interactive coding — it's VSCode with superpowers. I write with it open, use its inline suggestions constantly. Faster than GitHub Copilot and its codebase indexing is excellent.
- **Neither one, just thinking** for architecture decisions and anything touching security.

The combination that works best: start a feature with Claude Code (autonomous scaffolding), refine it interactively in Cursor, then review manually before committing. Each tool plays to its strengths.

## The Real Skill Shift

Here's what nobody tells you about vibe coding: **the bottleneck moves from writing to reviewing**.

Before: the hard part was writing the correct code.  
After: the hard part is reviewing AI-generated code well enough to catch what's wrong.

This is actually harder than it sounds. Code review requires deep understanding — you need to see what's *missing*, not just what's there. Junior developers struggle to do this well for AI output. **Senior developers who have spent years doing code review are uniquely positioned to leverage vibe coding safely.** Experience doesn't become less valuable — it becomes the thing that makes AI valuable.

The developers most at risk aren't senior devs who can critically evaluate AI output. They're the ones doing mechanical, low-judgment coding tasks to begin with. And even that timeline is longer than the doomers suggest.

## Bottom Line

After 3 months: **vibe coding is real, it's useful, and it rewards experienced developers more than beginners.**

If you have 10+ years of software experience, AI tools are the highest-leverage productivity upgrade you can add to your workflow right now. Your experience gap means you can evaluate output well, catch mistakes fast, and direct the AI with precision.

If you're a junior developer, use it — but use it to learn, not to skip learning. Understand everything it generates. The developer who blindly ships AI code is building technical debt and skill debt at the same time.

For my indie projects, it's been genuinely transformative. For production mobile code at my day job, it's useful-but-carefully. That ratio will probably shift as the tools get better and my prompting instincts sharpen.

Now if you'll excuse me, I have 3 more prototypes to ship before the weekend. 🛠️

What's your experience with vibe coding? Drop it in the comments — I'm curious whether other mobile devs are seeing the same patterns.

Happy coding!
