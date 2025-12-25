import z from "zod";

export const albumSchema = z.object({
    title: z.string().min(1, "Title is required"),
    images: z
        .array(
            z.object({
                file: z.instanceof(File, { message: "Image is required" }),
                preview: z.string(),
            })
        )
        .min(1, "Album must contain at least one image"),
})

export type albumValues = z.infer<typeof albumSchema>

export const editTitleSchema = z.object({
    title: z.string().min(1, "Title is required"),
})

export type  editTitleValues = z.infer<typeof editTitleSchema>