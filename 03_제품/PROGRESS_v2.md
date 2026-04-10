---
tags: [area/product, type/progress, status/active]
date: 2026-04-10
up: "[[03_제품/PLAN]]"
aliases: [dev-progress, 개발진행]
---
# PROGRESS.md — HagentOS 개발 진행 상황

> **단일 진실 원본**: 모든 AI 에이전트는 작업 전후에 이 파일을 업데이트한다.
> 작업 시작: `🔵 진행 중 (에이전트명)` 표시
> 작업 완료: `✅` 체크 + 완료 시각
> 날짜는 작업이 끝난 후 기록한다 (후불).

---

## 현재 상태

| 항목 | 상태 |
|------|------|
| 전략 | **Plan A** (자체 빌드, 고충실도 Paperclip 모방) |
| Phase | **Phase 1 진행 중** (Codex 리뷰 반영 수정 중) |
| 마지막 릴리스 | v0.1.4-verified (기획 문서 완성) |
| 현재 목표 | Phase 1 완성: 4존 레이아웃 + 실제 API 데이터 표시 + 탄자니아 영어학원 시드 |
| 데모 학원 | **탄자니아 영어학원** (대치동, 영어, 초/중/고/성인) |
| Plan B 판단 | Phase 2 종료 시점 — E2E 흐름 안 돌면 Paperclip 포크 전환 |
| 블로커 | embedded-postgres arm64 미지원 → brew postgres@17로 대체 |
| 마감 | 2026-04-13 |

---

## Phase 1: 풀 스켈레톤

### 프로젝트 초기화
- [x] pnpm monorepo 구조 (`app/`, `server/`, `packages/db/`, `packages/shared/`)
- [x] Vite + React 19 + TypeScript
- [x] Tailwind CSS v4 (Toss 토큰)
- [x] React Router v7 전체 라우트
- [x] TanStack Query + API 클라이언트
- [x] `.env` 템플릿 + `.env` (brew postgres@17)

### 4존 레이아웃 셸
- [x] RootLayout (Z0 레일 + Z1 사이드바 + Z2 메인 + Z3 속성패널)
- [x] 사이드바 네비게이션 (그룹별: Work / 운영영역 / 에이전트팀 / 기관관리)
- [x] 모바일: 하단 탭바 5개 + Z0+Z1 오버레이
- [ ] CommandPalette (Cmd+K)
- [x] BreadcrumbBar

### 15개 페이지 스텁
- [x] dashboard, inbox, cases, cases/:id, cases/new
- [x] approvals, approvals/:id
- [x] agents, agents/:id
- [x] schedule, activity, skills, settings, onboarding
- [x] design-guide

### 디자인 시스템
- [x] CSS Variables (DESIGN.md 토큰 전체)
- [ ] shadcn/ui 기본 컴포넌트 10종 (Tailwind 직접 사용 중)
- [ ] HagentOS 복합 컴포넌트 6종
- [x] Light/Dark 토글

### Express 서버
- [x] Express v5 + TypeScript ESM
- [x] CORS + static serve + JSON parser
- [x] API 라우트 8개 모듈 (health, organizations, cases, agents, approvals, activity, skills, runs)
- [ ] SSE 실시간 이벤트 엔드포인트

### 데이터베이스 (20개 테이블)
- [x] brew postgres@17 (embedded-postgres arm64 미지원 → 대체)
- [x] Drizzle ORM 설정 + drizzle-kit push
- [x] Must 테이블 9개
- [x] Should 테이블 5개
- [x] 교육 도메인 테이블 6개
- [x] FK 제약 추가 (Codex 리뷰 반영)

### Mock 데이터 시드 — 탄자니아 영어학원
- [x] Organization 1개 (탄자니아 영어학원, prefix: tanzania)
- [x] Agent 4개 (Orchestrator, Complaint, Retention, Scheduler)
- [x] Student 15명 + Parent 10명 + Instructor 4명 (영어 강사)
- [x] Case 5건 (영어학원 민원) + AgentRun 3건 + Approval 2건
- [x] Schedule 10건 + ActivityEvent 15건
- [x] 멱등성 처리 (재실행 가능)

### 에이전트 기반
- [x] Claude API 유틸리티 (API key 가드 추가)
- [x] 에이전트 타입 정의
- [x] Orchestrator / Complaint / Retention 스텁
- [ ] WakeupRequest dedup 로직

### Codex 리뷰 반영 (D5)
- [x] DB: FK 제약 추가 (cases→opsGroups, cases→students, opsGoals self-FK)
- [x] DB: build 스크립트 수정, migrate.ts 생성
- [x] DB: agentTypeEnum에 compliance/notification 추가
- [x] Server: POST/PATCH 라우트 추가 (cases, agents, approvals)
- [x] Server: approvals/:id/decide 엔드포인트
- [x] Server: Claude API key 가드
- [x] UI: api/runs.ts 생성, client.ts 204 처리
- 🔵 UI: 페이지 실제 API 데이터 연결 (진행 중)

### Phase 1 체크포인트
- [x] `pnpm dev` → 서버 3100 + UI 5173 동시 시작
- [x] DB 20테이블 + Mock 시드 (탄자니아 영어학원)
- [x] API 6개+ 동작 (health, orgs, cases, agents, approvals, skills)
- [ ] CommandPalette + 모바일 탭바 (브라우저 테스트 필요)
- 🔵 페이지에서 실제 데이터 표시 (진행 중)

**완료일**: —

---

## Phase 2: 에이전트 코어 — 전체 흐름

### 에이전트 파이프라인
- [ ] Orchestrator: 자연어 → 계획 → assigneeAgentId → 병렬 디스패치
- [ ] Complaint Agent: 분류 + 초안 + k-skill 컨텍스트
- [ ] AgentRun 상태 머신 (queued → running → completed/pending_approval)
- [ ] SSE 실시간 스트리밍
- [ ] 승인 레벨 분기 (Level 0-3)

### REST API
- [ ] Cases CRUD (POST, GET, GET/:id, PATCH)
- [ ] Comments (POST)
- [ ] Approvals (GET, POST/:id/decide)
- [ ] Agents (GET, GET/:id)
- [ ] Activity (GET)
- [ ] Orchestrator dispatch (POST)

### 케이스 UI
- [ ] 케이스 목록 — 상태별 그룹 + 건수
- [ ] 케이스 상세 — Zone2(본문+라이브 실행) + Zone3(속성)
- [ ] 케이스 생성 폼
- [ ] 대시보드 지시 입력 바

### Phase 2 체크포인트
- [ ] **지시 → Orchestrator → Complaint → 초안 → 승인 → 완결** 전체 E2E
- [ ] SSE 실시간 상태
- [ ] Activity 기록

**완료일**: —
**⚠️ Plan B 판단 시점**: 여기서 E2E 안 돌면 포크 전환

---

## Phase 3: 완성도 — 데모 임팩트

### Retention Agent + Heartbeat
- [ ] 이탈 위험 점수 산출 (5개 신호, 가중치)
- [ ] Level 0: 대시보드 자동 표시 / Level 1: 메시지 초안 → 승인
- [ ] node-cron 07:00 heartbeat + 수동 트리거
- [ ] 에이전트 병렬 실행

### k-skill
- [ ] k-skill API (GET /skills, GET /skills/:slug)
- [ ] 내장 스킬 3개 (complaint-classifier, korean-tone-guide, churn-risk-calculator)
- [ ] 외부 MCP 포인터 3개

### 핵심 UI 완성
- [ ] 승인 큐 — 카드 그리드 + 원클릭 + 편집 모드
- [ ] 대시보드 — 지표 4개 + 에이전트 패널 + 이탈 위험 + 활동 + 스케줄
- [ ] Activity 감사 로그 — 타임라인 + 필터
- [ ] 에이전트 상세 — 6탭
- [ ] k-skill 레지스트리 — 카탈로그 + 상세
- [ ] 온보딩 위자드 — 4 step
- [ ] 모바일 반응형 (탭바 + 스와이프 + 바텀시트)

### Phase 3 체크포인트
- [ ] 2분 데모 시나리오 전체 통과
- [ ] 모바일 승인 동작
- [ ] Activity + k-skill UI

**완료일**: —

---

## Phase 4: 배포 + 제출

### 배포
- [ ] GitHub public repo + README
- [ ] 라이브 데모 환경 (외부 PG URL)
- [ ] 랜딩 페이지 배포
- [ ] 데모 리허설 3회+

### 제출물
- [ ] GitHub public URL
- [ ] 라이브 URL
- [ ] AI 리포트 (.docx)
- [ ] 개인정보 동의서
- [ ] 참가 각서

**완료일**: —

---

## Bonus
- [ ] Scheduler Agent 실제 로직
- [ ] 에이전트 조직도
- [ ] 민원 유형별 통계
- [ ] Google Calendar 읽기 연동
- [ ] korean-law-mcp 라이브 시연
- [ ] 다크 모드
- [ ] 케이스 칸반 뷰

---

## 완료된 작업 (기획 단계)

- ✅ 기획 문서 세트 57개 파일 (v0.1.0)
- ✅ Codex 3라운드 리뷰 + 수정 (v0.1.1)
- ✅ 디자인 시스템 + Paperclip UI 분석 (v0.1.2)
- ✅ 마스터 컨텍스트 브리프 (v0.1.3)
- ✅ Opus + Codex 최종 검증 (v0.1.4)
- ✅ 모델링 다이어그램 6종 (ERD, System Context, Orchestrator Sequence, Demo Flow, Approval State, IA Screen Map)
- ✅ SPEC.md + PLAN.md + PROGRESS.md 생성
- ✅ 기술 스택 전체 교정: Next.js → React 19 + Vite + Express v5 + embedded-postgres
- ✅ SPEC/PLAN에 Paperclip 엔진 관계 확립 (매핑 테이블, 10 패턴, 5 차별점)
- ✅ DESIGN.md + k-edu-zero-human.md 기술 스택 교정
- ✅ Paperclip 오픈소스 코드 구조 분석 (45 페이지, 108 컴포넌트, 63 테이블, ~79K LOC)
- ✅ PLAN v2 작성 — 야심찬 버전 (15페이지 + 20테이블 + 에이전트 3개 + Plan B)

## 완료된 작업 (Phase 1 개발)

- ✅ pnpm 모노레포 초기화 (4 패키지: shared, db, server, ui)
- ✅ 의존성 전체 설치 (React 19, Vite 6, Express 5, Drizzle, TanStack Query)
- ✅ DB 스키마 20개 테이블 생성 (Drizzle ORM, drizzle-kit push)
- ✅ Express 서버 8개 라우트 모듈 (GET + POST/PATCH)
- ✅ 에이전트 스텁 3개 (Orchestrator, Complaint, Retention) + Claude API 유틸
- ✅ UI 38개 파일: 4존 레이아웃, 5 Context, 15 페이지, 6 API 모듈
- ✅ 탄자니아 영어학원 시드 데이터 (1 org, 4 agents, 15 students, 5 cases 등)
- ✅ brew postgres@17 설치 (embedded-postgres arm64 대체)
- ✅ 서버 + UI typecheck 전체 통과
- ✅ API 통합 테스트 통과 (health, orgs, cases, agents, approvals, skills)
- ✅ Codex 리뷰 수행 + 20건 이슈 수정 중

---

## AI 에이전트 참여 로그

| 시각 | 에이전트 | 작업 | 결과 |
|------|---------|------|------|
| 2026-04-10 | Claude (Opus) | SPEC/PLAN/PROGRESS 기술 스택 교정 | 완료 |
| 2026-04-10 | Codex | 모델링 다이어그램 6종 리뷰 반영 | 완료 |
| 2026-04-10 | Claude (Opus) | SPEC/PLAN Paperclip 엔진 관계 확립 + 문서 교정 | 완료 |
| 2026-04-10 | Claude (Opus) | Paperclip 코드 구조 분석 + PLAN v2 작성 | 완료 |
| 2026-04-10 | Claude (Sonnet) ×3 | Phase 1 병렬 빌드: DB스키마 + 서버 + UI | 완료 |
| 2026-04-10 | Codex | Phase 1 코드 리뷰 (CRITICAL 1, HIGH 10, MEDIUM 8) | 완료 |
| 2026-04-10 | Claude (Sonnet) ×4 | 리뷰 반영: DB FK + 서버 라우트 + 시드 교체 + UI 연결 | 진행 중 |
