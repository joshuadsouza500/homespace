import { Skeleton } from "./ShadCN/skeleton";

const SkeletonLoader = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Results count skeleton */}
      <div className="mb-6">
        <Skeleton className="h-6 w-48" />
      </div>

      {/* Property cards grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1  gap-6 mb-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <PropertyCardSkeleton key={index} />
        ))}
      </div>

      {/* Pagination skeleton */}
    </div>
  );
};

export default SkeletonLoader;

function PropertyCardSkeleton() {
  return (
    <div className="border rounded-lg overflow-hidden flex max-w-sm sm:max-w-xl md:max-w-3xl mx-1 md:h-64 lg:h-[275px]">
      {/* Property image skeleton */}
      <Skeleton className="h-full w-full" />

      {/* Property content skeleton */}
      <div className="p-4 space-y-3 w-full">
        <Skeleton className="h-6 w-2/4" />

        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="flex gap-4 pt-4 lg:pt-20">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}
