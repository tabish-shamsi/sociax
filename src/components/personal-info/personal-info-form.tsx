"use client"

import { PersonalInfo, Social } from "@/models/User";
import { personalInfoFormValues, personalInfoSchema } from "@/schema/personal-info";
import Form from "../global/Form";
import { InputField } from "../global/InputField";
import InputDate from "../global/InputDate";
import { InputSelect } from "../global/InputSelect";
import AddSocials from "./add-socials";
import { Button } from "../ui/button";
import SubmitButton from "../global/SubmitButton";
import { genders } from "@/lib/genders";
import { statuses } from "@/lib/statuses";
import { updatePersonalInfo } from "@/actions/update-personal-info";
import { showErrorToast } from "@/lib/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useState } from "react";
import { usePathname } from "next/navigation";

export default function PersonalInfoForm({ setOpen, personalInfo }: { setOpen: Dispatch<SetStateAction<boolean>>, personalInfo: PersonalInfo }) {
    const [isPending, setIsPending] = useState(false);
    const pathname = usePathname()

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
            setOpen(false)
            await updatePersonalInfo(payload, pathname);
        } catch (error) {
            console.error(error)
            showErrorToast("Something went wrong, please try again later.");
        } finally {
            setIsPending(false)
        }
    }
    return (
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
    )
}