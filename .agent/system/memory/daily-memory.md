---
tags:
  - area/system
  - type/reference
  - status/active
date: 2026-04-08
up: "[[.agent/system/memory/MEMORY]]"
aliases:
  - daily-memory
  - 일일기억
---
# Daily Memory

이 파일은 단기 기억과 핸드오프를 위한 요약본이다.

## 오늘 상태

- 운영 정본은 `.agent/`와 visible vault가 역할 분담된 상태로 안정화되었다.
- visible 대시보드는 `_system/dashboard/project-dashboard.md`가 맡고, 내부 실행 동기화는 `PLAN.md`와 `PROGRESS.md`가 맡는다.
- `04_증빙/03_daily/2026-04-07.md`, `2026-04-08.md`를 복원해 날짜 공백을 메웠다.
- `06_LLM위키/` 레이어가 생겼지만, 아직 실제 ingest는 시작 단계다.
- 다음 실전 목표는 `문제 후보 3개 축소 → 1개 확정 → 제품 정의 착수`다.

## 오늘 바뀐 구조

- 운영 진행 문서: `.agent/system/ops/`
- 장기 기억: `.agent/system/memory/long-term-memory.md`
- 구조 맵: `.agent/system/maps/workspace-atlas.md`
- 핵심 증빙 로그: `04_증빙/01_핵심로그/`
- visible 진행판: `_system/dashboard/project-dashboard.md`
- 전략 태스크: `02_전략/tasks/`
- 증빙 태스크: `04_증빙/tasks/`
- 위키 ingest 태스크: `06_LLM위키/tasks/`

## 다음 세션 체크리스트

1. `.agent/system/ops/PLAN.md` 확인
2. `.agent/system/ops/PROGRESS.md` 확인
3. `_system/dashboard/project-dashboard.md`에서 현재 단계와 task 현황 확인
4. `02_전략/problem-bank.md`와 `problem-scorecard.md` 갱신
5. `06_LLM위키/` 첫 ingest 대상 1개 이상 처리
6. 세션 종료 시 `04_증빙/01_핵심로그/master-evidence-ledger.md`
7. 중요 결정이 있으면 `decision-log.md`
8. 재사용 프롬프트가 있으면 `prompt-catalog.md`
