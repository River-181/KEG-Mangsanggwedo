---
tags: [area/product, type/plan, status/active]
date: 2026-04-10
up: "[[03_제품/SPEC]]"
aliases: [dev-plan, 개발계획]
---
# PLAN.md — HagentOS 개발 실행 계획 v2

> **SPEC.md**를 먼저 읽어라. 진행 상황은 **PROGRESS.md**에서 추적.
> **구현 블루프린트**: `02_전략/paperclip-analysis/08_PAPERCLIP-CLONE-SPEC.md` — 모든 화면·API·엔티티의 정본.
> **참고 코드**: `02_전략/paperclip-analysis/paperclip-master/` — Paperclip 오픈소스 전체 (동일 스택).
> 마감: 2026-04-13

---

## 전략: 고충실도 자체 빌드 + Plan B 포크

**Plan A** (기본): Paperclip 코드를 참고하면서 동일 스택으로 자체 빌드. 구조·패턴·UX를 고충실도로 모방하되, 교육 도메인으로 완전 커스텀.
**Plan B** (폴백): D6 종료 시점에 케이스 전체 흐름이 안 돌면 Paperclip 포크로 전환.

**참고 코드 활용법**:
- `paperclip-master/ui/src/pages/` → 페이지 구조·레이아웃 패턴 참고
- `paperclip-master/ui/src/components/` → 108개 커스텀 컴포넌트 패턴 참고
- `paperclip-master/ui/src/api/` → 26개 API 모듈 패턴 참고
- `paperclip-master/ui/src/context/` → 11개 Context 패턴 참고
- `paperclip-master/server/` → Express + 어댑터 + Drizzle 패턴 참고

**심사 기준 대응**:
| 심사 항목 | 배점 | 우리의 무기 |
|-----------|------|------------|
| 기술적합성 | 30% | AI 에이전트 오케스트레이션 + 실시간 실행 + 승인 파이프라인 |
| 창의성 | 25% | "학원 AI OS" — 챗봇이 아닌 AI 조직 운영. k-skill 생태계 |
| 완성도 | 20% | Paperclip급 UI 품질. 15개 화면, 3개 에이전트, 풀 데모 시나리오 |
| AI 활용 | 15% | 제품 자체가 AI 에이전트 시스템 + 개발 과정도 멀티 AI 협업 |
| 팀워크 | 10% | 역할 분담 명확 + 증빙 자동 수집 |

---

## 타임라인 (야심찬 버전)

| Phase | 초점 | 산출물 |
|-------|------|--------|
| **Phase 1** | 풀 스켈레톤 — 전체 화면 + 전체 스키마 + 디자인 시스템 | 15개 페이지 스텁, 20개 테이블, Toss 디자인 시스템, mock 데이터 |
| **Phase 2** | 에이전트 코어 — Orchestrator + Complaint + 케이스 전체 흐름 | 자연어 지시 → 에이전트 실행 → 초안 → 승인 → 완결 |
| **Phase 3** | 완성도 — Retention + 대시보드 + Activity + k-skill + 모바일 | 데모 시나리오 전체 통과, 모바일 반응형 |
| **Phase 4** | 제출 — 배포 + 랜딩 + 데모 녹화 + AI 리포트 | 라이브 URL + 제출물 5종 |

**Plan B 판단 시점**: Phase 2 종료 시 케이스 흐름이 안 돌면 → Paperclip 포크로 전환.

---

## Phase 1: 풀 스켈레톤

프로젝트 초기화부터 **모든 페이지가 네비게이션되고, 모든 테이블이 생성되고, 디자인 시스템이 적용된** 상태까지.
> Paperclip 참고: `ui/src/App.tsx` (라우팅), `ui/src/components/Layout.tsx` (4존), `ui/src/index.css` (Tailwind v4)

### 용 — 프로젝트 + UI 풀 셋업

#### 프로젝트 초기화
- [ ] pnpm monorepo 구조 (`app/`, `server/`, `shared/`)
- [ ] Vite + React 19 + TypeScript (`app/`)
- [ ] Tailwind CSS v4 + shadcn/ui 설정 (Toss 디자인 토큰)
- [ ] React Router v7 라우트 전체 설정
- [ ] TanStack Query 설정 + API 클라이언트 유틸
- [ ] `.env` 템플릿

#### 4존 레이아웃 셸 (Paperclip Layout 패턴)
- [ ] RootLayout: Zone 0 (기관 레일 72px) + Zone 1 (사이드바 240px) + Zone 2 (메인 flex-1) + Zone 3 (속성 패널 320px)
- [ ] 사이드바: 검색, 케이스 등록 CTA, 네비게이션 그룹 (Work / 운영 영역 / 에이전트 팀 / 기관 관리)
- [ ] 모바일 반응형: 하단 탭바 5개, Z0+Z1 오버레이
- [ ] CommandPalette (Cmd+K) — cmdk 기반
- [ ] BreadcrumbBar + PanelContext (Zone 3 토글)

#### 15개 페이지 스텁 (전부 라우팅 + 빈 레이아웃)
- [ ] `/[org]/dashboard` — 지시 입력 바 + 지표 카드 4개 + 에이전트 패널
- [ ] `/[org]/inbox` — 알림 목록
- [ ] `/[org]/cases` — 상태별 그룹 리스트 + 칸반 토글
- [ ] `/[org]/cases/:id` — Zone2 본문 + Zone3 속성 패널
- [ ] `/[org]/cases/new` — 케이스 생성 폼
- [ ] `/[org]/approvals` — 승인 큐 카드 그리드
- [ ] `/[org]/approvals/:id` — 승인 상세
- [ ] `/[org]/agents` — 에이전트 팀 그리드
- [ ] `/[org]/agents/:id` — 에이전트 상세 (6탭: 대시보드/지시사항/스킬/설정/실행이력/예산)
- [ ] `/[org]/schedule` — 통합 캘린더 뷰
- [ ] `/[org]/activity` — 감사 로그 타임라인
- [ ] `/[org]/skills` — k-skill 레지스트리 카탈로그
- [ ] `/[org]/settings` — 기관 설정
- [ ] `/[org]/onboarding` — 온보딩 위자드
- [ ] `/design-guide` — 컴포넌트 쇼케이스

#### 디자인 시스템 (Toss 스타일)
- [ ] CSS Variables 전체 (DESIGN.md 토큰)
- [ ] shadcn/ui 기본 컴포넌트 (Button, Card, Badge, Dialog, Sheet, Tabs, Avatar, Tooltip, DropdownMenu)
- [ ] HagentOS 복합 컴포넌트: ApprovalCard, CaseRow, AgentStatusBadge, OpsMetricCard, HistoryRow, SkillCard
- [ ] Light/Dark 모드 토글

### 승 — 서버 + DB + 에이전트 기반

#### Express 서버
- [ ] Express v5 + TypeScript ESM (`server/`)
- [ ] CORS + static serve (Vite build output) + JSON body parser
- [ ] API 라우트 구조: `/api/organizations`, `/api/cases`, `/api/agents`, `/api/approvals`, `/api/runs`, `/api/activity`
- [ ] Health check + bootstrap 엔드포인트
- [ ] SSE 실시간 이벤트 (`/api/organizations/:orgId/events/sse`)

#### 데이터베이스 (20개 테이블)
- [ ] embedded-postgres 설정 + 자동 시작
- [ ] Drizzle ORM 설정 (`drizzle.config.ts`)
- [ ] **Must 테이블** (Phase 1-2 필수):
  - Organization, Agent, AgentKey, Case, CaseComment, AgentRun, Approval, OpsGroup, ActivityEvent
- [ ] **Should 테이블** (Phase 3):
  - OpsGoal, TokenBudget, TokenUsageEvent, Routine, Notification
- [ ] **교육 도메인 테이블**:
  - Student, Parent, Instructor, Schedule, Attendance, WakeupRequest
- [ ] 마이그레이션 실행 확인

#### Mock 데이터 시드 (`scripts/seed.ts`)
- [ ] Organization 1개 ("탄자니아 영어학원")
- [ ] Agent 4개 (Orchestrator, Complaint, Retention, Scheduler)
- [ ] Student 15명 + Parent 10명 + Instructor 4명
- [ ] Case 5건 (민원 3, 이탈 1, 일정 1) + 상태 다양
- [ ] AgentRun 3건 (completed 상태, mock output 포함)
- [ ] Approval 2건 (pending 상태)
- [ ] Schedule 10건 (이번 주 수업 일정)
- [ ] ActivityEvent 15건 (타임라인 데이터)

#### 에이전트 런타임 기반
- [ ] Claude API 연결 유틸리티 (`lib/claude.ts`) — 응답 파싱, 에러 핸들링, 토큰 카운팅
- [ ] 에이전트 타입 정의 (`lib/agents/types.ts`) — Agent, Case, AgentRun, WakeupRequest
- [ ] Orchestrator 스텁 (`lib/agents/orchestrator.ts`)
- [ ] Complaint Agent 스텁 (`lib/agents/complaint.ts`)
- [ ] Retention Agent 스텁 (`lib/agents/retention.ts`)
- [ ] WakeupRequest dedup 로직

### Phase 1 완료 조건
- [ ] `pnpm dev` → 15개 페이지 네비게이션 + 4존 레이아웃 + Toss 디자인 적용
- [ ] DB 20개 테이블 생성 + Mock 데이터 시드 확인
- [ ] Mock 데이터 조회 API 3개 이상 동작 (cases, agents, activity)
- [ ] CommandPalette 동작
- [ ] 모바일 하단 탭바 동작

---

## Phase 2: 에이전트 코어 — 전체 흐름 완성

**데모의 핵심**. 지시 입력 → Orchestrator → Complaint Agent → 초안 → 승인 → 완결.
> Paperclip 참고: `ui/src/pages/IssueDetail/`, `ui/src/components/IssueChatThread.tsx`, `ui/src/api/`

### 승 — 에이전트 파이프라인

#### Orchestrator
- [ ] 자연어 지시 파싱 → 계획 수립 (Claude API)
- [ ] 시스템 프롬프트: Organization context + Agent roster + k-skill 목록
- [ ] 출력: `{ assigneeAgentId, approvalLevel, plan, reasoning }`
- [ ] 병렬 디스패치 (Promise.allSettled)
- [ ] WakeupRequest 생성 + dedup 확인

#### Complaint Agent
- [ ] 입력: Case + Student history + Organization profile
- [ ] 시스템 프롬프트: 민원 유형별 분류 기준 + 톤앤매너 가이드
- [ ] 출력: `{ category, severity, draft, reasoning, suggestedActions }`
- [ ] k-skill 컨텍스트 주입 (complaint-classifier, korean-tone-guide)
- [ ] Level 0: 분류만 (자동), Level 1: 초안+승인, Level 2: 에스컬레이션

#### AgentRun 상태 관리
- [ ] 상태 머신: queued → running → completed / pending_approval / failed
- [ ] SSE로 실행 상태 스트리밍 (agent.run.started, agent.run.completed)
- [ ] 토큰 사용량 기록 (input/output tokens)
- [ ] 에러 핸들링 + 자동 재시도 (1회)

#### 승인 파이프라인
- [ ] Level 0: AgentRun 완료 → Case 자동 완결 → ActivityEvent 기록
- [ ] Level 1: AgentRun → Approval 생성 → 원장 원클릭 승인 → Case 완결
- [ ] Level 2: AgentRun → Approval 생성 → 원장 편집 후 승인
- [ ] Level 3: 에스컬레이션 알림 → 원장 직접 처리

### 용 — API + 케이스 UI

#### REST API (전체 CRUD)
- [ ] `POST /api/cases` — 케이스 생성 + WakeupRequest
- [ ] `GET /api/cases` — 목록 (상태별 그룹, 필터, 정렬)
- [ ] `GET /api/cases/:id` — 상세 (AgentRun + Comments + Approval 포함)
- [ ] `PATCH /api/cases/:id` — 상태 변경
- [ ] `POST /api/cases/:id/comments` — 댓글 추가
- [ ] `GET /api/approvals` — 승인 큐 (pending 필터)
- [ ] `POST /api/approvals/:id/decide` — 승인/편집/반려
- [ ] `GET /api/agents` — 에이전트 목록
- [ ] `GET /api/agents/:id` — 에이전트 상세
- [ ] `GET /api/activity` — 감사 로그 (타입별 필터)
- [ ] `POST /api/orchestrator/dispatch` — 자연어 지시 → Orchestrator 실행

#### 케이스 UI (핵심 화면)
- [ ] 케이스 목록: 상태별 그룹 헤더 (TODO / IN_PROGRESS / COMPLETED) + 건수 뱃지
- [ ] 케이스 상세 Zone2: 제목, 본문, **라이브 에이전트 실행** ("Waiting for run output..." + 트랜스크립트 + Stop 버튼)
- [ ] 케이스 상세 Zone3: 상태, 우선순위, 유형, 담당 에이전트, 라벨, 날짜
- [ ] 케이스 생성 폼: type, severity, description, reporterId, studentId 셀렉트
- [ ] 에이전트 실행 결과 카드: 초안 텍스트 + 토큰 사용량 + Level 표시

#### 대시보드 지시 입력 바
- [ ] textarea + "실행" 버튼 + 에이전트 멘션 (`@민원담당`)
- [ ] 실행 중: 프로그레스 인디케이터 + "분석 중..." 텍스트
- [ ] 결과: 생성된 케이스/승인 카드 링크

### Phase 2 완료 조건
- [ ] **지시 입력 "오늘 민원 처리해줘" → Orchestrator → Complaint Agent → 초안 → 승인 → 완결** 전체 E2E
- [ ] AgentRun 기록 (tokensUsed, input/output JSONB)
- [ ] SSE로 실시간 상태 업데이트
- [ ] Activity 타임라인에 에이전트 행동 기록

**⚠️ Plan B 판단**: 이 시점에서 E2E 흐름이 안 돌면 → Paperclip 포크로 전환

---

## Phase 3: 완성도 — 데모 임팩트

두 번째 에이전트 + 핵심 UI 완성 + 모바일. **이 Phase가 1등과 2등을 가른다.**
> Paperclip 참고: `ui/src/pages/Dashboard/`, `ui/src/pages/Activity/`, `ui/src/components/OnboardingWizard/`

### 승 — Retention Agent + Heartbeat + k-skill

#### Retention Agent
- [ ] 이탈 위험 점수 산출 로직
  - 결석 빈도 (가중치 0.3)
  - 과제 미제출 (가중치 0.2)
  - 성적 변화 추세 (가중치 0.2)
  - 민원/환불 문의 이력 (가중치 0.2)
  - 비활동 기간 (가중치 0.1)
- [ ] Level 0: 대시보드에 위험 학생 카드 자동 표시
- [ ] Level 1: 학부모 안내 메시지 초안 생성 → 승인큐
- [ ] Level 3: "상담 일정 생성 권고" → 원장 직접 판단

#### Heartbeat (node-cron)
- [ ] 매일 07:00 자동 실행
- [ ] Orchestrator 깨움 → 에이전트 병렬 실행 (Complaint + Retention)
- [ ] 실행 결과 → 대시보드 + 승인큐 자동 반영
- [ ] 데모용 수동 트리거 버튼 (`POST /api/heartbeat/trigger`)

#### k-skill 시연
- [ ] k-skill 레지스트리 API (`GET /api/skills`, `GET /api/skills/:slug`)
- [ ] 내장 스킬 3개:
  - `complaint-classifier` — 민원 유형 분류 (프롬프트 기반)
  - `korean-tone-guide` — 학부모 응대 톤앤매너
  - `churn-risk-calculator` — 이탈 위험 점수 산출
- [ ] 외부 MCP 스킬 포인터 3개:
  - `korean-law-mcp` — 학원법 조문 검색
  - `@solapi/mcp-server` — 알림톡/SMS
  - `google-calendar-mcp` — 캘린더 동기화

### 용 — 핵심 UI 완성

#### 승인 큐 UI
- [ ] 대기 카드 그리드 — 에이전트 아이콘 + 요약 + Level 표시
- [ ] 원클릭 [승인] [편집] [반려] 버튼
- [ ] 편집 모드: 초안 텍스트 인라인 에디터
- [ ] 승인 후 → Case 자동 완결 + 토스트 알림

#### 대시보드 (데모 첫 화면)
- [ ] 지시 입력 바 (Phase 2에서 구현)
- [ ] 라이브 에이전트 패널 — 펄스 점 + "Live now" / "N분 전 완료"
- [ ] 4개 지표 카드: 활성 에이전트, 진행 중 케이스, 승인 대기, 이번 달 토큰
- [ ] 이탈 위험 학생 요약 (Retention Agent 결과)
- [ ] 최근 활동 타임라인 (Activity 미리보기)
- [ ] 오늘 스케줄 요약

#### Activity 감사 로그
- [ ] 타임라인 형식 (최신 순)
- [ ] 타입 필터: all / case / agent / approval / run
- [ ] 행: `[아이콘] [에이전트명] [행동] on [케이스] — [제목] [시간]`

#### 에이전트 상세
- [ ] 6탭: 대시보드 / 지시사항(시스템 프롬프트) / 스킬 / 설정 / 실행 이력 / 예산
- [ ] 스킬 탭: 장착된 k-skill 목록 + "스킬 추가" 버튼
- [ ] 실행 이력 탭: AgentRun 목록 + 결과 확인

#### k-skill 레지스트리 UI
- [ ] 카탈로그 그리드: 스킬명, 버전, 활성/비활성, 장착된 에이전트 수
- [ ] 스킬 상세 페이지: 설명 + 사용 에이전트 목록

#### 온보딩 위자드
- [ ] Step 1: 기관명 + 유형 + 규모
- [ ] Step 2: 현재 가장 중요한 목표 (복수 선택)
- [ ] Step 3: 추천 에이전트 팀 → 선택/수정
- [ ] Step 4: "이 추천으로 시작하기" → 대시보드로 이동

#### 모바일 반응형
- [ ] 하단 탭바 5개 (홈/케이스/등록/에이전트/알림)
- [ ] 사이드바 스와이프 오버레이
- [ ] Zone 3 숨김 + 바텀 시트 대체
- [ ] 승인 카드 스와이프 제스처

### Phase 3 완료 조건
- [ ] 데모 시나리오 전체 통과:
  - 지시 "오늘 민원 처리하고 이탈 위험 학생 알려줘"
  - → Complaint + Retention 병렬 실행
  - → 민원 3건 분류 + 초안 + 이탈 위험 2명
  - → 원장 원클릭 승인
- [ ] 모바일에서 승인 카드 동작
- [ ] Activity 타임라인에 전체 이력 표시
- [ ] k-skill 레지스트리에서 스킬 확인 가능

---

## Phase 4: 배포 + 제출

라이브 URL 확보 + 대회 제출물 완성. **여기서 삐끗하면 다 날아간다.**

### 공동

#### 배포
- [ ] GitHub public repo 생성 + README (영문+한글)
- [ ] 라이브 데모 환경 설정 (외부 PostgreSQL URL)
- [ ] 라이브 URL 동작 테스트 (모바일 포함)
- [ ] 데모 시나리오 최종 리허설 (2분 타이머, 3회 이상)

#### 랜딩 페이지 (별도 정적 사이트)
- [ ] 히어로: "학원의 AI 팀을 고용하세요"
- [ ] 스크린샷 3장 (대시보드, 케이스 상세, 승인 큐)
- [ ] 에이전트 소개 카드
- [ ] 배포 (Vercel or GitHub Pages)

#### 제출물 완성
- [ ] AI 리포트 작성 (.docx) — 04_증빙 소재 기반
  - AI 활용 전략 (멀티 에이전트 개발 과정)
  - 기술 아키텍처 설명
  - 데모 시나리오 시연 결과
- [ ] GitHub public URL 확인
- [ ] 라이브 URL 확인
- [ ] 개인정보 동의서
- [ ] 참가 각서

### 제출 체크리스트
- [ ] GitHub public URL
- [ ] 라이브 URL
- [ ] AI 리포트 (.docx)
- [ ] 개인정보 동의서
- [ ] 참가 각서

---

## Bonus (시간 남으면 — 1등 격차 벌리기)

- [ ] Scheduler Agent — 실제 일정 충돌 감지 + 대체 제안
- [ ] 에이전트 조직도 (시각적 트리)
- [ ] 민원 유형별 통계 차트
- [ ] Google Calendar 읽기 연동 (데모용)
- [ ] korean-law-mcp 실시간 연동 시연
- [ ] 다크 모드
- [ ] 케이스 칸반 뷰

---

## 의존성 그래프

```
Phase 1 (풀 스켈레톤)
  ├── UI 셸 + 15 페이지 ──────┐
  ├── DB 20 테이블 ───────────┤
  ├── Mock 데이터 ────────────┤──► Phase 2 (에이전트 코어)
  ├── Claude API 유틸 ────────┤       ├── Orchestrator + Complaint Agent
  └── 에이전트 스텁 ───────────┘       ├── 케이스 전체 흐름
                                      ├── 승인 파이프라인
                                      └── SSE 실시간 ──────────► Phase 3 (완성도)
                                                                  ├── Retention Agent
                                                                  ├── 대시보드 + Activity
                                                                  ├── k-skill 레지스트리
                                                                  ├── 온보딩 + 모바일
                                                                  └────────────────────► Phase 4 (제출)
                                                                                          ├── 배포
                                                                                          ├── 랜딩 페이지
                                                                                          └── AI 리포트
```

---

## Plan B: Paperclip 포크 전환

### 전환 기준
- **시점**: Phase 2 완료 예정 시점 (시간 기준 D6 종료)
- **조건**: 케이스 생성 → 에이전트 실행 → 승인 전체 E2E가 안 돌 때

### 전환 절차
1. `paperclip-master/` 복사 → `03_제품/app/`
2. `pnpm install` + embedded-postgres 연결 확인
3. Paperclip 원본이 돌아가는 것 확인
4. 교육 도메인 스킨 작업 (Company→Organization, Issue→Case 등)
5. 한국어 UI + Toss 디자인 토큰 적용
6. Mock 데이터 한국 교육 버전으로 교체
7. 에이전트 시스템 프롬프트 교육 특화

### 포크 시 예상 소요
- D7 오전: 포크 + 기본 커스텀 (4시간)
- D7 오후: 에이전트 프롬프트 + 한국어 (4시간)
- D8: 배포 + 제출 (하루)

---

## 기술 결정 사항

| 결정 | 선택 | 대안 (버림) | 이유 |
|------|------|------------|------|
| 빌드 방식 | 자체 빌드 (Plan A) | 포크 (Plan B) | 대회 평가 + 학습 + 커스텀 자유도 |
| Frontend | React 19 + Vite | Next.js | Paperclip 패턴, SPA 충분, SSR 불필요 |
| Router | React Router v7 | TanStack Router | 생태계 성숙도, Paperclip 동일 |
| Backend | Express v5 (ESM) | Fastify | Paperclip 동일, 에이전트 런타임 통합 |
| ORM | Drizzle | Prisma | Paperclip 동일, lightweight |
| Auth | local_trusted (없음) | next-auth | MVP 단순화, 단일 원장 |
| DB 로컬 | embedded-postgres | Docker Compose | Paperclip 동일, 원클릭 설치 |
| DB 배포 | 외부 PG URL | Neon.tech | 유연성, 오픈소스 설치형 |
| 상태 관리 | TanStack Query + Context | Redux / Zustand | Paperclip 동일, 서버 상태 중심 |
| 실시간 | SSE | WebSocket | 단방향 충분, 구현 단순 |
| 에이전트 실행 | 동기 (await) | 큐 (BullMQ) | MVP 단순화 |
| 컴포넌트 | shadcn/ui + 커스텀 | MUI / Ant | Paperclip 동일, Toss 스타일 맞춤 |
| 아이콘 | Lucide React | Heroicons | Paperclip 동일, 일관성 |
| Command | cmdk | kbar | Paperclip 동일 |

---

## 역할 분담

| 영역 | 승 (이승보) | 용 (김주용) |
|------|-----------|-----------|
| Phase 1 | Express 서버, DB 스키마, 에이전트 스텁, Claude API, Mock 시드 | Vite 프로젝트, 4존 레이아웃, 15개 페이지, 디자인 시스템 |
| Phase 2 | Orchestrator, Complaint Agent, 승인 파이프라인, SSE | REST API CRUD, 케이스 UI, 지시 입력 바 |
| Phase 3 | Retention Agent, Heartbeat, k-skill API | 대시보드, 승인큐 UI, Activity, 온보딩, 모바일 |
| Phase 4 | AI 리포트, 에이전트 프롬프트 최종 튜닝 | 배포, 랜딩 페이지, 스크린샷, 데모 리허설 |

---

## 절대 하지 않는 것

- Google Calendar 실제 OAuth 연동 (UI 스텁만)
- 카카오/SMS 실제 발송 (k-skill 포인터만)
- Scheduler Agent 실제 로직 (스케줄 UI만)
- 복잡한 인증 (local_trusted 모드)
- RLS 정책 (앱 레벨 필터링)
- 멀티 계정 (단일 원장)
- 플러그인 시스템 (Paperclip에 있지만 MVP 불필요)
- 어댑터 매니저 (claude_local 하드코딩)
