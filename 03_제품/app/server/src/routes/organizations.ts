import { Router } from "express"
import { eq } from "drizzle-orm"
import type { Db } from "@hagent/db"
import * as schema from "@hagent/db"

export function organizationRoutes(db: Db): Router {
  const router = Router()

  router.get("/", async (_req, res) => {
    try {
      const orgs = await db.select().from(schema.organizations)
      res.json(orgs)
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch organizations" })
    }
  })

  // POST / — 새 조직 (학원) 생성
  router.post("/", async (req, res) => {
    try {
      const { name, description } = req.body
      if (!name || !name.trim()) {
        res.status(400).json({ error: "name required" })
        return
      }
      const prefix = name
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9가-힣]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 30) || `org-${Date.now()}`

      // prefix 충돌 방지
      const [existing] = await db
        .select()
        .from(schema.organizations)
        .where(eq(schema.organizations.prefix, prefix))
      const finalPrefix = existing ? `${prefix}-${Date.now().toString(36).slice(-4)}` : prefix

      const [org] = await db
        .insert(schema.organizations)
        .values({
          name: name.trim(),
          prefix: finalPrefix,
          description: description ?? null,
        })
        .returning()

      // 기본 에이전트 4종 자동 생성
      const agentDefaults = [
        { name: "오케스트레이터", slug: "orchestrator", agentType: "orchestrator" as const, icon: "brain", systemPrompt: `${name} 운영 전반을 조율하는 AI 매니저입니다.` },
        { name: "민원담당", slug: "complaint", agentType: "complaint" as const, icon: "shield", systemPrompt: `${name}의 학부모 민원을 접수하고 분석하여 응대 초안을 작성합니다.` },
        { name: "이탈방어", slug: "retention", agentType: "retention" as const, icon: "heart", systemPrompt: `${name}의 수강생 이탈 위험을 감지하고 상담 권고를 생성합니다.` },
        { name: "스케줄러", slug: "scheduler", agentType: "scheduler" as const, icon: "calendar", systemPrompt: `${name}의 수업 일정을 관리하고 강사 대타를 조율합니다.` },
      ]
      for (const agent of agentDefaults) {
        await db.insert(schema.agents).values({
          organizationId: org.id,
          ...agent,
          status: "idle",
          skills: [],
          adapterType: "claude_local",
        })
      }

      res.status(201).json(org)
    } catch (err) {
      res.status(500).json({ error: "Failed to create organization" })
    }
  })

  router.get("/:id", async (req, res) => {
    try {
      const [org] = await db
        .select()
        .from(schema.organizations)
        .where(eq(schema.organizations.id, req.params.id))

      if (!org) {
        res.status(404).json({ error: "Organization not found" })
        return
      }

      res.json(org)
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch organization" })
    }
  })

  return router
}
