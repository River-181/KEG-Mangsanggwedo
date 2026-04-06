---
tags:
  - 증빙
  - tools
date: 2026-04-06
---
# 도구 사용 기록

> 이 프로젝트에서 사용하는 모든 AI 도구와 외부 서비스를 기록한다.
> 도구 선택의 근거, 강점/약점, 사용 시점을 추적하여 AI 리포트에 활용.
> 공용 운영 정본은 `.agent/system/registry/*.md`, 도구 계약 정본은 `.agent/system/contracts/tools/*.md`이다.

## AI 도구

| ID    | 도구명         | 카테고리        | 역할           | 환경      | 모델        | 플랜  | 강점                         | 약점          | 언제 쓰나               | 언제 안 쓰나        | 계약 정본                                          | 상태     |
| ----- | ----------- | ----------- | ------------ | ------- | --------- | --- | -------------------------- | ----------- | ------------------- | -------------- | ---------------------------------------------- | ------ |
| T-001 | ChatGPT Web | AI Chat     | 설계/기획        | Web     | GPT-5.4   | Pro | 문제 구조화, 단계 설계 빠름           | 로컬 파일 조작 약함 | 전략, 문서 초안, 방향 설정    | 로컬 수정, 파일 생성   | `.agent/system/contracts/tools/chatgpt-web.md` | Active |
| T-002 | Codex       | AI Agent    | 구현/정리        | Desktop | GPT-5     | App | 로컬 파일, 코드, 검증              | 웹 브라우징 약함   | 산출물 생성, repo 정리, 검증 | 리서치 전용 작업      | `.agent/system/contracts/tools/codex.md`       | Active |
| T-003 | Perplexity  | AI Research | 리서치          | Web     | Search+AI | Pro | 방대한 자료 탐색, 출처 수집           | 출처 품질 편차    | 사례 수집, 경쟁 분석, 참고 링크 | 최종 결정 근거 단독 사용 | `.agent/system/contracts/tools/perplexity.md`  | Active |
| T-004 | Claude Code | AI Agent    | 워크스페이스 구축/코딩 | CLI     | Opus 4.6  | -   | 로컬 파일 완전 제어, MCP, 스킬, 에이전트 | 컨텍스트 소모 큼   | 구조 설계, 코드, 증빙       | 단순 리서치         | `.agent/system/contracts/tools/claude-code.md` | Active |

## 외부 도구/서비스

| ID    | 도구명            | 카테고리   | 용도                | 연결 방법      | 상태          |
| ----- | -------------- | ------ | ----------------- | ---------- | ----------- |
| E-001 | Obsidian       | 지식관리   | 볼트 + MOC + 노트     | CLI + App  | Active      |
| E-002 | Excalidraw MCP | 다이어그램  | 아키텍처 시각화          | MCP 서버     | Active      |
| E-003 | Notion MCP     | 프로젝트관리 | 외부 공유용            | MCP 서버     | Active      |
| E-004 | context7 MCP   | 문서조회   | 라이브러리 문서          | MCP 서버     | Active      |
| E-005 | Magic Patterns | UI     | 컴포넌트 생성           | MCP 서버     | Standby     |
| E-006 | Figma MCP      | 디자인    | 디자인→코드            | MCP 서버     | Standby     |
| E-007 | GitHub         | 코드관리   | public repo (제출용) | git init 시 | Not Started |
