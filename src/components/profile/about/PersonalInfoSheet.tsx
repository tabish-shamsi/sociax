"use client"

import { updatePersonalInfo } from "@/actions/update-personal-info";
import Form from "@/components/global/Form";
import InputDate from "@/components/global/InputDate";
import { InputField } from "@/components/global/InputField";
import { InputSelect } from "@/components/global/InputSelect";
import SubmitButton from "@/components/global/SubmitButton";
import { Button } from "@/components/ui/button";
import { CardAction } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { genders } from "@/lib/genders";
import { statuses } from "@/lib/statuses";
import { PersonalInfo, Social } from "@/models/User";
import { personalInfoSchema, personalInfoFormValues } from "@/schema/personal-info";
import { zodResolver } from "@hookform/resolvers/zod";
import { NotebookPen } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import AddSocials from "./AddSocials";
import { format } from "date-fns";
import { showErrorToast, showSuccessToast } from "@/lib/toast";

export default function PersonalInfoSheet({ personalInfo }: { personalInfo: PersonalInfo }) {
    const [isPending, setIsPending] = useState(false);
    const [open, setOpen] = useState(false)

    function normalizeSocials(socials?: Social[]) {
        if (!socials || socials.length === 0) {
            return [{ name: "", link: "" }];
        }

        return socials.filter(
            (s) => s.name?.trim() && s.link?.trim()
        );
    }

    const defaultValues: Partial<personalInfoFormValues> = {
        birthday: String(personalInfo.birthday),
        gender: personalInfo?.gender ?? "",
        about_me: personalInfo?.about_me ?? "",
        birthplace: personalInfo?.birthplace ?? "",
        occupation: personalInfo?.occupation ?? "",
        lives_in: personalInfo?.lives_in ?? "",
        status: personalInfo?.status ?? "",
        socials: normalizeSocials(personalInfo?.socials),
    };

    const form = useForm<personalInfoFormValues>({
        resolver: zodResolver(personalInfoSchema),
        defaultValues,
    });

    async function onSubmit(values: personalInfoFormValues) {
        const cleanedSocials = values.socials?.filter(
            (s) => s.name?.trim() && s.link?.trim()
        );

        const payload = {
            ...values,
            socials: cleanedSocials?.length ? cleanedSocials : [],
        };
        setIsPending(true)
        try {
            await updatePersonalInfo(payload);
        } catch (error) {
            console.error(error)
            showErrorToast("Something went wrong, please try again later.");
        } finally {
            setIsPending(false)
            setOpen(false)
        }
    }

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

                    <Form form={form} handleSubmit={onSubmit}>
                        <div className="space-y-6 p-4">
                            <InputField control={form.control} label="About Me" name="about_me" />
                            <InputDate control={form.control} label="Date Of Birth" name="birthday" />
                            <InputField control={form.control} label="Birthplace" name="birthplace" />
                            <InputField control={form.control} label="Lives In" name="lives_in" />
                            <InputField control={form.control} label="Occupation" name="occupation" />
                            <InputSelect control={form.control} label="Marital Status" name="status" options={statuses} />
                            <InputSelect control={form.control} label="Gender" name="gender" options={genders} />
                            <AddSocials form={form} />

                            <div className="flex items-center justify-center w-full gap-4">
                                <Button onClick={() => setOpen(false)} variant="outline">Close</Button>
                                <SubmitButton isLoading={isPending}>
                                    Save changes
                                </SubmitButton>
                            </div>
                        </div>
                    </Form>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}