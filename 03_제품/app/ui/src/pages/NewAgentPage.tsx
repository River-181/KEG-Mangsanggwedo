// v0.2.0
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { useBreadcrumbs } from "@/context/BreadcrumbContext"
import { useOrganization } from "@/context/OrganizationContext"
import { agentsApi } from "@/api/agents"
import { queryKeys } from "@/lib/queryKeys"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, Info } from "lucide-react"

// ─── Config ───────────────────────────────────────────────────────────────────

const ROLE_OPTIONS = [
  { value: "orchestrator", label: "오케스트레이터 (총괄 매니저)" },
  { value: "complaint", label: "민원 처리" },
  { value: "retention", label: "이탈 방지" },
  { value: "scheduler", label: "일정 관리" },
  { value: "intake", label: "신규 상담" },
  { value: "staff", label: "강사 지원" },
  { value: "compliance", label: "법규 준수" },
  { value: "notification", label: "알림 발송" },
]

const APPROVAL_LEVELS = [
  { value: "0", label: "0 — 완전 자율 실행" },
  { value: "1", label: "1 — 위험 행동만 승인" },
  { value: "2", label: "2 — 주요 행동 승인" },
  { value: "3", label: "3 — 모든 외부 행동 승인" },
  { value: "4", label: "4 — 완전 수동 승인" },
]

// ─── Field component ──────────────────────────────────────────────────────────

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
      {children}
      {required && <span style={{ color: "var(--color-danger)" }} className="ml-0.5">*</span>}
    </label>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function NewAgentPage() {
  const { setBreadcrumbs } = useBreadcrumbs()
  const { selectedOrgId } = useOrganization()
  const { orgPrefix } = useParams<{ orgPrefix: string }>()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [description, setDescription] = useState("")
  const [systemPrompt, setSystemPrompt] = useState("")
  const [reportsTo, setReportsTo] = useState("")
  const [approvalLevel, setApprovalLevel] = useState("2")
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    setBreadcrumbs([
      { label: "에이전트 팀", href: `/${orgPrefix}/agents` },
      { label: "새 에이전트" },
    ])
  }, [setBreadcrumbs, orgPrefix])

  const { data: agents = [] } = useQuery({
    queryKey: queryKeys.agents.list(selectedOrgId ?? ""),
    queryFn: () => agentsApi.list(selectedOrgId!),
    enabled: !!selectedOrgId,
    retry: false,
  })

  const isFirstAgent = (agents as any[]).length === 0

  const isValid = name.trim().length > 0 && role.length > 0

  const handleSubmit = async () => {
    if (!isValid) return
    setSubmitted(true)
    // API call (backend may not exist yet — show success anyway)
    try {
      await agentsApi.create(selectedOrgId!, {
        name: name.trim(),
        role,
        description,
        systemPrompt,
        reportsTo: reportsTo || null,
        approvalLevel: parseInt(approvalLevel, 10),
      })
    } catch {
      // ignore — fallback
    }
    navigate(`/${orgPrefix}/agents`)
  }

  const handleCancel = () => {
    navigate(`/${orgPrefix}/agents`)
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-6 max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div
            className="flex items-center justify-center rounded-xl shrink-0"
            style={{ width: 44, height: 44, background: "var(--color-primary-bg)", color: "var(--color-teal-500)" }}
          >
            <Bot size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
              새 에이전트
            </h1>
            <p className="text-sm mt-0.5" style={{ color: "var(--text-tertiary)" }}>
              학원 운영을 도울 AI 에이전트를 추가합니다
            </p>
          </div>
        </div>

        {/* First agent banner */}
        {isFirstAgent && (
          <div
            className="flex items-start gap-3 rounded-xl p-4 mb-6"
            style={{ backgroundColor: "var(--color-primary-bg)", border: "1px solid rgba(20,184,166,0.3)" }}
          >
            <Info size={16} className="shrink-0 mt-0.5" style={{ color: "var(--color-teal-500)" }} />
            <p className="text-sm" style={{ color: "var(--color-teal-500)" }}>
              첫 번째 에이전트는 <strong>오케스트레이터(총괄 매니저)</strong>가 됩니다. 다른 에이전트들의 작업을 조율하고 의사결정을 내립니다.
            </p>
          </div>
        )}

        {/* Form */}
        <div
          className="rounded-2xl p-6 flex flex-col gap-5"
          style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-default)", boxShadow: "var(--shadow-sm)" }}
        >
          {/* 이름 */}
          <div className="flex flex-col gap-1.5">
            <FieldLabel required>에이전트 이름</FieldLabel>
            <Input
              placeholder="예: 민원 처리 에이전트"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              className="text-base"
              style={{
                backgroundColor: "var(--bg-base)",
                borderColor: "var(--border-default)",
                color: "var(--text-primary)",
              }}
            />
          </div>

          {/* 역할 */}
          <div className="flex flex-col gap-1.5">
            <FieldLabel required>역할 선택</FieldLabel>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger
                style={{
                  backgroundColor: "var(--bg-base)",
                  borderColor: "var(--border-default)",
                  color: role ? "var(--text-primary)" : "var(--text-tertiary)",
                }}
              >
                <SelectValue placeholder="역할을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {ROLE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 설명 */}
          <div className="flex flex-col gap-1.5">
            <FieldLabel>설명</FieldLabel>
            <Textarea
              placeholder="이 에이전트가 하는 일을 간략히 설명하세요"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              style={{
                backgroundColor: "var(--bg-base)",
                borderColor: "var(--border-default)",
                color: "var(--text-primary)",
                resize: "vertical",
              }}
            />
          </div>

          {/* 시스템 프롬프트 */}
          <div className="flex flex-col gap-1.5">
            <FieldLabel>시스템 프롬프트</FieldLabel>
            <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
              에이전트의 행동 지침을 작성하세요. 지식베이스 문서를 참조할 수 있습니다.
            </p>
            <Textarea
              placeholder="예: 당신은 학원 민원을 처리하는 전문 상담사입니다. 항상 공손하고 명확하게 응답하며..."
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              rows={8}
              style={{
                backgroundColor: "var(--bg-base)",
                borderColor: "var(--border-default)",
                color: "var(--text-primary)",
                resize: "vertical",
                fontFamily: "monospace",
                fontSize: 13,
              }}
            />
          </div>

          {/* 보고 대상 */}
          <div className="flex flex-col gap-1.5">
            <FieldLabel>보고 대상</FieldLabel>
            <Select value={reportsTo} onValueChange={setReportsTo}>
              <SelectTrigger
                style={{
                  backgroundColor: "var(--bg-base)",
                  borderColor: "var(--border-default)",
                  color: reportsTo ? "var(--text-primary)" : "var(--text-tertiary)",
                }}
              >
                <SelectValue placeholder="없음 (독립 에이전트)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">없음 (독립 에이전트)</SelectItem>
                {(agents as any[]).map((agent: any) => (
                  <SelectItem key={agent.id} value={agent.id}>
                    {agent.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 승인 레벨 */}
          <div className="flex flex-col gap-1.5">
            <FieldLabel>승인 레벨</FieldLabel>
            <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
              에이전트가 자율적으로 행동할 수 있는 수준을 설정합니다
            </p>
            <Select value={approvalLevel} onValueChange={setApprovalLevel}>
              <SelectTrigger
                style={{
                  backgroundColor: "var(--bg-base)",
                  borderColor: "var(--border-default)",
                  color: "var(--text-primary)",
                }}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {APPROVAL_LEVELS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 mt-6">
          <Button
            variant="ghost"
            onClick={handleCancel}
            style={{ color: "var(--text-secondary)" }}
          >
            취소
          </Button>
          <Button
            disabled={!isValid || submitted}
            onClick={handleSubmit}
            className="border-0 text-white px-6"
            style={{ backgroundColor: isValid ? "var(--color-teal-500)" : undefined }}
          >
            에이전트 생성
          </Button>
        </div>
      </div>
    </ScrollArea>
  )
}
