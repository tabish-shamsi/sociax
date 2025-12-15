import { z } from "zod";

export const personal_info_schema = z.object({
    about_me: z.string().min(5, "About me cannot be less than five characters").max(150, "Cannot be more than 150 characters").optional(),
    birthday: z.string().optional(),
    birthplace: z.string().optional(),
    lives_in: z.string().optional(),
    occupation: z.string().optional(),
    gender: z.string().optional(),
    status: z.string().optional(),
    website: z.string().optional(),
})
