import { UserStar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import User from "./User";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

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

var pagesSuggestion = [
  {
    avatar:
      "https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=200&q=60",
    name: "The Golden Spoon",
    username: "goldenspoon",
    pageType: "Restaurant",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1521790797524-b2497295b8a0?auto=format&fit=crop&w=200&q=60",
    name: "TechNova Solutions",
    username: "technova",
    pageType: "Company",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=200&q=60",
    name: "Midnight Echo",
    username: "midnightecho",
    pageType: "Rock Band",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=200&q=60",
    name: "GreenLeaf Fitness",
    username: "greenleaffit",
    pageType: "Gym",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1529101091764-c3526daf38fe?auto=format&fit=crop&w=200&q=60",
    name: "City Art Collective",
    username: "cityart",
    pageType: "Art Community",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=200&q=60",
    name: "WanderWorld Travel",
    username: "wanderworld",
    pageType: "Travel Agency",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=200&q=60",
    name: "Bloom Boutique",
    username: "bloomboutique",
    pageType: "Fashion Brand",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=200&q=60",
    name: "PixelForge Studios",
    username: "pixelforge",
    pageType: "Digital Media Company",
  },
];
