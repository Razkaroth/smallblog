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
