---
tags:
  - evidence
  - bug-report
  - hagent-os
  - live
date: 2026-04-13
status: completed-partial
up: "[[_04_증빙_MOC]]"
---

# Live Smoke Bugs — 2026-04-13

## Summary
- total: 1
- P0: 1
- P1: 0
- P2: 0
- note: `BUG-001` 때문에 요청된 live smoke 나머지 영역은 전부 미검증 상태로 남았다.

### BUG-001 [severity P0]
- 페이지/컴포넌트: 라이브 엔트리포인트 전체 (`/`, `/api/health`, `/api/organizations`, org-prefixed UI routes)
- 재현:
  1. `curl -i -L https://hagent-os.up.railway.app/`
  2. `curl -i -L https://hagent-os.up.railway.app/api/health`
  3. 동일 러너에서 `python socket.getaddrinfo("hagent-os.up.railway.app", 443)` 실행
- 현재 동작:
  - public host DNS 해석이 요청 시작 전에 실패해 live smoke 전체가 중단된다.
  - shell error: `curl: (6) Could not resolve host: hagent-os.up.railway.app`
  - socket error: `gaierror(8, 'nodename nor servname provided, or not known')`
- 기대 동작:
  - 일반 외부 네트워크에서 `https://hagent-os.up.railway.app/` 가 HTML shell 또는 redirect를 반환하고, `GET /api/health` 가 health JSON을 반환해야 한다.
- 추정 원인 (있으면):
  - 1차 가설: 현재 테스트 러너의 outbound DNS/egress 제한
  - 2차 가설: Railway public domain binding/DNS misconfiguration 또는 live service down
  - 현재 증거만으로 앱 코드 결함과 deploy/network 결함을 분리 확정할 수는 없음
- 추정 수정 파일 (있으면):
  - `/Users/river/workspace/active/hagent-os/railway.toml`
  - `/Users/river/workspace/active/hagent-os/Dockerfile`
  - 또는 Railway dashboard의 public domain / service exposure 설정 (repo 밖)

## 미검증 항목
- 인증/온보딩 실브라우저 플로우
- 기본 org preload 및 시드 데이터 노출
- 케이스 속성 패널 상태/우선순위/담당 에이전트 변경
- quick ask / wakeup / runs 조회
- SSE 로그 스트리밍
- 승인 inbox → case → approve 결과
- settings 모델 선택 / adapter test / API 키 저장
