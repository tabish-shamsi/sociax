"use client";

import { useCallback, useState } from "react";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Images, Monitor } from "lucide-react";
import { Separator } from "../ui/separator";
import Cropper, { Area } from "react-easy-crop";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { blobToFile, getCroppedImg } from "@/helpers/image-upload-helpers";
import Image from "next/image";
import ChooseFromMyPhotos from "./ChooseFromMyPhotos";

interface Props {
  setImage: Function;
  image: string;
  setCroppedImage: Function;
  setOpen: Function;
  ref: any;
  imageType: "Avatar" | "Cover";
}

export default function UploadImageDialogContent({
  setImage,
  image,
  setCroppedImage,
  setOpen,
  ref,
  imageType,
}: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [chooseMyPhotos, setChoosePhotos] = useState(false);

  const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const resetState = () => {
    if (image) {
      URL.revokeObjectURL(image);
    }

    setImage("");
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
  };

  //   MAIN FUNCTION
  //   const uploadAvatarToCloud = async () => {
  //     if (!image || !croppedAreaPixels) return;

  //     try {
  //       const croppedBlob = await getCroppedImg(image, croppedAreaPixels);

  //       const file = blobToFile(croppedBlob, `avatar-${Date.now()}.jpg`);

  //       const formData = new FormData();
  //       formData.append("file", file);

  //       const res = await fetch("/api/upload-avatar", {
  //         method: "POST",
  //         body: formData,
  //       });

  //       if (!res.ok) throw new Error("Upload failed");

  //       const data = await res.json();

  //       setAvatar(data.url); // final CDN URL
  //       resetState();
  //       setOpen(false);
  //     } catch (err) {
  //       toast.error("Avatar upload failed");
  //     }
  //   };

  const handleUpload = async () => {
    if (!image || !croppedAreaPixels) return;

    try {
      const croppedBlob = await getCroppedImg(image, croppedAreaPixels);
      const file = blobToFile(croppedBlob, `avatar-${Date.now()}.jpg`);
      setCroppedImage(URL.createObjectURL(file)); // final CDN URL
      resetState();
      setOpen(false);
    } catch (err) {
      toast.error("Avatar upload failed");
    }
  };

  return (
    <DialogContent className="p-0 gap-0 overflow-hidden">
      <DialogHeader>
        <DialogTitle className="p-6">Upload {imageType} Photo</DialogTitle>
      </DialogHeader>
      <Separator />
      {!image && !chooseMyPhotos && (
        <div className="flex items-center justify-center h-56 ">
          <div
            onClick={() => ref.current?.click()}
            className="h-full w-1/2 bg-muted transition-colors hover:bg-card cursor-pointer flex flex-col items-center justify-center gap-1 p-4"
          >
            <Monitor size={40} />
            <h4 className="md:text-lg font-medium text-card-foreground">
              Upload Photo
            </h4>
            <p className="text-xs md:text-sm text-muted-foreground">
              Browse your computer
            </p>
          </div>
          <Separator orientation="vertical" />
          <div
            onClick={() => setChoosePhotos(true)}
            className="h-full w-1/2 bg-muted transition-colors hover:bg-card cursor-pointer flex flex-col items-center justify-center gap-1 p-4 text-center"
          >
            <Images size={40} />
            <h4 className="md:text-lg font-medium text-card-foreground">
              Choose From My Photos
            </h4>
            <p className="text-xs md:text-sm text-muted-foreground">
              Choose from your uploaded photos
            </p>
          </div>
        </div>
      )}

      {image && (
        <div className="w-full h-64 flex items-center justify-center relative">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1} // 🔥 Square crop
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
      )}

      {image && (
        <DialogFooter>
          <div className="flex items-center justify-end w-full p-6">
            <Button
              variant="ghost"
              onClick={() => {
                resetState();
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleUpload} disabled={!croppedAreaPixels}>
              Upload
            </Button>
          </div>
        </DialogFooter>
      )}

      <ChooseFromMyPhotos open={chooseMyPhotos} setOpen={setChoosePhotos} />

    </DialogContent>
  );
}
