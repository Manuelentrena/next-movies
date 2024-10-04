"use client";

import MovieCard from "@/app/(home)/_components/MovieCard";
import { MovieDetail } from "@/core/movies/domain/Movie";
import { useState } from "react";

export default function MoviesContainer({ movies }: { movies: MovieDetail[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div className="mx-auto mb-10 grid min-h-[1080px] w-full max-w-5xl grid-cols-2 gap-2 px-2 md:grid-cols-3 md:gap-10 md:px-8">
      {movies.map((movie, index) => (
        <MovieCard key={movie.Id} {...movie} index={index} hovered={hovered} setHovered={setHovered} />
      ))}
    </div>
  );
}
