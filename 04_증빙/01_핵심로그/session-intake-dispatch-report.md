---
tags:
  - area/evidence
  - type/report
  - status/active
date: 2026-04-09
up: "[[_04_증빙_MOC]]"
---
# Session Intake Dispatch Report

> 생성 시각: 2026-04-09 17:25 KST
> 입력 원장: `04_증빙/01_핵심로그/ai-session-intake.csv`
> 재생성 파일: `04_증빙/01_핵심로그/master-evidence-ledger.md`, `04_증빙/01_핵심로그/external-ai-usage.csv`

## Daily Summary

| 날짜 | 세션 수 | 도구 | 프롬프트 수 | 추정 토큰 |
|---|---:|---|---:|---:|
| 2026-04-06 | 16 | ChatGPT, Claude Code, Codex, Perplexity | 18 | 195,000 |
| 2026-04-08 | 6 | Codex | 8 | 84,000 |
| 2026-04-09 | 3 | Codex | 3 | 33,000 |

## Prompt Promotion Candidates

- `S-GPT-001` ChatGPT: P-001~P-004가 이 세션에서 생성됨
- `S-OPS-009` Codex: Obsidian CLI와 NLM 설치 실동작 검증
- `S-PPLX-001` Perplexity: P-005와 P-006은 승격 가치가 높음
- `S-EVID-015` Codex: P-009 evidence orchestrator prompt는 재사용 가치 있음
- `S-OPS-011` Codex: P-007과 P-008은 재사용 프롬프트 자산으로 승격 가치 높음
- `S-PROD-018` Codex: 제품 정의 근거 | 워크플로우 | AI 활용 전략

## Decision Promotion Candidates

- `S-001` Claude Code: 평탄 구조와 증빙 중심 운영 시작
- `S-002` Claude Code: 엑셀 기반 기록 체계의 한계가 드러남
- `S-003` Claude Code: PLAN/PROGRESS 도입 계기
- `S-CODEX-001` Codex: Codex 평가서를 통해 개선 방향 확보
- `S-OPS-001` Codex: `.agent/system`을 canonical로 채택
- `S-OPS-002` Codex: 루트 최소화와 `.context` 제거 결정
- `S-OPS-003` Codex: memory/maps/evidence 단순화 결정
- `S-OPS-004` Codex: GitHub 작업을 evidence gate와 연결
- `S-OPS-005` Codex: 문서 레이어를 Obsidian 자산으로 취급
- `S-OPS-006` Codex: command layer를 얇게 유지하는 방향
- `S-OPS-007` Codex: GitHub management flow 분리
- `S-OPS-008` Codex: 단일 원장 전략 도입
- `S-OPS-011` Codex: DEC-015와 DEC-016의 실행 근거
- `S-OPS-012` Codex: DEC-018의 실행 근거
- `S-OPS-014` Codex: 보안 gate 추가를 decision 후보로 검토 가능
- `S-RES-013` Codex: NotebookLM을 리서치 합성 도구로 검증
- `S-STRAT-010` Codex: LLM 위키 레이어 도입
- `S-PROD-018` Codex: exact unavailable estimate
- `S-STRAT-016` Codex: paperclip 해체 분석을 문제 정의 입력으로 승격

## Daily Note Hints

- `2026-04-06` / `S-001`: 데일리와 장기 기억에 첫 세션 출발점으로 남길 것
- `2026-04-06` / `S-002`: 포터블 환경 구축 이유와 효과를 memory에 남길 것
- `2026-04-06` / `S-003`: 다중 AI 정합화 위험을 장기 기억에 남길 것
- `2026-04-06` / `S-CODEX-001`: PROGRESS에 Codex 참여 이력으로 남길 것
- `2026-04-06` / `S-CODEX-002`: 운영 구조 약점과 개선 포인트를 memory에 유지
- `2026-04-06` / `S-GPT-001`: ChatGPT로 개요서와 준비 단계 큰 그림 확보
- `2026-04-06` / `S-OPS-001`: 구조 변경 사실을 장기 기억에 남길 것
- `2026-04-06` / `S-OPS-002`: 경로 정합성 변경은 atlas와 progress에 유지
- `2026-04-06` / `S-OPS-003`: 구조 단순화 이유를 장기 기억에 남길 것
- `2026-04-06` / `S-OPS-004`: GitHub 작업도 증빙 대상이라는 점을 기억에 남길 것
- `2026-04-06` / `S-OPS-005`: Obsidian-first 원칙을 장기 기억에 고정
- `2026-04-06` / `S-OPS-006`: 정본 중복 방지 원칙을 기억에 남길 것
- `2026-04-06` / `S-OPS-007`: GitHub 운영 구조 변화를 장기 기억에 남길 것
- `2026-04-06` / `S-OPS-008`: 증빙 입력 마찰 감소가 왜 중요했는지 기억에 남길 것
- `2026-04-06` / `S-OPS-009`: 도구 정본 문서를 저장소 내부로 내재화
- `2026-04-06` / `S-PPLX-001`: 기관/심사 문법 리서치 근거 확보
- `2026-04-08` / `S-EVID-015`: Codex 토큰 추정치 기록 반영
- `2026-04-08` / `S-OPS-011`: 태그 정규화와 `up` 복원 작업 완료
- `2026-04-08` / `S-OPS-012`: 대시보드가 제출용 진행 아티팩트로 바뀜
- `2026-04-08` / `S-OPS-014`: 공개 저장소 운영 원칙을 장기 기억에 유지
- `2026-04-08` / `S-RES-013`: 담임 모드 우선 가설을 memory에 유지
- `2026-04-08` / `S-STRAT-010`: 지식 시스템 변경을 장기 기억에 남길 것
- `2026-04-09` / `S-PROD-018`: 향후 구현/비평/리팩터링은 hagent-os 문서군을 기준으로 진행
- `2026-04-09` / `S-STRAT-016`: 메모리와 대시보드를 현재 상태로 맞춘 이유를 남길 것

## Memory Sync Hints

- `2026-04-06` / `S-GPT-001`: 초기 운영 방향과 플레이북의 출발점
- `2026-04-06` / `S-OPS-009`: 팀 재현성 강화 근거를 기억에 남길 것
- `2026-04-06` / `S-PPLX-001`: 향후 scorecard와 문제 정의에서 재참조 필요
- `2026-04-08` / `S-EVID-015`: 외부 AI 사용 통계 왜곡 방지 맥락 유지
- `2026-04-08` / `S-OPS-011`: 태그/계층 규칙 변경 사실을 장기 기억에 남길 것
- `2026-04-08` / `S-OPS-012`: 데일리와 daily-memory 동기화 이유를 기억에 남길 것
- `2026-04-09` / `S-OPS-017`: 반복 요청에서도 intake-first 규칙을 유지했다는 점을 기억에 남길 것
- `2026-04-09` / `S-STRAT-016`: logged

## Open Notes

- prompt/decision은 후보까지만 자동 분류한다.
- exact token source가 없는 도구는 `estimated_tokens` 기준이다.
