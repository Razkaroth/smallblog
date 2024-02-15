import { TRPCError } from '@trpc/server';
import { publicProcedure } from './public';

export const privateProcedure = publicProcedure.use(async ({ ctx, next }) => {
  if (!ctx.token) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Missing token',
    });
  } else if (ctx.token.split('|')[0] !== 'valid token') {
    // TODO: Do some real token validation here

    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Invalid token',
    });
  }
  const prisma = ctx.prisma;
  const userId = ctx.token.split('|')[1];
  const user = await prisma.user.findUnique({
    where: {
      id: +userId,
    },
  });

  if (!user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Invalid token',
    });
  }
  ctx.user = user;



  return next();
});
