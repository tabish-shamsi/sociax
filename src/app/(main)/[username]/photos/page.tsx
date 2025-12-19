"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { albums as initialAlbums, user } from "@/lib/user";
import { formatDistanceToNow } from "date-fns";
import { CircleMinus, Ellipsis, Images, Pen, Plus } from "lucide-react";
import { useState } from "react";
import CreateAlbumForm from "./CreateAlbumForm";

type Image = {
  _id?: string;
  url: string;
};

type Album = {
  _id: string;
  title: string;
  slug?: string;
  images: Image[];
  lastUpdated: string;
};

export default function Photos() {
  const [albums, setAlbums] = useState<Album[]>(initialAlbums);

  const [viewedImages, setViewedImages] = useState<Image[]>([]);
  const isViewingAlbum = viewedImages.length > 0;

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingAlbumId, setEditingAlbumId] = useState<string | null>(null);

  /* ---------------------------- Handlers ---------------------------- */

  function handleCreateAlbum() {
    setIsCreateOpen(true);
  }

  function handleEditAlbum(albumId: string) {
    setEditingAlbumId(albumId);
    setIsEditOpen(true);
  }

  function handleDeleteAlbum(albumId: string) {
    setAlbums((prev) => prev.filter((album) => album._id !== albumId));
  }

  function handleViewAlbum(images: Image[]) {
    setViewedImages(images);
  }

  function handleBackToAlbums() {
    setViewedImages([]);
  }

  /* ---------------------------- Renderers --------------------------- */

  function renderAlbums() {
    return (
      <>
        {/* Create Album Card */}
        <div
          onClick={handleCreateAlbum}
          className="flex cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-ring"
        >
          <div className="flex flex-col items-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
              <Plus />
            </span>
            <h4 className="mt-4 text-lg font-medium">Create an Album</h4>
            <p className="text-sm text-muted-foreground">
              It only takes a few minutes.
            </p>
          </div>
        </div>

        {albums.map((album) => (
          <Card key={album._id} className="overflow-hidden rounded-md p-0 gap-0">
            <CardHeader className="relative p-0">
              <div className="h-50 w-full">
                <img
                  src={album.images[0]?.url}
                  alt={album.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon-sm"
                    className="absolute right-4 top-4"
                  >
                    <Ellipsis />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleEditAlbum(album._id)}>
                    <Pen /> Edit
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => handleViewAlbum(album.images)}
                  >
                    <Images /> View Album
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => handleDeleteAlbum(album._id)}
                  >
                    <CircleMinus /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>

            <CardContent className="flex flex-col items-center p-6">
              <h4 className="text-lg font-medium">{album.title}</h4>
              <p className="text-sm text-muted-foreground">
                Last updated{" "}
                {formatDistanceToNow(new Date(album.lastUpdated), {
                  addSuffix: true,
                })}
              </p>
            </CardContent>
          </Card>
        ))}
      </>
    );
  }

  function renderImages() {
    return (
      <>
        <div className="col-span-full">
          <Button variant="outline" onClick={handleBackToAlbums}>
            ← Back to Albums
          </Button>
        </div>

        {viewedImages.map((image, index) => (
          <div key={image._id ?? index} className="relative h-56 w-full">
            <img src={image.url} className="h-full w-full object-cover" />
          </div>
        ))}
      </>
    );
  }

  function Header() {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col sm:flex-row gap-2 items-center justify-between w-full">
          <CardTitle className="text-lg">{`${
            user.name.split(" ")[0]
          }'s Photo Albums`}</CardTitle>
        </CardContent>
      </Card>
    );
  }

  /* ----------------------------- Render ----------------------------- */

  return (
    <main className="flex w-full flex-col gap-8">
      <Header />
      <div className="grid w-full gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {isViewingAlbum ? renderImages() : renderAlbums()}
      </div>

      {/* Create Album */}
      <CreateAlbumForm
        open={isCreateOpen}
        setOpen={setIsCreateOpen}
        setAlbums={setAlbums}
      />

      {/* Edit Album */}
      <CreateAlbumForm
        open={isEditOpen}
        setOpen={setIsEditOpen}
        albumId={editingAlbumId ?? undefined}
        setAlbums={setAlbums}
        isEdit
      />
    </main>
  );
}
