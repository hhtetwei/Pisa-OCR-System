
import { z } from 'zod';
import { TFunction } from 'i18next';
import { createUserSchema } from '@/features/user/schemas';

export const createAdminSchema = (t: TFunction) =>
  z.object({
    user: createUserSchema(t),
  });

export type CreateAdminDto = z.infer<ReturnType<typeof createAdminSchema>>;
