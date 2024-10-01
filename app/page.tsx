"use client";

import { MoviesContainer } from "@/app/_components";
import { SearchForm } from "@/components/global/SearchForm";
import { useMovies } from "@/store/Movies.context";

export default function Page() {
  const { movies, getMovies, total } = useMovies();
  console.log({ movies });
  console.log({ total });
  return (
    <>
      <h1 className="font-serif text-4xl underline">Movies</h1>
      <SearchForm getMovies={getMovies} />
      <MoviesContainer movies={movies} />
    </>
  );
}
