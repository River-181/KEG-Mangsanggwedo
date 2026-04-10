import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useOrganization } from "@/context/OrganizationContext"
import { api } from "@/api/client"
import { queryKeys } from "@/lib/queryKeys"
import { cn } from "@/lib/utils"
import { Plus, Loader2 } from "lucide-react"

export function OrganizationRail() {
  const { organizations, selectedOrgId, setSelectedOrgId } = useOrganization()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [showCreate, setShowCreate] = useState(false)
  const [newName, setNewName] = useState("")
  const [newDesc, setNewDesc] = useState("")

  const createMutation = useMutation({
    mutationFn: () =>
      api.post<{ id: string; prefix: string; name: string }>("/organizations", {
        name: newName.trim(),
        description: newDesc.trim() || null,
      }),
    onSuccess: (org) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.organizations.all })
      setSelectedOrgId(org.id)
      setShowCreate(false)
      setNewName("")
      setNewDesc("")
      // 새 학원의 온보딩으로 이동
      navigate(`/${org.prefix}/onboarding`)
    },
  })

  return (
    <>
      <div
        className="flex flex-col items-center gap-2 py-4"
        style={{
          width: 72,
          minHeight: "100vh",
          backgroundColor: "#0d1117",
          borderRight: "1px solid #1e242d",
        }}
      >
        {/* Logo mark */}
        <div
          className="flex items-center justify-center rounded-xl mb-2"
          style={{
            width: 40,
            height: 40,
            background: "var(--color-teal-500)",
            fontWeight: 700,
            fontSize: 16,
            color: "#fff",
            letterSpacing: "-0.5px",
          }}
        >
          H
        </div>

        {/* Org avatars */}
        <div className="flex flex-col items-center gap-2 mt-2">
          {organizations.map((org) => {
            const isSelected = org.id === selectedOrgId
            const initials = (org.name as string)
              .split("")
              .slice(0, 2)
              .join("")
            return (
              <button
                key={org.id}
                onClick={() => {
                  setSelectedOrgId(org.id)
                  navigate(`/${org.prefix}/dashboard`)
                }}
                title={org.name}
                className={cn(
                  "flex items-center justify-center rounded-xl text-xs font-semibold transition-all",
                  isSelected
                    ? "ring-2 ring-teal-500 ring-offset-2 ring-offset-[#0d1117]"
                    : "opacity-60 hover:opacity-100"
                )}
                style={{
                  width: 36,
                  height: 36,
                  background: isSelected ? "var(--color-teal-500)" : "#2c2c35",
                  color: "#fff",
                }}
              >
                {initials}
              </button>
            )
          })}

          {/* + 새 학원 추가 버튼 */}
          <button
            onClick={() => setShowCreate(true)}
            title="새 학원 추가"
            className="flex items-center justify-center rounded-xl transition-all opacity-50 hover:opacity-100 hover:scale-105"
            style={{
              width: 36,
              height: 36,
              border: "2px dashed #3e4553",
              color: "#6b7280",
            }}
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Version badge */}
        <span
          className="text-center"
          style={{
            fontSize: 9,
            color: "#4e5968",
            letterSpacing: "0.02em",
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          v0.5
        </span>
      </div>

      {/* 새 학원 생성 모달 */}
      {showCreate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={(e) => { if (e.target === e.currentTarget) setShowCreate(false) }}
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div
            className="rounded-2xl p-6 w-full max-w-md"
            style={{
              backgroundColor: "var(--bg-base)",
              border: "1px solid var(--border-default)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">🏫</span>
              <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                새 학원 추가
              </h2>
            </div>
            <p className="text-sm mb-5" style={{ color: "var(--text-secondary)" }}>
              학원을 추가하고 온보딩에서 원장 에이전트를 설정하세요.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-tertiary)" }}>
                  학원 이름 *
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="예: 탄자니아 영어학원"
                  autoFocus
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    border: "1px solid var(--border-default)",
                    color: "var(--text-primary)",
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && newName.trim()) createMutation.mutate()
                  }}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-tertiary)" }}>
                  소개 (선택)
                </label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="학원 소개, 위치, 과목 등"
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    border: "1px solid var(--border-default)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => setShowCreate(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium"
                style={{ color: "var(--text-secondary)", border: "1px solid var(--border-default)" }}
              >
                취소
              </button>
              <button
                onClick={() => createMutation.mutate()}
                disabled={!newName.trim() || createMutation.isPending}
                className="px-4 py-2 rounded-lg text-sm font-semibold inline-flex items-center gap-1.5 disabled:opacity-40"
                style={{ background: "var(--color-teal-500)", color: "#fff" }}
              >
                {createMutation.isPending ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Plus size={14} />
                )}
                학원 추가
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
