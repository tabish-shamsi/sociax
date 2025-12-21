import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function getUserSession (){
    const session = await getServerSession(authOptions)
    if(!session) {
        redirect('/sign-in')
    } else {
        return session.user
    }
}