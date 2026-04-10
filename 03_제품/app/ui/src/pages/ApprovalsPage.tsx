import { useEffect, useContext, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useBreadcrumbs } from "@/context/BreadcrumbContext"
import { useOrganization } from "@/context/OrganizationContext"
import { approvalsApi } from "@/api/approvals"
import { api, ApiError } from "@/api/client"
import { queryKeys } from "@/lib/queryKeys"
import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ApprovalCard } from "@/components/ApprovalCard"
import { EmptyState } from "@/components/EmptyState"
import { ToastContext } from "@/components/ToastContext"
import { Loader2, AlertCircle, Clock, CheckCircle, XCircle } from "lucide-react"

type ApprovalStatusTab = "all" | "pending" | "approved" | "rejected"

interface ApprovalDecisionDialogState {
  id: string
  reason: string
}

function filterApprovals(approvals: any[], tab: ApprovalStatusTab) {
  if (tab === "pending") return approvals.filter((approval) => approval.status === "pending")
  if (tab === "approved") return approvals.filter((approval) => approval.status === "approved")
  if (tab === "rejected") return approvals.filter((approval) => approval.status === "rejected")
  return approvals
}

async function patchApproval(id: string, payload: { status: "approved" | "rejected"; reason?: string }) {
  try {
    return await api.patch(`/approvals/${id}`, payload)
  } catch (error) {
    if (payload.status === "approved") {
      return approvalsApi.approve(id, payload)
    }
    if (error instanceof ApiError && error.status === 404) {
      return approvalsApi.reject(id, payload)
    }
    return approvalsApi.reject(id, payload)
  }
}

export function ApprovalsPage() {
  const { setBreadcrumbs } = useBreadcrumbs()
  const { selectedOrgId } = useOrganization()
  const { orgPrefix } = useParams<{ orgPrefix: string }>()
  const queryClient = useQueryClient()
  const toast = useContext(ToastContext)

  const [activeTab, setActiveTab] = useState<ApprovalStatusTab>("pending")
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [rejectDialog, setRejectDialog] = useState<ApprovalDecisionDialogState | null>(null)

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

  const approvals = allApprovals as any[]
  const filteredApprovals = useMemo(
    () => filterApprovals(approvals, activeTab),
    [approvals, activeTab]
  )

  const pendingCount = approvals.filter((approval) => approval.status === "pending").length
  const approvedCount = approvals.filter((approval) => approval.status === "approved").length
  const rejectedCount = approvals.filter((approval) => approval.status === "rejected").length

  const updateApprovalMutation = useMutation({
    mutationFn: async ({
      id,
      status,
      reason,
    }: {
      id: string
      status: "approved" | "rejected"
      reason?: string
    }) => patchApproval(id, { status, reason }),
    onSuccess: (_data, variables) => {
      toast?.[variables.status === "approved" ? "success" : "info"](
        variables.status === "approved" ? "승인되었습니다." : "거절되었습니다."
      )
      setRejectDialog(null)
      setSelectedIds((current) => current.filter((id) => id !== variables.id))
      void queryClient.invalidateQueries({
        queryKey: queryKeys.approvals.list(selectedOrgId ?? ""),
      })
      void queryClient.invalidateQueries({
        queryKey: queryKeys.cases.list(selectedOrgId ?? ""),
      })
    },
    onError: (_error, variables) => {
      toast?.error(
        variables.status === "approved"
          ? "승인 처리에 실패했습니다."
          : "거절 처리에 실패했습니다."
      )
    },
  })

  const bulkApproveMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      for (const id of ids) {
        await patchApproval(id, { status: "approved" })
      }
    },
    onSuccess: () => {
      toast?.success("선택한 승인 요청을 모두 승인했습니다.")
      setSelectedIds([])
      void queryClient.invalidateQueries({
        queryKey: queryKeys.approvals.list(selectedOrgId ?? ""),
      })
      void queryClient.invalidateQueries({
        queryKey: queryKeys.cases.list(selectedOrgId ?? ""),
      })
    },
    onError: () => {
      toast?.error("일괄 승인 중 오류가 발생했습니다.")
    },
  })

  const selectedVisibleIds = selectedIds.filter((id) =>
    filteredApprovals.some((approval) => approval.id === id)
  )

  const toggleSelected = (approvalId: string, checked: boolean) => {
    setSelectedIds((current) =>
      checked ? Array.from(new Set([...current, approvalId])) : current.filter((id) => id !== approvalId)
    )
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div
        className="flex items-center justify-between px-6 py-4 gap-3"
        style={{ borderBottom: "1px solid var(--border-default)" }}
      >
        <div className="flex items-center gap-2">
          <h1 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
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

        {selectedVisibleIds.length > 0 && (
          <Button
            size="sm"
            className="gap-1.5"
            style={{ backgroundColor: "var(--color-success)", color: "#fff" }}
            disabled={bulkApproveMutation.isPending}
            onClick={() => bulkApproveMutation.mutate(selectedVisibleIds)}
          >
            {bulkApproveMutation.isPending ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <CheckCircle size={14} />
            )}
            선택 항목 모두 승인
          </Button>
        )}
      </div>

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
        <>
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as ApprovalStatusTab)}
            className="flex flex-col flex-1 overflow-hidden"
          >
            <div className="px-6 pt-3" style={{ borderBottom: "1px solid var(--border-default)" }}>
              <TabsList className="h-9 bg-transparent p-0 gap-1">
                {(
                  [
                    { value: "all" as ApprovalStatusTab, label: "전체", count: approvals.length },
                    { value: "pending" as ApprovalStatusTab, label: "대기중", count: pendingCount },
                    { value: "approved" as ApprovalStatusTab, label: "승인됨", count: approvedCount },
                    { value: "rejected" as ApprovalStatusTab, label: "거절됨", count: rejectedCount },
                  ] satisfies { value: ApprovalStatusTab; label: string; count: number }[]
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
                      <span className="ml-1.5 text-xs" style={{ color: "var(--text-tertiary)" }}>
                        {count}
                      </span>
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-6 max-w-3xl mx-auto space-y-3">
                {filteredApprovals.length === 0 ? (
                  <EmptyState
                    icon={
                      activeTab === "pending" ? (
                        <Clock size={32} />
                      ) : activeTab === "approved" ? (
                        <CheckCircle size={32} />
                      ) : (
                        <XCircle size={32} />
                      )
                    }
                    title={
                      activeTab === "pending"
                        ? "대기 중인 승인이 없습니다"
                        : activeTab === "approved"
                          ? "승인된 항목이 없습니다"
                          : activeTab === "rejected"
                            ? "거절된 항목이 없습니다"
                            : "표시할 승인 항목이 없습니다"
                    }
                    description="에이전트의 승인 요청이 들어오면 여기에서 바로 처리할 수 있습니다."
                  />
                ) : (
                  filteredApprovals.map((approval) => {
                    const isPending =
                      updateApprovalMutation.isPending &&
                      updateApprovalMutation.variables?.id === approval.id

                    return (
                      <ApprovalCard
                        key={approval.id}
                        approval={approval}
                        selected={selectedIds.includes(approval.id)}
                        onSelectedChange={(checked) => toggleSelected(approval.id, checked)}
                        caseHref={
                          approval.case?.id
                            ? `/${orgPrefix ?? ""}/cases/${approval.case.id}`
                            : undefined
                        }
                        onApprove={() =>
                          updateApprovalMutation.mutate({
                            id: approval.id,
                            status: "approved",
                          })
                        }
                        onReject={() =>
                          setRejectDialog({
                            id: approval.id,
                            reason: approval.reason ?? "",
                          })
                        }
                        isPending={isPending}
                        pendingAction={
                          updateApprovalMutation.variables?.status === "rejected"
                            ? "reject"
                            : "approve"
                        }
                      />
                    )
                  })
                )}
              </div>
            </ScrollArea>
          </Tabs>

          <Dialog
            open={rejectDialog != null}
            onOpenChange={(open) => {
              if (!open) setRejectDialog(null)
            }}
          >
            <DialogContent
              style={{
                backgroundColor: "var(--bg-base)",
                border: "1px solid var(--border-default)",
              }}
            >
              <DialogHeader>
                <DialogTitle style={{ color: "var(--text-primary)" }}>
                  거절 사유 입력
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-2">
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  승인 요청을 거절하는 이유를 남겨 주세요.
                </p>
                <textarea
                  value={rejectDialog?.reason ?? ""}
                  onChange={(event) => {
                    const value = event.target.value
                    setRejectDialog((current) => (current ? { ...current, reason: value } : current))
                  }}
                  rows={5}
                  className="w-full rounded-lg p-3 text-sm resize-none focus:outline-none"
                  style={{
                    backgroundColor: "var(--bg-elevated)",
                    border: "1px solid var(--border-default)",
                    color: "var(--text-primary)",
                  }}
                  placeholder="거절 사유를 입력하세요..."
                />
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setRejectDialog(null)}>
                  취소
                </Button>
                <Button
                  className="gap-1.5"
                  style={{ backgroundColor: "var(--color-danger)", color: "#fff" }}
                  disabled={!rejectDialog || updateApprovalMutation.isPending}
                  onClick={() => {
                    if (!rejectDialog) return
                    updateApprovalMutation.mutate({
                      id: rejectDialog.id,
                      status: "rejected",
                      reason: rejectDialog.reason.trim(),
                    })
                  }}
                >
                  {updateApprovalMutation.isPending &&
                  updateApprovalMutation.variables?.status === "rejected" ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <XCircle size={14} />
                  )}
                  거절 확정
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  )
}
