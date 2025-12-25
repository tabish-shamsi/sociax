"use server"

import imagekit from "@/lib/imagekit";

export default async function uploadImage(file: File) {
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
}