---
tags: [area/product, type/diagram, status/active]
date: 2026-04-09
up: "[[hagent-os/INDEX]]"
aliases: [erd, 도메인-erd]
---
# ERD — HagentOS 핵심 도메인 모델

> Drizzle ORM + PostgreSQL 기준. 핵심 12개 테이블.
> 전체 스키마 정본: [[08_data/domain-model]]

```mermaid
erDiagram
    Organization {
        uuid id PK
        text name
        enum type "academy|tutoring|public"
        jsonb profile
        text[] agents
        text[] skills
    }

    Agent {
        uuid id PK
        uuid organizationId FK
        text slug
        enum agentType "orchestrator|complaint|retention|scheduler|intake|staff|finance|compliance|notification|analytics"
        enum status "idle|running|pending_approval|paused|error"
        uuid reportsTo FK
        text[] skills
        int budgetMonthlyCents
        int spentMonthlyCents
    }

    AgentKey {
        uuid id PK
        uuid agentId FK
        uuid organizationId FK
        text keyHash
        text label
        timestamptz lastUsedAt
    }

    Case {
        uuid id PK
        uuid organizationId FK
        enum type "complaint|refund|makeup|inquiry"
        enum severity "low|medium|high|critical"
        enum status "open|draft_ready|pending_approval|resolved|escalated"
        uuid reporterId FK
        uuid studentId FK
        text agentDraft
        enum priority "urgent|high|medium|low"
        uuid parentId FK
        uuid goalId FK
        uuid checkoutRunId FK
    }

    AgentRun {
        uuid id PK
        uuid agentId FK
        uuid wakeupRequestId FK
        enum status "running|completed|failed|pending_approval"
        jsonb input
        jsonb output
        int tokensUsed
        int costCents
        int approvalLevel "0-4"
        enum invocationSource "timer|assignment|on_demand|automation"
    }

    Approval {
        uuid id PK
        uuid agentRunId FK
        int level "0-4"
        enum status "pending|approved|rejected"
        uuid approvedBy
        timestamptz decidedAt
    }

    OpsGroup {
        uuid id PK
        uuid organizationId FK
        text name
        text color
        enum status "active|archived"
        uuid leadAgentId FK
    }

    OpsGoal {
        uuid id PK
        uuid organizationId FK
        text title
        enum status "active|completed|cancelled"
        uuid parentId FK
        date targetDate
    }

    ActivityEvent {
        uuid id PK
        uuid organizationId FK
        enum entityType "case|agent|approval|skill|schedule"
        uuid entityId
        enum action "created|updated|deleted|approved|rejected|run_started|run_completed"
        uuid actorId
        enum actorType "user|agent"
        jsonb payload
    }

    TokenBudget {
        uuid id PK
        uuid organizationId FK
        uuid agentId FK
        int budgetMonthlyCents
        int spentMonthlyCents
        int warningThresholdPct "default 80"
        bool hardStop
    }

    TokenUsageEvent {
        uuid id PK
        uuid organizationId FK
        uuid agentId FK
        uuid agentRunId FK
        int inputTokens
        int outputTokens
        int costCents
        text model
    }

    Student {
        uuid id PK
        uuid organizationId FK
        text name
        text grade
        float riskScore "0-1, Retention Agent 갱신"
    }

    Organization ||--o{ Agent : "owns"
    Organization ||--o{ Case : "owns"
    Organization ||--o{ OpsGroup : "owns"
    Organization ||--o{ OpsGoal : "owns"
    Organization ||--o{ ActivityEvent : "logs"
    Organization ||--o{ TokenBudget : "has"

    Agent ||--o{ AgentRun : "executes"
    Agent ||--o{ AgentKey : "has"
    Agent |o--o| Agent : "reportsTo"

    AgentRun ||--o| Approval : "gates"
    AgentRun ||--o{ TokenUsageEvent : "incurs"

    Case }o--o| Student : "concerns"
    Case }o--o| OpsGoal : "links"
    Case |o--o| AgentRun : "checkoutRun"
    Case |o--o| Case : "parentId"
```

---

## MVP 필수 테이블 (D5~D6 스프린트)

| 우선순위 | 테이블 | 이유 |
|---------|--------|------|
| Must | Organization | 멀티테넌시 루트 |
| Must | Agent | 에이전트 영속 엔티티 |
| Must | Case | 민원 케이스 |
| Must | AgentRun | 실행 감사 추적 |
| Must | Approval | 승인 게이트 |
| Should | Student | 이탈 위험 점수 |
| Should | TokenBudget | API 예산 관리 |
| Later | OpsGroup / OpsGoal | v1.1 |
