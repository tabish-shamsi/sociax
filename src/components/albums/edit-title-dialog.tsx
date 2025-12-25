"use client"

import { Dispatch, SetStateAction, useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import SubmitButton from "../global/SubmitButton";
import { InputField } from "../global/InputField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editTitleSchema, editTitleValues } from "@/schema/album-schema";
import { updateAlbum } from "@/actions/album";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import Form from "../global/Form";

export default function EditTitleDialog({ title, albumId, open, setOpen }: { title: string, albumId: string, open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) {

    const [loading, setLoading] = useState(false)
    console.log(title);
    

    const form = useForm({
        resolver: zodResolver(editTitleSchema),
        defaultValues: { 
            title: title ?? ""
         }
    })

    const onSubmit = async (data: editTitleValues) => {
        setLoading(true)
        const res = await updateAlbum(albumId, data.title)
        if (!res.success) showErrorToast(res.message)
        else showSuccessToast(res.message)
        setOpen(false)
        setLoading(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="p-0 gap-0">
                <DialogHeader className="p-6">
                    <DialogTitle>Edit Album</DialogTitle>
                </DialogHeader>

                <Separator />

                <Form form={form} handleSubmit={onSubmit}>
                    <div className="p-6 space-y-6">
                        <InputField control={form.control} name="title" label="Album Name" />
                    </div>

                    <Separator />

                    <DialogFooter className="p-6 flex gap-4">
                        <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <SubmitButton isLoading={loading} disabled={loading}>Save Album</SubmitButton>
                    </DialogFooter>
                </Form>

            </DialogContent>
        </Dialog>
    )
}