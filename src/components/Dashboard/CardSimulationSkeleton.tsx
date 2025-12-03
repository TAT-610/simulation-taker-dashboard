import { Skeleton } from "../ui/skeleton";

export function CardSimulationSkeleton() {
  return (
    <div className="p-4 bg-gray-50 rounded-xl shadow-sm border mb-4">
      <div className="flex justify-between items-start">
        <div className="w-full">
          <div className="flex items-center gap-2">
            <Skeleton className="w-6 h-6 rounded-md" />
            <Skeleton className="h-5 w-40" />
          </div>

          <div className="flex gap-2 mt-2">
            <Skeleton className="h-4 w-20 rounded-full" />
            <Skeleton className="h-4 w-20 rounded-full" />
          </div>

          <Skeleton className="h-4 w-28 mt-2" />
        </div>

        <Skeleton className="h-3 w-16" />
      </div>

      <div className="mt-4">
        <Skeleton className="h-4 w-44" />
        <Skeleton className="h-2 w-full mt-2 rounded-full" />
      </div>

      <div className="flex gap-2 mt-3">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-5 w-12 rounded-full" />
      </div>
    </div>
  );
}
