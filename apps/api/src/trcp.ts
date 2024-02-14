import type { CreateHTTPContextOptions } from '@trpc/server/adapters/standalone';
import { initTRPC } from '@trpc/server';

export async function createContext(options: CreateHTTPContextOptions) {
  const { req, res } = options;

  // Get token if any from the request authorization header
  const token = req.headers.authorization?.replace('Bearer ', '');

  return {
    req,
    res,
    token,
  };
}

// Define the Context type
type Context = Awaited<ReturnType<typeof createContext>>;

// Create a TRPC instance

export const t = initTRPC.context<Context>().create();

export const router = t.router;
