// v0.3.0
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { useBreadcrumbs } from "@/context/BreadcrumbContext"
import { useOrganization } from "@/context/OrganizationContext"
import { projectsApi } from "@/api/projects"
import { queryKeys } from "@/lib/queryKeys"
import { Button } from "@/components/ui/button"
import { FolderKanban, Plus } from "lucide-react"
import { useParams } from "react-router-dom"
import { EmptyState } from "@/components/EmptyState"

export function ProjectsPage() {
  const { setBreadcrumbs } = useBreadcrumbs()
  const { selectedOrgId } = useOrganization()
  const navigate = useNavigate()
  const { orgPrefix } = useParams<{ orgPrefix: string }>()

  useEffect(() => {
    setBreadcrumbs([{ label: "프로젝트" }])
  }, [setBreadcrumbs])

  const { data: projects = [], isLoading } = useQuery<any[]>({
    queryKey: queryKeys.projects.list(selectedOrgId ?? ""),
    queryFn: () => projectsApi.list(selectedOrgId!),
    enabled: !!selectedOrgId,
  })

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="h-8 w-48 rounded animate-pulse mb-6" style={{ background: "var(--bg-tertiary)" }} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 rounded-xl animate-pulse" style={{ background: "var(--bg-tertiary)" }} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            프로젝트
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
            {projects.length > 0
              ? `${projects.length}개의 프로젝트`
              : "프로젝트가 없습니다"}
          </p>
        </div>
        <Button
          disabled
          size="sm"
          className="flex items-center gap-2 text-sm border-0 text-white"
          style={{ background: "var(--color-teal-500)", opacity: 0.6 }}
        >
          <Plus size={14} />
          새 프로젝트
        </Button>
      </div>

      {projects.length === 0 ? (
        <div
          className="rounded-xl"
          style={{
            backgroundColor: "var(--bg-elevated)",
            border: "1px solid var(--border-default)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <EmptyState
            icon={<FolderKanban size={22} />}
            title="프로젝트가 없습니다"
            description="프로젝트를 생성하면 관련 케이스를 그룹으로 관리할 수 있습니다."
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => navigate(`/${orgPrefix}/projects/${project.id}`)}
              className="text-left rounded-xl p-5 transition-all hover:shadow-md"
              style={{
                backgroundColor: "var(--bg-elevated)",
                border: "1px solid var(--border-default)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div className="flex items-start gap-3">
                <span
                  className="w-3 h-3 rounded-full mt-1 shrink-0"
                  style={{ backgroundColor: project.color ?? "var(--color-teal-500)" }}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate" style={{ color: "var(--text-primary)" }}>
                    {project.name}
                  </h3>
                  {project.description && (
                    <p className="text-xs mt-1 line-clamp-2" style={{ color: "var(--text-secondary)" }}>
                      {project.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 mt-4">
                <div className="flex flex-col">
                  <span className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>
                    {project.caseCount ?? 0}
                  </span>
                  <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                    전체 케이스
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium" style={{ color: "#f59e0b" }}>
                    {project.activeCases ?? 0}
                  </span>
                  <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                    진행 중
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
