import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { cn, timeAgo } from "@/lib/utils"
import { Identity } from "./Identity"
import { StatusBadge } from "./StatusBadge"
import type { RunStatus } from "./StatusBadge"

interface ApprovalCase {
  id: string
  title: string
}

interface ApprovalAgent {
  id: string
  name: string
  avatarUrl?: string
}

interface ApprovalItem {
  id: string
  level?: "low" | "medium" | "high" | "critical"
  status: "pending" | "approved" | "rejected"
  payload?: {
    draft?: string
    [key: string]: unknown
  }
  case?: ApprovalCase
  caseTitle?: string
  agent?: ApprovalAgent
  agentName?: string
  createdAt?: string
  created_at?: string
}

interface ApprovalCardProps {
  approval: ApprovalItem
  onApprove: (id: string) => void
  onReject: (id: string) => void
  /** Legacy: true when approve is in-flight */
  approving?: boolean
  /** Legacy: true when reject is in-flight */
  rejecting?: boolean
  /** New unified pending flag */
  isPending?: boolean
  pendingAction?: "approve" | "reject"
  className?: string
}

const levelConfig: Record<string, { label: string; bg: string; text: string }> = {
  low: { label: "낮음", bg: "#f0f9ff", text: "#0284c7" },
  medium: { label: "중간", bg: "#fffbeb", text: "#d97706" },
  high: { label: "높음", bg: "#fff7ed", text: "#ea580c" },
  critical: { label: "긴급", bg: "#fef2f2", text: "#dc2626" },
}

const runStatusMap: Record<ApprovalItem["status"], RunStatus | null> = {
  pending: null,
  approved: "completed",
  rejected: "failed",
}

export function ApprovalCard({
  approval,
  onApprove,
  onReject,
  approving = false,
  rejecting = false,
  isPending = false,
  pendingAction,
  className,
}: ApprovalCardProps) {
  const level = approval.level ?? "medium"
  const levelCfg = levelConfig[level] ?? levelConfig.medium
  const runStatus = runStatusMap[approval.status]
  const isDecided = approval.status !== "pending"
  const createdAt = approval.createdAt ?? approval.created_at
  const agentName = approval.agent?.name ?? approval.agentName ?? "에이전트"
  const caseTitle = approval.case?.title ?? approval.caseTitle ?? ""

  // Support both old (approving/rejecting) and new (isPending/pendingAction) API
  const isApprovePending = approving || (isPending && pendingAction === "approve")
  const isRejectPending = rejecting || (isPending && pendingAction === "reject")
  const anyPending = isApprovePending || isRejectPending

  return (
    <Card
      className={cn("border-0", className)}
      style={{
        backgroundColor: "var(--bg-base)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <CardHeader className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between gap-2">
          <Identity
            name={agentName}
            avatarUrl={approval.agent?.avatarUrl}
            type="agent"
            size="sm"
          />
          <div className="flex items-center gap-2 shrink-0">
            <Badge
              className="text-xs font-medium border-0 px-2 py-0.5"
              style={{ backgroundColor: levelCfg.bg, color: levelCfg.text }}
            >
              {levelCfg.label}
            </Badge>
            {createdAt && (
              <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                {timeAgo(createdAt)}
              </span>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-3">
        {caseTitle && (
          <p className="text-sm font-medium mb-2" style={{ color: "var(--text-primary)" }}>
            {caseTitle}
          </p>
        )}
        {approval.payload?.draft && (
          <p
            className="text-xs rounded-lg p-3 leading-relaxed line-clamp-3"
            style={{
              backgroundColor: "var(--bg-secondary)",
              color: "var(--text-secondary)",
            }}
          >
            {approval.payload.draft}
          </p>
        )}
      </CardContent>

      <CardFooter className="px-4 pb-4 pt-0">
        {isDecided ? (
          <div className="w-full flex justify-end">
            {runStatus && <StatusBadge status={runStatus} />}
          </div>
        ) : (
          <div className="flex items-center gap-2 w-full justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onReject(approval.id)}
              disabled={anyPending}
              className="text-xs border-0 hover:bg-red-50 hover:text-red-600"
              style={{
                backgroundColor: "var(--bg-tertiary)",
                color: "var(--text-secondary)",
              }}
            >
              {isRejectPending ? "반려 중..." : "반려"}
            </Button>
            <Button
              size="sm"
              onClick={() => onApprove(approval.id)}
              disabled={anyPending}
              className="text-xs border-0 text-white"
              style={{ backgroundColor: "var(--color-teal-500)" }}
            >
              {isApprovePending ? "승인 중..." : "승인"}
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
