import { useEffect } from "react"
import { useBreadcrumbs } from "@/context/BreadcrumbContext"
import { cn } from "@/lib/utils"

interface ClassBlock {
  subject: string
  instructor: string
  room: string
  startHour: number
  endHour: number
  dayIndex: number
  colorKey: string
}

const INSTRUCTORS: Record<string, string> = {
  kim: "김영어",
  park: "박문법",
  lee: "이수능",
  choi: "최회화",
}

const INSTRUCTOR_COLORS: Record<string, { bg: string; text: string }> = {
  kim: { bg: "#e0f2fe", text: "#0369a1" },
  park: { bg: "#ede9fe", text: "#6d28d9" },
  lee: { bg: "#fef9c3", text: "#92400e" },
  choi: { bg: "#dcfce7", text: "#166534" },
}

const DAYS = ["월", "화", "수", "목", "금", "토"]
const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]

const SCHEDULE: ClassBlock[] = [
  // 월
  { subject: "초등A반", instructor: "kim", room: "101호", startHour: 10, endHour: 11, dayIndex: 0, colorKey: "kim" },
  { subject: "중등B반", instructor: "park", room: "102호", startHour: 13, endHour: 14, dayIndex: 0, colorKey: "park" },
  { subject: "고등특강", instructor: "lee", room: "201호", startHour: 16, endHour: 18, dayIndex: 0, colorKey: "lee" },
  // 화
  { subject: "중등B반", instructor: "park", room: "102호", startHour: 10, endHour: 11, dayIndex: 1, colorKey: "park" },
  { subject: "초등A반", instructor: "kim", room: "101호", startHour: 14, endHour: 15, dayIndex: 1, colorKey: "kim" },
  { subject: "성인회화", instructor: "choi", room: "103호", startHour: 19, endHour: 20, dayIndex: 1, colorKey: "choi" },
  // 수
  { subject: "초등A반", instructor: "kim", room: "101호", startHour: 10, endHour: 11, dayIndex: 2, colorKey: "kim" },
  { subject: "중등B반", instructor: "park", room: "102호", startHour: 13, endHour: 14, dayIndex: 2, colorKey: "park" },
  { subject: "고등특강", instructor: "lee", room: "201호", startHour: 16, endHour: 18, dayIndex: 2, colorKey: "lee" },
  // 목
  { subject: "중등B반", instructor: "park", room: "102호", startHour: 10, endHour: 11, dayIndex: 3, colorKey: "park" },
  { subject: "초등A반", instructor: "kim", room: "101호", startHour: 14, endHour: 15, dayIndex: 3, colorKey: "kim" },
  { subject: "성인회화", instructor: "choi", room: "103호", startHour: 19, endHour: 20, dayIndex: 3, colorKey: "choi" },
  // 금
  { subject: "초등A반", instructor: "kim", room: "101호", startHour: 10, endHour: 11, dayIndex: 4, colorKey: "kim" },
  { subject: "중등B반", instructor: "park", room: "102호", startHour: 13, endHour: 14, dayIndex: 4, colorKey: "park" },
  { subject: "고등특강", instructor: "lee", room: "201호", startHour: 16, endHour: 18, dayIndex: 4, colorKey: "lee" },
  // 토
  { subject: "고등특강", instructor: "lee", room: "201호", startHour: 10, endHour: 12, dayIndex: 5, colorKey: "lee" },
  { subject: "초등A반", instructor: "kim", room: "101호", startHour: 13, endHour: 14, dayIndex: 5, colorKey: "kim" },
  { subject: "성인회화", instructor: "choi", room: "103호", startHour: 15, endHour: 16, dayIndex: 5, colorKey: "choi" },
]

export function SchedulePage() {
  const { setBreadcrumbs } = useBreadcrumbs()

  useEffect(() => {
    setBreadcrumbs([{ label: "스케줄" }])
  }, [setBreadcrumbs])

  const getBlocksForCell = (dayIndex: number, hour: number) =>
    SCHEDULE.filter((b) => b.dayIndex === dayIndex && b.startHour === hour)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
        스케줄
      </h1>
      <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
        주간 수업 일정
      </p>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-4">
        {Object.entries(INSTRUCTORS).map(([key, name]) => {
          const colors = INSTRUCTOR_COLORS[key]
          return (
            <div
              key={key}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
              style={{ backgroundColor: colors.bg, color: colors.text }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: colors.text }}
              />
              {name}
            </div>
          )
        })}
      </div>

      {/* Grid */}
      <div
        className="rounded-xl overflow-auto"
        style={{
          border: "1px solid var(--border-default)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr>
              <th
                className="w-16 px-3 py-2 text-xs text-left"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  color: "var(--text-tertiary)",
                  borderBottom: "1px solid var(--border-default)",
                }}
              >
                시간
              </th>
              {DAYS.map((day) => (
                <th
                  key={day}
                  className="px-2 py-2 text-xs font-semibold text-center"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    color: "var(--text-secondary)",
                    borderBottom: "1px solid var(--border-default)",
                    borderLeft: "1px solid var(--border-default)",
                    minWidth: 110,
                  }}
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {HOURS.map((hour) => (
              <tr key={hour}>
                <td
                  className="px-3 py-2 text-xs align-top"
                  style={{
                    color: "var(--text-tertiary)",
                    borderBottom: "1px solid var(--border-default)",
                    backgroundColor: "var(--bg-secondary)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {hour}:00
                </td>
                {DAYS.map((_, dayIndex) => {
                  const blocks = getBlocksForCell(dayIndex, hour)
                  return (
                    <td
                      key={dayIndex}
                      className="px-1.5 py-1.5 align-top"
                      style={{
                        borderBottom: "1px solid var(--border-default)",
                        borderLeft: "1px solid var(--border-default)",
                        backgroundColor: "var(--bg-elevated)",
                        verticalAlign: "top",
                        minHeight: 48,
                      }}
                    >
                      {blocks.map((block, i) => {
                        const colors = INSTRUCTOR_COLORS[block.colorKey]
                        const spanHours = block.endHour - block.startHour
                        return (
                          <div
                            key={i}
                            className={cn("rounded-md px-2 py-1.5 text-xs mb-1", i > 0 && "mt-1")}
                            style={{
                              backgroundColor: colors.bg,
                              color: colors.text,
                              minHeight: spanHours > 1 ? `${spanHours * 3}rem` : undefined,
                            }}
                          >
                            <div className="font-semibold leading-tight">{block.subject}</div>
                            <div className="mt-0.5 opacity-80">{INSTRUCTORS[block.instructor]}</div>
                            <div className="opacity-60">{block.room}</div>
                            {spanHours > 1 && (
                              <div className="opacity-60 mt-0.5">
                                {block.startHour}:00–{block.endHour}:00
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
