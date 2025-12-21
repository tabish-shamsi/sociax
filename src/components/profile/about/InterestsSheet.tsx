"use client";

import { updateInterests } from "@/actions/update-interests";
import Form from "@/components/global/Form";
import { InputField } from "@/components/global/InputField";
import SubmitButton from "@/components/global/SubmitButton";
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
import { showErrorToast } from "@/lib/toast";
import { Interests } from "@/models/User";
import { InterestsFormValues, interestsSchema } from "@/schema/interests";
import { zodResolver } from "@hookform/resolvers/zod";
import { NotebookPen } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form"; 

export default function InterestsSheet({ interests }: { interests: Interests }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(interestsSchema),
    defaultValues: interests
  });

  const onSubmit = async (data: InterestsFormValues) => {
    setLoading(true)
    const res = await updateInterests(data)
    if (!res.success) showErrorToast(res.message)
      setLoading(false)
    setOpen(false)
  };

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

          <Form form={form} handleSubmit={onSubmit}>
            <div className="space-y-6 p-6">
              <InputField control={form.control} name="hobbies" label="Hobbies" />
              <InputField control={form.control} name="favourite_tv_shows" label="Favourite TV Shows" />
              <InputField control={form.control} name="favourite_movies" label="Favourite Movies" />
              <InputField control={form.control} name="favourite_games" label="Favourite Games" />
              <InputField control={form.control} name="favourite_music_artists" label="Favourite Music Artists" />
              <InputField control={form.control} name="favourite_books" label="Favourite Books" />
              <InputField control={form.control} name="favourite_writers" label="Favourite Writers" />
              <InputField control={form.control} name="other_interests" label="Other Interests" />

              <div className="flex gap-4">
                <SubmitButton isLoading={loading} >Save Changes</SubmitButton>
                <Button variant="secondary" onClick={() => setOpen(false)} className="w-full">
                  Cancel
                </Button>
              </div>
            </div>
          </Form>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}