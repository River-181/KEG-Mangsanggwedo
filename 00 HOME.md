---
tags:
  - area/home
  - type/reference
  - status/active
  - type/moc
date: 2026-04-13
up: "[[_MOC_HOME]]"
aliases:
  - HOME
  - 홈
---
# KEG 바이브코딩 콘테스트 홈

> 2026-04-06 ~ 2026-04-13 | AI활용 차세대 교육 솔루션 | 최종 제출일

## 대시보드

- **D-Day**: 제출 마감 2026-04-13 24:00 **(오늘)**
- **현재 단계**: Day 8 — 제출 패키징, 항법 정리, 최종 commit/push
- **오늘의 목표**: `ai-report-final` 확정본 점검 → PDF/export 준비 → 제출 메일 패키징
- **운영 문서**: [[.agent/system/ops/PLAN|PLAN]] / [[.agent/system/ops/PROGRESS|PROGRESS]] / [[_system/dashboard/project-dashboard|운영 대시보드]] / [[.agent/system/ops/RALPH-LOOP-2026-04-13|RALPH Loop]]

## 오늘 바로가기

- [[05_제출/ai-report-final|AI report final]] — 제출용 AI 리포트 정본
- [[03_제품/hagent-os/diagrams/99_comprehensive-architecture|99 comprehensive architecture]] — 심사용 종합 구조도
- [[assets/excaildraw/01_민원-처리-플로우.excalidraw|Excalidraw 01]] / [[assets/excaildraw/02_AI-협업-구조.excalidraw|02]] / [[assets/excaildraw/03_시스템-4계층.excalidraw|03]]
- `04~06` Excalidraw: 예정
- [[_05_제출_MOC|05 제출 MOC]] / [[_03_제품_MOC|03 제품 MOC]]

## 섹션

- [[_01_대회정보_MOC|01 대회정보]] — 규칙, 일정, 심사, 팀 프로필
- [[_02_전략_MOC|02 전략]] — 플레이북, 포지셔닝, 의사결정
- [[_03_제품_MOC|03 제품]] — 문제정의, 페르소나, 아키텍처, 데모
- [[_04_증빙_MOC|04 증빙]] — AI 사용 로그, 결정 기록, 프롬프트
- [[_05_제출_MOC|05 제출]] — AI 리포트, 체크리스트, 회고
- [[_06_LLM위키_MOC|06 LLM 위키]] — Karpathy 스타일 persistent knowledge layer
- [[_system_tools_MOC|System Tools]] — Obsidian, Excalidraw, Figma, NLM, 팀 셋업

## MOC 공간

- 모든 MOC 정본: [[_MOC_HOME]]
- MOC 파일 물리 위치: `_MOC/`

## 에이전트 진입점

- [[.agent/AGENTS|.agent/AGENTS]] — 모든 AI 에이전트가 첫 번째로 읽는 문서
- [[.claude/CLAUDE|.claude/CLAUDE]] — Claude Code 전용 지시서
- [[.agent/system/README|.agent/system/README]] — 운영 시스템 정본 인덱스
- [[.agent/skills/obsidian-workspace/SKILL|obsidian-workspace skill]] — Obsidian vault 작업 기준
- [[_system/team-setup/team-computer-setup-guide|팀 컴퓨터 셋업 가이드]] — 팀원 환경 적용 가이드

## 제출물 체크리스트

- [x] GitHub 저장소 — `River-181/hagent-os` (public)
- [x] 배포된 라이브 URL — `https://hagent-os.up.railway.app`
- [x] AI 리포트 정본 (md) — [[05_제출/ai-report-final|ai-report-final]]
- [ ] AI 리포트 (PDF, 공식 양식) — export 필요
- [ ] 개인정보 수집/이용 동의서 (팀원 각각)
- [ ] 참가 각서 (팀 단위)

## 일별 진행

| Day | 날짜    | 초점                                 | 상태    |
| --- | ----- | ---------------------------------- | ----- |
| D0  | 04-06 | 주제분석, 문제선택, 구조확정                   | ✅ 완료  |
| D1  | 04-07 | 전략 문서, 리서치, 플레이북                   | ✅ 완료  |
| D2  | 04-08 | Paperclip 분석, 문제 정의 확정              | ✅ 완료  |
| D3  | 04-09 | 기획 정본 잠금, v0.1.0 빌드 착수             | ✅ 완료  |
| D4  | 04-10 | v0.1~v0.4 빌드, 갭 감사, DB 스키마        | ✅ 완료  |
| D5  | 04-11 | v1.0 독립 레포 E2E 재구축                 | ✅ 완료  |
| D6  | 04-12 | 배포 + AI 리포트 + 데모 리허설              | ✅ 완료  |
| D7  | 04-13 | ==최종 제출 (마감 24:00)==               | 🔄 진행 |
