---
tags:
  - area/product
  - type/archive
  - status/archived
date: 2026-04-12
up: "[[03_제품/archive/research/README]]"
aliases:
  - gap-analysis
  - 갭분석
---
# Paperclip vs HagentOS — 제출 직전 갭 분석

> [!warning]
> archive 문서. 현재 비교 정본은 [[03_제품/hagent-os/_research/gap-analysis-paperclip-vs-hagent]]다.

> 기준 레포: `/Users/river/workspace/active/hagent-os`
> 기준 날짜: `2026-04-12`
> 기준 화면/문서: `paperclip-analysis`, `08_PAPERCLIP-CLONE-SPEC`, `http://127.0.0.1:3101/CMP`
> 목적: 제출 직전 기준으로 `closed / partial / open`을 명확히 구분하고, 남은 실사용 갭만 추린다.

## 상태 기준

- `closed`: 제품 안에서 실제 동작 확인 완료
- `partial`: 구조는 구현됐지만 `live env`, `provider`, `운영 polish`가 부족함
- `open`: 아직 구현되지 않았거나 핵심 경로가 비어 있음

---

## 현재 총평

HagentOS는 더 이상 `mock UI` 단계가 아니다. 현재는 아래 루프가 실제로 돈다.

- `Kakao / Telegram inbound -> case 생성 또는 append -> agent run -> approval -> document -> follow-up`
- `instruction -> project -> child cases -> outputs`
- `skill package registry -> mounted skill -> runtime prompt injection`

다만 Paperclip 대비 제출 직전 핵심 갭은 여전히 세 가지다.

1. `Codex live`와 `법령 조회 live`가 아직 env 부재로 degraded 상태
2. `Kakao outbound`는 operator bridge는 되지만 auto provider는 미연동
3. `operator shell`은 이번에 1차 정렬이 들어갔지만, 학생/일정/케이스 drill-down과 live 실행 polish는 아직 partial

---

## 갭 표

| ID | 항목 | 상태 | 현재 HagentOS | 실제 확인 근거 | 남은 갭 |
|---|---|---|---|---|---|
| G1 | 에이전트 실제 실행 | partial | `orchestrator / complaint / retention / scheduler`가 실제 run, approval, document를 생성 | `/api/channels/kakao`, `/api/channels/telegram`, `/api/projects/from-instruction`, `CaseDetail`, `ProjectDetail` 확인 | `OPENAI_API_KEY`가 없어 `Codex live` 미검증 |
| G2 | Inbound Ops control surface | closed | `Inbox`에 replay, recent inbound, pending outbound, channel health 존재 | `/탄자니아-영어학원-데모-7/inbox` 브라우저 확인 | live production queue polish만 남음 |
| G3 | Instructions 분리 구조 | partial | 에이전트 설정/런타임은 조정 가능, 하지만 Paperclip식 `SOUL / HEARTBEAT / AGENTS / TOOLS` 완전 분리는 아직 아님 | `AgentDetail`, `server/data/agents/*/SOUL.md` | 편집 UX와 heartbeat 문서화 미완 |
| G4 | 일일 메모리 / 장기 메모리 | open | activity/comment/document는 있으나 agent memory system은 없음 | 별도 memory layer 없음 | 대회 제출 범위 밖으로 미룸 가능 |
| G5 | Run transcript surface | partial | run + approval + document + activity는 보이지만 Paperclip식 chat transcript는 아님 | `CaseDetail`, `Approvals`, `documents` 확인 | transcript UX 개선 필요 |
| G6 | Budget 실제 집행 | open | 예산/비용 화면은 있으나 run 차단 거버넌스는 없음 | `costs` 화면 존재, enforcement 없음 | post-submission 후보 |
| G7 | Configuration / connection test | closed | agent model 설정, adapter test, Settings 저장 가능 | `Settings`, `AgentDetail`, `POST /api/adapters/test` | live key만 넣으면 검증 가능 |
| G8 | Routine -> work 연결 | partial | inbound / project trigger는 work와 연결, routine은 아직 약함 | `Inbox`, `Projects`, `heartbeat` 확인 | routine 고도화 필요 |
| G9 | Reporting hierarchy / org shell | partial | org chart와 추천 고용 approval는 있으나 chain-of-command가 약함 | `OrgChart`, `ProjectDetail` 추천 역할 확인 | reportsTo/위임 정책 강화 필요 |
| G10 | Agent hire approval | closed | 추천 역할 고용 요청이 approval로 생성됨 | `ProjectDetail -> 고용 요청`, approvals 확인 | polished naming 정도만 남음 |
| G11 | Skills 실제 파일 연결 | closed | mounted skill에서 `SKILL.md`를 읽어 runtime prompt bundle 생성 | `server/src/services/skill-runtime.ts`, `execution.ts` | skill ranking 튜닝 정도만 남음 |
| G12 | Case = 결과물 컨테이너 | closed | case에 `documents / approvals / comments / child cases / activity`가 함께 존재 | `CaseDetail` 실제 확인 | 레이아웃 polish만 남음 |
| G13 | Project = single work output engine | closed | instruction으로 project + child cases + outputs + 추천 역할 생성 | `POST /api/projects/from-instruction`, `ProjectDetail` | 프로젝트 보드 강화 정도 |
| G14 | Kakao outbound | partial | approval 승인 후 `ready_to_send / sent / failed` 상태, operator bridge, confirm flow 구현 | `POST /api/approvals/:id/send`, `ApprovalCard`, `Inbox pending outbound` | auto provider env/API 미연동 |
| G15 | 직원/강사 + 일정 연결 | partial | UI/용어는 `직원/강사`, 일정 화면도 `담당 직원/강사` 기준이며 우측 운영 요약 패널로 연결 수업/학생/케이스 1차 노출 | `InstructorsPage`, `SchedulePage`, `Sidebar`, `PropertiesPanel` | DB 모델이 아직 `instructors` 중심이고 일정→케이스 drill-down이 더 필요 |
| G16 | 법령 조회 실연동 | partial | complaint flow에 `korean-law-mcp` 연결 경로 있음 | `korean-law.ts`, adapter test | `LAW_OC` 없음 |
| G17 | 제품 정보 구조 / 좌측 내비 | partial | `오늘 운영 / 학원 운영 / AI 운영 / 운영 관리` 구조와 한국어 운영형 용어로 1차 정렬 완료 | `Sidebar.tsx` 브라우저 확인 | 세부 라우트까지 동일한 위계가 더 필요 |
| G18 | 우측 속성 패널 | partial | `학생 / 직원·강사 / 일정 / 문서 / AI 팀`에 `운영 요약` 패널 연결 | `PropertiesPanel.tsx`, 각 상세 페이지 확인 | 케이스 / 승인 / 프로젝트까지 확장 필요 |

---

## Paperclip 대비 현재 강점

1. `학원 도메인`: 학생, 보호자, 직원/강사, 시간표, 출결, 상담, 보강 등 교육 운영 모델이 이미 있음
2. `채널 인입`: Kakao/Telegram inbound를 곧바로 case 시스템에 연결
3. `한국형 skill`: 환불/민원/톤/메시지 템플릿/법령 조회 등 한국어 운영에 맞는 skill bundle 보유
4. `Preset academy`: `Tanzania English Academy`로 심사 시연을 바로 시작할 수 있음

## 2026-04-12 UI 안정화 반영

- `Sidebar`가 더 이상 기능 목록 나열이 아니라 `오늘 운영 / 학원 운영 / AI 운영 / 운영 관리` 기준으로 재편됨
- `에이전트 / 플러그인 / 어댑터 / k-skill 레지스트리` 같은 개발자 표면 용어를 `AI 팀 / 외부 연동 / AI 연결 / 업무 스킬`로 바꿔 원장/실장 기준 가독성을 높임
- `PropertiesPanel`이 `운영 요약` 패널로 전환되어 학생/일정/문서/AI 팀 선택 시 핵심 요약과 바로 실행이 보이게 됨
- `문서/지식베이스`는 `Markdown import/export`만 되는 저장소가 아니라 `FAQ`, `상담 답변 초안`, `관련 케이스 연결`, `AI 팀 보완 요청` 등 운영 액션 표면을 갖게 됨

즉, 이번 세션으로 `Paperclip의 control plane 문법`을 `한국 학원 운영자용 표면 언어`로 번역하는 1차 작업은 끝났다. 남은 본질은 `live env`와 `drill-down 완결성`이다.

---

## 제출 전 반드시 닫아야 할 갭

### MUST

1. `Codex live`
- `OPENAI_API_KEY` 주입
- `POST /api/adapters/test` 성공
- Kakao 민원 case 1건에서 live response 확인

2. `법령 조회 live`
- `LAW_OC` 주입
- complaint approval payload에 실제 법령 요약 포함 확인

3. `Kakao outbound end-to-end`
- operator bridge는 이미 됨
- 가능하면 provider 자동 발송까지 연결
- 불가능하면 `ready_to_send -> sent confirmed` 시연을 심사 시나리오로 고정

### SHOULD

4. `Run transcript UX`
- 현재는 documents/activity 중심
- 최소한 run reasoning/result를 읽기 쉽게 정리

5. `직원/강사 모델`
- 제출 직전에는 UI 용어 유지
- post-submission에 `staff` 모델 분리

---

## 심사 시나리오 기준 상태

### 1. 카카오 민원 접수
- 상태: `partial`
- 되는 것: inbound, case, approval, operator bridge, sent confirm
- 남은 것: `Codex live`, `LAW_OC`, optional auto send

### 2. 보강/결석 문의
- 상태: `partial`
- 되는 것: Telegram/Kakao -> scheduler -> approval -> document
- 남은 것: `Google Calendar live token`

### 3. 상반기 프로모션 준비
- 상태: `closed`
- 되는 것: project 생성, child cases, outputs, 추천 역할/고용 요청

---

## 결론

현재 HagentOS는 Paperclip과 비교해 `운영 control plane`으로 이미 성립했다.  
제출 직전 남은 본질적 갭은 `live env`와 `outbound provider` 쪽이다.

즉, 지금의 우선순위는 새 기능 추가가 아니라 아래 세 가지다.

1. `OPENAI_API_KEY` 넣고 live Codex 검증
2. `LAW_OC` 넣고 법령 요약 검증
3. `Kakao outbound`를 auto 또는 operator bridge 기준으로 심사 시나리오에 고정
