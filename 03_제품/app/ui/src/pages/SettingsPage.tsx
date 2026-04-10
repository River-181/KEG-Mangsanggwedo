import { useEffect, useState } from "react"
import { useBreadcrumbs } from "@/context/BreadcrumbContext"
import { Separator } from "@/components/ui/separator"
import { Building2, Bot, Bell, AlertTriangle } from "lucide-react"

function SectionTitle({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span style={{ color: "var(--color-teal-500)" }}>{icon}</span>
      <h2 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
        {label}
      </h2>
    </div>
  )
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
      {children}
    </label>
  )
}

function ReadonlyBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="text-xs px-2 py-0.5 rounded ml-2"
      style={{
        backgroundColor: "var(--bg-tertiary)",
        color: "var(--text-tertiary)",
        border: "1px solid var(--border-default)",
      }}
    >
      {children}
    </span>
  )
}

interface ToggleRowProps {
  label: string
  description?: string
  value: boolean
  onChange: (v: boolean) => void
}

function ToggleRow({ label, description, value, onChange }: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <p className="text-sm" style={{ color: "var(--text-primary)" }}>
          {label}
        </p>
        {description && (
          <p className="text-xs mt-0.5" style={{ color: "var(--text-tertiary)" }}>
            {description}
          </p>
        )}
      </div>
      <button
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors shrink-0"
        style={{
          backgroundColor: value ? "var(--color-teal-500)" : "var(--border-default)",
        }}
      >
        <span
          className="inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform"
          style={{ transform: value ? "translateX(18px)" : "translateX(2px)" }}
        />
      </button>
    </div>
  )
}

export function SettingsPage() {
  const { setBreadcrumbs } = useBreadcrumbs()

  const [orgName] = useState("탄자니아 영어학원")
  const [orgDesc] = useState("대치동 영어 전문 학원. 수준별 맞춤 교육으로 입시 영어부터 회화까지 책임집니다.")

  const [autoApproveLevel, setAutoApproveLevel] = useState("1")
  const [tokenLimit, setTokenLimit] = useState("500000")
  const [heartbeat] = useState("매일 07:00")

  const [notifyAgentDone, setNotifyAgentDone] = useState(true)
  const [notifyApproval, setNotifyApproval] = useState(true)
  const [notifyRisk, setNotifyRisk] = useState(true)

  useEffect(() => {
    setBreadcrumbs([{ label: "설정" }])
  }, [setBreadcrumbs])

  const cardStyle = {
    backgroundColor: "var(--bg-elevated)",
    border: "1px solid var(--border-default)",
    boxShadow: "var(--shadow-sm)",
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
        설정
      </h1>
      <p className="text-sm mb-8" style={{ color: "var(--text-secondary)" }}>
        기관 정보 및 AI 정책을 관리합니다.
      </p>

      <div className="flex flex-col gap-6">
        {/* 기관 정보 */}
        <div className="rounded-xl p-5" style={cardStyle}>
          <SectionTitle icon={<Building2 size={16} />} label="기관 정보" />

          <div className="flex flex-col gap-4">
            <div>
              <FieldLabel>학원 이름</FieldLabel>
              <input
                type="text"
                defaultValue={orgName}
                disabled
                className="w-full px-3 py-2 rounded-lg text-sm"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  border: "1px solid var(--border-default)",
                  color: "var(--text-primary)",
                  opacity: 0.7,
                  cursor: "not-allowed",
                }}
              />
            </div>

            <div>
              <FieldLabel>학원 소개</FieldLabel>
              <textarea
                defaultValue={orgDesc}
                disabled
                rows={3}
                className="w-full px-3 py-2 rounded-lg text-sm resize-none"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  border: "1px solid var(--border-default)",
                  color: "var(--text-primary)",
                  opacity: 0.7,
                  cursor: "not-allowed",
                }}
              />
            </div>

            <div>
              <FieldLabel>
                Prefix
                <ReadonlyBadge>읽기 전용</ReadonlyBadge>
              </FieldLabel>
              <input
                type="text"
                value="tanzania"
                readOnly
                className="w-full px-3 py-2 rounded-lg text-sm font-mono"
                style={{
                  backgroundColor: "var(--bg-tertiary)",
                  border: "1px solid var(--border-default)",
                  color: "var(--text-tertiary)",
                  cursor: "not-allowed",
                }}
              />
            </div>
          </div>
        </div>

        {/* AI 정책 */}
        <div className="rounded-xl p-5" style={cardStyle}>
          <SectionTitle icon={<Bot size={16} />} label="AI 정책" />

          <div className="flex flex-col gap-4">
            <div>
              <FieldLabel>자동 승인 레벨</FieldLabel>
              <select
                value={autoApproveLevel}
                onChange={(e) => setAutoApproveLevel(e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-sm"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  border: "1px solid var(--border-default)",
                  color: "var(--text-primary)",
                }}
              >
                <option value="0">0 — 모든 작업 수동 승인</option>
                <option value="1">1 — 저위험 작업 자동 승인</option>
                <option value="2">2 — 중위험 작업 자동 승인</option>
                <option value="3">3 — 고위험 작업 자동 승인</option>
                <option value="4">4 — 전체 자동 승인</option>
              </select>
            </div>

            <div>
              <FieldLabel>월간 토큰 한도</FieldLabel>
              <input
                type="number"
                value={tokenLimit}
                onChange={(e) => setTokenLimit(e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-sm"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  border: "1px solid var(--border-default)",
                  color: "var(--text-primary)",
                }}
              />
            </div>

            <div>
              <FieldLabel>
                Heartbeat 스케줄
                <ReadonlyBadge>데모 고정</ReadonlyBadge>
              </FieldLabel>
              <input
                type="text"
                value={heartbeat}
                readOnly
                className="w-full px-3 py-2 rounded-lg text-sm"
                style={{
                  backgroundColor: "var(--bg-tertiary)",
                  border: "1px solid var(--border-default)",
                  color: "var(--text-secondary)",
                  cursor: "not-allowed",
                }}
              />
            </div>
          </div>
        </div>

        {/* 알림 설정 */}
        <div className="rounded-xl p-5" style={cardStyle}>
          <SectionTitle icon={<Bell size={16} />} label="알림 설정" />

          <div className="flex flex-col">
            <ToggleRow
              label="에이전트 완료 알림"
              description="에이전트가 작업을 완료했을 때 알림"
              value={notifyAgentDone}
              onChange={setNotifyAgentDone}
            />
            <Separator style={{ backgroundColor: "var(--border-default)" }} />
            <ToggleRow
              label="승인 요청 알림"
              description="에이전트가 승인을 요청했을 때 알림"
              value={notifyApproval}
              onChange={setNotifyApproval}
            />
            <Separator style={{ backgroundColor: "var(--border-default)" }} />
            <ToggleRow
              label="이탈 위험 알림"
              description="학생 이탈 위험 점수가 임계값을 초과할 때 알림"
              value={notifyRisk}
              onChange={setNotifyRisk}
            />
          </div>
        </div>

        {/* 위험 영역 */}
        <div className="rounded-xl p-5" style={{ ...cardStyle, border: "1px solid var(--color-danger, #ef4444)" }}>
          <SectionTitle icon={<AlertTriangle size={16} />} label="위험 영역" />
          <p className="text-xs mb-4" style={{ color: "var(--text-tertiary)" }}>
            아래 작업은 되돌릴 수 없습니다. 데모 모드에서는 비활성화되어 있습니다.
          </p>
          <div className="flex gap-3">
            <button
              disabled
              className="px-4 py-2 rounded-lg text-sm font-semibold opacity-40 cursor-not-allowed"
              style={{
                border: "1px solid #ef4444",
                color: "#ef4444",
                backgroundColor: "transparent",
              }}
            >
              데이터 초기화
            </button>
            <button
              disabled
              className="px-4 py-2 rounded-lg text-sm font-semibold opacity-40 cursor-not-allowed"
              style={{
                backgroundColor: "#ef4444",
                color: "#fff",
              }}
            >
              기관 삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
