"use server";

import imagekit from "@/lib/imagekit";

export async function deleteImages(fileIds: string[]) {
    if (!fileIds.length) return;

    await Promise.all(
        fileIds.map((id) => imagekit.deleteFile(id))
    );
}
