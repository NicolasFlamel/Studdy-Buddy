import type { CreateScheduleSchemaType } from '@studdy-buddy/shared/schemas';

export type ResAuthUser = {
  id: string;
  username: string;
};

export type PostScheduleAPIReqBody = Omit<CreateScheduleSchemaType, 'userId'>;

export type Serialized<T> = T extends Date
  ? string
  : T extends Array<infer U>
    ? Serialized<U>[]
    : T extends object
      ? { [K in keyof T]: Serialized<T[K]> }
      : T;
