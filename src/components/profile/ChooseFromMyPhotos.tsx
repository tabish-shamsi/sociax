"use client";

import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";

const placeholderImages = [
  {
    _id: "img1",
    url: "https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg",
  },
  {
    _id: "img2",
    url: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg",
  },
  {
    _id: "img3",
    url: "https://images.pexels.com/photos/374885/pexels-photo-374885.jpeg",
  },
  {
    _id: "img4",
    url: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
  },
  {
    _id: "img5",
    url: "https://images.pexels.com/photos/207962/pexels-photo-207962.jpeg",
  },
  {
    _id: "img6",
    url: "https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg",
  },
  {
    _id: "img7",
    url: "https://images.pexels.com/photos/34950/pexels-photo.jpg",
  },
  {
    _id: "img8",
    url: "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg",
  },
  {
    _id: "img9",
    url: "https://images.pexels.com/photos/1199590/pexels-photo-1199590.jpeg",
  },
  {
    _id: "img10",
    url: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
  },
];

interface Props {
  open: boolean;
  setImage: Function;
  resetState: Function;
  setOpen: Function;
  setChoosePhotos: Function;
  
}

export default function ChooseFromMyPhotos({
  open,
  setImage,
  resetState,
  setOpen,
  setChoosePhotos
}: Props) {
  const [selectedImage, setSelectedImage] = useState("");

  if (!open) return null;

  return (
    <>
      <RadioGroup
        value={selectedImage}
        onValueChange={setSelectedImage}
        className="w-full h-64 grid grid-cols-3 gap-4 overflow-y-auto p-6"
      >
        {placeholderImages.map(({ url, _id }) => (
          <label key={_id} className="relative cursor-pointer">
            <RadioGroupItem value={url} id={_id} className="peer sr-only" />

            <Image
              src={url}
              alt=""
              width={120}
              height={48}
              className="
                w-full h-24 object-cover rounded-sm
                border-2 border-transparent
                peer-data-[state=checked]:border-primary
              "
            />
          </label>
        ))}
      </RadioGroup>

      <DialogFooter>
        <div className="flex items-center justify-end w-full p-6 gap-2">
          <Button
            variant="secondary"
            onClick={() => {
              resetState();
              setOpen(false);
            }}
            className="w-1/2"
          >
            Cancel
          </Button>

          <Button
            className="w-1/2"
            onClick={() => {
              setImage(selectedImage);
              setChoosePhotos(false);
            }}
            disabled={!selectedImage}
          >
            Confirm Photo
          </Button>
        </div>
      </DialogFooter>
    </>
  );
}
