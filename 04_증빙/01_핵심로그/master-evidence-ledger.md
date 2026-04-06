---
tags:
  - 증빙
  - ledger
  - ai-report
date: 2026-04-06
aliases:
  - master-evidence-ledger
  - 증빙원장
  - AI리포트원장
---
# Master Evidence Ledger

> 이 파일은 `04_증빙`의 직접 입력 정본이다.
> 앞으로 사람이 직접 기록하는 기본 위치는 이 note 하나뿐이다.
> 목적은 [[20260406_③_2026_KIT_바이브코딩_공모전_팀명_개인은_이름_AI리포트]]의 품질을 높이는 재료 축적이다.

## 원칙

- 기록 단위는 `세션 단위`다.
- 내부 참조는 기본적으로 `[[wikilink]]`를 사용한다.
- 중요한 결정만 [[decision-log]]로 승격한다.
- 재사용 가치가 검증된 프롬프트만 [[prompt-catalog]]로 승격한다.
- 통계는 나중에 이 원장을 바탕으로 [[ai-usage-stats]]로 파생한다.
- 기존 [[ai-usage-log]], [[session-log]], [[evolution-log]]는 보존용 `archive/reference`다.

## 세션 블록 템플릿

```markdown
### S-XXX

- DateTime:
- Phase:
- Tool/Client:
- Model:
- Goal:
- What changed:
- Why it mattered:
- Artifacts:
- AI usage strategy:
- Evidence value:
- Report section hint:
- Token note:
- Follow-up:
```

## 2026-04-06

### S-GPT-001

- DateTime: 2026-04-06 / Web
- Phase: Contest Research, Win Strategy
- Tool/Client: ChatGPT Web
- Model: GPT-5.4
- Goal: 대회 개요를 빠르게 파악하고 준비 로드맵의 큰 그림을 잡는다.
- What changed: 공식 페이지와 공지/홍보자료를 바탕으로 대회 개요 초안, 준비 단계 분해, 플레이북 초안, 프롬프트 트래커 초기 구조가 만들어졌다.
- Why it mattered: 이후 모든 운영 설계와 워크스페이스 구축의 출발점이 되었다.
- Artifacts: [[바이브코딩공모전_공지]], [[vibe_contest_master_playbook_v0_1]], `KEG_AI_Prompt_Tracker.xlsx`, [[prompt-catalog]]
- AI usage strategy: ChatGPT Web은 설계/기획 전용으로 사용하고, 구조화와 방향 설정을 먼저 맡겼다.
- Evidence value: 대회 해석, 초기 전략, 도구 분업의 기원 기록
- Report section hint: `1. 기획`, `AI 활용 전략`, `도구/모델 선택 이유`
- Token note: 정액제 환경이라 정확 토큰은 없고 추정치만 가능
- Follow-up: 이후 세부 리서치와 구현은 다른 도구로 분담

### S-PPLX-001

- DateTime: 2026-04-06 / Web
- Phase: Contest Research
- Tool/Client: Perplexity
- Model: Search+AI
- Goal: 대회의 주최·후원 기관 의도, 전신 대회와 유사 대회 맥락, 실제로 먹히는 전략을 조사한다.
- What changed: 기관 분석과 계보/포지셔닝 분석을 위한 조사 질문이 정리되었고, 심사 문법과 기관 선호 포인트를 추론할 수 있는 재료가 확보되었다.
- Why it mattered: 문제 정의를 “기관이 좋아할 문법”으로 맞추는 기준이 생겼다.
- Artifacts: [[prompt-catalog]], [[tool-log]], `P-005`, `P-006`
- AI usage strategy: Perplexity는 방대한 자료 탐색과 출처 수집 전용으로 사용하고, 최종 판단은 다른 문서와 결합한다.
- Evidence value: 기관 적합성, 유사 대회 패턴, 전략 근거
- Report section hint: `1. 기획`, `AI 활용 전략`, `데이터 흐름`, `문제 정의 근거`
- Token note: 토큰 비공개, 세션 기준 추정만 가능
- Follow-up: 실제 문제 후보 평가 시 이 조사 재료를 다시 연결

### S-OPS-MIGRATED-001

- DateTime: 2026-04-06 / CLI + Desktop
- Phase: Workspace Setup
- Tool/Client: Claude Code, Codex
- Model: Opus 4.6, GPT-5
- Goal: 대회용 AI-native 운영 공간을 만들고, 에이전트/규칙/증빙/Obsidian/GitHub 구조를 정리한다.
- What changed: `.agent/system` 공용 정본, Obsidian-first 규칙, `.claude/commands`, GitHub 운영 스킬, 증빙 구조 개편, 감사 보고서와 평가 문서가 만들어졌다.
- Why it mattered: 이 프로젝트가 단순 repo가 아니라 “재현 가능한 AI 협업 시스템”이 되었다.
- Artifacts: [[.agent/AGENTS|AGENTS]], [[workspace-contract]], [[memory-evidence-policy]], [[workspace-atlas]], [[_system/dashboard/project-dashboard|project-dashboard]], [[.agent/skills/obsidian-workspace/SKILL|obsidian-workspace]], [[.agent/skills/github-workflow/SKILL|github-workflow]], [[claude-command-stack]], [[ai-native-workspace-audit-report]], [[codex-workspace-evaluation]]
- AI usage strategy: Claude Code는 구축/자동화, Codex는 평가/정리/감사로 분업했다.
- Evidence value: 운영 시스템 설계, 에이전트 구성 방식, 재현성/유지보수성 전략
- Report section hint: `AI 활용 전략`, `에이전트 구성 방식`, `유지보수성/재현성 전략`
- Token note: 일부는 세션 단위 정확 수치가 없고 추정 또는 별도 집계 문서 참조
- Follow-up: 실전 문제 리서치와 제품 개발에서도 같은 분업이 유효한지 검증

### S-OPS-008

- DateTime: 2026-04-06 / Desktop
- Phase: Workspace Setup
- Tool/Client: Codex
- Model: GPT-5
- Goal: 증빙 입력 마찰을 줄이기 위해 단일 원장 체계로 전환한다.
- What changed: [[master-evidence-ledger]]를 직접 입력 정본으로 만들고, 기존 핵심 로그는 `archive/reference` 또는 `승격 전용` 역할로 낮췄다. 공용 규칙과 command/skill 문구도 새 체계에 맞게 조정했다.
- Why it mattered: 앞으로 세션마다 여러 파일을 동시에 수정하지 않아도 되고, AI 리포트 재료를 한 곳에 누적할 수 있다.
- Artifacts: [[master-evidence-ledger]], [[_04_증빙_MOC]], [[workspace-contract]], [[memory-evidence-policy]], [[.agent/rules/logging|logging]], [[.agent/skills/workspace-sync/SKILL|workspace-sync]], [[.agent/skills/obsidian-workspace/SKILL|obsidian-workspace]]
- AI usage strategy: 기록 비용을 줄이기 위해 “입력 1개, 파생 N개” 전략으로 전환했다.
- Evidence value: 로깅 전략 변화, 유지비 절감, 리포트 중심 운영 방식
- Report section hint: `AI 활용 전략`, `토큰 낭비 최소화 전략`, `유지보수성/재현성 전략`
- Token note: 구조 개편 세션, 정확 토큰은 미집계
- Follow-up: 다음 실제 세션부터 이 원장만 직접 사용하고, 파생 문서 필요성을 다시 검증

### S-OPS-009

- DateTime: 2026-04-06 / Desktop
- Phase: Workspace Setup, Tool Stack
- Tool/Client: Codex
- Model: GPT-5
- Goal: MOC를 중앙화하고, 이 저장소 안에 독립형 도구 관리 공간을 만든다.
- What changed: 섹션 MOC를 `_MOC/`로 이동했고, `_system/tools/`와 `_system/team-setup/`를 새로 만들었다. Obsidian, Excalidraw MCP, Figma MCP, NotebookLM CLI의 정본 문서와 팀원 셋업 가이드를 저장소 내부로 끌어들였다.
- Why it mattered: 더 이상 전역 환경이나 다른 워크스페이스 문서에 의존하지 않고, 이 저장소만으로 MOC/도구/셋업 기준을 재현할 수 있게 되었다.
- Artifacts: [[_MOC_HOME]], [[_system_tools_MOC]], [[_system/tools/README|Tools Home]], [[_system/tools/portable-tool-stack|Portable Tool Stack]], [[_system/tools/obsidian/obsidian-cli-and-skills|Obsidian CLI + Skills]], [[_system/tools/excalidraw/excalidraw-mcp|Excalidraw MCP]], [[_system/tools/figma/figma|Figma MCP]], [[_system/tools/nlm/nlm|NotebookLM CLI]], [[_system/team-setup/team-computer-setup-guide|팀 컴퓨터 환경 적용 가이드]]
- AI usage strategy: 구조 변경은 먼저 저장소 정본 문서로 고정하고, 실제 런타임 연결은 팀 가이드와 bootstrap으로 분리했다.
- Evidence value: 포터블 환경 구축, 도구 계층 정리, 팀 재현성 강화
- Report section hint: `AI 활용 전략`, `도구/모델 선택 이유`, `데이터 흐름`, `유지보수성/재현성 전략`
- Token note: `obsidian` CLI는 이 세션에서 응답 검증 실패, 나머지는 문서/구조 기준으로 정리
- Follow-up: Obsidian App이 열린 상태에서 `obsidian` CLI 실동작 검증, `uv sync --project _system/tools` 기반 NLM 설치 검증
