import * as z from "zod";

export const createGroupSchema = z.object({
  title: z
    .string()
    .min(3, "Group name must be at least 3 characters")
    .max(100, "Group name must be less than 100 characters"),
  friends: z
    .array(
      z.object({
        _id: z.string(),
        name: z.string(),
        avatar: z.string(),
      })
    )
    .min(1, "Select at least one friend"),
});

export type CreateGroupValues = z.infer<typeof createGroupSchema>;
