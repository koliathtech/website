import { z } from "zod"

export const careersSchema = z.object({
    name: z.string().min(3).max(30),
    email: z.email(),
    contact: z.number(),
    linkedin: z.string(),
})
