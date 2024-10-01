import MovieCard from "@/app/_components/MovieCard";
import { Movie } from "@/core/movies/domain/Movie";
import { useState } from "react";

export default function MoviesContainer({ movies }: { movies: Movie[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-10 px-2 md:grid-cols-3 md:px-8">
      {movies.map((movie, index) => (
        <MovieCard
          key={movie.Id}
          Title={movie.Title}
          Year={movie.Year}
          Type={movie.Type}
          Poster={movie.Poster}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
