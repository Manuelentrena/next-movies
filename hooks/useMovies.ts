import { Search } from "@/core/movies/domain/contract/MovieRepository";
import { handleMoviesError } from "@/core/movies/domain/errors/handleError";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setMovieDetail, setMovies, setNextMovies, setTotal } from "@/store/movies/movies.slice";
import { ServiceMoviesContext } from "@/store/repository/movies.context";
import { incrementPage, setSearchParams } from "@/store/search/search.slice";
import { useCallback, useContext } from "react";

export const useMovies = () => {
  const { service } = useContext(ServiceMoviesContext);
  const dispatch = useAppDispatch();
  const searchState = useAppSelector((state) => state.searchReducer);
  const moviesState = useAppSelector((state) => state.moviesReducer);

  const getMovies = useCallback(
    async ({ title, type, page }: Search) => {
      try {
        const moviesList = await service.getMovies({ title, type, page });
        dispatch(setMovies(moviesList.Movies));
        dispatch(setTotal(Number(moviesList.Total)));
        dispatch(setSearchParams({ title, type }));
      } catch (error) {
        handleMoviesError(error as Error);
      }
    },
    [service, searchState.title, searchState.type],
  );

  const getMoviesNextPage = useCallback(async () => {
    try {
      const moviesList = await service.getMovies({
        title: searchState.title,
        type: searchState.type,
        page: searchState.page + 1,
      });
      dispatch(setNextMovies(moviesList.Movies));
      dispatch(setTotal(Number(moviesList.Total)));
      dispatch(incrementPage());
    } catch (error) {
      handleMoviesError(error as Error);
    }
  }, [service, searchState.page, searchState.title, searchState.type]);

  const getMovie = useCallback(
    async ({ id }: { id: string }) => {
      try {
        const movieDetail = await service.getMovie({ id });
        dispatch(setMovieDetail(movieDetail));
      } catch (error) {
        handleMoviesError(error as Error);
      }
    },
    [service, searchState.title, searchState.type],
  );

  return {
    getMovies,
    getMovie,
    getMoviesNextPage,
    moviesState,
    searchState,
  };
};
