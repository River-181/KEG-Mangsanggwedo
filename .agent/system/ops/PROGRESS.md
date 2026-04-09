---
tags:
  - area/system
  - type/reference
  - status/active
date: 2026-04-09
up: "[[.agent/system/ops/README]]"
aliases:
  - 진행상황
---
# PROGRESS.md — 진행 상황

> **모든 에이전트는 작업 시작 시 이 파일을 읽는다.**
> 작업 완료 시 해당 항목을 업데이트한다.
> 마지막 업데이트: 2026-04-09 (Day 4)

---

## 현재 단계: Day 4 완료 — 기획 전체 완성

## 완료된 작업

### 워크스페이스 구조화 ✅
- [x] 디렉토리 구조 생성 (01~05, assets, 03_제품/app, 03_제품/tests)
- [x] 기존 파일 11개 이동 및 정리
- [x] MOC 6개 작성 및 `_MOC/` 중앙화
- [x] `.agent/AGENTS.md` — 에이전트 공용 진입점
- [x] `.agent/` — agents, rules, skills, adapters, system 정리
- [x] `.claude/` — 최소 어댑터만 유지 (`CLAUDE.md`, `settings.json`)
- [x] `.context/` 내용 흡수 후 폴더 제거
- [x] 옵시디언 설정 (첨부파일 → assets/, 데일리 → 04_증빙/03_daily/)

### 전략 문서 ✅
- [x] 대회 개요서 (`01_대회정보/바이브코딩공모전_공지.md`)
- [x] 마스터 플레이북 (`02_전략/vibe_contest_master_playbook_v0_1.md`)
- [x] 계보·포지셔닝 분석 (`02_전략/계보_포지셔닝_분석.md`)
- [x] 기관 분석 및 심사 전략 (`02_전략/기관_분석_및_심사_전략.md`)

### 프로젝트 관리 ✅
- [x] PM 대시보드 (`_system/dashboard/project-dashboard.md`)
- [x] 태스크 트래커 (`_system/dashboard/project-dashboard.base`)
- [x] `PLAN / PROGRESS / daily / task`를 대시보드와 유기적으로 연결하는 제출용 구조 확정

### 증빙 체계 ✅ (1차)
- [x] ai-usage-log.md — 초기 이벤트 로그 기록
- [x] decision-log.md — DEC-001~005 기록
- [x] prompt-catalog.md — 뼈대
- [x] 데일리 노트 04-06

### 포터블 환경 ✅
- [x] `.agent/adapters/claude/setup.sh` — 원커맨드 플러그인 설치
- [x] `.agent/skills/` — 프로젝트 커스텀 스킬 공간
- [x] `.agent/adapters/claude/portable-config.md` — 이식성 가이드

### 증빙 체계 2차 ✅
- [x] Codex 평가 기록
- [x] 플레이북 분석 + AI 리포트 전략 문서화
- [x] Plan 문서 프로젝트 내 보존
- [x] ai-usage-log 컬럼 확장 (Session_ID + Tokens 필드 포함, U-001~U-018)
- [x] session-log.md 생성
- [x] tool-log.md 생성
- [x] evolution-log.md 생성
- [x] token-strategy.md 생성
- [x] Excalidraw 아키텍처 다이어그램 (5레이어: Human→Harness→AI Agent→Tools→Output/Submit)
- [x] AI-native 운영감사 보고서 작성 (`04_증빙/ai-native-workspace-audit-report.md`)

### 멀티에이전트 조율 ✅
- [x] PROGRESS.md (이 파일)
- [x] PLAN.md
- [x] CLAUDE.md 업데이트 — 에이전트 시작 프로토콜 (PLAN→PROGRESS→AGENTS 순서)
- [x] AGENTS.md 업데이트 — 동일 프로토콜 추가

### V2 운영 정본화 ✅
- [x] `.agent/system/` 골격 생성
- [x] 운영 계약 3종 생성 (`workspace-contract`, `mirroring-policy`, `memory-evidence-policy`)
- [x] memory를 `long-term-memory` + `daily-memory` 구조로 재정리
- [x] registry 4종 생성 (tools, mcp, skills, plugins)
- [x] Mermaid 다이어그램 정본 6종 생성
- [x] `.context/` 내용 흡수 후 폴더 제거
- [x] `.claude/CLAUDE.md`를 최소 어댑터 참조형으로 축소
- [x] `ai-usage-log`, `session-log`, `prompt-catalog`, `tool-log` V2 인터페이스 반영
- [x] `evidence-gate-log.md` 도입
- [x] DEC-007, DEC-008 기록
- [x] 운영 파일을 `.agent/system/ops/`로 이동
- [x] `.claude/agents`, `.claude/rules`, `.claude/skills`를 `.agent/`로 흡수
- [x] memory를 `장기기억/일일기억` 2층 구조로 단순화
- [x] maps를 `workspace-atlas.md` 1파일 기준으로 단순화
- [x] `04_증빙`를 `01_핵심로그 / 02_분석자료 / 03_daily`로 재배치
- [x] `workspace-sync` 스킬 추가
- [x] `github-workflow` 스킬 추가
- [x] `master-evidence-ledger.md` 단일 증빙 원장 도입

### Obsidian 구조 정규화 ✅
- [x] 태그 체계를 `area/*`, `type/*`, `status/*`, `workflow/*` namespace로 재정의
- [x] 기존 평면/별칭성 태그 제거 및 frontmatter 정규화
- [x] child note에 `up` 속성을 의무화해 bottom-up 추적 복원
- [x] 태그 규칙 문서, 감사 스크립트, note template 추가
- [x] `.agent`, `.claude`, visible vault 전반에 동일 규칙 반영

### 재사용 자산화 ✅
- [x] prompt-catalog를 `Intent / Prompt / Input contract / Output contract / Reuse rule / Linked evidence` 구조로 확장
- [x] 태그 정규화, `up` 계층 복원 프롬프트를 자산으로 저장
- [x] prompt packaging 가이드와 template 추가

### 지식 시스템 확장 ✅
- [x] `06_LLM위키/` 레이어 도입
- [x] `index.md`, `overview.md`, `schema.md`, `log.md` 생성
- [x] `karpathy-llm-wiki-adaptation.md`로 현재 vault 매핑 문서화

### 데일리/메모리 보강 ✅
- [x] 누락된 `2026-04-07.md`, `2026-04-08.md` 생성
- [x] `.agent/system/memory/daily-memory.md`를 현재 구조 기준으로 갱신
- [x] 새 파일/폴더의 생성 이유를 대시보드에 명시

### 세션 intake 파이프라인 ✅
- [x] 엑셀 트래커 시트 구조를 참고한 `ai-session-intake.csv` canonical ledger 도입
- [x] 과거 AI 세션 22건을 intake 파일로 백필
- [x] `dispatch-session-intake.py`로 `master-evidence-ledger.md`, `external-ai-usage.csv`, `session-intake-dispatch-report.md` 재생성 구현
- [x] `session-intake-pipeline.md`와 공용 운영 문서를 intake-first 흐름으로 갱신

### 리서치 운영 정렬 ✅
- [x] `02_전략/research-results/`를 리서치 작업 공간으로 정리
- [x] `research-hub`, `research-plan-eduswarm-v0`, `research-prompts-by-tool`, `research-log` 생성
- [x] `problem-bank`, `problem-scorecard` 초안 생성
- [x] `gemini`, `grok`, `perplexity` 리서치 결과를 통합한 `R-007_EduSwarm_리서치_통합_브리프.md` 작성
- [x] `nlm` 재인증 및 CLI 동작 복구
- [x] NotebookLM 노트북 `KEG EduSwarm Research 2026-04-08` 생성 및 리서치 문서 18개 업로드
- [x] NotebookLM 1차 질의로 `담임 모드` 우선 가설 도출
- [x] Bottom-Up 전용 노트북 `KEG Bottom-Up Academy Research 2026-04-09` 생성 및 소스 18개 업로드
- [x] 바텀업 프롬프트 5종 실행 후 `R-008_NLM_바텀업학원리서치합성.md` 작성
- [x] 바텀업 질의 기준으로 `운영자 모드`와 `민원/이탈` 축이 다시 강하게 부상함을 확인
- [x] `nlm deep research`로 새 웹 소스 22개를 Bottom-Up 노트북에 추가 import
- [x] NotebookLM Studio report artifact 생성 및 Google Docs export 완료
- [x] `02_전략/research-results/20_domain-analysis/`에 학원 운영 도메인 심화 문서 4종 정리
- [x] `02_전략/research-results/`를 `00_hub / 10_reports / 20_domain-analysis / 30_external-ai` 구조로 통합
- [x] 새 deep research import 기준으로 `02_전략/01-problem-scorecard.md`를 후보 3개 압축 방식으로 전면 개편
- [x] 현재 1순위를 `학원 운영자 민원·예외 처리 OS`로 재정렬

### Paperclip 코드 해체 분석 ✅
- [x] `02_전략/paperclip-analysis/paperclip-master/`에 실제 reference repo 로컬 복제본 배치
- [x] `ui/src/App.tsx`, `docs/start/architecture.md`, `docs/api/overview.md`, `docs/deploy/deployment-modes.md`, `packages/plugins/sdk/README.md` 기준으로 repo-grounded 분석 수행
- [x] `01-ui-entrypoints.md`, `02-data-context-model.md`, `03-agent-skill-structure.md`, `04-k-education-fit-gaps.md`, `05-open-questions.md` 보강
- [x] `06-runtime-control-plane-map.md`, `07-plugin-adapter-extensibility.md` 추가
- [x] 모방 기준을 `chat UX`가 아니라 `control plane + local-first deployment + plugin/adapter extensibility`로 재정렬

---

## 참여 중인 AI 에이전트

| AI                    | 환경              | 현재 역할             | 마지막 작업       |
| --------------------- | --------------- | ----------------- | ------------ |
| Claude Opus 4.6       | Claude Code CLI | 제품 기획, k-skill 설계 | hagent-os/ 기획 문서 10개 + k-skill 생태계 반영 (Day 4) |
| GPT-5.4 (ChatGPT Pro) | Web             | 전략 설계, 플레이북 작성    | 플레이북 v0.1 완료 |
| GPT-5 (Codex)         | Desktop App     | 리서치 운영, NLM 통합, 증빙 정리 | Bottom-Up 딥리서치 + Studio report export 완료 |
| Perplexity            | Web             | 리서치 수집            | 운영자/교사 페인포인트 리서치 완료 |

---

### GitHub 연결 ✅
- [x] git init + remote 추가 (https://github.com/River-181/KEG-Mangsanggwedo.git)
- [x] .gitignore 생성
- [x] 초기 커밋 (74 files, 4868 insertions) + push to main

---

### HagentOS 기획 문서 세트 (03_제품/hagent-os/) ✅ → Round 3 완료
- [x] `README.md` — 프로젝트 진입점, 아키텍처 다이어그램 (k-skill + 실존 MCP 반영)
- [x] `00_vision/core-bet.md` — 핵심 베팅 + k-skill 스킬 공급 구조에 실존 MCP 13개+ 반영
- [x] `00_vision/success-metrics.md` — 성공 지표 (스케줄러 + k-skill KPI 추가)
- [x] `01_strategy/market-and-customer.md` — 시장·고객 분석 (스케줄 pain 추가)
- [x] `01_strategy/value-and-competition.md` — 가치 제안·경쟁 (실존 MCP moat 강화)
- [x] `01_strategy/go-to-market.md` — GTM 전략 (Phase 1에 외부 MCP 라이브 연동 추가)
- [x] `02_product/prd.md` — PRD (전체 맵 ★ 12/14개로 확장, 에이전트별 스킬 장착 맵, 실존 MCP 13개 레퍼런스)
- [x] `02_product/mvp-scope.md` — MVP 범위 (S8 외부 MCP 라이브 연동 추가, Not Now에 실존 도구 ✅ 표시)
- [x] `02_product/user-personas.md` — 페르소나
- [x] `02_product/user-journeys.md` — 사용자 여정 (스케줄러 + 캘린더 동기화)
- [x] `03_domain/academy-operations.md` — 학원 운영 도메인 (일과, 스케줄, 유형별 차이, 예외/루틴)
- [x] `03_domain/finance-and-policy.md` — 재무·법규 도메인 (환불, 세무, 노무, 법정기한, 규제 리스크)
- [x] `03_domain/communication-model.md` — 커뮤니케이션 도메인 (채널, 민원, 리포트, 데이터 자산)
- [x] `04_ai-agents/agent-design.md` — 에이전트 아키텍처 정본 (Paperclip 메커니즘 반영, DB 스키마, 실행 흐름, 협력 패턴, 예산 모델)
- [x] `04_ai-agents/agent-roles/orchestrator.md` — 태스크 라우팅, 병렬 브리핑 패턴, System Prompt
- [x] `04_ai-agents/agent-roles/complaint.md` — 7종 분류, 긴급도, 에스컬레이션 조건
- [x] `04_ai-agents/agent-roles/retention.md` — 이탈 점수화(4스트림), 개입 권고 6종
- [x] `04_ai-agents/agent-roles/scheduler.md` — 7종 스케줄, 외부 시험 연동, 구글 캘린더 동기화
- [x] `04_ai-agents/agent-roles/intake.md` — 신규 문의 → 등록 전환
- [x] `04_ai-agents/agent-roles/staff.md` — 강사 성과, 번아웃, 노무
- [x] `04_ai-agents/agent-roles/finance.md` — 환불, 세무, 급여
- [x] `04_ai-agents/agent-roles/compliance.md` — 학원법, 소방, 개인정보
- [x] `04_ai-agents/agent-roles/notification.md` — 다채널 알림 (cross-cutting)
- [x] `04_ai-agents/agent-roles/analytics.md` — 주간/월간 리포트
- [x] `05_workflows/complaint-handling.md` — 민원 처리 7단계, k-skill 주입 지점, 분기 처리, DB 스키마
- [x] `05_workflows/churn-detection.md` — 이탈 감지 4스트림, 점수 공식, 개입 → 추적
- [x] `05_workflows/schedule-management.md` — 강사 공결 대체, 구글 캘린더 동기화, 외부 시험 트리거
- [x] `05_workflows/new-enrollment.md` — 문의→상담→등록 전환, follow-up cron, 온보딩
- [x] `05_workflows/morning-briefing.md` — 07:00 heartbeat 병렬 브리핑, Level 0/1 분류
- [x] `05_workflows/compliance-alert.md` — D-30/D-7/D-1 법정 기한, korean-law-mcp 연동
- [x] `06_policies/communication-policy.md` — 채널별 발송 원칙, SLA, AI 투명성
- [x] `06_policies/data-policy.md` — 수집 범위, 보존 기간, 익명화, 감사 로그 불변성
- [x] `06_policies/ai-safety-policy.md` — 절대 금지 3종, 제로휴먼 정책, RBAC, override 보장
- [x] `07_integrations/integrations.md` — Google Calendar MVP, 카카오/SMS Phase2, MCP 13개 연동 가이드, .env 예시
- [x] `08_data/domain-model.md` — ERD + 10개 핵심 테이블 상세, 멀티지점/공교육 확장 가이드
- [x] `08_data/reporting-metrics.md` — 실시간 6지표, 주간/월간 리포트, 에이전트별 KPI, 엑셀 5시트
- [x] `09_ux/information-architecture.md` — 사이트맵, 10개 화면 인벤토리, 4개 여정 흐름, 모바일/데스크톱 분리
- [x] `09_ux/ux-concepts.md` — 승인 카드 해부도, 3-tap 모바일 flow, swipe 제스처, 에러 UX
- [x] `10_execution/roadmap.md` — D5~D8 스프린트, 역할 분담, Phase 1~3, 기술 부채 목록
- [x] `10_execution/open-questions.md` — 기술/제품/도메인/비즈니스 미결 13항목, 우선순위 매트릭스
- [x] Codex 리뷰 03+04 — 완료 (CRITICAL 2 + HIGH 2 수정)
- [x] Codex 리뷰 05+06 — 완료 (CRITICAL 1 + HIGH 3 수정)
- [x] Codex 리뷰 07+10 — 완료 (CRITICAL 1 + HIGH 2 + MEDIUM 2 수정)
- [x] design.md — Paperclip 기반 HagentOS 디자인 시스템
- [x] INDEX.md — 개발자용 빠른 탐색 인덱스
- [x] k-edu-zero-human.md — 제목/내용 업데이트 (Level 0-4 canonical 정렬)
- [x] 07_integrations — @solapi/mcp-server, kimcp 추가, 연동 우선순위 매트릭스
- [x] 증빙 S-PROD-019 추가

---

## 다음 단계: Day 5 준비 완료 — 앱 스켈레톤 착수 (D5: Next.js + Supabase)

1. **Next.js + Supabase 스켈레톤** — 앱 구조, DB 스키마 설정, Mock 데이터 투입
2. **역할 분담** — 이승보 (Orchestrator+에이전트), 김주용 (UI+인프라)
3. **설계 기준** — `design.md` (색상 토큰), `INDEX.md` (문서 색인)
4. **Google Calendar OAuth** — D7 전 credentials 준비
5. **k-skill 프로토타입** — `refund-calculator`, `k-education-law-lookup` 등 실제 동작 확인
