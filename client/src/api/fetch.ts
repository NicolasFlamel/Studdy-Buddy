import { API } from '@/lib/api';
import type {
  ScoresFormType,
  SubjectEnumType,
} from '@studdy-buddy/shared/schemas/scores';
import type { CreateUserSchemaType } from '@studdy-buddy/shared/schemas/users';

const apiPost = (url: string, options?: RequestInit) =>
  fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

// Auth

export const registerPost = ({ username, password }: CreateUserSchemaType) =>
  apiPost(API.auth.register(), {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });

export const loginPost = ({ username, password }: CreateUserSchemaType) =>
  apiPost(API.auth.login(), {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });

export const logoutPost = () =>
  apiPost(API.auth.logout(), {
    method: 'POST',
  });

export const fetchAuthMe = (options?: RequestInit) =>
  fetch(API.auth.me(), options);

// Users

export const fetchUserMe = (options?: RequestInit) =>
  fetch(API.users.me(), options);

// Scores

export const fetchAssessment = (options?: RequestInit) =>
  fetch(API.scores.base(), options);

export const postAssessment = (scores: ScoresFormType) =>
  apiPost(API.scores.base(), {
    method: 'POST',
    body: JSON.stringify(scores),
  });

// Chats

export const fetchChatMetadataWithId = (id: string, options?: RequestInit) =>
  fetch(API.chats.metadataById(id), options);

type CreateChatDataType = { subject: SubjectEnumType };
export const createChat = (data: CreateChatDataType) =>
  apiPost(API.chats.base(), {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const findChat = (options?: RequestInit) =>
  apiPost(API.chats.match(), {
    ...options,
    method: 'POST',
  });
