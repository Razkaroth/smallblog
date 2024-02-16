import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { publicProcedure } from './procedures/public';
import { createContext, router } from './trcp';
import { usersRouter } from './routers/users';
import { postsRouter } from './routers/posts';
import { authRouter } from './routers/auth';
import cors from 'cors';

const appRouter = router({
  greeting: publicProcedure.query(() => 'hello tRPC v11!'),
  auth: authRouter,
  users: usersRouter,
  posts: postsRouter,
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  middleware: cors(),
  router: appRouter,
  createContext,
});

console.log('Listening on http://localhost:3000');
server.listen(3000);
