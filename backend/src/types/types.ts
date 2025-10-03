import { z } from "zod"

export const careersSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Name must be at least 3 characters long" })
        .max(30, { message: "Name cannot exceed 30 characters" }),
    email: z.email({ message: "Please provide a valid email address" }),
    contact: z.number({ message: "Contact must be a number" }),
    linkedin: z
        .string()
        .min(5, { message: "LinkedIn URL must be at least 5 characters long" }),
})
