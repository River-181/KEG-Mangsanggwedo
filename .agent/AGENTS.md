# AGENTS.md — 에이전트 공용 진입점

> 이 문서는 모든 AI 에이전트(Claude Code, Cursor, Copilot, ChatGPT 등)가 이 프로젝트에서 **가장 먼저** 읽어야 하는 문서다.

> 공용 운영 정본:
> - `.agent/system/contracts/workspace-contract.md`
> - `.agent/system/contracts/memory-evidence-policy.md`
> - `.agent/system/memory/long-term-memory.md`
> - `.agent/system/maps/workspace-atlas.md`

> 이 저장소는 일반 Markdown 폴더가 아니라 **Obsidian vault**다.
> 노트, 링크, MOC, `.base` 파일은 모두 Obsidian 규칙으로 다뤄야 한다.

## 에이전트 시작 프로토콜

**새 세션을 시작할 때 반드시 아래 순서로 읽어라:**

1. **`.agent/system/ops/PLAN.md`** — 지금 무슨 일을 해야 하는지
2. **`.agent/system/ops/PROGRESS.md`** — 어디까지 진행됐는지
3. **이 파일** (`AGENTS.md`) — 공용 시작 규칙
4. **`.agent/system/contracts/workspace-contract.md`** — 정본/문서 책임 범위
5. **`.agent/system/contracts/memory-evidence-policy.md`** — 메모리/증빙 동기화 규칙
6. **`.agent/system/memory/long-term-memory.md`** — 장기 기억 정본
7. **`.agent/system/memory/daily-memory.md`** — 오늘의 단기 기억
8. **`.agent/system/maps/workspace-atlas.md`** — 구조와 갱신 지도
9. **`.agent/rules/obsidian-conventions.md`** — Obsidian 문서 규칙

**작업 완료 시 반드시:**
- `.agent/system/ops/PROGRESS.md` 업데이트
- `04_증빙/01_핵심로그/session-log.md` 반영 필요 여부 확인
- `04_증빙/01_핵심로그/ai-usage-log.md`에 1줄 append
- Evidence Gate 통과 여부 확인

## Obsidian First 원칙

- 내부 문서는 일반 Markdown이 아니라 Obsidian note로 작성한다.
- 내부 링크는 `[[wikilink]]`, 임베드는 `![[embed]]`를 사용한다.
- 노트를 만들거나 구조를 바꿀 때는 `obsidian-cli` 사용을 우선 검토한다.
- `.base` 파일은 `obsidian-bases` 규칙으로 다룬다.
- Obsidian 관련 작업은 필요 시 글로벌 `obsidian-cli`, `obsidian-markdown`, `obsidian-bases` 스킬과 프로젝트 스킬 `.agent/skills/obsidian-workspace/SKILL.md`를 따른다.

---

## 프로젝트 목적

2026 제1회 KEG 바이브코딩 콘테스트(4/6~4/13, 7일) 참가. AI 도구를 활용해 교육 현장의 페인포인트를 해결하는 MVP를 기획·구현·배포한다. 500팀 경쟁. 총 상금 600만원.

## 대회 제약

| 항목 | 내용 |
|------|------|
| 마감 | 2026-04-13 24:00 (이후 커밋 = 부정행위 → 탈락) |
| 주제 | AI활용 차세대 교육 솔루션 (단순 LMS 금지) |
| 제출물 | GitHub(public) + 라이브 URL + AI 리포트(양식) + 동의서/각서 |
| 심사 | 기술적 완성도, AI활용 능력/효율성, 기획력/실무접합성, 창의성 |
| 핵심 권장 | AI 기획문서·지침서를 프로젝트 내부에 포함 |

## 현재 우선순위

1. 문제 리서치 및 아이디어 선정
2. 기술 스택 결정
3. MVP 스코프 확정

> ⚠️ 이 섹션은 팀이 수동으로 업데이트한다.

## 디렉토리 맵

```
01_대회정보/  — 대회 개요서, 팀 프로필, 홍보자료
02_전략/      — 플레이북, 분석, 의사결정
03_제품/      — 문제정의, 페르소나, 아키텍처, 데모
04_증빙/      — AI 사용 로그, 결정 기록, 프롬프트, 데일리 노트
05_제출/      — AI 리포트, 체크리스트, 회고
assets/       — 원본 파일, 스크린샷, 데모 영상
.agent/       — 에이전트 공용 설정과 운영 정본
  ├─ agents/  — 역할별 에이전트 정의
  ├─ rules/   — 공용/도구 규칙
  ├─ skills/  — 프로젝트 전용 스킬
  ├─ adapters/claude/ — Claude 전용 어댑터 자산
  └─ system/  — 공용 운영 정본 (계약, 메모리, 레지스트리, 맵, 로그, ops)
.claude/      — 최소 Claude 어댑터 (`CLAUDE.md`, `settings.json`)
```

## 에이전트 역할

| 역할 | 미션 | 읽는 파일 | 쓰는 파일 |
|------|------|-----------|-----------|
| PM | 우선순위, blocker, 진행 추적 | 00 HOME, 04_증빙/03_daily | 00 HOME, 04_증빙/03_daily |
| Research | 문제 리서치, 경쟁 분석 | 01_대회정보, 02_전략 | 02_전략, 04_증빙 |
| Product | 문제 정의, 페르소나, 스펙 | 02_전략 | 03_제품 |
| Builder | 구현, 코드 생성 | 03_제품 | 03_제품/app/, 03_제품/tests/ |
| QA | 테스트, 엣지케이스 | 03_제품/app/, 03_제품/tests/ | 04_증빙/01_핵심로그 |
| Judge | 심사위원 시뮬레이션 | 전체 | 04_증빙/02_분석자료 |
| Evidence | AI 사용 기록 정리 | 대화 로그 | 04_증빙/01_핵심로그 |
| Submission | 제출물 패키징 | 04_증빙, 03_제품 | 05_제출, README |

## 핸드오프 계약

모든 에이전트 출력은 최소한 아래 6개 블록을 포함한다:

```
[Task] — 수행한 작업
[Assumptions] — 전제한 가정
[Inputs used] — 참조한 자료
[Output] — 산출물
[Open risks] — 미해결 위험
[Next recommended action] — 다음 추천 행동
```

## 금지사항

1. **Day 3(04-09) 이후 새 기능 추가 금지** — 안정화와 증빙에 집중
2. **증빙 파일 삭제 금지** — `04_증빙/`의 파일은 append-only
3. **시크릿 커밋 금지** — API Key, 비밀번호 등을 코드에 포함하지 않음
4. **`assets/originals/` 수정 금지** — 원본 보관용
5. **최종 범위 결정, 삭제 결정, 제출 결정은 반드시 사람이 한다**
6. **공용 운영 규칙을 `.claude`에서 먼저 수정 금지**
7. **증빙 가치가 있는 사실을 메모리에만 두고 세션 종료 금지**

## 의사결정 권한

| 결정 | 권한 |
|------|------|
| 아이디어/기능 범위 | 사람만 |
| 기술 스택 선택 | 사람만 |
| 코드 구현 방식 | 에이전트 제안 → 사람 승인 |
| 버그 수정 | 에이전트 자율 |
| 증빙 기록 | 에이전트 자율 |
| 파일 삭제 | 사람만 |
| 제출 | 사람만 |
