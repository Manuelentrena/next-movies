import { Skeleton } from "@/components/ui/skeleton";

export default function MoviesContainerSkeleton({ counter }: { counter: number }) {
  return (
    <>
      {Array.from({ length: counter }).map((_, index) => (
        <div key={index} className="relative h-60 w-full overflow-hidden rounded-lg bg-gray-100 md:h-96">
          <Skeleton className="absolute inset-0 z-10 h-full w-full bg-gray-300 shadow-2xl" />
          <div className="absolute inset-0 flex items-end bg-gray-300 px-4 py-8 shadow-2xl">
            <div className="w-full">
              <Skeleton className="mb-4 h-6 w-3/4" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
