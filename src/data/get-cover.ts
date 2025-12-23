

import { connectToDatabase } from "@/lib/db"
import { getUserSession } from "./get-user-session"
import User from "@/models/User"

export default async function getCover() {
    try {
        const userId = (await getUserSession()).id
        if (!userId) return { success: false, message: "Please sigin to use this feature." }

        await connectToDatabase()
        const user = await User.findById(userId).select("cover")
        if (!user) return { success: false, message: "User not found." }
        return { success: true, data: user.cover }
    } catch (error) {
        console.error(error)
        return { success: false, message: "Something went wrong while getting user data." }
    }
}