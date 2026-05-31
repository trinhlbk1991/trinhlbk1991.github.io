---
title: "CLAUDE.md: The File That Makes Claude Actually Know Your Project"
date: 2026-05-29T08:00:00
categories: ["ai"]
tags: ["AI", "Claude", "Claude Code", "CLAUDE.md", "Developer Productivity", "AI Agents", "Best Practices"]
summary: "Every Claude session starts from zero — it doesn't know your codebase, your conventions, or what you care about. CLAUDE.md fixes that. Here's what went viral, why it matters, and how to write one that actually works."
toc: true
comments: true
image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop"
imageAlt: "A developer typing on a laptop — every session with Claude starts from this moment, and what Claude knows depends entirely on what you've prepared."
---

I use Claude Code every single day. It sits in my terminal, reads my files, runs my tests, pushes commits. By now, it has touched almost every file in my codebase.

Except it doesn't remember any of it. Not automatically.

Every time I start a new Claude Code session, Claude starts fresh. No memory of yesterday's conversation. No awareness that this is a TypeScript project with strict null checks. No knowledge that we use Zod for validation, avoid class components, or that the `legacy/` folder is a minefield I haven't had time to refactor.

Unless I tell it. And that's what `CLAUDE.md` is for.

<img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop" alt="A developer typing on a laptop — the moment before a Claude session begins, with or without context." />

## The File That Hit 100K Stars

In April 2026, a 65-line markdown file became the second most-starred repository on GitHub in a single day.

The file was a `CLAUDE.md` template inspired by Andrej Karpathy — developer Forrest Chang built the actual repo after a Karpathy post on LLM coding failure modes, and developers recognized it instantly for what it was: the thing they'd been missing.

Within a week, the repo crossed 100K stars. People weren't starring a file — they were voting for a concept.

The concept: **stop re-explaining your project to Claude every session**. Write it down once. Let Claude read it every time.

## What CLAUDE.md Actually Is

`CLAUDE.md` is a plain markdown file you place at the root of your repository. When you launch Claude Code, it reads this file before doing anything else and uses it as persistent context for the entire session.

That's it. No special syntax. No configuration UI. No API calls. Just a markdown file that Claude reads before starting work.

But the simplicity is what makes it powerful:

- It lives in your repo — it's version-controlled alongside your code
- It's committed to git — every teammate gets the same context automatically
- It's plain text — you can update it in thirty seconds when conventions change
- It's transparent — what Claude knows is exactly what's written there, nothing hidden

The official Claude Code docs call it *"a persistent system prompt you control."* I'd add one thing: it's the system prompt your whole team writes together, and it gets better over time.

## The Four Rules That Went Viral

Karpathy's template is tight. Under 200 lines. Four principles, no filler. Here's what it actually says — and more importantly, *why* it resonated.

### 1. No Silent Assumptions

> State your assumptions explicitly before coding. If there are multiple valid interpretations, present them. If something is unclear, halt and ask.

This one rule eliminates the most common Claude failure mode. Claude's default behavior when it hits ambiguity is to pick an interpretation and execute it with full confidence. A silent wrong assumption at step one means three minutes of watching Claude confidently build the wrong thing — and another ten minutes untangling the diff.

The fix is obvious in hindsight: *make Claude ask*. But Claude doesn't ask by default because asking can feel like failure. This rule gives it explicit permission, and makes verification a first-class part of the workflow rather than an afterthought.

### 2. Simplicity First

> Prefer the simplest implementation that works. No abstractions for single-use code. No error handling for scenarios that cannot happen.

Claude loves to over-engineer. Ask it to add a configuration option and it builds a plugin system. Ask it to add a log line and it proposes a structured logging framework with log levels, rotation, and a metrics adapter. Ask it to write a helper function and it adds an interface, a factory, and an abstract base class.

None of that is wrong — it's just not what you asked for. This rule is a budget constraint: spend complexity only where complexity is needed. Everything else stays flat.

### 3. Surgical Changes

> Complete only the requested task. Do not improve adjacent code unless explicitly asked. Do not refactor while fixing a bug.

The silent refactor is Claude's second most destructive default behavior. You ask it to fix a null pointer exception in `getUserById`, and it returns a diff that also "cleans up" the surrounding module, renames three variables, and adds early returns throughout the file. The bug is fixed but now the PR is unsalvageable.

This rule creates an explicit contract: the scope of a task is the scope of the change. Everything else waits until you ask for it separately.

### 4. Goal-Driven Execution

> Convert every task into a measurable objective with explicit verification steps before starting.

The difference between these two prompts is enormous:

- *"Add a login form."*
- *"Add a login form — success when: renders at /login, accepts valid credentials, shows error state on invalid credentials, passes the existing auth test suite."*

The second gives Claude a finish line. Without one, agents loop — making more changes, running more commands, increasingly uncertain about what "done" looks like. A measurable goal is how Claude knows when to stop.

## Writing Your Own CLAUDE.md

Karpathy's template is a universal starting point. But a CLAUDE.md that actually works for *your* project has your project's specifics in it. Here's the structure I've converged on after months of daily use.

### Section 1: Project Context

One paragraph. What is this? What's the stack?

```markdown
## Project

An Astro blog with TypeScript and Tailwind, deployed to Cloudflare Pages.
Content lives in `src/content/blog/` as Markdown files with Zod-validated frontmatter.
Supports English and Vietnamese via Astro's built-in i18n.
```

Sounds obvious. But this single paragraph stops Claude from suggesting patterns that don't fit (like proposing a webpack config in an Astro project) and saves you from answering *"what framework are you using?"* every session.

### Section 2: Key Directories

Not a full file tree — just the parts Claude needs to navigate without getting lost.

```markdown
## Key Directories

- `src/content/blog/en/` — English posts (Markdown)
- `src/content/blog/vi/` — Vietnamese posts (Markdown)
- `src/components/` — Astro components
- `src/layouts/` — Page layouts
- `public/assets/` — Static images and media
```

### Section 3: Commands

The exact commands to run. Claude uses these when you ask it to build, test, or lint. Precision matters.

```markdown
## Commands

- `npm run dev` — Start dev server (port 4321)
- `npm run build` — Production build
- `npx astro check` — TypeScript check
- `npm run lint` — ESLint
```

This section alone recovers real time per session. Without it, Claude guesses the commands. It guesses `yarn` when you use `pnpm`. It guesses `npm test` when you use `vitest run`. Small errors, but they break flow when you hit them five times a day.

### Section 4: Conventions

The decisions that aren't obvious from reading the code.

```markdown
## Conventions

- Blog post filenames: `YYYY-MM-DD-slug.md`
- Categories: ai, android, ios, fe, javascript, personal, til
- Use Unsplash URLs for images: `https://images.unsplash.com/photo-XXX?w=1200&auto=format&fit=crop`
- Always include `toc: true` and `comments: true` in frontmatter
- Inline images use `<img src="..." alt="..."/>` tags, not Markdown syntax
```

These live in your head but not in the code. Claude has no way to know them unless you write them down.

### Section 5: Avoid

Explicit prohibitions. The things Claude does by default that you don't want.

```markdown
## Avoid

- Do not use class components — functional only
- Do not commit `console.log` debug statements
- Do not modify `legacy/` files without explicit instruction
- Do not install new packages without asking first
```

The last one matters most for projects with strict dependency audits or locked `package.json` files.

### Section 6: Behavior Rules

Karpathy's four rules, verbatim.

```markdown
## Rules

1. Before coding: state assumptions explicitly. If ambiguous, ask.
2. Prefer the simplest working implementation.
3. Change only what's needed. No adjacent refactors.
4. Define a measurable success condition before starting.
```

<img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop" alt="A clean developer workspace with multiple monitors — the kind of environment where a well-tuned CLAUDE.md makes every session smoother." />

## SKILL.md: Taking It Further

Once you have a `CLAUDE.md`, the next level is `SKILL.md` files.

Skills live in `.claude/skills/` and give Claude reusable, documented workflows. Instead of re-explaining a multi-step process every session, you define it once and invoke it with a slash command.

Here's a skill I use on this blog:

```markdown
# new-post

Create a new blog post.

## Steps

1. Check the latest file in `src/content/blog/en/ai/` to confirm date and naming conventions
2. Create a new file at `src/content/blog/en/{category}/YYYY-MM-DD-{slug}.md`
3. Use this frontmatter: title, date, categories, tags, summary, toc: true, comments: true, image (Unsplash URL)
4. Write at least 800 words. Include one inline image between major sections.
5. Run `npx astro check` to verify TypeScript is clean
```

After writing this skill, instead of walking Claude through the process every time, I just say: *"Write a new post about X using the new-post skill."* The instruction budget gets spent on the content, not the setup.

## What Goes Wrong Without It

I ran without a proper CLAUDE.md for about two months after I started using Claude Code daily. The problems were predictable in hindsight:

**Repeated explanations.** Every new session started with the same paragraph: *"This is a TypeScript project, we use Zod, content lives in Astro collections, follow this frontmatter format..."* Minutes per session, compounding into real time per week.

**Silent tech stack mismatches.** Claude suggested Vue patterns in an Astro project. React idioms in a vanilla TypeScript file. Not because Claude was confused — because I hadn't told it the stack. My fault, not Claude's.

**The creeping refactor.** Asked for a small bug fix, got a diff three times larger than it should've been. Claude was "helping." I started every session with *"do not refactor anything not directly related to the task"* — waste of tokens, and I'd sometimes forget. CLAUDE.md handles this once.

**Wrong commands.** *"Run the tests"* produced `npm test` when I use `vitest run`. Small friction, but friction you hit constantly is the kind that makes a tool feel worse over time.

All four disappear with a properly written CLAUDE.md. Not because Claude gets smarter — because you've given it what it needs.

## The Budget Constraint

One warning: **keep it short**.

Claude's effective instruction budget for a session is roughly 150–200 lines before compliance starts degrading. The Claude Code system prompt already uses about 50 of those. If your CLAUDE.md runs to 400 lines, critical rules near the end get silently deprioritized.

Karpathy's template respects this constraint. Under 200 lines, everything essential, nothing decorative. Testing across real codebases showed a CLAUDE.md under that limit cuts Claude's error rate dramatically — one study cited a drop from 41% to 3% over six weeks.

My pruning rule: if a section hasn't visibly influenced Claude's behavior in the past two weeks, it doesn't earn its lines. Delete it. A tight file Claude follows is worth more than a comprehensive one it partially ignores.

## Why 100K Stars Makes Sense

The reason Karpathy's template went viral isn't the four rules themselves. Experienced developers know these things already — don't assume, stay simple, stay focused, verify your work. We tell junior engineers the same things in code reviews.

The reason it hit 100K stars is that it took something developers had been doing *informally* — re-explaining context every session, fighting Claude's default over-engineering, losing to the silent refactor — and turned it into a *file*.

Files are tools. Files can be version-controlled, shared, improved, iterated. Files don't forget between sessions.

A conversation forgets. A `CLAUDE.md` doesn't.

---

If you use Claude Code and don't have one yet: create it today. Start with ten lines. Write down your project, your commands, and the three most common things Claude does wrong. That's a complete first version.

If you already have one: look at it now. Is it under 150 lines? Does it list your actual commands? Does it have explicit prohibitions? Trim what isn't earning its place, add what's missing, commit it.

The investment is an hour. The return is every Claude session you run from here on being faster, more accurate, and less in need of correction.

That's the trade I'd take every time.

---

*What do you put in yours? Drop a comment — I'm always looking for sections I haven't thought of.*
