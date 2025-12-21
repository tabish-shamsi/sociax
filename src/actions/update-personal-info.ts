"use server"

import { getUserSession } from "@/data/get-user-session"
import { connectToDatabase } from "@/lib/db"
import User from "@/models/User"
import { personalInfoSchema } from "@/schema/personal-info"
import { revalidatePath, } from "next/cache"



export async function updatePersonalInfo(data: unknown) {
    const parsed = personalInfoSchema.safeParse(data)
    if (!parsed.success) {
        return { success: false, message: parsed.error.message }
    }

    try {
        const userSession = await getUserSession()
        await connectToDatabase()
        const user = await User.findById(userSession.id)
        if (!user) {
            return { success: false, message: "User not found" }
        }

        user.personalInfo = parsed.data
        await user.save()

        revalidatePath(`/${user._id}/about`)
        return { success: true, message: "Personal info updated successfully" }
    } catch (error: any) {
        console.error(error)
        return { success: false, message: error.message || "Something went wrong" }
    }
}

