import { Skeleton } from "@/components/ui/skeleton";

export default function InterestsSkeleton() {
    return (
        <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
            {/* Header */}
            <Skeleton className="h-6 w-1/3 mb-4" />

            {/* Two-column layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Column 1 */}
                <div className="space-y-6">
                    {/* Hobbies */}
                    <div>
                        <Skeleton className="h-5 w-1/2 mb-2" />
                        <div className="flex flex-wrap gap-2">
                            <Skeleton className="h-6 w-20" />
                            <Skeleton className="h-6 w-24" />
                            <Skeleton className="h-6 w-28" />
                        </div>
                    </div>

                    {/* Favourite Movies */}
                    <div>
                        <Skeleton className="h-5 w-1/2 mb-2" />
                        <div className="flex flex-wrap gap-2">
                            <Skeleton className="h-6 w-28" />
                            <Skeleton className="h-6 w-36" />
                            <Skeleton className="h-6 w-24" />
                            <Skeleton className="h-6 w-20" />
                        </div>
                    </div>

                    {/* Favourite Music Artists */}
                    <div>
                        <Skeleton className="h-5 w-1/2 mb-2" />
                        <div className="flex flex-wrap gap-2">
                            <Skeleton className="h-6 w-20" />
                            <Skeleton className="h-6 w-24" />
                            <Skeleton className="h-6 w-28" />
                            <Skeleton className="h-6 w-24" />
                            <Skeleton className="h-6 w-32" />
                        </div>
                    </div>

                    {/* Favourite Writers */}
                    <div>
                        <Skeleton className="h-5 w-1/2 mb-2" />
                        <div className="flex flex-wrap gap-2">
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-6 w-36" />
                            <Skeleton className="h-6 w-28" />
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-6 w-24" />
                        </div>
                    </div>
                </div>

                {/* Column 2 */}
                <div className="space-y-6">
                    {/* Favourite TV Shows */}
                    <div>
                        <Skeleton className="h-5 w-1/2 mb-2" />
                        <div className="flex flex-wrap gap-2">
                            <Skeleton className="h-6 w-28" />
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-6 w-28" />
                            <Skeleton className="h-6 w-28" />
                            <Skeleton className="h-6 w-24" />
                        </div>
                    </div>

                    {/* Favourite Games */}
                    <div>
                        <Skeleton className="h-5 w-1/2 mb-2" />
                        <div className="flex flex-wrap gap-2">
                            <Skeleton className="h-6 w-28" />
                            <Skeleton className="h-6 w-36" />
                            <Skeleton className="h-6 w-28" />
                            <Skeleton className="h-6 w-20" />
                            <Skeleton className="h-6 w-28" />
                            <Skeleton className="h-6 w-36" />
                        </div>
                    </div>

                    {/* Favourite Books */}
                    <div>
                        <Skeleton className="h-5 w-1/2 mb-2" />
                        <div className="flex flex-wrap gap-2">
                            <Skeleton className="h-6 w-36" />
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-6 w-28" />
                            <Skeleton className="h-6 w-36" />
                            <Skeleton className="h-6 w-28" />
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-6 w-36" />
                        </div>
                    </div>

                    {/* Other Interests */}
                    <div>
                        <Skeleton className="h-5 w-1/2 mb-2" />
                        <Skeleton className="h-6 w-24" />
                    </div>
                </div>
            </div>
        </div>
    );
}
