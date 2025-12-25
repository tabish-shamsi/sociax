"use client"

import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { albumSchema, albumValues } from "@/schema/album-schema"

import {
    Form,
} from "@/components/ui/form"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { X } from "lucide-react"
import { useState } from "react"
import { InputField } from "../global/InputField"
import AddMoreImages from "./add-more-images"
import {createAlbum} from "@/actions/album"
import { showErrorToast } from "@/lib/toast"
import SubmitButton from "../global/SubmitButton"
import uploadImage from "@/actions/upload-image"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { useParams } from "next/navigation"



export default function CreateAlbumDialog({ trigger }: { trigger: React.ReactNode }) {


    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const { data: session } = useSession()
    const { username } = useParams()

    

    const form = useForm({
        resolver: zodResolver(albumSchema),
        defaultValues: {
            title: "",
            images: [],
        },
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "images",
    })

    const onSubmit = async (data: albumValues) => {

        try {
            setLoading(true)
            const uploadImages = data.images.map(async (image) => {
                const res = await uploadImage(image.file)
                return res
            })
            const uplodedImages = await Promise.all(uploadImages)
            await createAlbum(data.title, uplodedImages)
        } catch (error: any) {
            showErrorToast(error.message)
        } finally {
            setOpen(false)
            setLoading(false)

        }
    }

    const handleAddImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? [])
        if (!files.length) return

        files.forEach(file => {
            append({
                file,
                preview: URL.createObjectURL(file),
            })
        })

        e.target.value = ""
    }

    const isOwner = session?.user.username === username
    if (!isOwner) return null

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="p-0 gap-0">
                <DialogHeader className="p-6">
                    <DialogTitle>Create Photo Album</DialogTitle>
                </DialogHeader>

                <Separator />

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <ScrollArea className="h-96">
                            <div className="p-6 space-y-6">
                                {/* Title */}
                                <InputField control={form.control} name="title" label="Album Name" />

                                {/* Images */}
                                <div className="grid grid-cols-3 gap-2">
                                    <AddMoreImages error={form.formState.errors.images?.message ?? ""} onChange={handleAddImages} />

                                    {/* Previews */}
                                    {fields.map((image, index) => (
                                        <div key={image.id} className="relative h-34">
                                            <Image
                                                height={36}
                                                width={36}
                                                src={image.preview}
                                                className="h-full w-full object-cover"
                                                alt=""
                                            />
                                            <Button
                                                type="button"
                                                size="icon-sm"
                                                variant="secondary"
                                                className="absolute right-2 top-2 rounded-full"
                                                onClick={() => remove(index)}
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
                            <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <SubmitButton isLoading={loading} disabled={loading}>Post Album</SubmitButton>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
