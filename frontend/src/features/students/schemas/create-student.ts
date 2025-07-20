
import { z } from 'zod';
import { TFunction } from 'i18next';
import { createUserSchema } from '@/features/user/schemas';

export const createStudentSchema = (t: TFunction) =>
  z.object({
    parentEmail: z.string().email(t('Invalid email')),
    user: createUserSchema(t),
  });

export type CreateStudentDto = z.infer<ReturnType<typeof createStudentSchema>>;
