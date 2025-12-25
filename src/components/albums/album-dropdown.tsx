"use client"

import { CircleMinus, Loader2, Pen } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { deleteAlbum } from "@/actions/album";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import { useState } from "react";
import EditTitleDialog from "./edit-title-dialog";

export default function AlbumDropdown({ trigger, albumId, title }: { trigger: React.ReactNode, albumId: string, title: string }) {
    const [loading, setLoading] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const { data: session } = useSession()
    const { username } = useParams()
    const isOwner = session?.user?.username === username

    if (!isOwner) return null

    const handleDeleteAlbum = async () => {
        setLoading(true)

        const response = await deleteAlbum(albumId)
        if (!response.success) {
            showErrorToast(response.message)
        } else {
            showSuccessToast(response.message)
        }

        setLoading(false)
    }

    if (loading) return (
        <div className="absolute right-4 top-4">
            <Loader2 className="animate-spin text-primary" />
        </div>
    )

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    {trigger}
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
                        <Pen className="mr-2 h-4 w-4" />
                        <span>Edit title</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDeleteAlbum}>
                        <CircleMinus className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <EditTitleDialog albumId={albumId} title={title} open={isEditOpen} setOpen={setIsEditOpen} />
        </>
    )
}