import { notFound } from "next/navigation"
import { Card, CardContent } from "../ui/card"
import ProfileLink from "./link"
import { LINKS } from "./data"
import { Separator } from "../ui/separator"
import ActionButtons from "./action-buttons"
import BasicInfo from "./basic-info"
import HandleCover from "./handle-cover"
import HandleAvatar from "./handle-avatar"
import { unstable_cache } from "next/cache"
import { connectToDatabase } from "@/lib/db"
import User from "@/models/User"
import { isRequestSent } from "@/data/friends"
import { Friend } from "@/models/Friend"

const getProfileHeaderData = (username: string) => unstable_cache(
    async () => {
        await connectToDatabase()
        const user = await User.findOne({ username }).select("cover avatar firstName lastName username personalInfo.lives_in")
        if (!user) return notFound()

        const data = user?.toJSON()
        return { ...data, name: `${data?.firstName} ${data?.lastName}`, location: data.personal_info?.lives_in ?? "" }
    },
    [`profile-header-${username}`],
    { tags: [`profile-header-${username}`, `basic-info-${username}`] }
)

export default async function ProfileHeader({ username }: { username: string }) {
    const user = await getProfileHeaderData(username)()
    const pendingFriendRequest = await isRequestSent(username)() as Friend

    return (
        <Card className="gap-0 p-0 overflow-hidden w-full mb-8">
            <CardContent className="w-full p-0 relative">
                <HandleCover cover={user.cover?.url} />

                <div className="flex flex-col md:flex-row lg:flex items-center justify-center lg:gap-16 md:gap-8  md:py-6 xl:gap-20 lg:px-8 lg:py-10 relative p-4">
                    <HandleAvatar avatar={user.avatar?.url} name={user.name} username={username} />

                    <ActionButtons size="lg" pendingFriendRequest={pendingFriendRequest} />
                    {LINKS.slice(0, 2).map(({ name, href }) => (
                        <ProfileLink name={name} href={href} key={name} />
                    ))}
                    <div className="flex flex-col items-center justify-center">
                        <BasicInfo name={user?.name} location={user?.location} username={user?.username} />
                        <ActionButtons size="sm" pendingFriendRequest={pendingFriendRequest} />
                    </div>

                    {LINKS.slice(2, 4).map(({ name, href }) => (
                        <ProfileLink name={name} href={href} key={name} />
                    ))}
                    <Separator className="my-4 md:hidden" />
                    <div className="flex items-center justify-center gap-6 md:hidden">
                        {LINKS.map(({ name, href }) => (
                            <ProfileLink name={name} href={href} key={name} mobile={true} />
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}