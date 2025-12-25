"use server"

import { getUserSession } from "@/data/get-user-session"
import { connectToDatabase } from "@/lib/db"
import Album from "@/models/Album"
import Image, { type Image as ImageType } from "@/models/Image";
import { revalidateTag } from "next/cache"
import imagekit from "@/lib/imagekit";

export async function createAlbum(title: string, images: { fileId: string; url: string; }[]) {

    try {
        await connectToDatabase()
        const { id, username } = await getUserSession()

        // 2️⃣ Create album in MongoDB
        const album = await Album.create({
            title,
            userId: id,
            slug: title.toLowerCase().replace(/ /g, "-"),
        })

        // 3️⃣ Save images linked to album
        await Image.insertMany(
            images.map((img) => ({
                fileId: img.fileId,
                url: img.url,
                albumId: album._id,
                userId: id,
            }))
        )

        // 4️⃣ Revalidate cache
        revalidateTag(`images-${username}`, "")

        return { success: true, message: "Album created successfully" }
    } catch (error) {
        console.error(error)
        return {
            success: false,
            message: "Something went wrong while creating album",
        }
    }
}
 
export async function deleteAlbum(albumId: string) {
    try {
        const { id, username } = await getUserSession()
        if (!id) return { success: false, message: "Unauthorized" }

        await connectToDatabase()

        // First, find all images to get their fileIds for ImageKit deletion
        const images = await Image.find({ albumId, userId: id });

        // Delete images from ImageKit
        const deleteFromImagekit = images.map(async (image: ImageType) => {
            await imagekit.deleteFile(image.fileId)
        })

        // Wait for all ImageKit deletions to complete
        await Promise.all(deleteFromImagekit);

        // Delete images from database
        await Image.deleteMany({ albumId, userId: id });

        // Delete the album
        await Album.findByIdAndDelete(albumId);

        revalidateTag(`images-${username}`, "")

        return { success: true, message: "Album deleted successfully" };

    } catch (error) {
        console.error("Error deleting album:", error);
        return { success: false, message: "Failed to delete album" };
    }
}

export async function updateAlbum(albumId: string, title: string) {
    try {
        const { id, username } = await getUserSession()
        if (!id) return { success: false, message: "Unauthorized" }

        await connectToDatabase()

        // Update the album
        await Album.findByIdAndUpdate(albumId, { title })

        revalidateTag(`images-${username}`, "")

        return { success: true, message: "Album updated successfully" };

    } catch (error) {
        console.error("Error updating album:", error);
        return { success: false, message: "Failed to update album" };
    }
}