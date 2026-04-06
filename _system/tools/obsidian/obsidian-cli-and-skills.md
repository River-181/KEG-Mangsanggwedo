---
tags:
  - system/tools
  - obsidian
date: 2026-04-06
aliases:
  - obsidian-cli-and-skills
  - Obsidian CLI
---
# Obsidian CLI + Skills

## 역할

- MOC 유지
- note 생성/append/read
- daily note 관리
- `.base` 파일 관리

## 이 저장소의 규칙

- MOC 파일은 `_MOC/` 아래에만 둔다.
- note 링크는 `[[wikilink]]`를 기본으로 쓴다.
- 구조 변경 시 [[_MOC_HOME]]과 [[workspace-atlas]]를 함께 갱신한다.

## 필요한 외부 구성

- Obsidian Desktop App
- Obsidian CLI (`obsidian`)
- 글로벌 skill
  - `obsidian-cli`
  - `obsidian-markdown`
  - `obsidian-bases`
  - `json-canvas`

## 프로젝트 내 관련 스킬

- [[.agent/skills/obsidian-workspace/SKILL|obsidian-workspace]]
- [[.agent/skills/moc-sync/SKILL|moc-sync]]

## 검증 명령

```bash
obsidian help
obsidian search query="MOC" limit=5
obsidian read file="_MOC_HOME"
```

## 현재 상태

- 이 세션에서는 `obsidian` CLI 응답을 확인하지 못했다.
- 따라서 구조 이동은 저장소 기준으로 수행했고, 이후 실사용 검증은 Obsidian App이 열린 상태에서 다시 해야 한다.
