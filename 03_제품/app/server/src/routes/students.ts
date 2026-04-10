// v0.3.0
import { Router } from "express"
import { eq } from "drizzle-orm"
import type { Db } from "@hagent/db"
import * as schema from "@hagent/db"

function maskPhone(phone: string | null | undefined): string {
  if (!phone) return ""
  // 010-1234-5678 → 010-****-5678
  return phone.replace(/(\d{3})-?(\d{3,4})-?(\d{4})/, "$1-****-$3")
}

function maskEmail(email: string | null | undefined): string {
  if (!email) return ""
  const [local, domain] = email.split("@")
  if (!domain) return email
  return local.slice(0, 3) + "***@" + domain
}

export function studentRoutes(db: Db): Router {
  const router = Router()

  // List students with parent info (masked)
  router.get("/organizations/:orgId/students", async (req, res) => {
    try {
      const students = await db.select().from(schema.students)
        .where(eq(schema.students.organizationId, req.params.orgId))
      const parents = await db.select().from(schema.parents)
        .where(eq(schema.parents.organizationId, req.params.orgId))

      const enriched = students.map(s => {
        const parent = parents.find(p => p.studentId === s.id)
        return {
          ...s,
          phone: maskPhone((s as any).phone),
          email: maskEmail((s as any).email),
          parent: parent ? {
            id: parent.id,
            name: parent.name,
            relation: parent.relation,
            phone: maskPhone(parent.phone),
            email: maskEmail(parent.email),
          } : null,
        }
      })
      res.json(enriched)
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch students" })
    }
  })

  // Get single student detail (masked)
  router.get("/students/:id", async (req, res) => {
    try {
      const [student] = await db.select().from(schema.students)
        .where(eq(schema.students.id, req.params.id))
      if (!student) { res.status(404).json({ error: "Not found" }); return }

      const parents = await db.select().from(schema.parents)
        .where(eq(schema.parents.studentId, req.params.id))

      const attendanceRecords = await db.select().from(schema.attendance)
        .where(eq(schema.attendance.studentId, req.params.id))

      res.json({
        ...student,
        phone: maskPhone((student as any).phone),
        email: maskEmail((student as any).email),
        parents: parents.map(p => ({
          ...p,
          phone: maskPhone(p.phone),
          email: maskEmail(p.email),
        })),
        attendance: attendanceRecords,
      })
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch student" })
    }
  })

  // Instructors list
  router.get("/organizations/:orgId/instructors", async (req, res) => {
    try {
      const instructors = await db.select().from(schema.instructors)
        .where(eq(schema.instructors.organizationId, req.params.orgId))
      res.json(instructors)
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch instructors" })
    }
  })

  return router
}
