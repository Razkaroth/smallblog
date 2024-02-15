import { UserZod } from '../zod/user';

export const UserInputZod = UserZod.pick({ email: true, password: true });

export const UserUpdateZod = UserZod.partial();

export const UserOutputZod = UserZod.omit({ password: true });
