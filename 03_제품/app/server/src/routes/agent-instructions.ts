import { Router } from "express"
import { readFileSync, existsSync, readdirSync } from "fs"
import { join } from "path"
import type { Db } from "@hagent/db"
import * as schema from "@hagent/db"
import { eq } from "drizzle-orm"

const AGENT_DATA_DIR = join(import.meta.dirname, "../../data/agents")

export function agentInstructionsRoutes(db: Db): Router {
  const router = Router()

  // GET /api/agents/:id/instructions
  router.get("/:id/instructions", async (req, res) => {
    const { id } = req.params

    // Look up agent type
    const [agent] = await db.select().from(schema.agents).where(eq(schema.agents.id, id))
    if (!agent) { res.status(404).json({ error: "Agent not found" }); return }

    const agentType = agent.agentType ?? "orchestrator"
    const dir = join(AGENT_DATA_DIR, agentType)

    if (!existsSync(dir)) {
      res.json({ files: [], agentType })
      return
    }

    const files = readdirSync(dir)
      .filter(f => f.endsWith(".md"))
      .map(filename => {
        const content = readFileSync(join(dir, filename), "utf-8")
        return { filename, content }
      })

    res.json({ files, agentType })
  })

  // GET /api/agents/:id/instructions/:filename
  router.get("/:id/instructions/:filename", async (req, res) => {
    const { id, filename } = req.params

    const [agent] = await db.select().from(schema.agents).where(eq(schema.agents.id, id))
    if (!agent) { res.status(404).json({ error: "Agent not found" }); return }

    const agentType = agent.agentType ?? "orchestrator"
    const filePath = join(AGENT_DATA_DIR, agentType, filename)

    if (!existsSync(filePath)) {
      res.status(404).json({ error: "File not found" })
      return
    }

    const content = readFileSync(filePath, "utf-8")
    res.json({ filename, content })
  })

  return router
}
