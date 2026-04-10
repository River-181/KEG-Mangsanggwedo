import { api } from "./client"

export const approvalsApi = {
  list: (orgId: string) => api.get<any[]>(`/organizations/${orgId}/approvals`),
  get: (id: string) => api.get<any>(`/approvals/${id}`),
  approve: (id: string, data?: unknown) =>
    api.post<any>(`/approvals/${id}/approve`, data ?? {}),
  reject: (id: string, data?: unknown) =>
    api.post<any>(`/approvals/${id}/reject`, data ?? {}),
}
