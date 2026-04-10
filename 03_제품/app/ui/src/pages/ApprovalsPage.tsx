import { useEffect, useContext, useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useBreadcrumbs } from "@/context/BreadcrumbContext"
import { useOrganization } from "@/context/OrganizationContext"
import { approvalsApi } from "@/api/approvals"
import { queryKeys } from "@/lib/queryKeys"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ApprovalCard } from "@/components/ApprovalCard"
import { EmptyState } from "@/components/EmptyState"
import { ToastContext } from "@/components/ToastContext"
import { CheckCircle, Loader2, AlertCircle, Clock, CheckCircle2, XCircle } from "lucide-react"

// ─── Decision note dialog ─────────────────────────────────────────────────────

interface DecisionNoteDialogProps {
  action: "approve" | "reject"
  onConfirm: (note: string) => void
  onCancel: () => void
  isPending: boolean
}

function DecisionNoteDialog({ action, onConfirm, onCancel, isPending }: DecisionNoteDialogProps) {
  const [note, setNote] = useState("")
  const isApprove = action === "approve"

  return (
    <div
      className="mt-2 rounded-xl p-3 space-y-2"
      style={{
        backgroundColor: isApprove ? "rgba(20,184,166,0.06)" : "rgba(239,68,68,0.06)",
        border: `1px solid ${isApprove ? "rgba(20,184,166,0.2)" : "rgba(239,68,68,0.2)"}`,
      }}
    >
      <p className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
        {isApprove ? "승인 메모 (선택사항)" : "반려 사유 (선택사항)"}
      </p>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder={isApprove ? "승인 이유나 메모를 남기세요..." : "반려 사유를 입력하세요..."}
        rows={2}
        className="w-full rounded-lg p-2 text-xs resize-none focus:outline-none"
        style={{
          backgroundColor: "var(--bg-elevated)",
          border: "1px solid var(--border-default)",
          color: "var(--text-primary)",
        }}
      />
      <div className="flex justify-end gap-2">
        <Button
          size="sm"
          variant="outline"
          className="text-xs h-7"
          onClick={onCancel}
          disabled={isPending}
        >
          취소
        </Button>
        <Button
          size="sm"
          className="text-xs h-7 gap-1.5"
          style={{
            backgroundColor: isApprove ? "var(--color-teal-500)" : "var(--color-danger)",
            color: "#fff",
          }}
          disabled={isPending}
          onClick={() => onConfirm(note)}
        >
          {isPending ? (
            <Loader2 size={11} className="animate-spin" />
          ) : isApprove ? (
            <CheckCircle2 size={11} />
          ) : (
            <XCircle size={11} />
          )}
          {isApprove ? "승인 확정" : "반려 확정"}
        </Button>
      </div>
    </div>
  )
}

type TabValue = "all" | "pending" | "done"

function filterApprovals(approvals: any[], tab: TabValue) {
  if (tab === "pending") return approvals.filter((a) => a.status === "pending")
  if (tab === "done")
    return approvals.filter(
      (a) => a.status === "approved" || a.status === "rejected"
    )
  return approvals
}

export function ApprovalsPage() {
  const { setBreadcrumbs } = useBreadcrumbs()
  const { selectedOrgId } = useOrganization()
  const queryClient = useQueryClient()
  const toast = useContext(ToastContext)
  // Track which approval is in the decision flow: { id, action }
  const [pendingDecision, setPendingDecision] = useState<{ id: string; action: "approve" | "reject" } | null>(null)

  useEffect(() => {
    setBreadcrumbs([{ label: "승인 큐" }])
  }, [setBreadcrumbs])

  const {
    data: allApprovals = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: queryKeys.approvals.list(selectedOrgId ?? ""),
    queryFn: () => approvalsApi.list(selectedOrgId!),
    enabled: !!selectedOrgId,
  })

  const approve = useMutation({
    mutationFn: ({ id }: { id: string; note?: string }) => approvalsApi.approve(id),
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.approvals.list(selectedOrgId ?? ""),
      })
      const prev = queryClient.getQueryData(queryKeys.approvals.list(selectedOrgId ?? ""))
      queryClient.setQueryData(
        queryKeys.approvals.list(selectedOrgId ?? ""),
        (old: any[]) =>
          (old ?? []).map((a) => (a.id === id ? { ...a, status: "approved" } : a))
      )
      return { prev }
    },
    onError: (_err, _vars, ctx) => {
      queryClient.setQueryData(
        queryKeys.approvals.list(selectedOrgId ?? ""),
        ctx?.prev
      )
      toast?.error("승인 처리에 실패했습니다.")
    },
    onSuccess: () => {
      setPendingDecision(null)
      toast?.success("승인되었습니다.")
      queryClient.invalidateQueries({
        queryKey: queryKeys.cases.list(selectedOrgId ?? ""),
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.approvals.list(selectedOrgId ?? ""),
      })
    },
  })

  const reject = useMutation({
    mutationFn: ({ id }: { id: string; note?: string }) => approvalsApi.reject(id),
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.approvals.list(selectedOrgId ?? ""),
      })
      const prev = queryClient.getQueryData(queryKeys.approvals.list(selectedOrgId ?? ""))
      queryClient.setQueryData(
        queryKeys.approvals.list(selectedOrgId ?? ""),
        (old: any[]) =>
          (old ?? []).map((a) => (a.id === id ? { ...a, status: "rejected" } : a))
      )
      return { prev }
    },
    onError: (_err, _vars, ctx) => {
      queryClient.setQueryData(
        queryKeys.approvals.list(selectedOrgId ?? ""),
        ctx?.prev
      )
      toast?.error("반려 처리에 실패했습니다.")
    },
    onSuccess: () => {
      setPendingDecision(null)
      toast?.info("반려되었습니다.")
      queryClient.invalidateQueries({
        queryKey: queryKeys.cases.list(selectedOrgId ?? ""),
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.approvals.list(selectedOrgId ?? ""),
      })
    },
  })

  const pendingCount = (allApprovals as any[]).filter(
    (a) => a.status === "pending"
  ).length

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: "1px solid var(--border-default)" }}
      >
        <div className="flex items-center gap-2">
          <h1
            className="text-base font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            승인 큐
          </h1>
          {pendingCount > 0 && (
            <Badge
              className="text-xs border-0"
              style={{
                backgroundColor: "rgba(217,119,6,0.12)",
                color: "#d97706",
              }}
            >
              {pendingCount}
            </Badge>
          )}
        </div>
      </div>

      {/* Body */}
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader2
            size={22}
            className="animate-spin"
            style={{ color: "var(--text-tertiary)" }}
          />
        </div>
      ) : isError ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-3">
          <AlertCircle size={28} style={{ color: "var(--color-danger)" }} />
          <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
            승인 목록을 불러오는 데 실패했습니다.
          </p>
        </div>
      ) : (
        <Tabs defaultValue="pending" className="flex flex-col flex-1 overflow-hidden">
          <div className="px-6 pt-3" style={{ borderBottom: "1px solid var(--border-default)" }}>
            <TabsList className="h-9 bg-transparent p-0 gap-1">
              {(
                [
                  { value: "all" as TabValue, label: "전체", count: (allApprovals as any[]).length },
                  { value: "pending" as TabValue, label: "대기 중", count: pendingCount },
                  {
                    value: "done" as TabValue,
                    label: "처리 완료",
                    count: (allApprovals as any[]).filter(
                      (a) => a.status === "approved" || a.status === "rejected"
                    ).length,
                  },
                ] satisfies { value: TabValue; label: string; count: number }[]
              ).map(({ value, label, count }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className={cn(
                    "h-8 px-3 text-xs font-medium rounded-md border-0 data-[state=active]:bg-[var(--bg-tertiary)] data-[state=active]:text-[var(--text-primary)] data-[state=inactive]:text-[var(--text-tertiary)]"
                  )}
                >
                  {label}
                  {count > 0 && (
                    <span
                      className="ml-1.5 text-xs"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      {count}
                    </span>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {(["all", "pending", "done"] as TabValue[]).map((tab) => {
            const filtered = filterApprovals(allApprovals as any[], tab)
            return (
              <TabsContent
                key={tab}
                value={tab}
                className="flex-1 overflow-hidden mt-0"
              >
                <ScrollArea className="h-full">
                  <div className="p-6 max-w-2xl mx-auto space-y-3">
                    {filtered.length === 0 ? (
                      <EmptyState
                        icon={tab === "pending" ? <Clock size={32} /> : <CheckCircle size={32} />}
                        title={
                          tab === "pending"
                            ? "대기 중인 승인이 없습니다"
                            : "처리된 승인이 없습니다"
                        }
                        description={
                          tab === "pending"
                            ? "에이전트의 작업이 완료되면 여기서 승인할 수 있습니다."
                            : "승인하거나 반려한 항목이 여기에 표시됩니다."
                        }
                      />
                    ) : (
                      filtered.map((approval: any) => (
                        <div key={approval.id}>
                          <ApprovalCard
                            approval={approval}
                            onApprove={() => setPendingDecision({ id: approval.id, action: "approve" })}
                            onReject={() => setPendingDecision({ id: approval.id, action: "reject" })}
                            approving={approve.isPending && approve.variables?.id === approval.id}
                            rejecting={reject.isPending && reject.variables?.id === approval.id}
                          />
                          {pendingDecision != null && pendingDecision.id === approval.id && (
                            <DecisionNoteDialog
                              action={pendingDecision.action}
                              isPending={approve.isPending || reject.isPending}
                              onCancel={() => setPendingDecision(null)}
                              onConfirm={(note) => {
                                const action = pendingDecision!.action
                                if (action === "approve") {
                                  approve.mutate({ id: approval.id, note })
                                } else {
                                  reject.mutate({ id: approval.id, note })
                                }
                              }}
                            />
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
            )
          })}
        </Tabs>
      )}
    </div>
  )
}
