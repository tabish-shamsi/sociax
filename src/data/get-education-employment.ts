import "server-only"
import { getUserSession } from "./get-user-session"
import { connectToDatabase } from "@/lib/db"
import User from "@/models/User"

export async function getEducationEmployment() {
    try {
        const { id } = await getUserSession()

        await connectToDatabase()
        const user = await User.findById(id).select("education_employment")
        if (!user) {
            return { success: false, message: "User not found" }
        }

        const education_employment = user.education_employment.map((item: any) => ({
            ...item.toObject(),
            _id: item._id.toString()
        }))

        return { success: true, data: education_employment }
    } catch (error) {
        console.error(error)
        return { success: false, message: "Something went wrong while getting interests" }
    }
}