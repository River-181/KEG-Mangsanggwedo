// v0.3.0
import { api } from "./client"

export const studentsApi = {
  list: (orgId: string) => api.get<any[]>(`/organizations/${orgId}/students`),
  get: (id: string) => api.get<any>(`/students/${id}`),
}

export const instructorsApi = {
  list: (orgId: string) => api.get<any[]>(`/organizations/${orgId}/instructors`),
}
