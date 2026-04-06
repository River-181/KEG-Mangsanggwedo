# .claude/skills/ — 프로젝트 커스텀 스킬

이 디렉토리는 이 프로젝트 전용 커스텀 스킬을 저장한다.

## 구조

```
skills/
├── README.md           ← 이 파일
├── evidence-logger/    ← 증빙 자동 기록 스킬 (예정)
├── judge-simulator/    ← 심사 시뮬레이션 스킬 (예정)
└── report-generator/   ← AI 리포트 생성 스킬 (예정)
```

## 글로벌 플러그인 vs 프로젝트 스킬

| 구분 | 글로벌 플러그인 | 프로젝트 스킬 |
|------|----------------|--------------|
| 위치 | `~/.claude/plugins/` | `.claude/skills/` |
| 범위 | 모든 프로젝트 | 이 프로젝트만 |
| 포터블 | ✗ (로컬 설치) | ✓ (프로젝트에 포함) |
| 설치 | `claude plugins install` | 폴더 복사하면 끝 |

## 커스텀 스킬 생성법

`skill-creator:skill-creator` 스킬을 사용하여 이 디렉토리 안에 생성한다.

## 글로벌 플러그인 목록

글로벌 플러그인은 `.context/plugins.md`에 기록되어 있으며,
새 컴퓨터에서는 `.claude/setup.sh`로 일괄 설치한다.
