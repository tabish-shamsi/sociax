"use client"

import { showErrorToast } from "@/lib/toast";
import { InterestsFormValues, interestsSchema } from "@/schema/interests";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updateInterests } from "@/actions/update-interests";
import Form from "@/components/global/Form";
import { InputField } from "@/components/global/InputField";
import SubmitButton from "@/components/global/SubmitButton";
import { Dispatch, SetStateAction, useState } from "react";
import { Interests } from "@/models/User";
import { Button } from "../ui/button";

export default function InterestsForm({ interests, setOpen }: { interests: Interests, setOpen: Dispatch<SetStateAction<boolean>> }) {
    const [loading, setLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(interestsSchema),
        defaultValues: {
            hobbies: interests.hobbies ?? "",
            favourite_tv_shows: interests.favourite_tv_shows ?? "",
            favourite_movies: interests.favourite_movies ?? "",
            favourite_games: interests.favourite_games ?? "",
            favourite_music_artists: interests.favourite_music_artists ?? "",
            favourite_books: interests.favourite_books ?? "",
            favourite_writers: interests.favourite_writers ?? "",
            other_interests: interests.other_interests ?? ""
        }
    });

    const onSubmit = async (data: InterestsFormValues) => {
        setLoading(true)
        setOpen(false)
        const res = await updateInterests(data)
        if (!res.success) showErrorToast(res.message)
        setLoading(false)
    };
    return (
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
                    <SubmitButton isLoading={loading} disabled={loading} className="" >Save Changes</SubmitButton>
                    <Button variant="secondary" onClick={() => setOpen(false)} className="">
                        Cancel
                    </Button>
                </div>
            </div>
        </Form>
    )
}