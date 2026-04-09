# 2026 제1회 KEG 바이브코딩 콘테스트 Workspace

AI-native 대회 운영 워크스페이스입니다.  
이 저장소의 목적은 `제품 코드`만 보관하는 것이 아니라, 대회 준비부터 리서치, 의사결정, AI 활용 증빙, 제출물 정리까지 한 공간에서 재현 가능하게 관리하는 것입니다.

## 현재 상태

- 단계: 문제 정의 수렴 / 전략 구조 정리 / 제품 설계 확장 중
- 목표: `EduPaperclip` 방향을 기준으로 문제 정의와 사용자 축을 닫고, 제품 기획과 구현 준비를 연결
- 특징:
  - Obsidian-first vault
  - `_MOC/` 중앙 MOC 구조
  - `_system/` 아래 가시 대시보드 / 도구 정본 / 팀 셋업 가이드
  - `04_증빙/01_핵심로그/master-evidence-ledger.md` 단일 증빙 원장

## Start Here

- [Vault Home](00%20HOME.md)
- [Workspace Visual Map](_system/team-setup/workspace-visual-map.md)
- [Project Dashboard](_system/dashboard/project-dashboard.md)
- [MOC Home](_MOC/_MOC_HOME.md)
- [Team Computer Setup Guide](_system/team-setup/team-computer-setup-guide.md)

## Repo Map

```text
.
├── 00 HOME.md
├── _MOC/                         # 중앙 MOC 공간
├── _system/
│   ├── dashboard/                # 사용자/AI 공용 대시보드
│   ├── team-setup/               # 팀원 컴퓨터 적용 가이드
│   └── tools/                    # 도구 정본, bootstrap, runtime 규칙
├── 01_대회정보/                   # 규칙, 일정, 심사
├── 02_전략/                       # 전략 루트
│   ├── 00_foundation/            # 대회 이해, 계보, 심사 전략
│   ├── 01_problem-framing/       # 문제 정의 전 기준 문서와 후보 비교
│   ├── 02_prompts/               # Claude, NotebookLM, Paperclip 분석 프롬프트
│   ├── 03_decisions/             # 베팅, 범위, 데모, 리스크, 의사결정
│   ├── paperclip-analysis/       # reference 프로그램 해체 분석
│   ├── research-results/         # 세부 리서치 정본
│   ├── tasks/                    # 전략 실행 태스크
│   └── archive/                  # 보관 문서와 웹 캡처
├── 03_제품/                       # 제품 정의, app, tests
├── 04_증빙/                       # AI 리포트 재료 정본
├── 05_제출/                       # 최종 제출물
├── 06_LLM위키/                    # AI 지식 베이스
├── .agent/                       # AI 운영 정본
└── .claude/                      # Claude 런타임 어댑터
```

## Key Documents

- [Evidence Ledger](04_%EC%A6%9D%EB%B9%99/01_%ED%95%B5%EC%8B%AC%EB%A1%9C%EA%B7%B8/master-evidence-ledger.md)
- [Workspace Contract](.agent/system/contracts/workspace-contract.md)
- [Workspace Atlas](.agent/system/maps/workspace-atlas.md)
- [Portable Tool Stack](_system/tools/portable-tool-stack.md)
- [AI Report Draft](05_%EC%A0%9C%EC%B6%9C/ai-report-draft.md)

## Tool Stack

- Obsidian App + CLI
- Excalidraw MCP
- Figma MCP
- NotebookLM CLI (`nlm`)
- Claude Code / Codex / ChatGPT Web / Perplexity

정본 문서:

- [Tools Home](_system/tools/README.md)
- [Obsidian CLI + Skills](_system/tools/obsidian/obsidian-cli-and-skills.md)
- [Excalidraw MCP](_system/tools/excalidraw/excalidraw-mcp.md)
- [Figma MCP](_system/tools/figma/figma.md)
- [NotebookLM CLI](_system/tools/nlm/nlm.md)

## Figma

- [Developer Link](https://www.figma.com/design/EAIDgsEJScEZZgwADHiNLQ/%ED%94%BC%EA%B7%B8%EB%A7%88%E3%85%A3?node-id=0-1&m=dev)
- [Edit Link](https://www.figma.com/design/EAIDgsEJScEZZgwADHiNLQ/%ED%94%BC%EA%B7%B8%EB%A7%88%E3%85%A3?node-id=0-1&t=PeaVY4SNHow2DC8e-1)
- File Key: `EAIDgsEJScEZZgwADHiNLQ`

## Quick Start

### 1. Open the workspace

1. Clone the repository
2. Open this folder as an Obsidian vault
3. Open the same folder in Claude Code or Codex

### 2. Bootstrap tools

```bash
bash _system/tools/bootstrap.sh
```

### 3. Read the onboarding docs

1. [Workspace Visual Map](_system/team-setup/workspace-visual-map.md)
2. [Team Computer Setup Guide](_system/team-setup/team-computer-setup-guide.md)
3. [Project Dashboard](_system/dashboard/project-dashboard.md)

## Operating Rules

- MOC files live only under `_MOC/`
- User-facing dashboard lives under `_system/dashboard/`
- Direct evidence input goes only to `master-evidence-ledger.md`
- Tool setup contracts live under `_system/tools/`
- Long-lived AI rules and contracts live under `.agent/system/`

## Notes

- This repository is currently an operations/workspace baseline, not a finished product release.
- Some runtime integrations still require local app auth or external setup:
  - Obsidian CLI
  - Figma MCP
  - Excalidraw MCP
  - NotebookLM login
