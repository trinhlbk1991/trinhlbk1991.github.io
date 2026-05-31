---
title: "MCP: The USB-C for AI Tools (And How I Wired Claude Into Everything)"
date: 2026-05-31T08:00:00
categories: ["ai"]
tags: ["AI", "Claude", "MCP", "Model Context Protocol", "Developer Tools", "Python", "Developer Productivity"]
summary: "Anthropic's Model Context Protocol has quietly become the TCP/IP of AI tool connectivity — 10,000+ servers now exist. Here's what MCP actually is, how the protocol works under the hood, and the servers that transformed my daily Claude workflow."
toc: true
comments: true
image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80"
imageAlt: "Colorful network cables plugged into a patch panel — the physical metaphor for MCP's software connections between Claude and your tools"
---

For the first year I used Claude, every integration I built was bespoke. Every project had its own Python functions, its own `tools=[]` list, its own handcrafted JSON schemas. Want Claude to query a database? Write a tool. Want Claude to read files? Write a tool. Want Claude to check GitHub issues? Write a tool.

It worked. But it didn't compose. Every new project meant starting over. Every new AI client meant rewriting integrations that already existed somewhere else.

Then MCP showed up.

**Model Context Protocol (MCP)** is Anthropic's open standard for connecting AI models to external tools and data sources. In the fourteen months since it launched, it's gone from "interesting experiment" to "the integration layer of the agent era" — with OpenAI, Google, and most major AI frameworks now natively supporting the protocol. There are now over 10,000 community-built MCP servers. Whatever you want to connect Claude to, someone has probably already written the server.

Here's what MCP actually is, how the protocol works under the hood, and the three servers that changed how I use Claude every day.

<img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80" alt="Colorful network cables plugged into a server patch panel — the physical reality behind MCP's software connections" />

## The Problem MCP Solves

Let's say you want Claude to help you debug a production incident. To do that well, Claude needs to:

- Read your source files
- Query the database to check recent records
- Pull logs from your log aggregator
- Check for related open GitHub issues
- Look at recent deployments

With pre-MCP tool use, you'd write custom Python code for each of these. You'd wire up the schemas. You'd test the integration. You'd maintain it when APIs changed. And if you later wanted to use the same integrations with Claude Code CLI, or the Claude desktop app, or a different agent framework entirely — you'd have to adapt everything.

MCP flips the model. **Instead of integrations living in your agent code, they live in standalone servers that any MCP-compatible client can connect to.** You build (or install) the integration once. Every Claude interface that supports MCP gets it automatically.

The USB-C analogy is apt. Before USB-C, every device had its own charging standard. USB-C standardized the physical connection; now the same cable works everywhere. MCP does the same thing for AI tool connectivity.

## How MCP Works

MCP servers expose three types of capabilities:

**Tools** — functions Claude can call to take actions or retrieve data. A GitHub MCP server might expose `create_issue`, `list_pull_requests`, `get_file_contents`. These look similar to the tool schemas in the [Claude tool use API](/en/ai/building-ai-agents-with-claude-tool-use), but they live in the server rather than your application code.

**Resources** — file-like data that Claude can read. Think of these as read-only data sources: the contents of a file, a database record, a document. Resources are optimized for reading; tools are optimized for acting.

**Prompts** — pre-written prompt templates that users can invoke directly. An MCP server for your codebase might expose a "review this PR for security issues" template that already includes the right context and instructions.

The protocol itself runs over **JSON-RPC 2.0**. When an MCP client connects to a server, the exchange looks like this:

```
1. Client connects to server (via stdio or HTTP/SSE)
2. Client sends:   {"method": "tools/list"}
3. Server responds: {"tools": [...]}   ← the full list of available tools
4. Claude registers those tools and can call them like any other tool
5. Client sends:   {"method": "tools/call", "params": {"name": "...", "arguments": {...}}}
6. Server executes and returns the result
```

From Claude's perspective, it's just calling tools. The difference is where those tools are defined — not in your agent code, but in a running server process that any compatible client can talk to.

Two transport modes exist:

| Transport | How it works | Best for |
|---|---|---|
| **stdio** | Server runs as a local subprocess, communicates via stdin/stdout | Local tools, development, desktop apps |
| **HTTP/SSE** | Server runs as a web service, client connects over HTTP | Remote data sources, shared servers, production |

For most personal tooling, stdio is simpler to set up and plenty fast enough.

## The Ecosystem: 10,000+ Servers

When Anthropic open-sourced the MCP specification in late 2024, the community response was immediate. The official MCP servers repository now lists hundreds of reference implementations, and the broader ecosystem has grown to over 10,000 servers covering nearly every category:

- **Data**: PostgreSQL, MySQL, MongoDB, Redis, SQLite, BigQuery
- **Code & Dev**: GitHub, GitLab, Linear, Jira, Sentry, Vercel
- **Productivity**: Notion, Google Drive, Slack, Obsidian, Todoist
- **Infrastructure**: Kubernetes, AWS, GCP, Cloudflare, Docker
- **Local**: Filesystem access, shell commands, browser control
- **APIs**: Stripe, Twilio, Salesforce, and hundreds of SaaS tools

For most use cases today, you configure an existing server rather than writing one. But knowing how to build a server matters — both for internal tools and for understanding what's actually running next to your AI.

<img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80" alt="Code on a monitor — building an MCP server is closer to writing a small API than to building an AI integration" />

## The Three Servers That Changed My Workflow

I've tried a lot of MCP servers over the past year. These three are the ones I use every day.

### 1. Filesystem MCP Server

The most immediately useful one. Before this, asking Claude to help with a codebase meant copying and pasting files into the chat. Now Claude can navigate directories, read files, and understand the full structure of a project on its own.

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/trinh/projects"]
    }
  }
}
```

I no longer paste code into Claude. I describe the file or the pattern I'm looking for and Claude reads it directly. For larger refactors that span multiple files, Claude can hold the full context of a module in a single conversation without me having to hand-feed every file.

### 2. GitHub MCP Server

This one eliminated an entire category of context-switching. Before: look up the issue, copy the description, paste it into Claude, describe what I needed. Now Claude just knows.

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_yourtoken"
      }
    }
  }
}
```

Claude can now list open issues, read PR diffs, check CI status, and create or comment on issues — without me ever leaving the conversation. The workflow for PR review prep went from "open five tabs and summarize manually" to "hey Claude, review this PR against our architecture guidelines."

### 3. A Custom Internal Server

The one that surprised me most was the server I built myself. My team uses a Postgres database with deployment records, service health snapshots, and incident logs. Incident response meant a lot of manual data pulling.

The custom server exposes three tools: `get_recent_deployments`, `get_service_health`, and `search_incidents`. Now when something's broken at 2am, I type "what deployed in the last four hours and are there any related incidents?" and get a useful answer in thirty seconds.

Building that server took about an hour. Here's how.

## Building Your First MCP Server

Let's build a simple MCP server in Python — one that wraps a SQLite database. This is the pattern I use for any internal data source I want Claude to access.

```bash
pip install mcp
```

```python
# server.py
import sqlite3
import asyncio
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import Tool, TextContent

app = Server("sqlite-explorer")

DB_PATH = "your_database.db"


def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


@app.list_tools()
async def list_tools() -> list[Tool]:
    return [
        Tool(
            name="list_tables",
            description="List all tables in the database",
            inputSchema={"type": "object", "properties": {}, "required": []},
        ),
        Tool(
            name="describe_table",
            description="Get the schema of a specific table",
            inputSchema={
                "type": "object",
                "properties": {
                    "table_name": {
                        "type": "string",
                        "description": "Name of the table to describe",
                    }
                },
                "required": ["table_name"],
            },
        ),
        Tool(
            name="query",
            description="Run a read-only SQL SELECT query and return results",
            inputSchema={
                "type": "object",
                "properties": {
                    "sql": {
                        "type": "string",
                        "description": "The SELECT query to run",
                    }
                },
                "required": ["sql"],
            },
        ),
    ]


@app.call_tool()
async def call_tool(name: str, arguments: dict) -> list[TextContent]:
    conn = get_connection()

    if name == "list_tables":
        cursor = conn.execute("SELECT name FROM sqlite_master WHERE type='table'")
        tables = [row[0] for row in cursor.fetchall()]
        return [TextContent(type="text", text="\n".join(tables))]

    if name == "describe_table":
        table = arguments["table_name"]
        cursor = conn.execute(f"PRAGMA table_info({table})")
        columns = cursor.fetchall()
        schema = "\n".join(f"  {col['name']}  {col['type']}" for col in columns)
        return [TextContent(type="text", text=f"Table: {table}\n{schema}")]

    if name == "query":
        sql = arguments["sql"].strip()
        if not sql.upper().startswith("SELECT"):
            return [TextContent(type="text", text="Error: only SELECT queries are allowed")]
        cursor = conn.execute(sql)
        rows = cursor.fetchall()
        if not rows:
            return [TextContent(type="text", text="No results.")]
        headers = list(rows[0].keys())
        lines = [" | ".join(headers)]
        lines += [" | ".join(str(row[h]) for h in headers) for row in rows]
        return [TextContent(type="text", text="\n".join(lines))]

    return [TextContent(type="text", text=f"Unknown tool: {name}")]


if __name__ == "__main__":
    asyncio.run(stdio_server(app))
```

That's around 75 lines. You now have a running MCP server that lets Claude explore and query any SQLite database. The same pattern extends to Postgres, MongoDB, REST APIs, or any internal data source — swap out the database calls, keep the rest.

## Connecting It to Claude

**Claude desktop app** — edit `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "sqlite-explorer": {
      "command": "python",
      "args": ["/path/to/server.py"]
    }
  }
}
```

Restart Claude desktop. The three tools appear automatically. No code changes to Claude itself.

**Claude Code (CLI)** — add a `.mcp.json` file in your project root:

```json
{
  "mcpServers": {
    "sqlite-explorer": {
      "command": "python",
      "args": ["./mcp/server.py"]
    }
  }
}
```

Claude Code picks this up when you run it from the project directory. The tools are available immediately in your Claude Code sessions.

## Debugging with MCP Inspector

Anthropic ships a visual debugging tool that's genuinely useful when something isn't working:

```bash
npx @modelcontextprotocol/inspector python server.py
```

This opens a web UI at `localhost:5173` where you can:

- Browse all tools, resources, and prompts your server exposes
- Invoke tools manually with custom parameters
- See the raw JSON-RPC messages exchanged
- Inspect exactly what Claude receives when it calls a tool

The first thing I do with any new MCP server — including ones I didn't write — is run it through the inspector. It shows you what Claude actually sees, which makes it much easier to understand why Claude does (or doesn't) choose to use a particular tool.

## What This Changes

The shift MCP enables isn't just technical convenience. It's a different model for how AI integrations work.

Before MCP, integrations were application-specific. You built them into your agent code. They were coupled to your framework, your deployment, your infrastructure. If you wanted the same integration in a different context, you rewrote it.

With MCP, integrations are portable. You build a server once, and every Claude interface that supports MCP gets access to it — the desktop app, the CLI, your own agents via the API, any other MCP-compatible client. The integration lives at the protocol layer, not the application layer.

For a team, this compounds quickly. One person builds the Postgres server; everyone gets Claude's ability to query the database. One person builds the incident response server; the whole team gets the 2am debugging superpower. The server is the asset, not the agent.

For me individually, it meant I stopped maintaining five separate integration scripts and started maintaining one set of MCP servers that work everywhere Claude does.

The protocol is still evolving — HTTP transport is getting standardization work, and the tooling around auth and discovery is improving fast. But the direction has been clear since early 2025: MCP is becoming the integration layer for the agent era, the same way REST became the integration layer for the web era.

If you're building seriously with Claude, getting familiar with MCP isn't optional anymore. It's the infrastructure.

---

*Related reading from this blog: [building agents with Claude's tool use API](/en/ai/building-ai-agents-with-claude-tool-use), [multi-agent orchestration with Claude](/en/ai/multi-agent-systems-with-claude-orchestrator-worker), [CLAUDE.md — the file that makes Claude know your project](/en/ai/claude-md-the-file-that-makes-claude-know-your-project).*
