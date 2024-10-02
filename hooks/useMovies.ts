import { Search } from "@/core/movies/domain/contract/MovieRepository";
import { handleMoviesError } from "@/core/movies/domain/errors/handleError";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { MoviesContext } from "@/store/movies.context";
import { incrementPage, setSearchParams } from "@/store/search/searchSlice";

import { useCallback, useContext } from "react";

export const useMovies = () => {
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.searchReducer);
  const { movies, movieDetail, currentTotal, service, setTotal, setMovies, setMovieDetail } = useContext(MoviesContext);

  const getMovies = useCallback(
    async ({ title, type, page }: Search) => {
      try {
        const moviesList = await service.getMovies({ title, type, page });
        setMovies(moviesList.Movies);
        setTotal(Number(moviesList.Total));
        dispatch(setSearchParams({ title, type }));
      } catch (error) {
        handleMoviesError(error as Error);
      }
    },
    [service, search.title, search.type],
  );

  const getMoviesNextPage = useCallback(async () => {
    try {
      const moviesList = await service.getMovies({ title: search.title, type: search.type, page: search.page + 1 });
      setMovies((prevMovies) => prevMovies.concat(moviesList.Movies));
      setTotal(Number(moviesList.Total));
      dispatch(incrementPage());
    } catch (error) {
      handleMoviesError(error as Error);
    }
  }, [service, search.page, search.title, search.type]);

  const getMovie = useCallback(
    async ({ id }: { id: string }) => {
      try {
        const movieDetail = await service.getMovie({ id });
        setMovieDetail(movieDetail);
      } catch (error) {
        handleMoviesError(error as Error);
      }
    },
    [service, search.title, search.type],
  );

  return {
    getMovies,
    getMovie,
    getMoviesNextPage,
    movies,
    movieDetail,
    currentTotal,
    search,
  };
};
