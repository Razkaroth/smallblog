import { z } from 'zod';
import { UserZod } from '../zod/user';

export const UserInputZod = UserZod.pick({ email: true, password: true });

export const UserUpdateZod = UserZod.partial();

export const UserOutputZod = UserZod.omit({ password: true });

// Type definitions for the user model
export type UserInput = z.infer<typeof UserInputZod>;

export type UserUpdate = z.infer<typeof UserUpdateZod>;

export type UserOutput = z.infer<typeof UserOutputZod>;
