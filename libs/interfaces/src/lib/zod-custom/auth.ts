import { z } from 'zod';
import { UserOutputZod } from './user';
import { UserZod } from '../zod/user';

export const AuthOutputZod = z.object({
  token: z.string(),
  user: UserOutputZod,
});

export const AuthInputZod = UserZod.pick({ email: true, password: true });

export const AuthRegisterOutputZod = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  user: UserOutputZod.optional(),
});

export const SetAdminInputZod = z.object({
  id: z.number(),
  isAdmin: z.boolean(),
});

// types
export type AuthInput = z.infer<typeof AuthInputZod>;
export type AuthOutput = z.infer<typeof AuthOutputZod>;
export type AuthRegisterOutput = z.infer<typeof AuthRegisterOutputZod>;
export type SetAdminInput = z.infer<typeof SetAdminInputZod>;
