import { API } from '@/lib/api';
import type { PostScheduleAPIReqBody } from '@/types/api';
import type {
  ScoresFormType,
  SubjectEnumType,
  CreateUserSchemaType,
  EditScheduleSchemaType,
} from '@studdy-buddy/shared/schemas';

const apiPost = (url: string, options?: RequestInit) =>
  fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    ...options,
  });

// Auth

export const registerPost = ({ username, password }: CreateUserSchemaType) =>
  apiPost(API.auth.register(), {
    body: JSON.stringify({ username, password }),
  });

export const loginPost = ({ username, password }: CreateUserSchemaType) =>
  apiPost(API.auth.login(), {
    body: JSON.stringify({ username, password }),
  });

export const logoutPost = () => apiPost(API.auth.logout(), {});

export const fetchAuthMe = (options?: RequestInit) =>
  fetch(API.auth.me(), options);

// Users

export const fetchUserMe = (options?: RequestInit) =>
  fetch(API.users.me(), options);
export const fetchUserProfile = (userId: string, options?: RequestInit) =>
  fetch(API.users.byId(userId), options);

// Scores

export const fetchAssessment = (options?: RequestInit) =>
  fetch(API.scores.base(), options);

export const postAssessment = (scores: ScoresFormType) =>
  apiPost(API.scores.base(), {
    body: JSON.stringify(scores),
  });

// Chats

export const fetchChatMetadataWithId = (id: string, options?: RequestInit) =>
  fetch(API.chats.metadataById(id), options);

type CreateChatDataType = { subject: SubjectEnumType };
export const createChat = (data: CreateChatDataType) =>
  apiPost(API.chats.base(), {
    body: JSON.stringify(data),
  });

export const findChat = (options?: RequestInit) =>
  apiPost(API.chats.match(), {
    ...options,
  });

// Schedules

export const createSchedule = (
  data: PostScheduleAPIReqBody,
  options?: RequestInit,
) =>
  apiPost(API.schedules.base(), {
    body: JSON.stringify(data),
    ...options,
  });

export const editSchedule = (
  data: EditScheduleSchemaType,
  options?: RequestInit,
) =>
  apiPost(API.schedules.byId(data.id), {
    body: JSON.stringify(data),
    ...options,
  });

export const deleteSchedule = (scheduleId: string, options?: RequestInit) =>
  fetch(API.schedules.byId(scheduleId), {
    headers: { 'Content-Type': 'application/json' },
    method: 'DELETE',
    ...options,
  });
