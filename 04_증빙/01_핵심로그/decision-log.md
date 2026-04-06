---
tags:
  - 증빙
  - decision
date: 2026-04-06
---
# 의사결정 기록

> DEC-NNN 형식. 모든 범위/기술/디자인 결정을 기록.

## DEC-001: 워크스페이스 구조 — 옵시디언 볼트 기반 평탄 구조
- 날짜: 2026-04-06
- 결정: 루트에 번호 폴더 5개(01~05) + assets/app/tests 평탄 구조 채택
- 대안: 플레이북 제안 docs/ 하위 8개 폴더 중첩 구조
- 근거: 옵시디언 탐색/그래프뷰 최적화, 한국어 디렉토리명으로 사람 친화성
- AI 역할: Claude Opus가 구조 설계, Plan agent가 상세 검토
- 영향: 모든 MOC, 에이전트 참조 경로에 반영

## DEC-002: .cursor/ 대신 .agent/ 사용
- 날짜: 2026-04-06
- 결정: 에이전트 공용 설정 디렉토리를 `.agent/`로 명명
- 대안: `.cursor/rules/` (Cursor IDE 전용)
- 근거: 사용자 지시 — 특정 도구에 종속되지 않는 에이전트 중립 공간
- AI 역할: 사용자가 직접 결정
- 영향: AGENTS.md와 공용 규칙이 .agent/에 위치

## DEC-003: 공유 맥락을 .context/에 배치
- 날짜: 2026-04-06
- 결정: 메모리, 플러그인 목록, MCP 설정을 프로젝트 내 `.context/`에 저장
- 대안: 개인 로컬 `~/.claude/memory/`에만 저장
- 근거: 다른 팀원도 동일한 맥락을 공유해야 함 — 독립적 공간 원칙
- AI 역할: 사용자가 지적 → Claude가 구현
- 영향: 모든 팀원·에이전트가 동일 맥락에서 작업 가능

## DEC-004: 엑셀 트래커 → 마크다운 전환 결정
- 날짜: 2026-04-06
- 결정: KEG_AI_Prompt_Tracker.xlsx의 40컬럼 스키마를 마크다운 증빙 시스템으로 전환
- 대안: 엑셀 계속 사용
- 근거: AI 에이전트 자동 append 불가, git diff 불가, 옵시디언 연동 불가
- AI 역할: Claude Opus가 스키마 분석 → 마크다운 전환 설계
- 영향: ai-usage-log 컬럼 확장, session-log/tool-log/evolution-log 신규 생성 예정

## DEC-005: 포터블 스킬 공간 (.claude/skills/) 도입
- 날짜: 2026-04-06
- 결정: 프로젝트 전용 커스텀 스킬을 `.claude/skills/`에, 글로벌 플러그인은 `setup.sh`로 원커맨드 설치
- 대안: 글로벌 설치에만 의존
- 근거: 사용자 지시 — "이 폴더를 다른 컴퓨터에 옮겨도 그대로 작동해야 한다"
- AI 역할: 사용자가 지시 → Claude가 구현
- 영향: setup.sh, portable-config.md, skills/ 디렉토리 생성

## DEC-006: PLAN.md + PROGRESS.md 멀티에이전트 조율 체계 도입
- 날짜: 2026-04-06
- 결정: 루트에 PLAN.md(할 일)와 PROGRESS.md(진행상황)를 두고, 모든 에이전트가 시작 시 읽도록 CLAUDE.md + AGENTS.md에 프로토콜 추가
- 대안: 각 에이전트가 독립적으로 작업 (동기화 없음)
- 근거: Codex 평가 "다중 AI 맥락 유실 위험" + 사용자 지시 "에이전트가 새로 시작할 때 무슨 일을 해야 하는지 알 수 있게"
- AI 역할: 사용자 + Codex 지적 → Claude 구현
- 영향: 모든 AI가 현재 상태와 할 일을 즉시 파악 가능

## DEC-007: `.agent/system/`을 공용 운영 정본으로 채택
- 날짜: 2026-04-06
- 결정: 공용 운영 계약, 메모리, 레지스트리, 맵, 시스템 로그를 `.agent/system/` 아래에서 관리
- 대안: 루트 `system/` 디렉토리 생성, `.context/` 유지
- 근거: 사용자 지시 — 공용 정보가 `.agent` 아래에 모여야 인지 부조화와 정합성 문제가 줄어듦
- AI 역할: 사용자 방향 제시 → Codex 설계/구현
- 영향: `.claude`는 미러/어댑터, `.context`는 과도기 리다이렉션으로 재정의

## DEC-008: `04_증빙/`을 AI 리포트 재료 정본으로 확정
- 날짜: 2026-04-06
- 결정: 리포트, 회고, 결과보고서에 사용할 사실과 근거는 최종적으로 반드시 `04_증빙/`에 존재해야 함
- 대안: 메모리 정본 후 리포트 직전 일괄 이관
- 근거: 사용자 지시 — 메모리에만 있고 증빙에 없는 누락을 허용하면 리포트 품질이 무너짐
- AI 역할: 사용자 방향 제시 → Codex 정책화
- 영향: 세션 종료 시 Evidence Gate 필수, `Pending Evidence` 상태 도입

## DEC-009: 루트 최소화, `.context` 제거, `.claude` 최소 어댑터화
- 날짜: 2026-04-06
- 결정: 운영 파일은 `.agent/system/ops/`로 이동하고, `.claude/agents`, `.claude/rules`, `.claude/skills`는 `.agent/`로 흡수하며, `.context/`는 제거
- 대안: 기존 루트 `PLAN.md`, `PROGRESS.md`, `project-manager.md` 유지 + `.context` 리다이렉션 유지
- 근거: 사용자 지시 — 루트 혼란을 줄이고, 모든 실질 운영 자산을 `.agent`로 수렴해야 함
- AI 역할: 사용자 방향 제시 → Codex가 물리 이동과 경로 정합성 수정 수행
- 영향: 루트는 사람용 진입점 위주로 단순화, `.claude`는 최소 호환 레이어만 유지, 제품 구현 공간은 `03_제품/app`, `03_제품/tests`로 정리

## DEC-010: memory/maps/evidence를 초심자 기준으로 단순화
- 날짜: 2026-04-06
- 결정: memory는 `MEMORY.md + long-term-memory.md + daily-memory.md` 3파일로, maps는 `workspace-atlas.md` 1파일로, 증빙은 `01_핵심로그 / 02_분석자료 / 03_daily` 3구역으로 정리
- 대안: 기존 분할 구조 유지
- 근거: 사용자 지시 — 처음 보는 사용자도 바로 이해할 수 있어야 하고 파일 수를 줄여야 함
- AI 역할: 사용자 방향 제시 → Codex가 통합 구조 설계, 파일 이동, 경로 정합성 수정, `workspace-sync` 스킬 생성
- 영향: 운영 구조 학습 비용 감소, 세션 종료 동기화 경로 명확화, AI 리포트 재료와 장기 기억 구분 개선

## DEC-011: GitHub 운영을 프로젝트 스킬로 표준화
- 날짜: 2026-04-06
- 결정: commit, push, PR, issue, release, tag 작업을 `github-workflow` 프로젝트 스킬로 표준화
- 대안: GitHub 작업을 매번 ad-hoc으로 처리
- 근거: 사용자 요청 — GitHub 전반 작업도 워크스페이스 규칙과 증빙 흐름 안에서 일관되게 운영할 필요가 있음
- AI 역할: Codex가 skill-creator 원칙에 따라 스킬 설계 및 registry 반영
- 영향: GitHub 작업이 Evidence Gate, 로그, 운영 문서와 연결되며 반복 작업 품질이 안정화됨

## DEC-012: 문서 레이어를 Obsidian vault 기준으로 공식화
- 날짜: 2026-04-06
- 결정: 이 저장소의 note, MOC, daily, `.base` 파일은 일반 Markdown이 아니라 Obsidian 자산으로 취급하고, 관련 작업은 `obsidian-cli`, `obsidian-markdown`, `obsidian-bases` 및 `obsidian-workspace` 스킬 기준으로 수행
- 대안: 문서를 일반 Markdown처럼 다루고 Obsidian 규칙은 느슨한 권고 수준으로 유지
- 근거: 사용자 지시 — 이 불렛은 옵시디언이며, 옵시디언의 규칙과 사용법을 전제로 해야 하고 관련 스킬을 사용해야 함
- AI 역할: Codex가 `obsidian --help`로 CLI 가용성 확인 후 공용 문서와 프로젝트 스킬에 Obsidian-first 규칙 반영
- 영향: vault note 품질, wikilink 일관성, `.base` 파일 처리, MOC 갱신 기준이 명확해짐

## DEC-013: Claude command layer는 얇게 두고, 실제 로직은 agents/skills를 재사용
- 날짜: 2026-04-06
- 결정: Claude Code용 project commands는 `.claude/commands/`에 6개만 두고, 각 command는 기존 `.agent/agents/`와 `.agent/skills/`를 읽어 재사용하는 얇은 entrypoint로 설계
- 대안: command를 대량 생성하거나, command 안에 긴 운영 로직을 직접 중복 기입
- 근거: 사용자 요청 — command key 구조를 조사한 뒤 필요한 것들을 정확한 포맷으로 만들 것. 동시에 현재 워크스페이스는 정본 중복과 구조 비대화를 피해야 함
- AI 역할: Codex가 공식 command 구조를 확인하고 runtime command + command stack registry를 설계/작성
- 영향: Claude runtime 접근성이 좋아지면서도 공용 정본은 `.agent/system/`과 `.agent/skills/`에 유지됨
