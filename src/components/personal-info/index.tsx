import getUserByUsername from "@/data/get-user-by-username"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import User, { Social } from "@/models/User";
import PersonalInfoSheet from "./personal-info-sheet";
import { connectToDatabase } from "@/lib/db";
import { unstable_cache } from "next/cache";

const getPersonalInfo = (username: string) => unstable_cache(
    async () => {
        await connectToDatabase()
        const user = await User.findOne({ username }).select("personalInfo").lean()
        return JSON.parse(JSON.stringify(user))
    },
    [`personal-info-${username}`],
    {
        tags: [`personal-info-${username}`],
    }
)

export default async function PersonalInfo({ username }: { username: string }) {
    const user = await getPersonalInfo(username)()
    if (!user) return notFound()

    const { personalInfo } = user

    return (
        <Card className="p-0 gap-0">
            <CardHeader className="p-6 gap-0 -mb-2">
                <div className="flex items-center justify-between">
                    <CardTitle>Personal Info</CardTitle>
                    <PersonalInfoSheet personalInfo={personalInfo} />
                </div>
            </CardHeader>
            <Separator />

            <CardContent className="p-6 flex flex-col gap-6">
                {personalInfo &&
                    Object.entries(personalInfo).map(([key, value]) => {
                        if (!value) return null;

                        if (key === "socials" && personalInfo.socials.length > 0 && Array.isArray(value)) {
                            return (
                                <div key={key} className="">
                                    <h3 className="text-sm font-medium text-card-foreground  capitalize">
                                        Social Networks:
                                    </h3>
                                    <div className="flex flex-col mt-4 gap-4">
                                        {personalInfo.socials.map(({ name, link, _id }: Social) => (
                                            <a key={_id} href={link} target="_blank">
                                                <Button
                                                    variant="outline"
                                                    className="w-full border-primary hover:bg-primary bg-transparent text-primary dark:text-primary dark:bg-transparent hover:text-white dark:border-primary dark:hover:bg-primary  dark:hover:text-white "
                                                >
                                                    {name === "Facebook" && <FaFacebookF />}
                                                    {name === "Instagram" && <FaInstagram />}
                                                    {name === "Twitter" && <FaXTwitter />}
                                                    {name}
                                                </Button>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            );
                        }

                        // ---- Handle dates ----
                        if ((key === "birthday" || key === "joined")) {
                            return (
                                <div key={key} className="flex gap-2">
                                    <h3 className="font-medium text-card-foreground w-1/3 capitalize">
                                        {key.split("_").join(" ")}:
                                    </h3>
                                    <p className="text-sm text-muted-foreground w-2/3">
                                        {format(new Date(value as string), "PPP")}
                                    </p>
                                </div>
                            );
                        }

                        // ---- Default text fields ----
                        if (key !== "birthday" && key !== "joined" && key !== "socials") {
                            return (
                                <div key={key} className="flex gap-2">
                                    <h3 className="font-medium text-card-foreground w-1/3 capitalize">
                                        {key.split("_").join(" ")}:
                                    </h3>
                                    <p className="text-sm text-muted-foreground w-2/3 text-justify">
                                        {String(value)}
                                    </p>
                                </div>
                            );
                        }
                    })}
            </CardContent>
        </Card>
    )
}