# HagentOS

> **AI agent orchestration platform for Korean education operations**
> **Current release:** `v0.5.0`

심사위원이 보게 될 이 저장소의 핵심은 하나입니다.  
HagentOS는 챗봇이 아니라, **민원·예외·상담·일정·후속조치를 승인 기반으로 운영하는 AI 팀의 control plane**입니다.

이 대회 제출 저장소는 제품 코드만이 아니라, 기획, 증빙, 심사 시나리오, 구현 근거를 함께 담고 있습니다.

---

## What It Is

HagentOS는 한국 교육기관, 특히 학원 운영자가 반복적인 운영 업무를 AI agent team에 위임하고 사람은 승인과 예외 판단에 집중할 수 있게 만드는 운영 OS입니다.

한 줄 지시나 inbound message가 들어오면 시스템은 다음 흐름으로 움직입니다.

```text
Inbound message / operator instruction
  -> Case created
  -> Agent run
  -> Approval
  -> Schedule / Document / Outbound
  -> Activity / Notification
```

핵심은 "AI가 답한다"가 아니라, **운영 단위가 Case로 남고, 승인과 후속조치까지 추적된다**는 점입니다.

---

## What It Is Not

- Not a chatbot
- Not a generic workflow builder
- Not a single-agent copilot
- Not a school ERP replacement

HagentOS는 질문응답용 assistant가 아니라, **교육 운영 후속처리를 AI agent team이 분담하는 제품**입니다.

---

## Why It Matters

| Without HagentOS | With HagentOS |
| --- | --- |
| 민원 메시지를 원장이 직접 읽고 판단한다 | Complaint / Orchestrator가 분류하고 승인안까지 올린다 |
| 보강, 상담, 환불, 공지가 서로 다른 메신저와 엑셀에 흩어진다 | Case, Approval, Schedule, Document가 한 흐름으로 연결된다 |
| 반복 문의 대응이 사람 기억에 의존한다 | 정책 문서와 지식베이스를 기준으로 일관된 초안을 만든다 |
| 누가 언제 무엇을 승인했는지 추적이 어렵다 | Activity와 audit trail이 남는다 |

---

## Demo In 90 Seconds

1. `Dashboard`에서 현재 운영 상태를 본다.
2. `Cases`에서 Telegram/Kakao inbound로 생성된 케이스를 연다.
3. AI draft를 확인하고 승인한다.
4. `Schedule / Document / Activity` side effect를 확인한다.
5. `Inbox / Settings`에서 운영 상태와 채널 연결을 본다.

심사 가이드는 아래 문서를 바로 보면 됩니다.

- [제품 README](03_제품/hagent-os/README.md)
- [제출 직전 라이브 최종 검증](05_제출/live-final-verification.md)
- [제출 체크리스트](05_제출/submission-checklist.md)

---

## Live Demo

- Live URL: `https://hagent-os.up.railway.app`
- 고객 상담 bot: `@TANZANIA_ENGLISH_ACADEMY_bot`
- 운영 승인 bot: `@hagent_os_ops_bot`
- 제출 직전 검증 기록: [05_제출/live-final-verification.md](05_제출/live-final-verification.md)

---

## Quickstart

### Judge Mode

1. 라이브 URL 접속
2. 고객 bot에서 문의 1건 생성
3. 운영 bot에서 승인 1건 처리
4. 웹에서 `Case / Approval / Document` 반영 확인

### Local Mode

```bash
git clone https://github.com/River-181/hagent-os
cd hagent-os
pnpm install
pnpm dev
```

기본 포트:

- server: `3200`
- ui: `5174`

헬스 체크:

```bash
curl http://127.0.0.1:3200/api/health
```

---

## Repository Map

```text
.
├── 00 HOME.md                    # vault home
├── 01_대회정보/                   # 대회 규칙, 일정, 심사 자료
├── 02_전략/                       # 문제 정의, 전략, 의사결정
├── 03_제품/                       # 제품 기획 정본
├── 04_증빙/                       # AI 활용 및 개발 증빙
├── 05_제출/                       # 최종 제출물
├── 06_LLM위키/                    # 장기 지식 베이스
├── _MOC/                         # 중앙 navigation
├── _system/                      # 대시보드, 팀 세팅, 툴 정본
├── .agent/                       # AI 운영 규칙
└── .claude/                      # Claude runtime adapter
```

제품 문서 루트:

- [03_제품/hagent-os/README.md](03_제품/hagent-os/README.md)

---

## Read This First

심사/작업 기준으로는 아래 순서가 가장 좋습니다.

1. [03_제품/hagent-os/README.md](</Users/river/workspace/active/2026 제1회 KEG 바이브코딩 콘테스트/03_제품/hagent-os/README.md>)
2. [03_제품/hagent-os/02_product/prd.md](03_제품/hagent-os/02_product/prd.md)
3. [03_제품/hagent-os/02_product/mvp-scope.md](03_제품/hagent-os/02_product/mvp-scope.md)
4. [03_제품/hagent-os/09_ux/domain-ux-paperclip-gap.md](03_제품/hagent-os/09_ux/domain-ux-paperclip-gap.md)
5. [05_제출/live-final-verification.md](05_제출/live-final-verification.md)

---

## Evidence And Submission

- [master-evidence-ledger.md](04_증빙/01_핵심로그/master-evidence-ledger.md)
- [ai-report-final.md](05_제출/ai-report-final.md)
- [live-final-verification.md](05_제출/live-final-verification.md)

이 저장소는 제품만이 아니라, **왜 이 제품을 만들었고 어떻게 검증했는지**까지 함께 제출하는 구조입니다.

---

## Tooling

- Obsidian App + CLI
- Claude Code / Codex / ChatGPT Web / Perplexity
- Figma MCP
- Excalidraw MCP
- NotebookLM CLI

툴 정본:

- [_system/tools/README.md](_system/tools/README.md)

---

## Current Status

- 제품 구현 정본은 별도 `hagent-os` source repo에서 유지되며, 이 vault는 제출/증빙 정본을 담는다
- 대회 워크스페이스는 기획, 증빙, 제출 정본을 포함
- 로컬 회귀 기록은 `full-regression`, 제출 직전 실동작 기준은 `live-final-verification` 문서가 정본

한 줄 요약:

> HagentOS는 Paperclip의 control-plane 철학을 한국 교육 운영 맥락으로 재구성한 제품이다.
