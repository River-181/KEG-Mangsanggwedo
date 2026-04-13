---
tags:
  - area/submission
  - type/report
  - status/active
date: 2026-04-06
up: "[[_05_제출_MOC]]"
status: draft
---
# AI 리포트 초안

> 공식 양식: `assets/originals/20260406_③_AI리포트.docx`
> 이 파일에서 초안을 작성한 뒤 docx로 변환하여 제출.

## 1. 프로젝트 개요

HagentOS는 한국 교육 운영 현장에서 반복되는 민원, 일정 변경, 결석/보강, 환불, 상담 후속조치 같은 비교육 업무를 역할 기반 AI 에이전트 팀으로 처리하는 운영 플랫폼이다.

- 문제 정의 근거:
  - [[03_제품/hagent-os/02_product/prd]]
  - [[03_제품/hagent-os/00_vision/core-bet]]
  - [[03_제품/hagent-os/01_strategy/market-and-customer]]
- 최종 제품 기준:
  - `product repo` — `/Users/river/workspace/active/hagent-os`
  - `contest docs` — [[03_제품/hagent-os/10_execution/runtime-docs/README]]

## 2. AI 도구 활용 전략

### 사용한 AI 도구
- Claude Code (Opus/Sonnet/Haiku) — 주 개발 도구
- Codex (GPT-5.x) — 코드 리뷰, 구조 감사, bug fix, 회귀 테스트 보조
- ChatGPT Web / GPT-5.4 — 전략 정리, 제출 문서 구조화
- Perplexity / NotebookLM — 리서치 수집 및 합성

### 프롬프트 전략
> [[prompt-catalog|프롬프트 카탈로그]] 참조

- 탐색용 프롬프트: 문제 정의, 사용자 페인, 시장/경쟁
- 구현용 프롬프트: UI polish, bug fix, regression, runtime flow
- 제출용 프롬프트: README/AGENTS/AI report 구조화

### AI 협업 방식
- 8개 역할 기반 에이전트 운영 (PM, Research, Product, Builder, QA, Judge, Evidence, Submission)
- 핸드오프 계약으로 에이전트 간 정보 전달 표준화
- `.agent/AGENTS.md`로 모든 에이전트의 공용 진입점 관리

증빙 정본:
- [[master-evidence-ledger]]
- [[03_제품/hagent-os/10_execution/runtime-docs/handoff/2026-04-13-full-regression]]
- [[03_제품/hagent-os/10_execution/runtime-docs/handoff/2026-04-13-claude-session-summary]]

## 3. 핵심 문제 해결 과정

> [[decision-log|의사결정 로그]]와 [[03_제품/hagent-os/10_execution/roadmap]] 기반으로 작성

핵심 흐름:
1. 문제 정의와 타깃 사용자를 좁힘
2. `paperclip`을 참고하되 한국 교육 운영용 control plane으로 재해석
3. 실제 제품 저장소 `/Users/river/workspace/active/hagent-os`에서 구현
4. `Kakao/Telegram inbound -> case -> approval -> document` 루프를 실동작 수준으로 검증
5. 회귀 테스트, handoff, meeting, evidence를 콘테스트 Obsidian vault에 정리

## 4. AI가 한 일 vs 사람이 한 일

> [[ai-usage-log|AI 사용 로그]]와 [[master-evidence-ledger]] 기반으로 정리

초안 기준 분리:
- AI가 한 일:
  - 코드 초안 생성
  - 버그 원인 탐색
  - 회귀 테스트 체크리스트 정리
  - 문서 초안, handoff, evidence 구조화
- 사람이 한 일:
  - 문제 선택과 범위 결정
  - 기능 우선순위와 데모 시나리오 확정
  - 실제 구현 방향 선택과 최종 승인
  - 심사 흐름, 발표, 운영 판단

## 5. 성과 및 한계

현재 정리 가능한 성과:
- 실제 제품 저장소와 콘테스트 문서 공간을 분리 운영하면서도 handoff/evidence를 유지
- `case`, `approval`, `project`, `skill runtime`, `inbound/outbound`가 연결된 데모 제품 완성
- Obsidian 기반 운영 문서와 AI 활용 증빙을 제출용으로 재구성

남은 한계:
- 일부 live env 의존 항목은 환경변수 없이는 degraded
- 외부 채널 실제 delivery proof는 환경 제약을 받음
- AI report docx 최종 포맷 전환은 아직 남아 있음

## 작성 재료 체크

- [x] 제품 개요 근거 문서 연결
- [x] AI 도구/협업 구조 연결
- [x] 증빙 정본 연결
- [ ] 공식 양식 문단 길이에 맞춘 축약본 작성
- [ ] docx 변환본 점검
