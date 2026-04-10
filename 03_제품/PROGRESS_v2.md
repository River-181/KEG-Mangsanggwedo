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
| 전략 | **Plan A** 유지 — 포크 불필요, E2E 파이프라인 동작 확인 |
| Phase | **Phase 4 진입** (배포 + 데모 + 제출 단계) |
| 마지막 릴리스 | **v0.4.0** (커밋 f32570b, 9a4c80c, df3ddc6) |
| 현재 목표 | DB 마이그레이션 실행 + 온보딩 완성 + 배포 + 데모 스크립트 |
| 데모 학원 | **탄자니아 영어학원** (대치동, 영어, 초/중/고/성인) |
| Plan B 판단 | **포크 불필요** — E2E 흐름 동작 확인됨 |
| 블로커 | DB 마이그레이션 0002 미실행, 배포 미완 |
| 마감 | **2026-04-13 (D-3)** |

---

## Phase 1: 풀 스켈레톤 ✅ 완료 (2026-04-10)

- [x] pnpm monorepo, Vite + React 19, Tailwind v4, React Router v7, TanStack Query
- [x] 4존 레이아웃 (Z0 레일 + Z1 사이드바 + Z2 메인 + Z3 속성패널)
- [x] 사이드바 네비게이션 (Work / 운영영역 / 에이전트팀 / 기관관리)
- [x] CommandPalette (Cmd+K)
- [x] 24개 페이지 (dashboard, inbox, cases/칸반, cases/:id, approvals, agents, agents/:id, orgchart, schedule, students, **instructors**, goals, routines, projects, documents, skills, costs, activity, settings, onboarding, design-guide 등)
- [x] CSS Variables 전체 (Toss 토큰) + shadcn/ui 컴포넌트
- [x] brew postgres@17 + Drizzle ORM + 22개 테이블 (student_schedules 포함 v2)
- [x] 탄자니아 영어학원 시드 (학생 15명, 강사 5명, 수업 12개, 케이스 5건, 에이전트 7종)
- [x] SSE 실시간 이벤트 엔드포인트
- [x] BreadcrumbBar + 모바일 탭바

**완료일**: 2026-04-10

---

## Phase 2: 에이전트 코어 ✅ 완료 (2026-04-10)

- [x] Orchestrator: 자연어 → 계획 → assigneeAgentId → 병렬 디스패치
- [x] Complaint Agent: 분류 + 초안 + k-skill 컨텍스트 (mock fallback 포함)
- [x] AgentRun 상태 머신 (queued → running → completed / pending_approval / failed)
- [x] SSE 실시간 스트리밍 (agent.run.started, completed)
- [x] 승인 레벨 분기 (Level 0-3)
- [x] Cases CRUD + Comments + Approvals decide + Activity
- [x] 케이스 목록 (상태별 그룹 + 칸반 DnD)
- [x] 케이스 상세 (Zone2 본문 + Zone3 속성 + ActivityTimeline)
- [x] 케이스 생성 폼 + 대시보드 지시 입력 바
- [x] 카카오톡/SMS 웹훅 → 케이스 자동 생성 + 에이전트 자동 배정
- [x] **E2E 파이프라인 동작 확인** — Plan B 포크 불필요

**완료일**: 2026-04-10

---

## Phase 3: 완성도 ✅ 완료 (2026-04-10)

- [x] Retention Agent (이탈 위험 점수 + 대시보드 카드)
- [x] node-cron heartbeat + 수동 트리거 (`POST /api/heartbeat/trigger`)
- [x] k-skill API + 12종 스킬 (complaint-classifier, korean-tone-guide, refund-calculator 등)
- [x] 에이전트 스킬 장착/해제 모달 (k-skill 카탈로그)
- [x] 승인 큐 — 카드 + 원클릭 + **일괄 승인/거부** + 편집 모드
- [x] 대시보드 — 지표 4개 + 에이전트 패널 + 이탈 위험 + 활동 + 스케줄
- [x] Activity 감사 로그 — 타임라인 + 필터
- [x] 에이전트 상세 — 5탭 (Overview/Instructions/Skills/Configuration/Budget)
- [x] 에이전트 Controls: Assign Task, Run Heartbeat, Pause/Resume
- [x] k-skill 레지스트리 페이지 (카탈로그 + 상세)
- [x] 온보딩 위자드 (학원명 → 에이전트팀 → 대시보드)
- [x] InstructorsPage (강사 CRUD + 상세 Sheet)
- [x] SchedulePage (강사 선택 + 수정/삭제 인라인 + 학생 목록 API)
- [x] StudentsPage (반배정 classGroup 필드)
- [x] GoalsPage (linkedCases → /cases/:id 링크)
- [x] RoutinesPage (실행 이력 아코디언 상세)
- [x] OrgChart (에이전트 노드 클릭 → 상세 이동)
- [x] DB v2: students(classGroup/shuttle), instructors(email), student_schedules
- [x] 모바일 탭바 반응형

**완료일**: 2026-04-10

---

## Phase 4: 실제 작동 에이전트 + 배포 + 제출 🔵 진행 중 (D6~D8)

> 갭 분석: `03_제품/PAPERCLIP-GAP-ANALYSIS.md`

### Phase 4a: 에이전트 실행 품질 (D6)
- [ ] STEP 0: DB 마이그레이션 0002 실행 — 용
- [ ] STEP 1: 에이전트 실행 루프 완성 (G1) — execution.ts: Case 상태 자동 변경 + 댓글 자동 삽입 — 승
- [ ] STEP 2: Run Transcript 채팅 UI (G5) — AgentDetailPage RunRow: 채팅 버블 렌더링 — 용
- [ ] STEP 3: Instructions 탭 SOUL/HEARTBEAT/AGENTS 분리 (G3) — 서버 PUT + UI 4탭 — 승+용
- [ ] STEP 4: Configuration 탭 실제 편집 (G7) — SettingsTab: 모델 선택 + 저장 — 용

### Phase 4b: 배포 + 온보딩 (D7)
- [ ] STEP 5: 온보딩 완성 — Launch 시 dispatch 실행 — 용
- [ ] STEP 6: Railway 배포 — Dockerfile + PG addon + 환경변수 — 용
- [ ] STEP 6: 라이브 URL 동작 확인 — 승+용

### Phase 4c: 제출물 (D7~D8)
- [ ] STEP 7: GitHub README (라이브 URL 포함) — 용
- [ ] STEP 7: AI 리포트 (.docx) — 승
- [ ] STEP 7: 데모 스크립트 v0.1 (2분) — 승+용
- [ ] STEP 8: 데모 리허설 3회 이상 — 승+용
- [ ] STEP 8: 최종 버그 핫픽스 — 승+용
- [ ] 제출: GitHub URL + 라이브 URL + AI 리포트 + 동의서 + 각서

**목표 완료일**: 2026-04-13

---

## Bonus ✅/[ ]
- [x] 케이스 칸반 뷰 (DnD 상태 변경)
- [x] 에이전트 조직도 (OrgChart, 클릭 → 상세)
- [ ] Scheduler Agent 실제 로직 → Phase 1 (post-대회)
- [ ] Google Calendar 읽기 연동 → Phase 1
- [ ] korean-law-mcp 라이브 시연 → Phase 1
- [ ] 다크 모드 → Phase 1

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
| 2026-04-10 | Claude (Sonnet) ×4 | 리뷰 반영: DB FK + 서버 라우트 + 시드 교체 + UI 연결 | 완료 |
| 2026-04-10 | Claude (Sonnet) | v0.3.0~v0.3.1: UI 폴리시, 스케줄 캘린더, E2E 파이프라인, 카카오 웹훅, 스크롤 버그, 에이전트 Controls | 완료 |
| 2026-04-10 | Claude (Sonnet) ×5 | v0.4.0 갭 감사 + P0/P1 병렬 구현 (InstructorsPage, SchedulePage 편집, 반배정, 스킬추가, 일괄승인) | 완료 |
| 2026-04-10 | Claude (Sonnet) | DB v2 스키마, 서버 PATCH/student-schedules, roadmap/PROGRESS 업데이트 | 완료 |
