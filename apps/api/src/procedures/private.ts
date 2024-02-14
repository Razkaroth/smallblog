import { TRPCError } from '@trpc/server';
import { publicProcedure } from './public';

export const privateProcedure = publicProcedure.use(({ ctx, next }) => {
  if (!ctx.token) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Missing token',
    });
  } else if (ctx.token !== 'secret') {
    // TODO: Do some real token validation here

    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Invalid token',
    });
  }
  return next();
});
