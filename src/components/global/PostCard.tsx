import { Post } from "@/types/Post";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "../ui/card";
import {
  Ellipsis,
  PencilLineIcon,
  UploadIcon,
  Trash2Icon,
  MessageSquareText,
  Heart,
  Share2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarImage } from "../ui/avatar";
import CustomAvatarFallback from "./CustomAvatarFallback";
import { Button } from "../ui/button";
import Link from "next/link";
import { PostImageGrid } from "./PostImageGrid";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Card className="gap-0 p-0">
      <CardHeader className="gap-0 p-6">
        <div className="flex items-start gap-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src={post.user.avatar} />
            <CustomAvatarFallback name={post.user.name} />
          </Avatar>

          <div className="flex flex-col">
            <div className="font-semibold text-card-foreground flex flex-wrap items-center gap-1">
              <Link href={`/profile/${post.user.username}`} >{post.user.name}</Link>&nbsp;
              {post.message && (
                <span className="font-normal text-muted-foreground text-sm">
                  {post.message}
                </span>
              )}
              {post.feeling && (
                <span className="font-normal text-muted-foreground text-sm">
                  is Feeling&nbsp;
                  <strong className="text-primary">{post.feeling}</strong>
                </span>
              )}
            </div>
            <span className="text-sm text-muted-foreground">
              {formatDistanceToNow(post.createdAt, { addSuffix: true })}
            </span>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <CardAction className="text-muted-foreground cursor-pointer h-10 w-10 transition-colors flex items-center justify-center hover:bg-muted rounded-full">
              <Ellipsis />
            </CardAction>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-34">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <PencilLineIcon />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <UploadIcon />
                Share
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <Trash2Icon />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="border-y p-6 flex flex-col gap-2">
        <div>{post.content}</div>
        <div className="flex items-center gap-2">
          {post.taggedFriends?.map(({ name, username }) => (
            <Button
              key={`taggedfriends-${username}`}
              variant="link"
              className="text-sm p-0"
            >
              <Link href={`/profile/${username}`}>{name}</Link>
            </Button>
          ))}
        </div>
        {post.images && <PostImageGrid images={post.images} />}
      </CardContent>

      <CardFooter className="flex items-center justify-between px-6 py-4">
        <button className="flex items-center gap-2">
          <span className="text-muted-foreground cursor-pointer transition-colors flex items-center justify-center  hover:text-red-500 rounded-lg h-10">
            <Heart />
          </span>
          <span>78</span>
        </button>

        <div className="flex items-center justify-center gap-6">
          <button className="flex items-center gap-2">
            <span className="text-muted-foreground cursor-pointer transition-colors flex items-center justify-center  hover:text-green-500 rounded-lg h-10">
              <MessageSquareText />
            </span>
            <span>78</span>
          </button>

          <button className="flex items-center gap-2">
            <span className="text-muted-foreground cursor-pointer transition-colors flex items-center justify-center  hover:text-purple-500 rounded-lg h-10">
              <Share2 />
            </span>
          </button>
        </div>
      </CardFooter>
    </Card>
  );
}
