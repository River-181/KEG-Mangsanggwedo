// v0.3.0
import { api } from "./client"

export const schedulesApi = {
  list: (orgId: string) => api.get<any[]>(`/organizations/${orgId}/schedules`),
}
