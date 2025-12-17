import { z } from "zod";

export const personal_info_schema = z.object({
    about_me: z.string().optional(),
    birthday: z.date().optional(),
    birthplace: z.string().optional(),
    lives_in: z.string().optional(),
    occupation: z.string().optional(),
    gender: z.string().optional(),
    status: z.string().optional(),
    website: z.string().optional(),
    Facebook: z.string().optional(),
    Instagram: z.string().optional(),
    Twitter: z.string().optional()
})
