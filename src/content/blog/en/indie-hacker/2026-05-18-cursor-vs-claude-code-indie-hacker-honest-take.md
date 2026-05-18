---
title: "Cursor vs. Claude Code: An Indie Hacker's Honest Take After 30 Days"
date: 2026-05-18T09:00:00
categories: ["indie-hacker"]
tags: ["Indie Hacker", "AI", "Claude Code", "Cursor", "Developer Tools", "Productivity"]
summary: "I spent 30 days using both Cursor and Claude Code on real side projects. Here's what no one tells you: you don't have to pick one — and the real question isn't which is better, it's knowing when to use which."
toc: true
comments: true
image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80"
imageAlt: "Code on a computer screen — Photo by Ilya Pavlov on Unsplash"
---

There's a war happening in developer Twitter right now, and it's exhausting.

Team Cursor. Team Claude Code. Somehow this has become a personality trait.

I've been building side projects for years — [Buckist](https://buckist.app), myMoney, and a handful of apps that never shipped. I know what it's like to juggle a full-time job, limited weekend hours, and a long backlog of features you *really* want to ship. So when agentic AI coding tools started maturing in late 2025, I committed to actually using both seriously — not just playing with demos.

Thirty days. Real features. Real bugs. Real side projects.

Here's my honest take.

## First, Some Context

The question "Cursor or Claude Code?" is the wrong question if you don't understand what each tool is actually optimized for.

**Cursor** is an AI-first IDE. It's VS Code with AI built deeply into the editing loop — tab completion, inline diffs, a chat panel that understands your file. It's *interruption-driven*: you type, it suggests, you accept or reject. The feedback loop is tight and immediate.

**Claude Code** is an autonomous agent. It starts as a CLI (though the desktop app got a solid redesign in early 2026), and it operates differently: you describe a task, it proposes a plan, you approve, and then it *executes* — making multi-file edits, running tests, iterating on failures, and reporting back. It's *plan-first*.

These are fundamentally different interaction models. Cursor augments your flow. Claude Code replaces chunks of it.

## What I Actually Built

I used both tools on three real projects over the 30 days:

1. **Buckist** — adding a new expense sharing feature. Involved touching the Android Compose UI, the Room database schema, and the sync logic.
2. **A new web dashboard** — a simple Astro + Tailwind site to visualize spending data. Greenfield.
3. **This blog** — yes, I used AI tools to help migrate some older posts and add features to the Astro setup.

These aren't toy projects. They have existing codebases, dependencies, and opinionated structure. That matters, because AI tools behave very differently on greenfield vs. legacy code.

## Cursor: Where It Shines

If you haven't used Cursor beyond a quick trial, the thing that clicks after a few days is **how well it disappears into your workflow**.

Tab completion for non-obvious code — the kind where you know *what* you want but you'd have to look up the exact API — is genuinely faster than Googling. Suggesting the right Room DAO query syntax, auto-completing a Tailwind class combination I'd never memorized, filling in the boilerplate for a new Compose screen. These aren't dramatic moments. They're just... less friction.

The **Composer** (multi-file editing mode) is where it gets interesting. I described the expense sharing feature in plain language:

> "Add a way for users to split an expense with multiple people. Each person gets assigned a share. Store shares in a new Room table linked to the expense. Show the split in the expense detail screen."

Cursor went off, touched 6 files, and got about 70% of it right on the first pass. I needed to correct the Room relationship (it used a one-to-many incorrectly) and the Compose state handling was a bit off. But it scaffolded everything — the data class, the DAO methods, the ViewModel, the UI — and I refined from there.

**Cursor's strength: the everyday editing loop.** Small completions. Single-file changes. Explaining why that nullable crash is happening. The "I know what I want, I just don't want to type it all out" situations.

## Claude Code: Where It Shines

The first time Claude Code genuinely impressed me wasn't on a feature. It was on a **refactor**.

I had a mess in the myMoney codebase — a 400-line ViewModel that had grown out of control, doing too many things. I'd been avoiding it for months because untangling it manually would take an afternoon and I couldn't afford the risk of breaking things.

I opened Claude Code and described the refactor I wanted. It read the whole file, proposed a plan (splitting into 3 ViewModels, extracting a use case layer, adjusting the DI graph), and I approved. It then:

- Made all the changes across 11 files
- Updated the Hilt modules
- Ran the tests
- Fixed two failures it introduced
- Summarized what it changed and why

Forty minutes. No context switching. I reviewed the diff, caught one thing it missed, asked it to fix that, and it was done.

That's when I understood the actual value proposition of agentic AI. It's not that it writes code faster than me — it's that it **eliminates the context-switching tax** of large, multi-file tasks.

**Claude Code's strength: big, risky, multi-file tasks you've been procrastinating on.** Migrations. Refactors. Adding a new library across the whole codebase. CI cleanup. Setting up a whole new page/feature from scratch with all the plumbing.

## The Honest Friction Points

### Cursor

- **Context limits in Composer** — on larger codebases, it starts losing the thread. It might correctly edit 6 files but then forget a dependency in file 7. You learn to break requests into smaller chunks.
- **Confident incorrectness** — it will sometimes complete code that looks right but is subtly wrong. The more obscure the library, the worse this gets. You still need to understand what it's generating.
- **Pricing creep** — the $20/month Pro plan is reasonable, but the fast model requests run out faster than you'd expect on an active coding day.

### Claude Code

- **Slower feedback loop** — because it's plan-then-execute, it's not great for "what does this function do?" or "give me a quick variant of this code." You wouldn't use a sledgehammer to hang a picture.
- **It can go too far** — I gave it a loose prompt once and it refactored things I didn't ask it to touch. Now I'm more explicit. "Only change files in `src/features/expense`. Do not touch the DI graph."
- **The cost** — running Claude Code with Claude Opus on a heavy session adds up. Max plan at $100/month or usage-based billing requires some awareness. It's not for casual use.

## The Workflow That Actually Works

After 30 days, I stopped thinking about this as a competition. My workflow now:

**Daily coding → Cursor.** It lives in my editor. Low friction. Handles everything in the "I know what I want" category.

**Big tasks / scary refactors → Claude Code.** I batch these up. When I have a meaty task — a migration, adding a new feature end-to-end, fixing a systemic issue — I hand it to Claude Code and walk away for 30-40 minutes.

**Rough split: ~60% Cursor, ~40% Claude Code by time. But Claude Code handles more lines changed per session.**

I've seen the same split echoed by other developers. The teams winning in 2026 aren't picking sides — they're orchestrating both.

## Is It Worth the Money?

For indie hackers: yes, with caveats.

Cursor Pro at **$20/month** is a no-brainer if you're shipping code weekly. The productivity lift on the daily editing loop pays for itself in a few saved hours.

Claude Code is trickier. If you're on the Claude Pro plan ($20/month) and use Claude Code occasionally, it's included. For serious autonomous sessions, you'll want the Max plan ($100/month) or usage-based API access. That's a real cost for a bootstrapped project. My rule: I only run a long Claude Code session if I can clearly articulate a task that would take me at least 2 hours manually.

The ROI math:
- 2 hours of dev time at $50/hr opportunity cost = $100
- If Claude Code saves that 2 hours once per month, Max plan pays for itself

For me, it saves that on the first week.

## The Bigger Picture

Here's what 30 days of using these tools seriously taught me, beyond the tool comparison:

**The bottleneck isn't writing code anymore.** It's knowing what to build, architecting it correctly, reviewing what the AI produces, and catching the 20% it gets wrong. The skill set that matters has shifted.

If you're an indie hacker, this is good news. You're probably already good at the parts that matter — product sense, knowing your users, shipping quickly, making decisions. AI tools compress the execution layer. The 10x developer of 2026 isn't someone who types faster; it's someone who describes, reviews, and steers effectively.

My suggestion: don't spend another week debating Cursor vs. Claude Code on Twitter. Pick one, use it on a real project for two weeks, then add the other. Let the work tell you what you need.

---

*What AI coding tools are you using for your side projects? Drop a comment — I'm genuinely curious what's working for others.*
