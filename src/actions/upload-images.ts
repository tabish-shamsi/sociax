"use server";

import imagekit from "@/lib/imagekit";

export async function uploadImages(formData: FormData) {
    const files = formData.getAll("files") as File[];

    if (!files.length) {
        throw new Error("No files provided");
    }

    const uploads = await Promise.all(
        files.map(async (file) => {
            // validation
            if (!file.type.startsWith("image/")) {
                throw new Error("Only images allowed");
            }

            const buffer = Buffer.from(await file.arrayBuffer());

            const res = await imagekit.upload({
                file: buffer,
                fileName: file.name,
                folder: "uploads",
            });

            return {
                url: res.url,
                fileId: res.fileId,
            };
        })
    );

    return uploads;
}