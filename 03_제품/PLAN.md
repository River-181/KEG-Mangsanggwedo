---
tags: [area/product, type/plan, status/active]
date: 2026-04-09
up: "[[03_제품/SPEC]]"
aliases: [dev-plan, 개발계획]
---
# PLAN.md — HagentOS 개발 실행 계획

> D5-D8 스프린트. **SPEC.md**를 먼저 읽어라.
> 진행 상황은 **PROGRESS.md**에서 추적.

---

## D5 (4/10 목): 인프라 + 스켈레톤

### 용(김주용) — UI/인프라
- [ ] Next.js 14 프로젝트 초기화 (`03_제품/app/`)
  - TypeScript, Tailwind CSS, App Router
- [ ] Docker Compose: PostgreSQL 15 로컬 환경
- [ ] Drizzle ORM 설정 + 5개 핵심 테이블 마이그레이션
  - Organization, Agent, Case, AgentRun, Approval
  - 스키마 기준: `SPEC.md > MVP 핵심 테이블` + `hagent-os/08_data/domain-model.md`
- [ ] next-auth 설정 (local_trusted — 세션 고정, 로그인 스킵)
- [ ] 4존 레이아웃 셸 (Zone 0-3, responsive)
  - UI 참고: `archive/HagentOS-MVP-2026-04-09/public/`
  - 디자인 토큰: `hagent-os/design.md`
- [ ] 사이드바 네비게이션 (정적 메뉴, 라우트 연결)
- [ ] 페이지 스텁: `/dashboard`, `/cases`, `/cases/[id]`, `/approvals`, `/agents/[id]`

### 승(이승보) — 에이전트/AI
- [ ] Claude API 연결 유틸리티 (`lib/claude.ts`)
  - `.env.local`에 `ANTHROPIC_API_KEY`
  - 응답 파싱 + 에러 핸들링 + 토큰 카운팅
- [ ] Mock 데이터 시드 스크립트 (`scripts/seed.ts`)
  - Organization 1개 (기존 학원 프로필)
  - Agent 3개 (Orchestrator, Complaint, Retention)
  - Student 10명 + Parent 5명
  - Case 5건 (민원 3 + 이탈 2)
  - Instructor 3명
- [ ] 에이전트 런타임 기본 구조 (`lib/agents/`)
  - `types.ts` — Agent, Case, AgentRun 타입
  - `orchestrator.ts` — 스텁 (Claude 호출 구조만)
  - `complaint.ts` — 스텁
- [ ] WakeupRequest dedup 로직 설계

### 합류 체크포인트 (D5 저녁)
- [ ] `pnpm dev` 실행 → 4존 레이아웃 렌더링 확인
- [ ] DB 연결 + 테이블 생성 확인
- [ ] Mock 데이터 조회 API 1개 동작 확인

---

## D6 (4/11 금): 민원 단일 흐름 완성

### 승 — Complaint Agent 파이프라인
- [ ] Orchestrator: Case → 계획 수립 → assigneeAgentId 결정
  - 시스템 프롬프트: Case context + Organization profile + k-skill list
  - 출력: `{assigneeAgentId, approvalLevel, plan}`
- [ ] Complaint Agent: 케이스 분류 + 응답 초안 생성
  - 입력: Case + Student history + 관련 k-skill
  - 출력: `{category, severity, draft, reasoning}`
- [ ] AgentRun 상태 관리 (running → completed/pending_approval)
- [ ] 승인 레벨 분기 (Level 0: 자동완결, Level 1: 승인큐, Level 2: 에스컬레이션)

### 용 — API + 케이스 UI
- [ ] API 라우트:
  - `POST /api/cases` — 케이스 생성 + WakeupRequest 삽입
  - `GET /api/cases` — 목록 조회 (상태별 그룹핑)
  - `GET /api/cases/[id]` — 상세 조회 (AgentRun 포함)
  - `POST /api/approvals/[id]/decide` — 승인/반려
- [ ] 케이스 목록 페이지 (`/cases`) — 상태별 그룹 헤더
- [ ] 케이스 상세 페이지 (`/cases/[id]`) — Zone2 본문 + Zone3 속성 패널
  - 에이전트 실행 결과 표시 (초안, 상태, 토큰 사용량)
- [ ] 케이스 생성 폼 (type, severity, description, reporterId, studentId)

### 합류 체크포인트 (D6 저녁)
- [ ] 민원 생성 → Complaint Agent 실행 → 초안 표시 → 승인 → 완결 **전체 흐름 동작**
- [ ] AgentRun 기록 확인 (tokensUsed, output)

---

## D7 (4/12 토): 승인 대시보드 + Retention

### 용 — 승인 UI + 대시보드
- [ ] 승인 큐 페이지 (`/approvals`)
  - 대기 중 카드: 에이전트명, 케이스 제목, 초안 미리보기
  - 원클릭: [승인] [편집] [반려]
- [ ] 대시보드 (`/dashboard`)
  - 에이전트 현황 카드 (idle/running/error)
  - 오늘 현황: 미처리 민원, 이탈 위험 학생, 최근 케이스
- [ ] 에이전트 상세 (`/agents/[id]`) — 상태, 최근 실행, 지시사항
- [ ] 모바일 반응형 (하단 탭바 5개)

### 승 — Retention Agent + Heartbeat
- [ ] Retention Agent 구현
  - 이탈 위험 점수 산출 (결석, 과제, 비활동, 성적 변화)
  - Level 0: 대시보드 표시 (자동)
  - Level 1: 학부모 안내 메시지 초안
- [ ] node-cron heartbeat (`07:00`)
  - Orchestrator 깨움 → 오늘 할 일 계획
  - Complaint Agent: 미처리 민원 확인
  - Retention Agent: 이탈 위험 학생 스캔
- [ ] 데모 시나리오 준비 (민원 2-3건 + 이탈 위험 1건)

### 합류 체크포인트 (D7 저녁)
- [ ] 데모 시나리오 전체 통과 (민원 접수 → 승인 → 이탈 감지)
- [ ] 모바일에서 승인 카드 동작 확인

---

## D8 (4/13 일): 배포 + 제출

### 공동
- [ ] Vercel 배포 (환경변수 설정)
- [ ] Neon.tech PostgreSQL 프로비저닝 + 마이그레이션
- [ ] 라이브 URL 동작 테스트
- [ ] k-skill 레지스트리 UI (정적 카탈로그 — 시간 남으면)
- [ ] 에이전트 조직도 UI (시간 남으면)
- [ ] 데모 시나리오 최종 테스트 (2분 타이머)
- [ ] AI 리포트 작성 (04_증빙 소재 기반)
- [ ] GitHub 정리 (README, 스크린샷)
- [ ] 제출 체크리스트:
  - [ ] GitHub public URL
  - [ ] 라이브 URL
  - [ ] AI 리포트 (.docx)
  - [ ] 개인정보 동의서
  - [ ] 참가 각서

---

## 의존성 그래프

```
D5 Drizzle 스키마 ──────┬──► D6 API 라우트 ──────┬──► D7 승인 UI
D5 Claude API 유틸 ────┬┘                        │
D5 Mock 데이터 ────────┘                         │
                                                  │
D5 에이전트 스텁 ──► D6 Complaint Agent ──────────┤──► D7 Retention Agent
                    D6 Orchestrator ──────────────┘
                                                  │
                                                  └──► D8 배포 + 제출
```

---

## 기술 결정 사항

| 결정 | 선택 | 대안 (버림) | 이유 |
|------|------|------------|------|
| ORM | Drizzle | Prisma | 오픈소스, 가벼움, PostgreSQL 네이티브 |
| Auth | next-auth JWT | Supabase Auth | 독립성, local_trusted 모드 가능 |
| DB 호스팅 | Neon.tech | Supabase | Serverless PostgreSQL, Vercel 통합 |
| 에이전트 실행 | 동기 (await) | 큐 (BullMQ) | MVP 단순화, 큐는 Phase 1 |
| 상태 관리 | React Server Components + SWR | Redux | Next.js 14 최적 패턴 |
