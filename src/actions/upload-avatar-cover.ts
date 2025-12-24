"use server"

import { getUserSession } from "@/data/get-user-session"
import { connectToDatabase } from "@/lib/db"
import imagekit from "@/lib/imagekit"
import User from "@/models/User"
import { revalidatePath, revalidateTag } from "next/cache"
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

        revalidateTag(`profile-header-${user.username}`, "")
        return { success: true, message: `${type} uploaded successfully`}
    } catch (error) {
        console.error(error)
        return { success: false, message: `Something went wrong while uploading ${type}. Please try again later` }
    }
}