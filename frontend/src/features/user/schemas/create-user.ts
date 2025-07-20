import { z } from 'zod';
import { TFunction } from 'i18next';

export const createUserSchema = (t: TFunction) =>
  z.object({
    name: z.string().min(1, t('Name is required')),
    surname: z.string().min(1, t('Surname is required')),
    email: z.string({ required_error: t('Email is required') }).email(t('Invalid email')),
    password: z.string().min(6, t('Password must be at least 6 characters')),
    phoneNumber: z.string().min(1, t('Phone number is required')),
  });

export type CreateUserDto = z.infer<ReturnType<typeof createUserSchema>>;
