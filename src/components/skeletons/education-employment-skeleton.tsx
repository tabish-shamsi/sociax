import { Skeleton } from "@/components/ui/skeleton";

export default function EducationAndEmploymentSkeleton() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
      {/* Header */}
      <Skeleton className="h-6 w-1/3 mb-4" />

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Education */}
        <div className="space-y-6">
          {/* Education Item 1 */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-3/4" /> {/* Title */}
            <Skeleton className="h-4 w-1/4" /> {/* Year */}
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
          </div>

          {/* Education Item 2 */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-3 w-full" />
          </div>

          {/* Education Item 3 */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>

        {/* Right Column: Employment */}
        <div className="space-y-6">
          {/* Employment Item 1 */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-3/4" /> {/* Job Title */}
            <Skeleton className="h-4 w-1/4" /> {/* Year */}
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
          </div>

          {/* Employment Item 2 */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
          </div>

          {/* Employment Item 3 */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
          </div>
        </div>
      </div>
    </div>
  );
}
