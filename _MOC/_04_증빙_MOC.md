---
tags:
  - area/moc
  - type/moc
  - status/active
date: 2026-04-12
up: "[[_MOC_HOME]]"
aliases:
  - 증빙
---
# 증빙

> AI 활용 증빙 자료. 이 디렉토리의 내용이 AI 리포트와 회고의 재료가 된다.
> 직접 입력 정본은 [[master-evidence-ledger]] 하나다.

## 01 핵심로그

- [[master-evidence-ledger]] — 직접 입력하는 단일 증빙 원장 (S-DEV-022까지 반영)
- [[decision-log]] — 중요한 의사결정만 승격
- [[prompt-catalog]] — 재사용 가치가 검증된 프롬프트만 승격
- [[tool-log]] — 도구 설명서와 사용 원칙
- [[03_제품/hagent-os/10_execution/runtime-docs/handoff/2026-04-13-full-regression]] — 최신 회귀 테스트 정본
- [[session-intake-dispatch-report]] — dispatch 재생성 보고서
- [[ai-usage-log]] — archive/reference
- [[session-log]] — archive/reference
- [[evolution-log]] — archive/reference

## 02 분석자료

- `02_분석자료/` — 평가서, 전략 분석, 토큰 전략, 구조 설계안

## 원칙

- 이 디렉토리는 AI 리포트 재료의 정본이다.
- 직접 입력은 `ai-session-intake.csv` → `dispatch-session-intake.py` → `master-evidence-ledger.md` 자동 재생성 파이프라인을 기본값으로 한다.
- 세션 종료 시 필요하면 [[decision-log]] 또는 [[prompt-catalog]]로만 추가 승격한다.

## 03 daily

- [[2026-04-06]] / [[2026-04-07]] / [[2026-04-08]] / [[2026-04-09]] / [[2026-04-10]] / [[2026-04-11]] / [[2026-04-12]] — 일별 스탠드업

## 04 meetings

- [[2026-04-07_1차-아이디어-미팅]] — 1차 아이디어 미팅
- [[2026-04-08_2차-아이디어-문제정의-확정-미팅]] — 2차 문제정의 확정
- [[2026-04-12_4차-배포전-점검-미팅]] — 4차 배포 전 점검 (01:30, 에이전트 실동작 확인 + 승인 화면 스크롤)

## 미디어

- `assets/screenshots/` — 개발 과정 스크린샷
- `assets/demo/` — 데모 영상/GIF

## 연결

- [[_05_제출_MOC|05 제출]] — 증빙 → AI 리포트로 변환
- [[team_profiles]] — 제출용 팀 프로필
