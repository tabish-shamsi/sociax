import Image from "next/image";
import { X } from "lucide-react";

interface ImageType {
  url: string;
  _id?: string;
  File?: string;
}

interface PostImageGridProps {
  images: ImageType[];
  onRemove?: (url: string) => void;
}

export function PostImageGrid({ images, onRemove }: PostImageGridProps) {
  if (!images || images.length === 0) return null;

  const remaining = images.length > 4 ? images.length - 4 : 0;
  const displayImages = images.slice(0, 4);

  const RemoveButton = (url: string) =>
    onRemove && (
      <button
        onClick={() => onRemove(url)}
        className="absolute top-1 right-1 bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 z-20"
      >
        <X size={15} />
      </button>
    );

  return (
    <div className="w-full">
      {/* ONE IMAGE */}
      {images.length === 1 && (
        <div className="relative rounded-lg overflow-hidden border group h-80">
          <Image
            src={images[0].url}
            alt=""
            fill
            className="object-cover"
            sizes="100%"
          />
          {RemoveButton(images[0].url)}
        </div>
      )}

      {/* TWO IMAGES */}
      {images.length === 2 && (
        <div className="grid grid-cols-2 gap-2">
          {images.map((img) => (
            <div
              key={img._id ?? img.url}
              className="relative rounded-lg overflow-hidden border group h-48"
            >
              <Image
                src={img.url}
                alt=""
                fill
                className="object-cover"
                sizes="50vw"
              />
              {RemoveButton(img.url)}
            </div>
          ))}
        </div>
      )}

      {/* THREE IMAGES */}
      {images.length === 3 && (
        <div className="grid grid-cols-2 gap-2">
          {/* Top big image */}
          <div className="relative col-span-2 rounded-lg overflow-hidden border group h-60">
            <Image
              src={images[0].url}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />
            {RemoveButton(images[0].url)}
          </div>

          {/* Bottom two */}
          {images.slice(1).map((img) => (
            <div
              key={img._id ?? img.url}
              className="relative rounded-lg overflow-hidden border group h-40"
            >
              <Image
                src={img.url}
                alt=""
                fill
                className="object-cover"
                sizes="50vw"
              />
              {RemoveButton(img.url)}
            </div>
          ))}
        </div>
      )}

      {/* FOUR OR MORE */}
      {images.length >= 4 && (
        <div className="grid grid-cols-2 gap-2">
          {displayImages.map((img, idx) => (
            <div
              key={img._id ?? img.url}
              className="relative rounded-lg overflow-hidden border group h-40"
            >
              <Image
                src={img.url}
                alt=""
                fill
                className="object-cover"
                sizes="50vw"
              />
              {RemoveButton(img.url)}

              {/* +N overlay */}
              {idx === 3 && remaining > 0 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-3xl font-bold rounded-lg">
                  +{remaining}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
