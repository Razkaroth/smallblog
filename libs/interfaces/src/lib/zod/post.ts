import * as z from "zod"
import { CompleteUser, RelatedUserZod } from "./index"

export const PostZod = z.object({
  id: z.number().int(),
  title: z.string(),
  content: z.string(),
  published: z.boolean(),
  authorId: z.number().int(),
})

export interface CompletePost extends z.infer<typeof PostZod> {
  author: CompleteUser
}

/**
 * RelatedPostZod contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPostZod: z.ZodSchema<CompletePost> = z.lazy(() => PostZod.extend({
  author: RelatedUserZod,
}))
