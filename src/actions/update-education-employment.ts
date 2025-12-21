"use server"

import { getUserSession } from "@/data/get-user-session";
import { connectToDatabase } from "@/lib/db";
import User, { Education_Employment } from "@/models/User";
import { revalidatePath } from "next/cache";

export async function updateEducationEmployment(data: Education_Employment[]) {
    try {
        const { id } = await getUserSession()

        await connectToDatabase()
        const user = await User.findById(id)
        if (!user) {
            return { success: false, message: "User not found" }
        }

        user.education_employment = data
        await user.save()

        revalidatePath(`/${id}/about`)
        return { success: true, message: "Successfully updated educaiton and employment" }
    } catch (error) {
        console.error(error)
        return { success: false, message: "Something went wrong while updating Interests" }
    }
}