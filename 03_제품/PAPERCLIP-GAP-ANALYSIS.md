---
tags: [area/product, type/reference, status/active]
date: 2026-04-10
up: "[[03_제품/PLAN_v2]]"
aliases: [gap-analysis, 갭분석]
---
# Paperclip vs HagentOS — 실제 동작 기반 갭 분석

> **조사 방법**: Paperclip 라이브 인스턴스(127.0.0.1:3101) API 직접 호출 + 로컬 파일시스템 탐색 + 클론 스펙 분석
> **기준 날짜**: 2026-04-10
> **목적**: 다음 마일스톤(실제 작동 에이전트) 구현을 위한 협업 입력 문서

---

## 1. Paperclip 실제 동작 방식 (관찰 기반)

### 핵심 실행 모델

```
[트리거 발생]
  ↓ (issue_assigned / heartbeat_schedule / on-demand)
[Adapter가 에이전트 프로세스 깨움]
  ↓ (환경변수 주입: AGENT_ID, COMPANY_ID, API_URL, RUN_ID)
[Instructions 파일 로드]
  SOUL.md → 페르소나/전략 원칙
  HEARTBEAT.md → 실행 체크리스트
  AGENTS.md → 위임 규칙
  TOOLS.md → 사용 가능 도구
  ↓
[HEARTBEAT 체크리스트 실행 (순서 고정)]
  1. Identity Check: GET /api/agents/me → 자신의 role/budget/chainOfCommand 확인
  2. Daily Plan: memory/YYYY-MM-DD.md에서 오늘 할 일 검토
  3. Approval Follow-Up: pending approval 처리
  4. Get Assignments: 할당된 이슈 조회 (todo 우선)
  5. Checkout: POST /api/issues/:id/checkout → 409면 즉시 포기
  6. Work: 실제 작업 수행 (코드 작성, 댓글, 서브태스크 생성)
  7. Delegation: CEO면 서브태스크 → 다른 에이전트에 위임
  8. Fact Extraction: 중요한 사실을 메모리 파일에 저장
  9. Clean Exit: 진행 중 상태 업데이트 + 댓글 + 종료
```

### 실제 에이전트 구조 (라이브 인스턴스 확인)

```json
{
  "id": "6b531808-...",
  "name": "원장",
  "role": "ceo",
  "title": "Chief Executive Officer",
  "reportsTo": null,
  "adapterType": "claude_local",
  "model": "claude-sonnet-4-5-20250929",
  "budgetMonthlyCents": 0,
  "spentMonthlyCents": 0,
  "runtimeConfig": {
    "heartbeat": {
      "enabled": true,
      "intervalSec": 3600,
      "wakeOnDemand": true
    }
  },
  "chainOfCommand": [],
  "permissions": { "canCreateAgents": false }
}
```

### Instructions 파일 시스템 (로컬 경로 확인)

```
~/.paperclip/instances/default/companies/{companyId}/agents/{agentId}/
├── instructions/
│   ├── SOUL.md       ← 에이전트 페르소나 + 전략 원칙 (고정 정체성)
│   ├── HEARTBEAT.md  ← 매 실행마다 따르는 8단계 체크리스트
│   ├── AGENTS.md     ← 위임 규칙 + 직속 부하 목록
│   └── TOOLS.md      ← 사용 가능한 도구 목록 (현재 placeholder)
└── memory/
    ├── MEMORY.md     ← 암묵적 지식 (사용자 패턴, 선호도)
    └── YYYY-MM-DD.md ← 일일 노트 (타임라인 + 계획 + Key Facts)
```

**실제 SOUL.md 내용 요점:**
- 전략적 원칙 (P&L 소유, 행동 우선, 숫자 파악)
- 커뮤니케이션 스타일 (직설적, 보드 미팅처럼, 평문)
- 완전히 다른 역할별로 별도 파일 존재

**실제 HEARTBEAT.md 내용 요점:**
- 8단계 고정 절차 (Identity → Plan → Approval → Assignments → Checkout → Work → Delegate → Exit)
- CEO 특화 규칙: 직접 코딩 금지, 반드시 위임
- 모든 mutating API 호출에 `X-Paperclip-Run-Id` 헤더 필수

### Memory 시스템 (para-memory-files skill)

```
$AGENT_HOME/life/          ← PARA 지식 그래프
  projects/                ← 목표+기한이 있는 활동
  areas/                   ← 지속적 책임
  resources/               ← 참고자료
  archives/                ← 비활성 항목

$AGENT_HOME/memory/
  YYYY-MM-DD.md            ← 일일 노트 (raw timeline + plan + key facts)

$AGENT_HOME/MEMORY.md      ← 암묵적 지식 (atomic facts + decay 로직)
```

**Atomic Fact Schema:**
```yaml
- id: entity-001
  fact: "실제 사실"
  category: relationship | milestone | status | preference
  timestamp: "YYYY-MM-DD"
  status: active | superseded
  last_accessed: "YYYY-MM-DD"
  access_count: 0
```

**Memory Decay:**
- Hot (7일 이내 접근) → summary.md에 표시
- Warm (8-30일) → 낮은 우선순위
- Cold (30일+) → summary에서 생략, items.yaml에 유지

---

## 2. 갭 분석표

### P0 — 데모 치명적 갭 (없으면 Paperclip과 본질적으로 다름)

| # | 기능 | Paperclip 실제 동작 | HagentOS 현재 | 갭 설명 | 구현 방향 |
|---|------|-------------------|--------------|---------|----------|
| G1 | **에이전트 실제 실행** | Claude API 호출 → 이슈 checkout → 댓글 작성 → 상태 변경 | dispatch 시 mock response 또는 1회 Claude 호출 후 종료 | 에이전트가 실제로 **일을 하지 않음**. 실행 결과가 DB에 저장되지만 반복/자율 루프 없음 | 하트비트 실행 시 실제 Claude API 호출 → AgentRun에 결과 저장 → Case 상태 자동 변경 |
| G2 | **Issue Checkout 잠금** | `POST /api/issues/:id/checkout` → `executionLockedAt` 설정 → 409면 포기 | 없음. 두 에이전트가 같은 케이스 동시 처리 가능 | 동시 처리 방지 로직 없음 | cases 테이블에 `lockedAt`, `lockedByAgentId` 컬럼 추가 + POST /cases/:id/checkout 엔드포인트 |
| G3 | **Instructions 파일 구조** | SOUL.md + HEARTBEAT.md + AGENTS.md + TOOLS.md (파일별 역할 분리) | system_prompt 단일 텍스트 필드 + 파일 뷰어(읽기 전용) | 에이전트 정체성과 실행 절차가 분리되지 않음. 편집 가능하지 않음 | DB에 SOUL/HEARTBEAT/AGENTS/TOOLS를 별도 컬럼으로 분리 또는 파일 시스템 기반 저장 + 각각 편집 가능하게 |
| G4 | **에이전트 일일 메모리** | `memory/YYYY-MM-DD.md` 파일에 타임라인 + 계획 + Key Facts 저장 | `agent.memory` JSONB 필드 (표시만) | 에이전트가 이전 세션 컨텍스트를 실제로 기억하지 못함 | AgentMemoryLog 테이블 또는 파일 시스템 기반 일일 메모리 저장 |

### P1 — 운영 품질 갭 (있으면 체감 차이 큼)

| # | 기능 | Paperclip 실제 동작 | HagentOS 현재 | 갭 설명 | 구현 방향 |
|---|------|-------------------|--------------|---------|----------|
| G5 | **Run Transcript 렌더링** | `RunChatSurface` — 에이전트와의 실제 대화 내용을 채팅처럼 표시 | AgentRun의 output JSONB를 `<pre>` 태그로 표시 | 에이전트가 뭘 했는지 읽기 어려움 | AgentRun output을 메시지 배열로 파싱 → 채팅 UI로 렌더링 |
| G6 | **Budget 실제 집행** | `budgetMonthlyCents` 80% → 경고, 100% → 자동 pause | `budget_limit` 컬럼 있고 BudgetBar 표시되지만 집행 없음 | 예산이 넘어도 에이전트가 계속 실행됨 | 에이전트 실행 전 예산 체크 → 초과 시 pause + budgetIncident 생성 |
| G7 | **에이전트별 모델 설정** | 에이전트마다 `model`, `adapterType`, heartbeat 설정 개별 관리 | `adapter_config` JSONB에 저장되지만 UI에서 편집 불가 | Configuration 탭에 실제 모델 선택 없음 | AgentDetailPage Configuration 탭에 model 선택 + heartbeat 설정 UI 추가 |
| G8 | **Routines → Issues 연결** | Routine 실행 시 새 Issue 자동 생성 → 에이전트에 할당 | Routines는 독립 실행, Case 생성 없음 | 루틴 결과가 케이스/이슈 추적 시스템과 연결 안 됨 | Routine 실행 시 Case 자동 생성 + agent wakeup |
| G9 | **Reporting Hierarchy** | `reportsTo` + `chainOfCommand` 배열 → 위임 결정에 사용 | OrgChart는 시각적이지만 `reportsTo` 필드 없음 | 에이전트가 누구에게 위임할지 모름 | agents 테이블에 `reportsTo uuid` 컬럼 추가 + OrgChart 동적 렌더링 |
| G10 | **Agent Hire Approval** | 에이전트 고용 = Approval 필요 (agent-hire request) | 에이전트 직접 생성 (승인 없음) | 거버넌스 없이 에이전트 생성 가능 | NewAgentPage에 approval 흐름 추가 (데모 연출용) |

### P2 — 차별성 갭 (있으면 1등, 없어도 데모는 됨)

| # | 기능 | Paperclip 실제 동작 | HagentOS 현재 | 갭 설명 |
|---|------|-------------------|--------------|---------|
| G11 | **Skills 실제 파일 연결** | SKILL.md 파일 기반, skills.sh 레지스트리에서 pull | DB에 slug + 설명만, 실제 파일 없음 | 스킬이 에이전트에 실제로 주입되지 않음 |
| G12 | **Issue Markdown 본문** | 이슈 설명에 Markdown + 내부 링크 지원 (`[CMP-1](/CMP/issues/CMP-1)`) | Case 설명은 plain text | 케이스 간 참조 연결 없음 |
| G13 | **Agent 메모리 Decay** | Hot/Warm/Cold 분류, 오래된 사실 자동 아카이브 | 없음 | 장기 운영 시 메모리 품질 저하 |
| G14 | **Plugin 시스템** | UI 슬롯에 플러그인 주입 가능 (대시보드 위젯, 탭 등) | 없음 | 확장성 한계 |

---

## 3. 현재 우리가 Paperclip보다 나은 것

| 항목 | HagentOS 우위 |
|------|--------------|
| **학원 도메인 모델** | Student, Parent, Instructor, Schedule, Attendance, classGroup, shuttle 등 교육 특화 테이블 |
| **카카오/SMS 웹훅** | 외부 채널에서 직접 케이스 자동 생성 (Paperclip은 웹훅 수신 없음) |
| **k-skill 생태계** | 한국형 스킬 12종 (환불계산기, 학원법, 보강알림 등) |
| **인박스 알림** | 실시간 SSE + 인박스 페이지 (Paperclip inbox는 에이전트 전용) |
| **학생/강사 관리** | CRUD + 반배정 + 셔틀 + 보호자 연결 (Paperclip에 없음) |
| **일정 캘린더** | 주간/월간 뷰 + 타입별 색상 + 법정기한 표시 |
| **한국어 UX** | 전체 한국어 UI, 학원 운영 용어 |

---

## 4. D6 구현 우선순위 (갭 기반)

### MUST — 데모에서 "실제 작동"을 보여주려면

**G1: 에이전트 실제 실행 루프**
```
구현 위치: server/src/lib/agents/
현재: orchestrator.ts가 1회 Claude 호출 후 종료
목표: 
  1. dispatch → Claude API 호출 → response 파싱
  2. AgentRun status: running → completed
  3. Approval 자동 생성 (Level 1 이상 액션)
  4. Case status 자동 변경
  5. ActivityEvent 기록
```

**G3: Instructions 탭 편집 개선**
```
구현 위치: ui/src/pages/AgentDetailPage.tsx (InstructionsTab)
현재: system_prompt 단일 textarea
목표:
  SOUL / HEARTBEAT / AGENTS 탭 분리
  각각 독립 편집 + 저장
  파일 이름 표시 (SOUL.md 등)
```

### SHOULD — 데모 품질 향상

**G5: Run Transcript 채팅 UI**
```
구현 위치: ui/src/pages/AgentDetailPage.tsx (RunsTab)
현재: <pre> 태그로 JSON 표시
목표: 메시지 배열 파싱 → 채팅 버블 렌더링
```

**G7: Configuration 탭 실제 작동**
```
구현 위치: AgentDetailPage ConfigurationTab
현재: 텍스트만 표시
목표: 모델 선택 드롭다운 + heartbeat 설정 + 저장
```

**G9: reportsTo 필드**
```
구현 위치: DB schema + NewAgentPage + OrgChart
현재: OrgChart 하드코딩
목표: agents.reportsTo FK 추가 + 동적 렌더링
```

---

## 5. 핵심 API 차이 (구현 참고)

### Paperclip API (실제 동작 확인)
```
GET  /api/companies/:id/agents          ← 에이전트 목록
GET  /api/companies/:id/issues          ← 이슈 목록 (q, status, priority 필터)
POST /api/issues/:id/checkout           ← 에이전트가 작업 점유
PATCH /api/issues/:id                   ← 상태/댓글 업데이트
POST /api/companies/:id/issues          ← 서브태스크 생성
GET  /api/companies/:id/skills          ← 스킬 목록
GET  /api/companies/:id/costs/summary   ← 비용 요약
POST /api/routines/:id/run              ← 루틴 수동 실행
POST /api/companies/:id/agent-hires     ← 에이전트 고용 요청
```

### HagentOS API (현재 보유)
```
POST /api/orchestrator/dispatch         ← 오케스트레이터 디스패치
GET  /api/organizations/:id/agents      ← 에이전트 목록
GET  /api/organizations/:id/cases       ← 케이스 목록
PATCH /api/cases/:id                    ← 케이스 상태 변경
POST /api/heartbeat/trigger             ← 하트비트 수동 트리거
GET  /api/organizations/:id/skills      ← 스킬 목록

누락:
PATCH /api/cases/:id/checkout           ← 없음 (G2)
GET  /api/agents/me                     ← 없음 (에이전트 자기 인식)
```

---

## 6. 데모 시나리오 기준 실행 흐름 비교

### Paperclip 실제 흐름
```
1. Board(원장)이 이슈 생성 또는 카카오로 민원 접수
2. Orchestrator 에이전트 깨어남 (wakeOnDemand)
3. GET /api/issues → 할당된 이슈 조회
4. POST /api/issues/:id/checkout → 잠금
5. Claude API 호출 (SOUL + HEARTBEAT + AGENTS + 이슈 컨텍스트)
6. Complaint Agent에 서브태스크 위임
7. PATCH /api/issues/:id → in_progress로 변경 + 댓글
8. Complaint Agent 깨어남 → checkout → 처리 → 초안 생성
9. POST /api/approvals → 원장 승인 요청
10. 원장 승인 → PATCH /api/issues/:id → done
11. ActivityEvent 기록
```

### HagentOS 현재 흐름
```
1. 대시보드에서 지시 입력 또는 카카오 웹훅
2. POST /api/orchestrator/dispatch
3. Claude API 1회 호출 (mock fallback)
4. AgentRun 생성 (status: completed)
5. Approval 생성 (pending)
6. 원장이 Approvalspage에서 승인
→ Case status 자동 변경 없음
→ 에이전트가 추가 행동 없음
→ ActivityEvent 기록됨 ✓
```

### 갭: 2번과 3번 사이에 실제 "에이전트가 일하는" 루프 없음

---

## 7. 이 문서 활용 방법

- **승보**: G1 (실제 실행 루프), G3 (Instructions 탭), G2 (checkout) 구현 담당
- **용**: G5 (Transcript UI), G7 (Configuration 탭), G9 (reportsTo) 구현 담당
- **AI 에이전트**: 이 문서를 먼저 읽고 구현 시작
- **다음 세션**: PROGRESS_v2.md의 Phase 4 체크리스트 기준으로 진행
