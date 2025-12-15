import PersonalInfo from "@/components/profile/about/PersonalInfo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  educationAndEmployment,
  interests,
  personalInfo,
  user,
} from "@/lib/user";
import { Ellipsis, NotebookPen } from "lucide-react"; 

export default function page() {
  

  const interestsArray = Object.entries(interests).map(([key, value]) => ({
    key,
    value,
  }));

  return (
    <section
      id="Profile_Page"
      className="flex flex-col lg:flex-row gap-4 lg:gap-8 w-full"
    > 
      <aside className="flex flex-col gap-8 w-full lg:w-[40%]">
        <PersonalInfo personalInfo={personalInfo} />
      </aside>
      <main className="w-full lg:w-[60%] flex flex-col gap-8">
        <Card className="p-0 gap-0">
          <CardHeader className="p-6 gap-0 -mb-2">
            <CardTitle>Hobbies And Interests</CardTitle>
            <CardAction>
              <Ellipsis />
            </CardAction>
          </CardHeader>
          <Separator />

          <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6 w-full">
            {interestsArray.map(({ key, value }) => (
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
            ))}
          </CardContent>
        </Card>

        <Card className="p-0 gap-0">
          <CardHeader className="p-6 gap-0">
            <div className="flex items-center justify-between">
              <CardTitle>Educatoin And Employment</CardTitle>
              <CardAction>
                <Button size="icon-sm">
                  <NotebookPen />
                </Button>
              </CardAction>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6 w-full">
            {educationAndEmployment.map(({ title, timestamp, description }) => (
              <div key={title} className="w-full">
                <h3 className="text-sm font-medium text-card-foreground capitalize">
                  {title}
                </h3>
                <span className="text-xs text-gray-400">{timestamp}</span>
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </section>
  );
}
