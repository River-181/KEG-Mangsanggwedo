import { useOrganization } from "@/context/OrganizationContext"
import { cn } from "@/lib/utils"

export function OrganizationRail() {
  const { organizations, selectedOrgId, setSelectedOrgId } = useOrganization()

  return (
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
              onClick={() => setSelectedOrgId(org.id)}
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
        v0.3
      </span>
    </div>
  )
}
