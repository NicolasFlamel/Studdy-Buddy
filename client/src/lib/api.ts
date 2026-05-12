const BASE = '/api' as const;

export const API = {
  users: {
    base: () => `${BASE}/users` as const,
    byId: (userId: string) => `${API.users.base()}/${userId}` as const,
    me: () => `${API.users.base()}/me` as const,
    schedule: (userId: string) => `${API.users.byId(userId)}/schedules`,
  },
  auth: {
    base: () => `${BASE}/auth` as const,
    register: () => `${API.auth.base()}/register` as const,
    login: () => `${API.auth.base()}/login` as const,
    logout: () => `${API.auth.base()}/logout` as const,
    me: () => `${API.auth.base()}/me` as const,
  },
  scores: {
    base: () => `${BASE}/scores` as const,
  },
  chats: {
    base: () => `${BASE}/chats` as const,
    metadataById: (id: string) => `${API.chats.base()}/${id}/metadata` as const,
    match: () => `${API.chats.base()}/match` as const,
  },
  schedules: {
    base: () => `${BASE}/schedules` as const,
    byId: (scheduleId: string) =>
      `${API.schedules.base()}/${scheduleId}` as const,
  },
} as const;
