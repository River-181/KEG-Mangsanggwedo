---
tags: [area/product, type/reference, status/active]
date: 2026-04-09
up: "[[hagent-os/README]]"
---
# Design System (디자인 시스템)

> HagentOS UI 설계 원칙과 토큰. Paperclip 구조를 기반으로 하되, 한국 학원 원장 친화 스킨을 적용한다.

---

## 설계 원칙

- **읽기 쉬움 우선.** 40-50대 원장이 모바일에서 빠르게 파악할 수 있어야 한다. 밀도보다 가독성.
- **따뜻하고 신뢰감 있게.** 차갑고 개발자 도구스러운 느낌 금지. 카카오/토스 계열의 친근함.
- **터치 친화.** 모든 탭 영역 최소 48px. 작은 텍스트 버튼 금지.
- **한국어 기본.** 레이블·메시지·에러는 모두 한국어. 영어는 코드 식별자에만.
- **Light 기본.** 밝은 배경이 기본값. Dark 모드는 선택 토글.
- **컴포넌트 주도.** Paperclip과 동일하게 shadcn/ui → 커스텀 복합 → 페이지 3계층 구조.

---

## 기술 스택

| 항목 | 선택 |
|------|------|
| 프레임워크 | Next.js 15 (App Router) |
| 스타일 | Tailwind CSS v4 + CSS Variables |
| 컴포넌트 기반 | shadcn/ui (new-york style, CSS variables 활성화) |
| 접근성 | Radix UI primitives |
| 아이콘 | Lucide React (nav 20px, inline 16px) |
| 폰트 | Noto Sans KR (Google Fonts) + system-ui fallback |
| 변형 관리 | class-variance-authority (CVA) |
| 클래스 병합 | clsx + tailwind-merge → `cn()` |

---

## 색상 토큰 (CSS Variables)

OKLCH 기반. **항상 시맨틱 토큰만 사용한다** — raw 색상값 하드코딩 금지.

### Light 모드 (기본)

```css
:root {
  /* 배경 */
  --background:         oklch(0.99 0.002 200);   /* 따뜻한 흰색 */
  --foreground:         oklch(0.18 0.01 250);     /* 짙은 차콜 */

  /* 카드 / 표면 */
  --card:               oklch(1.00 0.000 0);
  --card-foreground:    oklch(0.18 0.01 250);

  /* 기본 액션 — teal/mint */
  --primary:            oklch(0.56 0.13 192);     /* 메인 틸 */
  --primary-foreground: oklch(0.99 0.002 200);

  /* 보조 표면 */
  --secondary:          oklch(0.95 0.010 192);
  --secondary-foreground: oklch(0.35 0.05 192);

  /* 음소거 */
  --muted:              oklch(0.96 0.004 200);
  --muted-foreground:   oklch(0.52 0.01 250);

  /* 강조 / 호버 */
  --accent:             oklch(0.92 0.020 192);
  --accent-foreground:  oklch(0.30 0.08 192);

  /* 위험 */
  --destructive:        oklch(0.55 0.20 25);

  /* 테두리 / 포커스 */
  --border:             oklch(0.90 0.004 200);
  --ring:               oklch(0.56 0.13 192);

  /* 사이드바 */
  --sidebar:            oklch(0.97 0.006 192);
  --sidebar-foreground: oklch(0.25 0.02 250);
  --sidebar-accent:     oklch(0.91 0.025 192);

  /* 시맨틱 색상 */
  --success:            oklch(0.55 0.15 155);
  --warning:            oklch(0.68 0.16 72);
  --danger:             oklch(0.55 0.20 25);
  --info:               oklch(0.56 0.13 240);

  --radius: 0.625rem;
}
```

### Dark 모드 (`.dark` 클래스)

```css
.dark {
  --background:         oklch(0.14 0.008 250);
  --foreground:         oklch(0.93 0.005 200);
  --card:               oklch(0.18 0.008 250);
  --primary:            oklch(0.65 0.13 192);
  --primary-foreground: oklch(0.10 0.005 250);
  --muted:              oklch(0.22 0.008 250);
  --muted-foreground:   oklch(0.60 0.008 250);
  --accent:             oklch(0.25 0.020 192);
  --border:             oklch(0.26 0.008 250);
  --sidebar:            oklch(0.12 0.008 250);
}
```

---

## 타이포그래피

기본 폰트: `'Noto Sans KR', system-ui, sans-serif`. 기본 크기: **16px** (모바일 원장 배려).

| 패턴 | 클래스 | 용도 |
|------|--------|------|
| 페이지 제목 | `text-2xl font-bold` | 페이지 상단 |
| 섹션 제목 | `text-lg font-semibold` | 주요 섹션 |
| 섹션 헤더 | `text-sm font-semibold text-muted-foreground uppercase tracking-wide` | 그룹 레이블 |
| 카드 제목 | `text-base font-medium` | 카드 헤더 |
| 본문 | `text-base` | 기본 텍스트 (16px 기준) |
| 보조 | `text-sm text-muted-foreground` | 설명, 부제 |
| 작은 레이블 | `text-xs text-muted-foreground` | 메타, 타임스탬프 |
| 대시보드 수치 | `text-3xl font-bold` | 핵심 지표 숫자 |

---

## 레이아웃 (3-zone)

Paperclip과 동일한 구조. 토큰만 교체.

```
┌──────────┬──────────────────────────────┬──────────────────────┐
│ 사이드바  │  브레드크럼 바                │                      │
│ (w-60)   ├──────────────────────────────┤  속성 패널            │
│          │  메인 콘텐츠 (flex-1)         │  (w-80, 선택)         │
└──────────┴──────────────────────────────┴──────────────────────┘
```

**모바일 (< md):** 사이드바 숨김 → 하단 탭 바 4개 (홈 / 상담 / 일정 / 더보기). 탭 높이 56px, 아이콘 24px.

---

## 핵심 컴포넌트

### ApprovalCard
상담·결제 승인 요청 카드. 원장이 한 탭으로 승인/거절.

| prop | type | 설명 |
|------|------|------|
| `title` | string | 요청 제목 |
| `requester` | string | 요청자 (AI 에이전트명) |
| `status` | `pending\|approved\|rejected` | 현재 상태 |
| `onApprove` | () => void | 승인 콜백 |
| `onReject` | () => void | 거절 콜백 |

사용 패턴: `<ApprovalCard title="환불 처리 요청" requester="민원 에이전트" status="pending" />`

### AgentStatusBadge
에이전트 실행 상태 인라인 표시.

| 상태 | 색상 | 아이콘 |
|------|------|--------|
| `running` | `--info` cyan + animate-pulse | Loader2 |
| `completed` | `--success` green | CheckCircle2 |
| `waiting` | `--warning` yellow | Clock |
| `error` | `--danger` red | AlertCircle |
| `idle` | muted | Minus |

### ScheduleCalendar
주간/월간 수업 일정 뷰. 수업명·원생수·담당 강사 표시. 터치 스크롤 최적화.

### SkillRegistryCard
k-skill 목록 카드. 스킬명, 버전, 상태(활성/비활성), 마지막 실행 시각 표시.

### DashboardMetric
핵심 지표 1개. `value`, `label`, `delta`, `icon` props. Paperclip MetricCard와 동일 구조, 토큰 교체.

---

## Paperclip에서 그대로 가져오는 것

구조와 동작은 동일. CSS 토큰만 HagentOS 팔레트로 교체.

- `EntityRow` — 목록 행 (상담 내역, 원생 목록 등)
- `GroupedList` — 상태별 그룹 목록
- `PropertyRow` — 키-값 속성 패널 행
- `MetricCard` (→ DashboardMetric으로 래핑)
- `ActivityFeed` — 에이전트 활동 피드
- `LogViewer` — 에이전트 실행 로그 (`bg-neutral-950 font-mono text-xs`)
- `InlineEditor` — 인라인 텍스트 편집
- `ProgressBar` — 예산/목표 달성률

---

## Paperclip과 다른 것

| 항목 | Paperclip | HagentOS |
|------|-----------|----------|
| 기본 모드 | Dark | **Light** |
| 주 색상 | 중립 회색 | **Teal/Mint** |
| 기본 폰트 | system-ui | **Noto Sans KR** |
| 기본 폰트 크기 | 14px (`text-sm`) | **16px (`text-base`)** |
| 터치 타겟 | 최소 36px | **최소 48px** |
| 페이지 제목 | `text-xl font-bold` | **`text-2xl font-bold`** |
| 대시보드 수치 | `text-2xl font-bold` | **`text-3xl font-bold`** |
| 모바일 네비 | 없음 | **Bottom tab bar 4개** |
| 레이블 언어 | 영어 | **한국어** |
| 상태 배지 | 영어 텍스트 | **한국어 텍스트** (예: "처리중", "완료") |

---

## 다크 모드

- 전환 방식: `document.documentElement.classList.toggle('dark')`
- 저장: `localStorage.setItem('theme', 'dark' | 'light')`
- 초기화: `<html>` 태그 인라인 스크립트로 깜빡임 방지 (next-themes 사용 권장)
- CSS는 `.dark` 클래스 기반 — media query 방식 아님

---

## 금지 규칙

- 디자인 토큰 밖의 색상 하드코딩 금지 (`text-teal-500` 직접 사용 금지 → `text-primary` 사용)
- 타이포 스케일 표 밖의 임의 폰트 크기 금지
- `shadow-md` 이상 그림자 금지 (xs, sm만 허용)
- `rounded-2xl` 이상 금지 (최대 `rounded-xl`, 알약형은 `rounded-full`)
- 새 재사용 컴포넌트 추가 시 `/design-guide` 페이지 업데이트 필수
- 상태 색상 직접 지정 금지 → `AgentStatusBadge` / `StatusBadge` 사용
