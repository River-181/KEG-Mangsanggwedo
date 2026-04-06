---
description: 자동 로깅 규칙 — 모든 에이전트가 작업 완료 시 증빙에 기록
---

# 로깅 규칙

## 언제 기록하는가

의미 있는 작업을 완료했을 때 `04_증빙/ai-usage-log.md`에 1줄 append한다.
"의미 있는 작업" = 파일을 생성/수정했거나, 의사결정에 영향을 준 분석을 수행한 경우.

## 기록 형식 (14컬럼)

```
| ID | 시각 | Phase | 역할 | 작업 | 환경 | 클라이언트 | 모델 | 입력 | 출력 | 채택 | 이유 | Artifact | 비용구간 |
```

- **ID**: U-NNN (순번)
- **Phase**: Contest Research / Win Strategy / Workspace Setup / Agent Ops Setup / Problem Research / Implementation / QA / Submission
- **환경**: Web / CLI / Desktop / IDE
- **클라이언트**: Claude Code / ChatGPT / Codex / Perplexity / Cursor 등
- **비용구간**: 정액 / ~$0.5 / ~$1 / ~$2 / ~$5 등

## 의사결정 기록

범위, 기술, 디자인 관련 결정은 `04_증빙/decision-log.md`에 DEC-NNN 형식으로 기록.

## 프롬프트 기록

재사용 가치가 있는 프롬프트는 `04_증빙/prompt-catalog.md`에 P-NNN 형식으로 기록.

## 세션 기록

대화 세션 시작/종료 시 `04_증빙/session-log.md`에 1줄 append.

## 시스템 진화 기록

워크스페이스 구조/규칙/도구에 변경이 있을 때 `04_증빙/evolution-log.md`에 1줄 append.

## 통계 자동 업데이트

### 자동 집계 명령어
```bash
python3 .claude/skills/collect-usage-stats.py
```
이 스크립트는 `~/.claude/projects/` 의 JSONL 세션 파일에서 토큰/비용/효율 지표를 자동 추출한다.
수집 항목: 세션 수, 메시지 수, 도구 호출, 작업 시간, 토큰 (입력/캐시생성/캐시읽기/출력), 비용 (항목별), 효율 지표 (캐시 히트율, 메시지당 비용, 시간당 비용)

### PM Agent / Evidence Agent 매일 밤 루틴
1. `python3 .claude/skills/collect-usage-stats.py` 실행
2. 결과를 `04_증빙/ai-usage-stats.md`의 Claude Code 섹션에 반영
3. 외부 AI (ChatGPT, Codex, Perplexity) 사용분은 수동으로 추가
4. 일별 추이 테이블 업데이트
5. 리포트용 시각화 데이터 갱신

이 통계는 AI 리포트의 "AI 활용 통계" 섹션에 직접 삽입된다.
