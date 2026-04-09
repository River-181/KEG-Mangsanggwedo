# HagentOS

> **Open-source AI agent orchestration platform for Korean education**

---

## What is HagentOS?

HagentOS는 한국 교육 기관의 운영자와 교사가 AI 에이전트 팀을 구성하여 비교육 업무를 위임하고, 교육 본업에 집중할 수 있게 하는 오픈소스 플랫폼이다.

챗봇이 아니다. **역할 기반 AI 에이전트들이 조직처럼 움직이며, 사람은 대시보드에서 승인만 한다.**

> "If OpenClaw is an employee, Paperclip is the company."
> — Paperclip

HagentOS는 이 철학을 한국 교육에 이식한다:
> "교육 기관을 운영하는 AI 팀을 고용하세요. 당신은 교육에만 집중하면 됩니다."

---

## Target Users

| 사용자         | 역할             | 핵심 Pain                            |
| ----------- | -------------- | ---------------------------------- |
| **사교육 운영자** | 학원 원장/실장       | 민원·예외·이탈 관리에 하루 3시간, 월 300만원 기회비용  |
| **공교육 교사**  | 담임교사           | 행정 주 6-8시간(OECD 1위), 민원 스트레스 56.9% |
| **강사/교수자**  | 학원 강사, 학교 교과교사 | 교육 품질 향상에 집중하고 싶지만 운영 잡무에 묶임       |

**MVP (대회)**: 사교육 운영자(학원 원장) — 민원·예외 처리 OS

---

## Market

- 전국 학원 **94,485개** (2025, 매년 증가 추세)
- 초중고 교원 **506,100명** (2025)
- 사교육비 총액 **29.2조원** (2024)
- 한국 EdTech 시장 **USD 6.2B → 10.4B** (2024→2030, CAGR 9%)

---

## Core Architecture

```
사람 (원장 or 교사)
    │  한 줄 지시 또는 스케줄 트리거
    ▼
오케스트레이터 Agent  ←── 목표 + 컨텍스트 + 예산
    │
    ├──▶ Complaint Agent     (민원 분류 + 응답 초안)
    ├──▶ Retention Agent     (이탈 징후 감지)
    ├──▶ Intake Agent        (신규 상담 자동화)
    ├──▶ Staff Agent         (강사 관리·성과)
    ├──▶ Compliance Agent    (규제·공문 대응)
    └──▶ ...domain packs
    ▼
승인 대시보드  →  원클릭 승인 or 편집
    │
    ▼
감사 로거  →  모든 AI 처리 내역 자동 저장
```

---

## Directory Structure

```
hagent-os/
├── 00_vision/          ← 비전, 베팅, 성공 지표
├── 01_strategy/        ← 시장, 고객, 경쟁, GTM
├── 02_product/         ← PRD, MVP 범위, 페르소나, 저니
├── 03_domain/          ← 학원 운영 도메인 지식
├── 04_ai-agents/       ← 에이전트 설계 + 역할별 상세
├── 05_workflows/       ← 핵심 워크플로우
├── 06_policies/        ← 커뮤니케이션, 데이터, AI 안전
├── 07_integrations/    ← 외부 연동 (카카오, NEIS 등)
├── 08_data/            ← 도메인 모델, 리포팅 메트릭
├── 09_ux/              ← IA, UX 컨셉
├── 10_execution/       ← 로드맵, 미해결 질문
├── 99_templates/       ← 템플릿
├── _research/          ← Paperclip 분석, 경쟁사 리서치
└── .agent/             ← AI 에이전트 운영 규칙
```

---

## Tech Stack (TBD)

| Layer | Candidate | Note |
|-------|-----------|------|
| Backend | Node.js + TypeScript | Paperclip 동일 스택 |
| AI | Claude API (Sonnet 4.6) | 오케스트레이터 + 전문 에이전트 |
| DB | Supabase (PostgreSQL) | 에이전트 상태 + 감사 로그 |
| UI | Next.js (React) | 승인 대시보드 |
| Scheduler | cron (heartbeat) | 매일 자동 실행 |

---

## Key References

- [Paperclip](https://github.com/paperclipai/paperclip) — "Company as AI" orchestration
- [k-skill](https://github.com/NomaDamas/k-skill) — Korean service skill packages
- OECD TALIS 2024 — 교사 행정업무·민원 스트레스 데이터
- bati.ai — 학원 운영 비용 분석

---

## License

TBD
