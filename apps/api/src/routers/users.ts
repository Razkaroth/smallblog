import { SetAdminInputZod, UserOutputZod } from '@smalldata/interfaces';
import { publicProcedure } from '../procedures/public';
import { router } from '../trcp';
import { z } from 'zod';
import { adminProcedure, privateProcedure } from '../procedures/private';

export const usersRouter = router({
  getUsers: publicProcedure
    .output(z.array(UserOutputZod))
    .query(async ({ ctx }) => {
      const prisma = ctx.prisma;
      return prisma.user.findMany();
    }),
  getUser: publicProcedure
    .input(z.number())
    .output(UserOutputZod)
    .query(async ({ input, ctx }) => {
      const prisma = ctx.prisma;
      const user = await prisma.user.findUnique({
        where: {
          id: input,
        },
      });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    }),
  setAdmin: adminProcedure
    .input(SetAdminInputZod)
    .output(UserOutputZod)
    .mutation(async ({ input, ctx }) => {
      const prisma = ctx.prisma;
      return prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          isAdmin: input.isAdmin,
        },
      });
    }),
});
