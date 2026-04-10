import { Router } from "express"
import { eq, and } from "drizzle-orm"
import type { Db } from "@hagent/db"
import * as schema from "@hagent/db"

export function approvalRoutes(db: Db): Router {
  const router = Router()

  router.get("/organizations/:orgId/approvals", async (req, res) => {
    try {
      const { status } = req.query

      const conditions = [
        eq(schema.approvals.organizationId, req.params.orgId),
      ]

      if (status && typeof status === "string") {
        const validStatuses = [
          "pending",
          "approved",
          "rejected",
          "revision_requested",
        ] as const
        type ApprovalStatus = (typeof validStatuses)[number]
        if (validStatuses.includes(status as ApprovalStatus)) {
          conditions.push(
            eq(schema.approvals.status, status as ApprovalStatus),
          )
        }
      }

      const approvals = await db
        .select()
        .from(schema.approvals)
        .where(and(...conditions))

      res.json(approvals)
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch approvals" })
    }
  })

  router.get("/approvals/:id", async (req, res) => {
    try {
      const [approval] = await db
        .select()
        .from(schema.approvals)
        .where(eq(schema.approvals.id, req.params.id))

      if (!approval) {
        res.status(404).json({ error: "Approval not found" })
        return
      }

      res.json(approval)
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch approval" })
    }
  })

  router.post("/approvals/:id/decide", async (req, res) => {
    try {
      const { decision, comment } = req.body as {
        decision: "approved" | "rejected" | "revision_requested"
        comment?: string
      }

      const validDecisions = ["approved", "rejected", "revision_requested"] as const
      if (!validDecisions.includes(decision)) {
        res.status(400).json({ error: "Invalid decision value" })
        return
      }

      const [existing] = await db
        .select()
        .from(schema.approvals)
        .where(eq(schema.approvals.id, req.params.id))

      if (!existing) {
        res.status(404).json({ error: "Approval not found" })
        return
      }

      const [updated] = await db
        .update(schema.approvals)
        .set({
          status: decision,
          decidedBy: "board",
          decidedAt: new Date(),
          decision: comment ? { comment } : {},
          updatedAt: new Date(),
        })
        .where(eq(schema.approvals.id, req.params.id))
        .returning()

      if (decision === "approved" && existing.caseId) {
        await db
          .update(schema.cases)
          .set({ status: "done", updatedAt: new Date() })
          .where(eq(schema.cases.id, existing.caseId))
      }

      await db.insert(schema.activityEvents).values({
        organizationId: existing.organizationId,
        actorType: "board",
        actorId: "board",
        action: `approval.${decision}`,
        entityType: "approval",
        entityId: existing.id,
        entityTitle: `Approval ${existing.id}`,
        metadata: comment ? { comment } : {},
      })

      res.json(updated)
    } catch (err) {
      res.status(500).json({ error: "Failed to process decision" })
    }
  })

  return router
}
