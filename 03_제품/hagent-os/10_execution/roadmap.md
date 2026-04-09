---
tags: [area/product, type/reference, status/active, workflow/execution]
date: 2026-04-09
up: "[[hagent-os/README]]"
---
# Roadmap

## 역할 분담
- **이승보(승)**: AI 에이전트/오케스트레이터 설계 및 구현, Claude API 연결, 대회 전략
- **김주용(용)**: UI/프론트엔드, 인프라/배포, Supabase 스키마, 유저 플로우
- **AI 에이전트**: 코드 생성, 문서화, 통합 테스트 보조

---

## Phase 0: 대회 최종 스프린트 (D-4, ~4/13)

### 목표
Must-have 기능만 구현. 평가 기준 점수 최대화.

### Day별 목표

**D5 (4/10 목): 스켈레톤 & 인프라**
- [ ] Next.js + Supabase 기본 프로젝트 구조 세팅 — 용
- [ ] DB 스키마 확정 (Academy, Student, Instructor, Complaint, Case, AgentRun) — 승+용
- [ ] Supabase 인증 설정 (단일 원장 계정 MVP) — 용
- [ ] Mock 데이터 투입 (학생 20명, 민원 5건, 강사 3명, 수업 일정) — 승
- [ ] Claude API 키 환경변수 설정, 연결 확인 — 승

**D6 (4/11 금): 에이전트 코어**
- [ ] Orchestrator 구현 (task routing, 수동 분기 — 자동 라우팅 없음) — 승
- [ ] Complaint Agent (민원 분류 + 초안 응답 생성, Claude API 연결) — 승
- [ ] Retention Agent (이탈 신호 감지 로직, Claude API 연결) — 승
- [ ] Backend API (민원 목록, 학생 현황, 결재 대기 조회) — 용
- [ ] Claude API 병렬 호출 토큰 비용 실측 — 승

**D7 (4/12 토): Approval Dashboard & Heartbeat**
- [ ] Approval Dashboard UI (카드 레이아웃, 승인/편집/반려 원클릭, 모바일 반응형) — 용
- [ ] Heartbeat cron (매일 07:00, Retention Agent 트리거) — 승
- [ ] Google Calendar 단방향 동기화 MVP (읽기 전용, 로컬 테스트) — 용
- [ ] 온보딩 최소 입력 필드 UI (학원명, 운영자명, 학생 1명) — 용

**D8 (4/13 일): 마무리 & 제출**
- [ ] Scheduler UI (캘린더 뷰, 수업 일정 표시 — 에이전트 로직 없음, UI 전용) — 용
- [ ] k-skill 레지스트리 UI (기본 에이전트 목록 표시) — 용
- [ ] 데모 시나리오 테스트 (민원 처리, 이탈 감지, 승인 플로우 4~5건) — 승+용
- [ ] 대회 심사 기준 자체 검수 — 승+용
- [ ] 최종 배포 & 제출 — 용

---

## Phase 1: 초기 사용자 (대회 후, ~5월~6월)

### 목표
베타 10~30개 학원 모집, MVP KPI 추적, 수익화 경로 검증.

- 카카오톡 알림 / SMS 연동
- 학원별 맞춤 설정 (환불 정책, 시간표 관리)
- 사용자 피드백 루프 (주간 리포트)
- Scheduler Agent 풀 구현 (Google Calendar 양방향 동기화)

---

## Phase 2: 도메인 확장 (3~6개월)

### 목표
태권도, 예체능 도메인별 팩 출시, 공교육 파일럿.

- Staff Agent 강화 (자동 신청서 검토, 면접 일정 제안)
- 도메인별 워크플로우 템플릿
- 공교육 데이터 연계 (시험 성적, 출석)
- 멀티 계정 (실장/강사 역할 분리)

---

## Phase 3: 플랫폼화 (6~12개월)

### 목표
k-skill 커뮤니티 플랫폼으로 진화, 데이터 인사이트 판매.

- k-skill 레지스트리 (학원/교사 공유 에이전트 마켓)
- 다지점 관리 기능 (체인 학원)
- 데이터 분석 & 인사이트 대시보드

---

## 기술 부채 & 의도적 지연 항목

| 항목 | 현재 상태 | 대회 후 우선순위 |
|------|---------|-----------------|
| Google Calendar OAuth 도메인 검증 | 로컬 테스트만 | 높음 |
| SMS/Kakao 배치 전송 | 제외 | 높음 |
| Supabase RLS 정책 자동화 | 기본만 | 중간 |
| Scheduler Agent 풀 로직 | UI 전용 | 높음 (Phase 1) |
| 멀티 계정 (강사/실장) | 단일 원장 MVP | 중간 (Phase 1) |
| 다국어 지원 | 한국어만 | 낮음 |

---

## 마일스톤 & 성공 기준

| 마일스톤 | 기준 | 목표 |
|---------|------|------|
| **대회 제출** | Approval Dashboard 데모, Complaint/Retention Agent 동작, Heartbeat cron | 4/13 자정 |
| **Phase 1 (베타)** | 10개 학원, 50명 학생, 90% 가동률 | 6/1 |
| **Phase 2 (도메인)** | 30개 학원, 3개 도메인 팩 | 9/1 |
| **Phase 3 (플랫폼)** | k-skill 레지스트리 론칭, 100개 학원 | 12/1 |

---

## 리스크 & 완화 전략

- **토큰 비용**: D6에 병렬 에이전트 실비 산출 → 가격 모델 조정
- **일정**: 이승보(에이전트)/김주용(UI) 병렬화, Mock 데이터로 에이전트 먼저 테스트
- **심사**: 4/13 오전 자체 검수 → 마지막 수 시간 버그 수정 여유
- **Scheduler Agent 과욕**: UI만 완성, 풀 에이전트 로직은 Phase 1으로 명시 연기
