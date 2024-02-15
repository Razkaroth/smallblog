import { PostZod } from '../zod/post';

export const PostInputZod = PostZod.pick({ title: true });

export const PostUpdateZod = PostZod.partial();


