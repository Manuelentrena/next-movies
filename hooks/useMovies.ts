import { GetMovies } from "@/core/movies/domain/contract/MovieRepository";
import { handleMoviesError } from "@/core/movies/domain/errors/handleError";
import { MoviesContext } from "@/store/movies.context";

import { useCallback, useContext } from "react";

export const useMovies = () => {
  const {
    movies,
    movieDetail,
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
    setMovieDetail,
  } = useContext(MoviesContext);

  const getMovies = useCallback(
    async ({ title, type, page }: GetMovies) => {
      try {
        const moviesList = await service.getMovies({ title, type, page });
        setMovies(moviesList.Movies);
        setTotal(Number(moviesList.Total));
        setTitle(title);
        setType(type);
        setPage(page);
      } catch (error) {
        handleMoviesError(error as Error);
      }
    },
    [service, currentTitle, currentType],
  );

  const getMoviesNextPage = useCallback(async () => {
    try {
      const moviesList = await service.getMovies({ title: currentTitle, type: currentType, page: currentPage + 1 });
      setMovies((prevMovies) => prevMovies.concat(moviesList.Movies));
      setTotal(Number(moviesList.Total));
      setPage((prev) => prev + 1);
    } catch (error) {
      handleMoviesError(error as Error);
    }
  }, [service, currentPage, currentTitle, currentType]);

  const getMovie = useCallback(
    async ({ id }: { id: string }) => {
      try {
        const movieDetail = await service.getMovie({ id });
        setMovieDetail(movieDetail);
      } catch (error) {
        handleMoviesError(error as Error);
      }
    },
    [service, currentTitle, currentType],
  );

  return {
    getMovies,
    getMovie,
    getMoviesNextPage,
    movies,
    movieDetail,
    currentTotal,
    currentPage,
    currentTitle,
    currentType,
  };
};
