---
tags: [area/product, type/diagram, status/active]
date: 2026-04-09
up: "[[hagent-os/INDEX]]"
aliases: [demo-user-flow, 데모-사용자흐름]
---
# Demo/User Flow — 2분 데모 시나리오

> "학부모 민원 접수 → AI 에이전트 초안 → 원장 원클릭 승인 → 완결"
> 대회 심사용 2분 데모 크리티컬 패스. 기준 문서: [[02_product/user-journeys]], [[05_workflows/complaint-handling]]

## 핵심 데모 흐름 (Happy Path)

```mermaid
flowchart TD
    Start(["🎬 데모 시작"]) --> A

    A["원장이 Board에 접속\n/학원명/dashboard"]
    A --> B["오늘 현황 확인\n• 미처리 민원 3건\n• 이탈 위험 학생 2명\n• 에이전트 상태: idle"]

    B --> C{"신규 민원 발생\n학부모 홍씨 연락"}

    C --> D["케이스 등록\n[+ 새 케이스 등록]\n타입: complaint\n내용: 성적 불만 (중2 영어)"]

    D --> E["Orchestrator 자동 실행\n🔵 pulsing blue dot\n'분석 중...'"]

    E --> F["Orchestrator → 계획 수립\nClaude API 호출\nassigneeAgentId: complaint-agent\napprovalLevel: 1"]

    F --> G["Complaint Agent 실행\n🔵 running\n• 케이스 분류: 성적 불만\n• 학생 이력 조회\n• 응답 초안 생성"]

    G --> H["초안 완성 (3~5초)\n승인 큐 진입\n원장에게 알림"]

    H --> I["원장: 승인 큐 확인\n/학원명/approvals\n초안 미리보기"]

    I --> J{"원장 검토"}

    J -->|"✓ 승인"| K["Case 완결\nstatus: resolved\n학부모 답변 발송 대기"]
    J -->|"✏️ 편집 후 승인"| L["초안 수정 후 승인"]
    J -->|"✗ 반려"| M["에이전트 재작업\n추가 지시사항 포함"]

    K --> N["ActivityEvent 기록\nAudit Trail 생성"]
    L --> N
    M --> G

    N --> O(["🎬 데모 완료\n'3초 만에 AI가 초안 작성,\n원장은 클릭 한 번으로 완결'"])
```

---

## 데모 확장 흐름 (2분 이후 선택적 시연)

```mermaid
flowchart LR
    subgraph "Retention Agent 시연"
        R1["이탈 위험 학생 카드\n대시보드에 표시"]
        R2["Retention Agent\n학부모 메시지 초안"]
        R3["원클릭 승인 → 발송"]
        R1 --> R2 --> R3
    end

    subgraph "에이전트 조직도 시연"
        O1["Org Chart\n계층 카드 트리"]
        O2["Orchestrator\n↓ Complaint | Retention"]
        O1 --> O2
    end

    subgraph "k-skill 레지스트리 시연"
        K1["korean-law-mcp\n장착됨 ✓"]
        K2["solapi-mcp\n설치하기"]
        K1 --> K2
    end
```

---

## 심사 포인트 대응

| 심사 기준 | 데모에서 보여줄 것 |
|-----------|-------------------|
| 기술적합성 30% | 에이전트 병렬 실행 + Claude API 실시간 호출 |
| 창의성 25% | "AI 팀" 개념 — 챗봇이 아닌 역할 기반 오케스트레이션 |
| 완성도 20% | 케이스 생성 → 승인 → 완결 전체 흐름 동작 |
| AI활용 15% | Orchestrator가 계획 수립 → 에이전트 배정 → 레벨 결정 |
| 팀워크 10% | 이승보(에이전트 로직) + 김주용(UI/인프라) 역할 분담 |
