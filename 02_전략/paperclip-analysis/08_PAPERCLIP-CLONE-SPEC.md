---
tags:
  - type/reference
  - area/strategy
  - status/active
date: 2026-04-10
up: "[[paperclip-analysis]]"
---

# Paperclip 완전 분석 및 복제 명세서

> **목적**: 이 문서는 Paperclip 플랫폼을 완전히 분석하여 다른 에이전트가 동일한 구조를 기반으로 새 제품을 만들 수 있도록 준비된 복제 명세서다.
> **원본**: `paperclip-master/` 소스코드 직접 분석 (병렬 에이전트 4개 동시 투입)

---

## 1. 프로그램 개요 및 목적

### 한 줄 정의
Paperclip은 **AI 에이전트 회사를 운영하기 위한 오픈소스 자가호스팅 컨트롤 플레인**이다.

> *"If OpenClaw is an employee, Paperclip is the company."*

### 핵심 목적
- 사람이 회사를 정의하고, AI 에이전트를 역할에 배치하고 (CEO, CTO, 엔지니어 등)
- 비즈니스 목표를 할당하고
- 에이전트들의 작업을 통합된 운영 보드에서 모니터링하고 거버넌스

### Paperclip이 **아닌** 것
| ❌ 아닌 것 | ✅ 맞는 것 |
|-----------|-----------|
| 챗봇 | 회사 운영 시스템 |
| 에이전트 프레임워크 | 에이전트 관제 컨트롤 플레인 |
| 드래그앤드롭 워크플로 빌더 | 조직도·예산·거버넌스·목표 정렬 플랫폼 |
| 프롬프트 매니저 | 멀티에이전트 조율 보드 |
| 단일 에이전트 도구 | 포트폴리오 운영 플랫폼 |

---

## 2. 핵심 개념 및 용어

### Company (회사)
- 최상위 테넌트 단위
- 모든 엔티티(에이전트, 태스크, 목표, 비용, 활동 로그)는 Company에 스코프됨
- 단일 Paperclip 인스턴스에서 N개 회사를 완전 데이터 격리로 운영 가능
- 고유 `issuePrefix` (URL 슬러그, 예: `/COCO/dashboard`)

### Agent (에이전트)
- AI 직원 개념으로 모델링
- 속성: 역할(CEO/CTO/엔지니어 등), 시스템 프롬프트, 하트비트 스케줄, 월 예산, 보고라인(조직도), 어댑터(Claude/Codex/HTTP 등), 상태
- 지속적으로 실행되지 않음 — 하트비트와 이벤트 트리거로 깨어남 (태스크 배정, @멘션)

### Issue (이슈/태스크)
- 작업의 원자 단위. 모든 대화는 이슈에 추적
- 단일 담당자 체크아웃 (원자적, 중복 작업 방지)
- 목표 계층 연결 (이슈 → 목표 → 회사 미션)
- 상태: `todo | backlog | blocked | in_review | in_progress | done | cancelled`

### Goal (목표)
- 계층적 목표 구조: 회사 미션 → 프로젝트 목표 → 개별 태스크
- 모든 태스크에 전체 목표 조상이 전파 → 에이전트가 "why"를 항상 알 수 있음

### Project (프로젝트)
- 이슈 집합. 개요, 이슈 목록, 워크스페이스, 설정, 예산 포함

### Execution Workspace (실행 워크스페이스)
- 에이전트 작업 세션이 실행되는 런타임 샌드박스
- 격리된 git worktree, 클라우드 샌드박스 등

### Approval (승인)
- 거버넌스 게이트. 특정 행동(에이전트 채용, 전략 변경)은 인간 보드 승인 필요
- 상태: `pending | approved | rejected | revision_requested`

### Routine (루틴)
- 스케줄 기반 반복 태스크 (heartbeat 기반)
- 에이전트가 스케줄에 깨어나 작업 수행 (고객 지원, 리포트, SNS 등)
- cron 표현식 또는 interval 지원, 웹훅 트리거 지원

### Skill (스킬)
- 에이전트에 런타임 주입되는 재사용 가능한 지시 패키지
- 단순한 프롬프트 프리셋이 아님 — 이동 가능한 역량 번들
- Company 스코프로 관리, Skills Manager UI에서 관리

### Plugin (플러그인)
- Worker 엔트리포인트 + UI 엔트리포인트 양분 구조
- UI 슬롯: `page`, `sidebar`, `dashboardWidget`, `detailTab`, `settingsPage`, `toolbarButton`
- 50+ 역량 선언, 13가지 UI 슬롯, 23가지 도메인 이벤트 타입

### Adapter (어댑터)
- Paperclip 컨트롤 플레인과 실제 에이전트 실행 엔진을 연결하는 런타임 브릿지
- 내장 어댑터: `claude_local`, `codex_local`, `gemini_local`, `opencode_local`, `cursor`, `http`, `process`, `openclaw_gateway`, `hermes_local`, `pi_local`
- "수신할 수 있으면 채용 가능"

---

## 3. 시스템 아키텍처

### 4-레이어 스택
```
React UI (Vite + TailwindCSS + shadcn/ui)
           ↓
Express REST API (company-scoped + SSE/WebSocket)
           ↓
PostgreSQL (Drizzle ORM; 개발 시 embedded PGlite)
           ↓
Adapter Layer (claude_local / codex_local / process / http)
```

### 모노레포 구조
```
paperclip-master/
├── ui/              # React + Vite 보드 UI
├── server/          # Express REST API + 오케스트레이션
├── packages/
│   ├── db/          # Drizzle 스키마, 마이그레이션, DB 클라이언트
│   ├── shared/      # 공유 타입, 상수, 검증, API 경로
│   ├── adapters/    # 어댑터 구현체
│   ├── adapter-utils/ # 공유 어댑터 유틸
│   └── plugins/     # 플러그인 시스템 패키지
├── cli/             # paperclipai CLI 도구
├── skills/          # 내장 스킬 정의
└── doc/             # 스펙, 아키텍처 문서, 배포 가이드
```

### 배포 모드
| 모드 | 설명 |
|------|------|
| `local_trusted` | localhost 바인딩, 로그인 불필요, embedded PGlite |
| `authenticated` | 공개/비공개 접근 분리, 첫 관리자 보드 클레임, 팀 초대 시스템 |

### 실시간 업데이트
- WebSocket: `ws(s)://{host}/api/companies/{companyId}/events/ws`
- `LiveEvent` 객체 스트리밍 → React Query 캐시 무효화
- 지수 백오프 재연결 (max 15s)
- 토스트 알림 rate-limit (10초 창에 카테고리당 3개)

---

## 4. 전체 화면 구성 및 기능 명세

### 4.0 스크린샷으로 추가 확인된 UX 사실

아래 항목은 로컬 `paperclip-capture/` 스크린샷 묶음을 다시 읽고 보강한 내용이다. 즉 코드 구조 추론이 아니라 실제 UI 표면에서 다시 확인된 복제 대상이다.

1. **첫 경험은 chat이 아니라 setup과 board다**
   - 온보딩은 `회사 생성 -> 회사 설정 입력 -> 운영 보드 진입` 흐름으로 보인다.
   - 빈 상태에서 먼저 보이는 것은 대화창이 아니라 `빈 문서`, `새 이슈`, `새 프로젝트`, `새 루틴`, `조직도`, `설정`이다.

2. **빈 상태 설계가 강하다**
   - `새 이슈 생성 모달`, `새 프로젝트 생성 모달`, `루틴 생성 모달`, `문서 작성 모달`, `플러그인 매니저 빈 상태`, `빈 작업 화면`이 따로 존재한다.
   - 따라서 clone 시에는 “데이터가 있을 때”보다 “아직 아무것도 없을 때 무엇을 클릭하게 하는가”를 먼저 맞춰야 한다.

3. **문서 편집이 1급 시민이다**
   - 문서 목록, 문서 상세 리더, 본문 편집, 속성 패널, 태그 강조, 새 문서 작성 폼이 별도 화면으로 보인다.
   - 따라서 `Issue만 있는 툴`이 아니라 `문서-작업-실행`이 함께 도는 워크스페이스로 보는 게 맞다.

4. **설정 화면 비중이 높다**
   - `Company Settings`, `AI 정책`, `Content Manager`, 고급 설정, 기본 정보 편집, 프롬프트 편집 화면이 별도로 존재한다.
   - 즉 운영판 MVP라도 설정 UX를 placeholder 수준으로 두면 원본과 체감 차이가 커진다.

5. **실행 중인 작업은 list보다 live detail이 중요하다**
   - Inbox/Issue 상세 계열 캡처에서 “새 이슈 상세 + 라이브 런” 화면이 반복적으로 보인다.
   - 복제 시에는 단순 작업목록보다 `선택된 작업 + 라이브 transcript + 우측 속성` 경험을 먼저 맞추는 편이 낫다.

6. **조직도는 decorative가 아니라 실제 entrypoint다**
   - `조직도-보드-에이전트-배치-화면`, `조직도-또는-에이전트-맵-화면`, `CEO-에이전트-대시보드` 캡처를 보면 agent map이 독립 surface다.
   - 즉 clone에서도 org chart는 나중 장식이 아니라 핵심 탐색 화면이다.

### 4.1 레이아웃 쉘 (Layout Shell)

**파일**: `components/Layout.tsx`, `components/Sidebar.tsx`, `components/CompanyRail.tsx`

**좌측 사이드바 (240px)**:
- 회사 이름 + 브랜드 컬러 닷
- 검색 버튼 (Cmd+K → CommandPalette 오버레이)
- "New Issue" 빠른 생성 버튼
- **Dashboard** 네비게이션 (라이브 에이전트 실행 수 배지)
- **Inbox** 네비게이션 (미읽음 배지, 실패 시 위험 색조)
- 플러그인 사이드바 슬롯
- Work 섹션: Issues, Routines (Beta 배지), Goals
- Projects 섹션: `SidebarProjects` (접을 수 있는 프로젝트 목록)
- Agents 섹션: `SidebarAgents` (접을 수 있는 에이전트 목록, 라이브 상태 점)
- Company 섹션: Org, Skills, Costs, Activity, Settings

**CompanyRail**: 맨 왼쪽 회사 전환 아이콘 스트립
**BreadcrumbBar**: 계층 브레드크럼, 페이지별 업데이트
**CommandPalette**: 글로벌 Cmd+K 검색/네비게이션 오버레이

---

### 화면 1: Dashboard

**라우트**: `/:companyPrefix/dashboard`
**파일**: `pages/Dashboard.tsx`

**목적**: 실시간 회사 전체 개요 — 실행 중인 에이전트, 핵심 지표, 차트, 최근 활동

**API 호출**:
- `dashboardApi.summary()` → 에이전트 수, 태스크 수, 비용, 대기 승인, 예산 인시던트
- `activityApi.list()` → 최근 10개 활동 이벤트
- `issuesApi.list()` → 최근 태스크
- `agentsApi.list()` → 에이전트 메타데이터
- `heartbeatsApi.list()` → 차트용 에이전트 실행 이력

**UI 섹션 (위에서 아래)**:

1. **에이전트 없음 경고 배너** — 에이전트가 없으면 앰버색 배너 + "Create one here" 링크
2. **ActiveAgentsPanel** — 라이브 에이전트 실행 카드 그리드 (xl에서 4개, sm에서 2개):
   - 각 카드: 애니메이션 펄스 점, 에이전트 이름, "Live now" / "Finished X ago"
   - 연결된 이슈 제목 표시
   - `RunChatSurface` 내장 — 스크롤 가능한 라이브 트랜스크립트 피드
   - 외부 링크 → `/agents/:agentId/runs/:runId`
3. **예산 인시던트 배너** — 활성 예산 인시던트 시 빨간 그라디언트 알림; 일시정지된 에이전트 수, 대기 중 예산 승인 수, `/costs` 링크
4. **4개 지표 카드** (모바일 2열, xl 4열):
   - Agents Enabled (실행/일시정지/에러 분류) → `/agents` 링크
   - Tasks In Progress (오픈/차단) → `/issues` 링크
   - Month Spend 달러 (예산 %) → `/costs` 링크
   - Pending Approvals → `/approvals` 링크
5. **4개 차트 카드** (모바일 2열, lg 4열):
   - Run Activity (최근 14일 바 차트)
   - Issues by Priority (최근 14일)
   - Issues by Status (최근 14일)
   - Success Rate (최근 14일)
6. **플러그인 대시보드 위젯 슬롯** — `PluginSlotOutlet`
7. **2열 그리드** (모바일 스택):
   - 최근 활동 목록 — 새 이벤트 펄스-인 애니메이션 (980ms 타임아웃)
   - 최근 태스크 목록 — 상위 10개, StatusIcon + 이슈 ID + 제목 + 담당자 + timeAgo

---

### 화면 2: Agents 목록

**라우트**: `/:companyPrefix/agents/all|active|paused|error`
**파일**: `pages/Agents.tsx`

**목적**: 상태별 에이전트 탐색, 조직도 트리뷰 전환

**API 호출**:
- `agentsApi.list()` — 모든 에이전트
- `agentsApi.org()` — 계층 조직 트리 (org 뷰 시)
- `heartbeatsApi.list()` — 라이브 실행 데이터 (15초 갱신)

**UI**:
- **탭 바**: Pending | All | Active | Paused | Error
- **필터 드롭다운**: "종료된 에이전트 표시" 체크박스
- **뷰 전환 버튼**: 리스트 아이콘 vs GitBranch 아이콘 (모바일은 항상 리스트)
- **"New Agent" 버튼** → NewAgentDialog 열기
- **에이전트 수** "N agents" 표시

**리스트 뷰** (`EntityRow` 반복):
- 앞: 색상 상태 점 (CSS 애니메이션)
- 제목: 에이전트 이름
- 부제목: 역할 레이블 + 직함
- 뒤 (데스크탑): `LiveRunIndicator` + 어댑터 타입 레이블 + 마지막 하트비트 시간 + `StatusBadge`
- 클릭 → `/agents/:agentId/dashboard`

**조직 트리 뷰** (`OrgTreeNode`):
- 24px 깊이당 들여쓰기, 좌측 테두리 연결선
- 재귀적 렌더링

---

### 화면 3: Agent 상세

**라우트**: `/:companyPrefix/agents/:agentId/:tab`, `/agents/:agentId/runs/:runId`
**파일**: `pages/AgentDetail.tsx`
**탭**: `dashboard | instructions | skills | configuration | runs | budget`

**헤더** (항상 표시):
- `AgentIconPicker` 버튼 (이모지/아이콘, 클릭하면 팝오버 변경)
- 에이전트 이름 (h2, bold, truncated)
- 역할 레이블 + 직함 부제목
- "Assign Task" 버튼 → NewIssueDialog (에이전트 사전 입력)
- `RunButton` → 온디맨드 하트비트 호출; 새 실행으로 이동
- `PauseResumeButton` → 일시정지/활성화 토글
- `StatusBadge`
- 오버플로우 메뉴: Copy Agent ID | Reset Sessions | Terminate (파괴적)

**탭: Dashboard (AgentOverview)**:
- `LatestRunCard` — 가장 최근(또는 라이브) 실행: 상태 아이콘/배지, 실행 ID(8자), 호출 소스 필(Timer/Assignment/On-demand), 타임스탬프, 2-3줄 요약; 실행 상세 링크
- 4개 차트 카드 (대시보드와 동일)
- 최근 이슈 목록 (최대 10개) — `EntityRow`; "See All" 링크
- 비용 섹션: `CostsSection` — 입력/출력/캐시 토큰, 실행별 비용 테이블

**탭: Instructions (PromptsTab)**:
- 에이전트 시스템 프롬프트/지시 편집 가능한 마크다운 에디터
- Dirty 상태 추적 → 플로팅 Save/Cancel 바 (sticky top-6, blur 배경)

**탭: Skills (AgentSkillsTab)**:
- 설치된 스킬 목록 + 활성화/비활성화 토글
- 스킬 키, 이름, 설명 표시
- 관리되지 않는/내장 스킬은 읽기 전용

**탭: Configuration (AgentConfigurePage)**:
- `AgentConfigForm` — 어댑터별 필드 (어댑터 타입, 모델, API 엔드포인트 등)
- `EnvVarEditor` — 환경 변수 (시크릿 레덱스 마스킹)
- `AgentPermissionUpdate` — 에이전트 권한 토글

**탭: Runs (RunsTab)**:
- 날짜 정렬 하트비트 실행 목록
- 각 실행: 상태 아이콘, 실행 ID, 호출 소스, 타임스탬프, 토큰 수, 비용
- 클릭 → `RunTranscriptView` 인라인 로드
- `WorkspaceOperationsSection` — 격리 워크스페이스 실행의 git 작업 목록

**탭: Budget (BudgetPolicyCard)**:
- 월 예산 금액 입력
- 현재 지출 + 이용률 백분율 바
- 하드 스톱 토글, 경고 백분율 설정

---

### 화면 4: New Agent

**라우트**: `/:companyPrefix/agents/new`
**파일**: `pages/NewAgent.tsx`

**목적**: 단일 페이지 폼으로 새 에이전트 완전 생성

**UI**:
1. 에이전트 이름 입력 (크게, autofocus)
2. 직함 입력 (흐릿한 placeholder "VP of Engineering")
3. 속성 칩 행: 역할 픽커 (첫 에이전트면 CEO로 고정), `ReportsToPicker`
4. `AgentConfigForm` — 어댑터 선택, 모델, 하트비트 설정
5. 회사 스킬 섹션 — 비내장 스킬 체크박스 목록
6. 하단: Cancel + "Create agent" 버튼
7. 첫 에이전트 시 "이것이 CEO가 됩니다" 안내

---

### 화면 5: Issues 목록

**라우트**: `/:companyPrefix/issues`
**파일**: `pages/Issues.tsx`

**목적**: 회사 전체 이슈/태스크 탐색, 필터, 검색, 관리

**API 호출**:
- `issuesApi.list()` (필터: `participantAgentId`, `q` 쿼리 파라미터)
- `agentsApi.list()`, `projectsApi.list()` → 담당자/프로젝트 표시
- `heartbeatsApi.liveRunsForCompany()` — 5초 갱신, 라이브 실행 표시

**주요 기능** (`IssuesList.tsx`):
- 검색창 (`q` 쿼리 파라미터)
- 담당자 필터, 상태 필터, 우선순위 필터, 프로젝트 필터
- 뷰 상태 `localStorage` 유지 (`paperclip:issues-view`)
- 칸반 뷰 (`KanbanBoard`) 및 리스트 뷰 전환
- `FilterBar` — 모든 필터 컨트롤
- 각 이슈 행: 상태 아이콘, 우선순위 아이콘, ID, 제목, 프로젝트 배지, 담당자 아바타, 라이브 실행 표시, timeAgo

---

### 화면 6: Issue 상세

**라우트**: `/:companyPrefix/issues/:issueId`
**파일**: `pages/IssueDetail.tsx`

**목적**: 단일 이슈 전체 뷰 — 채팅 대화, 속성, 문서, 첨부파일, 실행 이력, 승인

**레이아웃**: 2패널 — 메인 콘텐츠(좌) + `PropertiesPanel`(우, SlidersHorizontal 버튼으로 접기)

**메인 탭**: Chat | Timeline | Documents

**탭: Chat (IssueChatThread)**:
- 전체 채팅 스레드 (인간 + AI 댓글)
- 각 댓글: Identity 아바타, 작성자 이름, 타임스탬프, 마크다운 본문
- AI 생성 댓글: 피드백 투표 버튼 (`OutputFeedbackButtons`)
- 낙관적 댓글 삽입 (저장 중 큐 상태)
- 파일 드래그앤드롭 첨부; `ImageGalleryModal` 인라인 이미지
- 하단 댓글 에디터: 마크다운 + `@mention` 지원
- `ApprovalCard` 인라인 렌더링
- `RunChatSurface` / 에이전트 실행 트랜스크립트 카드

**속성 패널 (IssueProperties)**:
- 상태, 우선순위, 담당자, 프로젝트, 라벨, 생성/수정 날짜

**탭: Timeline** — 시간순 활동 이벤트 (ActivityRow 목록)

**탭: Documents (IssueDocumentsSection)** — 마크다운 문서 목록, `DocumentDiffModal`

**헤더**:
- `InlineEditor` 이슈 제목 (클릭하면 편집)
- 상태/우선순위 아이콘, `StatusBadge`
- 오버플로우 메뉴: Copy ID, Delete issue
- `PluginLauncherOutlet` 플러그인 액션 버튼

---

### 화면 7: Projects 목록

**라우트**: `/:companyPrefix/projects`
**파일**: `pages/Projects.tsx`

**UI**:
- "Add Project" 버튼 → `NewProjectDialog`
- `EntityRow` 테두리 목록 (이름, 설명, 목표 날짜, StatusBadge)
- 클릭 → `/projects/:projectId/overview`

---

### 화면 8: Project 상세

**라우트**: `/:companyPrefix/projects/:projectId/:tab`
**탭**: `overview | list | workspaces | configuration | budget`
**파일**: `pages/ProjectDetail.tsx`

**헤더**:
- `ColorPicker` 프로젝트 색상
- `InlineEditor` 프로젝트 이름
- `StatusBadge`
- 탭 바 + 플러그인 런처 버튼

**탭: Overview** — 마크다운 설명 편집 (이미지 업로드 포함), 상태, 목표 날짜

**탭: Issues (list)** — 이 프로젝트 필터링된 `IssuesList` + `IssuesQuicklook` 사이드 패널

**탭: Workspaces** — 실행 워크스페이스 카드 그리드 (브랜치명, 상태, 생성 시간), `ExecutionWorkspaceCloseDialog`

**탭: Configuration (ProjectProperties)** — 상태, 목표 날짜, 설명, 담당 에이전트

**탭: Budget (BudgetPolicyCard)** — 에이전트 상세와 동일한 예산 정책 카드

---

### 화면 8.5: Documents / Knowledge Workspace

스크린샷에서 반복 확인된 별도 작업 영역이다. `Issue Detail > Documents` 서브섹션 수준을 넘어, 문서 목록과 본문 편집이 하나의 독립 surface처럼 보인다.

**복제 시 최소 포함 요소**:
- 좌측: 문서 목록 또는 테이블
- 중앙: 선택 문서 본문 리더/에디터
- 우측: 속성 패널 (`title`, `tags`, `updatedAt`, 연결 이슈/프로젝트)
- 상단: `New document`, 검색, 보기 전환

**화면 상태**:
- 빈 상태: "아직 문서 없음" + `New document`
- 리스트 상태: 문서 제목, 요약, 갱신시각
- 상세 읽기 상태: 렌더된 마크다운
- 편집 상태: 본문 에디터 + dirty save bar

**우리 clone 해석**:
- EduPaperclip에서는 이 영역이 `운영 매뉴얼`, `상담 스크립트`, `학원 정책`, `차량 규정`, `환불 기준`, `수강 안내 FAQ` 저장소가 될 가능성이 높다.
- 따라서 문서는 단순 attachment가 아니라 `도메인 지식 베이스`다.

---

### 화면 9: Approvals 목록

**라우트**: `/:companyPrefix/approvals/pending|all`
**파일**: `pages/Approvals.tsx`

**목적**: AI 에이전트 승인 요청 검토 및 처리

**UI**:
- 탭 바: Pending (노란 카운트 배지) | All
- `ApprovalCard` 그리드 (최신 순)

**ApprovalCard 구조**:
- 타입별 아이콘 원 (파일 쓰기, 툴 호출, 예산 초과 등)
- 타입 배지 (대문자, 예: "TOOL_CALL")
- "Requested by [에이전트 이름]" Identity 아바타
- 상태 필 (pending/approved/rejected/revision_requested)
- `ApprovalPayloadRenderer` — 페이로드 내용 렌더링 (파일 경로, 툴명, 파라미터, 예산 금액)
- 결정 메모 (처리 완료 시)
- 하단: Approve (초록) + Reject (빨간 파괴적) 버튼
- "View details" → `/approvals/:approvalId`

---

### 화면 10: Approval 상세

**라우트**: `/:companyPrefix/approvals/:approvalId`
**파일**: `pages/ApprovalDetail.tsx`

**UI**:
- 전체 `ApprovalCard` (비대기 상태에서는 승인/거절 버튼 없음)
- "Show raw payload" 토글 → 원시 JSON 표시
- 연결된 이슈 목록
- 댓글 스레드 (MarkdownBody + 텍스트에어리어)
- Approve / Reject / Request revision 버튼 (대기 중일 때)

---

### 화면 11: Routines

**라우트**: `/:companyPrefix/routines`
**파일**: `pages/Routines.tsx`

**목적**: 스케줄 및 템플릿 루틴 관리 — 반복 에이전트 태스크 패턴

**UI**:
- 탭: Routines | Runs
- 그룹화 선택: None / By Project / By Assignee
- 접을 수 있는 그룹
- 루틴 행 당: 활성화/비활성화 토글, 이름, 스케줄 설명, 마지막 실행 타임스탬프 + 상태, 동시성 정책 배지, MoreHorizontal 메뉴 (편집/아카이브/삭제), 확장 셰브론 → 루틴 변수 표시
- "New Routine" 버튼
- `RoutineRunVariablesDialog` — 수동 실행 전 런타임 변수 설정

---

### 화면 12: Routine 상세

**라우트**: `/:companyPrefix/routines/:routineId`
**파일**: `pages/RoutineDetail.tsx`

**주요 필드**:
- 이름 (auto-resize 텍스트에어리어)
- 마크다운 본문/설명 (`MarkdownEditor`)
- 스케줄 (`ScheduleEditor` — cron 표현식 빌더)
- 담당 에이전트 선택기, 프로젝트 선택기
- 동시성/캐치업 정책 드롭다운
- `RoutineVariablesEditor` — 템플릿 변수 정의
- 활성화/비활성화 토글

---

### 화면 13: Goals 목록

**라우트**: `/:companyPrefix/goals`
**파일**: `pages/Goals.tsx`

**UI**:
- "New Goal" 버튼 → `NewGoalDialog`
- `GoalTree` — 부모-자식 들여쓰기 계층 트리
- 각 목표 노드 → `/goals/:goalId`

---

### 화면 14: Goal 상세

**라우트**: `/:companyPrefix/goals/:goalId`
**파일**: `pages/GoalDetail.tsx`

**레이아웃**: 2패널 — 메인 + `GoalProperties` 사이드 패널

**탭**: Sub-goals | Linked Projects

**GoalProperties 패널**: 상태, 상위 목표, 목표 날짜

---

### 화면 15: Costs (비용)

**라우트**: `/:companyPrefix/costs`
**파일**: `pages/Costs.tsx`

**목적**: 종합 비용 분석, 예산 관리, 재무 원장

**날짜 범위 컨트롤**: 프리셋 선택기 + 사용자 지정 from/to 날짜 입력

**탭**: Overview | Budgets | Providers | Billers | Finance

**탭: Overview**:
- 지출 요약 타일 그리드 (총 지출, 에이전트별, 프로젝트별)
- `BillerSpendCard` — 청구 엔티티별 지출
- 모델 분류 테이블

**탭: Budgets**:
- `BudgetIncidentCard` 활성 인시던트 — "Keep Paused" 또는 "Raise Budget & Resume" 액션 버튼
- `BudgetPolicyCard` 에이전트/프로젝트 예산 정책 — 편집 가능한 월 한도, 이용률 바, 현재 지출

**탭: Providers**:
- AI 제공자별 서브탭 (Anthropic, OpenAI 등)
- 탭 레이블 총 토큰 + 총 비용
- `ProviderQuotaCard` 쿼터 창
- 입력/출력/캐시 토큰 + 행별 비용 모델 분류 테이블

**탭: Finance**:
- `FinanceSummaryCard` — 차변/대변/순/예상 지표 타일
- `FinanceBillerCard`, `FinanceKindCard`, `FinanceTimelineCard`
- 최근 재무 이벤트 목록

---

### 화면 16: Activity (활동 로그)

**라우트**: `/:companyPrefix/activity`
**파일**: `pages/Activity.tsx`

**목적**: 회사 전체 감사 로그

**UI**:
- 필터 드롭다운 — "All types" + 엔티티 타입별 옵션
- 최신순 `ActivityRow` 테두리 목록
- 각 행: 엔티티 타입 아이콘, 액션 설명, 행위자 Identity, 엔티티 이름/링크, 타임스탬프

---

### 화면 17: Inbox

**라우트**: `/:companyPrefix/inbox/mine|recent|unread|all`
**파일**: `pages/Inbox.tsx`

**목적**: 개인 액션 피드 — 이슈, 대기 승인, 실패 실행, 참여 요청

**탭**: Mine | Recent | Unread | All

**카테고리 필터**: Everything / Issues I touched / Join requests / Approvals / Failed runs / Alerts

**섹션**:
- 작업 항목: `IssueRow` + `SwipeToArchive` 래퍼 (모바일 스와이프)
- ApprovalCard 인라인 승인/거절
- 참여 요청 항목

**Alerts 섹션**: 에이전트별 실패 실행 알림, 예산 인시던트 알림

**열 커스터마이즈**: `Columns3` 버튼 → 표시 열 토글 (identifier, status, priority, project, assignee, agent, labels, updated date), localStorage 저장

**키보드 단축키**: `e` 아카이브, 화살표키 목록 탐색

---

### 화면 18: Org Chart

**라우트**: `/:companyPrefix/org`
**파일**: `pages/OrgChart.tsx`

**목적**: 에이전트 계층의 시각적 SVG 조직도 — 팬/줌 캔버스

**UI**:
- 자동 크기 조정 SVG 캔버스
- 노드: 200×100px 라운드 렉트 카드 (AgentIcon, 이름, 역할 레이블, 상태 점)
- SVG bezier 곡선으로 부모-자식 연결
- 마우스 드래그 패닝
- SVG 다운로드 버튼, Import/Export 링크
- 에이전트 카드 클릭 → `/agents/:agentId/dashboard`

**레이아웃 알고리즘**:
- `CARD_W=200`, `CARD_H=100`, `GAP_X=32`, `GAP_Y=80`, `PADDING=60`
- `subtreeWidth()` 재귀 폭 계산
- `layoutTree()` x/y 좌표 할당

---

### 화면 19: Company Skills

**라우트**: `/:companyPrefix/skills/*`
**파일**: `pages/CompanySkills.tsx`

**목적**: 회사 스킬 라이브러리 관리 — 설치, 보기, 편집, 삭제

**레이아웃 (2패널)**:
- 좌: 스킬 트리 브라우저 (파일 트리)
- 우: 스킬 상세/에디터

**스킬 목록**: 이름, 설명, 소스 배지 (GitHub, npm, Vercel, 내장 Paperclip 아이콘), 상태 (설치됨/업데이트 가능/에러)

**스킬 상세**:
- `PackageFileTree` — 접을 수 있는 파일 트리
- 마크다운 뷰어(`MarkdownBody`) 또는 코드 뷰어
- 편집 가능한 스킬은 `MarkdownEditor`
- 스킬 추가 다이얼로그: 이름, 키, 설명 + 파일 업로드 또는 GitHub URL
- 삭제 버튼 (확인 포함)
- "스캔 프로젝트" 버튼

---

### 화면 20: Company Settings

**라우트**: `/:companyPrefix/company/settings`
**파일**: `pages/CompanySettings.tsx`

**섹션** (max-w-2xl 폼):
1. **General** — 회사 이름, 설명; Save 버튼 (dirty 시 표시)
2. **Appearance** — `CompanyPatternIcon` 미리보기, 로고 업로드, 브랜드 컬러 (컬러 픽커 + hex 입력)
3. **Hiring** — `requireBoardApprovalForNewAgents` 토글
4. **Feedback Sharing** — 투표된 AI 출력 공유 토글; 약관 버전 + 동의 날짜
5. **Invites** — "Generate OpenClaw Invite Prompt" 버튼 → 초대 스니펫 생성 (자동 클립보드 복사)
6. **Company Packages** — Export/Import 페이지 링크
7. **Danger Zone** — "Archive company" 버튼 (빨간 테두리, 확인 다이얼로그)

---

### 화면 21: Instance Settings

**라우트**: `/instance/settings/*`

**일반 (`InstanceGeneralSettings.tsx`)**: 사용자명 로그 검열 토글, 키보드 단축키 토글, 피드백 공유 설정, Sign Out 버튼

**플러그인 매니저 (`PluginManager.tsx`)**: 설치된 플러그인 목록 + 활성화/비활성화 토글 + 신규 설치 폼

**어댑터 매니저 (`AdapterManager.tsx`)**: AI 어댑터 설정 목록 (Claude, Codex, Gemini, Cursor 등), 어댑터 활성화/비활성화, 기본 모델 선택

---

### 화면 22: Execution Workspace 상세

**라우트**: `/:companyPrefix/execution-workspaces/:workspaceId`
**파일**: `pages/ExecutionWorkspaceDetail.tsx`

**UI**: 워크스페이스 상태, 브랜치명, base ref, 생성 타임스탬프, 관련 이슈/에이전트 실행 링크, `ExecutionWorkspaceCloseDialog` 버튼

---

### 화면 23-28: 인증 및 온보딩 화면

| 화면 | 라우트 | 목적 |
|------|--------|------|
| Auth | `/auth` | 이메일/패스워드 또는 OAuth 로그인 |
| Board Claim | `/board-claim/:token` | 토큰 기반 보드 멤버십 클레임 |
| CLI Auth | `/cli-auth/:id` | CLI 도구 브라우저 OAuth 플로우 |
| Invite Landing | `/invite/:token` | 새 사용자 초대 온보딩 |
| Onboarding Wizard | (오버레이 컴포넌트) | 최초 설정 멀티스텝 마법사 (회사 생성 → 에이전트 추가) |

---

## 5. 전체 라우트 맵

```
/auth                                  → Auth (로그인)
/invite/:token                         → InviteLanding
/cli-auth/:id                          → CliAuth
/board-claim/:token                    → BoardClaim
/onboarding                            → OnboardingRoutePage
/instance/settings/general             → InstanceGeneralSettings
/instance/settings/heartbeats          → InstanceSettings
/instance/settings/experimental        → InstanceExperimentalSettings
/instance/settings/plugins             → PluginManager
/instance/settings/plugins/:pluginId   → PluginSettings
/instance/settings/adapters            → AdapterManager

/:company/dashboard                    → Dashboard
/:company/inbox/:tab                   → Inbox (mine/recent/unread/all)
/:company/issues                       → Issues 목록
/:company/issues/:issueId              → IssueDetail
/:company/routines                     → Routines 목록 + runs
/:company/routines/:routineId          → RoutineDetail
/:company/goals                        → Goals 트리
/:company/goals/:goalId                → GoalDetail
/:company/projects                     → Projects 목록
/:company/projects/:projectId/:tab     → ProjectDetail
/:company/projects/:pid/workspaces/:wsId → ProjectWorkspaceDetail
/:company/execution-workspaces/:wsId   → ExecutionWorkspaceDetail
/:company/agents/all|active|paused|error → Agents 목록
/:company/agents/new                   → NewAgent
/:company/agents/:agentId/:tab         → AgentDetail
/:company/agents/:agentId/runs/:runId  → AgentDetail (run transcript)
/:company/approvals/pending|all        → Approvals 목록
/:company/approvals/:approvalId        → ApprovalDetail
/:company/costs                        → Costs
/:company/activity                     → Activity 로그
/:company/org                          → OrgChart (SVG)
/:company/skills/*                     → CompanySkills
/:company/company/settings             → CompanySettings
/:company/company/export/*             → CompanyExport
/:company/company/import               → CompanyImport
/:company/plugins/:pluginId            → PluginPage (동적)
```

---

## 6. 데이터 모델 (엔티티 관계)

```
Instance (배포)
└── Company (멀티테넌트 조직)
    ├── Agent[]              (reportsTo → Agent, 조직도 트리)
    │   ├── AgentKey[]       (에이전트 API 키)
    │   ├── AgentSkill[]     (CompanySkill 풀에서)
    │   └── AgentRuntimeState + AgentTaskSession[]
    │
    ├── Project[]            (Goals[], Workspaces[], leadAgent)
    │   └── ProjectWorkspace[] (git repo / local path / remote)
    │       └── ExecutionWorkspace[] (태스크별 격리 워크스페이스)
    │           └── WorkspaceRuntimeService[] (개발 서버, 빌드 서비스)
    │
    ├── Goal[]               (계층적: parentId, 에이전트 소유)
    │
    ├── Issue[]              (에이전트 또는 사용자에게 배정)
    │   ├── parentId → Issue  (하위 태스크)
    │   ├── goalId → Goal
    │   ├── projectId → Project
    │   ├── IssueComment[]
    │   ├── IssueLabel[]
    │   ├── IssueDocument[] + DocumentRevision[]
    │   ├── IssueAttachment[]
    │   ├── IssueWorkProduct[]
    │   ├── Approval[] (연결)
    │   ├── HeartbeatRun[] (실행 이력)
    │   └── ExecutionWorkspace (현재 워크스페이스)
    │
    ├── Routine[]            (자동화 템플릿 → Issue 생성)
    │   └── RoutineTrigger[] (cron / webhook)
    │       └── RoutineRun[]
    │
    ├── Approval[]           (휴먼-인-더-루프 게이트)
    │   └── ApprovalComment[]
    │
    ├── CompanySkill[]       (공유 스킬 라이브러리)
    ├── CompanySecret[]      (환경 변수 / API 키)
    ├── JoinRequest[]        (에이전트 또는 인간 온보딩 큐)
    ├── ActivityEvent[]      (모든 엔티티 감사 로그)
    └── Budget + CostEvent[] (에이전트/프로젝트별 지출 추적)

Instance 레벨:
├── Adapter[]        (LLM 제공자 플러그인)
├── Plugin[]         (UI 기여 포함 통합 플러그인)
└── InstanceSettings (일반 + 실험적 기능 플래그)
```

### 핵심 엔티티 타입 정의

**Company**:
```typescript
{
  id, name, description, status: CompanyStatus, pauseReason, pausedAt
  issuePrefix, issueCounter
  budgetMonthlyCents, spentMonthlyCents
  requireBoardApprovalForNewAgents: boolean
  feedbackDataSharingEnabled: boolean
  brandColor, logoAssetId, logoUrl
  createdAt, updatedAt
}
```

**Agent**:
```typescript
{
  id, companyId, name, urlKey, role: AgentRole, title, icon
  status: AgentStatus     // running | paused | error | terminated
  reportsTo: string | null
  adapterType: AgentAdapterType
  adapterConfig, runtimeConfig: Record<string, unknown>
  budgetMonthlyCents, spentMonthlyCents
  permissions: { canCreateAgents }
  lastHeartbeatAt, createdAt, updatedAt
}
```

**Issue**:
```typescript
{
  id, companyId, identifier
  projectId, goalId, parentId
  title, description, status: IssueStatus, priority: IssuePriority
  assigneeAgentId | assigneeUserId
  checkoutRunId, executionWorkspaceId
  labels, blockedBy, blocks
  planDocument, documentSummaries
  startedAt, completedAt, createdAt, updatedAt
}
```

**HeartbeatRun**:
```typescript
{
  id, companyId, agentId
  invocationSource: HeartbeatInvocationSource  // timer | assignment | on_demand
  status: HeartbeatRunStatus  // queued | running | succeeded | failed | timed_out
  startedAt, finishedAt, error
  usageJson, resultJson
  sessionIdBefore, sessionIdAfter
  logStore, logRef, logBytes
  stdoutExcerpt, stderrExcerpt
  createdAt, updatedAt
}
```

---

## 7. API 레이어 완전 참조

### 인증 패턴
- 쿠키 기반 세션 (`credentials: "include"`)
- 에이전트 API 키 JWT (단일 에이전트 스코프)
- 배포 모드: `local_trusted` (인증 없음) vs `authenticated`

### 핵심 API 모듈 요약

| 모듈 | 엔드포인트 베이스 | 주요 기능 |
|------|-----------------|---------|
| `authApi` | `/api/auth/*` | 세션, 로그인/아웃, 회원가입 |
| `companiesApi` | `/api/companies/*` | CRUD, 내보내기/가져오기, 브랜딩 |
| `agentsApi` | `/api/companies/:id/agents`, `/api/agents/*` | CRUD, 일시정지/재개/종료, 스킬, 실행, 모델 |
| `projectsApi` | `/api/companies/:id/projects`, `/api/projects/*` | CRUD, 워크스페이스 관리 |
| `issuesApi` | `/api/companies/:id/issues`, `/api/issues/*` | CRUD, 체크아웃/릴리즈, 댓글, 문서, 첨부파일, 승인 연결 |
| `routinesApi` | `/api/companies/:id/routines`, `/api/routines/*` | CRUD, 트리거, 실행 |
| `goalsApi` | `/api/companies/:id/goals`, `/api/goals/*` | CRUD |
| `approvalsApi` | `/api/companies/:id/approvals`, `/api/approvals/*` | CRUD, 승인/거절/개정 요청 |
| `heartbeatsApi` | `/api/companies/:id/heartbeat-runs`, `/api/heartbeat-runs/*` | 실행 로그, 이벤트, 취소 |
| `activityApi` | `/api/companies/:id/activity` | 감사 로그 |
| `costsApi` | `/api/companies/:id/costs/*` | 비용 요약, 에이전트/프로젝트/제공자별 |
| `budgetsApi` | `/api/companies/:id/budgets/*` | 개요, 정책, 인시던트 |
| `secretsApi` | `/api/companies/:id/secrets` | CRUD, 로테이션 |
| `companySkillsApi` | `/api/companies/:id/skills` | CRUD, 가져오기, 파일 편집, 업데이트 |
| `adaptersApi` | `/api/adapters/*` | 목록, 설치, 제거, 활성화 |
| `pluginsApi` | `/api/plugins/*` | 설치, 활성화/비활성화, 설정, 브릿지 |
| `accessApi` | `/api/companies/:id/invites`, `/api/invites/*` | 초대, 참여 요청, CLI 인증 |
| `executionWorkspacesApi` | `/api/execution-workspaces/*` | 조회, 닫기 준비, 런타임 서비스 |
| `dashboardApi` | `/api/companies/:id/dashboard` | 요약 |
| `sidebarBadgesApi` | `/api/companies/:id/sidebar-badges` | 배지 수 |
| `healthApi` | `/api/health` | 버전, 배포 모드, 상태 |

### 이슈 목록 필터 파라미터
`status`, `projectId`, `assigneeAgentId`, `participantAgentId`, `assigneeUserId`, `touchedByUserId`, `inboxArchivedByUserId`, `unreadForUserId`, `labelId`, `executionWorkspaceId`, `originKind`, `originId`, `includeRoutineExecutions`, `q` (전문 검색), `limit`

### 특수 패턴
- **원자적 이슈 체크아웃**: `POST /issues/:id/checkout` — 단일 DB 작업으로 이중 클레임 방지
- **세션 재개**: `agent_task_sessions` 테이블에 에이전트+태스크 쌍별 불투명 세션 파라미터 저장
- **설정 리비전**: 에이전트 설정 변경은 before/after 스냅샷과 함께 버전 관리됨, 롤백 지원
- **페이지네이션**: 대부분 전체 결과 반환; HeartbeatRun 이벤트는 `afterSeq`; 로그 내용은 바이트 `offset`+`limitBytes`

---

## 8. 백엔드 시스템

### CLI 명령어 (paperclipai)

**`agent`**:
- `agent list -C <companyId>` — 회사의 모든 에이전트 나열
- `agent get <agentId>` — 단일 에이전트 레코드 조회
- `agent local-cli <agentRef> -C <companyId>` — 에이전트에 API 키 생성, `~/.codex/skills` 및 `~/.claude/skills`에 스킬 심링크, env vars 출력

**`company`**:
- `company list|get|create|delete`
- `company export|import` — ZIP 아카이브로 회사 전체 이식 (에이전트, 프로젝트, 이슈, 스킬)
- `import --collision rename|skip|replace --dry-run` 지원

**`approval`**: `list|get|create|approve|reject|request-revision|resubmit|comment`

**`issue`**:
- `list|get|create|update|comment`
- `issue checkout --agent-id` — 원자적 이슈 배정 (기본: `todo,backlog,blocked` 상태)
- `issue release` — 이슈를 todo로 반환하고 담당자 초기화

**`activity`**: `list -C <companyId>` — 감사 로그 (agentId, entityType, entityId 필터)

### 어댑터 시스템

**어댑터 레지스트리**: 서버, UI, CLI 세 곳에 각각 (`register`, `unregister`, `find` API)

**내장 어댑터 타입**:
| 타입 | 레이블 | 특이사항 |
|------|-------|---------|
| `process` | Shell Process | 서브프로세스 생성, 미지원 타입의 폴백 |
| `http` | HTTP Webhook | 외부 HTTP 엔드포인트 호출 |
| `claude_local` | Claude Code (local) | `claude` CLI 실행, 세션 재개, JWT, 스킬 `--add-dir tmpdir` |
| `codex_local` | Codex CLI (local) | `codex` CLI, `~/.codex/skills` 심링크 |
| `gemini_local` | Gemini CLI (local) | Gemini CLI 실행 |
| `opencode_local` | OpenCode CLI (local) | `opencode` CLI |
| `pi_local` | Pi CLI (local) | Pi 런타임 |
| `cursor` | Cursor CLI (local) | Cursor 헤드리스 실행 |
| `openclaw_gateway` | OpenClaw gateway | HTTP 기반 게이트웨이 |
| `hermes_local` | Hermes (local) | `hermes-paperclip-adapter` npm 패키지 |

**프로세스 어댑터 표준 env vars**: `PAPERCLIP_AGENT_ID`, `PAPERCLIP_COMPANY_ID`, `PAPERCLIP_API_URL`, `PAPERCLIP_RUN_ID`, `PAPERCLIP_TASK_ID`, `PAPERCLIP_WAKE_REASON`, `PAPERCLIP_APPROVAL_ID`, `PAPERCLIP_SERVICE_CREDENTIAL`

**ServerAdapterModule 인터페이스**:
- `execute(ctx)` — 핵심 실행 함수
- `testEnvironment(ctx)` — 환경 사전 검증 ("Test environment" 버튼)
- `sessionCodec` — 세션 직렬화/역직렬화 (하트비트 간 세션 재개)
- `listSkills / syncSkills` — 스킬 발견 및 동기화
- `listModels / detectModel` — 모델 발견
- `supportsLocalAgentJwt` — Paperclip JWT 토큰 지원 여부

### 스킬 시스템

**두 위치**:
- `skills/` (인레포, 런타임): 모든 에이전트에 주입 (paperclip, paperclip-create-agent 등)
- `.agents/skills/` (Paperclip 개발팀 메타스킬): company-creator, create-agent-adapter 등

**스킬 디렉터리 구조**: `SKILL.md` + frontmatter (`name`, `description`)

**어댑터별 스킬 주입 방식**:
- **claude_local**: tmpdir 생성 → 심링크 → `--add-dir <tmpdir>` → 실행 후 tmpdir 삭제 (CWD에 사이드이펙트 없음)
- **codex_local**: `~/.codex/skills/` 심링크

### 서버 아키텍처

**Express.js** (`server/src/app.ts`):
- 라우트 모듈: companies, agents, issues, approvals, goals, projects, routines, costs, activity, adapters, plugins, secrets, execution-workspaces, company-skills, sidebar-badges, dashboard, health, llms, plugin-ui-static, org-chart-svg
- 서비스 레이어: ~70개 서비스 파일

**DB**: Drizzle ORM + PostgreSQL
- 개발/로컬: embedded PostgreSQL 자동 시작 (외부 DB 불필요)
- 프로덕션: `DATABASE_URL` 환경 변수

**Auth**: 두 개의 Auth 주체
- `board` (인간 오퍼레이터): 쿠키 세션 via BetterAuth
- `agent` (에이전트): API 키 JWT, 단일 에이전트 스코프

**스토리지**: `local_disk` 또는 `S3` (플러그블 `StorageService`)

**시크릿**: `local_encrypted`, `aws_secrets_manager`, `gcp_secret_manager`, `vault` (4가지 제공자)

### 배포

**로컬 개발**: `pnpm dev`, embedded PostgreSQL, 로컬 디스크 스토리지

**Docker Compose** (`docker/docker-compose.yml`):
```yaml
services:
  db:    postgres:17-alpine
  server: 빌드된 이미지, PORT=3100, SERVE_UI=true
env: DATABASE_URL, BETTER_AUTH_SECRET, PAPERCLIP_DEPLOYMENT_MODE=authenticated, PAPERCLIP_PUBLIC_URL
volumes: pgdata, paperclip-data
```

**셀프호스팅/클라우드**: 외부 Postgres + S3 설정, `PAPERCLIP_DEPLOYMENT_MODE=authenticated`

---

## 9. 주요 공유 컴포넌트 레퍼런스

| 컴포넌트 | 목적 |
|---------|------|
| `ActiveAgentsPanel` | 라이브 에이전트 실행 카드 그리드 (Dashboard) |
| `AgentConfigForm` | 어댑터 + 모델 + 하트비트 설정 폼 |
| `AgentIconPicker` | 이모지/아이콘 픽커 팝오버 |
| `ApprovalCard` | 승인 요청 카드 (승인/거절 액션 포함) |
| `ApprovalPayloadRenderer` | 타입별 승인 페이로드 렌더링 |
| `BudgetPolicyCard` | 월 예산 한도 + 이용률 바 + 인시던트 |
| `BudgetIncidentCard` | 예산 인시던트 (유지/예산 올리기+재개 액션) |
| `CommandPalette` | 글로벌 Cmd+K 검색 오버레이 |
| `CompanyRail` | 맨 왼쪽 회사 아이콘 스트립 |
| `EntityRow` | 제네릭 목록 행 (제목, 부제목, 앞, 뒤) |
| `FilterBar` | 이슈 필터 컨트롤 (상태, 우선순위, 담당자, 프로젝트) |
| `GoalTree` | 계층 목표 트리 렌더러 |
| `Identity` | 아바타 + 이름 필 컴포넌트 |
| `InlineEditor` | 클릭 편집 텍스트 필드 (마크다운 멀티라인 지원) |
| `IssueChatThread` | 이슈 댓글 + 실행 트랜스크립트 전체 채팅 스레드 |
| `IssuesList` | 검색/필터/뷰 상태 포함 완전 이슈 목록 |
| `KanbanBoard` | 상태별 이슈 칸반 컬럼 |
| `LiveRunWidget` | 현재 실행 중인 에이전트 플로팅 위젯 |
| `MarkdownEditor` | @멘션 + 이미지 업로드 포함 마크다운 에디터 |
| `MetricCard` | 요약 지표 카드 (아이콘, 값, 레이블, 설명, 링크) |
| `PageTabBar` | 수평 탭 네비게이션 바 |
| `RunChatSurface` | 라이브/이력 실행 트랜스크립트 채팅 포맷 렌더링 |
| `RunTranscriptView` | 완전 상세 실행 트랜스크립트 뷰어 |
| `ScheduleEditor` | cron/인터벌 스케줄 빌더 UI |
| `StatusBadge` | 상태 필 배지 (상태별 색상) |
| `SwipeToArchive` | 모바일 스와이프 아카이브 제스처 래퍼 |
| `ActivityRow` | 활동 이벤트 행 (아이콘, 설명, 엔티티 링크, 타임스탬프) |
| `ActivityCharts` | RunActivityChart, PriorityChart, IssueStatusChart, SuccessRateChart |
| `BudgetSidebarMarker` | 사이드바 예산 이용률 표시기 |

---

## 10. 핵심 설계 결정 및 아키텍처 패턴

1. **운영 보드, 채팅 UI 아님**: 기본 UX는 운영 객체 보드 (목표, 이슈, 에이전트, 비용, 승인). 채팅 창이 아님.

2. **Company = 필수 테넌트 경계**: 모든 엔티티는 company 스코프. 완전한 격리.

3. **단일 담당자 태스크 체크아웃**: 원자적 이슈 체크아웃으로 중복 작업 방지.

4. **어댑터 분리 런타임**: 컨트롤 플레인은 어떤 모델이 에이전트를 구동하는지 알 필요 없음. Claude→Codex 전환에 코어 변경 없음.

5. **승인이 1급 시민**: 인간 거버넌스가 처음부터 내장. 언제든 일시정지, 재정의, 종료 가능.

6. **모든 태스크에 목표 조상 전파**: 에이전트는 태스크 제목뿐만 아니라 회사 미션까지의 전체 목표 체인을 받음.

7. **Worker+UI 양분 플러그인 시스템**: 확장이 단순 웹훅이 아님. 대시보드 특정 위치에 UI 주입 + 백엔드 스케줄 작업 실행.

8. **이식 가능한 회사 템플릿**: 전체 조직 구조(에이전트, 스킬, 목표)를 내보내고 가져올 수 있음. 시크릿 스크러빙.

9. **비용이 거버넌스 레버**: 에이전트별 월 예산 + 하드 스톱 자동 일시정지.

10. **로컬 우선 배포**: Paperclip 계정 불필요. 셀프호스팅. 임베디드 PGlite 제로설정 개발.

---

## 11.5 화면 복제 우선순위

다른 에이전트가 clone할 때는 전체 20+ 화면을 한 번에 복제하지 말고 아래 순서로 자른다.

### Phase 1. 운영 쉘 복제
- Layout Shell
- Dashboard
- Issues 목록
- Issue 상세의 `Chat + Properties`

이 단계의 목표는 "운영판처럼 보이는가"다.

### Phase 2. 실행/조직 복제
- Agents 목록
- Agent 상세 `Dashboard / Runs / Configuration`
- Org Chart
- Inbox

이 단계의 목표는 "AI 팀을 관리하는 컨트롤 플레인처럼 보이는가"다.

### Phase 3. 지식/설정 복제
- Documents workspace
- Company Skills
- Company Settings
- Adapter/Plugin Manager

이 단계의 목표는 "운영 지식과 확장 구조가 갖춰졌는가"다.

### Phase 4. 고급 운영 복제
- Routines
- Approvals
- Costs
- Activity
- Execution Workspace 상세

이 단계의 목표는 "사람 승인, 비용, 반복 업무, 감사로그까지 닫히는가"다.

---

## 12. Clone Scope Contract

다른 에이전트는 아래 원칙으로만 clone을 진행한다.

### 반드시 맞춰야 하는 것
- 왼쪽 고정 네비게이션 기반 `board-first shell`
- `Dashboard -> Issues -> Issue Detail -> Agents -> Org -> Settings`로 이어지는 정보 구조
- `list + detail + right properties panel` 패턴
- 빈 상태에서의 CTA
- live run/transcript를 볼 수 있는 surface
- 문서와 작업이 같은 워크스페이스에 공존하는 구조

### 그대로 복제하지 않아도 되는 것
- provider별 비용 카드의 세부 수치 레이아웃
- 모든 plugin slot의 exact 위치
- multi-company 완전 구현
- 원본의 모든 route 수
- 원본 색상, 아이콘, spacing token

### clone 성공 기준
- 다른 에이전트가 앱을 켰을 때 "chat app"이 아니라 "AI 운영 control plane"으로 인식한다.
- 빈 데이터 상태에서도 다음 행동이 명확하다.
- 새 작업 생성, 작업 선택, 라이브 실행 보기, 에이전트 구성, 조직 탐색까지 데모가 이어진다.
- 문서와 작업이 한 제품 안에서 연결된다.

---

## 13. Paperclip의 차별점

1. **"회사" 멘탈 모델**: 에이전트를 도구가 아닌 직원으로 모델링 — 조직도, 역할, 보고 라인, 예산, 거버넌스

2. **하트비트 기반 자율성 + 거버넌스**: 에이전트는 24/7 스케줄 실행, 승인 게이트와 예산 하드스톱으로 인간 제어 유지

3. **세션 간 영속 상태**: 재부팅 후에도 에이전트가 중단된 곳에서 재개. 컨텍스트 재설명 불필요.

4. **목표 인식 실행**: "왜"가 회사 미션에서 목표를 통해 모든 태스크까지 자동 전파

5. **진정한 멀티컴퍼니 격리**: 단일 배포, 다수 회사, 완전 데이터 분리

6. **BYO에이전트 철학**: Claude Code, Codex, Cursor, OpenClaw, Bash, HTTP — 어떤 런타임이든 작동

7. **감사 등급 추적성**: 모든 변경은 실행 ID와 함께 로깅, 모든 툴 콜 추적, 모든 결정 설명 가능

---

## 14. 기술 스택 요약

| 계층 | 기술 |
|------|------|
| **프론트엔드** | React 18, TypeScript, Vite, TailwindCSS, shadcn/ui, React Router v6, React Query (TanStack Query) |
| **백엔드** | Node.js, Express.js, TypeScript |
| **DB** | PostgreSQL (prod), PGlite (embedded dev), Drizzle ORM |
| **인증** | BetterAuth (세션), JWT (에이전트 API 키) |
| **실시간** | WebSocket, SSE |
| **패키지 관리** | pnpm (워크스페이스 모노레포) |
| **빌드** | Vite (프론트), tsc (백엔드) |
| **테스트** | Vitest |
| **컨테이너** | Docker, Docker Compose |
| **CI** | GitHub Actions |

---

## 15. 다른 에이전트를 위한 구현 입력 계약

이 문서를 받고 구현하는 에이전트는 최소 아래 입력을 먼저 확정한다.

1. **복제 대상 범위**
   - `Phase 1 shell only`
   - `Phase 1 + 2`
   - `full control plane`

2. **도메인 번역**
   - `Company`를 우리 제품에서 무엇으로 부를지
   - `Issue`를 학원 운영 용어로 무엇으로 부를지
   - `Agent`를 사용자에게 어떻게 노출할지

3. **문서 workspace 포함 여부**
   - 포함하면 `Knowledge / Policy / FAQ / Operations` 중 어떤 타입이 먼저 필요한지

4. **실행 surface**
   - 라이브 transcript를 바로 보여줄지
   - 요약 카드만 먼저 보여줄지

5. **설정 범위**
   - `Company Settings`만 먼저 만들지
   - `Adapters / Plugins / Skills`까지 한 번에 넣을지

### 권장 기본값
- 범위: `Phase 1 + 2`
- 문서 workspace: 포함
- live transcript: 포함
- multi-company: 제외
- 비용/승인: placeholder 또는 read-only

### 권장 로컬 폴더 계약
```text
app/
  routes/
    dashboard/
    issues/
    agents/
    org/
    documents/
    settings/
  features/
    shell/
    issue-detail/
    live-run/
    properties-panel/
    document-workspace/
  entities/
    company/
    agent/
    issue/
    document/
    activity/
  mocks/
    dashboard.ts
    issues.ts
    agents.ts
    documents.ts
```

이 정도 구조면 다른 에이전트가 `화면 복제 -> 더미 데이터 연결 -> 실제 spec 번역` 순서로 안전하게 진행할 수 있다.

---

*분석 갱신: 2026-04-10 | 코드 분석 + 로컬 스크린샷 재검토 반영 | 소스: `paperclip-master/` 직접 코드 분석, `paperclip-capture/` UI 캡처 세트*
