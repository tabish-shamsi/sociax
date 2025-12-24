"use client";

import { useRef, useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import CustomAvatarFallback from "../global/CustomAvatarFallback";
import { Camera } from "lucide-react";
import { toast } from "sonner";
import UploadImageDialog from "./upload-image-diaglog";
import { useSession } from "next-auth/react";

export default function HandleAvatar({ avatar, name, username }: { avatar?: string, name: string; username: string; }) {
  const avatarRef = useRef<HTMLInputElement>(null);

  const { data: session } = useSession()
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");

  const selectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!session) throw new Error("Session not found");

    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const url = URL.createObjectURL(file);
    setImage(url);
  };

  const canEdit = session?.user.username === username

  return (
    <>
      <div
        onClick={() => {
          canEdit && setOpen(true)
        }}
        className="absolute bottom-[154px] md:bottom-[74px] lg:bottom-[94px] xl:bottom-[104px] left-1/2 -translate-x-1/2 xl:h-56 lg:h-[179px] md:h-[134px] sm:h-28 h-[84px] xl:w-56 lg:w-[179px] md:w-[134px] sm:w-28 w-[84px] bg-card rounded-full p-1"
      >
        <Avatar className="w-full h-full">
          <AvatarImage src={avatar} />
          <CustomAvatarFallback name={name} />
        </Avatar>
        {
          canEdit && (
            <>
              <span className="flex items-center justify-center absolute xl:bottom-[30px] lg:bottom-4 md:bottom-2.5 sm:bottom-1 bottom-0 right-1 h-6 w-6 md:h-7.5 md:w-7.5 lg:h-10 lg:w-10 bg-card rounded-full text-card-foreground cursor-pointer">
                <Camera className="lg:w-6 md:w-4 w-3" />
              </span>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={selectImage}
                ref={avatarRef}
                hidden

              />
            </>
          )
        }
      </div >
      {
        canEdit && (
          <UploadImageDialog
            image={image}
            imageType="Avatar"
            ref={avatarRef}
            setImage={setImage}
            setOpen={setOpen}
            open={open}
          />
        )
      }
    </>
  );
}
