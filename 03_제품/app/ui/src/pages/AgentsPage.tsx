import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { useBreadcrumbs } from "@/context/BreadcrumbContext"
import { useOrganization } from "@/context/OrganizationContext"
import { agentsApi } from "@/api/agents"
import { queryKeys } from "@/lib/queryKeys"
import { Bot } from "lucide-react"

const statusLabel: Record<string, { label: string; color: string }> = {
  idle: { label: "대기중", color: "var(--text-tertiary)" },
  running: { label: "실행중", color: "var(--color-success)" },
  error: { label: "오류", color: "var(--color-danger)" },
}

export function AgentsPage() {
  const { setBreadcrumbs } = useBreadcrumbs()
  const { orgPrefix } = useParams<{ orgPrefix: string }>()
  const { selectedOrgId } = useOrganization()

  useEffect(() => {
    setBreadcrumbs([{ label: "에이전트 팀" }])
  }, [setBreadcrumbs])

  const { data: agents = [], isLoading, isError } = useQuery({
    queryKey: queryKeys.agents.list(selectedOrgId ?? ""),
    queryFn: () => agentsApi.list(selectedOrgId!),
    enabled: !!selectedOrgId,
  })

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
        에이전트 팀
      </h1>

      {isLoading ? (
        <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
          로딩 중...
        </p>
      ) : isError ? (
        <p className="text-sm" style={{ color: "var(--color-danger)" }}>
          에이전트를 불러오는 데 실패했습니다.
        </p>
      ) : agents.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16">
          <Bot size={40} style={{ color: "var(--text-tertiary)" }} />
          <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
            등록된 에이전트가 없습니다.
          </p>
        </div>
      ) : (
        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
          {agents.map((agent: any) => {
            const s = statusLabel[agent.status] ?? statusLabel.idle
            const budgetUsed = agent.budget_used ?? agent.budgetUsed ?? null
            const budgetLimit = agent.budget_limit ?? agent.budgetLimit ?? null
            return (
              <Link
                key={agent.id}
                to={`/${orgPrefix}/agents/${agent.id}`}
                className="rounded-xl p-5 flex flex-col gap-3 hover:shadow-md transition-shadow"
                style={{
                  backgroundColor: "var(--bg-elevated)",
                  border: "1px solid var(--border-default)",
                  boxShadow: "var(--shadow-sm)",
                  textDecoration: "none",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center rounded-xl shrink-0"
                    style={{
                      width: 40,
                      height: 40,
                      background: "var(--color-primary-bg)",
                      color: "var(--color-teal-500)",
                    }}
                  >
                    <Bot size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate" style={{ color: "var(--text-primary)" }}>
                      {agent.name}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: s.color }}>
                      {s.label}
                    </p>
                  </div>
                </div>
                {agent.description && (
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {agent.description}
                  </p>
                )}
                {agent.type && (
                  <span
                    className="self-start text-xs px-2 py-0.5 rounded"
                    style={{ backgroundColor: "var(--bg-tertiary)", color: "var(--text-secondary)" }}
                  >
                    {agent.type}
                  </span>
                )}
                {budgetLimit != null && (
                  <div className="flex items-center gap-1 text-xs" style={{ color: "var(--text-tertiary)" }}>
                    <span>예산</span>
                    <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
                      {budgetUsed ?? 0} / {budgetLimit}
                    </span>
                  </div>
                )}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
