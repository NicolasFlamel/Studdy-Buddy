import type { CreateScheduleSchemaType } from '@studdy-buddy/shared/schemas';

export type ResAuthUser = {
  id: string;
  username: string;
};

export type PostScheduleAPIReqBody = Omit<CreateScheduleSchemaType, 'userId'>;
