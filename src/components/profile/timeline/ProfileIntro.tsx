import { personalInfo, user } from "@/lib/user";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { format } from "date-fns";

export default function ProfileIntro() {
  return (
    <Card className="p-0 gap-0">
      <CardHeader className="gap-0 p-0">
        <CardTitle className="p-6">Profile Intro</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="p-6 flex flex-col gap-6">
        {Object.entries(personalInfo).map(([key, value]) => (
          <div key={key} className="flex gap-2 ">
            <h3 className="text-sm md:text-base font-medium text-card-foreground w-1/3 capitalize">
              {key.split("_").join(" ")}:
            </h3>
            <p className="text-sm text-muted-foreground w-[66.666%] text-justify">
              {key === "birthday" || key === "joined"
                ? format(new Date(value), "dd MMM yyyy")
                : String(value)}
            </p>
          </div>
        ))}

        <div className="">
          <h3 className="text-sm md:text-base font-medium text-card-foreground  capitalize">
            Social Networks:
          </h3>
          <div className="flex flex-col mt-4 gap-4">
            {user.socials.map(({ name, link }) => (
              <a key={"Social" + name} href={link} target="_blank">
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
  );
}
