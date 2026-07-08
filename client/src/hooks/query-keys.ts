export const queryKeys = {
  auth: ['me'] as const,
  users: {
    all: ['users'] as const,
    byId: (id: string) => [...queryKeys.users.all, id] as const,
  },
  schedules: {
    all: ['schedules'] as const,
    byId: (id: string) => [...queryKeys.schedules.all, id] as const,
    byUserId: (userId: string) =>
      [...queryKeys.schedules.all, { userId }] as const,
  },
};
