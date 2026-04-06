---
tags: [context, plugins]
date: 2026-04-06
---
# 사용 가능한 플러그인 및 스킬

> 이 프로젝트에서 활용 가능한 Claude Code 플러그인과 스킬 목록.
> 팀원이 자신의 환경에도 설치해야 동일하게 사용 가능.

## 설치된 플러그인

| 플러그인 | 버전 | 용도 |
|----------|------|------|
| everything-claude-code | 1.4.1 | 코딩 패턴, 테스트, 아키텍처 |
| superpowers | 5.0.7 | 멀티에이전트 조율, 계획, 코드리뷰 |
| obsidian | 1.0.1 | 옵시디언 볼트 관리 |
| frontend-design | - | 프론트엔드 디자인 생성 |
| ui-ux-pro-max | 2.5.0 | UI/UX 디자인 인텔리전스 |
| figma | 2.0.7 | Figma 디자인-투-코드 |
| context7 | - | 라이브러리 문서 실시간 조회 |
| skill-creator | - | 커스텀 스킬 생성 |
| code-simplifier | 1.0.0 | 코드 품질, 리팩터링 |
| agent-sdk-dev | 1.0.0 | Agent SDK 개발 |

## 이 프로젝트 핵심 스킬

### 기획/전략 단계
- `superpowers:brainstorming` — 아이디어 발산 (창의 작업 전 필수)
- `superpowers:writing-plans` — 구현 계획 수립
- `superpowers:executing-plans` — 계획 실행
- `everything-claude-code:plan` — 리스크 포함 상세 계획

### 디자인 단계
- `frontend-design:frontend-design` — 프로덕션급 프론트엔드
- `ui-ux-pro-max:ui-ux-pro-max` — UI/UX 디자인 인텔리전스
- `figma:figma-use` — Figma 연동 (필수 전제조건)

### 개발 단계
- `everything-claude-code:tdd` — TDD 워크플로우
- `everything-claude-code:e2e` — Playwright E2E 테스트
- `context7` — 프레임워크/라이브러리 문서 조회

### 검증/제출 단계
- `everything-claude-code:security-review` — 보안 점검
- `superpowers:verification-before-completion` — 제출 전 최종 검증
- `superpowers:requesting-code-review` — 코드리뷰

### 옵시디언
- `obsidian:obsidian-cli` — CLI로 볼트 조작
- `obsidian:obsidian-markdown` — 옵시디언 마크다운 문법
- `obsidian:obsidian-bases` — Bases 파일 생성
- `obsidian:json-canvas` — JSON Canvas 생성

### 유틸리티
- `skill-creator:skill-creator` — 커스텀 스킬 생성
- `everything-claude-code:continuous-learning-v2` — 패턴 학습

## 프로젝트 커스텀 스킬

글로벌 플러그인과 별도로, 이 프로젝트 전용 스킬은 `.claude/skills/`에 저장한다.
이 디렉토리는 폴더 복사만으로 다른 컴퓨터에서도 작동한다.

```
.claude/skills/
├── evidence-logger/    (예정) 증빙 자동 기록
├── judge-simulator/    (예정) 심사 시뮬레이션
└── report-generator/   (예정) AI 리포트 생성
```

## 설치 방법

### 원커맨드 설치 (권장)
```bash
cd "2026 제1회 KEG 바이브코딩 콘테스트"
bash .claude/setup.sh
```

### 수동 설치
```bash
claude plugins install everything-claude-code
claude plugins install superpowers
claude plugins install obsidian
claude plugins install frontend-design
claude plugins install ui-ux-pro-max
claude plugins install figma
claude plugins install context7
claude plugins install skill-creator
claude plugins install code-simplifier
```

## 플러그인 버전 스냅샷 (2026-04-06)

| 플러그인 | 버전 | 마켓플레이스 |
|----------|------|-------------|
| everything-claude-code | 1.4.1 | everything-claude-code |
| superpowers | 5.0.7 | claude-plugins-official |
| obsidian | 1.0.1 | obsidian-skills (kepano) |
| frontend-design | unknown | claude-plugins-official |
| ui-ux-pro-max | 2.5.0 | ui-ux-pro-max-skill |
| figma | 2.0.7 | claude-plugins-official |
| context7 | - | claude-plugins-official |
| skill-creator | - | claude-plugins-official |
| code-simplifier | 1.0.0 | claude-plugins-official |
| agent-sdk-dev | 1.0.0 | claude-code-plugins |
