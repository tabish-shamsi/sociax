import { CircleMinus, Ellipsis, Images, Pen } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { formatDistanceToNow } from "date-fns";
import { Album as AlbumType } from "@/models/Album";
import { Image } from "@/models/Image";
import { Button } from "../ui/button";
import AlbumDropdown from "./album-dropdown";

type Album = AlbumType & {
    images: Image[]
};

export default function AlbumCard({ album }: { album: Album }) {
    return (
        <Card className="overflow-hidden rounded-md p-0 gap-0">
            <CardHeader className="relative p-0">
                <div className="h-50 w-full">
                    <img
                        src={album.images[0]?.url}
                        alt={album.title}
                        className="h-full w-full object-cover"
                    />
                </div>
                {
                    !album.title.includes("Avatar") && !album.title.includes("Cover") && (
                        <AlbumDropdown trigger={
                            <Button
                                variant="secondary"
                                size="icon-sm"
                                className="absolute right-4 top-4"
                            >
                                <Ellipsis />
                            </Button>
                        } albumId={album._id.toString()} title={album.title} />
                    )
                }

            </CardHeader>

            <CardContent className="flex flex-col items-center p-6">
                <h4 className="text-lg font-medium">{album.title}</h4>
                <p className="text-sm text-muted-foreground">
                    Last updated{" "}
                    {formatDistanceToNow(new Date(album.updatedAt), {
                        addSuffix: true,
                    })}
                </p>
            </CardContent>
        </Card>
    )
}