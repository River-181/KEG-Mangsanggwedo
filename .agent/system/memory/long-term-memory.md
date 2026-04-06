---
tags: [agent, system, memory, long-term]
date: 2026-04-06
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
- 리포트 재료: `04_증빙/`
- Claude 런타임 어댑터: `.claude/`
- 공용 에이전트 정의: `.agent/agents/`

## 현재 우선순위

1. 문제 리서치와 문제 정의
2. `master-evidence-ledger` 기반 증빙 습관화
3. 기술 스택 결정
4. 제품 구현

## authoritative files

- 운영 계약: `.agent/system/contracts/workspace-contract.md`
- 기억/증빙 정책: `.agent/system/contracts/memory-evidence-policy.md`
- 워크스페이스 구조 맵: `.agent/system/maps/workspace-atlas.md`
- 실행 계획: `.agent/system/ops/PLAN.md`
- 진행 현황: `.agent/system/ops/PROGRESS.md`
