---
tags:
  - moc
  - 증빙
date: 2026-04-06
aliases:
  - 증빙
---
# 증빙

> AI 활용 증빙 자료. 이 디렉토리의 내용이 AI 리포트와 회고의 재료가 된다.
> 에이전트는 작업 완료 시 자동으로 여기에 기록을 남긴다.

## 01 핵심로그

- `01_핵심로그/ai-usage-log.md` — AI 사용 기록
- `01_핵심로그/session-log.md` — 세션 단위 목표, 산출물, Evidence Gate 상태
- `01_핵심로그/decision-log.md` — 의사결정 기록
- `01_핵심로그/prompt-catalog.md` — 재사용 프롬프트
- `01_핵심로그/tool-log.md` — 도구 역할과 사용 원칙
- `01_핵심로그/ai-usage-stats.md` — 통합 통계 집계본
- `01_핵심로그/evolution-log.md` — 구조/운영 진화 기록

## 02 분석자료

- `02_분석자료/` — 평가서, 전략 분석, 토큰 전략, 구조 설계안

## 원칙

- 이 디렉토리는 AI 리포트 재료의 정본이다.
- `.agent/system/memory/`의 보조 기억 중 리포트 가치가 있는 내용은 최종적으로 이곳으로 승격되어야 한다.
- 세션 종료 시 `01_핵심로그/session-log.md`와 `evidence-gate-log.md`를 함께 확인한다.

## 03 daily

- `03_daily/` — 일별 스탠드업 + 증빙 스냅샷

## 미디어

- `assets/screenshots/` — 개발 과정 스크린샷
- `assets/demo/` — 데모 영상/GIF

## 연결

- [[_05_제출_MOC|05 제출]] — 증빙 → AI 리포트로 변환
