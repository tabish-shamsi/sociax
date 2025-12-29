import User from "@/models/User";
import { unstable_cache } from "next/cache";

export const getUserBasicInfo = (username: string) => unstable_cache(
    async () => {
        const user = await User.findOne({username}).select("username firstName lastName email")
        if(!user) return null
        return user.toObject()
    }, 

    [`basic-info-${username}`],
    {
        tags: [`basic-info-${username}`]
    }
)