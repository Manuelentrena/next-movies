"use client";

import { Counter, MoviesContainer } from "@/app/(home)/_components";
import ScrollToTopButton from "@/components/global/ScrollToTopButton";
import { SearchForm } from "@/components/global/SearchForm";
import { TypesMovie } from "@/core/movies/domain/Movie";
import { useMovies } from "@/hooks/useMovies";
import useObserver from "@/hooks/useObserver";
import { useEffect, useRef } from "react";

export default function Page() {
  const { getMovies, getMoviesNextPage, moviesState, getFavs, searchState } = useMovies();

  const observerRef = useRef(null);
  const { isObserver } = useObserver({ externalRef: observerRef });

  useEffect(
    function () {
      if (isObserver && searchState.type !== TypesMovie.FAVS) getMoviesNextPage();
    },
    [isObserver],
  );

  return (
    <>
      <SearchForm getMovies={getMovies} getFavs={getFavs} />
      <MoviesContainer movies={moviesState.movies} />
      <ScrollToTopButton />
      <Counter total={moviesState.total} state={moviesState.movies.length} />
      <div id="scroll" ref={observerRef}></div>
    </>
  );
}
