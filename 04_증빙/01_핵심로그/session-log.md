---
tags:
  - area/evidence
  - type/log
  - status/active
date: 2026-04-10
up: "[[_04_증빙_MOC]]"
---
# 세션 기록

> archive/reference.
> intake 기반 파생 로그. 직접 입력은 `ai-session-intake.csv`를 사용한다.

## 2026-04-06

| Session_ID | Phase | 목표 | 환경 | 클라이언트 | 모델 | 참여자 | 소스 | 산출물 | 의사결정 | 다음행동 | 상태 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| S-001 | Contest Research | 대회 개요 정리와 워크스페이스 구조화를 시작한다 | CLI | Claude Code | Opus 4.6 | User + Claude | 공지 PDF  /  홍보 PDF  /  플레이북 | [[바이브코딩공모전_공지]]  /  `_MOC/`  /  `.agent/agents/` | 평탄 구조와 증빙 중심 운영 시작 | 증빙 시스템 확장 단계로 연결 | logged |
| S-002 | Workspace Setup | 증빙 시스템 개선과 포터블 환경을 정리한다 | CLI | Claude Code | Opus 4.6 | User + Claude | 플레이북  /  엑셀 트래커 | evidence-system-improvement-analysis.md  /  setup.sh  /  portable-config.md | 엑셀 기반 기록 체계의 한계가 드러남 | PLAN/PROGRESS 생성으로 이어짐 | logged |
| S-003 | Workspace Setup | 멀티에이전트 조율 체계를 도입한다 | CLI | Claude Code | Opus 4.6 | User + Claude + Codex | Codex 평가  /  운영 문서 | [[.agent/system/ops/PLAN]]  /  [[.agent/system/ops/PROGRESS]] | PLAN/PROGRESS 도입 계기 | 증빙 확장과 아키텍처 시각화로 연결 | logged |
| S-CODEX-001 | Workspace Setup | 워크스페이스 전반을 평가해 약점과 개선점을 찾는다 | Desktop App | Codex | GPT-5 | User + Codex | 전체 워크스페이스 | [[codex-workspace-evaluation]] | Codex 평가서를 통해 개선 방향 확보 | 평가 결과를 운영 문서에 통합 | logged |
| S-CODEX-002 | Workspace Setup | AI-native 운영감사 보고서를 작성하고 수정한다 | Desktop App | Codex | GPT-5 | User + Codex | 플레이북  /  AGENTS  /  CLAUDE  /  증빙 로그 | [[ai-native-workspace-audit-report]] | - | 운영 정본 V2 구현으로 연결 | logged |
| S-GPT-001 | Contest Research | 대회 개요와 준비 로드맵의 큰 그림을 잡는다 | Web | ChatGPT | GPT-5.4 | User + GPT | 공식 URL  /  공지 PDF  /  홍보 PDF 2종 | [[바이브코딩공모전_공지]]  /  [[vibe_contest_master_playbook_v0_1]]  /  KEG_AI_Prompt_Tracker.xlsx | - | 후속 리서치와 구현 분업 검증 | logged |
| S-OPS-001 | Workspace Setup | 공용 운영 정본 V2를 실제 파일 구조로 반영한다 | Desktop App | Codex | GPT-5 | User + Codex | 승인된 V2 계획  /  기존 운영 문서 | [[workspace-contract]]  /  [[workspace-atlas]]  /  `.agent/system/` | `.agent/system`을 canonical로 채택 | 문제 리서치 세션에서도 같은 구조가 유효한지 검증 | logged |
| S-OPS-002 | Workspace Cleanup | 루트 구조와 경로 정합성을 단순화한다 | Desktop App | Codex | GPT-5 | User + Codex | 현재 폴더 구조  /  `.agent`  /  `.claude`  /  `03_제품`  /  `04_증빙` | `.agent/system/ops/`  /  `.claude/`  /  `03_제품/` | 루트 최소화와 `.context` 제거 결정 | 실전 운용 검증으로 연결 | logged |
| S-OPS-003 | Workspace Cleanup | 처음 보는 사용자 기준으로 memory/maps/evidence를 단순화한다 | Desktop App | Codex | GPT-5 | User + Codex | 기존 memory/maps/evidence 구조  /  사용자 요구 | [[long-term-memory]]  /  [[daily-memory]]  /  [[workspace-atlas]] | memory/maps/evidence 단순화 결정 | workspace-sync 실전 적용 검증 | logged |
| S-OPS-004 | Workspace Setup | GitHub 운영 전용 스킬을 추가한다 | Desktop App | Codex | GPT-5 | User + Codex | 사용자 요청  /  운영 규칙  /  증빙 구조 | `.agent/skills/github-workflow/SKILL.md`  /  registry | GitHub 작업을 evidence gate와 연결 | 실제 GitHub issue/commit 작업에서 검증 | logged |
| S-OPS-005 | Workspace Setup | Obsidian-first 운영 기준을 정본 문서에 명시한다 | Desktop App | Codex | GPT-5 | User + Codex | 사용자 지시  /  obsidian CLI  /  공용 운영 문서 | `.agent/skills/obsidian-workspace/SKILL.md`  /  [[AGENTS]] | 문서 레이어를 Obsidian 자산으로 취급 | 실제 note/MOC/base 작업에서 실전 적용 | logged |
| S-OPS-006 | Workspace Setup | Claude runtime command layer를 얇게 설계한다 | Desktop App | Codex | GPT-5 | User + Codex | Claude Code slash command 문서  /  기존 agents/skills | `.claude/commands/`  /  [[claude-command-stack]] | command layer를 얇게 유지하는 방향 | Claude runtime 실사용 검증 | logged |
| S-OPS-007 | Workspace Setup | GitHub issue/project 운영 스킬을 분리한다 | Desktop App | Codex | GPT-5 | User + Codex | 사용자 요청  /  `gh issue --help`  /  `gh project --help` | `.agent/skills/github-issue-ops/`  /  `.agent/skills/github-project-ops/` | GitHub management flow 분리 | 실제 issue triage와 board 생성에서 검증 | logged |
| S-OPS-008 | Workspace Setup | 증빙 입력을 단일 원장 체계로 전환한다 | Desktop App | Codex | GPT-5 | User + Codex | 기존 핵심 로그  /  공용 규칙 | [[master-evidence-ledger]]  /  [[memory-evidence-policy]] | 단일 원장 전략 도입 | 실제 세션 운영에서 체계 검증 | logged |
| S-OPS-009 | Workspace Setup | MOC를 중앙화하고 도구 문서를 저장소 내부로 가져온다 | Desktop App | Codex | GPT-5 | User + Codex | 기존 MOC 구조  /  tool docs | 다른 워크스페이스나 전역 환경에 덜 의존하는 포터블 구조가 되었다 | - | exact unavailable estimate | logged |
| S-PPLX-001 | Contest Research | 기관 의도와 유사 대회 패턴을 리서치한다 | Web | Perplexity | Search+AI | User + Perplexity | 기관 정보  /  대회 공지  /  웹 검색 결과 | [[기관_분석_및_심사_전략]]  /  [[계보_포지셔닝_분석]] | - | 실제 문제 후보 평가 시 조사 재활용 | logged |

## 2026-04-08

| Session_ID | Phase | 목표 | 환경 | 클라이언트 | 모델 | 참여자 | 소스 | 산출물 | 의사결정 | 다음행동 | 상태 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| S-EVID-015 | Evidence Operations | Codex 세션도 증빙 원장과 외부 AI 사용 집계에 포함되게 만든다 | Desktop App | Codex | GPT-5.4 | User + Codex | 기존 evidence docs  /  external-ai-usage.csv | [[master-evidence-ledger]]  /  `external-ai-usage.csv` | - | nightly 집계 시 stats 재생성 | logged |
| S-OPS-011 | Workspace Operations | 태그와 계층 규칙을 vault 전반에 일관되게 적용한다 | Desktop App | Codex | GPT-5 | User + Codex | note frontmatter  /  dashboard/base  /  규칙 문서 | [[tagging-system]]  /  `tag-audit.sh`  /  templates | DEC-015와 DEC-016의 실행 근거 | 새 note 생성 기본값으로 동일 규칙 유지 | logged |
| S-OPS-012 | Evidence | 대시보드와 계획/진행/데일리/메모리를 제출용으로 정렬한다 | Desktop App | Codex | GPT-5 | User + Codex | project dashboard  /  PLAN  /  PROGRESS  /  daily memory | [[project-dashboard]]  /  [[PLAN]]  /  [[PROGRESS]]  /  [[2026-04-08]] | DEC-018의 실행 근거 | 주제 확정 이후 제품 태스크도 같은 방식으로 누적 | logged |
| S-OPS-014 | Workspace Hardening | 공개 저장소 push 전 secret/privacy 점검 절차를 고정한다 | Desktop App | Codex | GPT-5.4 | User + Codex | GitHub 운영 정책  /  `.gitignore` | `pre-push-safety-check.sh`  /  `.gitignore` | 보안 gate 추가를 decision 후보로 검토 가능 | 이후 push 전 표준 루틴으로 사용 | logged |
| S-RES-013 | Research Ops | 리서치 작업 공간을 구축하고 NotebookLM을 통합한다 | Desktop App | Codex | GPT-5 | User + Codex | `06_LLM위키/sources`  /  전략 문서  /  NotebookLM | `research-hub`  /  `research-plan-eduswarm-v0`  /  NotebookLM notebook | NotebookLM을 리서치 합성 도구로 검증 | scorecard 반영과 최종 문제 압축으로 연결 | logged |
| S-STRAT-010 | Strategy | Karpathy 스타일 LLM Wiki를 현재 워크스페이스에 삽입한다 | Desktop App | Codex | GPT-5 | User + Codex | 전략 문서  /  wiki 설계 방향 | [[karpathy-llm-wiki-adaptation]]  /  `06_LLM위키/` | LLM 위키 레이어 도입 | 기존 전략 문서 첫 ingest 실행 | logged |

## 2026-04-09

| Session_ID | Phase | 목표 | 환경 | 클라이언트 | 모델 | 참여자 | 소스 | 산출물 | 의사결정 | 다음행동 | 상태 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| S-MTG-019 | Product Alignment | 승보님과 UI 및 핵심 컨셉을 공유하고 개발 착수 가능 여부를 정렬한다 | Offline Meeting | Human Meeting | - | User + 승보님 | UI 시안  /  기획 문서  /  모델링 결과 | UI 시안  /  기획 문서  /  모델링 결과 | 소규모 학원 타깃; 로컬 데이터 자산화; 무거운 SaaS 회피; 오픈소스 극대화 | 다음 단계는 UI 기준으로 실제 개발 착수 | logged |
| S-OPS-017 | Workspace Sync | 운영 문서와 메모리와 AI 사용 기록을 한 번 더 최신 상태로 동기화한다 | Desktop App | Codex | GPT-5.4 | User + Codex | PLAN  /  PROGRESS  /  daily-memory  /  ai-usage-stats  /  ai-session-intake | [[PLAN]]  /  [[PROGRESS]]  /  [[daily-memory]]  /  [[ai-usage-stats]] | - | nightly dispatch와 stats 재집계를 같은 패턴으로 반복 유지 | logged |
| S-PROD-018 | Product Learning | `03_제품/hagent-os` 기획 문서를 수정 없이 읽고 현재 제품 방향을 학습한다 | Desktop App | Codex | GPT-5.4 | User + Codex | `03_제품/hagent-os/README.md`  /  core-bet  /  market-and-customer  /  value-and-competition  /  prd  /  mvp-scope | `03_제품/hagent-os/README.md`  /  `00_vision/`  /  `01_strategy/`  /  `02_product/` | HagentOS를 제품명 정본으로 사용; MVP는 학원 원장 민원·예외 처리 OS로 본다 | 향후 구현/비평/리팩터링은 hagent-os 문서군을 기준으로 진행 | logged |
| S-STRAT-016 | Reference Analysis | `paperclip-master` 실제 코드 기준으로 분석 문서를 보강하고 운영 메모리를 최신화한다 | Desktop App | Codex | GPT-5.4 | User + Codex | `paperclip-master` repo  /  `ui/src/App.tsx`  /  architecture/api/deploy/plugin docs | `02_전략/paperclip-analysis/`  /  [[PLAN]]  /  [[PROGRESS]]  /  [[daily-memory]] | paperclip 해체 분석을 문제 정의 입력으로 승격 | 다음으로 problem-definition-source와 scorecard에 반영 | logged |

## 2026-04-10

| Session_ID | Phase | 목표 | 환경 | 클라이언트 | 모델 | 참여자 | 소스 | 산출물 | 의사결정 | 다음행동 | 상태 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| S-OPS-020 | Workspace Sync | Day 5 기준 운영 문서와 증빙 정본을 다시 동기화하고 구현 전 문서 충돌을 기록한다 | Desktop App | Codex | GPT-5.4 | User + Codex | PLAN  /  PROGRESS  /  project-dashboard  /  daily-memory  /  `04_증빙/03_daily/2026-04-10.md`  /  `03_제품/hagent-os/DESIGN.md`  /  `03_제품/hagent-os/brand/`  /  `03_제품/hagent-os/09_ux/` | [[PLAN]]  /  [[PROGRESS]]  /  [[project-dashboard]]  /  [[daily-memory]]  /  [[2026-04-10]] | 모바일 탭바/앱 셸/폰트/브랜드 claim를 구현 전 잠근다 | dispatch와 usage stats 재생성 | logged |
