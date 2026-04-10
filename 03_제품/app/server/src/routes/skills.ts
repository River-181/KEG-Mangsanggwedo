import { Router } from "express"
import type { Db } from "@hagent/db"

interface Skill {
  slug: string
  name: string
  version: string
  description: string
  type: "builtin" | "external_mcp"
  agentTypes: string[]
}

const SKILLS: Skill[] = [
  {
    slug: "complaint-classifier",
    name: "민원 분류기",
    version: "0.1.0",
    description: "민원을 유형별로 자동 분류",
    type: "builtin",
    agentTypes: ["complaint"],
  },
  {
    slug: "korean-tone-guide",
    name: "학부모 응대 톤앤매너",
    version: "0.1.0",
    description: "학부모 커뮤니케이션 톤 가이드",
    type: "builtin",
    agentTypes: ["complaint", "retention"],
  },
  {
    slug: "churn-risk-calculator",
    name: "이탈 위험 계산기",
    version: "0.1.0",
    description: "학생 이탈 위험 점수 산출",
    type: "builtin",
    agentTypes: ["retention"],
  },
  {
    slug: "korean-law-mcp",
    name: "한국 법률 검색",
    version: "1.0.0",
    description: "학원법·교육법 조문 검색 (MCP)",
    type: "external_mcp",
    agentTypes: ["compliance"],
  },
  {
    slug: "solapi-mcp",
    name: "알림톡/SMS 발송",
    version: "1.0.0",
    description: "Solapi MCP로 학부모 알림 발송",
    type: "external_mcp",
    agentTypes: ["notification"],
  },
  {
    slug: "google-calendar-mcp",
    name: "Google Calendar",
    version: "1.0.0",
    description: "Google Calendar 양방향 동기화",
    type: "external_mcp",
    agentTypes: ["scheduler"],
  },
]

export function skillRoutes(_db: Db): Router {
  const router = Router()

  router.get("/", (_req, res) => {
    res.json(SKILLS)
  })

  router.get("/:slug", (req, res) => {
    const skill = SKILLS.find((s) => s.slug === req.params.slug)

    if (!skill) {
      res.status(404).json({ error: "Skill not found" })
      return
    }

    res.json(skill)
  })

  return router
}
