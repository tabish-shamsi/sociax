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
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

export default function page() {
  const profileInfoArray = Object.entries(personalInfo).map(([key, value]) => ({
    key,
    value,
  }));
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
        <Card className="p-0 gap-0">
          <CardHeader className="p-6 gap-0 -mb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Personal Info</CardTitle>
              <CardAction>
                <Button variant="secondary" size="icon-sm">
                  <NotebookPen className="text-muted-foreground" />
                </Button>
              </CardAction>
            </div>
          </CardHeader>
          <Separator />

          <CardContent className="p-6 flex flex-col gap-6">
            {profileInfoArray.map(({ key, value }) => (
              <div key={key} className="flex gap-2 ">
                <h3 className="text-sm font-medium text-card-foreground w-1/3 capitalize">
                  {key.split("_").join(" ")}:
                </h3>
                <p className="text-xs text-muted-foreground w-[66.666%] text-justify">
                  {value}
                </p>
              </div>
            ))}

            <div className="">
              <h3 className="text-sm font-medium text-card-foreground  capitalize">
                Social Networks:
              </h3>
              <div className="flex flex-col mt-4 gap-4">
                {user.socials.map(({ name, link }) => (
                  <a href={link} target="_blank">
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
          </CardContent>
        </Card>
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
