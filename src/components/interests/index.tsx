import { connectToDatabase } from "@/lib/db"
import User, { type Interests } from "@/models/User"
import { unstable_cache } from "next/cache"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Separator } from "../ui/separator"
import InterestsSheet from "./interests-sheet"

const getInterests = (username: string) => unstable_cache(
    async () => {
        await connectToDatabase()
        const user = await User.findOne({ username }).select('interests').lean()
        return JSON.parse(JSON.stringify(user.interests ?? {}))
    },
    [`interests-${username}`],
    {
        tags: [`interests-${username}`]
    }
)

export default async function Interests({ username }: { username: string }) {
    const interests = await getInterests(username)() as Interests

    function InterestsContent() {
        return (
            Object.entries(interests).map(([key, value]) => (
                <div key={key} className="w-full">
                    <h3 className="text-sm font-medium text-card-foreground capitalize">
                        {key.split("_").join(" ")}:
                    </h3>
                    <div className="flex items-center flex-wrap gap-2 mt-4">
                        {value.split(",").map((item, i) => (
                            <span
                                key={i}
                                className="bg-muted text-muted-foreground py-1 px-2 rounded-full text-xs capitalize"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            ))
        )
    }

    function noInterests() {
        return (
            <div className="w-full">
                <h3 className="text-sm text-muted-foreground capitalize">
                    No Hobbies And Interests Yet
                </h3>
            </div>
        )
    }

    return (
        <Card className="p-0 gap-0">
            <CardHeader className="p-6 gap-0 -mb-2">
                <div className="flex items-center justify-between">
                    <CardTitle>Hobbies And Interests</CardTitle>
                    <InterestsSheet interests={interests} />
                </div>
            </CardHeader>
            <Separator />

            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6 w-full">
                {
                    Object.keys(interests).length > 0 ? (
                        <InterestsContent />
                    ) : (
                        noInterests()
                    )
                }
            </CardContent>
        </Card>
    )
}