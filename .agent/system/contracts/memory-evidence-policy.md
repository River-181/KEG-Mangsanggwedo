---
tags:
  - agent
  - system
  - contract
  - evidence
date: 2026-04-06
aliases:
  - memory-evidence-policy
  - 기억증빙정책
---
# Memory Evidence Policy

> 원칙: 메모리는 운영 보조, 증빙은 리포트 정본.

## 역할 구분

- `.agent/system/memory/long-term-memory.md`는 오래 유지되는 핵심 사실 정본이다.
- `.agent/system/memory/daily-memory.md`는 오늘 세션의 단기 기억과 핸드오프를 담는다.
- `04_증빙/`은 AI 리포트, 회고, 결과보고서, 심사 대응에 바로 쓸 수 있는 재료의 정본이다.

## 메모리에만 두면 안 되는 항목

1. 심사/전략에 영향을 주는 사실
2. 도구 사용 이유와 결과
3. 재사용 가능한 프롬프트
4. 토큰, 시간, 비용 관련 수치
5. 산출물 링크와 생성 맥락
6. 사람이 채택한 의사결정 근거

## Evidence Gate

모든 세션 종료 시 아래 순서로 점검한다.

1. 세션 중 생성된 메모리 항목 검토
2. 증빙 가치가 있는 내용을 `04_증빙/`에 반영
3. `04_증빙/01_핵심로그/session-log.md`에 `Evidence updates`와 `Gate status` 기록
4. `.agent/system/logs/evidence-gate-log.md`에 결과 기록

## Gate status 정의

- `Passed`: 메모리 변경 중 증빙 가치가 있는 내용이 모두 반영됨
- `Passed (No evidence delta)`: 증빙으로 올릴 항목이 없었음
- `Pending Evidence`: 메모리에만 있고 증빙에 없는 항목이 남아 있음

## 세션 완료 조건

- `Pending Evidence` 상태에서는 세션을 `Done`으로 닫지 않는다.
- `04_증빙/` 반영 후에만 `Done` 가능.
