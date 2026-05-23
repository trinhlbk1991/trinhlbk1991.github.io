---
title: "From Copilot to Co-Director: How Agentic AI Changes the Developer Workflow"
date: 2026-05-23T08:00:00
categories: ["indie-hacker"]
tags: ["AI", "Agentic AI", "Developer Tools", "Productivity", "Claude Code", "Cursor", "Software Engineering", "Multi-Agent"]
summary: "Most developers are still using AI like a smart autocomplete. The shift to agentic AI — where models plan, execute, and self-correct across multi-step tasks — is fundamentally different. And it changes what 'being a developer' actually means."
toc: true
comments: true
image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80"
imageAlt: "Circuit board close-up representing AI systems and orchestration — Photo by Alexandre Debiève on Unsplash"
---

There is a moment most developers hit with AI tools where the magic fades.

You've been using GitHub Copilot or Cursor's tab completion for months. It's genuinely useful — saving keystrokes, generating boilerplate, filling in function bodies faster than you could type them. But somewhere around month three you realize: this thing is still just doing what I tell it to do, one line at a time. I'm still making every decision. I'm still doing all the thinking. I just have a faster typist.

That's copilot mode. You're flying the plane; the AI is handling some of the instrument panel.

Then you discover agentic mode — and the metaphor breaks entirely.

<img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80" alt="Circuit board and chips — the infrastructure of autonomous AI systems" />

## What "Agentic" Actually Means

The word gets thrown around a lot, so let me be specific about what I mean.

A **copilot** AI responds to a prompt and produces an output. You write the next step. Loop.

An **agentic** AI receives a goal, breaks it into sub-tasks, executes them in sequence (using tools, reading files, running commands), evaluates its own output, self-corrects, and continues — until the goal is achieved or it hits something that requires human judgment.

The difference isn't subtle. It's the difference between asking someone "what does this function do?" and asking someone "here's the codebase, here's the ticket, ship it and tell me when it's done."

I first felt this shift clearly about four months ago. I was working on [Buckist](https://buckist.app) and had a straightforward but tedious task: migrate a feature from one data model to a completely different schema, update all the affected screens, fix the tests, and make sure the existing behavior was preserved. Classic refactor. Probably half a day of methodical work.

I wrote a brief description of what needed to change, handed it to Claude Code, and went to make coffee.

When I came back, the refactor was done. Not perfectly — there were two things I caught in review that needed fixing. But the 80% was right, and it had handled the parts I always forget (updating the mock data in tests, touching the secondary screen that references the same model). It had *planned* the task before executing it.

That's when the mental model shifted for me.

## The Numbers Say This Is Happening Fast

I was curious whether my experience was an outlier, so I dug into the data.

Gartner reported a **1,445% surge in enterprise inquiries about multi-agent AI systems** between Q1 2024 and Q2 2025. Not 14%. Not 144%. Fourteen hundred and forty-five percent.

Anthropic's own 2026 Agentic Coding Trends Report introduced the concept of "repository intelligence" — AI that doesn't just understand lines of code, but understands the relationships, architecture patterns, and intent *behind* the code. The framing shift in the report: we've moved from AI as augmentation to AI as **delegation**.

Meanwhile, GitHub data shows that AI-authored code now represents 26.9% of all production code — up from 22% the previous quarter. That's not autocomplete suggestions. That's agentic completion of substantial tasks.

This isn't a trend that's coming. It's here, and it's accelerating faster than most developers have adjusted their mental models to account for.

## The Skill Shift Nobody Is Talking About

Here's the uncomfortable truth: most developer education — tutorials, courses, bootcamps — is still optimized for the copilot world. Write good code. Understand algorithms. Master the framework.

In the agentic world, those skills still matter, but they're increasingly **table stakes rather than differentiators**. The new layer — the one that actually determines whether an AI agent produces useful work or an expensive mess — is something different.

I've been calling it **direction**. And it breaks down into three parts:

### 1. Task Decomposition

An AI agent is only as good as the task you give it. Vague goals produce expensive wandering. The developers who get the most out of agentic tools have learned to break work into tasks that are:

- **Bounded**: Clear start state, clear end state, clear success criteria
- **Self-contained**: Doesn't require the agent to make judgment calls about product direction
- **Reviewable**: The output fits in a diff you can actually evaluate in 10 minutes

This sounds simple. It's not. Decomposing a fuzzy "improve the onboarding flow" into a sequence of bounded, agentic tasks is genuinely hard cognitive work — and it's the part AI can't yet do reliably for you.

### 2. Context Engineering

I wrote about [MCP servers](/en/indie-hacker/mcp-servers-the-upgrade-your-ai-dev-setup-is-missing) a few weeks ago — the idea that AI quality is gated by context quality. This is even more true in agentic mode.

When an agent is running a 15-step task autonomously, any context gap compounds. If it doesn't know about the API rate limit on that third-party service, it'll build something that works in tests and breaks in production. If it doesn't know that your naming convention differs from the framework default, it'll introduce inconsistencies throughout. If it doesn't know that you prefer explicit error handling over silent fallbacks, it'll build the wrong thing confidently.

The craft is building a context layer — through CLAUDE.md files, custom instructions, MCP tooling — that gives the agent the same situational knowledge a senior engineer would carry in their head.

### 3. Review at the Right Level

This is where experienced developers have a massive advantage, and where the risks for undisciplined usage are real.

Agentic AI generates a lot of code, fast. The failure mode isn't that the code is obviously wrong. The failure mode is that the code is *plausibly* right — it compiles, tests pass, it does something that resembles what you asked for — but it's built on a wrong assumption, or introduces a subtle architectural problem, or misunderstands an edge case that matters.

The review skill in the agentic world is not line-by-line syntax checking. It's **concept-level evaluation**: does this approach solve the right problem? Does this abstraction fit the existing system? Does this handle the edge cases that actually matter? Those are questions that require judgment and system knowledge that agents don't have — yet.

<img src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=1200&auto=format&fit=crop&q=80" alt="Developer reviewing code on a laptop — the review layer is the new critical skill" />

## What This Means for Mobile Developers

I've been an Android developer for over a decade, and when I look at this shift through that lens, something becomes clear: **mobile developers are unusually well-positioned for the agentic era**.

Here's why.

Mobile development has always forced you to think in bounded, reviewable units. An Android feature has a clear scope: Activity, Fragment, ViewModel, Repository, tests. You've been writing tickets that map to that structure for years. That's task decomposition instinct baked in.

Mobile development also has a high review bar because the cost of a bad release is high. You can't hot-patch production on iOS without going through App Store review. A bad Android update that crashes on Samsung devices is a one-star review avalanche. That forces the habit of reviewing for correctness, not just completion — which is exactly the review discipline that agentic AI requires.

And mobile developers tend to care about performance in ways that web developers sometimes don't — memory, battery, latency. That attention to constraint is valuable when directing agents, because agents left unconstrained will build for the easy case, not the optimized case.

## The Practical Shift

If you want to move from copilot mode to director mode, here's what I've changed in my workflow:

**Write the plan before the prompt.** Before I ask Claude Code to do anything non-trivial, I spend 5 minutes writing out the approach in plain English — what should change, what should stay the same, what success looks like. Half the time I catch a problem in the planning that would have sent the agent in the wrong direction.

**Give agents explicit boundaries.** "Update the user profile screen" is a bad agentic prompt. "Update the user profile screen to display the new `displayName` field from the updated `UserModel`, without touching the ProfileViewModel or any other screen" is a good one. Constraints are a feature, not a limitation.

**Review the approach, not just the diff.** When an agent completes a task, my first question isn't "does this compile?" It's "is this the right approach?" A correct implementation of the wrong abstraction is worse than no implementation — it's technical debt with working tests.

**Use agents for the execution layer, not the design layer.** Architecture decisions, API design, data model choices — I still make those. Once I know what I'm building and how, I hand the execution to the agent. That division of labor is getting sharper over time.

## The Honest Caveat

I want to be clear about where this breaks down.

Agentic AI on a well-structured, well-documented codebase with a developer who writes good task decompositions and reviews output carefully: genuinely transformative.

Agentic AI on a messy codebase, with vague prompts, and minimal review: genuinely dangerous. Not "it might write bad code" dangerous — "it will confidently propagate architectural mistakes across 30 files before you realize what happened" dangerous.

The [10% productivity figure I wrote about last week](/en/indie-hacker/93-percent-developers-use-ai-why-productivity-only-10-percent-better) is partly explained by this. Teams using AI agentically without the direction skills see increased velocity and increased bugs and more time in rework. The speedup is real; so is the mess.

The good news is that the direction skills are learnable. They're not algorithmic — they're engineering judgment applied to a new kind of tool. If you've spent years thinking about system design and code quality, you already have most of the raw material. You just need to redirect those habits toward the new abstraction layer.

## Where This Is Going

The honest assessment: in 12-18 months, most professional software will be built with heavy agentic AI involvement in execution. The question isn't whether to adapt, but how fast.

The developers who will thrive aren't the ones who write the most code. They're the ones who can **define** what needs to be built, **direct** an agent to build it, and **verify** that what was built is actually right.

That's a different job description than the one I started my career with. It's not a lesser one. If anything, it emphasizes the parts of this work I find most interesting — the thinking, the architecture, the judgment — and removes the parts that were always just overhead.

The plane still needs a pilot. The pilot's job has just changed.

---

*This is part of the ongoing series on how I'm navigating AI-assisted development while building [Buckist](https://buckist.app). If this resonated (or you think I'm completely wrong), drop it in the comments.*
