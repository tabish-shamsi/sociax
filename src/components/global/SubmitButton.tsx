import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

export default function SubmitButton({ children, isLoading, className, disabled }: { children: React.ReactNode; isLoading: boolean; className?: string, disabled?: boolean }) {
    return (
        <Button type="submit" className={className} disabled={disabled}>
            <span className="sr-only">Submit</span>
            {
                isLoading ? <Loader2 className="animate-spin" /> : children
            }
        </Button>
    )
}