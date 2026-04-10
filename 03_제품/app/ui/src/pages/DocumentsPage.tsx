// v0.2.0
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useBreadcrumbs } from "@/context/BreadcrumbContext"
import { useOrganization } from "@/context/OrganizationContext"
import { documentsApi } from "@/api/documents"
import { queryKeys } from "@/lib/queryKeys"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EmptyState } from "@/components/EmptyState"
import { FileText, Plus, Loader2 } from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

type DocCategory = "all" | "policy" | "faq" | "manual" | "script" | "general"

interface Document {
  id: string
  title: string
  category: string
  body: string
  updatedAt?: string
  updated_at?: string
}

// ─── Fallback data ────────────────────────────────────────────────────────────

const FALLBACK_DOCS: Document[] = [
  {
    id: "d1",
    title: "환불 정책",
    category: "policy",
    body: "## 환불 정책\n\n수강 시작 후 7일 이내에는 전액 환불이 가능합니다.\n\n- 1개월 이내: 잔여 수업료의 2/3 환불\n- 1개월 초과: 환불 불가\n\n단, 강사 사정에 의한 수업 취소는 전액 환불됩니다.",
    updatedAt: "2026-04-01T10:00:00Z",
  },
  {
    id: "d2",
    title: "자주 묻는 질문 (FAQ)",
    category: "faq",
    body: "## FAQ\n\n**Q. 보강 수업은 어떻게 신청하나요?**\nA. 카카오톡 채널 또는 전화로 신청 가능합니다.\n\n**Q. 결석 처리는 어떻게 되나요?**\nA. 수업 2시간 전까지 연락 시 결석 처리됩니다.",
    updatedAt: "2026-03-28T09:00:00Z",
  },
  {
    id: "d3",
    title: "신규 학생 등록 매뉴얼",
    category: "manual",
    body: "## 신규 학생 등록 절차\n\n1. 상담 예약\n2. 레벨 테스트 (40분)\n3. 수업 일정 협의\n4. 수강료 결제\n5. 반 배정 및 교재 지급",
    updatedAt: "2026-03-20T14:00:00Z",
  },
  {
    id: "d4",
    title: "상담 전화 스크립트",
    category: "script",
    body: "## 인바운드 상담 스크립트\n\n**오프닝**\n'안녕하세요, 탄자니아 영어학원입니다. 어떻게 도와드릴까요?'\n\n**니즈 파악**\n- 학년 및 현재 수준 확인\n- 목표(수능, 내신, 회화 등) 확인\n- 희망 수업 시간 확인",
    updatedAt: "2026-03-15T11:00:00Z",
  },
]

// ─── Category config ──────────────────────────────────────────────────────────

const CATEGORIES: { value: DocCategory; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "policy", label: "정책" },
  { value: "faq", label: "FAQ" },
  { value: "manual", label: "매뉴얼" },
  { value: "script", label: "상담 스크립트" },
  { value: "general", label: "일반" },
]

const CATEGORY_COLORS: Record<string, { bg: string; color: string }> = {
  policy: { bg: "rgba(59,130,246,0.12)", color: "#3b82f6" },
  faq: { bg: "rgba(16,185,129,0.12)", color: "var(--color-success)" },
  manual: { bg: "rgba(168,85,247,0.12)", color: "#a855f7" },
  script: { bg: "rgba(245,158,11,0.12)", color: "#f59e0b" },
  general: { bg: "var(--bg-tertiary)", color: "var(--text-secondary)" },
}

function CategoryBadge({ category }: { category: string }) {
  const cfg = CATEGORY_COLORS[category] ?? CATEGORY_COLORS.general
  const label = CATEGORIES.find((c) => c.value === category)?.label ?? category
  return (
    <Badge
      className="text-xs border-0 px-2 py-0.5"
      style={{ backgroundColor: cfg.bg, color: cfg.color }}
    >
      {label}
    </Badge>
  )
}

function formatDate(iso?: string) {
  if (!iso) return ""
  const d = new Date(iso)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`
}

// ─── New Document Dialog ──────────────────────────────────────────────────────

function NewDocDialog({
  open,
  onClose,
  onCreated,
  orgId,
}: {
  open: boolean
  onClose: () => void
  onCreated: (doc: Document) => void
  orgId: string
}) {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("general")
  const [body, setBody] = useState("")

  const handleSubmit = () => {
    if (!title.trim()) return
    const now = new Date().toISOString()
    onCreated({
      id: `tmp-${Date.now()}`,
      title,
      category,
      body,
      updatedAt: now,
    })
    setTitle("")
    setCategory("general")
    setBody("")
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent style={{ backgroundColor: "var(--bg-base)", border: "1px solid var(--border-default)" }}>
        <DialogHeader>
          <DialogTitle style={{ color: "var(--text-primary)" }}>새 문서</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-2">
          <Input
            placeholder="문서 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            style={{ backgroundColor: "var(--bg-elevated)", borderColor: "var(--border-default)", color: "var(--text-primary)" }}
          />
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger style={{ backgroundColor: "var(--bg-elevated)", borderColor: "var(--border-default)", color: "var(--text-primary)" }}>
              <SelectValue placeholder="카테고리 선택" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.filter((c) => c.value !== "all").map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Textarea
            placeholder="문서 내용을 입력하세요..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={6}
            style={{ backgroundColor: "var(--bg-elevated)", borderColor: "var(--border-default)", color: "var(--text-primary)", resize: "vertical" }}
          />
          <div className="flex gap-2 justify-end mt-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              style={{ color: "var(--text-secondary)" }}
            >
              취소
            </Button>
            <Button
              size="sm"
              disabled={!title.trim()}
              onClick={handleSubmit}
              className="border-0 text-white"
              style={{ backgroundColor: "var(--color-teal-500)" }}
            >
              저장
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function DocumentsPage() {
  const { setBreadcrumbs } = useBreadcrumbs()
  const { selectedOrgId } = useOrganization()
  const { id: selectedDocId } = useParams<{ id?: string }>()

  const [activeCategory, setActiveCategory] = useState<DocCategory>("all")
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null)
  const [showNewDialog, setShowNewDialog] = useState(false)
  const [localDocs, setLocalDocs] = useState<Document[]>([])

  useEffect(() => {
    setBreadcrumbs([{ label: "지식베이스" }])
  }, [setBreadcrumbs])

  const { data: apiDocs, isLoading } = useQuery({
    queryKey: queryKeys.documents.list(selectedOrgId ?? ""),
    queryFn: () => documentsApi.list(selectedOrgId!),
    enabled: !!selectedOrgId,
    retry: false,
  })

  const allDocs: Document[] = (apiDocs as Document[] | undefined)?.length
    ? (apiDocs as Document[])
    : localDocs.length > 0
    ? [...FALLBACK_DOCS, ...localDocs.filter((d) => !FALLBACK_DOCS.find((f) => f.id === d.id))]
    : FALLBACK_DOCS

  const filtered = activeCategory === "all"
    ? allDocs
    : allDocs.filter((d) => d.category === activeCategory)

  const displayDoc = selectedDoc ?? (selectedDocId ? allDocs.find((d) => d.id === selectedDocId) ?? null : null)

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4 shrink-0"
        style={{ borderBottom: "1px solid var(--border-default)" }}
      >
        <div>
          <h1 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
            지식베이스
          </h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-tertiary)" }}>
            {allDocs.length}개 문서
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isLoading && (
            <Loader2 size={16} className="animate-spin" style={{ color: "var(--text-tertiary)" }} />
          )}
          <Button
            size="sm"
            className="border-0 text-white text-xs gap-1"
            style={{ backgroundColor: "var(--color-teal-500)" }}
            onClick={() => setShowNewDialog(true)}
          >
            <Plus size={14} />
            새 문서
          </Button>
        </div>
      </div>

      {/* Category tabs */}
      <div
        className="flex gap-1 px-6 py-2 shrink-0 overflow-x-auto"
        style={{ borderBottom: "1px solid var(--border-default)" }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className="px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap"
            style={
              activeCategory === cat.value
                ? { backgroundColor: "var(--color-teal-500)", color: "#fff" }
                : { backgroundColor: "var(--bg-tertiary)", color: "var(--text-secondary)" }
            }
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Two-panel body */}
      <div className="flex flex-1 min-h-0">
        {/* Left: list */}
        <ScrollArea
          className="shrink-0"
          style={{ width: 300, borderRight: "1px solid var(--border-default)" }}
        >
          {filtered.length === 0 ? (
            <EmptyState
              icon={<FileText size={22} />}
              title="등록된 문서가 없습니다"
              description="학원 운영 정책, FAQ 등을 등록하면 에이전트가 활용합니다."
            />
          ) : (
            <div className="p-2 flex flex-col gap-1">
              {filtered.map((doc) => {
                const updatedAt = doc.updatedAt ?? doc.updated_at
                const isActive = displayDoc?.id === doc.id
                return (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedDoc(doc)}
                    className="w-full text-left rounded-lg px-3 py-3 transition-colors"
                    style={{
                      backgroundColor: isActive ? "var(--color-primary-bg)" : "transparent",
                      border: isActive ? "1px solid rgba(20,184,166,0.25)" : "1px solid transparent",
                    }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p
                        className="text-sm font-medium truncate flex-1"
                        style={{ color: isActive ? "var(--color-teal-500)" : "var(--text-primary)" }}
                      >
                        {doc.title}
                      </p>
                      <CategoryBadge category={doc.category} />
                    </div>
                    {updatedAt && (
                      <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                        {formatDate(updatedAt)}
                      </p>
                    )}
                  </button>
                )
              })}
            </div>
          )}
        </ScrollArea>

        {/* Right: detail */}
        <ScrollArea className="flex-1">
          {displayDoc ? (
            <div className="p-6 max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-xl font-bold flex-1" style={{ color: "var(--text-primary)" }}>
                  {displayDoc.title}
                </h2>
                <CategoryBadge category={displayDoc.category} />
              </div>
              {(displayDoc.updatedAt ?? displayDoc.updated_at) && (
                <p className="text-xs mb-5" style={{ color: "var(--text-tertiary)" }}>
                  마지막 수정: {formatDate(displayDoc.updatedAt ?? displayDoc.updated_at)}
                </p>
              )}
              <div
                className="text-sm leading-relaxed whitespace-pre-wrap"
                style={{ color: "var(--text-secondary)" }}
              >
                {displayDoc.body}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-24">
              <FileText size={40} style={{ color: "var(--text-tertiary)" }} />
              <p className="mt-3 text-sm" style={{ color: "var(--text-tertiary)" }}>
                왼쪽에서 문서를 선택하세요
              </p>
            </div>
          )}
        </ScrollArea>
      </div>

      <NewDocDialog
        open={showNewDialog}
        onClose={() => setShowNewDialog(false)}
        orgId={selectedOrgId ?? ""}
        onCreated={(doc) => {
          setLocalDocs((prev) => [...prev, doc])
          setSelectedDoc(doc)
        }}
      />
    </div>
  )
}
