---
tags: [area/product, type/reference, status/active]
date: 2026-04-09
up: "[[hagent-os/README]]"
---

# Domain Model (데이터 도메인 모델)

> prd.md 데이터 모델 + agent-design.md DB Schema를 통합한 정본 레퍼런스.
> DB: Supabase (PostgreSQL). ORM: Prisma (예정).

---

## 전체 엔티티 관계도 (ERD)

```
Organization
  ├─── Agent[]          (1:N)
  ├─── Student[]        (1:N)
  ├─── Instructor[]     (1:N)
  ├─── Schedule[]       (1:N)
  ├─── Case[]           (1:N)
  ├─── Notification[]   (1:N)
  └─── Template[]       (1:N)

Agent
  ├─── WakeupRequest[]  (1:N)
  ├─── AgentRun[]       (1:N)
  ├─── Routine[]        (1:N)
  └─── reportsTo → Agent (self-ref, nullable)

Student
  ├─── Parent[]         (N:M via StudentParent)
  ├─── Attendance[]     (1:N)
  ├─── Payment[]        (1:N)
  └─── Case[]           (1:N, 학생 관련 민원)

Parent
  └─── Case[]           (1:N, 민원 제기자)

Instructor
  ├─── Schedule[]       (N:M via ScheduleParticipant)
  └─── Performance[]    (1:N)

Schedule
  ├─── ScheduleParticipant[] (강사/학생/학부모)
  └─── external_sync → Google Calendar event ID

Case
  ├─── AuditLog[]       (1:N, 불변)
  └─── approval_status → Approval

AgentRun
  └─── WakeupRequest    (N:1)
```

---

## 핵심 테이블 상세

### Organization (기관)

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | UUID PK | |
| name | TEXT | 학원명 |
| type | ENUM | `academy` \| `tutoring` \| `public` |
| profile | JSONB | 규모, 목표, 톤, 지역 등 |
| agents | TEXT[] | 활성화된 에이전트 slug 목록 |
| skills | TEXT[] | 설치된 k-skill slug 목록 |
| members[] | ref → User | (원장/실장/강사 — MVP는 단일 원장 계정, v2에서 멀티 계정 확장) |
| createdAt | TIMESTAMP | |

**관계:** 모든 엔티티의 루트. `organizationId`로 멀티테넌시 격리.

---

### Agent (에이전트)

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | UUID PK | |
| organizationId | UUID → Organization | |
| name | TEXT | "민원 담당 에이전트" |
| slug | TEXT UNIQUE | "complaint-agent" |
| agentType | ENUM | `orchestrator` \| `complaint` \| `retention` \| `scheduler` \| `intake` \| `staff` \| `finance` \| `compliance` \| `notification` \| `analytics` |
| status | ENUM | `idle` \| `running` \| `pending_approval` \| `paused` \| `error` |
| reportsTo | UUID → Agent | NULL이면 원장에게 직보 |
| adapterType | TEXT | `"claude"` \| `"openai"` |
| adapterConfig | JSONB | `{ model, systemPrompt, temperature }` |
| skills | TEXT[] | 장착된 k-skill slug |
| budgetMonthlyCents | INT | 월 예산 (센트) |
| spentMonthlyCents | INT | 이번 달 누적 사용액 |
| lastHeartbeatAt | TIMESTAMP | |
| lastRunStatus | TEXT | nullable, 최근 실행 상태 |
| runtimeState | JSONB | 세션 간 지속 상태 |
| createdAt | TIMESTAMPTZ | |
| updatedAt | TIMESTAMPTZ | |

---

### Student (학생)

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | UUID PK | |
| organizationId | UUID | |
| name | TEXT | |
| grade | TEXT | 학년 (중2, 고1 등) |
| subjects | TEXT[] | 수강 과목 |
| riskScore | FLOAT | 이탈 위험 점수 (0-1, Retention Agent 갱신) |
| enrolledAt | DATE | 등록일 |
| attendance | Attendance[] | |
| payments | Payment[] | |

**관계:** `StudentParent` 조인 테이블로 부모와 N:M.

---

### Parent (학부모)

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | UUID PK | |
| organizationId | UUID | |
| name | TEXT | |
| phone | TEXT | 알림 수신 번호 |
| kakaoLinked | BOOL | 카카오 알림 연동 여부 |
| preferredChannel | ENUM | `kakao` \| `sms` \| `email` |

---

### Instructor (강사)

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | UUID PK | |
| organizationId | UUID | |
| name | TEXT | |
| subjects | TEXT[] | 담당 과목 |
| availability | JSONB | 가용 시간대 (요일×시간) |
| monthlySalaryCents | INT | 월 급여 |

---

### Schedule (통합 스케줄)

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | UUID PK | |
| organizationId | UUID | |
| type | ENUM | `class` \| `consult` \| `bus` \| `inspection` \| `legal_deadline` \| `other` |
| title | TEXT | |
| startAt | TIMESTAMP | |
| endAt | TIMESTAMP | |
| participants | UUID[] | 강사/학생/학부모 ID |
| recurrence | JSONB | iCal RRULE 포맷 |
| location | TEXT | 강의실 번호 또는 온라인 URL |
| external_sync | TEXT | Google Calendar event ID |
| status | ENUM | `scheduled` \| `completed` \| `cancelled` \| `rescheduled` |

---

### Case (민원·환불·보강 케이스)

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | UUID PK | |
| organizationId | UUID | |
| type | ENUM | `complaint` \| `refund` \| `makeup` \| `inquiry` |
| severity | ENUM | `low` \| `medium` \| `high` \| `critical` |
| status | ENUM | `open` \| `draft_ready` \| `pending_approval` \| `resolved` \| `escalated` |
| reporterId | UUID → Parent | 민원 제기자 |
| studentId | UUID → Student | 해당 학생 |
| agentDraft | TEXT | Complaint Agent가 생성한 답변 초안 |
| approvalStatus | ENUM | `none` \| `approved` \| `rejected` |
| approvedBy | UUID | 승인한 사람 or 상위 에이전트 |
| auditLog | AuditLog[] | 불변 이력 |

---

### Notification (알림)

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | UUID PK | |
| organizationId | UUID | |
| type | TEXT | `absence` \| `makeup` \| `payment_due` \| `case_reply` 등 |
| channel | ENUM | `kakao` \| `sms` \| `email` \| `push` |
| status | ENUM | `pending` \| `sent` \| `failed` |
| recipientId | UUID | Parent or Instructor |
| message | TEXT | 발송 본문 (변수 치환 완료) |
| sentAt | TIMESTAMP | |

---

### AgentRun (에이전트 실행 로그)

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | UUID PK | |
| agentId | UUID → Agent | |
| wakeupRequestId | UUID → WakeupRequest | |
| status | ENUM | `running` \| `completed` \| `failed` \| `pending_approval` |
| input | JSONB | 트리거 데이터 |
| output | JSONB | 에이전트 결과 |
| tokensUsed | INT | |
| costCents | INT | |
| approvalLevel | INT | 제로휴먼 레벨 0~4 |
| approvedBy | UUID | 승인자 |
| startedAt | TIMESTAMP | |
| completedAt | TIMESTAMP | |

**용도:** 모든 AI 결정의 감사 추적 근거. 학부모 민원 대응 시 원장이 조회.

---

### 보조 테이블 (간략)

| 테이블 | 핵심 컬럼 | 용도 |
|--------|-----------|------|
| WakeupRequest | agentId, triggerType, coalescedCount | 중복 제거된 에이전트 깨우기 요청 |
| Routine | agentId, cronExpression, enabled | 정기 실행 크론 규칙 |
| Template | type, content, personalization_rule | 알림/답변 메시지 템플릿 |
| AuditLog | caseId, action, actor, before, after | 불변 이력 (append-only) |
| Approval | agentRunId, level, status, approvedBy | 승인 게이트 상태 |
| Attendance | studentId, date, status, note | 출석 기록 |
| Payment | studentId, amount, dueDate, paidAt, method | 결제 기록 |
| StudentParent | studentId, parentId | 학생-학부모 조인 테이블 |
| ScheduleParticipant | scheduleId, participantId, role | 일정 참가자 (강사/학생/학부모) |
| Performance | instructorId, period, rating, note | 강사 성과 평가 |

---

## 확장 고려사항

### 멀티 지점

- `Organization`에 `parentOrgId` 컬럼 추가 (본원-지점 계층)
- 모든 쿼리에 `organizationId IN (...)` 조건으로 지점별 격리 유지
- 에이전트는 지점 단위로 독립 실행, 본원 Analytics Agent가 집계

### 공교육 모드

- `Organization.type = 'public'`일 때 `Case.type`에 `neis_report` 추가
- NEIS 연동 어댑터는 별도 `DataBridge` 컬럼으로 확장 (`externalSource: 'neis'`)
- 학생 개인정보 처리 동의 컬럼 (`Student.consentAt`) 필수화
