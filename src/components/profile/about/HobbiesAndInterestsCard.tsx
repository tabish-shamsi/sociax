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
import { interests } from "@/lib/user";
import { NotebookPen } from "lucide-react";
import { useState } from "react";
import HobbiesAndInterestsForm from "./HobbiesAndInterestsForm";
import { Interests } from "@/types/Interests";

export default function HobbiesAndInterestsCard() {
  const [openSheet, setOpenSheet] = useState(false);
  const [interests_, setInterests] = useState<Interests>(interests);

  return (
    <Card className="p-0 gap-0">
      <CardHeader className="p-6 gap-0 -mb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Hobbies And Interests</CardTitle>
          <CardAction>
            <Button
              onClick={() => setOpenSheet(true)}
              variant="secondary"
              size="icon-sm"
            >
              <NotebookPen className="text-muted-foreground" />
            </Button>
          </CardAction>
        </div>
      </CardHeader>
      <Separator />

      <HobbiesAndInterestsForm
        open={openSheet}
        setOpen={setOpenSheet}
        interests={interests_}
        setInterests={setInterests}
      />

      <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6 w-full">
        {Object.entries(interests_).map(([key, value]) => (
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
  );
}
