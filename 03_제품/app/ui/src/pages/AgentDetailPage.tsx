// v0.3.0
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useBreadcrumbs } from "@/context/BreadcrumbContext"
import { useOrganization } from "@/context/OrganizationContext"
import { agentsApi } from "@/api/agents"
import { casesApi } from "@/api/cases"
import { queryKeys } from "@/lib/queryKeys"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Identity } from "@/components/Identity"
import { StatusBadge } from "@/components/StatusBadge"
import {
  Bot,
  Loader2,
  AlertCircle,
  Zap,
  Settings,
  History,
  Wallet,
  FileText,
  Plus,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Clock,
  Play,
  Square,
} from "lucide-react"

// ─── helpers ─────────────────────────────────────────────────────────────────

function timeAgo(iso: string): string {
  if (!iso) return ""
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return "방금 전"
  if (m < 60) return `${m}분 전`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}시간 전`
  return `${Math.floor(h / 24)}일 전`
}

function formatDate(iso: string): string {
  if (!iso) return ""
  return new Date(iso).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function statusColor(status: string): string {
  if (status === "running") return "var(--color-teal-500)"
  if (status === "error") return "var(--color-danger)"
  return "var(--text-tertiary)"
}

function statusLabel(status: string): string {
  const map: Record<string, string> = {
    idle: "대기중",
    running: "실행중",
    error: "오류",
    paused: "일시정지",
  }
  return map[status] ?? status
}

// ─── run row ─────────────────────────────────────────────────────────────────

function RunRow({ run, expanded, onToggle }: { run: any; expanded?: boolean; onToggle?: () => void }) {
  const runStatus = run.status ?? "completed"
  const caseTitle = run.case?.title ?? run.caseTitle ?? "케이스 없음"
  const tokens = run.tokensUsed ?? run.tokens_used ?? null
  const startedAt = run.startedAt ?? run.started_at ?? run.createdAt ?? ""
  const duration = run.durationMs ?? run.duration_ms ?? null
  const inputData = run.input ?? run.inputData ?? null
  const outputData = run.output ?? run.outputData ?? run.result ?? null

  const icon =
    runStatus === "running" ? (
      <Loader2 size={14} className="animate-spin" style={{ color: "var(--color-teal-500)" }} />
    ) : runStatus === "completed" ? (
      <CheckCircle2 size={14} style={{ color: "var(--color-success)" }} />
    ) : runStatus === "failed" ? (
      <XCircle size={14} style={{ color: "var(--color-danger)" }} />
    ) : (
      <Clock size={14} style={{ color: "var(--text-tertiary)" }} />
    )

  return (
    <div>
      <div
        className="flex items-center gap-3 py-2.5 px-1 cursor-pointer select-none"
        onClick={onToggle}
      >
        <span className="shrink-0">{icon}</span>
        <span
          className="flex-1 text-sm truncate"
          style={{ color: "var(--text-primary)" }}
        >
          {caseTitle}
        </span>
        {tokens != null && (
          <span className="text-xs shrink-0" style={{ color: "var(--text-tertiary)" }}>
            {tokens.toLocaleString()} 토큰
          </span>
        )}
        {startedAt && (
          <span className="text-xs shrink-0 w-16 text-right" style={{ color: "var(--text-tertiary)" }}>
            {timeAgo(startedAt)}
          </span>
        )}
        {onToggle && (
          <ChevronRight
            size={13}
            className="shrink-0 transition-transform"
            style={{
              color: "var(--text-tertiary)",
              transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
            }}
          />
        )}
      </div>

      {expanded && (
        <div
          className="mx-1 mb-3 rounded-xl p-3 space-y-3"
          style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-default)" }}
        >
          {/* Meta row */}
          <div className="flex flex-wrap gap-3 text-xs" style={{ color: "var(--text-tertiary)" }}>
            {startedAt && <span>시작: {new Date(startedAt).toLocaleString("ko-KR")}</span>}
            {duration != null && <span>소요: {(duration / 1000).toFixed(1)}초</span>}
            {tokens != null && <span>토큰: {tokens.toLocaleString()}</span>}
            <span
              className="px-1.5 py-0.5 rounded text-xs font-medium"
              style={{
                backgroundColor: runStatus === "completed"
                  ? "rgba(34,197,94,0.1)"
                  : runStatus === "failed"
                  ? "rgba(239,68,68,0.1)"
                  : "rgba(107,114,128,0.1)",
                color: runStatus === "completed"
                  ? "var(--color-success)"
                  : runStatus === "failed"
                  ? "var(--color-danger)"
                  : "var(--text-tertiary)",
              }}
            >
              {runStatus === "completed" ? "완료" : runStatus === "failed" ? "실패" : runStatus}
            </span>
          </div>

          {/* Input */}
          {inputData != null && (
            <div>
              <p className="text-xs font-medium mb-1" style={{ color: "var(--text-secondary)" }}>입력</p>
              <pre
                className="text-xs rounded-lg p-3 overflow-auto max-h-40 whitespace-pre-wrap break-all"
                style={{
                  backgroundColor: "var(--bg-tertiary)",
                  color: "var(--text-primary)",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {typeof inputData === "string" ? inputData : JSON.stringify(inputData, null, 2)}
              </pre>
            </div>
          )}

          {/* Output */}
          {outputData != null && (
            <div>
              <p className="text-xs font-medium mb-1" style={{ color: "var(--text-secondary)" }}>출력</p>
              {typeof outputData === "object" && outputData?.draft ? (
                <div>
                  <div
                    className="text-sm rounded-lg p-3 leading-relaxed whitespace-pre-wrap"
                    style={{
                      backgroundColor: "rgba(20,184,166,0.06)",
                      border: "1px solid rgba(20,184,166,0.2)",
                      color: "var(--text-primary)",
                    }}
                  >
                    {outputData.draft}
                  </div>
                  {Object.keys(outputData).filter(k => k !== "draft").length > 0 && (
                    <pre
                      className="text-xs rounded-lg p-3 mt-2 overflow-auto max-h-40 whitespace-pre-wrap break-all"
                      style={{
                        backgroundColor: "var(--bg-tertiary)",
                        color: "var(--text-primary)",
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {JSON.stringify(
                        Object.fromEntries(Object.entries(outputData).filter(([k]) => k !== "draft")),
                        null, 2
                      )}
                    </pre>
                  )}
                </div>
              ) : (
                <pre
                  className="text-xs rounded-lg p-3 overflow-auto max-h-40 whitespace-pre-wrap break-all"
                  style={{
                    backgroundColor: "var(--bg-tertiary)",
                    color: "var(--text-primary)",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {typeof outputData === "string" ? outputData : JSON.stringify(outputData, null, 2)}
                </pre>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Progress bar ─────────────────────────────────────────────────────────────

function BudgetBar({
  used,
  limit,
  label,
}: {
  used: number
  limit: number
  label: string
}) {
  const pct = limit > 0 ? Math.min(100, (used / limit) * 100) : 0
  const color =
    pct >= 90
      ? "var(--color-danger)"
      : pct >= 70
      ? "#d97706"
      : "var(--color-teal-500)"

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
          {label}
        </span>
        <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
          {used.toLocaleString()} / {limit.toLocaleString()}
        </span>
      </div>
      <div
        className="h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: "var(--bg-tertiary)" }}
      >
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
        {pct.toFixed(1)}% 사용
      </p>
    </div>
  )
}

// ─── Overview tab ─────────────────────────────────────────────────────────────

function OverviewTab({ agent, runs, memory }: { agent: any; runs: any[]; memory: any }) {
  const queryClient = useQueryClient()
  const currentRun = runs.find((r) => r.status === "running")
  const recentRuns = runs.slice(0, 5)
  const isRunning = agent.status === "running" || !!currentRun

  const wakeupMutation = useMutation({
    mutationFn: () => agentsApi.wakeup(agent.id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.agents.detail(agent.id) })
    },
  })

  const stopMutation = useMutation({
    mutationFn: () => agentsApi.stop(agent.id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.agents.detail(agent.id) })
    },
  })

  return (
    <div className="space-y-5">
      {/* Agent identity block */}
      <div
        className="rounded-xl p-5 flex items-start gap-4"
        style={{
          backgroundColor: "var(--bg-elevated)",
          border: "1px solid var(--border-default)",
        }}
      >
        <div
          className="flex items-center justify-center rounded-xl shrink-0"
          style={{
            width: 48,
            height: 48,
            background: "var(--color-primary-bg)",
          }}
        >
          <Bot size={24} style={{ color: "var(--color-teal-500)" }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h2
              className="text-base font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              {agent.name}
            </h2>
            {isRunning ? (
              <span
                className="text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1"
                style={{
                  backgroundColor: "rgba(20,184,166,0.12)",
                  color: "var(--color-teal-500)",
                }}
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                실행 중...
              </span>
            ) : (
              <span
                className="text-xs font-medium px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: `color-mix(in srgb, ${statusColor(agent.status)} 12%, transparent)`,
                  color: statusColor(agent.status),
                }}
              >
                {statusLabel(agent.status ?? "idle")}
              </span>
            )}
          </div>
          {agent.description && (
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              {agent.description}
            </p>
          )}
          <div
            className="flex items-center gap-4 mt-2 text-xs"
            style={{ color: "var(--text-tertiary)" }}
          >
            {agent.role && <span>역할: {agent.role}</span>}
            {agent.createdAt && <span>생성: {formatDate(agent.createdAt)}</span>}
          </div>
        </div>

        {/* Control buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {isRunning ? (
            <Button
              size="sm"
              variant="destructive"
              className="gap-1.5 text-xs h-8"
              disabled={stopMutation.isPending}
              onClick={() => stopMutation.mutate()}
            >
              {stopMutation.isPending ? (
                <Loader2 size={13} className="animate-spin" />
              ) : (
                <Square size={13} />
              )}
              중지
            </Button>
          ) : (
            <Button
              size="sm"
              className="gap-1.5 text-xs h-8"
              style={{ backgroundColor: "var(--color-teal-500)", color: "#fff" }}
              disabled={wakeupMutation.isPending}
              onClick={() => wakeupMutation.mutate()}
            >
              {wakeupMutation.isPending ? (
                <Loader2 size={13} className="animate-spin" />
              ) : (
                <Play size={13} />
              )}
              에이전트 실행
            </Button>
          )}
        </div>
      </div>

      {/* Current case */}
      {currentRun && (
        <div
          className="rounded-xl px-4 py-3 flex items-center gap-3"
          style={{
            backgroundColor: "rgba(20,184,166,0.06)",
            border: "1px solid rgba(20,184,166,0.2)",
          }}
        >
          <Loader2
            size={15}
            className="animate-spin shrink-0"
            style={{ color: "var(--color-teal-500)" }}
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs" style={{ color: "var(--color-teal-500)" }}>
              현재 실행 중
            </p>
            <p
              className="text-sm font-medium truncate"
              style={{ color: "var(--text-primary)" }}
            >
              {currentRun.case?.title ?? currentRun.caseTitle ?? "케이스 처리 중"}
            </p>
          </div>
        </div>
      )}

      {/* Recent runs */}
      <div>
        <h3
          className="text-sm font-semibold mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          최근 실행
        </h3>
        <div
          className="rounded-xl px-3"
          style={{
            backgroundColor: "var(--bg-elevated)",
            border: "1px solid var(--border-default)",
          }}
        >
          {recentRuns.length === 0 ? (
            <p
              className="text-sm py-4 text-center"
              style={{ color: "var(--text-tertiary)" }}
            >
              실행 이력이 없습니다.
            </p>
          ) : (
            <div className="divide-y divide-[var(--border-default)]">
              {recentRuns.map((run: any, i: number) => (
                <RunRow key={run.id ?? i} run={run} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Agent Memory */}
      {memory && Object.keys(memory).length > 0 && (
        <div>
          <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
            에이전트 메모리
          </h3>
          <div className="space-y-2">
            {/* Soul / Identity */}
            {memory?.soul && (
              <div className="rounded-xl p-4" style={{ backgroundColor: "rgba(20,184,166,0.04)", border: "1px solid rgba(20,184,166,0.2)" }}>
                <p className="text-xs font-medium mb-1" style={{ color: "var(--color-teal-500)" }}>정체성</p>
                <p className="text-sm" style={{ color: "var(--text-primary)" }}>{memory.soul}</p>
              </div>
            )}

            {/* Daily Notes */}
            {memory?.dailyNotes && Object.keys(memory.dailyNotes).length > 0 && (
              <div className="rounded-xl p-4" style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-default)" }}>
                <p className="text-xs font-medium mb-2" style={{ color: "var(--text-secondary)" }}>최근 메모</p>
                {Object.entries(memory.dailyNotes as Record<string, string>)
                  .sort(([a], [b]) => b.localeCompare(a))
                  .slice(0, 3)
                  .map(([date, note]) => (
                    <div key={date} className="mb-2 last:mb-0">
                      <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>{date}</span>
                      <p className="text-sm" style={{ color: "var(--text-primary)" }}>{note}</p>
                    </div>
                  ))}
              </div>
            )}

            {/* Learned Patterns */}
            {(memory?.learnedPatterns as string[] | undefined)?.length ? (
              <div className="rounded-xl p-4" style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-default)" }}>
                <p className="text-xs font-medium mb-2" style={{ color: "var(--text-secondary)" }}>학습된 패턴</p>
                <ul className="space-y-1">
                  {(memory.learnedPatterns as string[]).map((p, i) => (
                    <li key={i} className="text-sm flex items-start gap-2" style={{ color: "var(--text-primary)" }}>
                      <span style={{ color: "var(--color-teal-500)" }}>•</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Instructions tab ─────────────────────────────────────────────────────────

function InstructionsTab({ agent }: { agent: any }) {
  const queryClient = useQueryClient()
  const original = agent.systemPrompt ?? agent.system_prompt ?? agent.instructions ?? ""
  const [value, setValue] = useState(original)
  const isDirty = value !== original

  const saveMutation = useMutation({
    mutationFn: () => agentsApi.update(agent.id, { systemPrompt: value }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.agents.detail(agent.id) })
    },
  })

  // Reset when agent changes
  useEffect(() => {
    setValue(original)
  }, [original])

  return (
    <div className="space-y-3 relative">
      {/* Floating save bar */}
      {isDirty && (
        <div
          className="sticky top-0 z-10 flex items-center justify-between gap-3 rounded-xl px-4 py-3 mb-2"
          style={{
            backgroundColor: "rgba(var(--bg-elevated-rgb, 255,255,255), 0.9)",
            backdropFilter: "blur(8px)",
            border: "1px solid var(--border-default)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
            변경사항이 있습니다
          </span>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="text-xs h-7"
              onClick={() => setValue(original)}
            >
              취소
            </Button>
            <Button
              size="sm"
              className="text-xs h-7 gap-1.5"
              style={{ backgroundColor: "var(--color-teal-500)", color: "#fff" }}
              disabled={saveMutation.isPending}
              onClick={() => saveMutation.mutate()}
            >
              {saveMutation.isPending ? (
                <Loader2 size={12} className="animate-spin" />
              ) : (
                <CheckCircle2 size={12} />
              )}
              저장
            </Button>
          </div>
        </div>
      )}

      <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
        에이전트의 시스템 프롬프트를 편집합니다. 변경 후 저장하면 다음 실행부터 반영됩니다.
      </p>

      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={20}
        className="w-full rounded-xl p-4 text-sm leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-teal-500/30"
        style={{
          backgroundColor: "var(--bg-secondary)",
          border: "1px solid var(--border-default)",
          color: "var(--text-primary)",
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          minHeight: "300px",
        }}
        placeholder="에이전트 시스템 프롬프트를 입력하세요..."
      />
    </div>
  )
}

// ─── Skills tab ───────────────────────────────────────────────────────────────

function SkillsTab({ agent }: { agent: any }) {
  const rawSkills: any[] = agent.skills ?? agent.equippedSkills ?? []

  // Normalise: skills may be strings (slugs) or objects
  const skills = rawSkills.map((s: any) =>
    typeof s === "string" ? { slug: s, name: s, enabled: true } : { enabled: true, ...s }
  )

  const [enabledMap, setEnabledMap] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(skills.map((s) => [s.slug ?? s.id ?? s.name, s.enabled ?? true]))
  )

  const toggleSkill = (key: string, value: boolean) => {
    setEnabledMap((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
          이 에이전트에 장착된 k-skill 목록입니다.
        </p>
        <Button size="sm" variant="outline" disabled className="gap-1.5 text-xs">
          <Plus size={13} />
          스킬 추가
        </Button>
      </div>

      {skills.length === 0 ? (
        <div
          className="rounded-xl py-10 flex flex-col items-center gap-2"
          style={{
            backgroundColor: "var(--bg-elevated)",
            border: "1px solid var(--border-default)",
          }}
        >
          <Zap size={28} style={{ color: "var(--text-tertiary)" }} />
          <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
            장착된 스킬이 없습니다.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {skills.map((skill: any, i: number) => {
            const key = skill.slug ?? skill.id ?? skill.name ?? String(i)
            const isEnabled = enabledMap[key] ?? true
            return (
              <div
                key={key}
                className="flex items-center gap-3 rounded-xl px-4 py-3"
                style={{
                  backgroundColor: "var(--bg-elevated)",
                  border: "1px solid var(--border-default)",
                  opacity: isEnabled ? 1 : 0.5,
                }}
              >
                <div
                  className="flex items-center justify-center rounded-lg shrink-0"
                  style={{
                    width: 32,
                    height: 32,
                    backgroundColor: isEnabled ? "rgba(20,184,166,0.1)" : "var(--bg-tertiary)",
                  }}
                >
                  <Zap size={15} style={{ color: isEnabled ? "var(--color-teal-500)" : "var(--text-tertiary)" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-medium truncate"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {skill.name ?? skill.slug ?? "알 수 없는 스킬"}
                  </p>
                  {skill.description && (
                    <p
                      className="text-xs truncate"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      {skill.description}
                    </p>
                  )}
                </div>
                <Badge
                  className="text-xs border-0 shrink-0"
                  style={{
                    backgroundColor: isEnabled ? "rgba(20,184,166,0.1)" : "var(--bg-tertiary)",
                    color: isEnabled ? "var(--color-teal-500)" : "var(--text-tertiary)",
                  }}
                >
                  {skill.category ?? "k-skill"}
                </Badge>
                <Switch
                  checked={isEnabled}
                  onCheckedChange={(v) => toggleSkill(key, v)}
                />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ─── Settings tab ─────────────────────────────────────────────────────────────

function SettingsTab({ agent }: { agent: any }) {
  const settings = agent.settings ?? {}

  const agentTypeLabel: Record<string, string> = {
    orchestrator: "오케스트레이터",
    complaint: "민원담당",
    retention: "이탈방어",
    scheduler: "스케줄러",
    intake: "인테이크",
    staff: "스태프",
    compliance: "컴플라이언스",
    notification: "알림",
  }

  const rows = [
    { label: "에이전트 ID", value: agent.id },
    { label: "에이전트 유형", value: agentTypeLabel[agent.agentType] ?? agent.agentType ?? "-" },
    { label: "모델", value: agent.model ?? settings.model ?? "claude-sonnet-4-6" },
    { label: "어댑터", value: agent.adapterType ?? "-" },
    { label: "슬러그", value: agent.slug ?? "-" },
    { label: "생성일", value: agent.createdAt ? formatDate(agent.createdAt) : "-" },
    { label: "최근 업데이트", value: agent.updatedAt ? formatDate(agent.updatedAt) : "-" },
    { label: "최대 토큰", value: agent.maxTokens ?? settings.maxTokens ?? "-" },
    { label: "온도", value: agent.temperature ?? settings.temperature ?? "-" },
    {
      label: "자동 실행",
      value: agent.autoRun ?? settings.autoRun ? "활성화" : "비활성화",
    },
  ]

  return (
    <div className="space-y-4">
      {agent.description && (
        <div
          className="rounded-xl p-4"
          style={{ backgroundColor: "rgba(20,184,166,0.04)", border: "1px solid rgba(20,184,166,0.2)" }}
        >
          <p className="text-xs font-medium mb-1" style={{ color: "var(--color-teal-500)" }}>설명</p>
          <p className="text-sm" style={{ color: "var(--text-primary)" }}>{agent.description}</p>
        </div>
      )}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          backgroundColor: "var(--bg-elevated)",
          border: "1px solid var(--border-default)",
        }}
      >
        {rows.map((row, i) => (
          <div
            key={row.label}
            className={cn(
              "flex items-center justify-between px-4 py-3",
              i < rows.length - 1 && "border-b border-[var(--border-default)]"
            )}
          >
            <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
              {row.label}
            </span>
            <span
              className="text-sm font-medium font-mono text-right max-w-[60%] truncate"
              style={{ color: "var(--text-primary)" }}
            >
              {String(row.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Run history tab ──────────────────────────────────────────────────────────

function RunHistoryTab({ runs }: { runs: any[] }) {
  const [expandedRunId, setExpandedRunId] = useState<string | null>(null)

  if (runs.length === 0) {
    return (
      <div
        className="rounded-xl py-14 flex flex-col items-center gap-2"
        style={{
          backgroundColor: "var(--bg-elevated)",
          border: "1px solid var(--border-default)",
        }}
      >
        <History size={28} style={{ color: "var(--text-tertiary)" }} />
        <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
          실행 이력이 없습니다.
        </p>
      </div>
    )
  }

  return (
    <div
      className="rounded-xl px-3"
      style={{
        backgroundColor: "var(--bg-elevated)",
        border: "1px solid var(--border-default)",
      }}
    >
      <div className="divide-y divide-[var(--border-default)]">
        {runs.map((run: any, i: number) => {
          const runId = run.id ?? String(i)
          return (
            <RunRow
              key={runId}
              run={run}
              expanded={expandedRunId === runId}
              onToggle={() => setExpandedRunId(expandedRunId === runId ? null : runId)}
            />
          )
        })}
      </div>
    </div>
  )
}

// ─── Budget tab ───────────────────────────────────────────────────────────────

function BudgetTab({ agent }: { agent: any }) {
  const tokenLimit = agent.tokenLimit ?? agent.token_limit ?? 100000
  const tokensUsed = agent.tokensUsed ?? agent.tokens_used ?? agent.tokensThisMonth ?? 0
  const costLimit = agent.costLimit ?? agent.cost_limit ?? 0
  const costUsed = agent.costUsed ?? agent.cost_used ?? 0

  return (
    <div className="space-y-5">
      <div
        className="rounded-xl p-5 space-y-4"
        style={{
          backgroundColor: "var(--bg-elevated)",
          border: "1px solid var(--border-default)",
        }}
      >
        <BudgetBar
          used={tokensUsed}
          limit={tokenLimit}
          label="이번 달 토큰 사용량"
        />
        {costLimit > 0 && (
          <>
            <Separator />
            <BudgetBar
              used={costUsed}
              limit={costLimit}
              label="이번 달 비용 (원)"
            />
          </>
        )}
      </div>

      <div
        className="rounded-xl p-4"
        style={{
          backgroundColor: "rgba(20,184,166,0.04)",
          border: "1px solid rgba(20,184,166,0.2)",
        }}
      >
        <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          토큰 한도 초과 시 에이전트 실행이 자동으로 일시중지됩니다. 한도 조정은 설정에서 가능합니다.
        </p>
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export function AgentDetailPage() {
  const { setBreadcrumbs } = useBreadcrumbs()
  const { selectedOrgId } = useOrganization()
  const { orgPrefix, id } = useParams<{ orgPrefix: string; id: string }>()

  useEffect(() => {
    setBreadcrumbs([
      { label: "에이전트 팀", href: `/${orgPrefix}/agents` },
      { label: id ?? "에이전트" },
    ])
  }, [setBreadcrumbs, orgPrefix, id])

  // ── fetch agent ────────────────────────────────────────────────────────────
  const {
    data: agent,
    isLoading: agentLoading,
    isError: agentError,
  } = useQuery({
    queryKey: queryKeys.agents.detail(id!),
    queryFn: () => agentsApi.get(id!),
    enabled: !!id,
  })

  // ── fetch agent memory ─────────────────────────────────────────────────────
  const { data: memory = {} } = useQuery({
    queryKey: ["agents", id, "memory"],
    queryFn: () => agentsApi.getMemory(id!),
    enabled: !!id,
  })

  // ── fetch cases to derive runs ─────────────────────────────────────────────
  const { data: allCases = [] } = useQuery({
    queryKey: queryKeys.cases.list(selectedOrgId ?? ""),
    queryFn: () => casesApi.list(selectedOrgId!),
    enabled: !!selectedOrgId,
  })

  // Collect runs that belong to this agent
  const agentRuns: any[] = agent?.runs
    ?? (allCases as any[])
        .flatMap((c: any) => (c.runs ?? []).map((r: any) => ({ ...r, case: c })))
        .filter((r: any) => r.agentId === id || r.agent_id === id)

  // Update breadcrumb when agent name loads
  useEffect(() => {
    if (!agent) return
    setBreadcrumbs([
      { label: "에이전트 팀", href: `/${orgPrefix}/agents` },
      { label: agent.name ?? id ?? "에이전트" },
    ])
  }, [agent, setBreadcrumbs, orgPrefix, id])

  if (agentLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2
          size={24}
          className="animate-spin"
          style={{ color: "var(--text-tertiary)" }}
        />
      </div>
    )
  }

  if (agentError || !agent) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3">
        <AlertCircle size={28} style={{ color: "var(--color-danger)" }} />
        <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
          에이전트 정보를 불러오는 데 실패했습니다.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Tabs defaultValue="overview" className="flex flex-col flex-1 overflow-hidden">
        {/* Tab bar */}
        <div
          className="px-6 pt-4"
          style={{ borderBottom: "1px solid var(--border-default)" }}
        >
          <TabsList className="h-9 bg-transparent p-0 gap-1">
            {(
              [
                { value: "overview", label: "개요", icon: <Bot size={14} /> },
                { value: "instructions", label: "지시사항", icon: <FileText size={14} /> },
                { value: "skills", label: "스킬", icon: <Zap size={14} /> },
                { value: "settings", label: "설정", icon: <Settings size={14} /> },
                { value: "history", label: "실행 이력", icon: <History size={14} /> },
                { value: "budget", label: "예산", icon: <Wallet size={14} /> },
              ] as const
            ).map(({ value, label, icon }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="h-8 px-3 text-xs font-medium rounded-md border-0 gap-1.5 data-[state=active]:bg-[var(--bg-tertiary)] data-[state=active]:text-[var(--text-primary)] data-[state=inactive]:text-[var(--text-tertiary)]"
              >
                {icon}
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Tab contents */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-6 max-w-2xl mx-auto">
              <TabsContent value="overview" className="mt-0">
                <OverviewTab agent={agent} runs={agentRuns} memory={memory} />
              </TabsContent>

              <TabsContent value="instructions" className="mt-0">
                <InstructionsTab agent={agent} />
              </TabsContent>

              <TabsContent value="skills" className="mt-0">
                <SkillsTab agent={agent} />
              </TabsContent>

              <TabsContent value="settings" className="mt-0">
                <SettingsTab agent={agent} />
              </TabsContent>

              <TabsContent value="history" className="mt-0">
                <RunHistoryTab runs={agentRuns} />
              </TabsContent>

              <TabsContent value="budget" className="mt-0">
                <BudgetTab agent={agent} />
              </TabsContent>
            </div>
          </ScrollArea>
        </div>
      </Tabs>
    </div>
  )
}
