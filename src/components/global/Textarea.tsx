
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea as ShadcnTextarea } from "@/components/ui/textarea";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface FormInputFieldProps<T extends FieldValues> {
    type?: "email" | "password";
    control: Control<T>;
    name: FieldPath<T>;
    label: string;
}

export function Textarea<T extends FieldValues>({
    control,
    name,
    label, 
}: FormInputFieldProps<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="w-full">
                    <FormLabel>{label}</FormLabel>
                    <FormControl >
                        <ShadcnTextarea {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}