---
title: "MCP Servers: The Upgrade Your AI Dev Setup Is Missing"
date: 2026-05-19T08:00:00
categories: ["indie-hacker"]
tags: ["MCP", "AI", "Claude", "Developer Tools", "Productivity", "Indie Hacker", "Automation"]
summary: "I spent a week building MCP servers for my side projects. Here's why Model Context Protocol is the most underrated upgrade in the AI dev toolkit right now."
toc: true
comments: true
image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80"
imageAlt: "Fiber optic network cables illuminated in orange — Photo by Jordan Harrison on Unsplash"
---

There's a moment that changed how I use AI tools.

I was debugging a crash in [Buckist](https://buckist.app) — the kind where the stack trace is vague, the logs are in three different places, and the root cause is buried under six layers of abstraction. I described the problem to Claude. Claude gave me a reasonable answer — generic, pattern-matched, not quite right. Because it didn't *know* my codebase. It didn't know my database schema. It was working from description alone.

Then I connected an MCP server.

Same question. This time Claude queried my actual SQLite database, read the relevant files, checked the migration history, and gave me the exact cause in thirty seconds.

That's when I understood what Model Context Protocol actually is: it's the difference between AI that knows *about* programming and AI that knows *your* program.

<img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80" alt="Fiber optic network cables — the connective tissue of a modern AI dev stack."/>

## What Is MCP, Actually?

Model Context Protocol (MCP) is an open standard introduced by Anthropic in late 2024. The idea is deceptively simple: it defines a common way for AI models to connect to external tools and data sources.

Before MCP, every tool had its own proprietary way of giving AI assistants context. Cursor had its own indexing. ChatGPT plugins had their own format. OpenAI function calling had its own schema. Each integration was a one-off — a bespoke bridge between an AI and one specific external system.

MCP standardizes this. A server that speaks MCP can be used by *any* MCP client — Claude Desktop, Claude Code, or any other AI assistant that supports the protocol. Build once, connect everywhere.

The protocol has three building blocks:

- **Tools** — functions the AI can call. Think: query this database, search these files, send this API request.
- **Resources** — data the AI can read. Your README, your schema, your analytics dashboard.
- **Prompts** — pre-built instruction templates for common workflows.

Together, these let you turn any system into something Claude can reason about in real time.

## Why Indie Hackers Should Care

If you've been using Claude Code or Cursor as your primary AI development tool, you've already felt the ceiling.

Claude Code is excellent at reading your *code* — it can traverse files, understand architecture, run tests. But it knows nothing about your *runtime* state: what's in your production database right now, which GitHub issues are blocking your next release, what your users are saying in your support inbox.

MCP closes that gap.

Here's a concrete example from my workflow. Before MCP, if I wanted to understand why a user was churning, I'd:

1. Open my database viewer, manually query the users table
2. Open the analytics dashboard, pull up the session logs
3. Copy-paste all of that into a Claude chat
4. Ask my question

After setting up MCP servers for my SQLite database and analytics, I just... ask Claude. It queries everything itself. The whole loop collapses from 15 minutes to 30 seconds.

That's not a minor convenience. Over a week of development, that adds up to hours of saved context-switching.

## The MCP Servers I Actually Use

Here's my current stack — all configured in Claude Desktop and Claude Code:

### 1. SQLite / Turso MCP Server

This is the one that changed my daily workflow the most. Claude can now:
- Run read queries against my local SQLite databases
- Inspect table schemas
- Trace data anomalies without me needing to write a single SQL statement

The community-maintained `@anthropic-ai/sqlite` MCP server handles this out of the box. Drop your database file path in the config and you're running.

### 2. GitHub MCP Server

This one I probably use most for project management. Claude can browse open issues, read PR descriptions, check CI status, and summarize what's actually blocking the next release. No more tab-switching to GitHub while I'm mid-thought in a coding session.

Anthropic ships an official GitHub MCP server. It connects via your existing GitHub token.

### 3. File System MCP Server

This sounds redundant if you're already using Claude Code — and for *code*, it mostly is. But the file system MCP server shines for non-code files: design documents, user research notes, that one Notion export you saved as markdown three months ago and never imported anywhere properly.

### 4. A Custom Analytics Server (Mine)

This took me a Saturday afternoon to build. My apps export lightweight JSON analytics logs — crash rates, session length, feature usage. I built a tiny MCP server that reads these logs and exposes a `get_analytics_summary` tool.

Now I can ask Claude: *"Which features have the lowest usage but highest crash rate in the last 30 days?"* And it just... answers. With real data. From my actual users.

<img src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1200&auto=format&fit=crop&q=80" alt="Code on a dark screen — the MCP server is only a few hundred lines."/>

## Building Your First MCP Server

The protocol is simpler to implement than it looks. The TypeScript SDK handles most of the boilerplate.

Here's the skeleton of an MCP server that exposes one tool — querying a local JSON file of app reviews:

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fs from "fs";

const server = new McpServer({
  name: "app-reviews",
  version: "1.0.0",
});

server.tool(
  "get_recent_reviews",
  "Returns the most recent user reviews for the app",
  { limit: z.number().optional().default(10) },
  async ({ limit }) => {
    const reviews = JSON.parse(fs.readFileSync("./reviews.json", "utf-8"));
    const recent = reviews.slice(-limit);
    return {
      content: [{ type: "text", text: JSON.stringify(recent, null, 2) }],
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
```

That's it. A few dozen lines. You register tools, each tool has a Zod schema for its inputs, and each returns structured content.

Wire it into Claude Desktop by adding it to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "app-reviews": {
      "command": "node",
      "args": ["/path/to/your/server.js"]
    }
  }
}
```

Claude can now call `get_recent_reviews` mid-conversation. You ask it to summarize what users are complaining about — it pulls the data and tells you.

## The Mental Model Shift

Here's the thing that took me a few weeks to fully internalize: **MCP doesn't make Claude smarter. It makes Claude more informed.**

There's an important distinction. Claude's reasoning capabilities are the same either way. What changes is the quality and specificity of the context it's working with. Garbage in, garbage out — but the reverse is also true. Richer context produces richer answers.

This is why I think MCP is the most important infrastructure development in the AI dev tooling space right now. The race to make models smarter gets most of the attention. But for practical, day-to-day dev work, the bottleneck usually isn't model capability — it's *context*. Does Claude know enough about your specific situation to be useful?

MCP is the answer to that question.

## What I'm Building Next

A few things on my list:

**App Store Reviews MCP** — I want to pipe in my Google Play and App Store reviews so Claude can spot patterns across hundreds of responses without me curating them manually.

**Supabase MCP** — For my web projects. The Supabase MCP server is already in the wild; I just haven't configured it yet.

**CI/CD Status MCP** — Connecting my GitHub Actions logs so I can ask "why did the build fail today?" and get a real answer without clicking through GitHub's UI.

The pattern is always the same: find something you manually copy-paste into Claude, build an MCP server to do it automatically.

## Bottom Line

If you've read my previous posts about [vibe coding](/en/indie-hacker/vibe-coding-a-senior-mobile-devs-honest-take) and [Cursor vs Claude Code](/en/indie-hacker/cursor-vs-claude-code-indie-hacker-honest-take), you know I'm not an AI tool evangelist. I'm interested in what actually ships better software, faster.

MCP servers pass that test. Concretely, measurably.

The setup cost is low — an afternoon to configure existing servers, a weekend to build a custom one. The productivity gain is high — especially for the kind of cross-system reasoning that used to require a lot of manual copy-pasting.

If you're already using Claude Code or Claude Desktop, you're one config file away from giving your AI a real-time window into your project's data. That's a pretty good deal.

Give it a try. Then tell me in the comments what you ended up building.

---

*Links I actually used: [MCP official docs](https://modelcontextprotocol.io), [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk), and the [community MCP server registry](https://github.com/modelcontextprotocol/servers).*
