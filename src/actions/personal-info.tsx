"use server"

import { connectToDatabase } from "@/lib/db"
import User, { PersonalInfo, Social } from "@/models/User"
import { personalInfoSchema } from "@/schema/personal-info"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"



export async function updatePersonalInfo(data: unknown) {
    const parsed = personalInfoSchema.safeParse(data)
    if (!parsed.success) {
        return { success: false, message: parsed.error.message }
    }

    try {
        const session = await getServerSession()
        if (!session) {
            return { success: false, message: "You must be logged in to update your personal info" }
        }

        await connectToDatabase()
        const user = await User.findOne({ email: session.user?.email })
        if (!user) {
            return { success: false, message: "User not found" }
        }

        user.personalInfo = parsed.data
        await user.save()

        revalidatePath("/profile")
        return { success: true, message: "Personal info updated successfully" }
    } catch (error: any) {
        console.error(error)
        return { success: false, message: error.message || "Something went wrong" }
    }
}

export async function getPersonalInfo() {
    try {
        const session = await getServerSession()
        if (!session) {
            return { success: false, message: "You must be logged in to get your personal info" }
        }

        await connectToDatabase()
        const user = await User.findOne({ email: session.user?.email }).select("personalInfo")
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