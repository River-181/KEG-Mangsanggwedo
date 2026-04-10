// v0.3.0
import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { useBreadcrumbs } from "@/context/BreadcrumbContext"
import { useOrganization } from "@/context/OrganizationContext"
import { agentsApi } from "@/api/agents"
import { queryKeys } from "@/lib/queryKeys"
import { Identity } from "@/components/Identity"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Upload,
  Download,
  Loader2,
  Bot,
  User,
  Brain,
  Shield,
  Heart,
  Calendar,
  Sparkles,
  Cpu,
  Cog,
  Lightbulb,
} from "lucide-react"
import { Button } from "@/components/ui/button"

// ─── Agent node types ─────────────────────────────────────────────────────────

type AgentStatus = "idle" | "running" | "error" | "paused"

function resolveStatus(agent: any): AgentStatus {
  const s = agent.status ?? ""
  if (s === "running") return "running"
  if (s === "error" || s === "failed") return "error"
  if (s === "paused") return "paused"
  return "idle"
}

// ─── Icon map ────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, React.ElementType> = {
  brain: Brain,
  shield: Shield,
  heart: Heart,
  calendar: Calendar,
  sparkles: Sparkles,
  cpu: Cpu,
  cog: Cog,
  lightbulb: Lightbulb,
}

// ─── Status dot ───────────────────────────────────────────────────────────────

function StatusDot({ status }: { status: AgentStatus }) {
  const colorMap: Record<AgentStatus, string> = {
    running: "var(--color-teal-500)",
    error: "var(--color-danger)",
    paused: "#f59e0b",
    idle: "var(--color-success, #6b7280)",
  }

  return (
    <span
      className="inline-block rounded-full"
      style={{
        width: 8,
        height: 8,
        backgroundColor: colorMap[status],
        animation: status === "running" ? "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite" : undefined,
        flexShrink: 0,
      }}
    />
  )
}

// ─── Agent node card ──────────────────────────────────────────────────────────

function AgentNode({
  agent,
  size = "default",
  onClick,
}: {
  agent: any
  size?: "lg" | "default"
  onClick?: () => void
}) {
  const status = resolveStatus(agent)
  const agentType: string = agent.type ?? agent.agentType ?? "worker"

  const statusLabel: Record<AgentStatus, string> = {
    idle: "대기",
    running: "실행 중",
    error: "오류",
    paused: "일시정지",
  }

  // Resolve icon
  const iconKey = agent.icon as string | undefined
  const IconComponent = iconKey ? ICON_MAP[iconKey] : null

  return (
    <div
      className="flex flex-col items-center gap-2 rounded-xl cursor-pointer hover:scale-105 transition-transform"
      style={{
        backgroundColor: "var(--bg-elevated)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-lg, 12px)",
        padding: size === "lg" ? "20px 24px" : "16px",
        minWidth: size === "lg" ? 180 : 160,
        textAlign: "center",
        boxShadow: "var(--shadow-sm)",
      }}
      onClick={onClick}
    >
      {IconComponent ? (
        <div
          style={{
            width: size === "lg" ? 40 : 32,
            height: size === "lg" ? 40 : 32,
            borderRadius: "50%",
            backgroundColor: "var(--color-primary-bg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconComponent
            size={size === "lg" ? 20 : 16}
            style={{ color: "var(--color-teal-500)" }}
          />
        </div>
      ) : (
        <Identity
          name={agent.name ?? "에이전트"}
          type="agent"
          size={size === "lg" ? "lg" : "default"}
          showName={false}
        />
      )}
      <div>
        <p
          className="text-sm font-semibold truncate"
          style={{ color: "var(--text-primary)", maxWidth: 140 }}
        >
          {agent.name ?? "에이전트"}
        </p>
        <p className="text-xs mt-0.5" style={{ color: "var(--text-tertiary)" }}>
          Claude
        </p>
      </div>
      <Badge
        className="text-xs border-0 px-2 py-0.5"
        style={{
          backgroundColor: "var(--color-primary-bg)",
          color: "var(--color-teal-500)",
        }}
      >
        {agentType}
      </Badge>
      <div className="flex items-center gap-1.5">
        <StatusDot status={status} />
        <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
          {statusLabel[status]}
        </span>
      </div>
    </div>
  )
}

// ─── Human staff card ─────────────────────────────────────────────────────────

interface Instructor {
  id: string
  name: string
  subject: string
}

const DEFAULT_INSTRUCTORS: Instructor[] = [
  { id: "inst-1", name: "김민수", subject: "영어회화" },
  { id: "inst-2", name: "박서연", subject: "문법" },
  { id: "inst-3", name: "이준호", subject: "독해" },
  { id: "inst-4", name: "최하늘", subject: "토익" },
]

function InstructorCard({ instructor }: { instructor: Instructor }) {
  return (
    <div
      className="flex flex-col items-center gap-2 rounded-xl"
      style={{
        backgroundColor: "rgba(59,130,246,0.06)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-lg, 12px)",
        padding: "16px",
        minWidth: 140,
        textAlign: "center",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          backgroundColor: "rgba(59,130,246,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <User size={18} style={{ color: "#3b82f6" }} />
      </div>
      <div>
        <p
          className="text-sm font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          {instructor.name}
        </p>
        <p className="text-xs mt-0.5" style={{ color: "var(--text-tertiary)" }}>
          {instructor.subject}
        </p>
      </div>
      <Badge
        className="text-xs border-0 px-2 py-0.5"
        style={{
          backgroundColor: "rgba(59,130,246,0.12)",
          color: "#3b82f6",
        }}
      >
        직원
      </Badge>
    </div>
  )
}

// ─── Connector lines ──────────────────────────────────────────────────────────

function VLine({ height = 40 }: { height?: number }) {
  return (
    <div
      style={{
        width: 2,
        height,
        backgroundColor: "var(--border-default)",
        margin: "0 auto",
      }}
    />
  )
}

// ─── Org Chart layout ─────────────────────────────────────────────────────────

function OrgTree({
  orchestrator,
  workers,
  onAgentClick,
}: {
  orchestrator: any
  workers: any[]
  onAgentClick: (agent: any) => void
}) {
  return (
    <div className="flex flex-col items-center">
      {/* Orchestrator */}
      <AgentNode
        agent={orchestrator}
        size="lg"
        onClick={() => onAgentClick(orchestrator)}
      />

      {workers.length > 0 && (
        <>
          {/* Vertical stem from orchestrator */}
          <VLine height={32} />

          {/* Horizontal bar + vertical drops */}
          <div style={{ position: "relative", width: "100%" }}>
            {/* horizontal connector spanning all children */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: `calc(100% / ${workers.length * 2})`,
                right: `calc(100% / ${workers.length * 2})`,
                height: 2,
                backgroundColor: "var(--border-default)",
              }}
            />
          </div>

          {/* Children row */}
          <div className="flex items-start gap-8" style={{ paddingTop: 0 }}>
            {workers.map((w) => (
              <div key={w.id} className="flex flex-col items-center">
                <VLine height={32} />
                <AgentNode agent={w} onClick={() => onAgentClick(w)} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyOrg() {
  return (
    <div className="flex flex-col items-center gap-3 py-20">
      <Bot size={40} style={{ color: "var(--text-tertiary)" }} />
      <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
        에이전트가 없습니다. 에이전트를 추가하면 조직도가 표시됩니다.
      </p>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function OrgChartPage() {
  const { setBreadcrumbs } = useBreadcrumbs()
  const { selectedOrgId } = useOrganization()
  const navigate = useNavigate()
  const { orgPrefix } = useParams<{ orgPrefix: string }>()

  useEffect(() => {
    setBreadcrumbs([{ label: "에이전트 조직도" }])
  }, [setBreadcrumbs])

  const { data: agents = [], isLoading } = useQuery({
    queryKey: queryKeys.agents.list(selectedOrgId ?? ""),
    queryFn: () => agentsApi.list(selectedOrgId!),
    enabled: !!selectedOrgId,
  })

  // Classify orchestrator vs workers
  const orchestrator = (agents as any[]).find(
    (a: any) =>
      a.type === "orchestrator" ||
      a.agentType === "orchestrator" ||
      a.isOrchestrator === true ||
      a.name?.toLowerCase().includes("orchestrat")
  ) ?? (agents as any[])[0] ?? null

  const workers = (agents as any[]).filter((a: any) => a.id !== orchestrator?.id)

  const handleAgentClick = (agent: any) => {
    if (orgPrefix) {
      navigate(`/${orgPrefix}/agents/${agent.id}`)
    }
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <ScrollArea className="flex-1">
        <div className="p-6 max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                에이전트 조직도
              </h1>
              <p className="text-sm mt-0.5" style={{ color: "var(--text-tertiary)" }}>
                에이전트 계층 구조 및 역할 시각화
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled className="text-xs gap-1.5">
                <Upload size={13} />
                Import company
              </Button>
              <Button variant="outline" size="sm" disabled className="text-xs gap-1.5">
                <Download size={13} />
                Export company
              </Button>
            </div>
          </div>

          {/* Chart area */}
          <div
            className="rounded-2xl p-8"
            style={{
              backgroundColor: "var(--bg-elevated)",
              border: "1px solid var(--border-default)",
              minHeight: 320,
            }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2
                  size={24}
                  className="animate-spin"
                  style={{ color: "var(--text-tertiary)" }}
                />
              </div>
            ) : !orchestrator ? (
              <EmptyOrg />
            ) : (
              <OrgTree
                orchestrator={orchestrator}
                workers={workers}
                onAgentClick={handleAgentClick}
              />
            )}
          </div>

          {/* Legend */}
          {!isLoading && (agents as any[]).length > 0 && (
            <div className="mt-4 flex items-center gap-6">
              {(
                [
                  { status: "idle" as AgentStatus, label: "대기" },
                  { status: "running" as AgentStatus, label: "실행 중" },
                  { status: "error" as AgentStatus, label: "오류" },
                  { status: "paused" as AgentStatus, label: "일시정지" },
                ] as { status: AgentStatus; label: string }[]
              ).map(({ status, label }) => (
                <div key={status} className="flex items-center gap-1.5">
                  <StatusDot status={status} />
                  <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Human staff section */}
          <div className="mt-8">
            <div className="mb-4">
              <h2 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                직원
              </h2>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-tertiary)" }}>
                학원 강사 및 스태프
              </p>
            </div>
            <div
              className="rounded-2xl p-6"
              style={{
                backgroundColor: "var(--bg-elevated)",
                border: "1px solid var(--border-default)",
              }}
            >
              <div className="flex flex-wrap gap-4">
                {DEFAULT_INSTRUCTORS.map((instructor) => (
                  <InstructorCard key={instructor.id} instructor={instructor} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
