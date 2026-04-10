export type CaseType =
  | "complaint"
  | "refund"
  | "makeup"
  | "inquiry"
  | "churn"
  | "schedule"

export type CaseSeverity = "immediate" | "same_day" | "normal" | "low"

export type CaseStatus =
  | "backlog"
  | "todo"
  | "in_progress"
  | "in_review"
  | "blocked"
  | "done"

export type AgentType =
  | "orchestrator"
  | "complaint"
  | "retention"
  | "scheduler"
  | "intake"
  | "staff"

export type AgentStatus = "idle" | "running" | "paused" | "error" | "terminated"

export type ApprovalStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "revision_requested"

export type ApprovalLevel = 0 | 1 | 2 | 3 | 4

export type RunStatus =
  | "queued"
  | "running"
  | "completed"
  | "pending_approval"
  | "failed"

export type AttendanceStatus = "present" | "absent" | "late" | "excused"
