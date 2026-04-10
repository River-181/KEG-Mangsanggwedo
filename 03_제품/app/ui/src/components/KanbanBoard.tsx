import { useNavigate, useParams } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { StatusIcon, CaseStatus } from "@/components/StatusIcon"
import { Identity } from "@/components/Identity"
import { CaseTypeBadge } from "@/components/CaseTypeBadge"
import { CaseSeverityBadge } from "@/components/CaseSeverityBadge"
import { cn } from "@/lib/utils"

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

function KanbanCard({ c, orgPrefix }: { c: any; orgPrefix: string }) {
  const navigate = useNavigate()
  const assigneeName =
    c.assignee?.name ?? c.agent?.name ?? null
  const assigneeType: "agent" | "user" =
    c.agent?.name ? "agent" : "user"

  return (
    <Card
      className="cursor-pointer transition-shadow hover:shadow-md mb-2"
      style={{
        backgroundColor: "var(--bg-base)",
        border: "1px solid var(--border-default)",
        borderRadius: 10,
      }}
      onClick={() => navigate(`/${orgPrefix}/cases/${c.id}`)}
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
}: {
  config: ColumnConfig
  cards: any[]
  orgPrefix: string
}) {
  return (
    <div
      className="flex flex-col rounded-xl min-w-[220px] w-[220px] flex-shrink-0"
      style={{
        backgroundColor: config.tint,
        border: "1px solid var(--border-default)",
      }}
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
            <KanbanCard key={c.id} c={c} orgPrefix={orgPrefix} />
          ))
        )}
      </div>
    </div>
  )
}

export function KanbanBoard({ cases }: KanbanBoardProps) {
  const { orgPrefix } = useParams<{ orgPrefix: string }>()

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
