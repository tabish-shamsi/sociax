"use client";

import { Button } from "@/components/ui/button";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { NotebookPen, Plus, Trash2 } from "lucide-react";
import { CardAction } from "@/components/ui/card";
import { Education_Employment } from "@/models/User";
import EducationEmploymentForm from "./education-employment-form";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function EducationEmploymentSheet({ eduEmp }: { eduEmp: Education_Employment[] }) {
    const [open, setOpen] = useState(false);
    const {username} = useParams()
    const {data: session} = useSession()

    const canEdit = session?.user?.username === username

    if(!canEdit) return null

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <CardAction>
                    <Button
                        variant="secondary"
                        size="icon-sm"
                    >
                        <NotebookPen className="text-muted-foreground" />
                    </Button>
                </CardAction>
            </SheetTrigger>
            <SheetContent className="lg:max-w-2xl">
                <ScrollArea className="w-full h-full">
                    <SheetHeader>
                        <SheetTitle>Edit Hobbies And Interests</SheetTitle>
                        <SheetDescription>
                            Update your hobbies and interests here. Separate each item with a
                            comma, then click Save when you’re done.
                        </SheetDescription>
                    </SheetHeader>

                    <EducationEmploymentForm education_employment={eduEmp} setOpen={setOpen} />

                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}
