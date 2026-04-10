// v0.2.0
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useBreadcrumbs } from "@/context/BreadcrumbContext"
import { useOrganization } from "@/context/OrganizationContext"
import { goalsApi } from "@/api/goals"
import { queryKeys } from "@/lib/queryKeys"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EmptyState } from "@/components/EmptyState"
import { Target, Plus, ChevronRight, ChevronDown, Loader2 } from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

interface Goal {
  id: string
  title: string
  description?: string
  status: "active" | "completed" | "paused"
  targetDate?: string
  parentId?: string | null
  children?: Goal[]
}

// ─── Fallback data ────────────────────────────────────────────────────────────

const FALLBACK_GOALS: Goal[] = [
  {
    id: "g1",
    title: "2026년 상반기 매출 목표 달성",
    status: "active",
    targetDate: "2026-06-30",
    parentId: null,
    children: [
      {
        id: "g1-1",
        title: "신규 학생 50명 등록",
        status: "active",
        targetDate: "2026-06-30",
        parentId: "g1",
        children: [
          {
            id: "g1-1-1",
            title: "체험 수업 전환율 30% 달성",
            status: "active",
            targetDate: "2026-05-31",
            parentId: "g1-1",
            children: [],
          },
        ],
      },
      {
        id: "g1-2",
        title: "이탈률 5% 이하 유지",
        status: "active",
        targetDate: "2026-06-30",
        parentId: "g1",
        children: [],
      },
    ],
  },
  {
    id: "g2",
    title: "에이전트 자동화율 80% 달성",
    status: "paused",
    targetDate: "2026-12-31",
    parentId: null,
    children: [],
  },
  {
    id: "g3",
    title: "2025년 하반기 목표",
    status: "completed",
    targetDate: "2025-12-31",
    parentId: null,
    children: [],
  },
]

// ─── Status badge ─────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<string, { label: string; bg: string; color: string }> = {
  active: { label: "진행중", bg: "var(--color-primary-bg)", color: "var(--color-teal-500)" },
  completed: { label: "완료", bg: "rgba(16,185,129,0.12)", color: "var(--color-success)" },
  paused: { label: "일시중지", bg: "var(--bg-tertiary)", color: "var(--text-secondary)" },
}

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.paused
  return (
    <Badge className="text-xs border-0 px-2 py-0.5" style={{ backgroundColor: cfg.bg, color: cfg.color }}>
      {cfg.label}
    </Badge>
  )
}

function formatTargetDate(iso?: string) {
  if (!iso) return ""
  const d = new Date(iso)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`
}

// ─── Goal tree node ───────────────────────────────────────────────────────────

function GoalNode({ goal, depth = 0 }: { goal: Goal; depth?: number }) {
  const [expanded, setExpanded] = useState(depth === 0)
  const hasChildren = (goal.children?.length ?? 0) > 0

  return (
    <div>
      <div
        className="flex items-center gap-2 rounded-lg px-3 py-2.5 transition-colors group"
        style={{
          paddingLeft: depth * 24 + 12,
          backgroundColor: "var(--bg-elevated)",
          border: "1px solid var(--border-default)",
          marginBottom: 4,
        }}
      >
        {/* Expand toggle */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="shrink-0 flex items-center justify-center"
          style={{
            width: 18,
            height: 18,
            color: hasChildren ? "var(--text-secondary)" : "transparent",
          }}
          disabled={!hasChildren}
        >
          {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>

        {/* Icon dot */}
        <div
          className="shrink-0 rounded-full"
          style={{
            width: 8,
            height: 8,
            backgroundColor: STATUS_CONFIG[goal.status]?.color ?? "var(--text-tertiary)",
          }}
        />

        {/* Title */}
        <p
          className="flex-1 text-sm font-medium truncate"
          style={{ color: "var(--text-primary)" }}
        >
          {goal.title}
        </p>

        {/* Target date */}
        {goal.targetDate && (
          <span className="text-xs shrink-0 hidden sm:block" style={{ color: "var(--text-tertiary)" }}>
            ~{formatTargetDate(goal.targetDate)}
          </span>
        )}

        {/* Status */}
        <StatusBadge status={goal.status} />
      </div>

      {/* Children */}
      {expanded && hasChildren && (
        <div>
          {goal.children!.map((child) => (
            <GoalNode key={child.id} goal={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Build tree ───────────────────────────────────────────────────────────────

function buildTree(flat: Goal[]): Goal[] {
  const map = new Map<string, Goal>()
  const roots: Goal[] = []
  for (const g of flat) {
    map.set(g.id, { ...g, children: [] })
  }
  for (const g of flat) {
    const node = map.get(g.id)!
    if (g.parentId && map.has(g.parentId)) {
      map.get(g.parentId)!.children!.push(node)
    } else {
      roots.push(node)
    }
  }
  return roots
}

// ─── New Goal Dialog ──────────────────────────────────────────────────────────

function NewGoalDialog({
  open,
  onClose,
  goals,
  onCreated,
}: {
  open: boolean
  onClose: () => void
  goals: Goal[]
  onCreated: (g: Goal) => void
}) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [parentId, setParentId] = useState("")

  const flatGoals = (function flatten(list: Goal[]): Goal[] {
    return list.flatMap((g) => [g, ...flatten(g.children ?? [])])
  })(goals)

  const handleSubmit = () => {
    if (!title.trim()) return
    onCreated({
      id: `tmp-${Date.now()}`,
      title: title.trim(),
      description,
      status: "active",
      parentId: parentId || null,
      children: [],
    })
    setTitle("")
    setDescription("")
    setParentId("")
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent style={{ backgroundColor: "var(--bg-base)", border: "1px solid var(--border-default)" }}>
        <DialogHeader>
          <DialogTitle style={{ color: "var(--text-primary)" }}>새 목표</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-2">
          <Input
            placeholder="목표 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            style={{ backgroundColor: "var(--bg-elevated)", borderColor: "var(--border-default)", color: "var(--text-primary)" }}
          />
          <Textarea
            placeholder="목표 설명 (선택)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            style={{ backgroundColor: "var(--bg-elevated)", borderColor: "var(--border-default)", color: "var(--text-primary)", resize: "vertical" }}
          />
          {flatGoals.length > 0 && (
            <Select value={parentId} onValueChange={setParentId}>
              <SelectTrigger style={{ backgroundColor: "var(--bg-elevated)", borderColor: "var(--border-default)", color: parentId ? "var(--text-primary)" : "var(--text-tertiary)" }}>
                <SelectValue placeholder="상위 목표 (선택)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">없음 (최상위)</SelectItem>
                {flatGoals.map((g) => (
                  <SelectItem key={g.id} value={g.id}>
                    {g.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <div className="flex gap-2 justify-end mt-1">
            <Button variant="ghost" size="sm" onClick={onClose} style={{ color: "var(--text-secondary)" }}>
              취소
            </Button>
            <Button
              size="sm"
              disabled={!title.trim()}
              onClick={handleSubmit}
              className="border-0 text-white"
              style={{ backgroundColor: "var(--color-teal-500)" }}
            >
              추가
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function GoalsPage() {
  const { setBreadcrumbs } = useBreadcrumbs()
  const { selectedOrgId } = useOrganization()
  const [showNewDialog, setShowNewDialog] = useState(false)
  const [localGoals, setLocalGoals] = useState<Goal[]>([])

  useEffect(() => {
    setBreadcrumbs([{ label: "운영 목표" }])
  }, [setBreadcrumbs])

  const { data: apiGoals, isLoading } = useQuery({
    queryKey: queryKeys.goals.list(selectedOrgId ?? ""),
    queryFn: () => goalsApi.list(selectedOrgId!),
    enabled: !!selectedOrgId,
    retry: false,
  })

  const flatGoals: Goal[] = (apiGoals as Goal[] | undefined)?.length
    ? (apiGoals as Goal[])
    : [...FALLBACK_GOALS.map((g) => ({ ...g, children: undefined })), ...localGoals]

  const treeGoals = buildTree([...FALLBACK_GOALS, ...localGoals].map((g) => ({
    ...g,
    children: (apiGoals as any[] | undefined)?.length ? undefined : g.children,
  })))

  const displayTree = (apiGoals as Goal[] | undefined)?.length
    ? buildTree(apiGoals as Goal[])
    : [...buildTree(FALLBACK_GOALS), ...buildTree(localGoals)]

  return (
    <ScrollArea className="h-full">
      <div className="p-6 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
              운영 목표
            </h1>
            <p className="text-sm mt-0.5" style={{ color: "var(--text-tertiary)" }}>
              학원 운영 목표 체계
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isLoading && (
              <Loader2 size={16} className="animate-spin" style={{ color: "var(--text-tertiary)" }} />
            )}
            <Button
              size="sm"
              className="border-0 text-white text-xs gap-1"
              style={{ backgroundColor: "var(--color-teal-500)" }}
              onClick={() => setShowNewDialog(true)}
            >
              <Plus size={14} />
              새 목표
            </Button>
          </div>
        </div>

        {displayTree.length === 0 ? (
          <EmptyState
            icon={<Target size={22} />}
            title="운영 목표가 없습니다"
            description="학원 운영 목표를 추가하면 에이전트가 목표 달성을 도와줍니다."
            action={{ label: "목표 추가", onClick: () => setShowNewDialog(true) }}
          />
        ) : (
          <div>
            {displayTree.map((goal) => (
              <GoalNode key={goal.id} goal={goal} depth={0} />
            ))}
          </div>
        )}
      </div>

      <NewGoalDialog
        open={showNewDialog}
        onClose={() => setShowNewDialog(false)}
        goals={displayTree}
        onCreated={(g) => setLocalGoals((prev) => [...prev, g])}
      />
    </ScrollArea>
  )
}
