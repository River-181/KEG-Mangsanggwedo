import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { CheckCircle2, Info, XCircle, X } from "lucide-react"
import { cn } from "@/lib/utils"

type ToastType = "success" | "error" | "info"

interface Toast {
  id: string
  message: string
  type: ToastType
}

interface ToastContextValue {
  addToast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const MAX_TOASTS = 3
const AUTO_DISMISS_MS = 3500

const toastConfig: Record<ToastType, { icon: React.ReactNode; bg: string; text: string; border: string }> = {
  success: {
    icon: <CheckCircle2 size={15} />,
    bg: "var(--bg-base)",
    text: "var(--color-success)",
    border: "var(--color-success)",
  },
  error: {
    icon: <XCircle size={15} />,
    bg: "var(--bg-base)",
    text: "var(--color-danger)",
    border: "var(--color-danger)",
  },
  info: {
    icon: <Info size={15} />,
    bg: "var(--bg-base)",
    text: "var(--color-teal-500)",
    border: "var(--color-teal-500)",
  },
}

function ToastItem({
  toast,
  onRemove,
}: {
  toast: Toast
  onRemove: (id: string) => void
}) {
  const cfg = toastConfig[toast.type]
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    timerRef.current = setTimeout(() => onRemove(toast.id), AUTO_DISMISS_MS)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [toast.id, onRemove])

  return (
    <div
      className="flex items-start gap-3 px-4 py-3 rounded-xl shadow-lg min-w-[260px] max-w-sm transition-all"
      style={{
        backgroundColor: cfg.bg,
        border: `1px solid ${cfg.border}`,
        boxShadow: "var(--shadow-md)",
      }}
    >
      <span style={{ color: cfg.text, marginTop: 1 }} className="shrink-0">
        {cfg.icon}
      </span>
      <p className="flex-1 text-sm" style={{ color: "var(--text-primary)" }}>
        {toast.message}
      </p>
      <button
        onClick={() => onRemove(toast.id)}
        className="shrink-0 p-0.5 rounded hover:bg-[var(--bg-tertiary)] transition-colors"
        aria-label="닫기"
      >
        <X size={13} style={{ color: "var(--text-tertiary)" }} />
      </button>
    </div>
  )
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const addToast = useCallback((message: string, type: ToastType = "info") => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`
    setToasts((prev) => {
      const next = [...prev, { id, message, type }]
      return next.slice(-MAX_TOASTS)
    })
  }, [])

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      {/* Toast container */}
      {toasts.length > 0 && (
        <div
          className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 items-end"
          aria-live="polite"
          aria-label="알림"
        >
          {toasts.map((t) => (
            <ToastItem key={t.id} toast={t} onRemove={removeToast} />
          ))}
        </div>
      )}
    </ToastContext.Provider>
  )
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error("useToast must be used inside ToastProvider")
  }
  return ctx
}
