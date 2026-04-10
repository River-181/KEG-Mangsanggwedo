// v0.4.0
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

  // POST /organizations/:orgId/schedules
  router.post("/organizations/:orgId/schedules", async (req, res) => {
    try {
      const { orgId } = req.params
      const { title, type, dayOfWeek, startTime, endTime, room, instructorId } = req.body

      if (!title || dayOfWeek === undefined) {
        res.status(400).json({ error: "title and dayOfWeek required" })
        return
      }

      const [schedule] = await db
        .insert(schema.schedules)
        .values({
          organizationId: orgId,
          title,
          type: type ?? "regular",
          dayOfWeek: Number(dayOfWeek),
          startTime: startTime ?? "09:00",
          endTime: endTime ?? "10:00",
          room: room ?? null,
          instructorId: instructorId ?? null,
        })
        .returning()

      res.status(201).json(schedule)
    } catch (err) {
      res.status(500).json({ error: "Failed to create schedule" })
    }
  })

  return router
}
