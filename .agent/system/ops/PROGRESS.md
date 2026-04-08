---
tags:
  - area/system
  - type/reference
  - status/active
date: 2026-04-08
up: "[[.agent/system/ops/README]]"
aliases:
  - 진행상황
---
# PROGRESS.md — 진행 상황

> **모든 에이전트는 작업 시작 시 이 파일을 읽는다.**
> 작업 완료 시 해당 항목을 업데이트한다.
> 마지막 업데이트: 2026-04-08 (Day 2)

---

## 현재 단계: Day 2 — 운영 가시화 완료, 문제 정의 수렴 전

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
- [x] `gemini`, `grok`, `perplexity` 리서치 결과를 통합한 `20260408_EduSwarm_리서치_통합_브리프.md` 작성
- [x] `nlm` 재인증 및 CLI 동작 복구
- [x] NotebookLM 노트북 `KEG EduSwarm Research 2026-04-08` 생성 및 리서치 문서 18개 업로드
- [x] NotebookLM 1차 질의로 `담임 모드` 우선 가설 도출

---

## 참여 중인 AI 에이전트

| AI                    | 환경              | 현재 역할             | 마지막 작업       |
| --------------------- | --------------- | ----------------- | ------------ |
| Claude Opus 4.6       | Claude Code CLI | 워크스페이스 구조화, 증빙 설계 | 증빙 시스템 확장 중  |
| GPT-5.4 (ChatGPT Pro) | Web             | 전략 설계, 플레이북 작성    | 플레이북 v0.1 완료 |
| GPT-5 (Codex)         | Desktop App     | 리서치 운영, NLM 통합, 증빙 정리 | 리서치 노트북 생성 및 통합 질의 완료 |
| Perplexity            | Web             | 리서치 수집            | 운영자/교사 페인포인트 리서치 완료 |

---

### GitHub 연결 ✅
- [x] git init + remote 추가 (https://github.com/River-181/KEG-Mangsanggwedo.git)
- [x] .gitignore 생성
- [x] 초기 커밋 (74 files, 4868 insertions) + push to main

---

## 미완료 — 다음 에이전트가 이어받을 것

1. **문제 후보 3개 축소** — `problem-scorecard` 기준으로 전략 후보 압축
2. **최종 문제 1개 결정** — `decision-sprint`, `scope-board` 실사용
3. **NotebookLM 추가 질의 2~3회 실행** — `담임 모드 vs 운영자 모드`를 더 좁히고 최종 컷 기준 확정
4. **LLM 위키 1차 ingest 실전 적용** — 기존 전략 문서를 entity/concept/problem note로 변환
5. **제품 정의 초안 작성** — 아직 `03_제품/`은 뼈대 상태
6. **단일 intake 운영 습관 정착** — 새 세션마다 `ai-session-intake.csv` 먼저 append하고 nightly dispatch 유지
