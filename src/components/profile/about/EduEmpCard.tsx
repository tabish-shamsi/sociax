import {
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"; 
import { Education_Employment } from "@/models/User";
import { EducationAndEmploymentSheet } from "./EduEmpSheet";
import { getEducationEmployment } from "@/data/get-education-employment";
import {educationAndEmployment as education_employment} from "@/lib/user"

export default async function EducationAndEmploymentCard() {
  // const education_employment = (await getEducationEmployment()).data as Education_Employment[]
  return (
    <Card className="p-0 gap-0">
      <CardHeader className="p-6 gap-0">
        <div className="flex items-center justify-between">
          <CardTitle>Educatoin And Employment</CardTitle>
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
  );
}
