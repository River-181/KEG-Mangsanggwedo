---
tags:
  - area/system
  - type/reference
  - status/active
date: 2026-04-09
up: "[[.agent/system/ops/README]]"
aliases:
  - 계획
---
# PLAN.md — 실행 계획

> **모든 에이전트는 작업 시작 시 이 파일을 읽는다.**
> 자신의 역할에 해당하는 작업을 찾아 실행한다.
> 마지막 업데이트: 2026-04-09 (Day 3)

---

## 대회 타임라인

| Day | 날짜 | 초점 | 종료 조건 |
|-----|------|------|----------|
| 0 | 04-06 | ==세팅 + 리서치 준비== | 워크스페이스 완성, 리서치 시작 가능 |
| 1 | 04-07 | 문제 리서치 → 후보 3개 축소 | problem-bank, scorecard 완성 |
| 2 | 04-08 | 의사결정 스프린트 → 1개 확정 | decision-sprint, scope-board 확정 |
| 3 | 04-09 | 뼈대 앱 + 핵심 플로우 | 첫 배포, 데모 크리티컬 작동 |
| 4 | 04-10 | 기능 동결, QA, UX | 주요 버그 0개 |
| 5 | 04-11 | README, AI 리포트, judge review | 제출물 초안 완성 |
| 6 | 04-12 | 시연 리허설, 안정화 | 데모 2분 통과 |
| 7 | 04-13 | ==제출== | 마감 24:00 전 제출 완료 |

---

## 현재 우선순위 (Day 3)

### P0 — 지금 당장
1. **프로젝트 대시보드를 제출용 진행판으로 유지**
   - 담당: 모든 AI 에이전트
   - 산출물: `_system/dashboard/project-dashboard.md`, `.agent/system/ops/PLAN.md`, `.agent/system/ops/PROGRESS.md`, `04_증빙/03_daily/*.md`, `.agent/system/memory/*.md`가 같은 날짜 기준으로 정렬
2. **문제 후보 3개 축소와 첫 사용자 압축**
   - 담당: Research Agent
   - 산출물: `02_전략/problem-bank.md`, `02_전략/problem-scorecard.md`, `02_전략/tasks/문제-후보-3개-축소.md`
3. **최종 문제 1개 + scope 방향 확정**
   - 담당: PM Agent + Judge Agent + Product Agent
   - 산출물: `decision-sprint.md`, `scope-board.md`, `02_전략/tasks/최종-문제-1개-확정.md`
4. **Evidence Gate 운영 유지**
   - 담당: Evidence Agent
   - 산출물: `04_증빙/01_핵심로그/ai-session-intake.csv` 누락 없는 기록, nightly dispatch 이후 `master-evidence-ledger.md`와 `external-ai-usage.csv` 재생성, 필요 시 `decision-log.md`와 `prompt-catalog.md` 승격
5. **paperclip 실제 코드 해체 분석을 문제 정의 입력으로 연결**
   - 담당: Research Agent + Product Agent
   - 산출물: `02_전략/paperclip-analysis/*.md`, `00-problem-definition-source.md`, `paperclip-analysis` 기준 첫 구조 가설

### P1 — 오늘 안에 맞출 것
6. **LLM 위키 1차 ingest 시작**
   - 담당: Research Agent
   - 산출물: `06_LLM위키/tasks/전략-문서-1차-ingest.md`, `06_LLM위키/` 하위 첫 entity/concept/problem note
7. **제출용 진행 증빙 정렬**
   - 담당: Evidence Agent + PM Agent
   - 산출물: `04_증빙/tasks/제출용-진행-증빙-정렬.md`, `2026-04-09.md`, `daily-memory.md`, `long-term-memory.md`
8. **실제 task note 운영 시작**
   - 담당: 모든 AI 에이전트
   - 산출물: `type/task` note가 대시보드에 최소 3건 이상 노출

### P2 — Day 3 직전 준비
9. **제품 정의 초안**
   - 담당: Product Agent
   - 산출물: `problem-definition.md`, `user-personas.md`, `architecture.md`
10. **앱 스켈레톤 준비**
   - 담당: Builder Agent
   - 산출물: `03_제품/app/` 초기 구조, 첫 실행 경로, `demo-critical-path`

### P3 — Day 2 이후
10. **demo-script-v0.md** 작성
11. **README/AI report 입력 루틴 고정**
12. **제출 패키징 리허설**

---

## 역할별 할 일

### PM Agent
- 매 세션 시작: `project-dashboard`, `PLAN`, `PROGRESS` 동기 확인
- 매일 밤: 데일리 노트 작성, 내일 단일 목표 설정

### Research Agent
- Day 2: 문제 은행 3개 후보로 축소
- Day 2: 전략 문서에서 `06_LLM위키/` 첫 ingest 수행

### Judge Agent
- Day 2: 후보 3개에 대한 심사위원 시뮬레이션
- Day 5: 중간 심사 시뮬레이션

### Evidence Agent
- 상시: master-evidence-ledger 기록
- 상시: 필요 시 decision/prompt만 승격
- 상시: `daily`와 `daily-memory` 공백 날짜 보정
- Day 5: AI 리포트 초안 컴파일

### Product Agent
- Day 2: 문제 정의서, 페르소나, 유저 스토리
- Day 2: demo-critical-path 정의

### Builder Agent
- Day 2~3: 기술 스택 확정, 앱 스켈레톤
- Day 3~4: 핵심 플로우 구현

### QA Agent
- Day 4: 테스트 케이스, 엣지케이스
- Day 6: 최종 QA

### Submission Agent
- Day 5: README, AI 리포트
- Day 7: 제출 패키징

---

## 위험 관리

| ID | 위험 | 영향 | 대응 |
|---|---|---|---|
| R1 | 문서만 강하고 제품 늦음 | 치명 | Day 2까지 반드시 기술 스택 확정 |
| R2 | 증빙 이중화 혼란 | 중간 | DEC-004 결정 완료, 마크다운 단일 마스터 |
| R3 | 다중 AI 맥락 유실 | 높음 | PROGRESS.md + PLAN.md로 동기화 |
| R4 | 배포 실패 | 치명 | Day 3부터 매일 배포 검증 |
| R5 | API Key 노출 | 탈락 | .gitignore + 커밋 전 검사 |
| R6 | 메모리-증빙 동기화 누락 | 높음 | 세션 종료 시 Evidence Gate 강제 |
| R7 | 대시보드가 빈 판으로 남음 | 높음 | `type/task` note를 실제 운영 입력점으로 사용 |

---

## 이번 턴 완료 항목

- `.agent/system/` 공용 운영 정본 골격 생성 완료
- `.context/` 내용 흡수 및 폴더 제거 완료
- `.claude/` 최소 어댑터화 완료
- `04_증빙` 핵심 로그 스키마 개편 완료
- 제출용 대시보드 역할을 `PLAN/PROGRESS/daily/task`와 연결하는 방향 확정

---

> 관련: [[.agent/system/ops/PROGRESS|PROGRESS]], [[_system/dashboard/project-dashboard|project-dashboard]], [[00 HOME]]
