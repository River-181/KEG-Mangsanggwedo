import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { useBreadcrumbs } from "@/context/BreadcrumbContext"
import { useOrganization } from "@/context/OrganizationContext"
import { orchestratorApi } from "@/api/orchestrator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CheckCircle, Building2, Bot, ClipboardList, Rocket, Loader2, Sparkles, Shield, Heart, Calendar, Zap } from "lucide-react"

const STEPS = [
  { id: "company", label: "기관", icon: <Building2 size={14} /> },
  { id: "agent", label: "에이전트", icon: <Bot size={14} /> },
  { id: "task", label: "첫 업무", icon: <ClipboardList size={14} /> },
  { id: "launch", label: "시작", icon: <Rocket size={14} /> },
]

const AGENT_PRESETS = [
  {
    id: "complaint",
    name: "민원담당",
    subtitle: "Complaint Agent",
    description: "학부모 민원 분류 + 응답 초안 생성",
    icon: <Shield size={18} style={{ color: "#ef4444" }} />,
    skills: ["complaint-classifier", "korean-tone-guide"],
  },
  {
    id: "retention",
    name: "이탈방어",
    subtitle: "Retention Agent",
    description: "이탈 위험 학생 감지 + 상담 권고",
    icon: <Heart size={18} style={{ color: "#f59e0b" }} />,
    skills: ["churn-risk-calculator", "korean-tone-guide"],
  },
  {
    id: "scheduler",
    name: "스케줄러",
    subtitle: "Scheduler Agent",
    description: "수업 일정 관리 + 강사 대타 조율",
    icon: <Calendar size={18} style={{ color: "#3b82f6" }} />,
    skills: ["google-calendar-mcp"],
  },
]

type LaunchPhase = "idle" | "dispatching" | "agents-running" | "complete" | "error"

const LAUNCH_MESSAGES: Record<string, string[]> = {
  dispatching: [
    "오케스트레이터에게 첫 업무를 전달하고 있습니다...",
    "에이전트 팀을 깨우고 있습니다...",
  ],
  "agents-running": [
    "에이전트가 업무를 분석하고 있습니다...",
    "민원 케이스를 분류하는 중...",
    "이탈 위험 학생을 점검하는 중...",
    "결과를 정리하고 승인 요청을 준비합니다...",
  ],
  complete: ["에이전트 팀이 첫 번째 업무를 완료했습니다!"],
}

export function OnboardingPage() {
  const { setBreadcrumbs } = useBreadcrumbs()
  const { orgPrefix } = useParams<{ orgPrefix: string }>()
  const { selectedOrgId } = useOrganization()
  const navigate = useNavigate()

  const [activeStep, setActiveStep] = useState("company")
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())

  const [orgName, setOrgName] = useState("탄자니아 영어학원")
  const [orgDesc, setOrgDesc] = useState("대치동 영어 전문 학원. 수준별 맞춤 교육으로 입시 영어부터 회화까지 책임집니다.")
  const [selectedAgents, setSelectedAgents] = useState<Set<string>>(
    new Set(["complaint", "retention", "scheduler"])
  )
  const [firstTask, setFirstTask] = useState("오늘 들어온 민원 정리하고 이탈 위험 학생 알려줘")

  // Launch state
  const [launchPhase, setLaunchPhase] = useState<LaunchPhase>("idle")
  const [launchMsg, setLaunchMsg] = useState("")
  const [dispatchResult, setDispatchResult] = useState<{ plan: string; runs: string[] } | null>(null)

  const dispatchMutation = useMutation({
    mutationFn: () => {
      if (!selectedOrgId) throw new Error("No org selected")
      return orchestratorApi.dispatch({
        instruction: firstTask,
        organizationId: selectedOrgId,
      })
    },
    onMutate: () => {
      setLaunchPhase("dispatching")
      setLaunchMsg(LAUNCH_MESSAGES.dispatching[0])
    },
    onSuccess: (data) => {
      setDispatchResult(data)
      setLaunchPhase("agents-running")
      // Simulate agent progress messages
      const msgs = LAUNCH_MESSAGES["agents-running"]
      let i = 0
      const interval = setInterval(() => {
        i++
        if (i < msgs.length) {
          setLaunchMsg(msgs[i])
        } else {
          clearInterval(interval)
          setLaunchPhase("complete")
          setLaunchMsg(LAUNCH_MESSAGES.complete[0])
        }
      }, 1500)
    },
    onError: () => {
      setLaunchPhase("error")
      setLaunchMsg("에이전트 실행 중 문제가 발생했습니다. 다시 시도해 주세요.")
    },
  })

  useEffect(() => {
    setBreadcrumbs([{ label: "온보딩" }])
  }, [setBreadcrumbs])

  const stepIndex = STEPS.findIndex((s) => s.id === activeStep)

  const markComplete = (stepId: string) => {
    setCompletedSteps((prev) => new Set([...prev, stepId]))
  }

  const goNext = () => {
    markComplete(activeStep)
    const next = STEPS[stepIndex + 1]
    if (next) setActiveStep(next.id)
  }

  const goPrev = () => {
    const prev = STEPS[stepIndex - 1]
    if (prev) setActiveStep(prev.id)
  }

  const handleTabClick = (stepId: string) => {
    const targetIndex = STEPS.findIndex((s) => s.id === stepId)
    const canNavigate =
      targetIndex === 0 ||
      completedSteps.has(STEPS[targetIndex - 1].id)
    if (canNavigate) setActiveStep(stepId)
  }

  const toggleAgent = (id: string) => {
    setSelectedAgents((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
        온보딩
      </h1>
      <p className="text-sm mb-8" style={{ color: "var(--text-secondary)" }}>
        HagentOS 설정을 완료하고 AI 에이전트를 시작하세요.
      </p>

      <Tabs value={activeStep} onValueChange={() => {}}>
        <TabsList className="w-full mb-6 grid grid-cols-4">
          {STEPS.map((step) => {
            const idx = STEPS.findIndex((s) => s.id === step.id)
            const canClick =
              idx === 0 || completedSteps.has(STEPS[idx - 1].id)
            return (
              <TabsTrigger
                key={step.id}
                value={step.id}
                disabled={!canClick}
                onClick={() => handleTabClick(step.id)}
                className="flex items-center gap-1.5 text-xs"
              >
                {completedSteps.has(step.id) ? (
                  <CheckCircle size={13} className="text-teal-500" />
                ) : (
                  step.icon
                )}
                {step.label}
              </TabsTrigger>
            )
          })}
        </TabsList>

        {/* Step 1: 기관 정보 */}
        <TabsContent value="company">
          <div
            className="rounded-xl p-6"
            style={{
              backgroundColor: "var(--bg-elevated)",
              border: "1px solid var(--border-default)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">🏫</span>
              <h2 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                학원 정보를 입력해 주세요
              </h2>
            </div>
            <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
              학원 이름과 간단한 설명을 적어주세요.
            </p>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
                  학원 이름
                </label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none transition-colors"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    border: "1px solid var(--border-default)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
                  학원 소개 / 운영 목표
                </label>
                <textarea
                  value={orgDesc}
                  onChange={(e) => setOrgDesc(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none transition-colors"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    border: "1px solid var(--border-default)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={goNext}
                disabled={!orgName.trim()}
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-opacity disabled:opacity-40"
                style={{ background: "var(--color-teal-500)", color: "#fff" }}
              >
                다음 →
              </button>
            </div>
          </div>
        </TabsContent>

        {/* Step 2: 에이전트 팀 구성 */}
        <TabsContent value="agent">
          <div
            className="rounded-xl p-6"
            style={{
              backgroundColor: "var(--bg-elevated)",
              border: "1px solid var(--border-default)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">🤖</span>
              <h2 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                AI 에이전트 팀을 구성합니다
              </h2>
            </div>
            <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
              학원에 맞는 에이전트를 추천해 드립니다.
            </p>

            <p className="text-xs font-semibold mb-2" style={{ color: "var(--text-tertiary)" }}>
              추천 에이전트 팀
            </p>
            <div className="flex flex-col divide-y rounded-xl overflow-hidden" style={{ border: "1px solid var(--border-default)" }}>
              {AGENT_PRESETS.map((agent) => {
                const checked = selectedAgents.has(agent.id)
                return (
                  <button
                    key={agent.id}
                    onClick={() => toggleAgent(agent.id)}
                    className="flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-[var(--bg-secondary)]"
                    style={{ backgroundColor: "var(--bg-elevated)" }}
                  >
                    <div
                      className="w-5 h-5 rounded flex items-center justify-center shrink-0 transition-colors"
                      style={{
                        backgroundColor: checked ? "var(--color-teal-500)" : "transparent",
                        border: checked ? "none" : "2px solid var(--border-default)",
                      }}
                    >
                      {checked && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: checked ? "rgba(20,184,166,0.1)" : "var(--bg-tertiary)" }}
                    >
                      {agent.icon}
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                        {agent.name}
                      </span>
                      <span className="text-xs ml-2" style={{ color: "var(--text-tertiary)" }}>
                        ({agent.subtitle})
                      </span>
                      <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
                        {agent.description}
                      </p>
                      <div className="flex gap-1 mt-1">
                        {agent.skills.map((s) => (
                          <span
                            key={s}
                            className="text-[10px] px-1.5 py-0.5 rounded"
                            style={{ backgroundColor: "var(--bg-tertiary)", color: "var(--text-tertiary)" }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={goPrev}
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-colors hover:bg-[var(--bg-secondary)]"
                style={{ color: "var(--text-secondary)", border: "1px solid var(--border-default)" }}
              >
                ← 이전
              </button>
              <button
                onClick={goNext}
                disabled={selectedAgents.size === 0}
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-opacity disabled:opacity-40"
                style={{ background: "var(--color-teal-500)", color: "#fff" }}
              >
                다음 →
              </button>
            </div>
          </div>
        </TabsContent>

        {/* Step 3: 첫 업무 등록 */}
        <TabsContent value="task">
          <div
            className="rounded-xl p-6"
            style={{
              backgroundColor: "var(--bg-elevated)",
              border: "1px solid var(--border-default)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">📋</span>
              <h2 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                첫 업무를 등록해 보세요
              </h2>
            </div>
            <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
              에이전트에게 시킬 첫 번째 일을 적어주세요.
            </p>

            <textarea
              value={firstTask}
              onChange={(e) => setFirstTask(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none transition-colors"
              placeholder="예: 오늘 들어온 민원 정리하고 이탈 위험 학생 알려줘"
              style={{
                backgroundColor: "var(--bg-secondary)",
                border: "1px solid var(--border-default)",
                color: "var(--text-primary)",
              }}
            />

            <div className="flex justify-between mt-6">
              <button
                onClick={goPrev}
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-colors hover:bg-[var(--bg-secondary)]"
                style={{ color: "var(--text-secondary)", border: "1px solid var(--border-default)" }}
              >
                ← 이전
              </button>
              <button
                onClick={goNext}
                className="px-4 py-2 rounded-lg text-sm font-semibold"
                style={{ background: "var(--color-teal-500)", color: "#fff" }}
              >
                다음 →
              </button>
            </div>
          </div>
        </TabsContent>

        {/* Step 4: 시작 — 실제 에이전트 실행 */}
        <TabsContent value="launch">
          <div
            className="rounded-xl p-6"
            style={{
              backgroundColor: "var(--bg-elevated)",
              border: "1px solid var(--border-default)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            {launchPhase === "idle" && (
              <>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">🚀</span>
                  <h2 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                    준비 완료! AI 팀을 시작합니다
                  </h2>
                </div>
                <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
                  아래 버튼을 누르면 {orgName}의 에이전트 팀이 첫 업무를 시작합니다.
                </p>

                {/* 요약 카드 */}
                <div
                  className="rounded-xl p-4 mb-6 space-y-3"
                  style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-default)" }}
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle size={16} style={{ color: "var(--color-success)" }} />
                    <span className="text-sm" style={{ color: "var(--text-primary)" }}>
                      <strong>{orgName}</strong> 등록 완료
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle size={16} style={{ color: "var(--color-success)" }} />
                    <div className="flex-1">
                      <span className="text-sm" style={{ color: "var(--text-primary)" }}>
                        에이전트 {selectedAgents.size}개 활성화
                      </span>
                      <div className="flex gap-2 mt-1.5">
                        {AGENT_PRESETS.filter((a) => selectedAgents.has(a.id)).map((a) => (
                          <span
                            key={a.id}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                            style={{ backgroundColor: "var(--bg-tertiary)", color: "var(--text-secondary)" }}
                          >
                            {a.icon} {a.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap size={16} style={{ color: "var(--color-teal-500)" }} className="mt-0.5 shrink-0" />
                    <div>
                      <span className="text-sm" style={{ color: "var(--text-primary)" }}>첫 업무</span>
                      <p
                        className="text-xs mt-0.5 px-2.5 py-1.5 rounded-lg"
                        style={{ backgroundColor: "rgba(20,184,166,0.06)", color: "var(--text-secondary)" }}
                      >
                        "{firstTask}"
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={goPrev}
                    className="px-4 py-2 rounded-lg text-sm font-semibold transition-colors hover:bg-[var(--bg-secondary)]"
                    style={{ color: "var(--text-secondary)", border: "1px solid var(--border-default)" }}
                  >
                    ← 이전
                  </button>
                  <button
                    onClick={() => dispatchMutation.mutate()}
                    className="px-6 py-2.5 rounded-lg text-sm font-bold gap-2 inline-flex items-center"
                    style={{ background: "linear-gradient(135deg, #0ea5b0, #0d9488)", color: "#fff", boxShadow: "0 2px 8px rgba(14,165,176,0.3)" }}
                  >
                    <Sparkles size={15} />
                    에이전트 팀 시작하기
                  </button>
                </div>
              </>
            )}

            {(launchPhase === "dispatching" || launchPhase === "agents-running") && (
              <div className="flex flex-col items-center py-8">
                {/* Pulsing agent ring */}
                <div className="relative mb-8">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "rgba(20,184,166,0.1)", border: "2px solid var(--color-teal-500)" }}
                  >
                    <Bot size={32} style={{ color: "var(--color-teal-500)" }} />
                  </div>
                  <div
                    className="absolute inset-0 rounded-full animate-ping"
                    style={{ backgroundColor: "rgba(20,184,166,0.15)" }}
                  />
                </div>

                <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                  {launchPhase === "dispatching" ? "오케스트레이터 가동 중..." : "에이전트 팀 실행 중..."}
                </h2>

                <p
                  className="text-sm text-center mb-6 transition-opacity duration-500"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {launchMsg}
                </p>

                {/* Progress dots */}
                <div className="flex gap-1.5 mb-6">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{
                        backgroundColor: "var(--color-teal-500)",
                        animationDelay: `${i * 300}ms`,
                      }}
                    />
                  ))}
                </div>

                {/* Active agent cards */}
                <div className="flex gap-2">
                  {AGENT_PRESETS.filter((a) => selectedAgents.has(a.id)).map((a) => (
                    <div
                      key={a.id}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: "rgba(20,184,166,0.08)",
                        color: "var(--color-teal-500)",
                        border: "1px solid rgba(20,184,166,0.2)",
                      }}
                    >
                      <Loader2 size={10} className="animate-spin" />
                      {a.name}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {launchPhase === "complete" && (
              <div className="flex flex-col items-center py-8">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: "rgba(16,185,129,0.1)", border: "2px solid var(--color-success)" }}
                >
                  <CheckCircle size={36} style={{ color: "var(--color-success)" }} />
                </div>

                <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                  {orgName}의 AI 팀이 가동되었습니다!
                </h2>

                <p className="text-sm mb-2 text-center" style={{ color: "var(--text-secondary)" }}>
                  {dispatchResult?.runs?.length ?? 0}개의 에이전트 실행이 완료되었습니다.
                </p>

                {dispatchResult?.plan && (
                  <div
                    className="rounded-xl px-4 py-3 text-xs mb-6 max-w-md text-center"
                    style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-secondary)" }}
                  >
                    {dispatchResult.plan}
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/${orgPrefix}/cases`)}
                    className="px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                    style={{ color: "var(--text-secondary)", border: "1px solid var(--border-default)" }}
                  >
                    케이스 확인
                  </button>
                  <button
                    onClick={() => navigate(`/${orgPrefix}/dashboard`)}
                    className="px-6 py-2.5 rounded-lg text-sm font-bold inline-flex items-center gap-2"
                    style={{ background: "var(--color-teal-500)", color: "#fff" }}
                  >
                    <Rocket size={15} />
                    대시보드로 이동
                  </button>
                </div>
              </div>
            )}

            {launchPhase === "error" && (
              <div className="flex flex-col items-center py-8">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: "rgba(239,68,68,0.1)" }}
                >
                  <span className="text-2xl">⚠️</span>
                </div>
                <p className="text-sm mb-4" style={{ color: "var(--color-danger)" }}>
                  {launchMsg}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => { setLaunchPhase("idle"); setLaunchMsg("") }}
                    className="px-4 py-2 rounded-lg text-sm font-semibold"
                    style={{ color: "var(--text-secondary)", border: "1px solid var(--border-default)" }}
                  >
                    다시 시도
                  </button>
                  <button
                    onClick={() => navigate(`/${orgPrefix}/dashboard`)}
                    className="px-4 py-2 rounded-lg text-sm font-semibold"
                    style={{ background: "var(--color-teal-500)", color: "#fff" }}
                  >
                    대시보드로 이동
                  </button>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
