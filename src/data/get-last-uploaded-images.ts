import { connectToDatabase } from "@/lib/db";
import Image from "@/models/Image";
import User from "@/models/User";
import { unstable_cache } from "next/cache";

const getLastUploadedImages = (username: string) => unstable_cache(
    async () => {
        await connectToDatabase()
        const user = await User.findOne({ username }).select("_id")
        if (!user) return null

        const images = Image.find({ userId: user._id }).sort({ createdAt: -1 }).limit(9)
        return images
    },
    [`images-${username}`],
    {
        tags: [`images-${username}`],
    }
)

export default getLastUploadedImages