"use server"

import { getUserSession } from "@/data/get-user-session"
import { connectToDatabase } from "@/lib/db"
import Album from "@/models/Album"
import Image from "@/models/Image"
import User from "@/models/User"
import { revalidateTag } from "next/cache"
export async function uploadAvatarCover(type: "Avatar" | "Cover", image: { url: string; fileId: string }) {
    try {
        await connectToDatabase()
        const userId = (await getUserSession()).id
        if (!userId) return { success: false, message: "Please sign in to use this feature" }

        const user = await User.findByIdAndUpdate(userId, {
            $set: {
                [type === "Avatar" ? "avatar" : "cover"]: image
            }
        }).select("")

        if (!user) return { success: false, message: `Something went wrong while uploading ${type}. Please try again later` }

        let albumId;

        const albumExists = await Album.findOne({
            userId: user._id,
            slug: type.toLowerCase() + "-images"
        })

        if (!albumExists) {
            const createAlbum = await Album.create({
                title: type + " Images",
                userId: user._id,
                slug: type.toLowerCase() + "-images",
            })
            albumId = createAlbum._id
        } else {
            albumId = albumExists._id
        }

        await Image.create({
            userId: user._id,
            fileId: image.fileId,
            albumId,
            url: image.url
        })

        revalidateTag(`profile-header-${user.username}`, "")
        revalidateTag(`images-${user.username}`, "")

        return { success: true, message: `${type} uploaded successfully` }
    } catch (error) {
        console.error(error)
        return { success: false, message: `Something went wrong while uploading ${type}. Please try again later` }
    }
}