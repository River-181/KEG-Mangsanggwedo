import { useEffect, useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useBreadcrumbs } from "@/context/BreadcrumbContext"
import { useOrganization } from "@/context/OrganizationContext"
import { useToast } from "@/context/ToastContext"
import { agentsApi } from "@/api/agents"
import { api } from "@/api/client"
import { skillsApi } from "@/api/skills"
import { queryKeys } from "@/lib/queryKeys"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Bot, CheckCircle2, ChevronDown, Download, Loader2, Plus, Puzzle, Trash2 } from "lucide-react"

type SkillType = "builtin" | "external_mcp"
type SkillFilter = "전체" | "설치됨" | "미설치" | "내장" | "외부 MCP"

interface Skill {
  slug: string
  name: string
  description: string
  version: string
  type: SkillType
  installed: boolean
  equippedAgents?: number
  config?: unknown
}

interface AgentRecord {
  id: string
  name?: string
  skills?: unknown[]
  equippedSkills?: unknown[]
}

const FALLBACK_SKILLS: Skill[] = [
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

const FILTERS: SkillFilter[] = ["전체", "설치됨", "미설치", "내장", "외부 MCP"]

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function normalizeSkill(skill: any): Skill {
  return {
    slug: String(skill.slug ?? skill.id ?? skill.name ?? `skill-${Date.now()}`),
    name: String(skill.name ?? skill.slug ?? "이름 없는 스킬"),
    description: String(skill.description ?? "설명이 없습니다."),
    version: String(skill.version ?? "1.0.0"),
    type: skill.type === "external_mcp" ? "external_mcp" : "builtin",
    installed: Boolean(skill.installed),
    equippedAgents: Number(skill.equippedAgents ?? skill.equipped_agents ?? 0),
    config: skill.config ?? {},
  }
}

function skillMatchesFilter(skill: Skill, filter: SkillFilter) {
  switch (filter) {
    case "설치됨":
      return skill.installed
    case "미설치":
      return !skill.installed
    case "내장":
      return skill.type === "builtin"
    case "외부 MCP":
      return skill.type === "external_mcp"
    default:
      return true
  }
}

function extractAgentSkillSlugs(agent: AgentRecord): string[] {
  const rawSkills = Array.isArray(agent.skills)
    ? agent.skills
    : Array.isArray(agent.equippedSkills)
    ? agent.equippedSkills
    : []

  return rawSkills
    .map((skill) => {
      if (typeof skill === "string") return skill
      if (skill && typeof skill === "object") {
        const data = skill as Record<string, unknown>
        const slug = data.slug ?? data.id ?? data.name
        return typeof slug === "string" ? slug : null
      }
      return null
    })
    .filter((value): value is string => Boolean(value))
}

function TypeBadge({ type }: { type: SkillType }) {
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

function SkillCard({
  skill,
  isLoading,
  onOpenDetail,
  onInstall,
  onRemove,
}: {
  skill: Skill
  isLoading: boolean
  onOpenDetail: () => void
  onInstall: () => void
  onRemove: () => void
}) {
  return (
    <div
      className="rounded-xl flex flex-col overflow-hidden transition-all"
      style={{
        backgroundColor: "var(--bg-elevated)",
        border: "1px solid var(--border-default)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <button
        className="flex items-start gap-3 p-4 w-full text-left"
        onClick={onOpenDetail}
        aria-label={`${skill.name} 상세 보기`}
      >
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

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
              {skill.name}
            </p>
            <TypeBadge type={skill.type} />
          </div>
          <p className="text-xs mb-2" style={{ color: "var(--text-tertiary)" }}>
            v{skill.version}
          </p>
          <p
            className="text-xs leading-relaxed line-clamp-2"
            style={{ color: "var(--text-secondary)" }}
          >
            {skill.description}
          </p>
        </div>

        <div className="flex flex-col items-end gap-1 shrink-0">
          {isLoading ? (
            <Loader2 size={14} className="animate-spin" style={{ color: "var(--text-tertiary)" }} />
          ) : skill.installed ? (
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
          <ChevronDown size={14} style={{ color: "var(--text-tertiary)" }} />
        </div>
      </button>

      <div
        className="px-4 pb-4 flex items-center gap-2"
        style={{ borderTop: "1px solid var(--border-default)" }}
      >
        <Button
          size="sm"
          variant="outline"
          className="text-xs"
          onClick={onOpenDetail}
        >
          상세 보기
        </Button>
        {skill.installed ? (
          <Button
            size="sm"
            variant="outline"
            className="text-xs gap-1.5"
            onClick={onRemove}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
            제거
          </Button>
        ) : (
          <Button
            size="sm"
            className="text-xs gap-1.5 border-0 text-white"
            style={{ backgroundColor: "var(--color-teal-500)" }}
            onClick={onInstall}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
            설치
          </Button>
        )}
      </div>
    </div>
  )
}

export function SkillsPage() {
  const { setBreadcrumbs } = useBreadcrumbs()
  const { selectedOrgId } = useOrganization()
  const { addToast } = useToast()
  const [activeFilter, setActiveFilter] = useState<SkillFilter>("전체")
  const [localSkills, setLocalSkills] = useState<Skill[]>(FALLBACK_SKILLS.map(normalizeSkill))
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({})
  const [detailSkillSlug, setDetailSkillSlug] = useState<string | null>(null)
  const [advancedOpen, setAdvancedOpen] = useState(false)
  const [configDrafts, setConfigDrafts] = useState<Record<string, string>>({})
  const [equipTargetAgentId, setEquipTargetAgentId] = useState<string>("")
  const [mockEquippedAgentsBySkill, setMockEquippedAgentsBySkill] = useState<Record<string, string[]>>({})
  const [isSubmittingEquip, setIsSubmittingEquip] = useState(false)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [newSkill, setNewSkill] = useState({
    slug: "",
    name: "",
    description: "",
    type: "내장" as "내장" | "외부 MCP",
    version: "1.0.0",
  })

  useEffect(() => {
    setBreadcrumbs([{ label: "k-skill 레지스트리" }])
  }, [setBreadcrumbs])

  const { data: apiSkills, isLoading } = useQuery({
    queryKey: queryKeys.skills.all,
    queryFn: () => skillsApi.list(),
    retry: false,
  })

  useEffect(() => {
    if ((apiSkills as Skill[] | undefined)?.length) {
      const normalized = (apiSkills as any[]).map(normalizeSkill)
      setLocalSkills(normalized)
      setConfigDrafts((prev) => {
        const next = { ...prev }
        for (const skill of normalized) {
          if (!next[skill.slug]) {
            next[skill.slug] = JSON.stringify(skill.config ?? {}, null, 2)
          }
        }
        return next
      })
      return
    }

    setConfigDrafts((prev) => {
      const next = { ...prev }
      for (const skill of FALLBACK_SKILLS) {
        if (!next[skill.slug]) {
          next[skill.slug] = JSON.stringify(skill.config ?? {}, null, 2)
        }
      }
      return next
    })
  }, [apiSkills])

  const detailSkill = localSkills.find((skill) => skill.slug === detailSkillSlug) ?? null

  const { data: agentsData = [] } = useQuery({
    queryKey: queryKeys.agents.list(selectedOrgId ?? ""),
    queryFn: () => agentsApi.list(selectedOrgId!),
    enabled: Boolean(selectedOrgId && detailSkillSlug),
    retry: false,
  })

  const equippedAgents = useMemo(() => {
    if (!detailSkill) return []

    const apiAgents = (agentsData as AgentRecord[]).filter((agent) =>
      extractAgentSkillSlugs(agent).includes(detailSkill.slug)
    )
    const mockedAgentIds = new Set(mockEquippedAgentsBySkill[detailSkill.slug] ?? [])
    const merged = [...apiAgents]

    for (const agent of agentsData as AgentRecord[]) {
      if (!mockedAgentIds.has(agent.id)) continue
      if (!merged.find((existing) => existing.id === agent.id)) {
        merged.push(agent)
      }
    }

    return merged
  }, [agentsData, detailSkill, mockEquippedAgentsBySkill])

  const filteredSkills = localSkills.filter((skill) => skillMatchesFilter(skill, activeFilter))
  const installedCount = localSkills.filter((skill) => skill.installed).length

  const updateSkill = (slug: string, updater: (skill: Skill) => Skill) => {
    setLocalSkills((prev) => prev.map((skill) => (skill.slug === slug ? updater(skill) : skill)))
  }

  const withSkillLoading = async (slug: string, action: () => Promise<void>) => {
    setLoadingMap((prev) => ({ ...prev, [slug]: true }))
    try {
      await action()
    } finally {
      setLoadingMap((prev) => ({ ...prev, [slug]: false }))
    }
  }

  const handleInstall = async (skill: Skill) => {
    updateSkill(skill.slug, (current) => ({ ...current, installed: true }))

    await withSkillLoading(skill.slug, async () => {
      try {
        await api.post(`/skills/${skill.slug}/install`, {
          organizationId: selectedOrgId ?? undefined,
        })
        addToast(`${skill.name} 설치를 요청했습니다.`, "success")
      } catch {
        await delay(500)
        addToast(`${skill.name} 설치를 mock 상태로 반영했습니다.`, "info")
      }
    })
  }

  const handleRemove = async (skill: Skill) => {
    updateSkill(skill.slug, (current) => ({ ...current, installed: false }))

    await withSkillLoading(skill.slug, async () => {
      try {
        await api.delete(`/skills/${skill.slug}`)
        addToast(`${skill.name} 제거를 요청했습니다.`, "success")
      } catch {
        await delay(500)
        addToast(`${skill.name} 제거를 mock 상태로 반영했습니다.`, "info")
      }
    })
  }

  const handleEquip = async () => {
    if (!detailSkill || !equipTargetAgentId) return

    const targetAgent = (agentsData as AgentRecord[]).find((agent) => agent.id === equipTargetAgentId)
    if (!targetAgent) return

    setIsSubmittingEquip(true)
    try {
      const existingSkills = extractAgentSkillSlugs(targetAgent)
      if (!existingSkills.includes(detailSkill.slug)) {
        try {
          await api.patch(`/agents/${targetAgent.id}`, {
            skills: [...existingSkills, detailSkill.slug],
          })
        } catch {
          await delay(500)
        }
      }

      setMockEquippedAgentsBySkill((prev) => {
        const prevIds = new Set(prev[detailSkill.slug] ?? [])
        prevIds.add(targetAgent.id)
        return { ...prev, [detailSkill.slug]: Array.from(prevIds) }
      })
      updateSkill(detailSkill.slug, (skill) => ({
        ...skill,
        installed: true,
        equippedAgents: Math.max(skill.equippedAgents ?? 0, equippedAgents.length + 1),
      }))
      addToast(`${targetAgent.name ?? "에이전트"}에 ${detailSkill.name}을 장착했습니다.`, "success")
      setEquipTargetAgentId("")
    } finally {
      setIsSubmittingEquip(false)
    }
  }

  const handleCreateSkill = async () => {
    if (!newSkill.slug.trim() || !newSkill.name.trim()) return

    const createdSkill: Skill = {
      slug: newSkill.slug.trim(),
      name: newSkill.name.trim(),
      description: newSkill.description.trim() || "설명이 없습니다.",
      version: newSkill.version.trim() || "1.0.0",
      type: newSkill.type === "외부 MCP" ? "external_mcp" : "builtin",
      installed: false,
      equippedAgents: 0,
      config: {},
    }

    setLocalSkills((prev) => [createdSkill, ...prev.filter((skill) => skill.slug !== createdSkill.slug)])
    setConfigDrafts((prev) => ({
      ...prev,
      [createdSkill.slug]: JSON.stringify({}, null, 2),
    }))

    try {
      await api.post("/skills", createdSkill)
      addToast(`${createdSkill.name}을 추가했습니다.`, "success")
    } catch {
      await delay(500)
      addToast(`${createdSkill.name}을 local mock으로 추가했습니다.`, "info")
    }

    setShowAddDialog(false)
    setNewSkill({
      slug: "",
      name: "",
      description: "",
      type: "내장",
      version: "1.0.0",
    })
  }

  useEffect(() => {
    if (detailSkill) {
      setAdvancedOpen(false)
    }
  }, [detailSkill])

  return (
    <ScrollArea className="h-full">
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
              k-skill 레지스트리
            </h1>
            <p className="text-sm mt-0.5" style={{ color: "var(--text-tertiary)" }}>
              {installedCount}/{localSkills.length} 설치됨
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isLoading && (
              <Loader2 size={18} className="animate-spin" style={{ color: "var(--text-tertiary)" }} />
            )}
            <Button
              size="sm"
              className="border-0 text-white text-xs gap-1"
              style={{ backgroundColor: "var(--color-teal-500)" }}
              onClick={() => setShowAddDialog(true)}
            >
              <Plus size={14} />
              스킬 추가
            </Button>
          </div>
        </div>

        <div className="flex gap-2 mb-5 flex-wrap">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              className="px-3 py-1 rounded-full text-xs font-medium transition-colors"
              style={
                filter === activeFilter
                  ? { backgroundColor: "var(--color-teal-500)", color: "#fff" }
                  : { backgroundColor: "var(--bg-tertiary)", color: "var(--text-secondary)" }
              }
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
        >
          {filteredSkills.map((skill) => (
            <SkillCard
              key={skill.slug}
              skill={skill}
              isLoading={Boolean(loadingMap[skill.slug])}
              onOpenDetail={() => setDetailSkillSlug(skill.slug)}
              onInstall={() => void handleInstall(skill)}
              onRemove={() => void handleRemove(skill)}
            />
          ))}
        </div>
      </div>

      <Dialog open={Boolean(detailSkill)} onOpenChange={(open) => !open && setDetailSkillSlug(null)}>
        <DialogContent
          style={{
            backgroundColor: "var(--bg-base)",
            border: "1px solid var(--border-default)",
          }}
        >
          {detailSkill && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <DialogTitle style={{ color: "var(--text-primary)" }}>{detailSkill.name}</DialogTitle>
                    <p className="text-xs mt-1" style={{ color: "var(--text-tertiary)" }}>
                      v{detailSkill.version}
                    </p>
                  </div>
                  <TypeBadge type={detailSkill.type} />
                </div>
              </DialogHeader>

              <div className="flex flex-col gap-4 mt-3">
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {detailSkill.description}
                </p>

                <div
                  className="rounded-xl p-4"
                  style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-default)" }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Bot size={14} style={{ color: "var(--text-tertiary)" }} />
                    <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                      이 스킬을 장착한 에이전트
                    </p>
                  </div>
                  {equippedAgents.length > 0 ? (
                    <div className="flex gap-1.5 flex-wrap">
                      {equippedAgents.map((agent) => (
                        <Badge
                          key={agent.id}
                          className="text-xs border-0 px-2 py-0.5"
                          style={{ backgroundColor: "var(--bg-tertiary)", color: "var(--text-secondary)" }}
                        >
                          {agent.name ?? agent.id}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                      아직 장착한 에이전트가 없습니다.
                    </p>
                  )}
                </div>

                <div
                  className="rounded-xl p-4"
                  style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-default)" }}
                >
                  <button
                    className="w-full flex items-center justify-between text-left"
                    onClick={() => setAdvancedOpen((prev) => !prev)}
                  >
                    <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                      고급 설정
                    </span>
                    <ChevronDown
                      size={14}
                      style={{
                        color: "var(--text-tertiary)",
                        transform: advancedOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                      }}
                    />
                  </button>
                  {advancedOpen && (
                    <Textarea
                      className="mt-3 text-xs font-mono"
                      value={configDrafts[detailSkill.slug] ?? JSON.stringify(detailSkill.config ?? {}, null, 2)}
                      onChange={(event) =>
                        setConfigDrafts((prev) => ({
                          ...prev,
                          [detailSkill.slug]: event.target.value,
                        }))
                      }
                      rows={10}
                      style={{
                        backgroundColor: "var(--bg-base)",
                        borderColor: "var(--border-default)",
                        color: "var(--text-primary)",
                        resize: "vertical",
                      }}
                    />
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  <Select value={equipTargetAgentId} onValueChange={setEquipTargetAgentId}>
                    <SelectTrigger
                      style={{
                        backgroundColor: "var(--bg-elevated)",
                        borderColor: "var(--border-default)",
                        color: equipTargetAgentId ? "var(--text-primary)" : "var(--text-tertiary)",
                      }}
                    >
                      <SelectValue placeholder="에이전트 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {(agentsData as AgentRecord[]).map((agent) => (
                        <SelectItem key={agent.id} value={agent.id}>
                          {agent.name ?? agent.id}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button
                    className="border-0 text-white"
                    style={{ backgroundColor: "var(--color-teal-500)" }}
                    disabled={!equipTargetAgentId || isSubmittingEquip}
                    onClick={() => void handleEquip()}
                  >
                    {isSubmittingEquip && <Loader2 size={14} className="animate-spin" />}
                    이 스킬 에이전트에 장착하기
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent
          style={{
            backgroundColor: "var(--bg-base)",
            border: "1px solid var(--border-default)",
          }}
        >
          <DialogHeader>
            <DialogTitle style={{ color: "var(--text-primary)" }}>스킬 추가</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-3 mt-2">
            <Input
              placeholder="slug"
              value={newSkill.slug}
              onChange={(event) => setNewSkill((prev) => ({ ...prev, slug: event.target.value }))}
              style={{ backgroundColor: "var(--bg-elevated)", borderColor: "var(--border-default)", color: "var(--text-primary)" }}
            />
            <Input
              placeholder="이름"
              value={newSkill.name}
              onChange={(event) => setNewSkill((prev) => ({ ...prev, name: event.target.value }))}
              style={{ backgroundColor: "var(--bg-elevated)", borderColor: "var(--border-default)", color: "var(--text-primary)" }}
            />
            <Textarea
              placeholder="설명"
              value={newSkill.description}
              onChange={(event) => setNewSkill((prev) => ({ ...prev, description: event.target.value }))}
              rows={4}
              style={{ backgroundColor: "var(--bg-elevated)", borderColor: "var(--border-default)", color: "var(--text-primary)", resize: "vertical" }}
            />
            <Select
              value={newSkill.type}
              onValueChange={(value: "내장" | "외부 MCP") => setNewSkill((prev) => ({ ...prev, type: value }))}
            >
              <SelectTrigger
                style={{ backgroundColor: "var(--bg-elevated)", borderColor: "var(--border-default)", color: "var(--text-primary)" }}
              >
                <SelectValue placeholder="타입 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="내장">내장</SelectItem>
                <SelectItem value="외부 MCP">외부 MCP</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="version"
              value={newSkill.version}
              onChange={(event) => setNewSkill((prev) => ({ ...prev, version: event.target.value }))}
              style={{ backgroundColor: "var(--bg-elevated)", borderColor: "var(--border-default)", color: "var(--text-primary)" }}
            />

            <div className="flex justify-end gap-2 mt-1">
              <Button variant="ghost" size="sm" onClick={() => setShowAddDialog(false)}>
                취소
              </Button>
              <Button
                size="sm"
                className="border-0 text-white"
                style={{ backgroundColor: "var(--color-teal-500)" }}
                disabled={!newSkill.slug.trim() || !newSkill.name.trim()}
                onClick={() => void handleCreateSkill()}
              >
                저장
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </ScrollArea>
  )
}
