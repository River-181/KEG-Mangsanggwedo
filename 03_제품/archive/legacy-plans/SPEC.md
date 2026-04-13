---
tags: [area/product, type/archive, status/archived]
date: 2026-04-10
up: "[[03_제품/archive/legacy-plans/README]]"
aliases: [spec, 개발스펙]
---
# SPEC.md — HagentOS 개발 컨텍스트 브리프

> [!warning]
> archive 문서. 현재 제품 정본은 [[03_제품/hagent-os/README]]와 [[03_제품/hagent-os/02_product/prd]]다.

> **이 파일 하나를 읽으면 전체 프로젝트를 이해한다.** 토큰 절약용 인덱스 + 핵심 결정 요약.
> 상세 문서는 `03_제품/hagent-os/` 아래에 있다. 필요할 때만 읽어라.

---

## 한 줄 요약

**HagentOS** = 한국 교육 기관의 비정형 운영 업무(민원·이탈·스케줄)를 AI 에이전트 팀이 병렬 처리하는 오픈소스 케이스 OS.

---

## Paperclip 엔진 관계

> **HagentOS = Paperclip 엔진(아키텍처 + UI + API + 엔티티 모델) + 한국 교육 도메인**

**구현 블루프린트**: `02_전략/paperclip-analysis/08_PAPERCLIP-CLONE-SPEC.md`
→ 28개 화면, 전체 API, 전체 엔티티, 전체 컴포넌트가 정의되어 있다.
→ **기능 구현 시 이 파일을 먼저 읽어라.**

### Paperclip → HagentOS 개념 매핑

| Paperclip | HagentOS | 변경 내용 |
|-----------|----------|----------|
| Company | **Organization** (기관/학원) | 이름만 변경, 멀티테넌트 구조 동일 |
| Issue | **Case** (케이스) | type에 complaint/refund/makeup/inquiry 교육 특화 |
| CEO Agent | **Orchestrator** | 역할명 교육 도메인화 |
| Agent | **Agent** | agentType에 complaint/retention/scheduler 등 추가 |
| Goal | **OpsGoal** (운영 목표) | 동일 계층 구조 |
| Project | **OpsGroup** (운영 영역) | 동일 |
| HeartbeatRun | **AgentRun** | 필드 확장 (approvalLevel 0-4 세분화) |
| Approval | **Approval** | 동일 |
| CompanySkill | **k-skill** | 한국 교육 도메인 스킬 생태계 |
| Routine | **Routine** | 동일 (node-cron heartbeat) |
| ActivityEvent | **ActivityEvent** | 동일 |
| CompanySecret | **OrganizationSecret** | 동일 |

### Paperclip에서 가져온 핵심 패턴

1. **운영 보드 UX** — 챗봇이 아닌 보드 기반 컨트롤 플레인
2. **지시 입력 → Orchestrator → 에이전트 병렬 디스패치** — 자연어 지시 → 계획 수립 → 멀티에이전트
3. **케이스 상세에서 라이브 에이전트 실행** — RunChatSurface 실시간 트랜스크립트
4. **원자적 이슈 체크아웃** — 중복 작업 방지 (checkoutRunId)
5. **목표 조상 전파** — 에이전트가 "왜"를 항상 앎 (Goal → Case 연결)
6. **승인이 1급 시민** — 인간 거버넌스 처음부터 내장
7. **어댑터 분리** — claude_local 기본, 교체 가능
8. **Activity 감사 로그** — 모든 에이전트 행동 타임라인 기록
9. **세션 간 영속 상태** — 에이전트 재부팅 후 중단점에서 재개
10. **이식 가능한 조직 템플릿** — 전체 구조 export/import

### HagentOS만의 차별점

- **k-skill 생태계** — korean-law-mcp, solapi 등 한국형 스킬 패키지
- **승인 Level 0-4** — 액션 단위 세분화 (Paperclip보다 정교)
- **교육 도메인 엔티티** — Student, Parent, Instructor, Schedule, Attendance
- **이탈 위험 점수** — riskScore (Retention Agent 전용)
- **토스 디자인 시스템** — Paperclip 다크 테마 대신 Toss teal 포인트

---

## 대회 제약

- **대회**: 2026 제1회 KEG 바이브코딩 콘테스트
- **마감**: 2026-04-13 (D-4)
- **팀**: 이승보(에이전트/AI) + 김주용(UI/인프라)
- **심사**: 기술적합성 30%, 창의성 25%, 완성도 20%, AI활용 15%, 팀워크 10%
- **제출물**: GitHub URL + 라이브 URL + AI 리포트(.docx) + 동의서 2매

---

## 기술 스택 (정본 — 하위 문서와 충돌 시 이 테이블이 우선)

| 레이어       | 기술                                          | 비고                                      |
| --------- | ------------------------------------------- | --------------------------------------- |
| Frontend  | React 19 + Vite + React Router v7 + Tailwind CSS | 4존 레이아웃, SPA                            |
| Backend   | Express v5 + TypeScript (ESM)               | 에이전트 런타임 포함                              |
| AI        | Claude API (Sonnet 4.6)                     | Orchestrator + 전문 에이전트 모두 LLM            |
| DB        | PostgreSQL + Drizzle ORM                    | embedded-postgres(로컬) / 외부 PG URL(클라우드) |
| Auth      | local_trusted (인증 없음)                       | MVP: 단일 원장, 세션 고정                       |
| Scheduler | node-cron                                   | 07:00 heartbeat                         |
| Deploy    | GitHub 오픈소스 설치형 + 별도 랜딩 페이지                 | Paperclip 배포 모델                          |

> **스택 변경 공지 (2026-04-10)**: 기획 문서(`hagent-os/`)에 Next.js·Neon·Vercel 참조가 남아있을 수 있다. **이 SPEC이 정본**이다. Paperclip 동일 패턴으로 확정.

---

## 핵심 아키텍처

```
원장 → Board (React UI) → Express API → Orchestrator Agent
                                              ↓
                              ┌────────────────┼────────────────┐
                         Complaint Agent   Retention Agent   Scheduler Agent
                              ↓                 ↓                ↓
                         Claude API         Claude API        Claude API
                              ↓                 ↓                ↓
                         Approval Queue ← ──────┘                │
                              ↓                                  │
                         원장 원클릭 승인                         │
                              ↓                                  │
                         Case 완결 + ActivityEvent ──────────────┘
                              ↓
                         PostgreSQL (Drizzle ORM)
```

**핵심 인터랙션 패턴 (Paperclip 동일)**:
1. 원장이 **지시 입력 바**에 자연어 지시 → Orchestrator가 계획 수립 → 에이전트 병렬 디스패치
2. 케이스 상세에서 **라이브 에이전트 실행** 확인 ("Waiting for run output..." + Stop 버튼)
3. 결과물 → **승인 큐** 카드로 도착 → 원장 원클릭 승인
4. 모든 행동 → **Activity 감사 로그** 타임라인 기록

**에이전트 실행 흐름**: 지시 입력 or Case 생성 → WakeupRequest(dedup) → Orchestrator 계획 → assigneeAgentId 디스패치 → k-skill 컨텍스트 주입 → LLM 호출 → Level 0-4 분기 → 승인/자동완결

**승인 레벨**: 행동(Action) 단위로 결정. 같은 에이전트도 케이스마다 다른 레벨.
- Level 0: 자동 완결 (분류, 기록, 감지)
- Level 1: 원클릭 승인 (초안 발송)
- Level 2: 에스컬레이션 (복잡/환불/법적)
- Level 3: 인간 결정 필요 (상담/개입)
- Level 4: 정보 제공만

---

## MVP 핵심 테이블 (5개)

| 테이블          | 핵심 역할                                                 |
| ------------ | ----------------------------------------------------- |
| Organization | 멀티테넌시 루트 (학원 프로필, 에이전트/스킬 목록)                         |
| Agent        | 에이전트 영속 엔티티 (slug, agentType, status, skills, budget) |
| Case         | 민원·환불·보강 케이스 (type, severity, status, agentDraft)     |
| AgentRun     | 실행 감사 추적 (input/output, tokensUsed, approvalLevel)    |
| Approval     | 승인 게이트 (level, status: pending/approved/rejected)     |

전체 ERD: [[diagrams/03_erd]]
전체 스키마: [[08_data/domain-model]]

---

## UI 구조 (4존 레이아웃)

```
┌──────┬──────────┬───────────────────────┬─────────────┐
│ Z0   │ Z1       │ Z2 (Main)             │ Z3          │
│ 72px │ 240px    │ flex-1                │ 320px       │
│ 레일  │ 사이드바   │ 메인 콘텐츠              │ 속성 패널     │
└──────┴──────────┴───────────────────────┴─────────────┘
Mobile: Z0+Z1 → overlay | Z3 → hidden | 하단 탭바 5개
```

**디자인 북극성**: 토스 앱 UI — `--teal-500: #0ea5b0`(포인트), `--bg-base: #ffffff`, 네이비 그림자
**디자인 토큰**: [[DESIGN]]

**MVP Must 화면**: 대시보드, 케이스 목록, 케이스 상세, 승인 큐, 에이전트 상세
전체 IA(22 라우트): [[diagrams/05_ia-screen-map]]

---

## MVP 스프린트 요약

| Phase | Day | 핵심 목표 | 담당 |
|-------|-----|----------|------|
| **1** | D5 (4/10) | 인프라 + 스켈레톤 (Vite+React, Express, embedded-postgres, Drizzle 5테이블, mock data) | 승+용 |
| **2** | D6 (4/11) | Complaint Agent 단일 흐름 완성 (생성→실행→초안→승인) | 승(에이전트) 용(API/UI) |
| **3** | D7 (4/12) | 승인 대시보드 UI + Retention Agent + heartbeat | 용(UI) 승(에이전트) |
| **4** | D8 (4/13) | GitHub 정리 + 랜딩 페이지 + 데모 테스트 + 제출 | 공동 |

상세 계획: [[PLAN]]
진행 상황: [[PROGRESS]]
미해결 블로커: [[hagent-os/10_execution/open-questions]]

---

## 참고 코드

`03_제품/archive/HagentOS-MVP-2026-04-09/` — 팀원이 만든 바닐라 JS 프로토타입.
- `server.js` (597줄): 인메모리 상태, 에이전트 추천, dispatch/approval API
- `public/app.js` (800줄): 프론트엔드 상태 관리, 3컬럼 레이아웃
- `public/styles.css` (400줄): 디자인 시스템 (Orange/Blue/Green 팔레트)
- **참고 포인트**: UI 섹션 배치, 사이드바 구조, 승인 카드 UX, 에이전트 roster 패턴

---

## 문서 인덱스 (토큰 절약용 — 필요할 때만 읽어라)

### 구현 블루프린트 (최우선)
| 문서 | 경로 | 내용 |
|------|------|------|
| **Paperclip CLONE-SPEC** | `02_전략/paperclip-analysis/08_PAPERCLIP-CLONE-SPEC.md` | **구현의 정본**. 28개 화면, 전체 API, 엔티티, 컴포넌트, 어댑터, 스킬 시스템 |

### 핵심 (반드시 참고)
| 문서 | 경로 | 내용 |
|------|------|------|
| PRD | `hagent-os/02_product/prd.md` | 제품 전체 명세 (단일 진실 원본) |
| MVP 범위 | `hagent-os/02_product/mvp-scope.md` | Must/Should/Could 구분 |
| 도메인 모델 | `hagent-os/08_data/domain-model.md` | 전체 ERD + 테이블 상세 |
| 디자인 | `hagent-os/design.md` | 색상 토큰 + 컴포넌트 스펙 |
| IA | `hagent-os/09_ux/information-architecture.md` | 22 라우트 + 4존 레이아웃 |

### 에이전트 구현 시
| 문서 | 경로 | 내용 |
|------|------|------|
| 에이전트 설계 | `hagent-os/04_ai-agents/agent-design.md` | 실행 흐름 + k-skill 주입 |
| Orchestrator | `hagent-os/04_ai-agents/agent-roles/orchestrator.md` | 계획 수립 + 디스패치 |
| Complaint | `hagent-os/04_ai-agents/agent-roles/complaint.md` | 민원 분류 + 초안 생성 |
| Retention | `hagent-os/04_ai-agents/agent-roles/retention.md` | 이탈 감지 + 위험 점수 |

### 워크플로우 구현 시
| 문서    | 경로                                             | 내용         |
| ----- | ---------------------------------------------- | ---------- |
| 민원 처리 | `hagent-os/05_workflows/complaint-handling.md` | 전체 플로우     |
| 이탈 감지 | `hagent-os/05_workflows/churn-detection.md`    | 신호 + 점수 계산 |

### 다이어그램 (빠른 참조)
| 다이어그램 | 경로 | 내용 |
|-----------|------|------|
| System Context | `hagent-os/diagrams/00_system-context.md` | C4 Level 1 |
| Demo Flow | `hagent-os/diagrams/01_demo-user-flow.md` | 2분 데모 흐름 |
| Orchestrator Sequence | `hagent-os/diagrams/02_orchestrator-sequence.md` | 에이전트 실행 시퀀스 |
| ERD | `hagent-os/diagrams/03_erd.md` | 핵심 16개 테이블 |
| Approval State | `hagent-os/diagrams/04_approval-state.md` | 승인 상태 머신 |
| IA/Screen Map | `hagent-os/diagrams/05_ia-screen-map.md` | 22 라우트 맵 |

### UI 참고
| 문서 | 경로 | 내용 |
|------|------|------|
| Paperclip UI 레퍼런스 | `hagent-os/_research/paperclip-ui-reference.md` | 화면별 레이아웃 상세 |
| UX 컨셉 | `hagent-os/09_ux/ux-concepts.md` | 인터랙션 원칙 |
| 브랜드 | `hagent-os/brand/identity.md` | 톤/보이스/태그라인 |
| 랜딩 페이지 | `hagent-os/brand/landing-page.md` | 홍보용 페이지 스펙 |

---

## 에이전트/스킬 활용 가이드

| 작업 | 에이전트/스킬 | 사용법 |
|------|-------------|--------|
| 코드 구현 | `.agent/agents/builder` | 구현 작업 |
| 코드 리뷰 | `superpowers:code-reviewer` | 구현 후 검증 |
| 테스트 | `.agent/agents/qa` | 엣지 케이스 검증 |
| Git 작업 | `.agent/skills/github-workflow` | 커밋/PR/릴리스 |
| 세션 시작 | `.claude/commands/session-start` | 컨텍스트 로딩 |
| 세션 종료 | `.claude/commands/session-close` | 핸드오프 기록 |
| 증빙 기록 | `.agent/agents/evidence` | AI 리포트 소재 |
| 진행 관리 | `.agent/agents/pm` | PROGRESS 업데이트 |

---

## 절대 하지 않는 것

- Google Calendar sync (v1.1)
- 카카오/SMS 발송 (v1.1)
- Scheduler Agent 실제 로직 (UI만)
- 복잡한 인증 (local_trusted 모드)
- RLS 정책 (앱 레벨 필터링)
- 멀티 계정 (단일 원장)
