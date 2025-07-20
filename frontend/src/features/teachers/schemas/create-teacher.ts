
import { z } from 'zod';
import { TFunction } from 'i18next';
import { createUserSchema } from '@/features/user/schemas';

export const createTeacherSchema = (t: TFunction) =>
  z.object({
    user: createUserSchema(t),
  });

export type CreateTeacherDto = z.infer<ReturnType<typeof createTeacherSchema>>;
