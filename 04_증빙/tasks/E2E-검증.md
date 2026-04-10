---
tags:
  - area/product
  - type/task
  - status/active
date: 2026-04-11
up: "[[_04_증빙_MOC]]"
status: in-progress
priority: P0
track: 제품
owner: River+AI
day: 6
due: 2026-04-11
demo_critical: true
---
# E2E 검증

## 설명

서버 재시작 후 브라우저에서 전체 플로우를 1회 통과시킨다.
레포: `/Users/river/workspace/active/hagent-os/`

## 완료 조건

- [ ] `pnpm dev` 기동 → http://localhost:5174/ 온보딩 진입 확인
- [ ] 학원 생성 → CEO 에이전트 생성 → 첫 dispatch 실행
- [ ] 케이스 제목 = 실제 지시 내용 확인
- [ ] 에이전트 배정 (assigneeAgentId) 확인
- [ ] 승인 클릭 → Case.status = "done" 확인
- [ ] 거절 클릭 → Case.status = "todo" 롤백 확인
- [ ] OrgChart reportsTo 기반 트리 렌더링 확인
- [ ] 새 학원 추가 → 데이터 격리 확인
