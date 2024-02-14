import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { publicProcedure } from './procedures/public';
import { createContext, router } from './trcp';

const appRouter = router({
  greeting: publicProcedure.query(() => 'hello tRPC v11!'),
});


export type AppRouter = typeof appRouter;


const server = createHTTPServer({
  router: appRouter,
  createContext,
});

console.log('Listening on http://localhost:3000');
server.listen(3000);

