"use client"

import { Button } from "@/components/ui/button";
import { CardAction } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { PersonalInfo } from "@/models/User";
import { NotebookPen } from "lucide-react";
import { useState } from "react";
import PersonalInfoForm from "./personal-info-form";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

export default function PersonalInfoSheet({ personalInfo }: { personalInfo: PersonalInfo }) {
    const [open, setOpen] = useState(false)
    const {data:session} = useSession()
    const {username} = useParams()

    const canEdit = session?.user.username === username
    if(!canEdit) return null

    return (
        <Sheet open={open} onOpenChange={setOpen} >
            <SheetTrigger asChild>
                <CardAction>
                    <Button variant="secondary" size="icon-sm">
                        <NotebookPen className="text-muted-foreground" />
                    </Button>
                </CardAction>
            </SheetTrigger>

            <SheetContent side="left" className="max-w-[40%]">
                <ScrollArea className="h-full">
                    <SheetHeader>
                        <SheetTitle>Edit Personal Info</SheetTitle>
                        <SheetDescription>
                            Make changes to your profile here. Click save when
                            you&apos;re done.
                        </SheetDescription>
                    </SheetHeader>
                    <PersonalInfoForm setOpen={setOpen} personalInfo={personalInfo} />
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}