---
tags:
  - area/system
  - type/reference
  - status/active
date: 2026-04-09
up: "[[.agent/system/memory/MEMORY]]"
aliases:
  - daily-memory
  - 일일기억
---
# Daily Memory

이 파일은 단기 기억과 핸드오프를 위한 요약본이다.

## 오늘 상태 (Day 4 — 2026-04-09)

### 핵심 변경: HagentOS 기획 문서 세트 + k-skill 생태계 정의

- **제품명 확정**: HagentOS (Hagwon + Agent + OS)
- **비전**: Korean Education 전체 (사교육 운영자 + 공교육 교사 + 강사)
- **MVP 타겟**: P-001 학원 운영자, 민원·예외 처리 OS
- **디렉토리**: `03_제품/hagent-os/` — 기획 문서 10개 완성

### k-skill 생태계가 핵심 차별점으로 승격
- 에이전트 2개(민원+이탈)만으로는 "앱"이지 "플랫폼"이 아님
- k-skill = 에이전트가 장착하는 한국 교육 도메인 특화 스킬 패키지
- 법규 조회(korean-law-mcp), 환불 계산, 최저임금 API, 교육 공공데이터, HWP 처리 등
- GitHub 기반 커뮤니티 공유 구조
- 외부 한국형 도구를 적극 활용 (만들어놓은 사람들 많음)
- **core-bet.md**: 차별점 3→4개 (k-skill 추가)
- **prd.md**: 전체 운영 업무 맵(10영역) + k-skill 아키텍처 섹션 + 비목표 리프레이밍
- **mvp-scope.md**: Not Now → "k-skill 생태계로 확장" 리프레이밍, 데모에 스킬 레지스트리 장면 추가
- **value-and-competition.md**: k-skill moat 추가, White Space에 3항목 추가

### 기존 리서치/전략 상태 (변동 없음)
- 리서치 공간 핵심 판단: `운영자 모드 우세`, `민원/예외 처리 우선`, `보습·IT 우선 도메인`
- Paperclip 분석 결론: `board-first control plane`, `local-first`, `plugin/adapter extensibility`
- intake-first 증빙 파이프라인 도입 완료

## 오늘 바뀐 구조

- 운영 진행 문서: `.agent/system/ops/`
- 장기 기억: `.agent/system/memory/long-term-memory.md`
- 구조 맵: `.agent/system/maps/workspace-atlas.md`
- 핵심 증빙 로그: `04_증빙/01_핵심로그/`
- visible 진행판: `_system/dashboard/project-dashboard.md`
- 전략 태스크: `02_전략/tasks/`
- 증빙 태스크: `04_증빙/tasks/`
- 위키 ingest 태스크: `06_LLM위키/tasks/`
- 리서치 작업 공간: `02_전략/research-results/`
- 심화 도메인 리서치 폴더: `02_전략/research-results/20_domain-analysis/`
- NotebookLM 리서치 노트북: `KEG EduSwarm Research 2026-04-08`
- Bottom-Up 전용 노트북: `KEG Bottom-Up Academy Research 2026-04-09`
- Paperclip 코드 해체 분석 공간: `02_전략/paperclip-analysis/`
- 단일 세션 intake 정본: `04_증빙/01_핵심로그/ai-session-intake.csv`
- nightly dispatch 스크립트: `.agent/system/automation/scripts/dispatch-session-intake.py`

## 다음 세션 체크리스트

1. `.agent/system/ops/PLAN.md` 확인 — Day 4 우선순위
2. `.agent/system/ops/PROGRESS.md` 확인 — 완료/미완료 항목
3. **`03_제품/hagent-os/03_domain/` 작성** — 학원 운영 도메인 문서
4. **`03_제품/hagent-os/04_ai-agents/` 작성** — 에이전트 설계 + k-skill 카탈로그 정본
5. **앱 스켈레톤 착수** — Next.js + Supabase 세팅 (`03_제품/app/`)
6. **k-skill 프로토타입** — `refund-calculator`, `k-education-law-lookup` 등 실제 동작 확인
7. 세션 종료 시 `04_증빙/01_핵심로그/ai-session-intake.csv` append
8. `PROGRESS.md` 업데이트
