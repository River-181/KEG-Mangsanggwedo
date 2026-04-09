---
tags:
  - area/system
  - type/reference
  - status/active
date: 2026-04-09
up: "[[.agent/system/memory/MEMORY]]"
aliases:
  - long-term-memory
  - 장기기억
---
# Long-Term Memory

## 대회 핵심

- 대회명: 2026 제1회 KEG 바이브코딩 콘테스트
- 주제: AI활용 차세대 교육 솔루션
- 기간: 2026-04-06 ~ 2026-04-13
- 마감: 2026-04-13 24:00
- 제출물: GitHub(public), 라이브 URL, AI 리포트, 동의서/각서
- 심사: 기술 완성도, AI 활용 능력/효율성, 기획력/실무접합성, 창의성
- 상세 정본: `01_대회정보/바이브코딩공모전_공지.md`

## 팀 핵심

- 팀 인원: 2명
- 이승보: 한남대학교, SW개발 총괄
- 김주용: 충남대학교, 프로젝트 관리/발표
- 두 사람 모두 풀스택 + AI 네이티브
- 상세 프로필 정본: `01_대회정보/team_profiles.md`

## 워크스페이스 목적

- 이 공간은 지금 단계에서 제품 저장소보다 먼저 `대회를 위한 운영 시스템 공간`이다
- 사람 2명과 다중 AI가 같은 규칙과 맥락으로 움직이도록 설계한다
- Obsidian은 탐색 인터페이스, GitHub는 추후 운영/제품 저장소 역할
- 실제 제품 코드는 `03_제품/app/`, 테스트는 `03_제품/tests/`

## 정본 위치

- 공용 운영 규칙: `.agent/system/`
- 운영 진행 관리: `.agent/system/ops/`
- visible 진행 대시보드: `_system/dashboard/project-dashboard.md`
- 리포트 재료: `04_증빙/`
- Claude 런타임 어댑터: `.claude/`
- 공용 에이전트 정의: `.agent/agents/`
- 전략/증빙/wiki task 입력점: `02_전략/tasks/`, `04_증빙/tasks/`, `06_LLM위키/tasks/`

## 현재 우선순위

1. 문제 후보 3개 축소와 최종 문제 1개 확정
2. `project-dashboard`를 중심으로 `PLAN/PROGRESS/daily/task` 동기화 유지
3. `master-evidence-ledger` 기반 증빙 습관화
4. `paperclip` 실제 코드 해체 결과를 제품 정의 입력으로 승격
5. `06_LLM위키/` 첫 ingest 시작
6. 제품 구현 착수

## 제품 방향에서 고정된 것

- reference 프로그램은 `paperclip` 계열이며, 목표는 clone이 아니라 한국형 학원 운영 맥락에 맞는 재구성이다.
- 현재까지의 코드 해체 기준 핵심 차용 대상은 `board-first control plane`, `stateful operations model`, `local-first deployment`, `plugin/adapter extensibility`다.
- 초기 제품은 chat shell보다 `운영 보드 + 케이스 + 승인 + 활동 기록`에 가까운 형태일 가능성이 높다.
- 도메인 다양성이 크므로 core system과 domain pack, skill bundle을 분리해 사고해야 한다.

## authoritative files

- 운영 계약: `.agent/system/contracts/workspace-contract.md`
- 기억/증빙 정책: `.agent/system/contracts/memory-evidence-policy.md`
- 워크스페이스 구조 맵: `.agent/system/maps/workspace-atlas.md`
- 실행 계획: `.agent/system/ops/PLAN.md`
- 진행 현황: `.agent/system/ops/PROGRESS.md`
