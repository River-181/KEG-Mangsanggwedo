import { useEffect, useState } from "react"
import { useBreadcrumbs } from "@/context/BreadcrumbContext"
import { CheckCircle2, AlertTriangle, Bot, FilePlus, Bell } from "lucide-react"
import { cn } from "@/lib/utils"

type NotificationType = "approval_needed" | "risk_detected" | "agent_completed" | "case_created"

interface Notification {
  id: string
  type: NotificationType
  title: string
  body: string
  time: string
  read: boolean
}

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    type: "approval_needed",
    title: "승인 요청",
    body: "민원담당이 C-001 응답 초안을 생성했습니다",
    time: "5분 전",
    read: false,
  },
  {
    id: "n2",
    type: "risk_detected",
    title: "이탈 위험 감지",
    body: "이수아(중2) 이탈 위험 점수 0.82",
    time: "10분 전",
    read: false,
  },
  {
    id: "n3",
    type: "agent_completed",
    title: "에이전트 완료",
    body: "민원담당이 민원 3건 분류를 완료했습니다",
    time: "15분 전",
    read: true,
  },
  {
    id: "n4",
    type: "case_created",
    title: "새 케이스",
    body: "C-005 성인부 대체 강사 요청이 등록되었습니다",
    time: "1시간 전",
    read: true,
  },
]

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
  }
}

export function InboxPage() {
  const { setBreadcrumbs } = useBreadcrumbs()
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS)

  useEffect(() => {
    setBreadcrumbs([{ label: "알림함" }])
  }, [setBreadcrumbs])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
          알림함
        </h1>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="text-xs font-medium px-3 py-1.5 rounded-lg transition-colors hover:bg-[var(--bg-secondary)]"
            style={{ color: "var(--color-teal-500)", border: "1px solid var(--border-default)" }}
          >
            모두 읽음 처리
          </button>
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
        <div
          className="rounded-xl overflow-hidden"
          style={{
            border: "1px solid var(--border-default)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          {notifications.map((notification, idx) => (
            <button
              key={notification.id}
              onClick={() => markRead(notification.id)}
              className={cn(
                "w-full flex items-start gap-3 px-4 py-3.5 text-left transition-colors hover:bg-[var(--bg-secondary)]",
                idx !== 0 && "border-t"
              )}
              style={{
                backgroundColor: notification.read ? "var(--bg-elevated)" : "var(--bg-secondary)",
                borderColor: "var(--border-default)",
              }}
            >
              <div className="mt-0.5 shrink-0">{notificationIcon(notification.type)}</div>

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
                <p className="text-xs mt-0.5 truncate" style={{ color: "var(--text-secondary)" }}>
                  {notification.body}
                </p>
              </div>

              <span className="text-xs shrink-0 mt-0.5" style={{ color: "var(--text-tertiary)" }}>
                {notification.time}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
