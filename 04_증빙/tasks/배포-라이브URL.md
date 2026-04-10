---
tags:
  - area/product
  - type/task
  - status/active
date: 2026-04-11
up: "[[_04_증빙_MOC]]"
status: todo
priority: P0
track: 인프라
owner: 김주용
day: 6
due: 2026-04-12
demo_critical: true
---
# 배포 — 라이브 URL 확보

## 설명

Railway에 hagent-os 레포를 배포하고 라이브 URL을 확보한다.
라이브 URL은 제출 필수 항목이다.

## 완료 조건

- [ ] Railway 프로젝트 생성
- [ ] PostgreSQL 서비스 연결 (또는 Neon.tech)
- [ ] 환경변수 설정 (`DATABASE_URL`, `ANTHROPIC_API_KEY` 선택)
- [ ] 서버 빌드 성공
- [ ] UI 빌드 성공
- [ ] 라이브 URL 접속 → 온보딩 진입 확인
- [ ] `River-181/hagent-os` README에 라이브 URL 삽입
