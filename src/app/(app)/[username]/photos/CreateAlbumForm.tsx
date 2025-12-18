"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { albums as mockAlbums } from "@/lib/user";
import { cn } from "@/lib/utils";
import { Plus, X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

type AlbumImage = {
  _id?: string;
  url: string;
};

type Album = {
  _id: string;
  title: string;
  slug?: string;
  images: AlbumImage[];
  lastUpdated: string;
};

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setAlbums: Dispatch<SetStateAction<Album[]>>;
  albumId?: string;
  isEdit?: boolean;
}

export default function CreateAlbumForm({
  open,
  setOpen,
  setAlbums,
  albumId,
  isEdit = false,
}: Props) {
  const [title, setTitle] = useState("");
  const [images, setImages] = useState<AlbumImage[]>([]);

  const [titleError, setTitleError] = useState("");
  const [imagesError, setImagesError] = useState("");

  const imageInputRef = useRef<HTMLInputElement>(null);

  /* ---------------------------- Helpers ---------------------------- */

  function validateForm() {
    let valid = true;

    if (!title.trim()) {
      setTitleError("Album name cannot be empty");
      valid = false;
    }

    if (images.length === 0) {
      setImagesError("Album must contain at least one image");
      valid = false;
    }

    return valid;
  }

  function handleSubmit() {
    if (!validateForm()) return;

    const newAlbum: Album = {
      _id: isEdit && albumId ? albumId : crypto.randomUUID(),
      title: title.trim(),
      slug: title.trim().toLowerCase().replace(/\s+/g, "-"),
      images,
      lastUpdated: new Date().toISOString(),
    };

    setAlbums((prev) => {
      if (isEdit) {
        return [newAlbum, ...prev.filter((a) => a._id !== albumId)];
      }
      return [...prev, newAlbum];
    });
    setImages([])
    setTitle("")
    setOpen(false);
  }

  function handleAddImages(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    const newImages: AlbumImage[] = files.map((file) => ({
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);

    // reset input so same file can be re-selected
    e.target.value = "";
  }

  function removeImage(url: string) {
    setImages((prev) => prev.filter((img) => img.url !== url));
  }

  /* ---------------------------- Effects ---------------------------- */

  useEffect(() => {
    if (!isEdit || !albumId) return;

    const album = mockAlbums.find((a) => a._id === albumId);
    if (!album) return;

    setTitle(album.title);
    setImages(album.images);
  }, [albumId, isEdit]);

  useEffect(() => {
    setTitleError("");
    setImagesError("");
  }, [title, images]);

  /* ---------------------------- Render ----------------------------- */

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 gap-0">
        <DialogHeader className="p-6">
          <DialogTitle>
            {isEdit ? "Edit Photo Album" : "Create Photo Album"}
          </DialogTitle>
        </DialogHeader>

        <Separator />

        <ScrollArea className="h-96">
          <div className="p-6 space-y-6">
            {/* Album Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Album Name</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-12"
                aria-invalid={!!titleError}
              />
              {titleError && (
                <p className="text-sm text-destructive">{titleError}</p>
              )}
            </div>

            {/* Images Grid */}
            <div className="grid grid-cols-3 gap-2">
              {/* Add Images */}
              <div>
                <div
                  onClick={() => imageInputRef.current?.click()}
                  className={cn(
                    "h-34 flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-ring",
                    imagesError && "border-destructive"
                  )}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                    <Plus />
                  </span>
                  <p className="mt-4 text-sm font-medium">Add More Photos</p>
                </div>

                <input
                  ref={imageInputRef}
                  hidden
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleAddImages}
                />

                {imagesError && (
                  <p className="mt-1 text-sm text-destructive">{imagesError}</p>
                )}
              </div>

              {/* Preview Images */}
              {images.map((image, index) => (
                <div key={index} className="relative h-34">
                  <img
                    src={image.url}
                    alt=""
                    className="h-full w-full object-cover"
                  />

                  <Button
                    type="button"
                    size="icon-sm"
                    variant="secondary"
                    className="absolute right-2 top-2 rounded-full"
                    onClick={() => removeImage(image.url)}
                  >
                    <X size={18} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>

        <Separator />

        <DialogFooter className="p-6 flex gap-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {isEdit ? "Update Album" : "Post Album"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
