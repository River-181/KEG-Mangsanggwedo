---
tags:
  - area/product
  - type/archive
  - status/archived
date: 2026-04-13
up: "[[03_제품/archive/legacy-plans/README]]"
aliases:
  - 데모 런치 플랜
  - 심사 준비 플랜
---

# 데모 런치 플랜 — KEG 심사 준비

> [!warning]
> archive 문서. 현재 데모/검증 정본은 [[03_제품/hagent-os/10_execution/runtime-docs/handoff/2026-04-13-full-regression]]를 우선 본다.

> 마감: 2026-04-13 24:00  
> 목표: 심사위원이 실제로 체험할 수 있는 HagentOS 데모 구성

---

## 5가지 핵심 요구사항

1. **탄자니아 영어학원 데모** — 풍부한 AI 상호작용 이력 (케이스 25개 + 코멘트 + CEO 메모리)
2. **1 repo 2 mode** — 범용 사용자 / 심사위원 DEMO_MODE
3. **AI 모델 없이도 동작** — `DEMO_MODE=true` → mock 응답
4. **Telegram 봇 왕복** — 메시지 → 케이스 → AI 응답 → 텔레그램 답변
5. **메모리 시스템 가시화** — 에이전트가 학원 상황을 기억하고 있음을 보여줌

---

## 구현 완료 (2026-04-13)

| # | 작업 | 파일 | 상태 |
|---|------|------|------|
| 1 | DEMO_MODE env var | `server/src/config.ts`, `server/src/lib/runtime.ts` | ✅ |
| 2 | 풍부한 데모 시드 데이터 | `server/src/data/rich-demo-seed.ts` | ✅ |
| 2b | bootstrap.ts 통합 | `server/src/services/bootstrap.ts` | ✅ |
| 3 | Telegram outbound 완결 | `server/src/routes/telegram.ts` | ✅ |
| 4 | Railway 배포 설정 | `Dockerfile`, `railway.toml` | ✅ |
| 5 | 레거시 시드 데이터 삭제 | `packages/db/src/seed.ts` 삭제 | ✅ |

---

## 시드 데이터 구성

### 케이스 25개 (RICH_CASES)
- complaint: 6개 (이수아 결석, 환불 민원 등)
- refund: 4개 (환불 처리 이력)
- schedule: 5개 (보강, 대체 수업, 일정 변경)
- inquiry: 5개 (신규 입학, FAQ, 법령 확인)
- churn: 2개 (이탈 위험 보고, 재등록 전환)
- 각 케이스: `agentDraft` (AI 응답) + `caseComments` (대화 이력)

### CEO 에이전트 메모리 (CEO_MEMORY)
```json
{
  "studentInsights": {
    "이수아": "이탈 위험 최고. 3주 연속 결석. 반 변경 검토 중.",
    "김서준": "월요일 결석 패턴. 보강 요청 누적.",
    "한지민": "고3 수능 스트레스. 강사 밀착 케어 중."
  },
  "lastInsight": "이번 달 이탈 위험 학생 3명 — 이수아 > 김서준 > 한지민",
  ...
}
```

---

## Telegram 왕복 플로우

```
심사위원 → Telegram 봇 메시지 전송
         → webhook POST /api/channels/telegram/webhook/:orgId
         → processChannelInbound() → case 생성
         → autoRouteCase() → executeAgentRun() → agentDraft 저장
         → sendTelegramMessage() → 봇이 답장 발송 ← 심사위원 수신
```

- 봇 토큰: Settings → 연결 → Telegram에서 설정
- 예시 메시지: "이수아 학생 출결 현황 알려줘", "이번 주 환불 요청 현황은?"

---

## DEMO_MODE 사용법

```bash
# 로컬 실행 (API 키 불필요)
DEMO_MODE=true pnpm dev

# 프로덕션 (실제 AI)
ANTHROPIC_API_KEY=sk-xxx pnpm dev
```

---

## Railway 배포

```toml
# railway.toml
[build]
builder = "DOCKERFILE"

[deploy]
startCommand = "node server/dist/index.js"
healthcheckPath = "/health"
```

환경변수:
- `DATABASE_URL` — Neon.tech PostgreSQL
- `ANTHROPIC_API_KEY` — 실제 AI 응답
- `PORT=3200`

---

## 남은 작업

- [ ] Railway 배포 실행 → 라이브 URL 확보
- [ ] Telegram 봇 토큰 탄자니아 org에 연결
- [ ] JUDGE_DEMO.md 작성
- [ ] README 라이브 URL 삽입
- [ ] AI 리포트 초안 완성
- [ ] 데모 리허설 2분 통과 확인
