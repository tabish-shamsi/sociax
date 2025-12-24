import { InputField } from "@/components/global/InputField";
import { InputSelect } from "@/components/global/InputSelect";
import { Button } from "@/components/ui/button";
import { SOCIAL_PLATFORMS } from "@/lib/social-platforms";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray } from "react-hook-form";

export default function AddSocials({ form }: { form: any }) {
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "socials",
    });

    const socials = form.watch("socials");

    const canAddMore =
        socials?.length === 0 ||
        socials?.[socials.length - 1]?.name &&
        socials?.[socials.length - 1]?.link;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Social Links</h3>

                <Button
                    type="button"
                    size="icon"
                    disabled={!canAddMore}
                    onClick={() => append({ name: "", link: "" })}
                >
                    <Plus className="h-4 w-4" />
                </Button>
            </div>

            <div className="space-y-3">
                {fields.map((field, index) => (
                    <div
                        key={field.id}
                        className="group flex items-end gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                    >
                        {/* Platform */}
                        <div className="flex-1">
                            <InputSelect
                                control={form.control}
                                name={`socials.${index}.name`}
                                label="Platform"
                                options={SOCIAL_PLATFORMS}
                            />
                        </div>

                        {/* Link */}
                        <div className="flex-1">
                            <InputField
                                control={form.control}
                                name={`socials.${index}.link`}
                                label="Link"
                            // icon={Link2} // optional if your component supports icons
                            />
                        </div>

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
        </div>
    )
}