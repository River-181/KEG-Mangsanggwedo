// v0.3.0
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Card, CardContent } from "@/components/ui/card"
import { StatusIcon, CaseStatus } from "@/components/StatusIcon"
import { Identity } from "@/components/Identity"
import { CaseTypeBadge } from "@/components/CaseTypeBadge"
import { CaseSeverityBadge } from "@/components/CaseSeverityBadge"
import { cn } from "@/lib/utils"
import { casesApi } from "@/api/cases"
import { agentsApi } from "@/api/agents"
import { queryKeys } from "@/lib/queryKeys"
import { useOrganization } from "@/context/OrganizationContext"

interface KanbanBoardProps {
  cases: any[]
}

interface ColumnConfig {
  status: CaseStatus
  label: string
  tint: string
  headerColor: string
}

const COLUMNS: ColumnConfig[] = [
  {
    status: "backlog",
    label: "백로그",
    tint: "rgba(148,163,184,0.06)",
    headerColor: "var(--text-tertiary)",
  },
  {
    status: "todo",
    label: "할 일",
    tint: "rgba(59,130,246,0.06)",
    headerColor: "#3b82f6",
  },
  {
    status: "in_progress",
    label: "진행 중",
    tint: "rgba(20,184,166,0.06)",
    headerColor: "var(--color-teal-500)",
  },
  {
    status: "in_review",
    label: "검토 중",
    tint: "rgba(168,85,247,0.06)",
    headerColor: "#a855f7",
  },
  {
    status: "blocked",
    label: "차단됨",
    tint: "rgba(239,68,68,0.06)",
    headerColor: "var(--color-danger)",
  },
]

function KanbanCard({
  c,
  orgPrefix,
  onDragStart,
}: {
  c: any
  orgPrefix: string
  onDragStart: (e: React.DragEvent<HTMLDivElement>, caseId: string) => void
}) {
  const navigate = useNavigate()
  const [isDragging, setIsDragging] = useState(false)
  const assigneeName = c.assignee?.name ?? c.agent?.name ?? null
  const assigneeType: "agent" | "user" = c.agent?.name ? "agent" : "user"

  return (
    <Card
      draggable={true}
      className="cursor-pointer transition-shadow hover:shadow-md mb-2"
      style={{
        backgroundColor: "var(--bg-base)",
        border: "1px solid var(--border-default)",
        borderRadius: 10,
        opacity: isDragging ? 0.5 : 1,
      }}
      onClick={() => navigate(`/${orgPrefix}/cases/${c.id}`)}
      onDragStart={(e) => {
        setIsDragging(true)
        onDragStart(e, c.id)
      }}
      onDragEnd={() => setIsDragging(false)}
    >
      <CardContent className="px-3 pt-3 pb-2.5 space-y-2">
        {/* Identifier + title */}
        <div>
          {c.identifier && (
            <span
              className="block text-xs font-mono mb-0.5"
              style={{ color: "var(--text-tertiary)" }}
            >
              {c.identifier}
            </span>
          )}
          <p
            className="text-sm font-medium leading-snug line-clamp-2"
            style={{ color: "var(--text-primary)" }}
          >
            {c.title}
          </p>
        </div>

        {/* Badges row */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {c.type && <CaseTypeBadge type={c.type} />}
          {c.severity && <CaseSeverityBadge severity={c.severity} />}
          {c.urgency && !c.severity && <CaseSeverityBadge severity={c.urgency} />}
          {c.source && c.source !== "manual" && (
            <span
              className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
              style={{
                backgroundColor: c.source === "kakao" ? "#FEE500" : "rgba(59,130,246,0.1)",
                color: c.source === "kakao" ? "#3C1E1E" : "#3b82f6",
              }}
            >
              {c.source === "kakao" ? "카카오" : "SMS"}
            </span>
          )}
        </div>

        {/* Assignee */}
        {assigneeName && (
          <div className="pt-0.5">
            <Identity
              name={assigneeName}
              size="xs"
              type={assigneeType}
              showName
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function KanbanColumn({
  config,
  cards,
  orgPrefix,
  isDragOver,
  onDragOver,
  onDragLeave,
  onDrop,
  onCardDragStart,
}: {
  config: ColumnConfig
  cards: any[]
  orgPrefix: string
  isDragOver: boolean
  onDragOver: (e: React.DragEvent<HTMLDivElement>, status: CaseStatus) => void
  onDragLeave: () => void
  onDrop: (e: React.DragEvent<HTMLDivElement>, status: CaseStatus) => void
  onCardDragStart: (e: React.DragEvent<HTMLDivElement>, caseId: string) => void
}) {
  return (
    <div
      className="flex flex-col rounded-xl min-w-[220px] w-[220px] flex-shrink-0"
      style={{
        backgroundColor: config.tint,
        border: isDragOver
          ? "2px dashed var(--color-teal-500)"
          : "1px solid var(--border-default)",
        transition: "border 0.15s ease",
      }}
      onDragOver={(e) => onDragOver(e, config.status)}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, config.status)}
    >
      {/* Column header */}
      <div
        className="flex items-center justify-between px-3 py-2.5"
        style={{ borderBottom: "1px solid var(--border-default)" }}
      >
        <div className="flex items-center gap-2">
          <StatusIcon status={config.status} size={14} />
          <span
            className="text-xs font-semibold uppercase tracking-wide"
            style={{ color: config.headerColor }}
          >
            {config.label}
          </span>
        </div>
        <span
          className="text-xs font-medium px-1.5 py-0.5 rounded-full"
          style={{
            backgroundColor: "var(--bg-tertiary)",
            color: "var(--text-tertiary)",
          }}
        >
          {cards.length}
        </span>
      </div>

      {/* Cards */}
      <div className="flex-1 overflow-y-auto p-2">
        {cards.length === 0 ? (
          <div
            className="rounded-lg py-6 flex items-center justify-center"
            style={{ border: "1px dashed var(--border-default)" }}
          >
            <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
              없음
            </span>
          </div>
        ) : (
          cards.map((c) => (
            <KanbanCard
              key={c.id}
              c={c}
              orgPrefix={orgPrefix}
              onDragStart={onCardDragStart}
            />
          ))
        )}
      </div>
    </div>
  )
}

export function KanbanBoard({ cases }: KanbanBoardProps) {
  const { orgPrefix } = useParams<{ orgPrefix: string }>()
  const { selectedOrgId } = useOrganization()
  const queryClient = useQueryClient()

  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null)

  const updateCaseMutation = useMutation({
    mutationFn: async ({ caseId, status, assigneeAgentId }: { caseId: string; status: string; assigneeAgentId?: string }) => {
      await casesApi.update(caseId, { status })
      if (status === "in_progress" && assigneeAgentId) {
        await agentsApi.wakeup(assigneeAgentId, { caseId })
      }
    },
    onSuccess: () => {
      if (selectedOrgId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.cases.list(selectedOrgId) })
      }
    },
  })

  const handleCardDragStart = (e: React.DragEvent<HTMLDivElement>, caseId: string) => {
    e.dataTransfer.setData("caseId", caseId)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, status: CaseStatus) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    setDragOverColumn(status)
  }

  const handleDragLeave = () => {
    setDragOverColumn(null)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, status: CaseStatus) => {
    e.preventDefault()
    setDragOverColumn(null)
    const caseId = e.dataTransfer.getData("caseId")
    if (!caseId) return

    const droppedCase = cases.find((c) => c.id === caseId)
    if (!droppedCase || droppedCase.status === status) return

    const assigneeAgentId = droppedCase.assigneeAgentId ?? droppedCase.agent?.id ?? undefined

    updateCaseMutation.mutate({ caseId, status, assigneeAgentId })
  }

  const grouped = COLUMNS.reduce<Record<string, any[]>>(
    (acc, col) => {
      acc[col.status] = cases.filter(
        (c) => (c.status ?? "backlog") === col.status
      )
      return acc
    },
    {}
  )

  // Done cases — count only, not shown as a full column
  const doneCount = cases.filter((c) => c.status === "done").length

  return (
    <div className="flex flex-col gap-3">
      {/* Horizontal scroll container */}
      <div
        className={cn(
          "flex gap-3 overflow-x-auto pb-3",
          "scrollbar-thin scrollbar-thumb-[var(--border-default)] scrollbar-track-transparent"
        )}
        style={{ minHeight: 480 }}
      >
        {COLUMNS.map((col) => (
          <KanbanColumn
            key={col.status}
            config={col}
            cards={grouped[col.status] ?? []}
            orgPrefix={orgPrefix ?? ""}
            isDragOver={dragOverColumn === col.status}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onCardDragStart={handleCardDragStart}
          />
        ))}
      </div>

      {/* Done summary */}
      {doneCount > 0 && (
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg"
          style={{
            backgroundColor: "var(--bg-elevated)",
            border: "1px solid var(--border-default)",
          }}
        >
          <StatusIcon status="done" size={14} />
          <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
            완료된 케이스 {doneCount}개가 숨겨져 있습니다.
          </span>
        </div>
      )}
    </div>
  )
}
