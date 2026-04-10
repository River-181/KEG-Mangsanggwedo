import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useBreadcrumbs } from "@/context/BreadcrumbContext"

export function ApprovalDetailPage() {
  const { setBreadcrumbs } = useBreadcrumbs()
  const { orgPrefix, id } = useParams<{ orgPrefix: string; id: string }>()

  useEffect(() => {
    setBreadcrumbs([
      { label: "승인 큐", href: `/${orgPrefix}/approvals` },
      { label: `승인 ${id}` },
    ])
  }, [setBreadcrumbs, orgPrefix, id])

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1
        className="text-2xl font-bold mb-2"
        style={{ color: "var(--text-primary)" }}
      >
        승인 상세
      </h1>
      <p className="text-sm mb-6" style={{ color: "var(--text-tertiary)" }}>
        승인 ID: {id}
      </p>

      <div
        className="rounded-xl p-6 mb-4"
        style={{
          backgroundColor: "var(--bg-elevated)",
          border: "1px solid var(--border-default)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <p className="text-sm mb-6" style={{ color: "var(--text-tertiary)" }}>
          에이전트가 요청한 작업 내용이 여기에 표시됩니다. (Phase 2에서 구현 예정)
        </p>

        <div className="flex gap-3">
          <button
            className="flex-1 py-2 rounded-lg text-sm font-semibold transition-colors"
            style={{ background: "var(--color-success)", color: "#fff" }}
          >
            승인
          </button>
          <button
            className="flex-1 py-2 rounded-lg text-sm font-semibold transition-colors"
            style={{ background: "var(--color-danger)", color: "#fff" }}
          >
            거절
          </button>
        </div>
      </div>
    </div>
  )
}
