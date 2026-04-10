// v0.3.0
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useBreadcrumbs } from "@/context/BreadcrumbContext"
import { useOrganization } from "@/context/OrganizationContext"
import { notificationsApi } from "@/api/notifications"
import { approvalsApi } from "@/api/approvals"
import { queryKeys } from "@/lib/queryKeys"
import { ApprovalCard } from "@/components/ApprovalCard"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, AlertTriangle, Bot, FilePlus, Bell, Clock } from "lucide-react"
import { cn, timeAgo } from "@/lib/utils"

type NotificationType = "approval_needed" | "risk_detected" | "agent_completed" | "case_created" | "reminder"

interface Notification {
  id: string
  type: NotificationType
  title: string
  body: string
  entityType?: string
  entityId?: string
  read: boolean
  createdAt: string
}

function notificationIcon(type: NotificationType) {
  switch (type) {
    case "approval_needed":
      return <CheckCircle2 size={18} style={{ color: "var(--color-warning, #f59e0b)" }} />
    case "risk_detected":
      return <AlertTriangle size={18} style={{ color: "#ef4444" }} />
    case "agent_completed":
      return <Bot size={18} style={{ color: "var(--color-teal-500)" }} />
    case "case_created":
      return <FilePlus size={18} style={{ color: "var(--text-secondary)" }} />
    case "reminder":
      return <Clock size={18} style={{ color: "var(--color-teal-500)" }} />
    default:
      return <Bell size={18} style={{ color: "var(--text-secondary)" }} />
  }
}

const GROUP_ORDER: NotificationType[] = ["approval_needed", "agent_completed", "case_created", "risk_detected", "reminder"]
const GROUP_LABELS: Record<NotificationType, string> = {
  approval_needed: "승인 대기",
  agent_completed: "에이전트 알림",
  case_created: "케이스 알림",
  risk_detected: "위험 감지",
  reminder: "리마인더",
}

export function InboxPage() {
  const { setBreadcrumbs } = useBreadcrumbs()
  const { selectedOrgId } = useOrganization()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  useEffect(() => {
    setBreadcrumbs([{ label: "알림함" }])
  }, [setBreadcrumbs])

  const { data: notifications = [], isLoading } = useQuery<Notification[]>({
    queryKey: queryKeys.notifications.list(selectedOrgId ?? ""),
    queryFn: () => notificationsApi.list(selectedOrgId!),
    enabled: !!selectedOrgId,
  })

  const { data: approvals = [] } = useQuery<any[]>({
    queryKey: queryKeys.approvals.list(selectedOrgId ?? ""),
    queryFn: () => approvalsApi.list(selectedOrgId!),
    enabled: !!selectedOrgId,
  })

  const markReadMutation = useMutation({
    mutationFn: (id: string) => notificationsApi.markRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.list(selectedOrgId ?? "") })
    },
  })

  const approvesMutation = useMutation({
    mutationFn: (id: string) => approvalsApi.approve(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.approvals.list(selectedOrgId ?? "") })
    },
  })

  const rejectMutation = useMutation({
    mutationFn: (id: string) => approvalsApi.reject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.approvals.list(selectedOrgId ?? "") })
    },
  })

  const markAllRead = async () => {
    const unread = notifications.filter((n) => !n.read)
    await Promise.all(unread.map((n) => notificationsApi.markRead(n.id)))
    queryClient.invalidateQueries({ queryKey: queryKeys.notifications.list(selectedOrgId ?? "") })
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  // Group notifications by type
  const grouped = GROUP_ORDER.reduce<Record<string, Notification[]>>((acc, type) => {
    const items = notifications.filter((n) => n.type === type)
    if (items.length > 0) acc[type] = items
    return acc
  }, {})

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markReadMutation.mutate(notification.id)
    }
    const orgPrefix = window.location.pathname.split("/")[1]
    if (notification.entityType === "case" && notification.entityId) {
      navigate(`/${orgPrefix}/cases/${notification.entityId}`)
    } else if (notification.entityType === "agent_run" && notification.entityId) {
      navigate(`/${orgPrefix}/agents`)
    }
  }

  if (isLoading) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="h-8 w-48 rounded animate-pulse mb-6" style={{ background: "var(--bg-tertiary)" }} />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 rounded-xl animate-pulse" style={{ background: "var(--bg-tertiary)" }} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            알림함
          </h1>
          {unreadCount > 0 && (
            <Badge
              className="text-xs font-bold px-2 py-0.5 border-0"
              style={{ background: "var(--color-teal-500)", color: "#fff" }}
            >
              {unreadCount}
            </Badge>
          )}
        </div>
        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={markAllRead}
            className="text-xs border"
            style={{ color: "var(--color-teal-500)", borderColor: "var(--border-default)" }}
          >
            모두 읽음
          </Button>
        )}
      </div>
      <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
        {unreadCount > 0 ? `읽지 않은 알림 ${unreadCount}개` : "모든 알림을 읽었습니다"}
      </p>

      {notifications.length === 0 ? (
        <div
          className="rounded-xl p-10 flex flex-col items-center justify-center gap-3"
          style={{
            backgroundColor: "var(--bg-elevated)",
            border: "1px solid var(--border-default)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <Bell size={40} style={{ color: "var(--text-tertiary)" }} />
          <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
            새 알림이 없습니다.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {(Object.entries(grouped) as [NotificationType, Notification[]][]).map(([type, items]) => (
            <div key={type}>
              <h2 className="text-xs font-semibold uppercase tracking-wider mb-2 px-1" style={{ color: "var(--text-tertiary)" }}>
                {GROUP_LABELS[type]}
              </h2>
              <div
                className="rounded-xl overflow-hidden"
                style={{
                  border: "1px solid var(--border-default)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                {items.map((notification, idx) => {
                  // For approval_needed, find the matching approval and render ApprovalCard
                  if (type === "approval_needed" && notification.entityId) {
                    const approval = approvals.find((a) => a.id === notification.entityId)
                    if (approval) {
                      return (
                        <div
                          key={notification.id}
                          className={cn(idx !== 0 && "border-t")}
                          style={{
                            borderColor: "var(--border-default)",
                            backgroundColor: notification.read ? "var(--bg-elevated)" : "var(--bg-secondary)",
                          }}
                        >
                          <ApprovalCard
                            approval={approval}
                            onApprove={(id) => approvesMutation.mutate(id)}
                            onReject={(id) => rejectMutation.mutate(id)}
                            isPending={approvesMutation.isPending || rejectMutation.isPending}
                            pendingAction={approvesMutation.isPending ? "approve" : "reject"}
                          />
                        </div>
                      )
                    }
                  }

                  return (
                    <div
                      key={notification.id}
                      className={cn(
                        "flex items-start gap-3 px-4 py-3.5",
                        idx !== 0 && "border-t",
                        (notification.entityType === "case" || notification.entityType === "agent_run") &&
                          "cursor-pointer hover:bg-[var(--bg-secondary)] transition-colors"
                      )}
                      style={{
                        backgroundColor: notification.read ? "var(--bg-elevated)" : "var(--bg-secondary)",
                        borderColor: "var(--border-default)",
                      }}
                      onClick={() => handleNotificationClick(notification)}
                      role={notification.entityType ? "button" : undefined}
                    >
                      <div className="mt-0.5 shrink-0">{notificationIcon(type)}</div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={cn("text-sm", !notification.read && "font-semibold")}
                            style={{ color: "var(--text-primary)" }}
                          >
                            {notification.title}
                          </span>
                          {!notification.read && (
                            <span
                              className="w-2 h-2 rounded-full shrink-0"
                              style={{ backgroundColor: "var(--color-teal-500)" }}
                            />
                          )}
                        </div>
                        <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
                          {notification.body}
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                          {timeAgo(notification.createdAt)}
                        </span>
                        {notification.entityType === "case" && (
                          <span
                            className="text-xs px-2 py-0.5 rounded"
                            style={{ background: "var(--bg-tertiary)", color: "var(--color-teal-500)" }}
                          >
                            케이스 보기
                          </span>
                        )}
                        {notification.entityType === "agent_run" && (
                          <span
                            className="text-xs px-2 py-0.5 rounded"
                            style={{ background: "var(--bg-tertiary)", color: "var(--color-teal-500)" }}
                          >
                            상세 보기
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
