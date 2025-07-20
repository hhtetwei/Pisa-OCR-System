import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().nonempty('Email is required').email('Invalid email'),
  password: z.string().nonempty('Password is required'),
  rememberMe: z.boolean().default(false),
});

export type LoginFormInput = z.infer<typeof loginSchema>;
export type LoginDto = z.output<typeof loginSchema>;