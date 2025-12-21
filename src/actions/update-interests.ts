"use server"

import { getUserSession } from "@/data/get-user-session";
import { connectToDatabase } from "@/lib/db";
import User, { Interests } from "@/models/User";
import { revalidatePath } from "next/cache";

export async function updateInterests(data: Interests) {
    try {
        const userSession = await getUserSession()

        await connectToDatabase()
        const user = await User.findByIdAndUpdate(userSession.id, { $set: { "interests": data } })
        if (!user) {
            return { success: false, message: "User not found" }
        }
        revalidatePath(`/${userSession.id}/about`)
        return { success: true, message: "Successfully updated the user interests" }
    } catch (error) {
        console.error(error)
        return { success: false, message: "Something went wrong while updating Interests" }
    }
}