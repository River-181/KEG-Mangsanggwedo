---
tags:
  - area/product
  - type/reference
  - status/active
date: 2026-04-09
aliases:
  - hagentos-app
up: "[[_03_제품_MOC]]"
---
# App

HagentOS app target for the contest build.

## Product Direction

- Base approach: `Paperclip-inspired control plane for Korean education`
- User: hagwon owner / operations lead
- MVP flows:
  - complaint handling
  - churn detection
  - approval dashboard

## Recommended Stack

- Backend: Node.js + TypeScript
- AI orchestration: Paperclip-style heartbeat + agent routing
- Database: PostgreSQL or Supabase
- UI: React or Next.js
- Scheduler: cron / heartbeat runner
- Integrations: MCP-based external tools

## Current Prototype Stack

- Backend: Node.js built-in HTTP server
- Frontend: static HTML + vanilla JS + CSS
- State: in-memory demo state
- Goal: zero-install local demo speed

## App Modules

- onboarding
- agent presets
- operational cases
- approval dashboard
- skills registry
- integrations

## First Build Milestone

1. Institution onboarding
2. Suggested agent team
3. Complaint case flow
4. Retention case flow
5. Approval dashboard

## Current Status

- product docs defined
- local runnable MVP implemented
- no external dependency install required

## Run

```bash
cd "03_제품/app"
npm start
```

Open `http://127.0.0.1:4173`

## Implemented Features

- institution onboarding form
- agent team recommendation
- complaint inbox classification
- churn risk scoring
- approval dashboard
- local in-memory API for demo flow
