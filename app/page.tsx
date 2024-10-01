"use client";

import { MoviesContainer } from "@/app/_components";
import { SearchForm } from "@/components/global/SearchForm";
import { MOVIE_SEARCH_BY_DEFAULT } from "@/config/initial";
import { TypesMovie } from "@/core/movies/domain/Movie";
import { useMovies } from "@/hooks/useMovies";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title") ?? MOVIE_SEARCH_BY_DEFAULT;
  const type = (searchParams.get("type") as TypesMovie) ?? TypesMovie.ALL;
  console.log({ title, type });
  const { movies, getMovies } = useMovies({ title, type });

  return (
    <>
      <SearchForm getMovies={getMovies} title={title} type={type} />
      <MoviesContainer movies={movies} />
    </>
  );
}
