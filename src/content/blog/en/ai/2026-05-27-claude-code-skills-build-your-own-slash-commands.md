---
title: "Claude Code Skills: How I Stopped Repeating Myself and Built My Own Slash Commands"
date: 2026-05-27T08:00:00
categories: ["ai"]
tags: ["AI", "Claude", "Claude Code", "Developer Productivity", "Automation", "Workflow"]
summary: "Claude Code's built-in slash commands are great — but the real power is writing your own. Here's how I automated my most repetitive dev workflows with custom skills, complete with real examples you can steal."
toc: true
comments: true
image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1200&auto=format&fit=crop"
---

If you've been using Claude Code for more than a few weeks, you've probably noticed a pattern. You keep typing the same kinds of requests:

- *"Review this for security issues before I push."*
- *"Generate a commit message for these changes."*
- *"What should I mention in my standup today?"*
- *"Check if there are any obvious bugs I missed."*

You're typing these nearly every day. Maybe with slight variations, but the intent is always the same.

That's the problem custom skills solve. You're not writing a script — you're encoding your own judgment, your team's standards, and your personal workflow into a slash command that Claude understands. Once I started building my own, I cut the repetitive prompting by about 70%. And the output quality went *up*, because my skills carry context that I'd otherwise have to re-explain every single time.

<img src="https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1200&auto=format&fit=crop" alt="A dark terminal screen with code — where custom Claude Code skills live and work."/>

## What Are Claude Code Skills?

Claude Code skills are Markdown files that define custom slash commands. The filename becomes the command name. The content is the prompt — a set of instructions that Claude follows when you invoke the skill.

Store them in `~/.claude/skills/` (global, available in every project) or `.claude/skills/` (project-local, committed to your repo).

A skill named `standup.md` becomes `/standup`. A skill named `pr-ready.md` becomes `/pr-ready`. That's really all there is to the mechanics.

What makes them powerful is the combination of three things:

1. **Persistent context** — You write the briefing once, not every session.
2. **Structured output** — You can specify exactly what format you want.
3. **Tool access** — Skills can read files, run commands, check git state — everything Claude Code can already do.

The official Anthropic skills directory (`claude-plugins-official`) has hundreds of community-contributed skills. But the ones I find most valuable are the ones I write myself, because they encode *my* workflow, not a generic one.

## Anatomy of a Skill File

Here's the simplest possible skill:

```markdown
---
description: "Count the lines of code changed since the last git tag"
---

Run `git diff $(git describe --tags --abbrev=0)..HEAD --stat` and summarize
the changes. Show total lines added/removed, files changed, and the top 5
most-changed files. Format the output as a short, readable summary.
```

Save that as `~/.claude/skills/diff-summary.md` and you now have `/diff-summary` available in every Claude Code session.

The frontmatter supports a few fields:

```yaml
---
description: "What this skill does — shown in /help output"
argument-hint: "[component-name]"   # Optional hint shown after the command name
---
```

Everything after the frontmatter is the prompt that Claude receives. You can use placeholders like `$ARGUMENTS` to pass whatever you type after the command name into the prompt.

## Three Skills I Use Every Day

### 1. `/standup` — My Daily Standup in 30 Seconds

Every morning I spend five minutes piecing together what I worked on yesterday from git history, Jira comments, and my memory. It's the most wasteful five minutes of my day.

```markdown
---
description: "Generate a daily standup summary from recent git activity"
---

Look at my recent work to generate a concise daily standup update.

1. Run `git log --oneline --since="yesterday" --author="$(git config user.email)"`
   to see what I committed yesterday.
2. Run `git diff --stat HEAD~5..HEAD` to see recent file changes.
3. Run `git status` to see what's in progress right now.

Format the output as a standup update with three sections:
- **Yesterday**: What I completed (from commits)
- **Today**: What I'm working on (from in-progress changes)
- **Blockers**: Flag anything that looks stuck (uncommitted work that's been
  sitting for a while, failing tests, etc.)

Keep it concise — this should take 30 seconds to read aloud. Use plain language,
not commit message jargon.
```

The first time I ran `/standup` and got a perfectly formatted standup in three seconds, I actually laughed. I'd been writing those manually for years.

### 2. `/pr-ready` — My Pre-Push Sanity Check

I have a bad habit: I think I'm done, I push, and then I realize I left a `console.log` in the code, or there's a TODO comment that wasn't supposed to ship, or my tests don't actually cover the edge case I just added.

```markdown
---
description: "Run a pre-push checklist before creating a PR"
---

I'm about to create a pull request. Help me make sure it's actually ready.

Run through this checklist in order:

1. **Tests**: Run `npm test` (or the appropriate test command for this project).
   Report pass/fail. If tests fail, stop and tell me what's broken — don't
   continue the checklist.

2. **Lint**: Run `npm run lint` or `eslint .` if a lint config exists.
   Report any errors (not warnings).

3. **Debug artifacts**: Scan changed files for `console.log`, `debugger`,
   `TODO`, `FIXME`, `HACK`, and `XXX` comments. List any you find with
   file names and line numbers.

4. **Diff review**: Run `git diff main...HEAD` and look for:
   - Hardcoded credentials, API keys, or secrets
   - Commented-out code blocks (more than 3 lines)
   - Functions longer than 60 lines (flag, don't block)
   - Obvious logic errors or off-by-one patterns

5. **Summary**: Give me a go/no-go verdict. If it's a "go", write a one-paragraph
   PR description I can paste directly into GitHub. If it's a "no-go", list
   what I need to fix first.

Be specific — include file names and line numbers for every issue you find.
```

The key thing I learned: putting the test step first with a hard stop saves a lot of time. No point checking for `console.log` statements if the tests are broken.

<img src="https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=1200&auto=format&fit=crop" alt="Code on a MacBook screen — the output of a productive development session ready for review."/>

### 3. `/explain [file-or-function]` — Codebase Onboarding on Demand

This one is less about automation and more about cognitive load. When I jump into a file I haven't touched in three months, I don't want to read it linearly. I want to be briefed.

```markdown
---
description: "Explain a file, function, or module — what it does, why it exists, how it fits"
argument-hint: "[file-path or function-name]"
---

Explain $ARGUMENTS to me as if I'm a senior engineer who hasn't seen this code
before.

1. Read the file or find the function/class the user is asking about.
2. If it's a file, also read any files it imports from that aren't standard library.
3. Check git log for this file: `git log --follow -p --max-count=5 -- $ARGUMENTS`
   to understand how it evolved and why key decisions were made.

Give me:
- **What it does**: One paragraph, plain English, no jargon.
- **Why it exists**: What problem does it solve? What's the alternative if this
  didn't exist?
- **How it fits**: What calls into this? What does it call? Where does it sit
  in the overall architecture?
- **Gotchas**: What's non-obvious, tricky, or surprising about this code?
  What would trip up someone who read it for the first time?
- **Key decisions**: What design choices are baked in here, and why?

Use the git history to explain *why*, not just *what*. The current code
explains what — I need the history to explain the reasoning.
```

The git history part is what makes this genuinely useful. Reading the code tells you what it does. Reading the commit history often tells you *why* certain decisions were made — a constraint that was removed, a performance issue that was worked around, a security patch that changed the shape of an API.

## Writing Skills That Actually Work

After building maybe thirty skills and throwing out half of them, here's what I've learned:

### Be specific about format, not just content

A skill that says "summarize the changes" is less useful than one that says "write a three-sentence summary, then a bullet list of specific files changed, then a one-line description of the overall intent."

Claude is very good at following formatting instructions. Use that. Your future self will thank you when the output drops directly into a Slack message or a PR description without editing.

### Use `$ARGUMENTS` for flexibility, not vagueness

Skills that take arguments are more reusable, but only if the argument is genuinely variable. A skill like `/review $ARGUMENTS` where `$ARGUMENTS` is "what to review" is too vague — just use `/review` and let Claude look at the diff.

Good uses of `$ARGUMENTS`:
- `/explain auth/login.ts` → the argument is a specific file path
- `/generate-test UserService` → the argument is a class name to test
- `/migrate v2 v3` → the arguments are version numbers for a migration task

### Encode your team's standards, not just generic best practices

The most valuable skills I have are the ones that know our team's conventions. Things like: "we use `Result<T, Error>` instead of throwing exceptions," "API response types live in `src/types/api/`," "test files go in `__tests__/` next to the source file, not in a separate directory."

A generic `/code-review` skill is useful. A `/code-review` skill that knows our project's conventions is a superpower.

### Add stopping conditions

If a skill runs multiple steps (like `/pr-ready`), add explicit stopping conditions: *"If step 2 fails, stop and report — don't continue."* Without this, Claude will sometimes plow through a failing test run and give you a "looks good!" verdict based on the static analysis alone.

### Keep skills focused

I have a `/security-check` skill that only looks for security issues. I have a `/performance-check` skill that only looks for perf issues. I resisted the urge to merge them into one big `/check-everything` skill.

Focused skills produce better output because Claude can apply more depth to a narrower task. Combined skills tend to produce shallower results across all dimensions.

## The Ecosystem Is Growing Fast

I mentioned `claude-plugins-official` and `knowledge-work-plugins` — both are seeing massive activity right now. Some highlights from the community:

- **`/academic-search`** — finds relevant papers, summarizes them, and formats citations
- **`/db-explain`** — reads your schema and explains a query's execution plan in plain English
- **`/incident-report`** — given a Slack thread or error log, generates a structured post-mortem draft
- **`/changelog`** — generates a user-facing changelog from commit history between two tags

Most community skills need some customization to fit your specific setup, but they're good starting points. I usually read the skill file, understand what it's doing, then edit it to match my project's conventions.

## Project-Level Skills Are Underused

One pattern I don't see enough of: committing skills to your project repo in `.claude/skills/`.

If your team uses Claude Code, project-level skills mean everyone on the team gets the same custom commands automatically. The skills can be tailored to your codebase — knowing your directory structure, your test setup, your deployment process.

A few project-level skills I've found valuable to share with teams:

```markdown
# .claude/skills/run-integration-tests.md
---
description: "Run the integration test suite with proper env setup"
---

Run the integration tests with correct environment setup:

1. Check that Docker is running: `docker ps`
2. Start test dependencies if not running: `docker-compose -f docker-compose.test.yml up -d`
3. Wait for health checks: `docker-compose -f docker-compose.test.yml ps`
4. Run tests: `npm run test:integration`
5. Capture and display the full output including any failure details.

If Docker isn't running, explain how to start it and stop — don't try to start
Docker yourself.
```

Now `/run-integration-tests` works for everyone on the team, and nobody has to remember the Docker dance.

## Where This Is Going

The Claude Code skills ecosystem feels like it's in the same place npm was around 2013 — early enough that building and sharing useful packages is still a meaningful contribution, established enough that the ecosystem is clearly going to keep growing.

The more interesting development to me is teams starting to use skills as documentation. Instead of writing a Confluence page titled "How to run the test suite," you write a `/run-tests` skill. The skill is always current (Claude will figure out the actual command), it's executable, and it lives in the repo next to the code it describes.

That's a different relationship between documentation and tooling than we've had before.

## Getting Started

If you're not using custom skills yet, here's the shortest path:

1. Find the task you type to Claude most often. Write it as a skill file.
2. Save it to `~/.claude/skills/the-task-name.md`.
3. Run `/the-task-name` and see if the output matches what you'd have written manually.
4. Iterate on the prompt until it does.

That's it. You don't need to understand all the frontmatter options or the full ecosystem. One skill that saves you two minutes a day saves you twelve hours a year. Start there.

If you build something useful, share it. The community skills repos are open for contributions, and the quality of what's in there goes up every week.

Happy building. 🛠️
