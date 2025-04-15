import { Skeleton } from "../skeleton";

export default function Loader() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[70vh] py-12 px-4">
      {/* Loading text with animation */}
      <h1 className="text-3xl  font-bold text-center mb-8">
        <span className="inline-block animate-pulse">Loading</span>
        <span className="inline-block animate-pulse delay-100">.</span>
        <span className="inline-block animate-pulse delay-200">.</span>
        <span className="inline-block animate-pulse delay-300">.</span>
      </h1>

      <div className="w-full max-w-3xl space-y-8">
        {/* Large hero skeleton */}
        <Skeleton className="h-[200px] w-full rounded-xl" />

        {/* Content skeletons - just a few large blocks */}
        <Skeleton className="h-12 w-3/4 mx-auto" />

        <div className="space-y-6">
          <Skeleton className="h-24 w-full rounded-lg" />
          <Skeleton className="h-24 w-full rounded-lg" />
        </div>

        {/* Action skeleton */}
        <Skeleton className="h-14 w-48 mx-auto rounded-full" />
      </div>
    </div>
  );
}
