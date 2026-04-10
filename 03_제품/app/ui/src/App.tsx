import { Routes, Route, Navigate } from "react-router-dom"
import { Layout } from "@/components/Layout"
import { DashboardPage } from "@/pages/DashboardPage"
import { InboxPage } from "@/pages/InboxPage"
import { CasesPage } from "@/pages/CasesPage"
import { CaseNewPage } from "@/pages/CaseNewPage"
import { CaseDetailPage } from "@/pages/CaseDetailPage"
import { ApprovalsPage } from "@/pages/ApprovalsPage"
import { ApprovalDetailPage } from "@/pages/ApprovalDetailPage"
import { AgentsPage } from "@/pages/AgentsPage"
import { AgentDetailPage } from "@/pages/AgentDetailPage"
import { SchedulePage } from "@/pages/SchedulePage"
import { ActivityPage } from "@/pages/ActivityPage"
import { SkillsPage } from "@/pages/SkillsPage"
import { SettingsPage } from "@/pages/SettingsPage"
import { OnboardingPage } from "@/pages/OnboardingPage"
import { DesignGuidePage } from "@/pages/DesignGuidePage"
import { OrgChartPage } from "@/pages/OrgChartPage"
import { DocumentsPage } from "@/pages/DocumentsPage"
import { NewAgentPage } from "@/pages/NewAgentPage"
import { RoutinesPage } from "@/pages/RoutinesPage"
import { GoalsPage } from "@/pages/GoalsPage"
import { CostsPage } from "@/pages/CostsPage"
import { ProjectsPage } from "@/pages/ProjectsPage"
import { ProjectDetailPage } from "@/pages/ProjectDetailPage"
import { StudentsPage } from "@/pages/StudentsPage"

export function App() {
  return (
    <Routes>
      <Route path="/:orgPrefix" element={<Layout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="inbox" element={<InboxPage />} />
        <Route path="cases" element={<CasesPage />} />
        <Route path="cases/new" element={<CaseNewPage />} />
        <Route path="cases/:id" element={<CaseDetailPage />} />
        <Route path="approvals" element={<ApprovalsPage />} />
        <Route path="approvals/:id" element={<ApprovalDetailPage />} />
        <Route path="agents" element={<AgentsPage />} />
        <Route path="agents/:id" element={<AgentDetailPage />} />
        <Route path="org" element={<OrgChartPage />} />
        <Route path="schedule" element={<SchedulePage />} />
        <Route path="activity" element={<ActivityPage />} />
        <Route path="skills" element={<SkillsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="onboarding" element={<OnboardingPage />} />
        <Route path="documents" element={<DocumentsPage />} />
        <Route path="documents/:id" element={<DocumentsPage />} />
        <Route path="agents/new" element={<NewAgentPage />} />
        <Route path="routines" element={<RoutinesPage />} />
        <Route path="goals" element={<GoalsPage />} />
        <Route path="costs" element={<CostsPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="projects/:id" element={<ProjectDetailPage />} />
        <Route path="students" element={<StudentsPage />} />
        <Route path="students/:id" element={<StudentsPage />} />
      </Route>
      <Route path="/design-guide" element={<DesignGuidePage />} />
      <Route path="/" element={<Navigate to="/tanzania/dashboard" replace />} />
    </Routes>
  )
}
