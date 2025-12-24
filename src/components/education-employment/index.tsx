import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { unstable_cache } from "next/cache";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Education_Employment } from "@/models/User";
import EducationAndEmploymentSheet from "./education-employment-sheet";

const getEduEmp = (username: string) => unstable_cache(
    async () => {
        await connectToDatabase()
        const user = await User.findOne({ username }).select("education_employment").lean()
        if (!user) return null

        return JSON.parse(JSON.stringify(user.education_employment)) as Education_Employment[]
    },
    [`education-employment-${username}`],
    {
        tags: [`education-employment-${username}`]
    }
)

export default async function EducationAndEmployment({ username }: { username: string; }) {
    const education_employment = await getEduEmp(username)() as Education_Employment[] | null

    // Early return if no data
    if (!education_employment || education_employment.length === 0) {
        return (
            <Card className="p-0 gap-0">
                <CardHeader className="p-6 gap-0">
                    <div className="flex items-center justify-between">
                        <CardTitle>Education And Employment</CardTitle>
                        <EducationAndEmploymentSheet eduEmp={[]} />
                    </div>
                </CardHeader>
                <Separator />
                <CardContent className="p-6">
                    <div className="w-full">
                        <h3 className="text-sm text-muted-foreground capitalize">
                            No Hobbies And Interests Yet
                        </h3>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="p-0 gap-0">
            <CardHeader className="p-6 gap-0">
                <div className="flex items-center justify-between">
                    <CardTitle>Education And Employment</CardTitle>
                    <EducationAndEmploymentSheet eduEmp={education_employment} />
                </div>
            </CardHeader>
            <Separator />
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6 w-full">
                {education_employment.map(({ title, timestamp, description }: Education_Employment) => (
                    <div key={title} className="w-full">
                        <h3 className="font-medium text-card-foreground capitalize">
                            {title}
                        </h3>
                        <span className="text-xs text-gray-400">{timestamp}</span>
                        <p className="text-sm text-muted-foreground">{description}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}