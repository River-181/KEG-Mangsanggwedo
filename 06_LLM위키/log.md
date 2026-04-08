---
tags:
  - area/wiki
  - type/log
  - status/active
date: 2026-04-08
up: "[[_06_LLM위키_MOC]]"
aliases:
  - llm-wiki-log
---
# LLM Wiki Log

> Karpathy 스타일 append-only chronological log.

## [2026-04-08] bootstrap | LLM Wiki skeleton introduced

- action: bootstrap
- reason: Karpathy `LLM Wiki` 방법론을 현재 워크스페이스에 맞게 삽입하기 위한 초기 골격 생성
- touched:
	- [[index]]
	- [[schema]]
	- [[overview]]
	- [[karpathy-llm-wiki-adaptation]]
- next:
	- 기존 전략 문서 ingest
	- 첫 entity / concept / problem page 생성

## [2026-04-08] ingest | 전략 문서 + 도메인 조사 3종 첫 위키 반영

- action: ingest
- reason: `02_전략` 문서 2개와 외부 도메인 조사 3개를 source summary와 reusable topic page로 전환
- touched:
	- [[계보_포지셔닝_분석_요약]]
	- [[기관_분석_및_심사_전략_요약]]
	- [[도메인_지식_조사_01_요약]]
	- [[도메인_지식_조사_02_요약]]
	- [[도메인_지식_조사_03_요약]]
	- [[KEG_심사_문법]]
	- [[교육_도메인_언어_지도]]
	- [[에듀테크_학습설계_원칙]]
	- [[코리아IT아카데미]]
	- [[코리아교육그룹]]
	- [[교육혁신위원회]]
	- [[문제정의는_교육현장_실무_마찰에서_출발해야_한다]]
	- [[KEG는_교육실증형_AI_MVP_콘테스트다]]
	- [[전신_대회와_KEG_바이브코딩의_차이]]
	- [[index]]
	- [[overview]]
- next:
	- `problem-bank` ingest 후 문제 후보별 page 생성
	- `vibe_contest_master_playbook_v0_1`에서 execution doctrine 추출
