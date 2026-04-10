---
tags: [area/product, type/index, status/active]
date: 2026-04-09
up: "[[hagent-os/README]]"
---
# HagentOS 문서 인덱스 (개발자용)

> 앱 개발 중 기획 문서를 30초 안에 찾기 위한 인덱스.
> 각 링크는 해당 문서의 단일 진실 원본이다.

---

## 다이어그램 (빠른 참조)

| 다이어그램 | 내용 |
|-----------|------|
| [[diagrams/00_system-context]] | 시스템 컨텍스트 — 사용자·시스템·외부 의존성 (C4 Level 1) |
| [[diagrams/01_demo-user-flow]] | 2분 데모 사용자 흐름 — 민원 접수 → 승인 → 완결 |
| [[diagrams/02_orchestrator-sequence]] | 에이전트 실행 시퀀스 — Trigger → Dispatch → Level 분기 |
| [[diagrams/03_erd]] | 핵심 ERD — 12개 테이블, Drizzle ORM 기준 |
| [[diagrams/04_approval-state]] | 승인 상태 머신 — Case 상태 + Level 0-4 흐름 |
| [[diagrams/05_ia-screen-map]] | 화면 구조 맵 — 22개 라우트 + 4존 레이아웃 |

---

## 개발 시작 전 필독

| 문서 | 내용 |
|------|------|
| [[02_product/prd]] | 제품 전체 명세 (단일 진실 원본) |
| [[02_product/mvp-scope]] | Must/Should 우선순위 (D5-D8 스프린트 기준) |
| [[10_execution/roadmap]] | 일별 목표 + 역할 분담 |
| [[10_execution/open-questions]] | 개발 전 확인 필요 블로커 |
| [[DESIGN]] | 디자인 시스템 + 색상 토큰 |

---

## 에이전트 구현 시

| 문서 | 내용 |
|------|------|
| [[04_ai-agents/agent-design]] | 에이전트 전체 설계 원칙 |
| [[04_ai-agents/agent-roles/orchestrator]] | 오케스트레이터 에이전트 명세 |
| [[04_ai-agents/agent-roles/complaint]] | 민원 처리 에이전트 |
| [[04_ai-agents/agent-roles/retention]] | 이탈 방어 에이전트 |
| [[04_ai-agents/agent-roles/scheduler]] | 일정 관리 에이전트 |
| [[04_ai-agents/agent-roles/intake]] | 신규 상담 접수 에이전트 |
| [[04_ai-agents/agent-roles/notification]] | 알림 발송 에이전트 |

---

## 워크플로우 구현 시

| 문서 | 내용 |
|------|------|
| [[05_workflows/complaint-handling]] | 민원 처리 흐름 |
| [[05_workflows/churn-detection]] | 이탈 감지 흐름 |
| [[05_workflows/morning-briefing]] | 아침 브리핑 자동화 |
| [[05_workflows/new-enrollment]] | 신규 등록 흐름 |
| [[05_workflows/schedule-management]] | 수업 일정 관리 흐름 |
| [[05_workflows/compliance-alert]] | 규정 준수 알림 흐름 |

---

## DB 스키마

| 문서 | 내용 |
|------|------|
| [[08_data/domain-model]] | 엔터티 관계 + 핵심 테이블 정의 |
| [[08_data/reporting-metrics]] | 대시보드 지표 정의 |

---

## 외부 연동

| 문서 | 내용 |
|------|------|
| [[07_integrations/integrations]] | GCal env vars, 카카오 API, MCP 목록 전체 |

---

## UI 구현 시

| 문서 | 내용 |
|------|------|
| [[09_ux/information-architecture]] | 화면 구조 + 내비게이션 계층 |
| [[09_ux/ux-concepts]] | 핵심 UX 컨셉 + 인터랙션 원칙 |
| [[DESIGN]] | 색상 토큰, 타이포, 컴포넌트 스펙 |

---

## 정책 준수 체크

| 문서 | 내용 |
|------|------|
| [[06_policies/ai-safety-policy]] | 절대 금지 3종 + 인간 승인 게이트 |
| [[06_policies/data-policy]] | PII 익명화 규칙 + 보존 기간 |
| [[06_policies/communication-policy]] | 메시지 발송 제한 + 톤 가이드 |

---

## 도메인 지식 (막힐 때)

| 문서 | 내용 |
|------|------|
| [[03_domain/academy-operations]] | 학원 운영 기본 개념 |
| [[03_domain/communication-model]] | 원장-학부모 커뮤니케이션 구조 |
| [[03_domain/finance-and-policy]] | 수납·환불·정책 도메인 지식 |

---

## UX 리서치 (맥락 파악)

| 문서 | 내용 |
|------|------|
| [[02_product/user-personas]] | 타깃 원장 페르소나 |
| [[02_product/user-journeys]] | 주요 사용자 여정 |
