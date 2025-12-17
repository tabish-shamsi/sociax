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
import { educationAndEmployment, interests } from "@/lib/user";
import { NotebookPen } from "lucide-react";
import { useState } from "react";
import HobbiesAndInterestsForm from "./HobbiesAndInterestsForm";
import { Interests } from "@/types/Interests";
import { EducationAndEmploymentItem } from "@/types/Education_Employment";
import { EducationAndEmploymentForm } from "./EducationAndEmploymentForm";

interface Props {}

export default function EducationAndEmploymentCard({}: Props) {
  const [openSheet, setOpenSheet] = useState(false);
  const [eduEmp, setEduEmp] = useState<EducationAndEmploymentItem[]>(
    educationAndEmployment
  );

  return (
    <Card className="p-0 gap-0">
      <CardHeader className="p-6 gap-0">
        <div className="flex items-center justify-between">
          <CardTitle>Educatoin And Employment</CardTitle>
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

      <EducationAndEmploymentForm open={openSheet} setOpen={setOpenSheet} eduEmp={eduEmp} setEduEmp={setEduEmp} />
      <Separator />
      <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6 w-full">
        {eduEmp.map(({ title, timestamp, description }) => (
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
  );
}
