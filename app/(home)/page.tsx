"use client";

import { MoviesContainer } from "@/app/(home)/_components";
import ScrollToTopButton from "@/components/global/ScrollToTopButton";
import { SearchForm } from "@/components/global/SearchForm";
import { MOVIE_SEARCH_BY_DEFAULT } from "@/config/initial";
import { TypesMovie } from "@/core/movies/domain/Movie";
import { useMovies } from "@/hooks/useMovies";
import useObserver from "@/hooks/useObserver";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title") ?? MOVIE_SEARCH_BY_DEFAULT;
  const type = (searchParams.get("type") as TypesMovie) ?? TypesMovie.ALL;

  const { movies, getMovies, getMoviesNextPage } = useMovies({ title, type });

  const observerRef = useRef(null);
  const { isObserver } = useObserver({
    externalRef: observerRef,
  });

  useEffect(
    function () {
      if (isObserver) getMoviesNextPage();
    },
    [isObserver],
  );

  return (
    <>
      <SearchForm getMovies={getMovies} title={title} type={type} />
      <MoviesContainer movies={movies} />
      <ScrollToTopButton />
      <div id="scroll" ref={observerRef}></div>
    </>
  );
}
