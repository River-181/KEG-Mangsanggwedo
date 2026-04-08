---
tags:
  - area/system
  - type/reference
  - status/active
date: 2026-04-08
up: "[[.agent/AGENTS]]"
aliases:
  - CLAUDE
---
# CLAUDE.md — Claude Code 프로젝트 지시서

Canonical: `.agent/system/`

## 에이전트 시작 프로토콜

**새 세션을 시작할 때 반드시 아래 순서로 읽어라:**

1. **`.agent/system/ops/PLAN.md`** — 지금 무슨 일을 해야 하는지 (우선순위, 역할별 할 일)
2. **`.agent/system/ops/PROGRESS.md`** — 어디까지 진행됐는지 (완료/미완료, 참여 중인 AI 목록)
3. **`.agent/AGENTS.md`** — 공용 시작 프로토콜
4. **`.agent/system/contracts/workspace-contract.md`** — 운영 정본 계약
5. **`.agent/system/contracts/memory-evidence-policy.md`** — 메모리/증빙 규칙
6. **`.agent/system/memory/long-term-memory.md`** — 장기 기억 정본
7. **`.agent/system/memory/daily-memory.md`** — 오늘의 단기 기억
8. **`.agent/system/maps/workspace-atlas.md`** — 구조 지도

**작업 완료 시 반드시:**
- `.agent/system/ops/PROGRESS.md` 업데이트 (완료 항목 체크, 미완료 항목 추가)
- `.agent/system/ops/PLAN.md` 업데이트 (우선순위 변경 있으면)
- `04_증빙/01_핵심로그/master-evidence-ledger.md` 반영
- 필요 시 `decision-log.md` 또는 `prompt-catalog.md` 승격 여부 확인
- Evidence Gate는 필요한 경우에만 확인

---

## 프로젝트 구조

이 문서는 Claude 실행 어댑터다. 공용 규칙의 정본은 `.agent/system/`에 있다.
이 워크스페이스는 옵시디언 볼트이다. 모든 마크다운은 옵시디언 호환으로 작성한다.

```
.agent/system/ops/PLAN.md     ← 실행 계획 (에이전트 필독)
.agent/system/ops/PROGRESS.md ← 진행 상황 (에이전트 필독)
.agent/system/ops/project-manager.md ← 운영 대시보드
00 HOME.md       ← 루트 MOC

01_대회정보/ → 02_전략/ → 03_제품/ → 04_증빙/ → 05_제출/
                                        ↑ 자동 축적
03_제품/app/ — 실제 제품
03_제품/tests/ — 테스트
```

## 멀티에이전트 조율 규칙

- 여러 AI(Claude, GPT, Codex, Perplexity 등)가 동시에 이 워크스페이스에서 작업한다
- **`.agent/system/ops/PROGRESS.md`**가 단일 진실 소스(single source of truth)이다
- 작업 시작 전: `PROGRESS.md`에서 "미완료" 항목 확인 → 중복 작업 방지
- 작업 완료 후: `PROGRESS.md` 업데이트 + `master-evidence-ledger` 반영
- 충돌 발생 시: 사람(이승보 or 김주용)에게 에스컬레이션

## 옵시디언 규칙

- 내부 링크: `[[위키링크]]` 사용 (마크다운 링크 `[]()`는 외부 URL에만)
- 모든 노트에 YAML frontmatter 포함 (최소 `tags`, `date`, `up`)
- 태그: `area/*`, `type/*`, `status/*`, `workflow/*`
- 임베드: `![[파일명]]` 사용
- 강조: `==하이라이트==` 사용 가능
- vault 조작은 가능하면 `obsidian` CLI를 우선 검토
- `.base` 파일은 `obsidian-bases` 규칙으로 처리
- 관련 프로젝트 스킬: `.agent/skills/obsidian-workspace/SKILL.md`

## 자동 로깅 규칙

작업 완료 시 `04_증빙/01_핵심로그/master-evidence-ledger.md`에 세션 블록 1개를 추가:

```
### S-XXX
- DateTime:
- Phase:
- Tool/Client:
- Model:
- Goal:
- What changed:
- Why it mattered:
- Artifacts:
- AI usage strategy:
- Evidence value:
- Report section hint:
- Token note:
- Follow-up:
```

## 사용 가능한 도구

- **MCP 서버**: `.agent/system/registry/mcp-registry.md` 참조
- **플러그인**: `.agent/system/registry/plugins-registry.md` 참조
- **프로젝트 스킬**: `.agent/skills/`, `.agent/system/automation/scripts/`
- **Claude project commands**: `.claude/commands/`
- **에이전트**: `.agent/agents/`

## 포터블 설정

이 워크스페이스는 **독립적으로 작동**해야 한다. 다른 컴퓨터로 옮길 때:
- 글로벌 플러그인: `bash .agent/adapters/claude/setup.sh` 실행
- MCP 서버: `.agent/system/registry/mcp-registry.md` 따라 수동 연결
- 상세 가이드: `.agent/adapters/claude/portable-config.md` 참조

## 코딩 규칙 (TBD)

기술 스택 결정 후 여기에 추가:
- 언어/프레임워크
- 린팅/포매팅
- 테스트 전략
- 배포 방법

## 자주 쓰는 명령어 (TBD)

기술 스택 결정 후 여기에 추가.
