import { useEffect, useState, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useBreadcrumbs } from "@/context/BreadcrumbContext"
import { useOrganization } from "@/context/OrganizationContext"
import { usePanel } from "@/context/PanelContext"
import { casesApi } from "@/api/cases"
import { approvalsApi } from "@/api/approvals"
import { queryKeys } from "@/lib/queryKeys"
import { api } from "@/api/client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { StatusIcon, type CaseStatus } from "@/components/StatusIcon"
import { PriorityIcon } from "@/components/PriorityIcon"
import { Identity } from "@/components/Identity"
import { StatusBadge } from "@/components/StatusBadge"
import { LiveRunWidget } from "@/components/LiveRunWidget"
import { CaseProperties } from "@/components/CaseProperties"
import { ToastContext } from "@/components/ToastContext"
import {
  CheckCircle2,
  XCircle,
  Bot,
  Loader2,
  AlertCircle,
} from "lucide-react"

// ─── helpers ─────────────────────────────────────────────────────────────────

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return "방금 전"
  if (m < 60) return `${m}분 전`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}시간 전`
  return `${Math.floor(h / 24)}일 전`
}

const statusOptions: { value: CaseStatus; label: string }[] = [
  { value: "backlog", label: "백로그" },
  { value: "todo", label: "할 일" },
  { value: "in_progress", label: "진행 중" },
  { value: "in_review", label: "검토 중" },
  { value: "blocked", label: "차단됨" },
  { value: "done", label: "완료" },
]

const caseTypeLabel: Record<string, string> = {
  complaint: "민원",
  refund: "환불",
  makeup: "보강",
  inquiry: "문의",
  churn: "이탈",
  schedule: "일정",
}

// ─── Agent draft section ──────────────────────────────────────────────────────

function AgentDraftSection({
  caseId,
  draft,
  approvalId,
}: {
  caseId: string
  draft: string
  approvalId?: string
}) {
  const toast = useContext(ToastContext)
  const queryClient = useQueryClient()
  const { selectedOrgId } = useOrganization()

  const approve = useMutation({
    mutationFn: () => approvalsApi.approve(approvalId!),
    onSuccess: () => {
      toast?.success("초안이 승인되었습니다.")
      queryClient.invalidateQueries({ queryKey: queryKeys.cases.detail(caseId) })
      queryClient.invalidateQueries({
        queryKey: queryKeys.approvals.list(selectedOrgId ?? ""),
      })
    },
    onError: () => toast?.error("승인 중 오류가 발생했습니다."),
  })

  const reject = useMutation({
    mutationFn: () => approvalsApi.reject(approvalId!),
    onSuccess: () => {
      toast?.info("초안이 반려되었습니다.")
      queryClient.invalidateQueries({ queryKey: queryKeys.cases.detail(caseId) })
      queryClient.invalidateQueries({
        queryKey: queryKeys.approvals.list(selectedOrgId ?? ""),
      })
    },
    onError: () => toast?.error("반려 중 오류가 발생했습니다."),
  })

  const isBusy = approve.isPending || reject.isPending

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        border: "1px solid rgba(20,184,166,0.25)",
        backgroundColor: "rgba(20,184,166,0.04)",
      }}
    >
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{ borderBottom: "1px solid rgba(20,184,166,0.15)" }}
      >
        <Bot size={14} style={{ color: "var(--color-teal-500)" }} />
        <span
          className="text-xs font-semibold"
          style={{ color: "var(--color-teal-500)" }}
        >
          에이전트 초안
        </span>
        {approvalId && (
          <Badge
            className="ml-auto text-xs border-0"
            style={{
              backgroundColor: "rgba(217,119,6,0.12)",
              color: "#d97706",
            }}
          >
            승인 대기
          </Badge>
        )}
      </div>

      <div className="p-4">
        <pre
          className="text-sm whitespace-pre-wrap leading-relaxed"
          style={{
            color: "var(--text-primary)",
            fontFamily: "inherit",
          }}
        >
          {draft}
        </pre>

        {approvalId && (
          <div
            className="flex items-center gap-2 mt-4 pt-3"
            style={{ borderTop: "1px solid rgba(20,184,166,0.15)" }}
          >
            <Button
              size="sm"
              disabled={isBusy}
              onClick={() => approve.mutate()}
              className="gap-1.5"
              style={{ backgroundColor: "var(--color-success)", color: "#fff" }}
            >
              {approve.isPending ? (
                <Loader2 size={13} className="animate-spin" />
              ) : (
                <CheckCircle2 size={13} />
              )}
              승인
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={isBusy}
              onClick={() => reject.mutate()}
              className="gap-1.5"
              style={{
                color: "var(--color-danger)",
                borderColor: "var(--border-default)",
              }}
            >
              {reject.isPending ? (
                <Loader2 size={13} className="animate-spin" />
              ) : (
                <XCircle size={13} />
              )}
              반려
            </Button>
            <span
              className="ml-auto text-xs"
              style={{ color: "var(--text-tertiary)" }}
            >
              승인 시 자동 발송됩니다.
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Chat thread ──────────────────────────────────────────────────────────────

function ChatThread({
  caseId,
  comments,
}: {
  caseId: string
  comments: any[]
}) {
  const [newComment, setNewComment] = useState("")
  const toast = useContext(ToastContext)
  const queryClient = useQueryClient()

  const sendMutation = useMutation({
    mutationFn: async () => {
      return api.post(`/cases/${caseId}/comments`, {
        body: newComment,
        authorType: "user",
        authorName: "원장",
      })
    },
    onSuccess: () => {
      setNewComment("")
      void queryClient.invalidateQueries({ queryKey: queryKeys.cases.detail(caseId) })
    },
    onError: () => toast?.error("댓글 등록에 실패했습니다."),
  })

  return (
    <div className="space-y-1">
      {/* Messages */}
      <div className="space-y-3">
        {(comments ?? []).map((c: any, i: number) => {
          const isAgent = c.authorType === "agent" || c.author_type === "agent"
          const authorName = c.authorName ?? c.author_name ?? c.authorId ?? c.author_id ?? (isAgent ? "에이전트" : "원장")
          const createdAt = c.createdAt ?? c.created_at ?? ""
          return (
            <div
              key={c.id ?? i}
              className="rounded-xl px-4 py-3"
              style={{
                backgroundColor: "var(--bg-elevated)",
                borderLeft: isAgent ? "3px solid var(--color-teal-500)" : "3px solid transparent",
              }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Identity
                  name={authorName}
                  type={isAgent ? "agent" : "user"}
                  size="xs"
                />
                {createdAt && (
                  <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                    {timeAgo(createdAt)}
                  </span>
                )}
              </div>
              <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "var(--text-primary)" }}>
                {c.body ?? c.content ?? ""}
              </p>
            </div>
          )
        })}
      </div>

      {/* Input */}
      <div
        className="flex gap-2 mt-4 rounded-xl p-3"
        style={{
          backgroundColor: "var(--bg-elevated)",
          border: "1px solid var(--border-default)",
        }}
      >
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요... (에이전트에게 지시하거나 메모를 남길 수 있습니다)"
          rows={2}
          className="flex-1 text-sm resize-none bg-transparent focus:outline-none border-0 shadow-none"
          style={{ color: "var(--text-primary)" }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey) && newComment.trim()) {
              sendMutation.mutate()
            }
          }}
        />
        <Button
          size="sm"
          className="self-end text-xs h-8 shrink-0"
          style={{ backgroundColor: "var(--color-teal-500)", color: "#fff" }}
          disabled={!newComment.trim() || sendMutation.isPending}
          onClick={() => sendMutation.mutate()}
        >
          {sendMutation.isPending ? <Loader2 size={13} className="animate-spin" /> : "전송"}
        </Button>
      </div>
      <p className="text-xs mt-1" style={{ color: "var(--text-disabled)" }}>
        Cmd+Enter로 전송
      </p>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export function CaseDetailPage() {
  const { setBreadcrumbs } = useBreadcrumbs()
  const { selectedOrgId } = useOrganization()
  const { setPanelContent } = usePanel()
  const { orgPrefix, id } = useParams<{ orgPrefix: string; id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const toast = useContext(ToastContext)

  // ── fetch case ─────────────────────────────────────────────────────────────
  const {
    data: caseData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: queryKeys.cases.detail(id!),
    queryFn: () => casesApi.get(id!),
    enabled: !!id,
  })

  // ── breadcrumbs ────────────────────────────────────────────────────────────
  useEffect(() => {
    setBreadcrumbs([
      { label: "케이스", href: `/${orgPrefix}/cases` },
      {
        label:
          caseData?.identifier ?? caseData?.title ?? `케이스 ${id}`,
      },
    ])
  }, [setBreadcrumbs, orgPrefix, id, caseData])

  // ── status/field update mutation ───────────────────────────────────────────
  const updateCase = useMutation({
    mutationFn: (patch: Record<string, unknown>) =>
      casesApi.update(id!, patch),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cases.detail(id!) })
      queryClient.invalidateQueries({
        queryKey: queryKeys.cases.list(selectedOrgId ?? ""),
      })
    },
    onError: () => toast?.error("변경에 실패했습니다."),
  })

  // ── panel: CaseProperties ──────────────────────────────────────────────────
  useEffect(() => {
    if (!caseData) return
    setPanelContent(
      <CaseProperties
        case={{
          id: caseData.id,
          status: caseData.status ?? "backlog",
          priority: caseData.priority ?? 4,
          type: caseData.type,
          assigneeAgent: caseData.assigneeAgent ?? caseData.agent,
          reporter: caseData.reporter ?? caseData.reporterName,
          studentName:
            caseData.studentName ?? caseData.student?.name,
          createdAt: caseData.createdAt ?? caseData.created_at,
          updatedAt: caseData.updatedAt ?? caseData.updated_at,
          dueAt: caseData.dueAt ?? caseData.due_at,
        }}
        onUpdate={(field, value) => updateCase.mutate({ [field]: value })}
      />
    )
  }, [caseData, setPanelContent])

  // ── loading / error states ─────────────────────────────────────────────────
  if (isLoading) {
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

  if (isError || !caseData) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3">
        <AlertCircle size={32} style={{ color: "var(--color-danger)" }} />
        <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
          케이스를 불러오는 데 실패했습니다.
        </p>
        <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
          돌아가기
        </Button>
      </div>
    )
  }

  // ── derived data ───────────────────────────────────────────────────────────
  const hasActiveRun = (caseData.runs ?? []).some(
    (r: any) =>
      r.status === "running" || r.status === "pending_approval"
  )
  const agentDraft =
    caseData.agentDraft ?? caseData.agent_draft ?? null
  const pendingApproval = (caseData.approvals ?? []).find(
    (a: any) => a.status === "pending"
  )
  const comments = caseData.comments ?? []
  const status = (caseData.status ?? "backlog") as CaseStatus
  const identifier = caseData.identifier ?? caseData.id
  const typeLabel =
    caseTypeLabel[caseData.type ?? ""] ?? caseData.type ?? ""

  return (
    <ScrollArea className="flex-1 h-full">
      <div className="p-6 max-w-3xl mx-auto space-y-5">
        {/* Case header */}
        <div className="space-y-2">
          <div className="flex items-start gap-3">
            <StatusIcon status={status} size={18} className="mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span
                  className="text-xs font-mono"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {identifier}
                </span>
                {typeLabel && (
                  <Badge
                    className="text-xs border-0"
                    style={{
                      backgroundColor: "var(--bg-tertiary)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {typeLabel}
                  </Badge>
                )}
                <PriorityIcon priority={caseData.priority ?? 4} size={14} />
              </div>
              <h1
                className="text-xl font-bold leading-snug"
                style={{ color: "var(--text-primary)" }}
              >
                {caseData.title ?? "제목 없음"}
              </h1>
            </div>
          </div>

          {/* Status select */}
          <div className="flex items-center gap-3 pl-7">
            <Select
              value={status}
              onValueChange={(v) => updateCase.mutate({ status: v })}
              disabled={updateCase.isPending}
            >
              <SelectTrigger className="w-36 h-7 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((opt) => (
                  <SelectItem
                    key={opt.value}
                    value={opt.value}
                    className="text-xs"
                  >
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        {/* Live run widget */}
        {hasActiveRun && selectedOrgId && (
          <LiveRunWidget caseId={caseData.id} organizationId={selectedOrgId} />
        )}

        {/* Description */}
        {caseData.description && (
          <div>
            <h2
              className="text-sm font-semibold mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              설명
            </h2>
            <p
              className="text-sm leading-relaxed whitespace-pre-wrap"
              style={{ color: "var(--text-secondary)" }}
            >
              {caseData.description}
            </p>
          </div>
        )}

        {/* Agent draft */}
        {agentDraft && (
          <AgentDraftSection
            caseId={caseData.id}
            draft={agentDraft}
            approvalId={pendingApproval?.id}
          />
        )}

        <Separator />

        {/* Chat thread */}
        <div>
          <h2
            className="text-sm font-semibold mb-3"
            style={{ color: "var(--text-primary)" }}
          >
            대화 {comments.length > 0 && `(${comments.length})`}
          </h2>
          <ChatThread caseId={caseData.id} comments={comments} />
        </div>
      </div>
    </ScrollArea>
  )
}
