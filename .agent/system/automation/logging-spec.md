---
tags:
  - area/system
  - type/reference
  - status/active
date: 2026-04-06
up: "[[.agent/system/README]]"
---
# Logging Spec

- `04_증빙/01_핵심로그/master-evidence-ledger.md`: 직접 입력 정본
- `04_증빙/01_핵심로그/decision-log.md`: 중요한 의사결정만 승격
- `04_증빙/01_핵심로그/prompt-catalog.md`: 승격된 재사용 프롬프트
- `04_증빙/01_핵심로그/ai-usage-stats.md`: 파생 통계 집계본
- `04_증빙/01_핵심로그/ai-usage-log.md`: archive/reference
- `04_증빙/01_핵심로그/session-log.md`: archive/reference

## Prompt Promotion Rule

- 프롬프트는 문장만 저장하지 않는다.
- 최소 `Intent / Prompt / Input contract / Output contract / Reuse rule / Linked evidence`를 같이 저장한다.
- 구조 변경 프롬프트는 결과물 note, script, template을 연결해야 한다.
