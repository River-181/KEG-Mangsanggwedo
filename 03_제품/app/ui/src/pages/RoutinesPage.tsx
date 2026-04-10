// v0.3.0
import { useEffect, useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useBreadcrumbs } from "@/context/BreadcrumbContext"
import { useOrganization } from "@/context/OrganizationContext"
import { routinesApi } from "@/api/routines"
import { queryKeys } from "@/lib/queryKeys"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { EmptyState } from "@/components/EmptyState"
import { Clock, Plus, Loader2, Bot } from "lucide-react"

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseCron(cron: string): string {
  if (!cron) return cron
  const parts = cron.trim().split(/\s+/)
  if (parts.length !== 5) return cron
  const [min, hour, dom, month, dow] = parts

  const pad = (n: string) => n.padStart(2, "0")

  // 매일 HH:MM
  if (dom === "*" && month === "*" && dow === "*") {
    return `매일 ${pad(hour)}:${pad(min)}`
  }

  // 매주 요일 HH:MM
  const DAY_KO = ["일", "월", "화", "수", "목", "금", "토"]
  if (dom === "*" && month === "*" && dow !== "*") {
    const dayIdx = parseInt(dow, 10)
    const dayLabel = isNaN(dayIdx) ? dow : (DAY_KO[dayIdx] ?? dow)
    return `매주 ${dayLabel}요일 ${pad(hour)}:${pad(min)}`
  }

  // 매월 N일 HH:MM
  if (dom !== "*" && month === "*" && dow === "*") {
    return `매월 ${dom}일 ${pad(hour)}:${pad(min)}`
  }

  return cron
}

function formatLastRun(iso?: string) {
  if (!iso) return "실행 기록 없음"
  const d = new Date(iso)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffMin = Math.round(diffMs / 60000)
  if (diffMin < 60) return `${diffMin}분 전`
  const diffH = Math.round(diffMin / 60)
  if (diffH < 24) return `${diffH}시간 전`
  const diffD = Math.round(diffH / 24)
  return `${diffD}일 전`
}

// ─── Fallback data ────────────────────────────────────────────────────────────

const FALLBACK_ROUTINES = [
  {
    id: "r1",
    name: "일일 이탈 위험 스캔",
    schedule: "0 7 * * *",
    agentName: "이탈방지 에이전트",
    enabled: true,
    lastRun: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "r2",
    name: "주간 학부모 리포트 발송",
    schedule: "0 9 * * 1",
    agentName: "알림 에이전트",
    enabled: true,
    lastRun: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "r3",
    name: "월말 정산 집계",
    schedule: "0 0 1 * *",
    agentName: "오케스트레이터",
    enabled: false,
    lastRun: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "r4",
    name: "미납 수강료 알림",
    schedule: "0 10 * * 1",
    agentName: "알림 에이전트",
    enabled: true,
    lastRun: null,
  },
]


// ─── Page ─────────────────────────────────────────────────────────────────────

export function RoutinesPage() {
  const { setBreadcrumbs } = useBreadcrumbs()
  const { selectedOrgId } = useOrganization()
  const [localStates, setLocalStates] = useState<Record<string, boolean>>({})

  useEffect(() => {
    setBreadcrumbs([{ label: "루틴" }])
  }, [setBreadcrumbs])

  const { data: apiRoutines, isLoading } = useQuery({
    queryKey: queryKeys.routines.list(selectedOrgId ?? ""),
    queryFn: () => routinesApi.list(selectedOrgId!),
    enabled: !!selectedOrgId,
    retry: false,
  })

  const routines: any[] = (apiRoutines as any[] | undefined)?.length
    ? (apiRoutines as any[])
    : FALLBACK_ROUTINES

  const handleToggle = (id: string, value: boolean) => {
    setLocalStates((prev) => ({ ...prev, [id]: value }))
  }

  const enabledCount = routines.filter(
    (r) => (localStates[r.id] !== undefined ? localStates[r.id] : r.enabled)
  ).length

  return (
    <ScrollArea className="h-full">
      <div className="p-6 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
              루틴
            </h1>
            <p className="text-sm mt-0.5" style={{ color: "var(--text-tertiary)" }}>
              {enabledCount}/{routines.length} 활성화됨
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isLoading && (
              <Loader2 size={16} className="animate-spin" style={{ color: "var(--text-tertiary)" }} />
            )}
            <Button
              size="sm"
              disabled
              className="border-0 text-white text-xs gap-1 opacity-50"
              style={{ backgroundColor: "var(--color-teal-500)" }}
              title="준비 중"
            >
              <Plus size={14} />
              새 루틴
            </Button>
          </div>
        </div>

        {routines.length === 0 ? (
          <EmptyState
            icon={<Clock size={22} />}
            title="등록된 루틴이 없습니다"
            description="정기적으로 실행할 자동화 루틴을 추가하세요."
          />
        ) : (
          <div className="flex flex-col gap-2">
            {routines.map((routine) => {
              const isEnabled = localStates[routine.id] !== undefined
                ? localStates[routine.id]
                : routine.enabled
              const lastRun = routine.lastRun ?? routine.last_run
              const agentName = routine.agentName ?? routine.agent_name ?? routine.agent?.name ?? "-"
              const schedule = routine.schedule ?? ""

              return (
                <div
                  key={routine.id}
                  className="rounded-xl px-5 py-4 flex items-center gap-4"
                  style={{
                    backgroundColor: "var(--bg-elevated)",
                    border: "1px solid var(--border-default)",
                    boxShadow: "var(--shadow-sm)",
                    opacity: isEnabled ? 1 : 0.6,
                  }}
                >
                  {/* Icon */}
                  <div
                    className="flex items-center justify-center rounded-lg shrink-0"
                    style={{
                      width: 36,
                      height: 36,
                      background: isEnabled ? "var(--color-primary-bg)" : "var(--bg-tertiary)",
                      color: isEnabled ? "var(--color-teal-500)" : "var(--text-tertiary)",
                    }}
                  >
                    <Clock size={16} />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate" style={{ color: "var(--text-primary)" }}>
                      {routine.name}
                    </p>
                    <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                      <span className="text-xs" style={{ color: "var(--color-teal-500)" }}>
                        {parseCron(schedule)}
                      </span>
                      <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-tertiary)" }}>
                        <Bot size={11} />
                        {agentName}
                      </span>
                    </div>
                  </div>

                  {/* Last run */}
                  <div className="text-right shrink-0 hidden sm:block">
                    <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                      {formatLastRun(lastRun)}
                    </p>
                  </div>

                  {/* Toggle */}
                  <Switch
                    checked={isEnabled}
                    onCheckedChange={(v) => handleToggle(routine.id, v)}
                  />
                </div>
              )
            })}
          </div>
        )}
      </div>
    </ScrollArea>
  )
}
