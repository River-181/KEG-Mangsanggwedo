---
tags: [area/product, type/reference, status/active, workflow/execution]
date: 2026-04-09
up: "[[hagent-os/README]]"
---
# Roadmap

## 역할 분담
- **이승보(승)**: AI 에이전트/오케스트레이터 설계 및 구현, Claude API 연결, 대회 전략
- **김주용(용)**: UI/프론트엔드, 인프라/배포, DB 스키마, 유저 플로우
- **AI 에이전트**: 코드 생성, 문서화, 통합 테스트 보조

---

## Phase 0: 대회 최종 스프린트 (D-4, ~4/13)

### 목표
Must-have 기능만 구현. 평가 기준 점수 최대화.

### Day별 목표

**D5 (4/10 목): 인프라 + 단일 흐름 스켈레톤**
- [ ] Vite + React 19 + Express v5 + Drizzle ORM 초기화 — 용
- [ ] 핵심 테이블만: Organization, Agent, Case, AgentRun, Approval — 승+용
- [ ] embedded-postgres 로컬 개발 환경 구성 — 용
- [ ] local_trusted 모드 (인증 없이 시작) — 용
- [ ] Mock 데이터 투입 (학생 10명, 민원 3건) — 승
- [ ] Claude API 키 환경변수 설정, 연결 확인 — 승

**D6 (4/11 금): 민원 단일 흐름 완성**
- [ ] Complaint Agent (Claude API 연결) — 승
- [ ] 케이스 생성 → 에이전트 실행 → 초안 생성 — 승
- [ ] Approval 상태 머신 (pending → approved/rejected) — 용
- [ ] Backend API (민원 조회, 승인 업데이트) — 용
- [ ] 기본 에이전트 동작 테스트 — 승

**D7 (4/12 토): 승인 대시보드 + Heartbeat**
- [ ] 승인 카드 UI (카드 + 원클릭 승인) — 용
- [ ] node-cron 07:00 heartbeat (Orchestrator → Complaint + Retention) — 승
- [ ] Retention Agent (기본 이탈 감지) — 승
- [ ] 모바일 반응형 — 용
- [ ] 데모 시나리오 준비 (민원 2~3건) — 승+용

**D8 (4/13 일): 완성 + 배포**
- [ ] GitHub 정리 + 라이브 데모 환경 배포 — 용
- [ ] k-skill 레지스트리 UI (정적 카탈로그) — 용
- [ ] 데모 시나리오 최종 테스트 — 승+용
- [ ] 제출 — 용

**절대 하지 않는 것 (D5-D8):**
- [ ] Google Calendar sync → v1.1
- [ ] 카카오/SMS → v1.1
- [ ] Scheduler Agent 실제 에이전트 로직 → UI만
- [ ] 복잡한 인증 → local_trusted 모드로 시작

> **Codex + Opus 검증 결과**: 원래 계획보다 30-40% 축소. 민원 처리 단일 흐름 완성이 우선.

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
| DB RLS 정책 자동화 | 앱 레벨 필터링 | 중간 |
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
