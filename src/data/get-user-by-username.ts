import { connectToDatabase } from "@/lib/db"
import User from "@/models/User"

export default async function getUserByUsername(select: string, username: string) {
    try {
        await connectToDatabase()
        const user = await User.findOne({ username }).select(select)
        if (!user) {
            return { success: false, message: "User not found" }
        }

        return { success: true, data: user }
    } catch (error) {
        console.error(error)
        return { success: false, message: "Something went wrong while getting user data" }
    }
}