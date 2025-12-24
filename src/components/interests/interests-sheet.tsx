"use client";


import { Button } from "@/components/ui/button";
import { CardAction } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Interests } from "@/models/User";

import { NotebookPen } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import InterestsForm from "./interests-form";

export default function InterestsSheet({ interests }: { interests: Interests }) {
    const [open, setOpen] = useState(false);
    const { data: session } = useSession()
    const { username } = useParams()

    const canEdit = session?.user.username === username

    if (!canEdit) return null

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
                    <InterestsForm interests={interests} setOpen={setOpen} />
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}