---
tags:
  - area/evidence
  - type/log
  - status/active
date: 2026-04-12
up: "[[_04_증빙_MOC]]"
---
# AI 사용 기록

> archive/reference.
> intake 기반 파생 로그. 직접 입력은 `ai-session-intake.csv`를 사용한다.

## 2026-04-06

| ID | Session_ID | Phase | 작업 | 환경 | 클라이언트 | 모델 | Prompt_Count | Estimated_Tokens | Artifact | Notes |
|---|---|---|---|---|---|---|---:|---:|---|---|
| U-001 | S-001 | Contest Research | 대회 개요 정리와 워크스페이스 구조화를 시작한다 | CLI | Claude Code | Opus 4.6 | 0 | 0 | [[바이브코딩공모전_공지]]  /  `_MOC/`  /  `.agent/agents/` | Claude exact 통계는 별도 집계 |
| U-002 | S-002 | Workspace Setup | 증빙 시스템 개선과 포터블 환경을 정리한다 | CLI | Claude Code | Opus 4.6 | 0 | 0 | evidence-system-improvement-analysis.md  /  setup.sh  /  portable-config.md | DEC-004 전후 맥락과 연결됨 |
| U-003 | S-003 | Workspace Setup | 멀티에이전트 조율 체계를 도입한다 | CLI | Claude Code | Opus 4.6 | 0 | 0 | [[.agent/system/ops/PLAN]]  /  [[.agent/system/ops/PROGRESS]] | DEC-006과 직접 연결 |
| U-004 | S-CODEX-001 | Workspace Setup | 워크스페이스 전반을 평가해 약점과 개선점을 찾는다 | Desktop App | Codex | GPT-5 | 1 | 10000 | [[codex-workspace-evaluation]] | ai-usage-log U-013 기반 백필 |
| U-005 | S-CODEX-002 | Workspace Setup | AI-native 운영감사 보고서를 작성하고 수정한다 | Desktop App | Codex | GPT-5 | 2 | 16000 | [[ai-native-workspace-audit-report]] | ai-usage-log U-016~017 기반 백필 |
| U-006 | S-GPT-001 | Contest Research | 대회 개요와 준비 로드맵의 큰 그림을 잡는다 | Web | ChatGPT | GPT-5.4 | 4 | 50000 | [[바이브코딩공모전_공지]]  /  [[vibe_contest_master_playbook_v0_1]]  /  KEG_AI_Prompt_Tracker.xlsx | 엑셀 트래커 원형과 가장 가까운 초기 기획 세션 |
| U-007 | S-OPS-001 | Workspace Setup | 공용 운영 정본 V2를 실제 파일 구조로 반영한다 | Desktop App | Codex | GPT-5 | 1 | 12000 | [[workspace-contract]]  /  [[workspace-atlas]]  /  `.agent/system/` | session-log 기반 |
| U-008 | S-OPS-002 | Workspace Cleanup | 루트 구조와 경로 정합성을 단순화한다 | Desktop App | Codex | GPT-5 | 1 | 14000 | `.agent/system/ops/`  /  `.claude/`  /  `03_제품/` | DEC-009와 직접 연결 |
| U-009 | S-OPS-003 | Workspace Cleanup | 처음 보는 사용자 기준으로 memory/maps/evidence를 단순화한다 | Desktop App | Codex | GPT-5 | 1 | 14000 | [[long-term-memory]]  /  [[daily-memory]]  /  [[workspace-atlas]] | DEC-010과 직접 연결 |
| U-010 | S-OPS-004 | Workspace Setup | GitHub 운영 전용 스킬을 추가한다 | Desktop App | Codex | GPT-5 | 1 | 8000 | `.agent/skills/github-workflow/SKILL.md`  /  registry | DEC-011 맥락 |
| U-011 | S-OPS-005 | Workspace Setup | Obsidian-first 운영 기준을 정본 문서에 명시한다 | Desktop App | Codex | GPT-5 | 1 | 10000 | `.agent/skills/obsidian-workspace/SKILL.md`  /  [[AGENTS]] | DEC-012 맥락 |
| U-012 | S-OPS-006 | Workspace Setup | Claude runtime command layer를 얇게 설계한다 | Desktop App | Codex | GPT-5 | 1 | 12000 | `.claude/commands/`  /  [[claude-command-stack]] | DEC-013 맥락 |
| U-013 | S-OPS-007 | Workspace Setup | GitHub issue/project 운영 스킬을 분리한다 | Desktop App | Codex | GPT-5 | 1 | 10000 | `.agent/skills/github-issue-ops/`  /  `.agent/skills/github-project-ops/` | DEC-014 맥락 |
| U-014 | S-OPS-008 | Workspace Setup | 증빙 입력을 단일 원장 체계로 전환한다 | Desktop App | Codex | GPT-5 | 1 | 9000 | [[master-evidence-ledger]]  /  [[memory-evidence-policy]] | 이후 이번 턴에서 다시 intake-first로 재설계됨 |
| U-015 | S-OPS-009 | Workspace Setup | MOC를 중앙화하고 도구 문서를 저장소 내부로 가져온다 | Desktop App | Codex | GPT-5 | 1 | 12000 | 다른 워크스페이스나 전역 환경에 덜 의존하는 포터블 구조가 되었다 | master ledger 기반 백필 |
| U-016 | S-PPLX-001 | Contest Research | 기관 의도와 유사 대회 패턴을 리서치한다 | Web | Perplexity | Search+AI | 2 | 18000 | [[기관_분석_및_심사_전략]]  /  [[계보_포지셔닝_분석]] | 출처 품질은 별도 검증 필요 |

## 2026-04-08

| ID | Session_ID | Phase | 작업 | 환경 | 클라이언트 | 모델 | Prompt_Count | Estimated_Tokens | Artifact | Notes |
|---|---|---|---|---|---|---|---:|---:|---|---|
| U-017 | S-EVID-015 | Evidence Operations | Codex 세션도 증빙 원장과 외부 AI 사용 집계에 포함되게 만든다 | Desktop App | Codex | GPT-5.4 | 2 | 12000 | [[master-evidence-ledger]]  /  `external-ai-usage.csv` | 이번 턴에서 기존 CSV를 보강한 세션 |
| U-018 | S-OPS-011 | Workspace Operations | 태그와 계층 규칙을 vault 전반에 일관되게 적용한다 | Desktop App | Codex | GPT-5 | 1 | 15000 | [[tagging-system]]  /  `tag-audit.sh`  /  templates | master ledger와 decision log에 이미 반영된 세션 |
| U-019 | S-OPS-012 | Evidence | 대시보드와 계획/진행/데일리/메모리를 제출용으로 정렬한다 | Desktop App | Codex | GPT-5 | 1 | 14000 | [[project-dashboard]]  /  [[PLAN]]  /  [[PROGRESS]]  /  [[2026-04-08]] | master ledger 기반 백필 |
| U-020 | S-OPS-014 | Workspace Hardening | 공개 저장소 push 전 secret/privacy 점검 절차를 고정한다 | Desktop App | Codex | GPT-5.4 | 1 | 9000 | `pre-push-safety-check.sh`  /  `.gitignore` | master ledger 기반 백필 |
| U-021 | S-RES-013 | Research Ops | 리서치 작업 공간을 구축하고 NotebookLM을 통합한다 | Desktop App | Codex | GPT-5 | 2 | 22000 | `research-hub`  /  `research-plan-eduswarm-v0`  /  NotebookLM notebook | 혼합 도구 세션이지만 intake에서는 한 row로 기록 |
| U-022 | S-STRAT-010 | Strategy | Karpathy 스타일 LLM Wiki를 현재 워크스페이스에 삽입한다 | Desktop App | Codex | GPT-5 | 1 | 12000 | [[karpathy-llm-wiki-adaptation]]  /  `06_LLM위키/` | master ledger 기반 백필 |

## 2026-04-09

| ID | Session_ID | Phase | 작업 | 환경 | 클라이언트 | 모델 | Prompt_Count | Estimated_Tokens | Artifact | Notes |
|---|---|---|---|---|---|---|---:|---:|---|---|
| U-023 | S-MTG-019 | Product Alignment | 승보님과 UI 및 핵심 컨셉을 공유하고 개발 착수 가능 여부를 정렬한다 | Offline Meeting | Human Meeting | - | 0 | 0 | UI 시안  /  기획 문서  /  모델링 결과 | 2026-04-09 22:10 KST 승보님 미팅 기록 |
| U-024 | S-OPS-017 | Workspace Sync | 운영 문서와 메모리와 AI 사용 기록을 한 번 더 최신 상태로 동기화한다 | Desktop App | Codex | GPT-5.4 | 1 | 8000 | [[PLAN]]  /  [[PROGRESS]]  /  [[daily-memory]]  /  [[ai-usage-stats]] | 2026-04-09 follow-up workspace sync 세션 |
| U-025 | S-PROD-018 | Product Learning | `03_제품/hagent-os` 기획 문서를 수정 없이 읽고 현재 제품 방향을 학습한다 | Desktop App | Codex | GPT-5.4 | 1 | 7000 | `03_제품/hagent-os/README.md`  /  `00_vision/`  /  `01_strategy/`  /  `02_product/` | read-only learning session for current product docs |
| U-026 | S-STRAT-016 | Reference Analysis | `paperclip-master` 실제 코드 기준으로 분석 문서를 보강하고 운영 메모리를 최신화한다 | Desktop App | Codex | GPT-5.4 | 1 | 18000 | `02_전략/paperclip-analysis/`  /  [[PLAN]]  /  [[PROGRESS]]  /  [[daily-memory]] | 2026-04-09 reference analysis + workspace sync 세션 |

## 2026-04-10

| ID | Session_ID | Phase | 작업 | 환경 | 클라이언트 | 모델 | Prompt_Count | Estimated_Tokens | Artifact | Notes |
|---|---|---|---|---|---|---|---:|---:|---|---|
| U-027 | S-OPS-020 | Workspace Sync | Day 5 기준 운영 문서와 증빙 정본을 다시 동기화하고 구현 전 문서 충돌을 기록한다 | Desktop App | Codex | GPT-5.4 | 1 | 6000 | [[PLAN]]  /  [[PROGRESS]]  /  [[project-dashboard]]  /  [[daily-memory]]  /  [[2026-04-10]] | 2026-04-10 workspace sync + pre-implementation review 세션 |
| U-028 | S-PROD-021 | App Gap Audit + P0/P1 Fix | 11개 페이지 전수 갭 감사 후 P0(강사관리·일정편집·반배정) P1(스킬추가·일괄승인·목표링크·루틴이력) 즉시 구현 | Claude Code CLI | Claude | claude-sonnet-4-6 | 4 | ~85000 | [[PROGRESS]]  /  [[PLAN]]  /  git commit f32570b | 2026-04-10 운영 갭 감사 + P0/P1 병렬 구현 세션 |

## 2026-04-11

| ID | Session_ID | Phase | 작업 | 환경 | 클라이언트 | 모델 | Prompt_Count | Estimated_Tokens | Artifact | Notes |
|---|---|---|---|---|---|---|---:|---:|---|---|
| U-029 | S-DEV-022 | Product Build v1.0 | HagentOS 독립 레포 구축 + Paperclip급 E2E 완전 재구축 (서버 엔진 + UI + Mock AI + DB 마이그레이션) | Claude Code CLI | Claude | claude-opus-4-6 → claude-sonnet-4-6 | 1 | ~320000 | [[PROGRESS]]  /  git commits 09a02e0~3254c76 (River-181/hagent-os) | 2026-04-11 HagentOS v1.0 독립 레포 + E2E 완전 재구축 메가 세션 |

## 2026-04-12

| ID | Session_ID | Phase | 작업 | 환경 | 클라이언트 | 모델 | Prompt_Count | Estimated_Tokens | Artifact | Notes |
|---|---|---|---|---|---|---|---:|---:|---|---|
| U-030 | S-EVID-024 | Evidence Operations | 오늘 AI 사용 기록을 intake와 정본 로그에 반영한다 | Desktop App | Codex | GPT-5.4 | 1 | 10000 | `ai-session-intake.csv`  /  `master-evidence-ledger.md`  /  `external-ai-usage.csv`  /  `ai-usage-log.md`  /  `session-log.md`  /  `2026-04-12.md` | 2026-04-12 today AI usage logging session |
| U-031 | S-OPS-023 | Workspace Sync + Meeting Log | Day 7 작업 환경 이동 확인 + 회의록 추가 + 운영 문서 동기화 | Claude Code CLI | Claude | claude-sonnet-4-6 | 1 | ~15000 | [[2026-04-12]]  /  [[2026-04-12_4차-배포전-점검-미팅]]  /  [[daily-memory]]  /  [[PLAN]]  /  [[PROGRESS]] | 2026-04-12 Day 7 작업 환경 이동 + 회의록 + 문서 동기화 세션 |
