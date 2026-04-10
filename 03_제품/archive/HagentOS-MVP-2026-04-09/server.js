const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");

const HOST = "127.0.0.1";
const PORT = Number(process.env.PORT || 4173);
const PUBLIC_DIR = path.join(__dirname, "public");

let state = null;

function createSeedState() {
  return {
    institutionProfile: {
      institutionName: "코리아IT 강남캠퍼스",
      institutionType: "IT",
      learnerGroup: "성인",
      operatingGoal: "등록 전환 + 운영 자동화",
      biggestPain: "민원 대응과 이탈 관리가 동시에 몰림"
    },
    projects: [
      { name: "Complaint Desk", color: "orange" },
      { name: "Retention Lab", color: "blue" },
      { name: "Operations HQ", color: "green" },
      { name: "Compliance Watch", color: "purple" }
    ],
    teamRecommendation: [],
    complaints: [
      {
        id: "cmp_1",
        parentName: "김민지 학부모",
        studentName: "박현우",
        channel: "카카오톡",
        submittedAt: "2026-04-09 09:12",
        text: "현우가 이번 주 수업을 거의 못 따라간다고 합니다. 왜 이런 상황을 미리 안내하지 않았나요? 이번 주 안에 보강 계획과 진도 설명을 정확히 받고 싶습니다."
      },
      {
        id: "cmp_2",
        parentName: "정세영 학부모",
        studentName: "최다은",
        channel: "문자",
        submittedAt: "2026-04-09 10:48",
        text: "다은이가 오늘 결석했는데 차량 안내도 없고 보강 일정도 없네요. 이런 운영이면 환불까지 생각하겠습니다. 오늘 안에 대응 부탁드립니다."
      },
      {
        id: "cmp_3",
        parentName: "이준호 수강생",
        studentName: "이준호",
        channel: "상담앱",
        submittedAt: "2026-04-09 11:24",
        text: "프로젝트반 과제가 너무 갑자기 어려워졌습니다. 질문을 남겨도 답이 늦고, 계속 이런 식이면 다음 달 재등록이 고민됩니다."
      }
    ],
    students: [
      {
        id: "std_1",
        name: "박현우",
        course: "프론트엔드 취업반",
        absences: 2,
        missedAssignments: 3,
        inactivityDays: 4,
        recentScoreDelta: -16,
        counselingFlag: true
      },
      {
        id: "std_2",
        name: "최다은",
        course: "영상편집 실무반",
        absences: 3,
        missedAssignments: 1,
        inactivityDays: 5,
        recentScoreDelta: -9,
        counselingFlag: true
      },
      {
        id: "std_3",
        name: "이준호",
        course: "AI 서비스 기획반",
        absences: 1,
        missedAssignments: 4,
        inactivityDays: 6,
        recentScoreDelta: -12,
        counselingFlag: false
      },
      {
        id: "std_4",
        name: "송하린",
        course: "UXUI 부트캠프",
        absences: 0,
        missedAssignments: 1,
        inactivityDays: 1,
        recentScoreDelta: 4,
        counselingFlag: false
      }
    ],
    approvals: [],
    traces: [],
    lastInstruction: "오늘 들어온 민원 정리하고 이번 주 이탈 위험 학생 보여줘",
    lastRun: null,
    issueSequence: 80
  };
}

function uid(prefix) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function nextIssueCode(prefix) {
  state.issueSequence += 1;
  return `${prefix}-${state.issueSequence}`;
}

function containsAny(source, keywords) {
  return keywords.some((keyword) => source.includes(keyword));
}

function recommendTeam(profile) {
  const corpus = `${profile.operatingGoal} ${profile.biggestPain} ${profile.institutionType} ${profile.learnerGroup}`.toLowerCase();
  const picks = [];

  picks.push({
    name: "Operations Orchestrator",
    role: "원장 지시를 케이스와 승인 카드로 재구성",
    reason: "원장 중심 운영에서는 여러 업무를 병렬 실행하고 승인 루프로 묶는 오케스트레이터가 핵심입니다.",
    skills: ["task-router", "approval-presenter", "schedule-trigger"]
  });

  if (containsAny(corpus, ["민원", "학부모", "상담", "불만", "응대"])) {
    picks.push({
      name: "Complaint Agent",
      role: "민원 분류, 긴급도 판단, 응답 초안 생성",
      reason: "민원 응대 부담이 커서 감정 완충과 답변 정제가 필요합니다.",
      skills: ["complaint-classifier", "message-template-pack", "kakao-bot-mcp"]
    });
  }

  if (containsAny(corpus, ["이탈", "재등록", "출결", "유지", "전환"])) {
    picks.push({
      name: "Retention Agent",
      role: "이탈 위험 탐지와 개입 우선순위 제시",
      reason: "재등록과 출결 문제는 조기 탐지가 가장 중요합니다.",
      skills: ["churn-signal-detector", "student-360-view", "excel-import-export"]
    });
  }

  if (containsAny(corpus, ["스케줄", "보강", "강사", "차량", "운영"])) {
    picks.push({
      name: "Scheduler Agent",
      role: "보강·대체강사·상담 일정 조정",
      reason: "운영 병목이 시간표 충돌과 일정 누락에서 자주 발생합니다.",
      skills: ["schedule-optimizer", "google-calendar-mcp", "substitute-matcher"]
    });
  }

  if (containsAny(corpus, ["환불", "결제", "수납", "법규", "규정"])) {
    picks.push({
      name: "Compliance Agent",
      role: "환불·규정·학원법 기준 정리",
      reason: "민감한 운영 이슈는 법규와 근거 문서에 맞춘 대응이 필요합니다.",
      skills: ["korean-law-mcp", "refund-calculator", "policy-summarizer"]
    });
  }

  const deduped = [];
  const seen = new Set();
  for (const agent of picks) {
    if (!seen.has(agent.name)) {
      seen.add(agent.name);
      deduped.push(agent);
    }
  }
  return deduped.slice(0, 4);
}

function classifyComplaint(complaint) {
  const text = complaint.text;
  let category = "기타";
  let urgency = "주간";

  if (containsAny(text, ["환불", "환급"])) {
    category = "환불요청";
    urgency = "즉시";
  } else if (containsAny(text, ["보강", "일정", "결석", "차량"])) {
    category = "스케줄조정";
    urgency = "당일";
  } else if (containsAny(text, ["진도", "성적", "따라", "과제"])) {
    category = "성적불만";
    urgency = "당일";
  } else if (containsAny(text, ["시설", "환경"])) {
    category = "시설불만";
    urgency = "주간";
  } else if (containsAny(text, ["행동", "태도"])) {
    category = "행동지적";
    urgency = "당일";
  }

  const urgencyReason = urgency === "즉시"
    ? "환불 또는 강한 이탈 신호가 포함돼 빠른 개입이 필요합니다."
    : urgency === "당일"
      ? "학부모 신뢰와 수업 운영에 바로 영향을 주는 사안입니다."
      : "정리된 답변과 후속 안내가 필요한 일반 민원입니다.";

  const summary = `${complaint.studentName} 관련 ${category}. 핵심 요구는 현황 설명과 구체적 조치 안내입니다.`;
  const responseDraft = [
    `${complaint.parentName}님, 불편을 드려 죄송합니다.`,
    `${complaint.studentName} 학생 관련 현재 상황을 확인해 오늘 안에 학습 현황과 후속 조치를 정리해 안내드리겠습니다.`,
    category === "환불요청"
      ? "환불 문의가 포함된 만큼 운영 규정과 가능한 대안을 함께 검토해 빠르게 회신드리겠습니다."
      : "보강 또는 개별 피드백이 필요한 부분은 담당 강사와 확인 후 구체적으로 제안드리겠습니다."
  ].join(" ");

  return {
    category,
    urgency,
    urgencyReason,
    summary,
    responseDraft
  };
}

function scoreStudentRisk(student) {
  let score = 0;
  const reasons = [];

  if (student.absences >= 3) {
    score += 35;
    reasons.push(`결석 ${student.absences}회`);
  } else if (student.absences >= 1) {
    score += 15;
    reasons.push(`결석 ${student.absences}회`);
  }

  if (student.missedAssignments >= 3) {
    score += 30;
    reasons.push(`미제출 과제 ${student.missedAssignments}건`);
  } else if (student.missedAssignments >= 1) {
    score += 12;
    reasons.push(`미제출 과제 ${student.missedAssignments}건`);
  }

  if (student.inactivityDays >= 5) {
    score += 20;
    reasons.push(`학습 비활성 ${student.inactivityDays}일`);
  } else if (student.inactivityDays >= 3) {
    score += 10;
    reasons.push(`학습 비활성 ${student.inactivityDays}일`);
  }

  if (student.recentScoreDelta <= -10) {
    score += 18;
    reasons.push(`최근 성과 ${Math.abs(student.recentScoreDelta)}점 하락`);
  } else if (student.recentScoreDelta < 0) {
    score += 8;
    reasons.push(`최근 성과 ${Math.abs(student.recentScoreDelta)}점 하락`);
  }

  if (student.counselingFlag) {
    score += 10;
    reasons.push("상담 필요 플래그 존재");
  }

  const level = score >= 70 ? "높음" : score >= 40 ? "중간" : "낮음";
  const nextAction = level === "높음"
    ? "24시간 내 전화 상담 및 맞춤 보강 제안"
    : level === "중간"
      ? "이번 주 내 체크인 메시지와 과제 리마인드"
      : "정기 모니터링 유지";

  return {
    score,
    level,
    reasons,
    nextAction
  };
}

function buildApprovalBase({
  kind,
  prefix,
  agent,
  title,
  subject,
  summary,
  detail,
  recommendation,
  draft,
  priority,
  evidence
}) {
  return {
    id: uid("apr"),
    issueCode: nextIssueCode(prefix),
    kind,
    status: "pending",
    priority,
    agent,
    title,
    subject,
    summary,
    detail,
    recommendation,
    draft,
    evidence,
    createdAt: new Date().toISOString()
  };
}

function createComplaintApproval(complaint) {
  const result = classifyComplaint(complaint);
  return buildApprovalBase({
    kind: "complaint",
    prefix: "HAG",
    agent: "Complaint Agent",
    title: `${complaint.studentName} 민원 대응 카드`,
    subject: complaint.parentName,
    summary: result.summary,
    detail: complaint.text,
    recommendation: `${result.category} / ${result.urgency} 대응. ${result.urgencyReason}`,
    draft: result.responseDraft,
    priority: result.urgency,
    evidence: [`채널: ${complaint.channel}`, `접수 시각: ${complaint.submittedAt}`]
  });
}

function createRetentionApproval(student) {
  const result = scoreStudentRisk(student);
  return buildApprovalBase({
    kind: "retention",
    prefix: "RET",
    agent: "Retention Agent",
    title: `${student.name} 이탈 위험 카드`,
    subject: student.course,
    summary: `${student.name} 학생은 ${result.level} 위험군입니다.`,
    detail: result.reasons.join(", "),
    recommendation: result.nextAction,
    draft: `${student.name} 학생은 ${result.reasons.join(", ")} 신호가 누적됐습니다. 우선 조치: ${result.nextAction}.`,
    priority: result.level,
    evidence: [`위험 점수: ${result.score}`, `과정: ${student.course}`]
  });
}

function createScheduleApproval() {
  return buildApprovalBase({
    kind: "scheduler",
    prefix: "SCH",
    agent: "Scheduler Agent",
    title: "보강 및 일정 조정 카드",
    subject: "운영 일정",
    summary: "민원과 결석 이슈를 반영해 보강 우선순위를 재조정합니다.",
    detail: "결석 학생과 차량/보강 안내 누락 이슈를 기준으로 일정 재배치를 추천합니다.",
    recommendation: "오늘 오후 보강 슬롯 확보 후 보호자 안내 메시지 발송",
    draft: "오늘 결석 및 민원 건을 반영해 보강 시간표를 재구성하고 보호자에게 순차 안내하는 안을 제안합니다.",
    priority: "당일",
    evidence: ["연동 대상: Google Calendar", "영향 학생: 최다은 외 1명"]
  });
}

function buildRunTrace(instruction, activatedAgents, producedApprovals) {
  return [
    {
      title: "Orchestrator",
      body: `입력된 지시를 해석해 ${activatedAgents.join(", ")} 에게 병렬 태스크를 분배했습니다.`
    },
    {
      title: "Case Routing",
      body: `${producedApprovals.length}개의 운영 케이스가 승인 카드로 변환됐습니다.`
    },
    {
      title: "Approval Loop",
      body: "운영자는 카드 단위로 승인, 보류, 거절할 수 있습니다."
    },
    {
      title: "Instruction Snapshot",
      body: instruction
    }
  ];
}

function buildRunSummary(activatedAgents, approvals) {
  const complaints = approvals.filter((approval) => approval.kind === "complaint").length;
  const retention = approvals.filter((approval) => approval.kind === "retention").length;
  const scheduler = approvals.filter((approval) => approval.kind === "scheduler").length;

  const parts = [];
  if (complaints) parts.push(`민원 ${complaints}건`);
  if (retention) parts.push(`이탈 위험 ${retention}건`);
  if (scheduler) parts.push(`일정 조정 ${scheduler}건`);
  if (!parts.length) parts.push("처리할 운영 케이스 없음");

  return `${parts.join(", ")}을(를) 승인 카드로 정리했습니다.`;
}

function mergeApprovals(nextApprovals) {
  const decided = state.approvals.filter((approval) => approval.status !== "pending");
  state.approvals = [...nextApprovals, ...decided];
}

function dispatchInstruction(instruction, trigger = "manual") {
  const normalized = instruction.trim();
  const lower = normalized.toLowerCase();
  const wantsComplaints = lower.includes("민원") || lower.includes("학부모") || lower.includes("complaint");
  const wantsRetention = lower.includes("이탈") || lower.includes("재등록") || lower.includes("churn");
  const wantsSchedule = lower.includes("보강") || lower.includes("스케줄");

  const approvals = [];
  const activatedAgents = ["Operations Orchestrator"];

  if (wantsComplaints || (!wantsComplaints && !wantsRetention && !wantsSchedule)) {
    activatedAgents.push("Complaint Agent");
    approvals.push(...state.complaints.map(createComplaintApproval));
  }

  if (wantsRetention || (!wantsComplaints && !wantsRetention && !wantsSchedule)) {
    activatedAgents.push("Retention Agent");
    approvals.push(
      ...state.students
        .map((student) => ({ student, risk: scoreStudentRisk(student) }))
        .filter(({ risk }) => risk.level !== "낮음")
        .sort((a, b) => b.risk.score - a.risk.score)
        .map(({ student }) => createRetentionApproval(student))
    );
  }

  if (wantsSchedule) {
    activatedAgents.push("Scheduler Agent");
    approvals.push(createScheduleApproval());
  }

  mergeApprovals(approvals);
  state.lastInstruction = normalized;
  state.traces = buildRunTrace(normalized, activatedAgents, approvals);
  state.lastRun = {
    id: uid("run").slice(-8),
    status: "succeeded",
    trigger,
    at: new Date().toISOString(),
    activatedAgents,
    summary: buildRunSummary(activatedAgents, approvals),
    approvalsCreated: approvals.length
  };

  return buildBootstrap();
}

function getMetrics() {
  const pending = state.approvals.filter((approval) => approval.status === "pending").length;
  const approved = state.approvals.filter((approval) => approval.status === "approved").length;
  const rejected = state.approvals.filter((approval) => approval.status === "rejected").length;
  const complaintBacklog = state.complaints.length;
  const highRisk = state.students.filter((student) => scoreStudentRisk(student).level === "높음").length;
  const liveAgents = new Set(state.lastRun?.activatedAgents ?? []).size;
  return {
    pending,
    approved,
    rejected,
    complaintBacklog,
    highRisk,
    liveAgents
  };
}

function buildBootstrap() {
  return {
    institutionProfile: state.institutionProfile,
    projects: state.projects,
    teamRecommendation: state.teamRecommendation,
    complaints: state.complaints.map((complaint) => ({
      ...complaint,
      analysis: classifyComplaint(complaint)
    })),
    students: state.students.map((student) => ({
      ...student,
      risk: scoreStudentRisk(student)
    })),
    approvals: state.approvals,
    traces: state.traces,
    lastInstruction: state.lastInstruction,
    lastRun: state.lastRun,
    metrics: getMetrics()
  };
}

function resetState() {
  state = createSeedState();
  state.teamRecommendation = recommendTeam(state.institutionProfile);
  dispatchInstruction(state.lastInstruction, "timer");
}

async function readJson(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  if (!chunks.length) return {};
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(data));
}

async function serveStatic(res, pathname) {
  const safePath = pathname === "/" ? "/index.html" : pathname;
  const filePath = path.join(PUBLIC_DIR, safePath);
  if (!filePath.startsWith(PUBLIC_DIR)) {
    sendJson(res, 403, { error: "Forbidden" });
    return;
  }

  try {
    const content = await fs.readFile(filePath);
    const ext = path.extname(filePath);
    const contentType = {
      ".html": "text/html; charset=utf-8",
      ".css": "text/css; charset=utf-8",
      ".js": "application/javascript; charset=utf-8",
      ".json": "application/json; charset=utf-8",
      ".svg": "image/svg+xml"
    }[ext] || "application/octet-stream";

    res.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": "no-store"
    });
    res.end(content);
  } catch {
    sendJson(res, 404, { error: "Not found" });
  }
}

resetState();

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);
  const { pathname } = requestUrl;

  if (req.method === "GET" && pathname === "/api/bootstrap") {
    sendJson(res, 200, buildBootstrap());
    return;
  }

  if (req.method === "POST" && pathname === "/api/onboarding") {
    const payload = await readJson(req);
    state.institutionProfile = {
      institutionName: payload.institutionName || state.institutionProfile.institutionName,
      institutionType: payload.institutionType || state.institutionProfile.institutionType,
      learnerGroup: payload.learnerGroup || state.institutionProfile.learnerGroup,
      operatingGoal: payload.operatingGoal || state.institutionProfile.operatingGoal,
      biggestPain: payload.biggestPain || state.institutionProfile.biggestPain
    };
    state.teamRecommendation = recommendTeam(state.institutionProfile);
    sendJson(res, 200, buildBootstrap());
    return;
  }

  if (req.method === "POST" && pathname === "/api/dispatch") {
    const payload = await readJson(req);
    const instruction = typeof payload.instruction === "string" && payload.instruction.trim()
      ? payload.instruction
      : state.lastInstruction;
    sendJson(res, 200, dispatchInstruction(instruction, "manual"));
    return;
  }

  if (req.method === "POST" && pathname === "/api/reset") {
    resetState();
    sendJson(res, 200, buildBootstrap());
    return;
  }

  if (req.method === "POST" && pathname.startsWith("/api/approvals/") && pathname.endsWith("/decision")) {
    const approvalId = pathname.split("/")[3];
    const payload = await readJson(req);
    const decision = payload.decision === "approved" ? "approved" : "rejected";
    const approval = state.approvals.find((item) => item.id === approvalId);

    if (!approval) {
      sendJson(res, 404, { error: "Approval not found" });
      return;
    }

    approval.status = decision;
    sendJson(res, 200, buildBootstrap());
    return;
  }

  await serveStatic(res, pathname);
});

server.listen(PORT, HOST, () => {
  console.log(`HagentOS MVP running at http://${HOST}:${PORT}`);
});
