# CLAUDE.md — Claude Code 프로젝트 지시서

## 에이전트 시작 프로토콜

**새 세션을 시작할 때 반드시 아래 순서로 읽어라:**

1. **`PLAN.md`** — 지금 무슨 일을 해야 하는지 (우선순위, 역할별 할 일)
2. **`PROGRESS.md`** — 어디까지 진행됐는지 (완료/미완료, 참여 중인 AI 목록)
3. **`.agent/AGENTS.md`** — 프로젝트 목적, 대회 제약, 역할, 금지사항
4. **`.context/`** — 공유 메모리, 플러그인, MCP, 온보딩

**작업 완료 시 반드시:**
- `PROGRESS.md` 업데이트 (완료 항목 체크, 미완료 항목 추가)
- `PLAN.md` 업데이트 (우선순위 변경 있으면)
- `04_증빙/ai-usage-log.md`에 1줄 append

---

## 프로젝트 구조

이 워크스페이스는 옵시디언 볼트이다. 모든 마크다운은 옵시디언 호환으로 작성한다.

```
PLAN.md          ← 실행 계획 (에이전트 필독)
PROGRESS.md      ← 진행 상황 (에이전트 필독)
00 HOME.md       ← 루트 MOC

01_대회정보/ → 02_전략/ → 03_제품/ → 04_증빙/ → 05_제출/
                                        ↑ 자동 축적
app/ — 실제 제품
tests/ — 테스트
```

## 멀티에이전트 조율 규칙

- 여러 AI(Claude, GPT, Codex, Perplexity 등)가 동시에 이 워크스페이스에서 작업한다
- **PROGRESS.md**가 단일 진실 소스(single source of truth)이다
- 작업 시작 전: PROGRESS.md에서 "미완료" 항목 확인 → 중복 작업 방지
- 작업 완료 후: PROGRESS.md 업데이트 + ai-usage-log append
- 충돌 발생 시: 사람(이승보 or 김주용)에게 에스컬레이션

## 옵시디언 규칙

- 내부 링크: `[[위키링크]]` 사용 (마크다운 링크 `[]()`는 외부 URL에만)
- 모든 노트에 YAML frontmatter 포함 (최소 `tags`, `date`)
- 태그: `#moc`, `#대회정보`, `#전략`, `#제품`, `#증빙`, `#제출`, `#daily` 등
- 임베드: `![[파일명]]` 사용
- 강조: `==하이라이트==` 사용 가능

## 자동 로깅 규칙

작업 완료 시 `04_증빙/ai-usage-log.md`에 1줄 append:

```
| ID | 시각 | Phase | 역할 | 작업 | 환경 | 클라이언트 | 모델 | 입력 | 출력 | 채택 | 이유 | Artifact | 비용구간 |
```

## 사용 가능한 도구

- **MCP 서버**: `.context/mcp-servers.md` 참조
- **글로벌 스킬**: `.context/plugins.md` 참조
- **프로젝트 스킬**: `.claude/skills/` (프로젝트 전용, 폴더 복사로 포터블)
- **에이전트**: `.claude/agents/` (pm, research, judge, evidence 상세 / product, builder, qa, submission 뼈대)

## 포터블 설정

이 워크스페이스는 **독립적으로 작동**해야 한다. 다른 컴퓨터로 옮길 때:
- 글로벌 플러그인: `bash .claude/setup.sh` 실행
- MCP 서버: `.context/mcp-servers.md` 따라 수동 연결
- 상세 가이드: `.claude/portable-config.md` 참조

## 코딩 규칙 (TBD)

기술 스택 결정 후 여기에 추가:
- 언어/프레임워크
- 린팅/포매팅
- 테스트 전략
- 배포 방법

## 자주 쓰는 명령어 (TBD)

기술 스택 결정 후 여기에 추가.
