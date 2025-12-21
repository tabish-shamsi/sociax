import "server-only"
import { getUserSession } from "./get-user-session"
import User from "@/models/User"
import { connectToDatabase } from "@/lib/db"

export async function getInterests(id: string) {
    try {
        await connectToDatabase()
        const user = await User.findById(id).select("interests")
        if (!user) {
            return { success: false, message: "User not found" }
        }

        return { success: true, data: user.interests.toObject() }
    } catch (error) {
        console.error(error)
        return { success: false, message: "Something went wrong while getting interests" }
    }
}