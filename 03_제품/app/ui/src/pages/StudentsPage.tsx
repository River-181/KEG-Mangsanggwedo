// v0.3.0
import { useEffect, useState, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { useBreadcrumbs } from "@/context/BreadcrumbContext"
import { useOrganization } from "@/context/OrganizationContext"
import { studentsApi } from "@/api/students"
import { queryKeys } from "@/lib/queryKeys"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import {
  GraduationCap,
  Search,
  ChevronRight,
  Shield,
  User,
  Phone,
  Mail,
  X,
  Loader2,
  AlertTriangle,
} from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

interface Parent {
  id: string
  name: string
  relation: string
  phone: string
  email: string
}

interface AttendanceRecord {
  id: string
  date: string
  status: string
  note?: string | null
}

interface Student {
  id: string
  name: string
  grade: string
  status: string
  riskScore: number
  enrolledAt: string
  parent: Parent | null
}

interface StudentDetail extends Student {
  parents: Parent[]
  attendance: AttendanceRecord[]
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function statusLabel(status: string): string {
  const map: Record<string, string> = {
    active: "재학중",
    inactive: "휴원",
    at_risk: "이탈위험",
    withdrawn: "퇴원",
  }
  return map[status] ?? status
}

function statusColor(status: string): React.CSSProperties {
  switch (status) {
    case "active":
      return { backgroundColor: "rgba(16,185,129,0.1)", color: "#10b981", border: "1px solid rgba(16,185,129,0.3)" }
    case "inactive":
      return { backgroundColor: "var(--bg-tertiary)", color: "var(--text-tertiary)", border: "1px solid var(--border-default)" }
    case "at_risk":
      return { backgroundColor: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)" }
    case "withdrawn":
      return { backgroundColor: "rgba(107,114,128,0.1)", color: "#6b7280", border: "1px solid rgba(107,114,128,0.3)" }
    default:
      return { backgroundColor: "var(--bg-tertiary)", color: "var(--text-secondary)" }
  }
}

function riskBarColor(score: number): string {
  if (score >= 70) return "#ef4444"
  if (score >= 40) return "#f59e0b"
  return "#10b981"
}

// ─── RiskBar ─────────────────────────────────────────────────────────────────

function RiskBar({ score }: { score: number }) {
  const pct = Math.max(0, Math.min(100, score))
  const color = riskBarColor(pct)
  return (
    <div className="flex items-center gap-2">
      <div
        className="flex-1 rounded-full overflow-hidden"
        style={{ height: 4, backgroundColor: "var(--bg-tertiary)", minWidth: 48 }}
      >
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs tabular-nums" style={{ color, minWidth: 30, textAlign: "right" }}>
        {pct.toFixed(0)}%
      </span>
    </div>
  )
}

// ─── StudentRow ───────────────────────────────────────────────────────────────

function StudentRow({
  student,
  isSelected,
  onClick,
}: {
  student: Student
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full text-left px-4 py-3 flex items-center gap-3 transition-colors",
        "hover:bg-[var(--bg-secondary)]",
        isSelected && "bg-[var(--color-primary-bg)]"
      )}
      style={isSelected ? { borderLeft: "2px solid var(--color-teal-500)" } : { borderLeft: "2px solid transparent" }}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
        style={{ backgroundColor: "var(--bg-tertiary)", color: "var(--text-secondary)" }}
      >
        {student.name[0]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>
            {student.name}
          </span>
          <span className="text-xs shrink-0" style={{ color: "var(--text-tertiary)" }}>
            {student.grade}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="text-xs px-1.5 py-0.5 rounded"
            style={statusColor(student.status)}
          >
            {statusLabel(student.status)}
          </span>
          <div style={{ flex: 1, minWidth: 60 }}>
            <RiskBar score={student.riskScore * 100} />
          </div>
        </div>
      </div>
      <ChevronRight size={14} style={{ color: "var(--text-tertiary)", flexShrink: 0 }} />
    </button>
  )
}

// ─── StudentDetail panel ─────────────────────────────────────────────────────

function StudentDetailPanel({
  studentId,
  onClose,
}: {
  studentId: string
  onClose: () => void
}) {
  const { data: student, isLoading } = useQuery<StudentDetail>({
    queryKey: queryKeys.students.detail(studentId),
    queryFn: () => studentsApi.get(studentId),
    enabled: !!studentId,
  })

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center" style={{ color: "var(--text-tertiary)" }}>
        <Loader2 size={24} className="animate-spin" />
      </div>
    )
  }

  if (!student) {
    return (
      <div className="flex-1 flex items-center justify-center p-6" style={{ color: "var(--text-tertiary)" }}>
        <p className="text-sm">학생 정보를 불러올 수 없습니다.</p>
      </div>
    )
  }

  const presentCount = student.attendance.filter(a => a.status === "present").length
  const absentCount = student.attendance.filter(a => a.status === "absent").length
  const lateCount = student.attendance.filter(a => a.status === "late").length
  const riskPct = Math.max(0, Math.min(100, student.riskScore * 100))

  return (
    <div className="flex flex-col h-full">
      {/* Detail header */}
      <div
        className="flex items-center justify-between px-5 py-4 shrink-0"
        style={{ borderBottom: "1px solid var(--border-default)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
            style={{ backgroundColor: "var(--bg-tertiary)", color: "var(--text-secondary)" }}
          >
            {student.name[0]}
          </div>
          <div>
            <h2 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
              {student.name}
            </h2>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>{student.grade}</span>
              <span
                className="text-xs px-1.5 py-0.5 rounded"
                style={statusColor(student.status)}
              >
                {statusLabel(student.status)}
              </span>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-md hover:bg-[var(--bg-tertiary)]"
        >
          <X size={16} style={{ color: "var(--text-tertiary)" }} />
        </button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-5 flex flex-col gap-4">

          {/* Privacy notice */}
          <div
            className="flex items-start gap-2 rounded-lg px-3 py-2.5 text-xs"
            style={{
              backgroundColor: "rgba(16,185,129,0.06)",
              border: "1px solid rgba(16,185,129,0.2)",
              color: "var(--text-secondary)",
            }}
          >
            <Shield size={13} className="mt-0.5 shrink-0" style={{ color: "#10b981" }} />
            <span>개인정보는 보호를 위해 일부 가려져 있습니다</span>
          </div>

          {/* Enrollment info */}
          <Card
            className="p-4"
            style={{
              backgroundColor: "var(--bg-elevated)",
              border: "1px solid var(--border-default)",
            }}
          >
            <p className="text-xs font-semibold mb-2" style={{ color: "var(--text-tertiary)" }}>
              기본 정보
            </p>
            <div className="flex flex-col gap-1.5 text-sm">
              <div className="flex justify-between">
                <span style={{ color: "var(--text-tertiary)" }}>등록일</span>
                <span style={{ color: "var(--text-primary)" }}>{student.enrolledAt}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "var(--text-tertiary)" }}>학년</span>
                <span style={{ color: "var(--text-primary)" }}>{student.grade}</span>
              </div>
            </div>
          </Card>

          {/* Risk score */}
          <Card
            className="p-4"
            style={{
              backgroundColor: "var(--bg-elevated)",
              border: "1px solid var(--border-default)",
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold" style={{ color: "var(--text-tertiary)" }}>
                이탈 위험도
              </p>
              {riskPct >= 70 && (
                <AlertTriangle size={13} style={{ color: "#ef4444" }} />
              )}
            </div>
            <div className="flex items-center gap-3">
              <div
                className="flex-1 rounded-full overflow-hidden"
                style={{ height: 8, backgroundColor: "var(--bg-tertiary)" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{ width: `${riskPct}%`, backgroundColor: riskBarColor(riskPct) }}
                />
              </div>
              <span
                className="text-lg font-bold tabular-nums"
                style={{ color: riskBarColor(riskPct), minWidth: 48, textAlign: "right" }}
              >
                {riskPct.toFixed(0)}%
              </span>
            </div>
          </Card>

          {/* Attendance summary */}
          <Card
            className="p-4"
            style={{
              backgroundColor: "var(--bg-elevated)",
              border: "1px solid var(--border-default)",
            }}
          >
            <p className="text-xs font-semibold mb-3" style={{ color: "var(--text-tertiary)" }}>
              출결 현황
            </p>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-lg font-bold" style={{ color: "#10b981" }}>{presentCount}</p>
                <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>출석</p>
              </div>
              <div>
                <p className="text-lg font-bold" style={{ color: "#ef4444" }}>{absentCount}</p>
                <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>결석</p>
              </div>
              <div>
                <p className="text-lg font-bold" style={{ color: "#f59e0b" }}>{lateCount}</p>
                <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>지각</p>
              </div>
            </div>
          </Card>

          {/* Parent info */}
          {student.parents.length > 0 && student.parents.map((parent) => (
            <Card
              key={parent.id}
              className="p-4"
              style={{
                backgroundColor: "var(--bg-elevated)",
                border: "1px solid var(--border-default)",
              }}
            >
              <p className="text-xs font-semibold mb-3" style={{ color: "var(--text-tertiary)" }}>
                보호자 정보
              </p>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <User size={13} style={{ color: "var(--text-tertiary)", flexShrink: 0 }} />
                  <span style={{ color: "var(--text-primary)" }}>{parent.name}</span>
                  <span
                    className="text-xs px-1.5 py-0.5 rounded"
                    style={{
                      backgroundColor: "var(--bg-tertiary)",
                      color: "var(--text-tertiary)",
                    }}
                  >
                    {parent.relation}
                  </span>
                </div>
                {parent.phone && (
                  <div className="flex items-center gap-2">
                    <Phone size={13} style={{ color: "var(--text-tertiary)", flexShrink: 0 }} />
                    <span style={{ color: "var(--text-secondary)" }}>{parent.phone}</span>
                  </div>
                )}
                {parent.email && (
                  <div className="flex items-center gap-2">
                    <Mail size={13} style={{ color: "var(--text-tertiary)", flexShrink: 0 }} />
                    <span style={{ color: "var(--text-secondary)" }}>{parent.email}</span>
                  </div>
                )}
              </div>
            </Card>
          ))}

        </div>
      </ScrollArea>
    </div>
  )
}

// ─── StudentsPage ─────────────────────────────────────────────────────────────

type SortKey = "name" | "grade" | "riskScore"

export function StudentsPage() {
  const { setBreadcrumbs } = useBreadcrumbs()
  const { selectedOrgId } = useOrganization()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [sortKey, setSortKey] = useState<SortKey>("riskScore")

  useEffect(() => {
    setBreadcrumbs([{ label: "학생 관리" }])
  }, [setBreadcrumbs])

  const { data: students = [], isLoading } = useQuery<Student[]>({
    queryKey: queryKeys.students.list(selectedOrgId ?? ""),
    queryFn: () => studentsApi.list(selectedOrgId!),
    enabled: !!selectedOrgId,
  })

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    let list = q
      ? students.filter(
          s =>
            s.name.toLowerCase().includes(q) ||
            s.grade.toLowerCase().includes(q)
        )
      : students

    list = [...list].sort((a, b) => {
      if (sortKey === "name") return a.name.localeCompare(b.name, "ko")
      if (sortKey === "grade") return a.grade.localeCompare(b.grade, "ko")
      if (sortKey === "riskScore") return b.riskScore - a.riskScore
      return 0
    })

    return list
  }, [students, search, sortKey])

  const selectedStudent = students.find(s => s.id === selectedId)

  return (
    <div className="flex flex-col h-full overflow-hidden">

      {/* Privacy banner */}
      <div
        className="flex items-center gap-2 px-5 py-2.5 text-xs shrink-0"
        style={{
          backgroundColor: "rgba(16,185,129,0.06)",
          borderBottom: "1px solid rgba(16,185,129,0.15)",
          color: "var(--text-secondary)",
        }}
      >
        <Shield size={13} style={{ color: "#10b981", flexShrink: 0 }} />
        <span>
          학생 개인정보는 마스킹 처리되어 표시됩니다. 에이전트는 개인정보에 직접 접근할 수 없습니다.
        </span>
      </div>

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left panel */}
        <div
          className="flex flex-col"
          style={{
            width: selectedId ? 320 : "100%",
            minWidth: 280,
            borderRight: selectedId ? "1px solid var(--border-default)" : undefined,
            transition: "width 0.2s ease",
          }}
        >
          {/* Header */}
          <div
            className="px-5 py-4 shrink-0"
            style={{ borderBottom: "1px solid var(--border-default)" }}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h1 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                  학생 관리
                </h1>
                {!isLoading && (
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-tertiary)" }}>
                    총 {students.length}명
                  </p>
                )}
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: "var(--text-tertiary)" }}
              />
              <Input
                placeholder="이름 또는 학년 검색..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-8 text-sm h-8"
                style={{
                  backgroundColor: "var(--bg-tertiary)",
                  border: "1px solid var(--border-default)",
                  color: "var(--text-primary)",
                }}
              />
            </div>

            {/* Sort */}
            <div className="flex gap-1 mt-2">
              {(["riskScore", "name", "grade"] as SortKey[]).map(key => (
                <Button
                  key={key}
                  variant="ghost"
                  size="sm"
                  className="text-xs h-6 px-2"
                  style={{
                    backgroundColor: sortKey === key ? "var(--color-primary-bg)" : undefined,
                    color: sortKey === key ? "var(--color-teal-500)" : "var(--text-tertiary)",
                    fontWeight: sortKey === key ? 600 : 400,
                  }}
                  onClick={() => setSortKey(key)}
                >
                  {key === "riskScore" ? "위험도순" : key === "name" ? "이름순" : "학년순"}
                </Button>
              ))}
            </div>
          </div>

          {/* List */}
          <ScrollArea className="flex-1">
            {isLoading ? (
              <div className="flex items-center justify-center py-16" style={{ color: "var(--text-tertiary)" }}>
                <Loader2 size={20} className="animate-spin" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-2">
                <GraduationCap size={32} style={{ color: "var(--text-tertiary)" }} />
                <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
                  {search ? "검색 결과가 없습니다" : "등록된 학생이 없습니다"}
                </p>
              </div>
            ) : (
              <div className="divide-y" style={{ borderColor: "var(--border-default)" }}>
                {filtered.map(student => (
                  <StudentRow
                    key={student.id}
                    student={student}
                    isSelected={selectedId === student.id}
                    onClick={() => setSelectedId(student.id === selectedId ? null : student.id)}
                  />
                ))}
              </div>
            )}
          </ScrollArea>
        </div>

        {/* Right panel */}
        {selectedId && (
          <div
            className="flex-1 flex flex-col overflow-hidden"
            style={{ backgroundColor: "var(--bg-base)" }}
          >
            <StudentDetailPanel
              studentId={selectedId}
              onClose={() => setSelectedId(null)}
            />
          </div>
        )}

      </div>
    </div>
  )
}
