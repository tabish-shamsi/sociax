import { connectToDatabase } from "@/lib/db";
import Album from "@/models/Album";
import User from "@/models/User";
import { unstable_cache } from "next/cache";

const getAlbums = (username: string) => unstable_cache(
    async () => {
        await connectToDatabase()
        const user = await User.findOne({ username }).select("_id")
        if (!user) return null

        const albums = Album.aggregate([
            { $match: { userId: user._id } },

            {
                $lookup: {
                    from: "images",          // collection name
                    localField: "_id",
                    foreignField: "albumId",
                    as: "images",
                },
            },

            // Optional: sort images inside album
            {
                $addFields: {
                    images: {
                        $sortArray: {
                            input: "$images",
                            sortBy: { createdAt: -1 },
                        },
                    },
                },
            },
        ])

        return albums
    },
    [`images-${username}`],
    { tags: [`images-${username}`] }
)

export default getAlbums