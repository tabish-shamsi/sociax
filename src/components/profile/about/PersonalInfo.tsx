"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { user } from "@/lib/user";
import { NotebookPen } from "lucide-react";
import { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import PersonalInfoSheet from "./PersonalInfoSheet";

interface PerosnalInfo {
  about_me: string;
  birthday: Date;
  birthplace: string;
  occupation: string;
  lives_in: string;
  joined: Date;
  gender: string;
  status: string;
  website: string;
}

export default function PersonalInfo({
  personalInfo,
}: {
  personalInfo: PerosnalInfo;
}) {
  const [personalInfoArray, setPersonalInfo] = useState<
    { key: string; value: string }[]
  >([]);

  useEffect(() => {
    const array = Object.entries(personalInfo).map(([key, value]) => ({
      key,
      value,
    }));
    setPersonalInfo(array);
  }, [personalInfo]);

  return (
    <Card className="p-0 gap-0">
      <CardHeader className="p-6 gap-0 -mb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Personal Info</CardTitle>
          <PersonalInfoSheet
            trigger={
              <CardAction>
                <Button variant="secondary" size="icon-sm">
                  <NotebookPen className="text-muted-foreground" />
                </Button>
              </CardAction>
            }
          />
        </div>
      </CardHeader>
      <Separator />

      <CardContent className="p-6 flex flex-col gap-6">
        {personalInfoArray.map(({ key, value }) => (
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
              <a key={name} href={link} target="_blank">
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
