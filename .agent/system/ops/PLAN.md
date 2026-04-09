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
> 마지막 업데이트: 2026-04-09 (Day 4)

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

## 현재 우선순위 (Day 4)

### P0 — 지금 당장
1. **hagent-os/ 기획 문서 세트 완성**
   - 담당: Product Agent (Claude Opus 4.6)
   - 상태: 00_vision, 01_strategy, 02_product ✅ 완료 + k-skill 반영 ✅
   - 남은 것: `03_domain/`, `04_ai-agents/`, `05_workflows/` ~ `10_execution/`
2. **k-skill 카탈로그 정본 작성**
   - 담당: Product Agent
   - 산출물: `04_ai-agents/` 하위에 에이전트 설계 + 스킬 카탈로그
   - 핵심: 에이전트 × 스킬 매핑, 외부 한국형 도구(korean-law-mcp, HWP 등) 연동 설계

### P1 — 오늘 안에 맞출 것
3. **앱 스켈레톤 준비**
   - 담당: Builder Agent
   - 산출물: `03_제품/app/` Next.js + Supabase 초기 구조
4. **k-skill 프로토타입 구현**
   - 담당: Builder Agent
   - 산출물: `refund-calculator`, `k-education-law-lookup` 등 실제 동작 스킬 3~5개
5. **Evidence Gate 운영 유지**
   - 담당: Evidence Agent
   - 산출물: `ai-session-intake.csv`, `master-evidence-ledger.md`

### P2 — Day 5 준비
6. **오케스트레이터 + Agent 2개 핵심 개발**
   - 담당: Builder Agent
   - 산출물: Orchestrator + Complaint Agent + Retention Agent 동작
7. **승인 대시보드 + k-skill 레지스트리 UI**
   - 담당: Builder Agent
   - 산출물: 카드 UI + 스킬 카탈로그 UI

### P3 — Day 6~7
8. **demo-script-v0.md** 작성
9. **README/AI report 입력 루틴 고정**
10. **제출 패키징 리허설**

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
