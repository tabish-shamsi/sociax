"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

import {
  educationAndEmploymentSchema,
  EducationAndEmploymentFormValues,
} from "@/schema/education-employment";
import {
  Sheet,
  SheetClose,
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
import Form from "@/components/global/Form";
import { InputField } from "@/components/global/InputField";
import { Textarea } from "@/components/global/Textarea";
import { Education_Employment } from "@/models/User";
import { updateEducationEmployment } from "@/actions/update-education-employment";
import { showErrorToast } from "@/lib/toast";
import SubmitButton from "@/components/global/SubmitButton";

export function EducationAndEmploymentSheet({ eduEmp }: { eduEmp: Education_Employment[] }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
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

  async function onSubmit(values: EducationAndEmploymentFormValues) {
    setLoading(true)
    const payload = [...values.items]
    const res = await updateEducationEmployment(payload)
    if (!res.success) showErrorToast(res.message)
    setLoading(false)
    setOpen(false)
  }

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
            <div className="space-y-4 px-6 pb-6 w-full">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Add Education / Employment</h3>

                <Button
                  type="button"
                  variant="secondary"
                  size="icon-sm"
                  onClick={() => append({ title: "", timestamp: "", description: "" })}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="group flex flex-col items-end gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50 w-full"
                  >
                    <InputField control={form.control} name={`items.${index}.title`} label="Title" />
                    <InputField control={form.control} name={`items.${index}.timestamp`} label="Time Stamp" />
                    <Textarea control={form.control} name={`items.${index}.description`} label="Description" />

                    {/* Remove Button */}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 "
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-4 w-full">
                <SubmitButton isLoading={loading} className="w-1/2">
                  Save changes
                </SubmitButton>
                <Button variant="outline" onClick={() => setOpen(false)} className="w-1/2">Close</Button>
              </div>
            </div>
          </Form>

        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
