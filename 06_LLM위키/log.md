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

## [2026-04-09] ingest | research-results raw mirror + 1차 승격 후보 정리

- action: ingest
- reason: `02_전략/research-results/`를 LLM wiki source corpus로 복제하고, 학원 운영 도메인에서 재사용 가치가 높은 주제를 먼저 승격
- touched:
	- [[research-results_소스_허브]]
	- `06_LLM위키/sources/research-results/` 전체 raw mirror
	- [[학원_운영은_정규루틴보다_예외처리가_본체다]]
	- [[운영_케이스_OS가_화이트스페이스다]]
	- [[학원_운영_데이터_자산화_우선순위]]
	- [[운영자_모드_vs_담임_모드]]
	- [[research-results_위키_승격_후보]]
	- [[index]]
	- [[overview]]
- next:
	- `legal-requirements` 기반 approval flow concept 생성
	- `P-001/P-004/X-001` 기반 현장 발화 problem note 생성
