import { UserStar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import User from "./User";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { pagesSuggestion } from "@/lib/page-suggestion";

export default function PagesSuggestion() {
  return (
    <Card className="gap-2 pb-2">
      <CardHeader>
        <CardTitle>Pages You May Like</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {pagesSuggestion.map((page) => (
          <div
            key={page.name}
            className="flex items-center justify-between w-full text-sm border-t p-4"
          >
            <Link href={`/pages/${page.name}`}>
              <User
                title={page.name}
                subtitle={page.pageType}
                avatarSrc={page.avatar}
                size="10"
              />
            </Link>

            <Tooltip>
              <TooltipTrigger>
                <UserStar
                  size={25}
                  className="transition-colors hover:text-primary cursor-pointer"
                />
              </TooltipTrigger>
              <TooltipContent side="top">Follow {page.name}</TooltipContent>
            </Tooltip>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}


