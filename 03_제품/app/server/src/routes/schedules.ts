// v0.3.0
import { Router } from "express"
import { eq } from "drizzle-orm"
import type { Db } from "@hagent/db"
import * as schema from "@hagent/db"

export function scheduleRoutes(db: Db): Router {
  const router = Router()

  router.get("/organizations/:orgId/schedules", async (req, res) => {
    try {
      const schedules = await db.select().from(schema.schedules)
        .where(eq(schema.schedules.organizationId, req.params.orgId))
      const instructors = await db.select().from(schema.instructors)
        .where(eq(schema.instructors.organizationId, req.params.orgId))

      const enriched = schedules.map(s => ({
        ...s,
        instructor: instructors.find(i => i.id === s.instructorId) ?? null,
      }))
      res.json(enriched)
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch schedules" })
    }
  })

  return router
}
