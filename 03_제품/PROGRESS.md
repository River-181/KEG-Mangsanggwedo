---
tags: [area/product, type/progress, status/active]
date: 2026-04-09
up: "[[03_제품/PLAN]]"
aliases: [dev-progress, 개발진행]
---
# PROGRESS.md — HagentOS 개발 진행 상황

> **단일 진실 원본**: 모든 AI 에이전트는 작업 전후에 이 파일을 업데이트한다.
> 작업 시작: 해당 항목에 `🔵 진행 중 (에이전트명)` 표시
> 작업 완료: `✅` 체크 + 완료 시각

---

## 현재 상태

| 항목 | 상태 |
|------|------|
| Phase | D4 기획 완료 → **D5 앱 착수 준비** |
| 마지막 릴리스 | v0.1.4-verified (기획 문서 완성) |
| 마지막 커밋 | `docs: add HagentOS modeling diagrams (6종)` |
| 다음 목표 | D5: 인프라 + 스켈레톤 |
| 블로커 | 없음 (open-questions 참고) |

---

## D5 (4/10): 인프라 + 스켈레톤

### 프로젝트 초기화
- [ ] Next.js 14 프로젝트 생성 (`03_제품/app/`)
- [ ] package.json 의존성 설치
- [ ] TypeScript + Tailwind CSS + ESLint 설정
- [ ] `.env.local` 템플릿 생성

### 데이터베이스
- [ ] Docker Compose (PostgreSQL 15)
- [ ] Drizzle ORM 설정 (drizzle.config.ts)
- [ ] 스키마: Organization
- [ ] 스키마: Agent
- [ ] 스키마: Case
- [ ] 스키마: AgentRun
- [ ] 스키마: Approval
- [ ] 마이그레이션 실행 확인

### 인증
- [ ] next-auth 설치 + JWT 설정
- [ ] local_trusted 프로바이더 (자동 로그인)

### UI 셸
- [ ] 4존 레이아웃 (`layout.tsx`)
- [ ] Zone 0: 기관 레일 (72px)
- [ ] Zone 1: 사이드바 (240px)
- [ ] Zone 2: 메인 콘텐츠 (flex-1)
- [ ] Zone 3: 속성 패널 (320px, 조건부)
- [ ] 사이드바 네비게이션 메뉴
- [ ] 페이지 스텁: dashboard, cases, approvals, agents

### 에이전트 기반
- [ ] Claude API 연결 유틸리티 (`lib/claude.ts`)
- [ ] 에이전트 타입 정의 (`lib/agents/types.ts`)
- [ ] Orchestrator 스텁 (`lib/agents/orchestrator.ts`)
- [ ] Complaint Agent 스텁 (`lib/agents/complaint.ts`)
- [ ] Mock 데이터 시드 스크립트 (`scripts/seed.ts`)

### D5 체크포인트
- [ ] `pnpm dev` → 4존 레이아웃 렌더링
- [ ] DB 연결 + 테이블 생성 확인
- [ ] Mock 데이터 조회 API 동작

---

## D6 (4/11): 민원 단일 흐름

### 에이전트 파이프라인
- [ ] Orchestrator: Case → 계획 → assigneeAgentId
- [ ] Complaint Agent: 분류 + 초안 생성
- [ ] AgentRun 상태 관리 (running → completed/pending_approval)
- [ ] 승인 레벨 분기 (Level 0/1/2)

### API 라우트
- [ ] POST /api/cases (케이스 생성)
- [ ] GET /api/cases (목록)
- [ ] GET /api/cases/[id] (상세)
- [ ] POST /api/approvals/[id]/decide (승인/반려)

### 케이스 UI
- [ ] 케이스 목록 (`/cases`) — 상태별 그룹
- [ ] 케이스 상세 (`/cases/[id]`) — Zone2+Zone3
- [ ] 케이스 생성 폼
- [ ] 에이전트 실행 결과 표시

### D6 체크포인트
- [ ] **민원 생성 → 에이전트 실행 → 초안 → 승인 → 완결** 전체 흐름

---

## D7 (4/12): 승인 대시보드 + Retention

### 승인 UI
- [ ] 승인 큐 (`/approvals`) — 카드 + 원클릭
- [ ] 대시보드 (`/dashboard`) — 에이전트 현황 + 오늘 현황
- [ ] 에이전트 상세 (`/agents/[id]`)
- [ ] 모바일 반응형

### Retention Agent
- [ ] 이탈 위험 점수 산출
- [ ] Level 0: 대시보드 표시
- [ ] Level 1: 학부모 메시지 초안

### Heartbeat
- [ ] node-cron 07:00 heartbeat
- [ ] Orchestrator → 에이전트 병렬 깨움

### D7 체크포인트
- [ ] 데모 시나리오 전체 통과
- [ ] 모바일 승인 카드 동작

---

## D8 (4/13): 배포 + 제출

### 배포
- [ ] Vercel 배포
- [ ] Neon.tech PostgreSQL
- [ ] 라이브 URL 동작

### 추가 (시간 남으면)
- [ ] k-skill 레지스트리 UI
- [ ] 에이전트 조직도

### 제출물
- [ ] GitHub public URL
- [ ] 라이브 URL
- [ ] AI 리포트 (.docx)
- [ ] 개인정보 동의서
- [ ] 참가 각서

---

## 완료된 작업 (기획 Phase)

- ✅ v0.1.0: 기획 문서 세트 57개 파일 작성
- ✅ v0.1.1: Codex 3라운드 리뷰 → CRITICAL 6 + HIGH 9 + MEDIUM 7 수정
- ✅ v0.1.2: 디자인 시스템 (Toss 토큰) + Paperclip UI 분석
- ✅ v0.1.3: k-edu-zero-human.md 마스터 컨텍스트 브리프
- ✅ v0.1.4: Opus + Codex 최종 검증 → 도메인 모델/승인 레벨/스프린트 수정
- ✅ 모델링 다이어그램 6종 (ERD, 시퀀스, 상태머신, 시스템 컨텍스트, 데모 흐름, IA 맵)

---

## AI 에이전트 참여 로그

| 시각 | 에이전트 | 작업 | 결과 |
|------|---------|------|------|
| — | — | D5 시작 대기 | — |
