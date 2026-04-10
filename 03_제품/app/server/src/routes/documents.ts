// v0.2.0
import { Router } from "express"
import { eq } from "drizzle-orm"
import type { Db } from "@hagent/db"
import * as schema from "@hagent/db"

export function documentRoutes(db: Db): Router {
  const router = Router()

  // List documents for org
  router.get("/organizations/:orgId/documents", async (req, res) => {
    try {
      const docs = await db.select().from(schema.documents)
        .where(eq(schema.documents.organizationId, req.params.orgId))
      res.json(docs)
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch documents" })
    }
  })

  // Get single document
  router.get("/documents/:id", async (req, res) => {
    try {
      const [doc] = await db.select().from(schema.documents)
        .where(eq(schema.documents.id, req.params.id))
      if (!doc) { res.status(404).json({ error: "Not found" }); return }
      res.json(doc)
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch document" })
    }
  })

  // Create document
  router.post("/organizations/:orgId/documents", async (req, res) => {
    try {
      const { title, category, body, tags } = req.body

      if (!title) {
        res.status(400).json({ error: "title required" })
        return
      }

      const [doc] = await db.insert(schema.documents).values({
        organizationId: req.params.orgId,
        title,
        category: category ?? "general",
        body: body ?? "",
        tags: tags ?? [],
      }).returning()
      res.status(201).json(doc)
    } catch (err) {
      res.status(500).json({ error: "Failed to create document" })
    }
  })

  // Update document
  router.patch("/documents/:id", async (req, res) => {
    try {
      const allowedFields = ["title", "body", "category", "tags"] as const
      const updates: Record<string, unknown> = {}
      for (const f of allowedFields) {
        if (f in req.body) updates[f] = req.body[f]
      }
      const [updated] = await db.update(schema.documents)
        .set({ ...(updates as any), updatedAt: new Date() })
        .where(eq(schema.documents.id, req.params.id))
        .returning()
      if (!updated) { res.status(404).json({ error: "Not found" }); return }
      res.json(updated)
    } catch (err) {
      res.status(500).json({ error: "Failed to update document" })
    }
  })

  // Delete document
  router.delete("/documents/:id", async (req, res) => {
    try {
      await db.delete(schema.documents).where(eq(schema.documents.id, req.params.id))
      res.status(204).send()
    } catch (err) {
      res.status(500).json({ error: "Failed to delete document" })
    }
  })

  return router
}
