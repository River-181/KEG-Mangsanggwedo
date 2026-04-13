---
tags:
  - area/product
  - type/archive
  - status/archived
date: 2026-04-13
up: "[[03_제품/archive/legacy-plans/README]]"
aliases:
  - dev-progress
  - 개발진행
---
# PROGRESS_v2 — HagentOS 실사용 제출 진행 현황

> [!warning]
> archive 문서. 현재 실행 상태는 [[03_제품/hagent-os/10_execution/runtime-docs/handoff/2026-04-13-full-regression]]와 [[03_제품/hagent-os/10_execution/roadmap]]를 우선 본다.

> 기준 레포: `/Users/river/workspace/active/hagent-os`
> 기준 날짜: `2026-04-13`
> 목적: 제출 직전 기준으로 `완료 / 부분완료 / 남은 블로커`를 한 번에 본다.

---

## 현재 상태

| 항목 | 상태 |
|---|---|
| 현재 단계 | **실사용 제출 최종 마감 단계** |
| 기준 제품 | **HagentOS v0.5.x** (`/Users/river/workspace/active/hagent-os`) |
| 제품 방향 | `scratch onboarding + demo academy preset` 동시 지원 |
| 우선 루프 | `Kakao/Telegram inbound -> case -> approval -> document -> follow-up` |
| 데모 학원 | **Tanzania English Academy** |
| 핵심 블로커 | `OPENAI_API_KEY`, `LAW_OC`, optional `KAKAO_OUTBOUND_PROVIDER_URL`, deploy URL |
| 제출 리스크 | live env 부재, server 전역 type debt, 배포 URL 미정, 증빙/리포트 수치 동기화 |

---

## 완료

### 1. 제품 구조

- [x] 독립 레포 분리: `/Users/river/workspace/active/hagent-os`
- [x] scratch onboarding + demo academy 양 진입점 확보
- [x] `Tanzania English Academy` preset 구축
- [x] dashboard / inbox / cases / projects / agents / settings / skills / plugins / adapters 작동

### 2. Inbound Ops

- [x] `Kakao inbound` case 생성/append
- [x] `Telegram inbound` case 생성/append
- [x] sender/thread 기준 case append
- [x] replay shortcut + recent replay history
- [x] inbox에 `channel health / live inbound queue / pending outbound` 노출
- [x] `(organization_id, identifier)` unique + retry helper 적용

### 3. Work loop

- [x] case -> run -> approval -> activity 연결
- [x] case detail에 `documents / approvals / comments / child cases`
- [x] comment + rerun
- [x] comment + child case
- [x] project from instruction
- [x] project -> child cases -> outputs
- [x] 추천 역할/agent hire approval
- [x] issue/properties UI 정리
- [x] done 컬럼 복구
- [x] case detail `Comments / Sub-issues / Activity` 재정렬

### 4. Skills / agent runtime

- [x] filesystem-backed skill registry
- [x] mounted skill을 runtime prompt에 실제 주입
- [x] agent detail에서 runtime skill bundle 확인
- [x] complaint / retention / scheduler / orchestrator별 skill context 분기
- [x] capabilities/skills pack 확장 및 runtime 연결

### 5. Kakao outbound

- [x] approval 승인 후 `kakaoMessage` side effect 기록
- [x] `ready_to_send / sent / failed` 상태 관리
- [x] operator bridge
  - 복사
  - 채널 열기
  - 전송 완료 처리
- [x] sent/failed 결과를 case comment / document / activity / notification에 남김

### 6. Settings / configuration

- [x] `기관 기본 정보 / AI 운영 정책 / 외부 연동 / 앱 환경 / 채널 운영`
- [x] agent adapter/model 저장
- [x] `POST /api/adapters/test`
- [x] Settings와 AgentDetail에 connection test 결과 저장/표시
- [x] settings/students 패널 동작과 route 안정화 1차 반영

---

## 부분완료

### 1. Codex live

- [x] `codex_local` 경로 구현
- [x] adapter test UI/API 구현
- [ ] `OPENAI_API_KEY` 없음
- [ ] live complaint/scheduler/orchestrator 응답 미검증

### 2. 법령 조회 live

- [x] `korean-law-mcp` 연결 경로 구현
- [x] complaint flow에 법령 요약 자리 마련
- [ ] `LAW_OC` 없음
- [ ] 실제 법령 응답 미검증

### 3. Kakao outbound auto provider

- [x] provider abstraction 구현
- [x] operator bridge fallback 구현
- [ ] `KAKAO_OUTBOUND_PROVIDER_URL` 없음
- [ ] 자동 발송 provider 실검증 없음

### 4. 운영 UI polish

- [x] 용어 정리: `직원/강사 관리`, `담당 직원/강사`
- [x] Inbox와 CaseDetail은 operator shell에 가깝게 정리
- [x] schedule weekly/monthly 상호작용 1차 정리
- [x] agents recent activity summary 보강
- [ ] run transcript는 아직 Paperclip식 chat surface가 아님
- [ ] sidebar/설정/상세화면 최종 polish 여지 있음

### 5. 직원/강사 데이터 모델

- [x] 화면 용어와 일정 연결 표현 정리
- [ ] DB는 아직 `instructors` 중심
- [ ] `staff` 분리 모델은 post-submission 후보

---

## 남은 블로커

### MUST

1. `OPENAI_API_KEY` 주입 후 live Codex 검증
2. `LAW_OC` 주입 후 live 법령 조회 검증
3. `Kakao outbound`를 심사 시나리오에 맞게 확정
   - provider 자동 발송
   - 또는 operator bridge 시연 고정
4. 심사 시나리오 3개 리허설
   - 카카오 민원
   - 보강/결석 문의
   - 상반기 프로모션 준비

### SHOULD

5. `Google Calendar` live token 검증
6. `server` 전역 type debt 정리 가능한 만큼 축소
7. 배포 URL/HTTPS webhook 확보
8. AI 리포트와 증빙 수치 최종 동기화

---

## 실제 확인한 동작

- [x] demo academy bootstrap 성공
- [x] Kakao inbound -> case 생성
- [x] Telegram inbound -> case 생성
- [x] 동일 sender/thread append
- [x] approval 생성
- [x] approval 승인 후 `ready_to_send`
- [x] operator bridge `sent confirmed`
- [x] case status/document/comment/activity 반영
- [x] `상반기 프로모션 준비해볼까?` -> project/cases/documents 생성
- [x] Telegram approval -> outbound 상태 귀결 확인
- [x] students/settings base route 정상화

---

## 제출 전 최종 마일스톤

### M1. Live env 붙이기
- `OPENAI_API_KEY`
- `LAW_OC`
- optional `KAKAO_OUTBOUND_PROVIDER_URL`

### M2. 심사 시나리오 4개 고정
- `Replay Kakao`
- `Replay Telegram` 또는 보강 문의
- `Create Sample Project`
- `법률/운영 정책 질문`

### M3. 제출 문서/대시보드 동기화
- `PAPERCLIP-GAP-ANALYSIS`
- `PROGRESS_v2`
- `project-dashboard`

---

## 판단

현재 HagentOS는 `받고, 분류하고, 승인하고, 결과물을 남기는 OS`로는 이미 성립했다.  
남은 건 새 기능 대량 추가가 아니라, `live env + outbound + 심사 리허설` 마감이다.
