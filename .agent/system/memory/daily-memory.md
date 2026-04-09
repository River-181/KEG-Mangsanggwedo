---
tags:
  - area/system
  - type/reference
  - status/active
date: 2026-04-09
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
- `06_LLM위키/` 레이어가 생겼고, source note 기반 리서치 질문이 `02_전략/research-results/` 작업 공간으로 정리되었다.
- `problem-bank.md`, `problem-scorecard.md`, `research-hub.md`, `research-plan-eduswarm-v0.md`가 연결되어 개발 전 리서치 라인이 생겼다.
- `nlm`은 정상 동작 중이며, NotebookLM 노트북 `KEG EduSwarm Research 2026-04-08`와 `KEG Bottom-Up Academy Research 2026-04-09` 두 개가 리서치 합성 계층으로 사용되고 있다.
- 1차 통합 질의 기준으로는 `담임 모드`가 더 강했지만, 2026-04-09 바텀업 질의에서는 `운영자 모드`와 `민원/이탈` 축이 다시 강하게 부상했다.
- `R-008_NLM_바텀업학원리서치합성.md`가 새 기준 문서이며, 현재 핵심 긴장은 `운영자 vs 담임`, `민원 vs 이탈`, `보습/IT vs 태권도/예체능`이다.
- 같은 Bottom-Up 노트북에 `deep research`를 추가 실행해 웹 소스 22개를 더 import했고, Studio report artifact를 생성한 뒤 Google Docs로 export했다.
- `R-009_NLM_딥리서치_및_스튜디오보고서.md`가 딥리서치/스튜디오 결과 기록이며, 새로 강해진 축은 `세무/노무/통학버스/소방/법규`다.
- `02_전략/research-results/20_domain-analysis/` 아래에 `hagwon-operations`, `pain-points`, `legal-requirements`, `data-assets` 4문서가 정리되었고, `_research/`는 흡수되었다.
- `02_전략/research-results/00_hub/research-folder-guide.md`가 생겨 `00_hub / 10_reports / 20_domain-analysis / 30_external-ai` 구조가 정본으로 고정되었다.
- `02_전략/paperclip-analysis/paperclip-master/` 실제 코드를 기준으로 `paperclip-analysis` 문서를 다시 썼다.
- 현재 reference 해체 분석의 결론은 `paperclip`의 핵심이 chat app이 아니라 `board-first control plane`, `company-scoped state`, `local-first deployment`, `plugin/adapter extensibility`라는 점이다.
- 따라서 EduPaperclip도 기능 목록보다 먼저 `운영 보드`, `케이스 상태`, `domain pack`, `runtime adapter`, `audit`를 생각해야 한다.
- 새 deep research import 이후 `02_전략/01-problem-scorecard.md`를 전면 개편했고, 현재 1순위는 `학원 운영자 민원·예외 처리 OS`, 2순위는 `재등록·이탈 방어`, 3순위는 `담임·강사 민원·반 운영 보조`다.
- 이제 리서치 공간의 핵심 판단은 `운영자 모드 우세`, `민원/예외 처리 우선`, `보습·IT 우선 도메인`, `태권도/예체능은 domain pack 후속`으로 정리된다.
- 모든 AI 세션을 먼저 `04_증빙/01_핵심로그/ai-session-intake.csv`에 넣고, nightly에 `dispatch-session-intake.py`로 파생 문서를 재생성하는 intake-first 증빙 파이프라인이 도입되었다.
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
- 리서치 작업 공간: `02_전략/research-results/`
- 심화 도메인 리서치 폴더: `02_전략/research-results/20_domain-analysis/`
- NotebookLM 리서치 노트북: `KEG EduSwarm Research 2026-04-08`
- Bottom-Up 전용 노트북: `KEG Bottom-Up Academy Research 2026-04-09`
- Paperclip 코드 해체 분석 공간: `02_전략/paperclip-analysis/`
- 단일 세션 intake 정본: `04_증빙/01_핵심로그/ai-session-intake.csv`
- nightly dispatch 스크립트: `.agent/system/automation/scripts/dispatch-session-intake.py`

## 다음 세션 체크리스트

1. `.agent/system/ops/PLAN.md` 확인
2. `.agent/system/ops/PROGRESS.md` 확인
3. `_system/dashboard/project-dashboard.md`에서 현재 단계와 task 현황 확인
4. `02_전략/problem-bank.md`와 `problem-scorecard.md` 갱신
5. `02_전략/02-decision-sprint.md`와 `02-bet-memo.md`를 새 scorecard 기준으로 갱신
6. NotebookLM 노트북 `3cd41a3b-ff36-494d-bc34-bb5b81d3b5ee`, `ff556c33-cf8c-425f-924f-2f1ce56f08a5`를 비교 사용
7. `06_LLM위키/` 첫 ingest 대상 1개 이상 처리
8. `02_전략/paperclip-analysis/06-runtime-control-plane-map.md`와 `07-plugin-adapter-extensibility.md`를 문제 정의 입력으로 반영
9. 세션 종료 시 `04_증빙/01_핵심로그/ai-session-intake.csv` append
10. 하루 마감 시 `python3 .agent/system/automation/scripts/dispatch-session-intake.py`
11. dispatch report를 보고 `decision-log.md`, `prompt-catalog.md` 승격 검토
