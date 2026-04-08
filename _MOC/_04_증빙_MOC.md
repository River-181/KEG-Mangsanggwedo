---
tags:
  - area/moc
  - type/moc
  - status/active
date: 2026-04-06
up: "[[_MOC_HOME]]"
aliases:
  - 증빙
---
# 증빙

> AI 활용 증빙 자료. 이 디렉토리의 내용이 AI 리포트와 회고의 재료가 된다.
> 직접 입력 정본은 [[master-evidence-ledger]] 하나다.

## 01 핵심로그

- [[master-evidence-ledger]] — 직접 입력하는 단일 증빙 원장
- [[decision-log]] — 중요한 의사결정만 승격
- [[prompt-catalog]] — 재사용 가치가 검증된 프롬프트만 승격
- [[tool-log]] — 도구 설명서와 사용 원칙
- [[ai-usage-stats]] — 나중에 파생되는 통계 집계본
- [[ai-usage-log]] — archive/reference
- [[session-log]] — archive/reference
- [[evolution-log]] — archive/reference

## 02 분석자료

- `02_분석자료/` — 평가서, 전략 분석, 토큰 전략, 구조 설계안

## 원칙

- 이 디렉토리는 AI 리포트 재료의 정본이다.
- `.agent/system/memory/`의 보조 기억 중 리포트 가치가 있는 내용은 최종적으로 이곳으로 승격되어야 한다.
- 직접 입력은 [[master-evidence-ledger]] 하나로 끝내는 것을 기본값으로 한다.
- 세션 종료 시 필요하면 [[decision-log]] 또는 [[prompt-catalog]]로만 추가 승격한다.

## 03 daily

- `03_daily/` — 일별 스탠드업 + 증빙 스냅샷

## 미디어

- `assets/screenshots/` — 개발 과정 스크린샷
- `assets/demo/` — 데모 영상/GIF

## 연결

- [[_05_제출_MOC|05 제출]] — 증빙 → AI 리포트로 변환
