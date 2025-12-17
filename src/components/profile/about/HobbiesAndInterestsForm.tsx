"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; 
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { interestsSchema } from "@/schema/interests-schema";
import { Interests } from "@/types/Interests";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useRef } from "react";
import { useForm } from "react-hook-form"; 
import z from "zod";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  interests: Interests;
  setInterests: Dispatch<SetStateAction<Interests>>
}

export default function HobbiesAndInterestsForm({ open, setOpen, interests, setInterests }: Props) {
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  const form = useForm({
    resolver: zodResolver(interestsSchema),
    defaultValues: interests
  });

  const onSubmit = (data: z.infer<typeof interestsSchema>) => {
    setInterests(data)
    setOpen(false)
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <ScrollArea className="w-full h-full">
          <SheetHeader>
            <SheetTitle>Edit Hobbies And Interests</SheetTitle>
            <SheetDescription>
              Update your hobbies and interests here. Separate each item with a
              comma, then click Save when you’re done.
            </SheetDescription>
          </SheetHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-8 px-6">
                <FormField
                  control={form.control}
                  name="hobbies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hobbies</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="favourite_tv_shows"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Favourite TV Shows</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="favourite_movies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Favourite Movies</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="favourite_games"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Favourite Games</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="favourite_music_artists"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Favourite Music Artists</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="favourite_books"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Favourite Books</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="favourite_writers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Favourite Writers</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="other_interests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Other Interests</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <button type="submit" ref={submitBtnRef} />
            </form>
          </Form>

          <SheetFooter>
            <Button onClick={() => submitBtnRef.current?.click()} type="submit">
              Save changes
            </Button>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
