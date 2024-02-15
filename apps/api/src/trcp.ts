import type { CreateHTTPContextOptions } from '@trpc/server/adapters/standalone';
import { initTRPC } from '@trpc/server';
import { PrismaClient, User } from '@prisma/client';
// Create prisma client

const prisma = new PrismaClient();

export async function createContext(options: CreateHTTPContextOptions) {
  const { req, res } = options;

  // Get token if any from the request authorization header
  const token = req.headers.authorization?.replace('Bearer ', '');
  let user!: User;

  return {
    req,
    res,
    token,
    prisma,
    user,
  };
}

// Define the Context type
type Context = Awaited<ReturnType<typeof createContext>> & {
  user: User | null;
};

// Create a TRPC instance

export const t = initTRPC.context<Context>().create();

export const router = t.router;
