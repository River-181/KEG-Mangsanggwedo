---
tags: [context, mcp]
date: 2026-04-06
---
# MCP 서버 설정

> 이 프로젝트에서 사용하는 MCP(Model Context Protocol) 서버 목록.

## 현재 활성 서버

| 서버 | 용도 | 상태 |
|------|------|------|
| context7 | 프레임워크/라이브러리 문서 실시간 조회 | ✅ 활성 |
| Notion | 프로젝트 관리, 문서 공유 | ✅ 활성 |
| Excalidraw | 아키텍처 다이어그램, 와이어프레임 | ✅ 활성 |
| Gmail | 제출 이메일 관리 | ✅ 활성 |
| Google Calendar | 일정 관리 | ✅ 활성 |
| Magic Patterns | UI 컴포넌트 생성 | ✅ 활성 |
| Figma | 디자인 시스템, 코드 연결 | ✅ 활성 |

## 설정 필요 서버 (필요 시 활성화)

| 서버 | 용도 | 필요 시점 |
|------|------|-----------|
| GitHub MCP | PR, 이슈, 리포 관리 | git init 후 |
| Supabase | 데이터베이스 | 기술 스택 결정 시 |
| Vercel | 배포 | 배포 시 |
| Cloudflare | CDN, Workers | 필요 시 |

## 사용 가이드

### context7 — 라이브러리 문서 조회
프레임워크나 라이브러리 사용 시 자동 활성. 최신 문서를 실시간으로 가져옴.
```
# 사용 예: React 문서 조회
context7 resolve-library-id → query-docs
```

### Excalidraw — 다이어그램
아키텍처 설계, 사용자 흐름도, 와이어프레임 작성에 활용.

### Gmail — 제출 관리
최종 제출 시 이메일 회신으로 제출물 전송. 제출 대상: dla0625@koreaedugroup.com
