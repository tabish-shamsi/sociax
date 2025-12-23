"use client";

import { useRef, useState } from "react";
import { Camera } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import UploadImageDialog from "./UploadImageDialog";

export default function HandleCover({ cover: initialCover }: { cover: string }) {
  const coverRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [cover, setCover] = useState(initialCover || "");
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
        onClick={() => setOpen(true)}
        className="w-full h-48 md:h-[230px] lg:h-[307px] xl:h-96 relative"
      >
        {
          !cover ? (
            <div className="w-full h-full flex justify-center pt-14 bg-gray-200">
              <p className="text-xl font-bold text-muted-foreground">No Cover Image Uploaded</p>
            </div>
          ) : ( 
            <Image
              height={192}
              width={192 * 3}
              src={cover}
              alt={"Cover"}
              className="w-full h-full object-cover"
            />
          )
        }


        <span className="flex items-center justify-center absolute top-4 right-4 h-6 w-6 md:h-7.5 md:w-7.5 lg:h-10 lg:w-10 bg-card rounded-full text-card-foreground cursor-pointer">
          <Camera className="lg:w-6 md:w-4 w-3" />
        </span>

        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={selectImage}
          ref={coverRef}
        />
      </div>
      <UploadImageDialog
        image={image}
        imageType="Cover"
        ref={coverRef}
        setCroppedImage={setCover}
        setImage={setImage}
        setOpen={setOpen}
        open={open}
      />
    </>
  );
}
