"use client";

import { user } from "@/lib/user";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { Button } from "../ui/button";
import TagFriends, { TaggedFriends } from "./TagFriends";
import Feelings from "./Feelings";
import UploadImages from "./UploadImages";
import PostContent from "./PostContent";
import { PostImageGrid } from "../global/PostImageGrid";
import { Avatar, AvatarImage } from "../ui/avatar";
import CustomAvatarFallback from "../global/CustomAvatarFallback";
import Link from "next/link";

export default function CreatePost() {
  const [images, setImages] = useState<{ file: File; url: string }[]>([]);
  const [feeling, setFeeling] = useState("");
  const [taggedFriends, setTaggedFriends] = useState([]);
  const [content, setContent] = useState("");
  const [wordCount, setWordCount] = useState(0);

  const canPost = () => {
    const hasContent = wordCount > 0 && content !== "<p></p>";
    const hasImages = images.length > 0;
    return hasContent || hasImages;
  };

  const handlePostCreation = () => {
    const postData = {
      content,
      images,
      feeling,
      taggedFriends,
    };

    console.log(postData);
  };

  return (
    <Card className="p-0 gap-0">
      <CardHeader className="gap-0 p-6">
        <CardTitle>Create a new Post</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="my-6">
        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar} />
              <CustomAvatarFallback name={user.name} />
            </Avatar>

            <div className="flex flex-col">
              <Link
                href={`/profile/${user.username}`}
                className="font-semibold text-card-foreground flex items-center gap-1"
              >
                {user.name}&nbsp;
                {feeling && (
                  <span className="font-normal text-muted-foreground text-sm">
                    is&nbsp;
                    <strong className="text-primary">{feeling}</strong>
                  </span>
                )}
              </Link>
              <span className="text-sm text-muted-foreground">
                @{user.username}
              </span>
            </div>
          </div>

          <PostContent
            content={content}
            setContent={setContent}
            setWordCount={setWordCount}
          />

          <TaggedFriends taggedFriends={taggedFriends} />

          {/* <ImagesPreview images={images} setImages={setImages} /> */}
          <PostImageGrid
            images={images}
            onRemove={(url) => {
              setImages((prev) => prev.filter((img) => img.url !== url));
              URL.revokeObjectURL(url);
            }}
          />
        </div>
      </CardContent>
      <Separator />
      <CardFooter>
        <div className="flex items-center justify-between w-full py-6">
          <div className="flex items-center justify-center gap-2 text-secondary-foreground">
            <UploadImages images={images} setImages={setImages} />

            <TagFriends
              taggedFriends={taggedFriends}
              setTaggedFreinds={setTaggedFriends}
            />

            <Feelings setFeeling={setFeeling} />
          </div>
          <Button onClick={handlePostCreation} disabled={!canPost()} size="lg">
            Create Post
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
