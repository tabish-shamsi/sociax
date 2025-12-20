
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface FormInputFieldProps<T extends FieldValues> {
    type?: "email" | "password";
    control: Control<T>;
    name: FieldPath<T>;
    label: string;
}

export function InputField<T extends FieldValues>({
    control,
    name,
    label,
    type,
}: FormInputFieldProps<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="w-full">
                    <FormLabel>{label}</FormLabel>
                    <FormControl >
                        <Input  type={type ? type : "text"} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}