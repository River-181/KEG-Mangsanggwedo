---
tags:
  - area/evidence
  - type/log
  - status/active
  - workflow/evidence-source
date: 2026-04-10
up: "[[_04_증빙_MOC]]"
aliases:
  - master-evidence-ledger
  - 증빙원장
  - AI리포트원장
---
# Master Evidence Ledger

> 이 파일은 `ai-session-intake.csv`에서 파생되는 증빙 원장이다.
> 낮 동안 직접 입력은 intake에 먼저 하고, nightly dispatch에서 이 파일을 재생성한다.

## 원칙

- intake row 1건은 의미 있는 세션 1건이다.
- 세션 블록은 날짜별로 정렬해 렌더링한다.
- 정확 수치와 추정 수치를 구분해 `Token note`에 남긴다.
- prompt/decision 승격 여부는 dispatch report의 후보를 보고 최종 판단한다.

## 2026-04-06

### S-001

- DateTime: 2026-04-06 / CLI
- Phase: Contest Research
- Tool/Client: Claude Code
- Model: Opus 4.6
- Goal: 대회 개요 정리와 워크스페이스 구조화를 시작한다
- What changed: 대회 개요서와 초기 워크스페이스 구조 및 MOC와 에이전트 뼈대가 만들어졌다
- Why it mattered: 프로젝트 전체를 증빙 중심 워크스페이스로 운영하는 출발점이 되었다
- Artifacts: [[바이브코딩공모전_공지]] | `_MOC/` | `.agent/agents/`
- AI usage strategy: Claude Code는 로컬 파일 생성과 구조화에 집중했다
- Evidence value: 워크스페이스 초기 생성 기록
- Report section hint: 워크플로우 | AI 활용 과정
- Token note: exact token source exists in Claude JSONL
- Follow-up: 증빙 시스템 확장 단계로 연결

### S-002

- DateTime: 2026-04-06 / CLI
- Phase: Workspace Setup
- Tool/Client: Claude Code
- Model: Opus 4.6
- Goal: 증빙 시스템 개선과 포터블 환경을 정리한다
- What changed: 증빙 구조 분석 문서와 setup 스크립트 및 포터블 설정이 추가되었다
- Why it mattered: 기록 체계가 일회성이 아니라 재현 가능한 구조로 전환되었다
- Artifacts: evidence-system-improvement-analysis.md | setup.sh | portable-config.md
- AI usage strategy: 분석 결과를 바로 스크립트와 설정 파일로 연결했다
- Evidence value: 증빙 체계와 포터블 환경 설계 기록
- Report section hint: AI 활용 전략 | 유지보수성
- Token note: exact token source exists in Claude JSONL
- Follow-up: PLAN/PROGRESS 생성으로 이어짐

### S-003

- DateTime: 2026-04-06 / CLI
- Phase: Workspace Setup
- Tool/Client: Claude Code
- Model: Opus 4.6
- Goal: 멀티에이전트 조율 체계를 도입한다
- What changed: PLAN과 PROGRESS가 생기고 멀티 AI 동기화 프로토콜이 도입되었다
- Why it mattered: 여러 AI가 현재 상태와 다음 할 일을 공유할 수 있게 되었다
- Artifacts: [[.agent/system/ops/PLAN]] | [[.agent/system/ops/PROGRESS]]
- AI usage strategy: Claude는 운영 문서 반영을 맡고 Codex 평가는 입력 신호로 활용했다
- Evidence value: 멀티 에이전트 조율 체계의 기원
- Report section hint: 워크플로우 | AI 활용 과정
- Token note: Claude exact token은 JSONL 참조
- Follow-up: 증빙 확장과 아키텍처 시각화로 연결

### S-CODEX-001

- DateTime: 2026-04-06 / Desktop App
- Phase: Workspace Setup
- Tool/Client: Codex
- Model: GPT-5
- Goal: 워크스페이스 전반을 평가해 약점과 개선점을 찾는다
- What changed: 워크스페이스 평가서와 개선 우선순위가 정리되었다
- Why it mattered: 운영 정본화와 증빙 체계 재설계의 외부 피드백 근거가 되었다
- Artifacts: [[codex-workspace-evaluation]]
- AI usage strategy: Codex는 감사와 정리 역할로 활용했다
- Evidence value: 초기 진단과 약점 식별 근거
- Report section hint: AI 활용 전략 | 운영 감사
- Token note: exact unavailable estimate
- Follow-up: 평가 결과를 운영 문서에 통합

### S-CODEX-002

- DateTime: 2026-04-06 / Desktop App
- Phase: Workspace Setup
- Tool/Client: Codex
- Model: GPT-5
- Goal: AI-native 운영감사 보고서를 작성하고 수정한다
- What changed: 운영감사 보고서 초안과 수정본이 만들어졌다
- Why it mattered: 운영 체계의 통합성/재현성/자동화 한계를 구조적으로 정리했다
- Artifacts: [[ai-native-workspace-audit-report]]
- AI usage strategy: Codex를 감사와 구조 개선 제안 채널로 사용했다
- Evidence value: 감사 보고서와 개선 제안 근거
- Report section hint: AI 활용 전략 | 유지보수성
- Token note: exact unavailable estimate
- Follow-up: 운영 정본 V2 구현으로 연결

### S-GPT-001

- DateTime: 2026-04-06 / Web
- Phase: Contest Research
- Tool/Client: ChatGPT
- Model: GPT-5.4
- Goal: 대회 개요와 준비 로드맵의 큰 그림을 잡는다
- What changed: 대회 개요서 초안과 플레이북 방향 및 프롬프트 트래커 초기 구조가 만들어졌다
- Why it mattered: 이후 모든 운영 설계와 워크스페이스 구축의 출발점이 되었다
- Artifacts: [[바이브코딩공모전_공지]] | [[vibe_contest_master_playbook_v0_1]] | KEG_AI_Prompt_Tracker.xlsx
- AI usage strategy: 설계와 방향 설정을 Web AI에 먼저 맡기고 로컬 구현은 후속 에이전트로 넘겼다
- Evidence value: 대회 해석과 초기 전략의 기원 기록
- Report section hint: 기획 | AI 활용 전략 | 도구 선택 이유
- Token note: 정액제 환경이라 exact unavailable
- Follow-up: 후속 리서치와 구현 분업 검증

### S-OPS-001

- DateTime: 2026-04-06 / Desktop App
- Phase: Workspace Setup
- Tool/Client: Codex
- Model: GPT-5
- Goal: 공용 운영 정본 V2를 실제 파일 구조로 반영한다
- What changed: `.agent/system/` 골격과 계약 문서 및 정본 메모리와 맵 구조가 생겼다
- Why it mattered: 공용 운영 정본이 생기며 워크스페이스가 재현 가능한 시스템으로 바뀌었다
- Artifacts: [[workspace-contract]] | [[workspace-atlas]] | `.agent/system/`
- AI usage strategy: 구조 설계를 문서와 실제 파일 이동으로 동시에 반영했다
- Evidence value: 운영 정본화와 시스템 레이어 구축
- Report section hint: AI 활용 전략 | 유지보수성/재현성
- Token note: exact unavailable estimate
- Follow-up: 문제 리서치 세션에서도 같은 구조가 유효한지 검증

### S-OPS-002

- DateTime: 2026-04-06 / Desktop App
- Phase: Workspace Cleanup
- Tool/Client: Codex
- Model: GPT-5
- Goal: 루트 구조와 경로 정합성을 단순화한다
- What changed: 운영 파일이 `.agent/system/ops`로 이동하고 `.claude`가 최소 어댑터로 정리되었다
- Why it mattered: 루트 혼란이 줄고 공용 운영 자산 위치가 명확해졌다
- Artifacts: `.agent/system/ops/` | `.claude/` | `03_제품/`
- AI usage strategy: 정본과 어댑터를 분리하는 방향으로 정리했다
- Evidence value: 루트 최소화와 어댑터 단순화 기록
- Report section hint: 유지보수성 | 재현성
- Token note: exact unavailable estimate
- Follow-up: 실전 운용 검증으로 연결

### S-OPS-003

- DateTime: 2026-04-06 / Desktop App
- Phase: Workspace Cleanup
- Tool/Client: Codex
- Model: GPT-5
- Goal: 처음 보는 사용자 기준으로 memory/maps/evidence를 단순화한다
- What changed: 장기기억/일일기억과 workspace-atlas 및 핵심로그/분석자료/daily 3구역 구조가 생겼다
- Why it mattered: 학습 비용이 줄고 세션 종료 동기화 경로가 분명해졌다
- Artifacts: [[long-term-memory]] | [[daily-memory]] | [[workspace-atlas]]
- AI usage strategy: 복잡한 구조를 파일 수 축소와 sync 스킬로 함께 정리했다
- Evidence value: 초심자 친화 구조 개편 근거
- Report section hint: 워크플로우 | 유지보수성
- Token note: exact unavailable estimate
- Follow-up: workspace-sync 실전 적용 검증

### S-OPS-004

- DateTime: 2026-04-06 / Desktop App
- Phase: Workspace Setup
- Tool/Client: Codex
- Model: GPT-5
- Goal: GitHub 운영 전용 스킬을 추가한다
- What changed: `github-workflow` 스킬과 registry 연결이 추가되었다
- Why it mattered: GitHub 작업도 증빙 흐름과 같은 규칙 아래 관리되게 되었다
- Artifacts: `.agent/skills/github-workflow/SKILL.md` | registry
- AI usage strategy: commit/push/PR 흐름을 프로젝트 스킬로 표준화했다
- Evidence value: GitHub 운영 표준화 기록
- Report section hint: AI 활용 전략 | 운영 자동화
- Token note: exact unavailable estimate
- Follow-up: 실제 GitHub issue/commit 작업에서 검증

### S-OPS-005

- DateTime: 2026-04-06 / Desktop App
- Phase: Workspace Setup
- Tool/Client: Codex
- Model: GPT-5
- Goal: Obsidian-first 운영 기준을 정본 문서에 명시한다
- What changed: Obsidian workspace 스킬과 관련 규칙이 AGENTS와 계약 문서에 반영되었다
- Why it mattered: 이 저장소가 일반 markdown repo가 아니라 Obsidian vault라는 전제가 고정되었다
- Artifacts: `.agent/skills/obsidian-workspace/SKILL.md` | [[AGENTS]]
- AI usage strategy: vault 규칙과 스킬 사용 원칙을 함께 고정했다
- Evidence value: Obsidian-first 운영 기준의 정착
- Report section hint: 도구 선택 이유 | 워크플로우
- Token note: exact unavailable estimate
- Follow-up: 실제 note/MOC/base 작업에서 실전 적용

### S-OPS-006

- DateTime: 2026-04-06 / Desktop App
- Phase: Workspace Setup
- Tool/Client: Codex
- Model: GPT-5
- Goal: Claude runtime command layer를 얇게 설계한다
- What changed: `.claude/commands`와 command stack registry가 추가되었다
- Why it mattered: 런타임 접근성은 높이고 공용 정본 중복은 줄일 수 있게 되었다
- Artifacts: `.claude/commands/` | [[claude-command-stack]]
- AI usage strategy: entrypoint는 얇게 두고 실제 로직은 agents/skills를 재사용하게 설계했다
- Evidence value: command layer 설계와 재사용 전략
- Report section hint: 유지보수성 | 재현성
- Token note: exact unavailable estimate
- Follow-up: Claude runtime 실사용 검증

### S-OPS-007

- DateTime: 2026-04-06 / Desktop App
- Phase: Workspace Setup
- Tool/Client: Codex
- Model: GPT-5
- Goal: GitHub issue/project 운영 스킬을 분리한다
- What changed: issue/project 전용 스킬과 registry 연결이 추가되었다
- Why it mattered: GitHub 코드 흐름과 관리 흐름을 분리해 유지보수성이 좋아졌다
- Artifacts: `.agent/skills/github-issue-ops/` | `.agent/skills/github-project-ops/`
- AI usage strategy: 상위 workflow는 유지하고 하위 운영 스킬을 분리했다
- Evidence value: GitHub 운영 세분화 기록
- Report section hint: AI 활용 전략 | 운영 자동화
- Token note: exact unavailable estimate
- Follow-up: 실제 issue triage와 board 생성에서 검증

### S-OPS-008

- DateTime: 2026-04-06 / Desktop App
- Phase: Workspace Setup
- Tool/Client: Codex
- Model: GPT-5
- Goal: 증빙 입력을 단일 원장 체계로 전환한다
- What changed: `master-evidence-ledger.md`가 직접 입력 정본으로 재정의되고 관련 규칙이 바뀌었다
- Why it mattered: 기록 비용을 줄이고 AI 리포트 재료를 한 곳에 쌓을 수 있게 되었다
- Artifacts: [[master-evidence-ledger]] | [[memory-evidence-policy]]
- AI usage strategy: 입력 1개와 파생 N개 전략으로 기록 비용을 줄였다
- Evidence value: 로깅 전략 변화와 유지비 절감
- Report section hint: AI 활용 전략 | 토큰 절약 전략
- Token note: exact unavailable estimate
- Follow-up: 실제 세션 운영에서 체계 검증

### S-OPS-009

- DateTime: 2026-04-06 / Desktop App
- Phase: Workspace Setup
- Tool/Client: Codex
- Model: GPT-5
- Goal: MOC를 중앙화하고 도구 문서를 저장소 내부로 가져온다
- What changed: `_MOC/` 중앙화와 `_system/tools/`
- Why it mattered: `_system/team-setup/` 공간이 만들어졌다
- Artifacts: 다른 워크스페이스나 전역 환경에 덜 의존하는 포터블 구조가 되었다
- AI usage strategy: [[_MOC_HOME]] | [[_system/tools/README]] | team-computer-setup-guide.md
- Evidence value: 구조 변경은 정본 문서와 팀 가이드까지 함께 묶었다
- Report section hint: 포터블 환경과 도구 계층 정리
- Token note: 도구 선택 이유 | 재현성
- Follow-up: exact unavailable estimate

### S-PPLX-001

- DateTime: 2026-04-06 / Web
- Phase: Contest Research
- Tool/Client: Perplexity
- Model: Search+AI
- Goal: 기관 의도와 유사 대회 패턴을 리서치한다
- What changed: 기관 선호 포인트와 심사 문법을 추론할 재료를 모았다
- Why it mattered: 문제 정의를 기관 친화 문법으로 맞추는 기준이 생겼다
- Artifacts: [[기관_분석_및_심사_전략]] | [[계보_포지셔닝_분석]]
- AI usage strategy: Perplexity는 대규모 탐색과 출처 모음에만 쓰고 최종 판단은 별도 문서와 결합했다
- Evidence value: 기관 적합성과 심사 전략 근거
- Report section hint: 기획 | 문제 정의 근거 | AI 활용 전략
- Token note: 토큰 비공개라 conservative estimate
- Follow-up: 실제 문제 후보 평가 시 조사 재활용

## 2026-04-08

### S-EVID-015

- DateTime: 2026-04-08 / Desktop App
- Phase: Evidence Operations
- Tool/Client: Codex
- Model: GPT-5.4
- Goal: Codex 세션도 증빙 원장과 외부 AI 사용 집계에 포함되게 만든다
- What changed: Codex 토큰을 estimate로 기록하는 규칙이 실제 CSV와 원장에 반영되었다
- Why it mattered: Claude만 exact 집계되고 Codex가 누락되는 왜곡을 줄였다
- Artifacts: [[master-evidence-ledger]] | `external-ai-usage.csv`
- AI usage strategy: exact source가 없는 도구는 zero로 비우지 않고 보수 추정치로 누적했다
- Evidence value: 도구별 사용량 비교와 멀티 AI 분업 기록
- Report section hint: AI 활용 과정 | 통계
- Token note: exact unavailable and recorded as estimate
- Follow-up: nightly 집계 시 stats 재생성

### S-OPS-011

- DateTime: 2026-04-08 / Desktop App
- Phase: Workspace Operations
- Tool/Client: Codex
- Model: GPT-5
- Goal: 태그와 계층 규칙을 vault 전반에 일관되게 적용한다
- What changed: namespace 태그 체계와 `up` 속성 및 감사 스크립트와 템플릿이 정리되었다
- Why it mattered: 검색/필터/구조 복구가 안정화되었다
- Artifacts: [[tagging-system]] | `tag-audit.sh` | templates
- AI usage strategy: 규칙 문서와 스크립트와 실제 노트를 한 번에 맞췄다
- Evidence value: 정보 구조 정규화와 vault 유지보수 방식
- Report section hint: AI 활용 전략 | 유지보수성
- Token note: exact unavailable estimate
- Follow-up: 새 note 생성 기본값으로 동일 규칙 유지

### S-OPS-012

- DateTime: 2026-04-08 / Desktop App
- Phase: Evidence
- Tool/Client: Codex
- Model: GPT-5
- Goal: 대시보드와 계획/진행/데일리/메모리를 제출용으로 정렬한다
- What changed: 프로젝트 대시보드가 간트형 진행판으로 재설계되고 연계 문서가 보강되었다
- Why it mattered: 나중에 AI 리포트와 결과보고서에서 작업 흐름을 설명할 수 있게 되었다
- Artifacts: [[project-dashboard]] | [[PLAN]] | [[PROGRESS]] | [[2026-04-08]]
- AI usage strategy: PM 문서와 증빙 문서를 visible dashboard로 연결해 설명 가능성을 높였다
- Evidence value: 제출용 진행 가시화 레이어
- Report section hint: 워크플로우 | 프로젝트 관리 방식
- Token note: exact unavailable estimate
- Follow-up: 주제 확정 이후 제품 태스크도 같은 방식으로 누적

### S-OPS-014

- DateTime: 2026-04-08 / Desktop App
- Phase: Workspace Hardening
- Tool/Client: Codex
- Model: GPT-5.4
- Goal: 공개 저장소 push 전 secret/privacy 점검 절차를 고정한다
- What changed: pre-push safety gate와 관련 정책/스크립트가 추가되었다
- Why it mattered: 공개 저장소 운영에서 보안 점검이 구조보다 우선이라는 기준이 생겼다
- Artifacts: `pre-push-safety-check.sh` | `.gitignore`
- AI usage strategy: 정책 문서와 실행 스크립트와 ignore rule을 같이 둬서 누락을 줄였다
- Evidence value: 보안과 공개 저장소 운영 안전장치
- Report section hint: 운영 안전장치 | 재현성
- Token note: exact unavailable estimate
- Follow-up: 이후 push 전 표준 루틴으로 사용

### S-RES-013

- DateTime: 2026-04-08 / Desktop App
- Phase: Research Ops
- Tool/Client: Codex
- Model: GPT-5
- Goal: 리서치 작업 공간을 구축하고 NotebookLM을 통합한다
- What changed: 리서치 허브/플랜/프롬프트/로그와 통합 브리프가 만들어지고 NotebookLM 노트북이 생성되었다
- Why it mattered: 흩어진 리서치 결과를 MVP 판단용 합성 계층으로 묶을 수 있게 되었다
- Artifacts: `research-hub` | `research-plan-eduswarm-v0` | NotebookLM notebook
- AI usage strategy: 구조화는 Codex가 맡고 상위 비교 질문은 NotebookLM 합성 계층으로 넘겼다
- Evidence value: 리서치 운영 구조와 합성 도구 검증
- Report section hint: 문제 정의 근거 | AI 활용 전략
- Token note: Codex exact unavailable estimate and NotebookLM exact unavailable
- Follow-up: scorecard 반영과 최종 문제 압축으로 연결

### S-STRAT-010

- DateTime: 2026-04-08 / Desktop App
- Phase: Strategy
- Tool/Client: Codex
- Model: GPT-5
- Goal: Karpathy 스타일 LLM Wiki를 현재 워크스페이스에 삽입한다
- What changed: `06_LLM위키/` 레이어와 schema/index/log/overview가 생겼다
- Why it mattered: 리서치 지식을 채팅 로그가 아니라 지속 가능한 wiki layer에 누적할 수 있게 되었다
- Artifacts: [[karpathy-llm-wiki-adaptation]] | `06_LLM위키/`
- AI usage strategy: raw/wiki/schema 3층을 분리해 compounding knowledge 구조를 만들었다
- Evidence value: 지속 지식 시스템 설계
- Report section hint: AI 활용 전략 | 데이터 흐름 | 재현성
- Token note: exact unavailable estimate
- Follow-up: 기존 전략 문서 첫 ingest 실행

## 2026-04-09

### S-MTG-019

- DateTime: 2026-04-09 / Offline Meeting
- Phase: Product Alignment
- Tool/Client: Human Meeting
- Model:
- Goal: 승보님과 UI 및 핵심 컨셉을 공유하고 개발 착수 가능 여부를 정렬한다
- What changed: UI가 준비되어 이제 개발에 들어갈 수 있다는 공감대가 생겼고 핵심 컨셉이 `학원 데이터 자산화 + 쉬운 AI 에이전트 활용`으로 명확해졌다
- Why it mattered: 소규모 학원 타깃과 로컬 우선 오픈소스 전략을 제품 베팅으로 더 분명하게 합의했다
- Artifacts: UI 시안 | 기획 문서 | 모델링 결과
- AI usage strategy: 사람 간 미팅에서 제품 가설을 압축하고 이후 구현 기준선을 확정했다
- Evidence value: 핵심 컨셉 합의와 타깃/배포 철학 정렬
- Report section hint: 제품 정의 근거 | 핵심 컨셉 | 의사결정
- Token note: no AI usage in this session
- Follow-up: 다음 단계는 UI 기준으로 실제 개발 착수

### S-OPS-017

- DateTime: 2026-04-09 / Desktop App
- Phase: Workspace Sync
- Tool/Client: Codex
- Model: GPT-5.4
- Goal: 운영 문서와 메모리와 AI 사용 기록을 한 번 더 최신 상태로 동기화한다
- What changed: 반복 요청 기준으로 운영 정합성을 다시 맞추고 intake/dispatch/usage stats를 재실행했다
- Why it mattered: 다음 에이전트가 읽는 운영 상태와 통계가 더 최신화되었다
- Artifacts: [[PLAN]] | [[PROGRESS]] | [[daily-memory]] | [[ai-usage-stats]]
- AI usage strategy: Codex를 운영 동기화와 증빙 재생성 루틴 검증에 사용했다
- Evidence value: 운영 루틴 반복 가능성 검증
- Report section hint: 워크플로우 | AI 활용 전략 | 유지보수성
- Token note: exact unavailable estimate
- Follow-up: nightly dispatch와 stats 재집계를 같은 패턴으로 반복 유지

### S-PROD-018

- DateTime: 2026-04-09 / Desktop App
- Phase: Product Learning
- Tool/Client: Codex
- Model: GPT-5.4
- Goal: `03_제품/hagent-os` 기획 문서를 수정 없이 읽고 현재 제품 방향을 학습한다
- What changed: HagentOS의 현재 제품 방향이 학원 운영자 민원·예외 처리 OS와 board-first AI 팀과 k-skill registry와 통합 스케줄러 축으로 정리되어 있음을 제품 정본 관점에서 재확인했다
- Why it mattered: 이후 구현과 피드백이 기존 전략 메모가 아니라 실제 제품 문서 정본을 기준으로 이루어질 수 있게 되었다
- Artifacts: `03_제품/hagent-os/README.md` | `00_vision/` | `01_strategy/` | `02_product/`
- AI usage strategy: Codex는 문서를 수정하지 않고 제품 방향을 읽어 현재 설계의 중심축과 미정 영역만 학습했다
- Evidence value: 제품 정본 학습과 방향 정합성 확보
- Report section hint: 제품 정의 근거 | 워크플로우 | AI 활용 전략
- Token note: exact unavailable estimate
- Follow-up: 향후 구현/비평/리팩터링은 hagent-os 문서군을 기준으로 진행

### S-STRAT-016

- DateTime: 2026-04-09 / Desktop App
- Phase: Reference Analysis
- Tool/Client: Codex
- Model: GPT-5.4
- Goal: `paperclip-master` 실제 코드 기준으로 분석 문서를 보강하고 운영 메모리를 최신화한다
- What changed: `paperclip-analysis` 문서가 개념 메모에서 repo-grounded 분석으로 바뀌고 운영 문서와 메모리도 현재 상태 기준으로 정렬되었다
- Why it mattered: reference 프로그램을 chat이 아니라 control plane으로 이해하게 되면서 향후 제품 정의의 기준점이 명확해졌다
- Artifacts: `02_전략/paperclip-analysis/` | [[PLAN]] | [[PROGRESS]] | [[daily-memory]]
- AI usage strategy: Codex는 로컬 repo 해체와 전략/운영 문서 동기화를 한 세션 안에서 연결했다
- Evidence value: reference 분석을 실제 제품 방향 입력으로 승격한 기록
- Report section hint: 문제 정의 근거 | 워크플로우 | AI 활용 전략
- Token note: exact unavailable estimate
- Follow-up: 다음으로 problem-definition-source와 scorecard에 반영

## 2026-04-10

### S-OPS-020

- DateTime: 2026-04-10 / Desktop App
- Phase: Workspace Sync
- Tool/Client: Codex
- Model: GPT-5.4
- Goal: Day 5 기준 운영 문서와 증빙 정본을 다시 동기화하고 구현 전 문서 충돌을 기록한다
- What changed: Day 5 daily와 운영 문서가 최신화됐고 구현 전에 잠가야 할 블로커 4개가 문서로 압축되었다
- Why it mattered: 다음 구현 세션이 모바일 탭바와 앱 셸과 폰트와 브랜드 claim 충돌을 모른 채 진행되는 위험을 줄였다
- Artifacts: [[PLAN]] | [[PROGRESS]] | [[project-dashboard]] | [[daily-memory]] | [[2026-04-10]]
- AI usage strategy: Codex를 운영 문서 동기화와 design review findings 압축에 사용했다
- Evidence value: 운영 상태 최신화와 구현 전 기준선 기록
- Report section hint: 워크플로우 | AI 활용 전략 | 의사결정
- Token note: exact unavailable estimate
- Follow-up: dispatch와 usage stats 재생성

### S-DEV-021

- DateTime: 2026-04-10 / CLI
- Phase: Pre-Dev Docs
- Tool/Client: Claude Code
- Model: Opus 4.6
- Goal: SPEC/PLAN/PROGRESS 기술 스택 전체 교정 (Next.js → React 19 + Vite + Express v5 + embedded-postgres)
- What changed: 3개 운영 문서의 기술 스택 레퍼런스가 실제 확정 스택으로 전면 교체됐다. SPEC.md가 정본으로 지정됐다.
- Why it mattered: 57개 기획 문서가 Next.js 기준으로 쓰여 있어 구현 전 정렬이 필수였다. SPEC.md 단일 진실 원본 전략으로 57개 파일 수정 없이 해결했다.
- Artifacts: `03_제품/SPEC.md` | `03_제품/PLAN.md` | `03_제품/PROGRESS.md`
- AI usage strategy: Opus를 기술 결정 근거 문서화와 스택 교정에 사용했다
- Evidence value: 구현 기준선 확정과 스택 변경 근거 기록
- Report section hint: 기술적합성 | AI 활용 전략 | 의사결정
- Token note: exact token source exists in Claude JSONL (estimate ~60k)
- Follow-up: Paperclip 엔진 관계 확립으로 연결

### S-DEV-022

- DateTime: 2026-04-10 / Desktop App
- Phase: Architecture Review
- Tool/Client: Codex
- Model: GPT-5.4
- Goal: 모델링 다이어그램 6종에 리뷰 포인트 6건 반영 (Must 범위 복원, approval level 0-4 정합화, MVP/확장 연동 시각 분리)
- What changed: ERD, System Context, Orchestrator Sequence, Demo Flow, Approval State, IA Screen Map 6종이 MVP 구현 기준으로 정렬됐다
- Why it mattered: 다이어그램이 기획 문서와 실제 구현 계획의 시각적 정본이 되어 에이전트 간 공유 기준선이 명확해졌다
- Artifacts: `03_제품/hagent-os/` 다이어그램 6종
- AI usage strategy: Codex를 다이어그램 리뷰와 구조 정합화에 사용했다
- Evidence value: 아키텍처 설계 근거와 MVP 범위 시각화
- Report section hint: 기술적합성 | 창의성 | AI 활용 전략
- Token note: exact unavailable estimate (~15k)
- Follow-up: 구현 시 다이어그램 정본 기준으로 사용

### S-DEV-023

- DateTime: 2026-04-10 / CLI
- Phase: Pre-Dev Docs
- Tool/Client: Claude Code
- Model: Opus 4.6
- Goal: SPEC/PLAN에 Paperclip 엔진 관계 확립 — 매핑 테이블, 10 패턴, 5 차별점 문서화
- What changed: HagentOS가 Paperclip 패턴을 어떻게 흡수하고 어디서 차별화하는지 SPEC.md에 명시됐다
- Why it mattered: 구현 에이전트들이 Paperclip 코드를 참조할 때 무엇을 복사하고 무엇을 바꿀지 판단 기준이 생겼다
- Artifacts: `03_제품/SPEC.md` (Paperclip 매핑 섹션) | `03_제품/PLAN.md`
- AI usage strategy: Opus를 참조 코드와 구현 목표 사이의 관계 명문화에 사용했다
- Evidence value: 레퍼런스 기반 설계 전략의 근거 기록
- Report section hint: 창의성 | 기술적합성 | AI 활용 전략
- Token note: exact token source exists in Claude JSONL (estimate ~70k)
- Follow-up: Phase 1 병렬 빌드로 연결

### S-DEV-024

- DateTime: 2026-04-10 / CLI
- Phase: Pre-Dev Docs
- Tool/Client: Claude Code
- Model: Opus 4.6
- Goal: Paperclip 오픈소스 코드 전체 구조 분석 (45페이지, 108 컴포넌트, 63 테이블, ~79K LOC) + PLAN v2 작성
- What changed: 분석 결과를 PLAN v2에 반영해 야심찬 버전(15페이지 + 20테이블 + 에이전트 3개 + Plan B)이 완성됐다
- Why it mattered: 구현 에이전트가 Paperclip 코드를 직접 참조할 수 있는 구체적 파일 인덱스와 우선순위 기준이 생겼다
- Artifacts: `03_제품/PLAN_v2.md` | `02_전략/paperclip-analysis/08_PAPERCLIP-CLONE-SPEC.md`
- AI usage strategy: Opus를 대형 코드베이스 해체 분석과 구현 계획 역설계에 사용했다
- Evidence value: 레퍼런스 분석 심화와 구현 청사진 완성
- Report section hint: 기술적합성 | AI 활용 전략 | 완성도
- Token note: exact token source exists in Claude JSONL (estimate ~80k)
- Follow-up: Phase 1 병렬 빌드 3인 팀 착수

### S-DEV-025

- DateTime: 2026-04-10 / CLI
- Phase: Phase 1 Build
- Tool/Client: Claude Code
- Model: Sonnet 4.6 ×3 (병렬)
- Goal: Phase 1 병렬 빌드 — DB 스키마 20테이블 + Express 서버 8 라우트 + UI 4존 레이아웃 15페이지
- What changed: pnpm 모노레포 + Drizzle ORM 스키마 + Express v5 서버 + React 19 + Vite + 탄자니아 영어학원 시드가 동시에 생성됐다
- Why it mattered: 3개 독립 도메인(DB/서버/UI)을 병렬 에이전트로 동시 착수해 단일 에이전트 대비 3배 속도로 스켈레톤을 완성했다
- Artifacts: `03_제품/app/packages/db/` | `03_제품/app/server/` | `03_제품/app/ui/`
- AI usage strategy: Sonnet 3개를 DB/서버/UI로 역할 분리해 충돌 없는 병렬 빌드 패턴 검증
- Evidence value: 멀티 에이전트 병렬 개발 전략 실증
- Report section hint: AI 활용 | 기술적합성 | 완성도
- Token note: exact token source exists in Claude JSONL (estimate ~120k total, 3 sessions)
- Follow-up: Codex 코드 리뷰로 연결

### S-DEV-026

- DateTime: 2026-04-10 / Desktop App
- Phase: Code Review
- Tool/Client: Codex
- Model: GPT-5.4
- Goal: Phase 1 전체 코드 리뷰 — CRITICAL 1, HIGH 10, MEDIUM 8, TOTAL 20건
- What changed: DB FK 누락, 서버 라우트 부재, API key 가드 누락, 시드 멱등성 문제 등 20건의 이슈가 식별됐다
- Why it mattered: 구현 직후 독립 AI 리뷰어가 품질 게이트 역할을 해 Claude 에이전트들이 놓친 구조적 문제를 포착했다
- Artifacts: Codex 리뷰 리포트 (PROGRESS.md 반영)
- AI usage strategy: Codex를 Claude 구현 결과의 독립 비평자로 사용 — 동일 모델 편향 방지
- Evidence value: 멀티 AI 협업에서 역할 분리와 품질 게이트 패턴
- Report section hint: AI 활용 전략 | 기술적합성 | 팀워크
- Token note: exact unavailable estimate (~20k)
- Follow-up: 20건 이슈 수정 세션으로 연결

### S-DEV-027

- DateTime: 2026-04-10 / CLI
- Phase: Phase 1 Fix
- Tool/Client: Claude Code
- Model: Sonnet 4.6 ×4 (병렬)
- Goal: Codex 리뷰 20건 반영 — DB FK 제약 추가, 서버 POST/PATCH 라우트, 시드 교체, UI API 연결
- What changed: cases→opsGroups/students FK, agentTypeEnum 확장, approvals/:id/decide 엔드포인트, Claude API key 가드, api/runs.ts 추가
- Why it mattered: 리뷰에서 발견된 구조적 문제들이 즉각 수정돼 Phase 2로 진입할 수 있는 품질 기준이 확보됐다
- Artifacts: `packages/db/src/schema.ts` | `server/src/routes/` | `packages/db/src/seed.ts` | `ui/src/api/`
- AI usage strategy: 리뷰 결과를 역할별로 4개 에이전트에 분배해 병렬 수정
- Evidence value: 리뷰→수정 사이클의 속도와 완성도 기록
- Report section hint: AI 활용 전략 | 기술적합성
- Token note: exact token source exists in Claude JSONL (estimate ~140k total, 4 sessions)
- Follow-up: v0.1.0 커밋

### S-DEV-028

- DateTime: 2026-04-10 / CLI
- Phase: Phase 1 Complete
- Tool/Client: Claude Code
- Model: Sonnet 4.6 ×4 (병렬)
- Goal: Phase 1 마무리 — Mock Claude API, 칸반, OrgChart, 온보딩 위자드, 설정 페이지
- What changed: Mock 에이전트 응답(1.5초 딜레이), 칸반 뷰, OrgChart, 온보딩 4스텝, Settings 다크모드 토글이 완성됐다
- Why it mattered: Claude API 키 없는 환경에서도 전체 에이전트 플로우 시연이 가능해졌다 — 데모 리스크 대폭 감소
- Artifacts: `ui/src/pages/` (KanbanBoard, OrgChartPage, OnboardingPage, SettingsPage 등)
- AI usage strategy: 각 에이전트에 독립적 UI 컴포넌트 할당으로 충돌 없는 병렬 작업
- Evidence value: Mock 모드 패턴과 병렬 UI 빌드 실증
- Report section hint: 완성도 | AI 활용 전략
- Token note: exact token source exists in Claude JSONL (estimate ~160k total, 4 sessions)
- Follow-up: v0.1.0 커밋 + 갭 분석

### S-DEV-029

- DateTime: 2026-04-10 / CLI
- Phase: v0.1.0 Release
- Tool/Client: Claude Code
- Model: Opus 4.6
- Goal: v0.1.0 커밋 (4f0fa38, 179파일) + 갭 분석으로 v0.2.0 작업 목록 도출
- What changed: v0.1.0이 커밋됐고 누락된 21개 화면과 40+ 컴포넌트와 15 API 라우트 목록이 작성됐다
- Why it mattered: 릴리스 기준점이 생기고 다음 병렬 빌드 배치의 명확한 입력이 만들어졌다
- Artifacts: 커밋 4f0fa38 (179파일, 22,765줄) | v0.2.0 갭 분석 문서
- AI usage strategy: Opus를 릴리스 판단과 갭 분석 두 역할로 동시 사용
- Evidence value: 버전 기준점과 다음 배치 입력 문서
- Report section hint: 완성도 | AI 활용 전략 | 팀워크
- Token note: exact token source exists in Claude JSONL (estimate ~50k)
- Follow-up: v0.2.0 갭 채우기 4인 병렬

### S-DEV-030

- DateTime: 2026-04-10 / CLI
- Phase: v0.2.0 Build
- Tool/Client: Claude Code
- Model: Sonnet 4.6 ×4 (병렬)
- Goal: v0.2.0 갭 채우기 — Documents 워크스페이스, Routines, Goals, CommandPalette, SSE 클라이언트, 채팅 스레드
- What changed: 21페이지, 40+ 컴포넌트, 15 API 라우트, ~7,000 LOC 완성. 커밋 f699e0b + 5e91989
- Why it mattered: 전체 화면이 빈 스텁에서 실제 데이터 표시로 전환됐고 E2E mock 플로우가 돌아가기 시작했다
- Artifacts: 커밋 f699e0b, 5e91989 | `ui/src/pages/` 전체 | `server/src/routes/` 확장
- AI usage strategy: 갭 분석 결과를 4개 배치로 나눠 Sonnet 4개 병렬 실행 — 4시간 작업을 1시간으로 단축
- Evidence value: v0.2.0 완성과 병렬 에이전트 개발 효율 실증
- Report section hint: AI 활용 | 완성도 | 기술적합성
- Token note: exact token source exists in Claude JSONL (estimate ~200k total, 4 sessions)
- Follow-up: Paperclip 라이브 피드백 수집 후 v0.3.0 계획

### S-DEV-031

- DateTime: 2026-04-10 / CLI
- Phase: v0.3.0 Round 1
- Tool/Client: Claude Code
- Model: Sonnet 4.6 ×4 (병렬)
- Goal: Paperclip 라이브 피드백 12항 중 Round 1 (A1+A2, A3+A4, B1+B2, C1+C2) 동시 구현
- What changed: 칸반 DnD + 에이전트 자동 wakeup, OrgChart 클릭/인간직원/아이콘, shadcn Switch 설치, 인박스 실데이터+인라인 승인, 프로젝트 페이지, 에이전트 메모리 시스템(SOUL+일별노트), 실행 트랜스크립트 펼침
- Why it mattered: 실제 Paperclip 운영 경험에서 나온 피드백이 제품에 즉각 반영됐다 — "보이기만 하는" 수준에서 "실제로 작동하는" 수준으로 전환
- Artifacts: `KanbanBoard.tsx` | `OrgChartPage.tsx` | `ui/switch.tsx` | `InboxPage.tsx` | `ProjectsPage.tsx` | `AgentDetailPage.tsx`
- AI usage strategy: 피드백 12항을 4개 배치(A1+A2/A3+A4/B1+B2/C1+C2)로 묶어 충돌 없이 4 Sonnet 병렬 실행
- Evidence value: 라이브 운영 피드백→구현 사이클 속도와 멀티에이전트 패턴
- Report section hint: AI 활용 | 창의성 | 완성도
- Token note: exact token source exists in Claude JSONL (estimate ~180k total, 4 sessions)
- Follow-up: Round 2 나머지 항목

### S-DEV-032

- DateTime: 2026-04-10 / CLI
- Phase: v0.3.0 Round 2
- Tool/Client: Claude Code
- Model: Sonnet 4.6
- Goal: v0.3.0 Round 2 — 지식베이스 검색+AI 생성 배지, CasesPage FilterBar, Sidebar 학생관리 nav, EmptyState 개선
- What changed: DocumentsPage에 검색 입력과 AI 생성 배지 추가, 케이스 필터바 통합, GraduationCap nav item, ProjectsPage EmptyState 개선
- Why it mattered: UI 완성도와 탐색성이 높아졌고 데모에서 "검색이 안 된다"는 약점이 제거됐다
- Artifacts: `DocumentsPage.tsx` | `CasesPage.tsx` | `Sidebar.tsx` | `ProjectsPage.tsx`
- AI usage strategy: 단일 Sonnet으로 UI 폴리시 4항을 한 세션에 묶어 처리
- Evidence value: UI 완성도 향상과 단일 에이전트 폴리시 배치 패턴
- Report section hint: 완성도 | AI 활용
- Token note: exact token source exists in Claude JSONL (estimate ~40k)
- Follow-up: Phase 3 폴리시 또는 Phase 4 배포 결정

### S-OPS-033

- DateTime: 2026-04-10 / CLI
- Phase: Ops Sync
- Tool/Client: Claude Code
- Model: Sonnet 4.6
- Goal: v0.3.0 플랜 워크스페이스 배치, PROGRESS.md 현재 상태 업데이트, 개발 서버 실행 확인
- What changed: `~/.claude/plans/polished-honking-hinton.md`가 `03_제품/app/docs/superpowers/plans/2026-04-10-hagent-os-v0.3.0.md`로 복사됐다. PROGRESS.md 현재 상태가 v0.2.0 완료/v0.3.0 착수로 업데이트됐다. Express 3100 + Vite 5173 서버 모두 동작 확인.
- Why it mattered: 다른 세션의 플랜이 워크스페이스에 정착해 멀티에이전트 협업의 단일 진실 원본이 됐다
- Artifacts: `03_제품/app/docs/superpowers/plans/2026-04-10-hagent-os-v0.3.0.md` | `03_제품/PROGRESS.md`
- AI usage strategy: Sonnet을 세션 간 플랜 이식과 운영 동기화에 사용
- Evidence value: 멀티 세션/멀티 에이전트 협업 플로우 기록
- Report section hint: AI 활용 전략 | 팀워크 | 워크플로우
- Token note: exact token source exists in Claude JSONL (estimate ~15k)
- Follow-up: Phase 3 폴리시 또는 Phase 4 배포 착수

### S-OPS-034

- DateTime: 2026-04-10 / Desktop App
- Phase: Ops Sync
- Tool/Client: Codex
- Model: GPT-5
- Goal: 프로젝트 대시보드와 운영 문서를 실제 앱 상태 기준으로 다시 맞춘다
- What changed: `project-dashboard`, `PLAN`, `PROGRESS`, `daily-memory`, `2026-04-10` daily note, `03_제품/app/README.md`가 현재 기준으로 갱신되었고 `localhost:5173` 비리스닝 상태가 명시되었다
- Why it mattered: “앱 없음”과 “앱 실행 중”처럼 상충하는 서술을 제거해 제출용 진행판의 신뢰도를 높였다
- Artifacts: [[project-dashboard]] | [[.agent/system/ops/PLAN]] | [[.agent/system/ops/PROGRESS]] | [[2026-04-10]] | `03_제품/app/README.md`
- AI usage strategy: 로컬 포트 응답과 실제 디렉토리 구조를 먼저 확인한 뒤 문서를 좁게 수정했다
- Evidence value: 상태 정합성 점검과 운영 문서 갱신 기록
- Report section hint: 워크플로우 | 증빙 관리 | 유지보수성
- Token note: exact unavailable estimate
- Follow-up: 실제 UI dev server 기동 확인 후 URL 기반 데모 점검으로 연결
