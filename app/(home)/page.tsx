"use client";

import { Counter, MoviesContainer } from "@/app/(home)/_components";
import ScrollToTopButton from "@/components/global/ScrollToTopButton";
import { SearchForm } from "@/components/global/SearchForm";
import { useMovies } from "@/hooks/useMovies";
import useObserver from "@/hooks/useObserver";
import { useEffect, useRef } from "react";

export default function Page() {
  const { getMovies, getMoviesNextPage, moviesState } = useMovies();

  const observerRef = useRef(null);
  const { isObserver } = useObserver({ externalRef: observerRef });

  useEffect(
    function () {
      if (isObserver) getMoviesNextPage();
    },
    [isObserver],
  );

  return (
    <>
      <SearchForm getMovies={getMovies} />
      <MoviesContainer movies={moviesState.movies} />
      <ScrollToTopButton />
      <Counter total={moviesState.total} state={moviesState.movies.length} />
      <div id="scroll" ref={observerRef}></div>
    </>
  );
}
