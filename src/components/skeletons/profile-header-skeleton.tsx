"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "../ui/card";

export default function ProfileHeaderSkeleton() {
    return (
        <Card className="gap-0 p-6 mb-8">
            <div className="relative h-75 w-full">
                <Skeleton className="h-full w-full" />

                <Skeleton className="h-48 w-48 border-2 border-card rounded-full absolute top-[148px] left-1/2 -translate-x-1/2" />
            </div>

            <div className="flex items-center justify-center md:gap-16 mt-12">
                <Skeleton className="h-8 w-30 rounded-md md:block hidden" />
                <Skeleton className="h-8 w-30 rounded-md md:block hidden" />

                <div className="flex flex-col items-center justify-center gap-2">
                    <Skeleton className="h-8 w-40 rounded-md " />
                    <Skeleton className="h-6 w-24 rounded-md " />


                </div>
                <Skeleton className="h-8 w-30 rounded-md md:block hidden" />
                <Skeleton className="h-8 w-30 rounded-md md:block hidden" />
            </div>
            <div className="flex items-center justify-center gap-4 md:hidden  mt-6">
                <Skeleton className="h-6 w-18 rounded-md" />
                <Skeleton className="h-6 w-18 rounded-md" />
                <Skeleton className="h-6 w-18 rounded-md" />
                <Skeleton className="h-6 w-18 rounded-md" />
            </div>
        </Card>
    );
}
