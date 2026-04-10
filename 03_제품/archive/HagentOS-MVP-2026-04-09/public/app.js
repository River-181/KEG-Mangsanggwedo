const uiState = {
  bootstrap: null,
  selectedAgent: "Operations Orchestrator",
  pausedAgents: new Set(),
  searchQuery: "",
  draftInstruction: "",
  activeNav: "Dashboard",
  activeWork: "Operational Cases",
  activeProject: "Operations HQ"
};

const AGENT_META = {
  "Operations Orchestrator": { monogram: "OO", title: "Director of Ops", accent: "orange" },
  "Complaint Agent": { monogram: "CA", title: "Complaint Desk", accent: "blue" },
  "Retention Agent": { monogram: "RA", title: "Retention Desk", accent: "green" },
  "Scheduler Agent": { monogram: "SA", title: "Scheduling Desk", accent: "purple" },
  "Compliance Agent": { monogram: "LA", title: "Compliance Desk", accent: "yellow" }
};

const PROJECT_AGENT_MAP = {
  "Complaint Desk": "Complaint Agent",
  "Retention Lab": "Retention Agent",
  "Operations HQ": "Operations Orchestrator",
  "Compliance Watch": "Compliance Agent"
};

const NAV_SECTION_MAP = {
  Dashboard: "agentHero",
  Inbox: "issuesTable",
  Approvals: "approvalQueue"
};

const WORK_SECTION_MAP = {
  "Operational Cases": "issuesTable",
  Approvals: "approvalQueue",
  Goals: "chartGrid"
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function request(path, options = {}) {
  const response = await fetch(path, {
    headers: {
      "Content-Type": "application/json"
    },
    ...options
  });
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json();
}

function shorten(text, length = 96) {
  if (text.length <= length) return text;
  return `${text.slice(0, length - 1)}…`;
}

function timeAgo(iso) {
  if (!iso) return "moments ago";
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.max(0, Math.round(diffMs / 60000));
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}

function buildAgentRoster(bootstrap) {
  const liveAgents = new Set(bootstrap.lastRun?.activatedAgents ?? []);
  return bootstrap.teamRecommendation.map((agent) => {
    const issues = filterIssuesForAgent(agent.name, bootstrap.approvals);
    const pending = issues.filter((issue) => issue.status === "pending").length;
    const approved = issues.filter((issue) => issue.status === "approved").length;
    const isPaused = uiState.pausedAgents.has(agent.name);
    const status = isPaused ? "paused" : liveAgents.has(agent.name) ? "live" : pending > 0 ? "busy" : "idle";
    return {
      ...agent,
      ...AGENT_META[agent.name],
      pending,
      approved,
      status
    };
  });
}

function filterIssuesForAgent(agentName, approvals) {
  if (agentName === "Operations Orchestrator") {
    return approvals;
  }
  return approvals.filter((approval) => approval.agent === agentName);
}

function getSelectedAgentContext() {
  const bootstrap = uiState.bootstrap;
  const roster = buildAgentRoster(bootstrap);
  if (!roster.find((agent) => agent.name === uiState.selectedAgent)) {
    uiState.selectedAgent = roster[0]?.name ?? "Operations Orchestrator";
  }
  const selectedAgent = roster.find((agent) => agent.name === uiState.selectedAgent) ?? roster[0];
  const search = uiState.searchQuery.trim().toLowerCase();
  const allIssues = filterIssuesForAgent(selectedAgent.name, bootstrap.approvals);
  const issues = allIssues.filter((issue) => {
    if (!search) return true;
    return `${issue.issueCode} ${issue.title} ${issue.subject} ${issue.summary}`.toLowerCase().includes(search);
  });
  const queue = bootstrap.approvals
    .filter((issue) => issue.status === "pending")
    .filter((issue) => !search || `${issue.title} ${issue.subject}`.toLowerCase().includes(search))
    .slice(0, 4);
  const liveCount = roster.filter((agent) => agent.status === "live").length;
  return {
    bootstrap,
    roster,
    selectedAgent,
    issues,
    queue,
    liveCount
  };
}

function priorityTone(priority) {
  if (priority === "즉시" || priority === "높음") return "danger";
  if (priority === "당일" || priority === "중간") return "warning";
  return "success";
}

function statusTone(status) {
  if (status === "approved") return "success";
  if (status === "rejected") return "danger";
  return "warning";
}

function buildDateLabels() {
  const labels = [];
  const start = new Date();
  start.setDate(start.getDate() - 6);
  for (let index = 0; index < 7; index += 1) {
    const current = new Date(start);
    current.setDate(start.getDate() + index);
    labels.push(`${current.getMonth() + 1}/${current.getDate()}`);
  }
  return labels;
}

function buildChartCards(selectedAgent, issues, bootstrap) {
  const approved = issues.filter((issue) => issue.status === "approved").length;
  const pending = issues.filter((issue) => issue.status === "pending").length;
  const rejected = issues.filter((issue) => issue.status === "rejected").length;
  const volume = Math.max(issues.length, 3);
  const labels = buildDateLabels();
  const activityBase = [1, 5, 10, 4, 6, 7, 5];
  const activityBars = activityBase.map((value, index) => ({
    label: labels[index],
    segments: [
      { value: Math.max(1, value + Math.min(3, volume - 2) - (index === 6 ? 1 : 0)), tone: "green" },
      { value: index === 2 ? Math.max(0, Math.round(pending / 3)) : index === 4 ? Math.round(rejected / 2) : 0, tone: "red" }
    ]
  }));

  const priorityCounts = new Map([
    ["즉시", 0],
    ["당일", 0],
    ["주간", 0],
    ["높음", 0]
  ]);
  issues.forEach((issue) => {
    if (priorityCounts.has(issue.priority)) {
      priorityCounts.set(issue.priority, priorityCounts.get(issue.priority) + 1);
    }
  });

  const priorityBars = Array.from(priorityCounts.entries())
    .filter(([, count]) => count > 0)
    .map(([label, count]) => ({
      label,
      segments: [{ value: count, tone: priorityTone(label) === "danger" ? "yellow" : priorityTone(label) === "warning" ? "orange" : "green" }]
    }));

  const statusBars = [
    { label: "Done", segments: [{ value: approved, tone: "green" }] },
    { label: "Review", segments: [{ value: pending, tone: "blue" }] },
    { label: "Rejected", segments: [{ value: rejected, tone: "red" }] }
  ];

  const total = Math.max(approved + pending + rejected, 1);
  const successRateBase = [62, 78, 74, 86, 82, 91, 94];
  const rateAdjustment = Math.round((approved / total) * 10) - Math.round((pending / total) * 4);
  const successRateBars = successRateBase.map((value, index) => {
    const adjusted = Math.max(25, Math.min(100, value + rateAdjustment - (index === 1 && rejected ? 14 : 0)));
    const tone = adjusted >= 85 ? "green" : adjusted >= 70 ? "teal" : adjusted >= 55 ? "yellow" : "red";
    return {
      label: labels[index],
      segments: [{ value: adjusted, tone }]
    };
  });

  return [
    {
      title: "Run Activity",
      subtitle: "Last 7 days",
      bars: activityBars,
      legend: ["green: succeeded", "red: intervention"]
    },
    {
      title: "Cases by Priority",
      subtitle: `${selectedAgent.name} queue`,
      bars: priorityBars.length ? priorityBars : [{ label: "None", segments: [{ value: 1, tone: "muted" }] }],
      legend: ["yellow/orange: urgency mix"]
    },
    {
      title: "Cases by Status",
      subtitle: "Current pipeline",
      bars: statusBars,
      legend: ["green: done", "blue: pending", "red: rejected"]
    },
    {
      title: "Success Rate",
      subtitle: "Recent execution quality",
      bars: successRateBars,
      legend: ["teal/green: healthy runs"]
    }
  ];
}

function renderSidebar(context) {
  document.getElementById("sidebarInstitution").textContent = context.bootstrap.institutionProfile.institutionName;
  document.getElementById("liveCounter").textContent = `${context.liveCount} live`;
  document.querySelectorAll(".primary-nav .nav-item").forEach((item) => {
    const isActive = item.dataset.nav === uiState.activeNav;
    item.classList.toggle("is-active", isActive);
  });

  document.getElementById("projectList").innerHTML = context.bootstrap.projects.map((project) => `
    <button class="project-item ${project.name === uiState.activeProject ? "is-selected" : ""}" type="button" data-project-name="${escapeHtml(project.name)}">
      <span class="project-dot tone-${escapeHtml(project.color)}"></span>
      <span>${escapeHtml(project.name)}</span>
    </button>
  `).join("");

  document.getElementById("workList").innerHTML = `
    <button class="work-item ${uiState.activeWork === "Operational Cases" ? "is-active" : ""}" type="button" data-work-name="Operational Cases">
      <span>Operational Cases</span>
      <span class="work-count">${context.bootstrap.approvals.length}</span>
    </button>
    <button class="work-item ${uiState.activeWork === "Approvals" ? "is-active" : ""}" type="button" data-work-name="Approvals">
      <span>Approvals</span>
      <span class="work-count">${context.bootstrap.metrics.pending}</span>
    </button>
    <button class="work-item ${uiState.activeWork === "Goals" ? "is-active" : ""}" type="button" data-work-name="Goals">
      <span>Goals</span>
      <span class="work-count">${context.bootstrap.metrics.highRisk}</span>
    </button>
  `;

  document.getElementById("agentList").innerHTML = context.roster.map((agent) => `
    <button class="agent-item ${agent.name === context.selectedAgent.name ? "is-selected" : ""}" type="button" data-agent-name="${escapeHtml(agent.name)}">
      <span class="agent-avatar tone-${escapeHtml(agent.accent || "orange")}">${escapeHtml(agent.monogram || "AG")}</span>
      <span class="agent-copy">
        <strong>${escapeHtml(agent.name)}</strong>
        <span>${escapeHtml(agent.title || agent.role)}</span>
      </span>
      <span class="agent-meta">
        ${agent.pending > 0 ? `<span class="meta-dot">${agent.pending}</span>` : ""}
        <span class="agent-state is-${escapeHtml(agent.status)}">${escapeHtml(agent.status)}</span>
      </span>
    </button>
  `).join("");
}

function renderWorkspaceHeader(context) {
  document.getElementById("breadcrumbs").innerHTML = `
    <span>Institution</span>
    <span class="crumb-sep">›</span>
    <span>Agents</span>
    <span class="crumb-sep">›</span>
    <strong>${escapeHtml(context.selectedAgent.name)}</strong>
  `;
  document.getElementById("topStatus").textContent = uiState.pausedAgents.has(context.selectedAgent.name) ? "paused" : context.selectedAgent.status;
  document.getElementById("topStatus").className = `status-pill is-${uiState.pausedAgents.has(context.selectedAgent.name) ? "paused" : context.selectedAgent.status}`;
  document.getElementById("topHint").textContent = `${context.bootstrap.institutionProfile.institutionName} · ${context.bootstrap.metrics.pending} pending approvals`;
}

function renderAgentHero(context) {
  const latestRun = context.bootstrap.lastRun;
  const isPaused = uiState.pausedAgents.has(context.selectedAgent.name);
  const hero = document.getElementById("agentHero");
  hero.innerHTML = `
    <div class="agent-stage-head">
      <div class="agent-stage-copy">
        <span class="agent-stage-avatar tone-${escapeHtml(context.selectedAgent.accent || "orange")}">${escapeHtml(context.selectedAgent.monogram || "AG")}</span>
        <div>
          <p class="panel-tag">Agents</p>
          <h2>${escapeHtml(context.selectedAgent.name)}</h2>
          <p class="hero-subtitle">${escapeHtml(context.selectedAgent.title || context.selectedAgent.role)} · ${escapeHtml(context.selectedAgent.role)}</p>
        </div>
      </div>
      <div class="hero-actions">
        <button class="action-btn" type="button" data-action="focus-command">Assign Task</button>
        <button class="action-btn action-btn-primary" type="button" data-action="invoke">Invoke</button>
        <button class="action-btn" type="button" data-action="toggle-pause">${isPaused ? "Resume" : "Pause"}</button>
        <span class="status-pill is-${isPaused ? "paused" : context.selectedAgent.status}">${isPaused ? "paused" : context.selectedAgent.status}</span>
      </div>
    </div>
    <p class="hero-body">
      ${escapeHtml(context.selectedAgent.reason)}
      ${latestRun ? ` 마지막 오케스트레이션은 ${latestRun.approvalsCreated}개 카드를 생성했습니다.` : ""}
    </p>
  `;
}

function renderLatestRun(context) {
  const run = context.bootstrap.lastRun;
  const issues = context.issues;
  const root = document.getElementById("latestRun");

  if (!run) {
    root.innerHTML = `<div class="run-card empty-run">아직 실행 기록이 없습니다.</div>`;
    return;
  }

  const selectedTriggered = run.activatedAgents.includes(context.selectedAgent.name);
  const summary = selectedTriggered
    ? run.summary
    : `${context.selectedAgent.name}는 현재 대기 상태입니다. 새로운 운영 케이스가 배정되면 heartbeat가 깨어납니다.`;
  const triggerLabel = run.trigger === "timer" ? "Timer" : "Manual";

  root.innerHTML = `
    <div class="panel-bar panel-bar-tight">
      <div>
        <p class="panel-tag">Latest Run</p>
        <h3>최근 heartbeat 결과</h3>
      </div>
      <button class="ghost-link" type="button">View details</button>
    </div>
    <div class="run-card">
      <div class="run-top">
        <div class="run-badges">
          <span class="run-badge is-success">${selectedTriggered ? "succeeded" : "idle"}</span>
          <span class="run-badge is-dark">${escapeHtml(run.id)}</span>
          <span class="run-badge is-blue">${escapeHtml(triggerLabel)}</span>
        </div>
        <span class="run-time">${escapeHtml(timeAgo(run.at))}</span>
      </div>
      <p class="run-summary">${escapeHtml(summary)}</p>
      <p class="run-meta">${issues.length} visible cases · ${run.activatedAgents.length} active agents in the last run</p>
    </div>
  `;
}

function renderChartGrid(context) {
  const chartCards = buildChartCards(context.selectedAgent, context.issues, context.bootstrap);
  document.getElementById("chartGrid").innerHTML = chartCards.map((card, index) => {
    const max = Math.max(1, ...card.bars.flatMap((bar) => bar.segments.map((segment) => segment.value)));
    return `
      <article class="panel-dark chart-card fade-up" style="animation-delay:${index * 55}ms">
        <div class="chart-head">
          <div>
            <h3>${escapeHtml(card.title)}</h3>
            <p>${escapeHtml(card.subtitle)}</p>
          </div>
        </div>
        <div class="chart-plot">
          ${card.bars.map((bar) => `
            <div class="chart-column">
              <div class="chart-stack">
                ${bar.segments.map((segment) => `
                  <div class="chart-segment tone-${escapeHtml(segment.tone)}" style="height:${Math.max(6, (segment.value / max) * 100)}%"></div>
                `).join("")}
              </div>
              <span class="chart-label">${escapeHtml(bar.label)}</span>
            </div>
          `).join("")}
        </div>
        <div class="chart-legend">
          ${card.legend.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
        </div>
      </article>
    `;
  }).join("");
}

function renderIssuesTable(context) {
  const root = document.getElementById("issuesTable");
  if (!context.issues.length) {
    root.innerHTML = `<div class="empty-state">선택된 에이전트에 표시할 운영 케이스가 없습니다.</div>`;
    return;
  }

  root.innerHTML = `
    <div class="issue-table-head">
      <span>Issue</span>
      <span>Summary</span>
      <span>Priority</span>
      <span>Status</span>
    </div>
    ${context.issues.map((issue) => `
      <article class="issue-row">
        <div class="issue-code">${escapeHtml(issue.issueCode)}</div>
        <div class="issue-main">
          <strong>${escapeHtml(issue.title)}</strong>
          <p>${escapeHtml(shorten(issue.summary, 88))}</p>
        </div>
        <div><span class="table-badge tone-${escapeHtml(priorityTone(issue.priority))}">${escapeHtml(issue.priority)}</span></div>
        <div><span class="table-badge tone-${escapeHtml(statusTone(issue.status))}">${escapeHtml(issue.status)}</span></div>
      </article>
    `).join("")}
  `;
}

function renderApprovalQueue(context) {
  const root = document.getElementById("approvalQueue");
  root.innerHTML = `
    <div class="panel-bar panel-bar-tight">
      <div>
        <p class="panel-tag">Approvals</p>
        <h3>Approval Queue</h3>
      </div>
      <span class="queue-count">${context.queue.length}</span>
    </div>
    ${context.queue.length ? context.queue.map((issue) => `
      <article class="queue-card">
        <div class="queue-top">
          <strong>${escapeHtml(issue.issueCode)}</strong>
          <span class="table-badge tone-${escapeHtml(priorityTone(issue.priority))}">${escapeHtml(issue.priority)}</span>
        </div>
        <p>${escapeHtml(shorten(issue.title, 54))}</p>
        <span class="queue-subject">${escapeHtml(issue.subject)}</span>
        <div class="queue-actions">
          <button class="mini-btn is-approve" type="button" data-approval-id="${escapeHtml(issue.id)}" data-decision="approved">Approve</button>
          <button class="mini-btn is-reject" type="button" data-approval-id="${escapeHtml(issue.id)}" data-decision="rejected">Reject</button>
        </div>
      </article>
    `).join("") : `<div class="empty-state compact">대기 중인 승인 카드가 없습니다.</div>`}
  `;
}

function renderCommandCenter(context) {
  const root = document.getElementById("commandCenter");
  const tracePreview = context.bootstrap.traces.slice(0, 3);
  root.innerHTML = `
    <div class="panel-bar panel-bar-tight">
      <div>
        <p class="panel-tag">Command</p>
        <h3>Invoke Orchestrator</h3>
      </div>
      <button class="ghost-link" type="button" data-action="invoke">Run</button>
    </div>
    <div class="command-wrap">
      <textarea id="instructionInput" rows="4" placeholder="오늘 들어온 민원 정리하고 이번 주 이탈 위험 학생 보여줘">${escapeHtml(uiState.draftInstruction || context.bootstrap.lastInstruction)}</textarea>
      <div class="command-actions">
        <button class="action-btn action-btn-primary" type="button" data-action="invoke">Invoke</button>
        <button class="action-btn" type="button" id="resetButton">Reset</button>
      </div>
    </div>
    <div class="trace-mini-list">
      ${tracePreview.map((trace) => `
        <article class="trace-mini">
          <strong>${escapeHtml(trace.title)}</strong>
          <p>${escapeHtml(shorten(trace.body, 86))}</p>
        </article>
      `).join("")}
    </div>
  `;
}

function renderInstitutionPanel(context) {
  const profile = context.bootstrap.institutionProfile;
  const root = document.getElementById("institutionPanel");
  root.innerHTML = `
    <div class="panel-bar panel-bar-tight">
      <div>
        <p class="panel-tag">Institution</p>
        <h3>Context Snapshot</h3>
      </div>
    </div>
    <form id="onboardingForm" class="compact-form">
      <label>
        <span>Institution</span>
        <input type="text" name="institutionName" value="${escapeHtml(profile.institutionName)}" required />
      </label>
      <label>
        <span>Type</span>
        <select name="institutionType">
          ${["IT", "보습", "입시", "어학", "성인"].map((option) => `
            <option value="${escapeHtml(option)}" ${profile.institutionType === option ? "selected" : ""}>${escapeHtml(option)}</option>
          `).join("")}
        </select>
      </label>
      <label>
        <span>Learners</span>
        <select name="learnerGroup">
          ${["성인", "고등", "중등", "혼합"].map((option) => `
            <option value="${escapeHtml(option)}" ${profile.learnerGroup === option ? "selected" : ""}>${escapeHtml(option)}</option>
          `).join("")}
        </select>
      </label>
      <label>
        <span>Goal</span>
        <input type="text" name="operatingGoal" value="${escapeHtml(profile.operatingGoal)}" required />
      </label>
      <label class="full">
        <span>Pain Point</span>
        <textarea name="biggestPain" rows="3" required>${escapeHtml(profile.biggestPain)}</textarea>
      </label>
      <button class="action-btn action-btn-primary full" type="submit">Update Team Recommendation</button>
    </form>
  `;
}

function renderAll(payload) {
  uiState.bootstrap = payload;
  if (!uiState.draftInstruction) {
    uiState.draftInstruction = payload.lastInstruction;
  }
  const context = getSelectedAgentContext();
  renderSidebar(context);
  renderWorkspaceHeader(context);
  renderAgentHero(context);
  renderLatestRun(context);
  renderChartGrid(context);
  renderIssuesTable(context);
  renderApprovalQueue(context);
  renderCommandCenter(context);
  renderInstitutionPanel(context);
}

function scrollToSection(sectionId) {
  const target = document.getElementById(sectionId);
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

function syncSidebarSelectionFromAgent() {
  const mappedProject = Object.entries(PROJECT_AGENT_MAP).find(([, agentName]) => agentName === uiState.selectedAgent)?.[0];
  if (mappedProject) {
    uiState.activeProject = mappedProject;
  }
}

async function loadBootstrap() {
  const payload = await request("/api/bootstrap");
  uiState.draftInstruction = payload.lastInstruction;
  renderAll(payload);
}

async function handleOnboardingSubmit(form) {
  const payload = {
    institutionName: form.institutionName.value,
    institutionType: form.institutionType.value,
    learnerGroup: form.learnerGroup.value,
    operatingGoal: form.operatingGoal.value,
    biggestPain: form.biggestPain.value
  };
  const response = await request("/api/onboarding", {
    method: "POST",
    body: JSON.stringify(payload)
  });
  renderAll(response);
}

async function handleRun() {
  const instruction = (uiState.draftInstruction || "").trim();
  const response = await request("/api/dispatch", {
    method: "POST",
    body: JSON.stringify({
      instruction: instruction || uiState.bootstrap.lastInstruction
    })
  });
  uiState.draftInstruction = response.lastInstruction;
  renderAll(response);
}

async function handleApprovalDecision(approvalId, decision) {
  const response = await request(`/api/approvals/${approvalId}/decision`, {
    method: "POST",
    body: JSON.stringify({ decision })
  });
  renderAll(response);
}

async function handleReset() {
  const response = await request("/api/reset", {
    method: "POST",
    body: JSON.stringify({})
  });
  uiState.pausedAgents.clear();
  uiState.selectedAgent = "Operations Orchestrator";
  uiState.searchQuery = "";
  uiState.draftInstruction = response.lastInstruction;
  uiState.activeNav = "Dashboard";
  uiState.activeWork = "Operational Cases";
  uiState.activeProject = "Operations HQ";
  document.getElementById("quickSearch").value = "";
  renderAll(response);
}

document.addEventListener("submit", async (event) => {
  if (event.target.id !== "onboardingForm") return;
  event.preventDefault();
  await handleOnboardingSubmit(event.target);
});

document.addEventListener("click", async (event) => {
  const navButton = event.target.closest("[data-nav]");
  if (navButton) {
    uiState.activeNav = navButton.dataset.nav;
    renderAll(uiState.bootstrap);
    scrollToSection(NAV_SECTION_MAP[uiState.activeNav]);
    return;
  }

  const projectButton = event.target.closest("[data-project-name]");
  if (projectButton) {
    const projectName = projectButton.dataset.projectName;
    uiState.activeProject = projectName;
    uiState.activeNav = "Dashboard";
    const mappedAgent = PROJECT_AGENT_MAP[projectName];
    if (mappedAgent) {
      uiState.selectedAgent = mappedAgent;
    }
    renderAll(uiState.bootstrap);
    scrollToSection("agentHero");
    return;
  }

  const workButton = event.target.closest("[data-work-name]");
  if (workButton) {
    uiState.activeWork = workButton.dataset.workName;
    renderAll(uiState.bootstrap);
    scrollToSection(WORK_SECTION_MAP[uiState.activeWork]);
    return;
  }

  const agentButton = event.target.closest("[data-agent-name]");
  if (agentButton) {
    uiState.selectedAgent = agentButton.dataset.agentName;
    uiState.activeNav = "Dashboard";
    syncSidebarSelectionFromAgent();
    renderAll(uiState.bootstrap);
    return;
  }

  const actionButton = event.target.closest("[data-action]");
  if (actionButton) {
    const action = actionButton.dataset.action;
    if (action === "invoke") {
      await handleRun();
      return;
    }
    if (action === "focus-command") {
      uiState.activeNav = "Dashboard";
      document.getElementById("instructionInput")?.focus();
      scrollToSection("commandCenter");
      return;
    }
    if (action === "toggle-pause") {
      if (uiState.pausedAgents.has(uiState.selectedAgent)) {
        uiState.pausedAgents.delete(uiState.selectedAgent);
      } else {
        uiState.pausedAgents.add(uiState.selectedAgent);
      }
      renderAll(uiState.bootstrap);
      return;
    }
  }

  if (event.target.id === "resetButton") {
    await handleReset();
    return;
  }

  const approvalButton = event.target.closest("[data-approval-id]");
  if (approvalButton) {
    await handleApprovalDecision(approvalButton.dataset.approvalId, approvalButton.dataset.decision);
  }
});

document.addEventListener("input", (event) => {
  if (event.target.id === "quickSearch") {
    uiState.searchQuery = event.target.value;
    renderAll(uiState.bootstrap);
    return;
  }
  if (event.target.id === "instructionInput") {
    uiState.draftInstruction = event.target.value;
  }
});

document.querySelectorAll(".primary-nav .nav-item").forEach((item) => {
  item.dataset.nav = item.textContent.trim();
});

loadBootstrap().catch((error) => {
  console.error(error);
  document.body.innerHTML = `<pre>앱 초기화 실패: ${escapeHtml(error.message)}</pre>`;
});
