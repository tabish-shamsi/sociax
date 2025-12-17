 
import {
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"; 
import Image from "next/image";

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
];

export default function LastPhotos() {
  return (
    <Card className="p-0 gap-0">
      <CardHeader className="gap-0 p-6">
        <CardTitle>Last Photos</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="p-6">
        <div className="grid grid-cols-3 gap-1 w-full">
          {placeholderImages.map(({ _id, url }) => (
            <div key={_id} className="w-full h-full flex items-center justify-center">
              <Image height={64} width={86} src={url} alt={_id} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
