import "server-only"

import { connectToDatabase } from "@/lib/db"
import User from "@/models/User"

export async function getPersonalInfo(id: string) {
    try {
        await connectToDatabase()
        const user = await User.findById(id).select("personalInfo")
        if (!user) {
            return { success: false, message: "User not found" }
        }

        const personalInfo = {
            ...user.personalInfo.toObject(),
            birthday: user.personalInfo.birthday,
            joined: user.personalInfo.joined,
            socials: user.personalInfo.socials.map((social: any) => ({
                ...social.toObject(),
                _id: social._id.toString()
            }))
        }

        return { success: true, message: "Personal info fetched successfully", data: personalInfo }
    } catch (error: any) {
        console.error(error)
        return { success: false, message: error.message || "Something went wrong" }
    }
}