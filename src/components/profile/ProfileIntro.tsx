import { Facebook } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { user } from "@/lib/user";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

export default function ProfileIntro() {
  return (
    <Card className="p-0 gap-0">
      <CardHeader className="gap-0 p-0">
        <CardTitle className="p-6">Profile Intro</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="p-6 space-y-6">
        <IntroItem
          heading="About Me:"
          content="Hi, I'm Tabish, I'm 18 and currently work as a frontend engineer at Appverse Technologies."
        />

        <IntroItem
          heading="Favourite TV Shows:"
          content="Peaky Blinders, Game Of Thrones, Money Heist, Breaking Bed, Dark, Vikings, The Walking Dead."
        />

        <IntroItem
          heading="Favourite Music Bands / Artists:"
          content="Iron Maid, DC/AC, Megablow, The Ill, Kung fo Fighters, System of a Revenge."
        />

        <div>
          <h4 className="text-sm font-medium text-card-foreground">
            Social Networks:
          </h4>
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
  );
}

function IntroItem({ heading, content }: { heading: string; content: string }) {
  return (
    <div>
      <h4 className="text-sm font-medium text-card-foreground">{heading}</h4>
      <p className="text-sm text-muted-foreground">{content}</p>
    </div>
  );
}
