import { PAGE_BY_DEFAULT } from "@/config/initial";
import { GetMovies } from "@/core/movies/domain/contract/MovieRepository";
import { TypesMovie } from "@/core/movies/domain/Movie";
import { MoviesContext } from "@/store/movies.context";

import { useCallback, useContext, useEffect, useRef } from "react";

export const useMovies = ({ title, type }: { title: string; type: TypesMovie }) => {
  const {
    movies,
    currentTotal,
    currentPage,
    currentTitle,
    currentType,
    service,
    setPage,
    setTitle,
    setTotal,
    setType,
    setMovies,
  } = useContext(MoviesContext);

  const hasFetchedMovies = useRef(false);

  useEffect(() => {
    if (!hasFetchedMovies.current) {
      getMovies({ title, type, page: PAGE_BY_DEFAULT });
      hasFetchedMovies.current = true;
    }
  }, []);

  const getMovies = useCallback(
    async ({ title, type, page }: GetMovies) => {
      const moviesList = await service.getMovies({ title, type, page });
      setMovies(moviesList.Movies);
      setTotal(Number(moviesList.Total));
      setTitle(title);
      setType(type);
      setPage(page);
    },
    [service, currentTitle, currentType],
  );

  const getMoviesNextPage = useCallback(async () => {
    const moviesList = await service.getMovies({ title: currentTitle, type: currentType, page: currentPage + 1 });
    setMovies((prevMovies) => prevMovies.concat(moviesList.Movies));
    setTotal(Number(moviesList.Total));
    setPage((prev) => prev + 1);
  }, [service, currentPage, currentTitle, currentType]);

  return {
    getMovies,
    getMoviesNextPage,
    movies,
    currentTotal,
    currentPage,
    currentTitle,
    currentType,
  };
};
