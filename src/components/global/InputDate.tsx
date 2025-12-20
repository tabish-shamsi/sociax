"use client"

import { ChevronDownIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { useState } from "react"; 
import { cn } from "@/lib/utils";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { format } from "date-fns";

interface FormInputFieldProps<T extends FieldValues> {
    control: Control<T>;
    name: FieldPath<T>;
    label: string;
}
export default function InputDate<T extends FieldValues>({
    control,
    name,
    label,
}: FormInputFieldProps<T>) {
    const [openCalendar, setOpenCalendar] = useState(false);

    return (
        <FormField
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Popover
                            open={openCalendar}
                            onOpenChange={setOpenCalendar}
                        >
                            <PopoverTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className={cn(
                                        "w-full justify-between font-normal border",
                                        fieldState.error
                                            ? "border-destructive"
                                            : " border-input"
                                    )}
                                >
                                    {field.value
                                        ? format(new Date(field.value), "dd/MM/yyyy")
                                        : "Select date"}
                                    <ChevronDownIcon className="h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>

                            <PopoverContent
                                className="w-auto overflow-hidden p-0"
                                align="start"
                            >
                                <Calendar
                                    mode="single"
                                    selected={new Date(field.value)}
                                    onSelect={(date) => {
                                        field.onChange(date?.toISOString());
                                        setOpenCalendar(false);
                                    }}
                                    captionLayout="dropdown"
                                />
                            </PopoverContent>
                        </Popover>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />

    )
}

