---
tags: [area/product, type/diagram, status/active]
date: 2026-04-09
up: "[[hagent-os/INDEX]]"
aliases: [system-context, 시스템-컨텍스트]
---
# System Context — HagentOS C4 Level 1

> 시스템 경계, 사용자, 외부 의존성을 한눈에 파악하는 컨텍스트 다이어그램.
> 기준 문서: [[02_product/prd]], [[07_integrations/integrations]]

```mermaid
flowchart TD
    subgraph Users["사용자"]
        원장["🧑‍💼 원장 / 실장\n(사교육 운영자)"]
        강사["👩‍🏫 강사\n(수업 담당)"]
        학부모["👪 학부모\n(민원 제기자)"]
    end

    subgraph HagentOS["HagentOS 시스템"]
        Board["📋 Board (Web UI)\nNext.js + Tailwind\n승인 대시보드 · 케이스 관리"]
        AgentRuntime["⚙️ Agent Runtime\nNode.js + TypeScript\nOrchestrator · 에이전트 실행 엔진"]
        DB["🗄️ PostgreSQL\nDrizzle ORM\nNeon.tech (배포)"]
    end

    subgraph External["외부 시스템"]
        ClaudeAPI["🤖 Claude API\nAnthropic Sonnet 4.5\nLLM 추론 엔진"]
        Korean["📜 korean-law-mcp\n학원법·개인정보보호법\n규정 검색 스킬"]
        Solapi["💬 @solapi/mcp-server\nKakao 알림톡 · SMS\n학부모 메시지 발송"]
        GCal["📅 Google Calendar\ngoogle-calendar-mcp\n수업 일정 동기화"]
        Neon["☁️ Neon.tech\nPostgreSQL 호스팅\n(배포 환경)"]
        Vercel["🚀 Vercel\nNext.js 배포\n라이브 URL 제공"]
    end

    원장 -->|"케이스 등록 · 승인 · 모니터링"| Board
    강사 -->|"일정 확인"| Board
    학부모 -->|"민원 접수 (간접)"| Board

    Board -->|"REST API"| AgentRuntime
    AgentRuntime <-->|"Drizzle ORM"| DB

    AgentRuntime -->|"LLM 호출"| ClaudeAPI
    AgentRuntime -->|"MCP 스킬 실행"| Korean
    AgentRuntime -->|"알림 발송"| Solapi
    AgentRuntime -->|"일정 동기화"| GCal

    DB -->|"Serverless 연결"| Neon
    Board -->|"정적 배포"| Vercel
```

---

## 시스템 경계 요약

| 영역 | 기술 | 역할 |
|------|------|------|
| Board (UI) | Next.js 14 + Tailwind + next-auth | 원장 인터페이스, 4존 레이아웃 |
| Agent Runtime | Node.js + TypeScript | 에이전트 실행, WakeupRequest dedup, k-skill 주입 |
| DB | PostgreSQL + Drizzle ORM | 모든 상태 영속화, 감사 추적 |
| LLM | Claude Sonnet 4.5 (claude-sonnet-4-5) | 초안 생성, 분류, 계획 |
| k-skill MCP | korean-law-mcp, solapi, gcal | 한국형 외부 기능 확장 |
| 배포 | Vercel + Neon.tech | 대회 제출용 라이브 URL |

## MVP 범위 (D5~D8)

```
In Scope:  Board + AgentRuntime + DB + Claude API
Deferred:  Solapi (알림), GCal 동기화 → v1.1
```
