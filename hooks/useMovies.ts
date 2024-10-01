import { PAGE_BY_DEFAULT } from "@/config/initial";
import { TypesMovie } from "@/core/movies/domain/Movie";
import { MoviesContext } from "@/store/movies.context";

import { useContext, useEffect, useRef } from "react";

export const useMovies = ({ title, type }: { title: string; type: TypesMovie }) => {
  const { getMovies, movies, currentTotal, currentPage, currentTitle, currentType } = useContext(MoviesContext);

  const hasFetchedMovies = useRef(false);

  useEffect(() => {
    if (!hasFetchedMovies.current) {
      getMovies({ title, type, page: PAGE_BY_DEFAULT });
      hasFetchedMovies.current = true;
    }
  }, []);

  return {
    getMovies,
    movies,
    currentTotal,
    currentPage,
    currentTitle,
    currentType,
  };
};
