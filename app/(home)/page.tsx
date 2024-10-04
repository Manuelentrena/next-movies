"use client";

import { Counter, MoviesContainer } from "@/app/(home)/_components";
import ScrollToTopButton from "@/components/global/ScrollToTopButton";
import { SearchForm } from "@/components/global/SearchForm";
import { TypesMovie } from "@/core/movies/domain/Movie";
import { useMovies } from "@/hooks/useMovies";
import useObserver from "@/hooks/useObserver";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const { getMovies, getMoviesNextPage, moviesState, getFavs, searchState, isInitialLoad } = useMovies();
  const [isNextPageLoad, setisNextPageLoad] = useState(false);
  const observerRef = useRef(null);
  const { isObserver } = useObserver({ externalRef: observerRef });

  useEffect(
    function () {
      if (isObserver && searchState.type !== TypesMovie.FAVS) {
        setisNextPageLoad(true);
        getMoviesNextPage().finally(() => {
          setisNextPageLoad(false);
        });
      }
    },
    [isObserver],
  );

  return (
    <>
      <SearchForm getMovies={getMovies} getFavs={getFavs} />
      <MoviesContainer movies={moviesState.movies} isNextPageLoad={isNextPageLoad} isInitialLoad={isInitialLoad} />
      <ScrollToTopButton />
      <Counter total={moviesState.total} state={moviesState.movies.length} />
      <div id="scroll" ref={observerRef}></div>
    </>
  );
}
