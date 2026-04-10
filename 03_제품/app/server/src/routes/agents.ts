import { Router } from "express"
import { eq } from "drizzle-orm"
import type { Db } from "@hagent/db"
import * as schema from "@hagent/db"
import { executeAgentRun } from "../services/execution.js"
import { publishEvent } from "../services/live-events.js"

export function agentRoutes(db: Db): Router {
  const router = Router()

  router.get("/organizations/:orgId/agents", async (req, res) => {
    try {
      const agents = await db
        .select()
        .from(schema.agents)
        .where(eq(schema.agents.organizationId, req.params.orgId))

      res.json(agents)
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch agents" })
    }
  })

  router.get("/agents/:id", async (req, res) => {
    try {
      const [agent] = await db
        .select()
        .from(schema.agents)
        .where(eq(schema.agents.id, req.params.id))

      if (!agent) {
        res.status(404).json({ error: "Agent not found" })
        return
      }

      res.json(agent)
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch agent" })
    }
  })

  router.patch("/agents/:id", async (req, res) => {
    try {
      const [existing] = await db
        .select()
        .from(schema.agents)
        .where(eq(schema.agents.id, req.params.id))

      if (!existing) {
        res.status(404).json({ error: "Agent not found" })
        return
      }

      const allowedFields = ["status", "systemPrompt"] as const
      type AllowedField = (typeof allowedFields)[number]

      const updates: Partial<Record<AllowedField, unknown>> = {}
      for (const field of allowedFields) {
        if (field in req.body) {
          updates[field] = req.body[field]
        }
      }

      const [updated] = await db
        .update(schema.agents)
        .set({ ...(updates as any), updatedAt: new Date() })
        .where(eq(schema.agents.id, req.params.id))
        .returning()

      res.json(updated)
    } catch (err) {
      res.status(500).json({ error: "Failed to update agent" })
    }
  })

  // POST /agents/:id/wakeup — trigger agent execution
  router.post("/:id/wakeup", async (req, res) => {
    try {
      const { reason: _reason, caseId: requestedCaseId } = req.body as {
        reason?: string
        caseId?: string
      }

      const [agent] = await db
        .select()
        .from(schema.agents)
        .where(eq(schema.agents.id, req.params.id))

      if (!agent) {
        res.status(404).json({ error: "Agent not found" })
        return
      }

      let caseId = requestedCaseId

      if (!caseId) {
        // Find a pending / open case for this agent's org
        const pendingCases = await db
          .select()
          .from(schema.cases)
          .where(eq(schema.cases.organizationId, agent.organizationId))

        const openCase = pendingCases.find(
          (c) =>
            c.status !== "done" &&
            c.status !== "in_review" &&
            c.assigneeAgentId === null,
        )

        if (!openCase) {
          res.status(422).json({ error: "No pending cases available for this agent" })
          return
        }

        caseId = openCase.id
      }

      const { runId } = await executeAgentRun(db, {
        organizationId: agent.organizationId,
        agentId: agent.id,
        caseId,
        agentType: agent.agentType,
        approvalLevel: agent.agentType === "complaint" ? 1 : 0,
      })

      res.status(202).json({ runId })
    } catch (err) {
      res.status(500).json({ error: "Failed to wake up agent" })
    }
  })

  // POST /agents/:id/stop — stop a running agent
  router.post("/:id/stop", async (req, res) => {
    try {
      const [agent] = await db
        .select()
        .from(schema.agents)
        .where(eq(schema.agents.id, req.params.id))

      if (!agent) {
        res.status(404).json({ error: "Agent not found" })
        return
      }

      // Find active run for this agent
      const allRuns = await db
        .select()
        .from(schema.agentRuns)
        .where(eq(schema.agentRuns.agentId, req.params.id))

      const activeRun = allRuns.find((r) => r.status === "running" || r.status === "queued")

      if (!activeRun) {
        res.status(404).json({ error: "No active run found for this agent" })
        return
      }

      await db
        .update(schema.agentRuns)
        .set({
          status: "failed",
          error: "Cancelled by user",
          updatedAt: new Date(),
        })
        .where(eq(schema.agentRuns.id, activeRun.id))

      publishEvent(agent.organizationId, "agent.run.cancelled", {
        runId: activeRun.id,
        agentId: agent.id,
        caseId: activeRun.caseId,
      })

      res.json({ runId: activeRun.id, status: "cancelled" })
    } catch (err) {
      res.status(500).json({ error: "Failed to stop agent" })
    }
  })

  return router
}
