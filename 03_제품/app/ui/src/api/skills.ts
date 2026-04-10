import { api } from "./client"

export const skillsApi = {
  list: () => api.get<any[]>("/skills"),
  get: (slug: string) => api.get<any>(`/skills/${slug}`),
  install: (orgId: string, slug: string) =>
    api.post<any>(`/organizations/${orgId}/skills`, { slug }),
  uninstall: (orgId: string, slug: string) =>
    api.delete<void>(`/organizations/${orgId}/skills/${slug}`),
}
