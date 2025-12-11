"use client";

import { Images } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { toast } from "sonner";
import { useRef } from "react";
import Image from "next/image";

interface Image {
  file: File;
  url: string;
}

interface ImagesProps {
  images: Image[];
  setImages: Function;
}

export default function UploadImages({ images, setImages }: ImagesProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const selectedCount = images.length + files.length;
    if (selectedCount > 4) {
      toast.error("You can only upload up to 4 images.");
      return;
    }

    setImages((prev: Image[]) => [
      ...prev,
      ...files.map((file) => ({
        file,
        url: URL.createObjectURL(file as Blob),
      })),
    ]);
  };

  return (
    <Tooltip>
      <TooltipTrigger
        onClick={() => fileRef.current?.click()}
        className="text-green-600 h-12 w-12 rounded-xl transition-colors hover:bg-secondary flex items-center justify-center cursor-pointer"
      >
        <>
          <Images />
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageUpload}
            ref={fileRef}
          />
        </>
      </TooltipTrigger>
      <TooltipContent>Upload Images</TooltipContent>
    </Tooltip>
  );
}

