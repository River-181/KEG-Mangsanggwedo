import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useBreadcrumbs } from "@/context/BreadcrumbContext"
import { useOrganization } from "@/context/OrganizationContext"
import { skillsApi } from "@/api/skills"
import { queryKeys } from "@/lib/queryKeys"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Puzzle, Download, CheckCircle2, ChevronDown, ChevronUp, Loader2, Bot } from "lucide-react"

// ─── Fallback catalog ─────────────────────────────────────────────────────────

const FALLBACK_SKILLS = [
  {
    slug: "complaint-classifier",
    name: "민원 분류기",
    description: "학부모 민원 텍스트를 카테고리별로 자동 분류합니다. NLP 기반 분류 모델 사용.",
    version: "1.2.0",
    type: "builtin",
    installed: true,
    equippedAgents: 2,
  },
  {
    slug: "churn-detector",
    name: "이탈 감지기",
    description: "학생 출결 패턴과 수업 참여도를 분석하여 이탈 위험 점수를 예측합니다.",
    version: "0.9.1",
    type: "builtin",
    installed: true,
    equippedAgents: 1,
  },
  {
    slug: "sms-sender",
    name: "문자 발송기",
    description: "카카오 알림톡 및 SMS 자동 발송을 지원합니다. 카카오 비즈니스 계정 필요.",
    version: "2.0.0",
    type: "external_mcp",
    installed: false,
    equippedAgents: 0,
  },
  {
    slug: "report-generator",
    name: "리포트 생성기",
    description: "주간/월간 원장 리포트를 자동 생성합니다. PDF 및 엑셀 내보내기 지원.",
    version: "1.0.3",
    type: "builtin",
    installed: false,
    equippedAgents: 0,
  },
  {
    slug: "schedule-optimizer",
    name: "일정 최적화기",
    description: "강사 가용 시간과 학생 수요를 분석하여 최적 수업 시간표를 제안합니다.",
    version: "0.5.0",
    type: "external_mcp",
    installed: false,
    equippedAgents: 0,
  },
  {
    slug: "parent-reply",
    name: "학부모 답변 생성기",
    description: "민원 내용을 분석하여 공감적이고 정중한 답변 초안을 자동 생성합니다.",
    version: "1.1.0",
    type: "builtin",
    installed: true,
    equippedAgents: 1,
  },
]

// ─── Type badge ───────────────────────────────────────────────────────────────

function TypeBadge({ type }: { type: string }) {
  const isBuiltin = type === "builtin"
  return (
    <Badge
      className="text-xs border-0 px-2 py-0.5"
      style={{
        backgroundColor: isBuiltin ? "var(--color-primary-bg)" : "rgba(168,85,247,0.1)",
        color: isBuiltin ? "var(--color-teal-500)" : "#a855f7",
      }}
    >
      {isBuiltin ? "내장" : "외부 MCP"}
    </Badge>
  )
}

// ─── Skill card ───────────────────────────────────────────────────────────────

function SkillCard({ skill }: { skill: any }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className="rounded-xl flex flex-col gap-0 overflow-hidden transition-all"
      style={{
        backgroundColor: "var(--bg-elevated)",
        border: "1px solid var(--border-default)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {/* Main row */}
      <button
        className="flex items-start gap-3 p-4 w-full text-left"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        {/* Icon */}
        <div
          className="flex items-center justify-center rounded-lg shrink-0"
          style={{
            width: 36,
            height: 36,
            background: skill.installed ? "var(--color-primary-bg)" : "var(--bg-tertiary)",
            color: skill.installed ? "var(--color-teal-500)" : "var(--text-tertiary)",
          }}
        >
          <Puzzle size={18} />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
              {skill.name}
            </p>
            <TypeBadge type={skill.type ?? "builtin"} />
          </div>
          <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
            v{skill.version}
          </p>
        </div>

        {/* Right side */}
        <div className="flex flex-col items-end gap-1 shrink-0">
          {skill.installed ? (
            <span
              className="flex items-center gap-1 text-xs font-semibold"
              style={{ color: "var(--color-success)" }}
            >
              <CheckCircle2 size={13} />
              설치됨
            </span>
          ) : (
            <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
              미설치
            </span>
          )}
          {expanded ? (
            <ChevronUp size={14} style={{ color: "var(--text-tertiary)" }} />
          ) : (
            <ChevronDown size={14} style={{ color: "var(--text-tertiary)" }} />
          )}
        </div>
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div
          className="px-4 pb-4 flex flex-col gap-3"
          style={{ borderTop: "1px solid var(--border-default)" }}
        >
          <p
            className="text-xs leading-relaxed pt-3"
            style={{ color: "var(--text-secondary)" }}
          >
            {skill.description}
          </p>

          {/* Equipped agents */}
          <div className="flex items-center gap-1.5">
            <Bot size={13} style={{ color: "var(--text-tertiary)" }} />
            <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
              {skill.equippedAgents ?? 0}개 에이전트에 장착됨
            </span>
          </div>

          {/* Install button */}
          <button
            className="flex items-center justify-center gap-1.5 w-full py-1.5 rounded-lg text-xs font-semibold transition-colors"
            style={
              skill.installed
                ? {
                    background: "var(--bg-tertiary)",
                    color: "var(--text-tertiary)",
                    cursor: "default",
                  }
                : {
                    background: "var(--color-teal-500)",
                    color: "#fff",
                    cursor: "pointer",
                  }
            }
            disabled={skill.installed}
          >
            {skill.installed ? (
              "설치됨"
            ) : (
              <>
                <Download size={12} />
                설치
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function SkillsPage() {
  const { setBreadcrumbs } = useBreadcrumbs()
  const { selectedOrgId } = useOrganization()

  useEffect(() => {
    setBreadcrumbs([{ label: "k-skill 레지스트리" }])
  }, [setBreadcrumbs])

  const { data: apiSkills, isLoading } = useQuery({
    queryKey: queryKeys.skills.all,
    queryFn: () => skillsApi.list(),
    retry: false,
  })

  const skills: any[] = (apiSkills as any[] | undefined)?.length
    ? (apiSkills as any[])
    : FALLBACK_SKILLS

  const installedCount = skills.filter((s) => s.installed).length

  return (
    <ScrollArea className="h-full">
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
              k-skill 레지스트리
            </h1>
            <p className="text-sm mt-0.5" style={{ color: "var(--text-tertiary)" }}>
              {installedCount}/{skills.length} 설치됨
            </p>
          </div>
          {isLoading && (
            <Loader2 size={18} className="animate-spin" style={{ color: "var(--text-tertiary)" }} />
          )}
        </div>

        {/* Filters row */}
        <div className="flex gap-2 mb-5">
          {["전체", "설치됨", "미설치", "내장", "외부 MCP"].map((f) => (
            <button
              key={f}
              className="px-3 py-1 rounded-full text-xs font-medium transition-colors"
              style={
                f === "전체"
                  ? { backgroundColor: "var(--color-teal-500)", color: "#fff" }
                  : { backgroundColor: "var(--bg-tertiary)", color: "var(--text-secondary)" }
              }
              disabled
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
        >
          {skills.map((skill) => (
            <SkillCard key={skill.slug} skill={skill} />
          ))}
        </div>
      </div>
    </ScrollArea>
  )
}
