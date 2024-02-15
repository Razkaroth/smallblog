import { router } from '../trcp';
import { publicProcedure } from '../procedures/public';
import {
  PaginatedPostsInputZod,
  PaginatedPostsOutputZod,
  PostCreationZod,
  PostInputZod,
  PostZod,
} from '@smalldata/interfaces';
import { TRPCError } from '@trpc/server';
import { privateProcedure } from '../procedures/private';

export const postsRouter = router({
  getPost: publicProcedure
    .input(PostInputZod)
    .output(PostZod)
    .query(async ({ input, ctx }) => {
      const prisma = ctx.prisma;
      const post = await prisma.post.findUnique({
        where: {
          id: input.id,
        },
      });
      if (!post) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Post not found',
        });
      }
      return post;
    }),
  getPosts: publicProcedure
    .input(PaginatedPostsInputZod)
    .output(PaginatedPostsOutputZod)
    .query(async ({ input, ctx }) => {
      const prisma = ctx.prisma;
      const page = input.page ?? 1;
      const limit = input.limit ?? 10;
      const total = await prisma.post.count();
      const posts = await prisma.post.findMany({
        skip: (page - 1) * limit,
        take: limit,
      });
      return {
        posts,
        total,
        page,
        range: {
          from: (page - 1) * limit,
          to: page * limit < total ? page * limit : total,
        },
      };
    }),
  createPost: privateProcedure
    .input(PostCreationZod)
    .output(PostZod)
    .mutation(async ({ input, ctx }) => {
      const prisma = ctx.prisma;
      const post = await prisma.post.create({
        data: {
          title: input.title,
          authorId: ctx.user!.id,
          content: '',
        },
      });
      return post;
    }),
});
