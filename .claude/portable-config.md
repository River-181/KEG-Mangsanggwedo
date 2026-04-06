---
tags:
  - config
  - portable
date: 2026-04-06
---
# 포터블 설정 가이드

> 이 워크스페이스를 다른 컴퓨터로 옮길 때 참고.

## 이 프로젝트 안에 포함된 것 (폴더 복사만으로 작동)

| 항목 | 위치 | 설명 |
|------|------|------|
| 에이전트 페르소나 | `.claude/agents/` | 8개 역할 정의 |
| 프로젝트 규칙 | `.claude/rules/` | 옵시디언, 로깅, 대회 제약 |
| 프로젝트 설정 | `.claude/settings.json` | 환경변수 (마감일 등) |
| 커스텀 스킬 | `.claude/skills/` | 프로젝트 전용 스킬 |
| CLAUDE.md | `.claude/CLAUDE.md` | Claude Code 진입점 |
| 에이전트 공용 | `.agent/AGENTS.md` | 모든 AI 에이전트 진입점 |
| 에이전트 공용 규칙 | `.agent/rules/` | 에이전트 중립 규칙 |
| 공유 메모리 | `.context/memory/` | 팀 공유 맥락 |
| 플러그인 목록 | `.context/plugins.md` | 필요한 플러그인 사양 |
| MCP 서버 목록 | `.context/mcp-servers.md` | MCP 설정 가이드 |
| 온보딩 | `.context/onboarding.md` | 새 팀원 안내 |
| 옵시디언 설정 | `.obsidian/` | 볼트 설정 |

## 새 컴퓨터에서 추가 설치 필요한 것

### 1. Claude Code 플러그인 (원커맨드)
```bash
cd "2026 제1회 KEG 바이브코딩 콘테스트"
bash .claude/setup.sh
```

### 2. MCP 서버 (수동 연결)
`.context/mcp-servers.md` 참조. OAuth 인증이 필요한 서버들:
- Notion, Gmail, Google Calendar, Figma, Magic Patterns
- 각 서버는 Claude Code Settings에서 연결

### 3. 옵시디언
- Obsidian 앱 설치
- 이 폴더를 볼트로 열기
- `.obsidian/` 설정이 이미 포함되어 있으므로 플러그인/테마 자동 적용

## 포터블 원칙

1. **프로젝트 안에 있는 것은 복사만으로 작동한다**
2. **글로벌 설치가 필요한 것은 `setup.sh`로 자동화한다**
3. **OAuth/인증이 필요한 것은 `mcp-servers.md`에 가이드를 둔다**
4. **개인 로컬(`~/`)에 종속되는 설정은 만들지 않는다**
