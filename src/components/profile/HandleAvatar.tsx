"use client";

import { user } from "@/lib/user";
import { useRef, useState } from "react";
import { Dialog } from "../ui/dialog";
import { Avatar, AvatarImage } from "../ui/avatar";
import CustomAvatarFallback from "../global/CustomAvatarFallback";
import { Camera } from "lucide-react";
import { toast } from "sonner";
import UploadImageDialogContent from "./UploadImageDialogContent";
import UploadImageDialog from "./UploadImageDialog";

export default function HandleAvatar() {
  const avatarRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [avatar, setAvatar] = useState(user.avatar || "");
  const [image, setImage] = useState("");

  const selectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const url = URL.createObjectURL(file);
    setImage(url);
  };

  return (
    <>
      <div
        onClick={() => {
          setOpen(true);
        }}
        className="absolute bottom-[154px] md:bottom-[74px] lg:bottom-[94px] xl:bottom-[104px] left-1/2 -translate-x-1/2 xl:h-56 lg:h-[179px] md:h-[134px] sm:h-28 h-[84px] xl:w-56 lg:w-[179px] md:w-[134px] sm:w-28 w-[84px] bg-card rounded-full p-1"
      >
        <Avatar className="w-full h-full">
          <AvatarImage src={avatar} />
          <CustomAvatarFallback name={user.name} />
        </Avatar>
        <span className="flex items-center justify-center absolute xl:bottom-[30px] lg:bottom-4 md:bottom-2.5 sm:bottom-1 bottom-0 right-1 h-6 w-6 md:h-7.5 md:w-7.5 lg:h-10 lg:w-10 bg-card rounded-full text-card-foreground cursor-pointer">
          <Camera className="lg:w-6 md:w-4 w-3" />
        </span>

        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={selectImage}
          ref={avatarRef}
        />
      </div>
      <UploadImageDialog
        image={image}
        imageType="Avatar"
        ref={avatarRef}
        setCroppedImage={setAvatar}
        setImage={setImage}
        setOpen={setOpen}
        open={open}
      />
    </>
  );
}
