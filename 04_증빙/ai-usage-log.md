---
tags:
  - 증빙
  - log
date: 2026-04-06
---
# AI 사용 기록

> append-only. 삭제 금지. 에이전트는 작업 완료 시 여기에 1줄 추가.
> 컬럼 확장: 8컬럼 → 14컬럼 (DEC-004, 다중 AI 추적용)

## 2026-04-06

| ID | 시각 | Phase | 역할 | 작업 | 환경 | 클라이언트 | 모델 | 입력 | 출력 | 채택 | 이유 | Artifact | 비용구간 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| U-001 | - | Contest Research | Research | 대회 개요 정리 | Web | ChatGPT | GPT-5.4 | 공식 URL | 바이브코딩공모전_공지.md 초안 | O | 대회 기본 이해 | A-001 | 정액 |
| U-002 | - | Win Strategy | Planning | 준비 단계 분해 | Web | ChatGPT | GPT-5.4 | 홍보 PDF 2종 | 단계별 실행안 | O | 전략 로드맵 출발점 | - | 정액 |
| U-003 | - | Workspace Setup | Ops | 운영 문서 통합 | Web | ChatGPT | GPT-5.4 | 이전 단계 결과 | 플레이북 v0.1 | O | 재현 가능한 운영체계 | A-003 | 정액 |
| U-004 | - | Agent Ops Setup | Ops | 프롬프트 트래커 생성 | Web | ChatGPT | GPT-5.4 | 대회 요구사항 | KEG_AI_Prompt_Tracker.xlsx | O | 40컬럼 정밀 기록 | A-002 | 정액 |
| U-005 | 14:00 | Workspace Setup | Research | 대회 공지 → 완전 개요서 | CLI | Claude Code | Opus 4.6 | 공지.md, 이메일 PDF, 홍보자료 2건 | 바이브코딩공모전_공지.md (통합) | O | 모든 소스 통합 | - | ~$1 |
| U-006 | 15:00 | Workspace Setup | PM | 디렉토리 구조 설계 | CLI | Claude Code | Opus 4.6 | 플레이북, 대회 개요서 | 11개 디렉토리 + 파일 이동 | O | 옵시디언+에이전트 친화적 | - | ~$1 |
| U-007 | 15:30 | Workspace Setup | PM | MOC 6개 + AGENTS.md + CLAUDE.md | CLI | Claude Code | Opus 4.6 | 디렉토리 구조 | 6 MOC + 에이전트 설정 전체 | O | 탑다운 색인 | - | ~$1 |
| U-008 | 16:00 | Agent Ops Setup | PM | 에이전트 8개 정의 | CLI | Claude Code | Opus 4.6 | 플레이북 에이전트 제안 | .claude/agents/ 8개 파일 | O | 역할 기반 분리 | - | ~$0.5 |
| U-009 | 16:30 | Workspace Setup | PM | PM 대시보드 생성 | CLI | Claude Code | Opus 4.6 | 플레이북 일정 | project-manager.md + .base | O | 간트차트+태스크트래커 | - | ~$1 |
| U-010 | 17:00 | Workspace Setup | Evidence | 플레이북+엑셀 분석 | CLI | Claude Code | Opus 4.6 | 플레이북 전문, 엑셀 5시트 | evidence-system-improvement-analysis.md | O | 증빙 아키텍처 비전 | - | ~$1 |
| U-011 | 17:15 | Workspace Setup | PM | Plan 문서 보존 | CLI | Claude Code | Opus 4.6 | ~/.claude/plans/ | workspace-structuring-plan.md | O | 중요 자료 보존 | - | ~$0.2 |
| U-012 | 17:20 | Workspace Setup | PM | 포터블 환경 구축 | CLI | Claude Code | Opus 4.6 | 플러그인 설정 | setup.sh + skills/ + portable-config | O | 독립성 확보 | - | ~$0.5 |
| U-013 | - | Workspace Setup | Judge | 워크스페이스 평가 | Desktop | Codex | GPT-5 | 전체 워크스페이스 | 평가서 (A-/C/B) | O | 약점 식별 | - | 정액 |
| U-014 | 17:30 | Workspace Setup | PM | Codex 평가 통합 + 멀티에이전트 조율 | CLI | Claude Code | Opus 4.6 | Codex 평가 | PROGRESS.md, PLAN.md, 증빙 4파일 | O | 다중 AI 동기화 | - | - |
| U-015 | 18:00 | Workspace Setup | Evidence | 토큰 통계 자동화 + 아키텍처 시각화 | CLI | Claude Code | Opus 4.6 | JSONL 세션 데이터 | collect-usage-stats.py, ai-usage-stats.md(실측치), Excalidraw 아키텍처 | O | 구체적 수치 증빙 | Excalidraw | - |
