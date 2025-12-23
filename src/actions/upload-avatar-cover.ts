"use server"

import { getUserSession } from "@/data/get-user-session"
import { connectToDatabase } from "@/lib/db"
import imagekit from "@/lib/imagekit"
import User from "@/models/User"
export async function uploadAvatarCover(type: "Avatar" | "Cover", file: File) {
    try {
        await connectToDatabase()
        const userId = (await getUserSession()).id
        if (!userId) return { success: false, message: "Please sign in to use this feature" }

        const buffer = Buffer.from(await file.arrayBuffer());

        const uploadImage = await imagekit.upload({
            file: buffer,
            fileName: file.name,
            folder: `/${type}s/${userId}`,
            useUniqueFileName: false
        })

        const user = await User.findByIdAndUpdate(userId, {
            $set: {
                [type === "Avatar" ? "avatar" : "cover"]: {
                    fileId: uploadImage.fileId,
                    url: uploadImage.url
                }
            }
        }).select("avatar")

        if (!user) return { success: false, message: `Something went wrong while uploading ${type}. Please try again later` }

        return { success: true, message: `${type} uploaded successfully`, data: type === "Avatar" ? user.avatar.url : "" }
    } catch (error) {
        console.error(error)
        return { success: false, message: `Something went wrong while uploading ${type}. Please try again later` }
    }
}