import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getInterests } from "@/data/get-interests";
import { Interests } from "@/models/User";
import { interests } from "@/lib/user";
import InterestsSheet from "./InterestsSheet"; 
import { getUserSession } from "@/data/get-user-session";

export default async function InterestsCard() {
  const { id } = await getUserSession()
  const interests = (await getInterests(id)).data as Interests 

  function InterestsContent() {
    if (interests) {
      return (
        Object.entries(interests).map(([key, value]) => (
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
        ))
      )
    } else {
      return (
        <div className="w-full">
          <h3 className="text-sm text-muted-foreground capitalize">
            No Hobbies And Interests
          </h3>
        </div>
      )
    }
  }

  return (
    <Card className="p-0 gap-0">
      <CardHeader className="p-6 gap-0 -mb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Hobbies And Interests</CardTitle>
          <InterestsSheet interests={interests} />
        </div>
      </CardHeader>
      <Separator />

      <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6 w-full">
        <InterestsContent />
      </CardContent>
    </Card>
  );
}

