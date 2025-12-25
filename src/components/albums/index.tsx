import getAlbums from "@/data/get-albums"
import AlbumCard from "./album-card";
import CreateAlbumCard from "./create-album-card";
import AlbumHeader from "./album-header";
import CreateAlbumDialog from "./create-album-dialog";

export default async function Albums({ username }: { username: string }) {
    const albums = await getAlbums(username)()

    if (!albums || albums?.length === 0) return (
        <main className="flex w-full flex-col gap-8">
            <div className="grid w-full gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                <p>No albums found</p>
            </div>
        </main>
    )

    return (
        <main className="flex w-full flex-col gap-8">
            <AlbumHeader firstName="Tabish" />
            <div className="grid w-full gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                <CreateAlbumDialog trigger={<CreateAlbumCard />} /> 
                {albums.map((album) => (
                    <AlbumCard key={album._id} album={album} />
                ))}
            </div>
        </main>
    )
}