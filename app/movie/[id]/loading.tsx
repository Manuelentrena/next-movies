"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SkeletonMovieDetailPage() {
  const router = useRouter();
  return (
    <section className="z-50 w-full bg-muted pb-24 text-foreground sm:pb-24">
      {/* Navbar */}
      <div className="container flex w-full max-w-5xl items-center justify-between px-8 py-8">
        <Button onClick={() => router.back()} variant="outline" className="flex items-center border-4 border-primary">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back Page
        </Button>

        <Skeleton className="h-10 w-10 bg-gray-300 shadow-2xl" />
      </div>

      {/* MovieDetail */}
      <div className="container grid max-w-5xl grid-cols-1 gap-8 px-8 md:grid-cols-2 md:gap-12 lg:gap-16">
        {/* Poster */}
        <div className="relative overflow-hidden rounded-lg">
          <Skeleton className="z-50 h-full w-full bg-gray-300 shadow" style={{ aspectRatio: "300/450" }} />
        </div>

        {/* InfoDetail */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="mb-10 h-10 w-5/6 bg-gray-300 shadow-2xl" /> {/* Título */}
            <Skeleton className="h-4 w-full bg-gray-300 shadow-2xl" /> {/* Plot */}
            <Skeleton className="h-4 w-full bg-gray-300 shadow-2xl" /> {/* Plot */}
            <Skeleton className="h-4 w-full bg-gray-300 shadow-2xl" /> {/* Plot */}
            <Skeleton className="h-4 w-3/4 bg-gray-300 shadow-2xl" /> {/* Plot extra */}
          </div>

          <div className="mt-20 flex flex-col items-start justify-start gap-2">
            <Skeleton className="h-8 w-52 rounded-full bg-gray-300 shadow-2xl" /> {/* Badge de tipo */}
            <Skeleton className="h-8 w-52 rounded-full bg-gray-300 shadow-2xl" /> {/* Badge de género */}
            <Skeleton className="h-8 w-52 rounded-full bg-gray-300 shadow-2xl" /> {/* Badge de rating */}
            <Skeleton className="h-8 w-52 rounded-full bg-gray-300 shadow-2xl" /> {/* Badge de release */}
            <Skeleton className="h-8 w-52 rounded-full bg-gray-300 shadow-2xl" /> {/* Badge de release */}
          </div>

          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-20" /> {/* Skeleton para Score */}
          </div>
        </div>
      </div>
    </section>
  );
}
