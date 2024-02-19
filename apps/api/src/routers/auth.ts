import { TRPCError } from '@trpc/server';
import { publicProcedure } from '../procedures/public';
import { router } from '../trcp';
import {
  AuthInputZod,
  AuthOutputZod,
  AuthRegisterOutputZod,
  UserOutputZod,
} from '@smallblog/interfaces';
import { privateProcedure } from '../procedures/private';

export const authRouter = router({
  login: publicProcedure
    .output(AuthOutputZod)
    .input(AuthInputZod)
    .query(async ({ input, ctx }) => {
      // find user by email
      const prisma = ctx.prisma;

      const user = await prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'No user found with that email',
        });
      }

      if (user.password !== input.password) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid email or password',
        });
      }

      // TODO: Do some real token generation

      return {
        token: `valid token|${user.id}`,
        user,
      };
    }),
  register: publicProcedure
    .input(AuthInputZod)
    .output(AuthRegisterOutputZod)
    .query(async ({ input, ctx }) => {
      const prisma = ctx.prisma;
      try {
        const user = await prisma.user.create({
          data: {
            email: input.email,
            password: input.password,
          },
        });
        return {
          success: true,
          user,
        };
      } catch (error) {
        // TODO: Identify the error and return a more specific error message

        return {
          success: false,
          message: 'Damn... you broke it!',
        };
      }
    }),
  getCurrentUser: privateProcedure.output(UserOutputZod).query(({ ctx }) => {
    return ctx.user;
  }),
  init: publicProcedure.mutation(async ({ ctx }) => {
    // check if there are any users
    // if not, create a default user
    // else, throw an error
    const prisma = ctx.prisma;
    if ((await prisma.user.count()) === 0) {
      const user = await prisma.user.create({
        data: {
          email: 'user@example.com',
          password: 'password',
        },
      });
      return user;
    }
    throw new TRPCError({
      code: 'PRECONDITION_FAILED',
      message: 'Already initialized',
    });
  }),
});
