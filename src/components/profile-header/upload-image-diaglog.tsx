"use client";

import { useCallback, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Images, Monitor } from "lucide-react";
import { Separator } from "../ui/separator";
import Cropper, { Area } from "react-easy-crop";
import { Button } from "../ui/button";
import { blobToFile, getCroppedImg } from "@/helpers/image-upload-helpers";
import ChooseFromMyPhotos from "./choose-from-photos";
import { uploadAvatarCover } from "@/actions/upload-avatar-cover";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import { useSession } from "next-auth/react";
import SubmitButton from "../global/SubmitButton";
import { uploadImages } from "@/actions/upload-images";

interface Props {
  setImage: Function;
  image: string;
  setOpen: Function;
  ref: any;
  imageType: "Avatar" | "Cover";
  open: boolean;
}

export default function UploadImageDialog({
  setImage,
  image,
  setOpen,
  ref,
  imageType,
  open,
}: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [chooseMyPhotos, setChoosePhotos] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session, update } = useSession()

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
    setChoosePhotos(false);
  };

  const handleUpload = async () => {
    if (!image || !croppedAreaPixels) return;

    try {
      setLoading(true);
      const croppedBlob = await getCroppedImg(image, croppedAreaPixels);
      const file = blobToFile(croppedBlob, `avatar-${Date.now()}.jpg`);

      const uploadFile = await uploadImages([file])

      if (imageType === "Avatar") {
        await update({
          ...session,
          user: {
            ...session?.user,
            avatar: uploadFile[0].url
          }
        })
      }

      const res = await uploadAvatarCover(imageType, uploadFile[0])

      if (!res.success) {
        showErrorToast(res.message)
        return
      }
      showSuccessToast(res.message)
    } catch (err) {
      showErrorToast(`Failed to upload ${imageType}. Please try again later.`);
    } finally {
      setLoading(false)
      resetState();
      setOpen(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(false);
        resetState();
      }}
    >
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
              aspect={imageType === "Avatar" ? 1 : 1152 / 384} // 🔥 Square crop
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
                className="w-1/2"
                variant="secondary"
                onClick={() => {
                  resetState();
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <div onClick={handleUpload} className="w-1/2">
                <SubmitButton
                  isLoading={loading}
                  className="w-full"
                  disabled={!croppedAreaPixels}
                >
                  Upload
                </SubmitButton>
              </div>

            </div>
          </DialogFooter>
        )}

        <ChooseFromMyPhotos
          open={chooseMyPhotos}
          setImage={setImage}
          resetState={resetState}
          setOpen={setOpen}
          setChoosePhotos={setChoosePhotos}
        />
      </DialogContent>
    </Dialog>
  );
}
