import { PostZod } from '../zod/post';
import { z } from 'zod';
export const PostCreationZod = PostZod.pick({ title: true });

export const PostInputZod = PostZod.pick({ id: true });

export const PostUpdateZod = PostZod.partial();

export const PaginatedPostsInputZod = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
});

export const PaginatedPostsOutputZod = z.object({
  posts: z.array(PostZod),
  total: z.number(),
  page: z.number(),
  range: z.object({
    from: z.number(),
    to: z.number(),
  }),
});
