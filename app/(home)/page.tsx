"use client";

import { MoviesContainer } from "@/app/(home)/_components";
import ScrollToTopButton from "@/components/global/ScrollToTopButton";
import { SearchForm } from "@/components/global/SearchForm";
import { MOVIE_SEARCH_BY_DEFAULT, PAGE_BY_DEFAULT } from "@/config/initial";
import { TypesMovie } from "@/core/movies/domain/Movie";
import { useMovies } from "@/hooks/useMovies";
import useObserver from "@/hooks/useObserver";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import Counter from "./_components/Counter";

export default function Page() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title") ?? MOVIE_SEARCH_BY_DEFAULT;
  const type = (searchParams.get("type") as TypesMovie) ?? TypesMovie.ALL;

  const { movies, getMovies, getMoviesNextPage, currentTotal } = useMovies();

  const observerRef = useRef(null);
  const { isObserver } = useObserver({ externalRef: observerRef });

  useEffect(
    function () {
      if (isObserver) getMoviesNextPage();
    },
    [isObserver],
  );

  const hasFetchedMovies = useRef(false);

  useEffect(() => {
    if (!hasFetchedMovies.current) {
      getMovies({ title, type, page: PAGE_BY_DEFAULT });
      hasFetchedMovies.current = true;
    }
  }, []);

  return (
    <>
      <SearchForm getMovies={getMovies} title={title} type={type} />
      <MoviesContainer movies={movies} />
      <ScrollToTopButton />
      <Counter total={currentTotal} state={movies.length} />
      <div id="scroll" ref={observerRef}></div>
    </>
  );
}
