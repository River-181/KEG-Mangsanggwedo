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

## [2026-04-09] ingest | 기록관 라운드 추가 승격

- action: ingest
- reason: `research-results`에서 바로 제품/심사/문제정의에 영향을 주는 주제를 기록관 시점에서 추가 승격
- touched:
	- [[학원_운영의_승인지점과_approval_flow]]
	- [[민원_대응은_첫_MVP_후보다]]
	- [[재등록과_이탈_방어는_두번째_강한_MVP_후보다]]
	- [[현장_발화는_문제정의의_강한_근거다]]
	- [[기록관_추가_위키_후보_카탈로그]]
	- [[index]]
	- [[overview]]
- next:
	- `공교육 vs 사교육 민원 체계` comparison 생성
	- `업종별 운영 리스크 맵` concept 생성

## [2026-04-09] ingest | 운영 체계 비교와 업종 리스크 맵 추가

- action: ingest
- reason: 구조 비교와 domain pack 후보를 위키에서 바로 조회할 수 있게 만들기 위함
- touched:
	- [[공교육_vs_사교육_민원과_행정_체계]]
	- [[업종별_학원_운영_리스크_맵]]
	- [[기록관_추가_위키_후보_카탈로그]]
	- [[index]]
	- [[overview]]
- next:
	- `P-004` 기반 운영자/교사 pain top list 생성
	- `X-001` 기반 현장 발화 샘플 뱅크 생성

## [2026-04-09] ingest | pain top10, field quote bank, skill/MCP map 추가

- action: ingest
- reason: `P-004`, `X-001`, `R-010`에서 반복 조회될 가능성이 높은 문제 우선순위, 현장 발화, 도구 연동 후보를 reusable wiki page로 승격
- touched:
	- [[운영자와_교사의_현장_pain_top10]]
	- [[현장_발화_샘플_뱅크]]
	- [[학원_운영_k-skill_및_MCP_후보_맵]]
	- [[기록관_추가_위키_후보_카탈로그]]
	- [[index]]
	- [[overview]]
- next:
	- `legal-requirements` 기반 법규 체크리스트 생성
	- `G-004/G-005` 기반 자동화 대상 업무 분해와 cross-domain synthesis 추가

## [2026-04-09] skill | wiki candidate harvest 생성 및 실사용

- action: skill-create-and-use
- reason: 프로젝트 내부에서 LLM wiki 승격 후보를 반복적으로 찾는 작업을 재사용 가능한 skill로 고정
- touched:
	- `.agent/skills/wiki-candidate-harvest/SKILL.md`
	- `.agent/skills/wiki-candidate-harvest/scripts/scan_candidates.py`
	- `.agent/skills/wiki-candidate-harvest/references/candidate-signals.md`
	- `.agent/skills/README.md`
	- `.agent/system/registry/skills-registry.md`
	- [[프로젝트_지식화_후보_스캔]]
- next:
	- `problem-scorecard`, `problem-bank`, `playbook` 순으로 wiki 승격
