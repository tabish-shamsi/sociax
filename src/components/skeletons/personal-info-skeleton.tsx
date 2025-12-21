import { Skeleton } from "@/components/ui/skeleton"

export default function PersonalInfoSkeleton() {
    return (
        <div className="rounded-xl border bg-card p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-8 w-8 rounded-md" />
            </div>

            {/* Divider */}
            <Skeleton className="h-px w-full" />

            {/* Info rows */}
            <div className="space-y-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="grid grid-cols-3 gap-4 items-center">
                        {/* Label */}
                        <Skeleton className="h-4 w-24" />
                        {/* Value */}
                        <Skeleton className="h-4 col-span-2 w-full" />
                    </div>
                ))}

                {/* About Me (multiline) */}
                <div className="grid grid-cols-3 gap-4">
                    <Skeleton className="h-4 w-24" />
                    <div className="col-span-2 space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                </div>
            </div>

            {/* Social network button */}
            <Skeleton className="h-10 w-full rounded-md" />
        </div>
    )
}
