import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useRef } from "react";
import { FormMessage } from "@/components/ui/form";

export default function AddMoreImages({
    error,
    onChange,
}: {
    error: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    const ref = useRef<HTMLInputElement>(null);

    return (
        <div>
            <div
                onClick={() => ref.current?.click()}
                className={cn(
                    "h-34 flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-ring",
                    error && "border-destructive"
                )}
            >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                    <Plus />
                </span>
                <p className="mt-4 text-sm font-medium">
                    Add More Photos
                </p>
            </div>

            <input
                ref={ref}
                hidden
                type="file"
                accept="image/*"
                multiple
                onChange={onChange}
            />

            <FormMessage>
                {error}
            </FormMessage>
        </div>
    )
}