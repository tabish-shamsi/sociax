"use client";

import Image from "next/image";

var placeholderImages = [
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
  setOpen: Function;
}

export default function ChooseFromMyPhotos({ open, setOpen }: Props) {
    console.log(open);
    
  if (open) {
    return (
      <div className="w-full h-64 grid grid-cols-3 gap-4 overflow-y-auto">
        {placeholderImages.map(({ url }) => (
          <div className="w-full h-full">
            <img src={url} alt="" className="w-full h-full object-cover rounded-sm" />
          </div>
        ))}
      </div>
    );
  }
}
