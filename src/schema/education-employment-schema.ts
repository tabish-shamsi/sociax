import { z } from "zod";

export const educationItemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  timestamp: z.string().min(1, "Time period is required"),
  description: z.string().min(1, "Description is required"),
});

export const educationAndEmploymentSchema = z.object({
  items: z.array(educationItemSchema),
});

export type EducationAndEmploymentFormValues = z.infer<
  typeof educationAndEmploymentSchema
>;
