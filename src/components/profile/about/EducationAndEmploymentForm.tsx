"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import {
  educationAndEmploymentSchema,
  EducationAndEmploymentFormValues,
} from "@/schema/education-employment-schema";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dispatch, SetStateAction, useRef } from "react";
import { EducationAndEmploymentItem } from "@/types/Education_Employment";
import { Plus } from "lucide-react";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  eduEmp: EducationAndEmploymentItem[];
  setEduEmp: Dispatch<SetStateAction<EducationAndEmploymentItem[]>>;
}
export function EducationAndEmploymentForm({
  open,
  setOpen,
  eduEmp,
  setEduEmp,
}: Props) {
  const submitBtnRef = useRef<HTMLButtonElement>(null); 

  const form = useForm<EducationAndEmploymentFormValues>({
    resolver: zodResolver(educationAndEmploymentSchema),
    defaultValues: {
      items:
        eduEmp.length > 0
          ? eduEmp
          : [
              {
                title: "",
                timestamp: "",
                description: "",
              },
            ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  function onSubmit(values: EducationAndEmploymentFormValues) {
    setEduEmp(values.items);
    setOpen(false)
  }

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
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 p-2"
            >
              {fields.map((field, index) => (
                <div key={field.id} className="space-y-4 rounded-lg border p-4">
                  <FormField
                    control={form.control}
                    name={`items.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Job or Degree title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`items.${index}.timestamp`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time period</FormLabel>
                        <FormControl>
                          <Input placeholder="2008 – 2013" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`items.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your role or studies"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}

              <div className="w-full text-right">
                <Button
                  size="icon-sm"
                  variant="secondary"
                  onClick={() =>
                    append({ title: "", timestamp: "", description: "" })
                  }
                >
                  <Plus />
                </Button>
              </div>

              <button ref={submitBtnRef} type="submit" />
            </form>
          </Form>
          <SheetFooter className="flex-row">
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
