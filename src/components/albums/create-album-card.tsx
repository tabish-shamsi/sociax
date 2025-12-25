import { Plus } from "lucide-react";

export default function CreateAlbumCard() {
    return (
        <div
            className="flex cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-ring h-full"
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
    )
}