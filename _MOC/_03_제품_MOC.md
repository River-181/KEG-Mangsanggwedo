---
tags:
  - area/moc
  - type/moc
  - status/active
date: 2026-04-13
up: "[[_MOC_HOME]]"
aliases:
  - 제품
---
# 제품

## HagentOS 허브

- [[k-edu-zero-human]] — 전체 개요, 아키텍처, 기술스택 (단일 진입점)
- [[03_제품/hagent-os/INDEX|hagent-os/INDEX]] — 개발자용 빠른 문서 찾기 인덱스
- [[03_제품/hagent-os/10_execution/runtime-docs/README|runtime-docs/README]] — 제품 저장소에서 동기화한 설계/핸드오프/회귀 문서

## 오늘 기준 제출용 자산

- [[03_제품/hagent-os/diagrams/99_comprehensive-architecture|99 comprehensive architecture]] — 심사용 종합 구조도
- [[05_제출/live-final-verification|live-final-verification]] — 제출 직전 실동작 정본
- [[03_제품/hagent-os/10_execution/runtime-docs/handoff/2026-04-13-full-regression|2026-04-13 Full Regression]] — 로컬 회귀 테스트 기록
- [[assets/excaildraw-/01_민원-처리-플로우.excalidraw|Excalidraw 01]] / [[assets/excaildraw-/02_AI-협업-구조.excalidraw|02]] / [[assets/excaildraw-/03_시스템-4계층.excalidraw|03]]
- `04~06` Excalidraw: 예정

## 제품 코드 (실제 제출물)

- **독립 레포**: `/Users/river/workspace/active/hagent-os/` → `River-181/hagent-os`
- **포트**: Server 3200 · UI 5174 · DB hagent_os:5432
- **실행**: `cd /Users/river/workspace/active/hagent-os && pnpm dev`
- `03_제품/app/` — 콘테스트 워크스페이스 앱 (참조용)

## 비전·전략

- [[00_vision/core-bet|Core Bet]] — 핵심 베팅과 차별점
- [[00_vision/success-metrics|Success Metrics]] — 성공 지표
- [[01_strategy/market-and-customer|시장·고객]] — TAM/SAM/SOM + 고객 세그먼트
- [[01_strategy/value-and-competition|가치·경쟁]] — 차별화 포인트
- [[01_strategy/go-to-market|GTM]] — 출시 전략

## 제품 정의

- [[02_product/prd|PRD]] — 제품 전체 명세 (단일 진실 원본)
- [[02_product/mvp-scope|MVP Scope]] — Must/Should 우선순위
- [[02_product/user-personas|페르소나]] — 타깃 원장 페르소나
- [[02_product/user-journeys|유저저니]] — 주요 사용자 여정

## AI 에이전트

- [[04_ai-agents/agent-design|에이전트 설계]] — 전체 설계 원칙
- [[04_ai-agents/agent-roles/orchestrator|오케스트레이터]] — 총괄 에이전트
- [[04_ai-agents/agent-roles/complaint|민원 에이전트]]
- [[04_ai-agents/agent-roles/retention|이탈방어 에이전트]]
- [[04_ai-agents/agent-roles/intake|신규상담 에이전트]]
- [[04_ai-agents/agent-roles/scheduler|일정관리 에이전트]]
- [[04_ai-agents/agent-roles/notification|알림 에이전트]]

## 워크플로우

- [[05_workflows/complaint-handling|민원 처리 흐름]]
- [[05_workflows/churn-detection|이탈 감지 흐름]]
- [[05_workflows/morning-briefing|아침 브리핑]]
- [[05_workflows/new-enrollment|신규 등록]]
- [[05_workflows/schedule-management|수업 일정]]
- [[05_workflows/compliance-alert|규정 준수 알림]]

## 도메인·데이터·정책

- [[03_domain/academy-operations|학원 운영 개념]]
- [[08_data/domain-model|도메인 모델]]
- [[06_policies/ai-safety-policy|AI 안전 정책]]
- [[07_integrations/integrations|외부 연동]]

## UX·디자인

- [[09_ux/information-architecture|IA]]
- [[09_ux/ux-concepts|UX 컨셉]]
- [[09_ux/sidebar-restructure|사이드바 개선안]] — 네이밍 통일 + 16→12개 항목 + 섹션 4개 구조
- [[09_ux/domain-ux-paperclip-gap|도메인 UX 개선 계획]] — Paperclip 비교 + Phase별 개선 로드맵
- [[DESIGN|디자인 시스템]]
- [[brand/identity|브랜드 아이덴티티]]
- [[brand/landing-page|랜딩 페이지]]

## 실행

- [[10_execution/roadmap|로드맵]] — 일별 목표 + 역할
- [[10_execution/open-questions|미해결 질문]]
- [[10_execution/runtime-docs/README|실행 동기화 문서]] — 회귀 테스트, handoff, 디자인 정리

## 다이어그램

- [[00_system-context]]
- [[01_demo-user-flow]]
- [[02_orchestrator-sequence]]
- [[03_erd]]
- [[04_approval-state]]
- [[05_ia-screen-map]]
- [[03_제품/hagent-os/diagrams/99_comprehensive-architecture|99 comprehensive architecture]]

## 갭 분석 및 참고

- [[_research/gap-analysis-paperclip-vs-hagent]] — Paperclip 대비 HagentOS 비교 정본
- [[_research/paperclip-ui-reference]] — Paperclip UI 참고 정리
- [[_research/paperclip-readme-agents-application]] — 제출용 README/AGENTS 적용 전략
- [[02_전략/archive/paperclip-reference/README]] — raw mirror 및 초기 복제 메모 보관
