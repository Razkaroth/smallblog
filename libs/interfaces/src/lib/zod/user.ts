import * as z from "zod"
import { CompletePost, RelatedPostZod } from "./index"

export const UserZod = z.object({
  id: z.number().int(),
  email: z.string(),
  name: z.string().nullish(),
  password: z.string(),
})

export interface CompleteUser extends z.infer<typeof UserZod> {
  posts: CompletePost[]
}

/**
 * RelatedUserZod contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserZod: z.ZodSchema<CompleteUser> = z.lazy(() => UserZod.extend({
  posts: RelatedPostZod.array(),
}))
