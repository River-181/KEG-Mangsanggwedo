---
tags:
  - ops
  - plan
date: 2026-04-06
aliases:
  - 계획
---
# PLAN.md — 실행 계획

> **모든 에이전트는 작업 시작 시 이 파일을 읽는다.**
> 자신의 역할에 해당하는 작업을 찾아 실행한다.
> 마지막 업데이트: 2026-04-06 17:30 (Day 0)

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

## 현재 우선순위 (Day 0 저녁)

### P0 — 지금 당장
1. **증빙 시스템 확장** — 새 로그 파일 생성 + 컬럼 확장
   - 담당: Claude Code
   - 산출물: session-log.md, tool-log.md, evolution-log.md, ai-usage-log 14컬럼
2. **CLAUDE.md 업데이트** — 에이전트 시작 프로토콜
   - 담당: Claude Code
3. **Excalidraw 아키텍처** — AI 생태계 시각화
   - 담당: Claude Code (MCP)

### P1 — 오늘 밤 ~ 내일 아침
4. **문제 리서치 시작** — 교육 현장 문제 발굴
   - 담당: Research Agent (Perplexity + Claude/GPT)
   - 산출물: `02_전략/problem-bank.md`, `02_전략/problem-scorecard.md`
   - 방법: 플레이북 §1의 프레임워크 + 프롬프트 활용
5. **엑셀→마크다운 기존 데이터 이관** — P-001~P-004, S-001, T-001~T-003
   - 담당: Evidence Agent
   - 산출물: prompt-catalog.md 채움, tool-log.md 채움

### P2 — Day 1 완료 목표
6. **문제 후보 3개 축소** — scorecard 평가 완료
7. **의사결정 질문 준비** — 플레이북 §2 프레임워크 적용

### P3 — Day 2 이후
8. **기술 스택 확정** → app/ 초기화
9. **demo-script-v0.md** 작성
10. **scope-board.md** — Must/Should/Could/Not now

---

## 역할별 할 일

### PM Agent
- 매일 아침: PROGRESS.md 업데이트, 오늘의 우선순위 확인
- 매일 밤: 데일리 노트 작성, 내일 단일 목표 설정

### Research Agent
- Day 1: 문제 은행 구축 (15개 후보 → 스코어카드로 평가)
- Day 1: 경쟁 분석 (유사 서비스 3~5개)

### Judge Agent
- Day 2: 후보 3개에 대한 심사위원 시뮬레이션
- Day 5: 중간 심사 시뮬레이션

### Evidence Agent
- 상시: ai-usage-log append
- Day 0: 엑셀 데이터 이관
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

---

> 관련: [[PROGRESS]], [[project-manager]], [[00 HOME]]
