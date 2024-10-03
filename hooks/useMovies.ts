import { Search } from "@/core/movies/domain/contract/MovieRepository";
import { handleMoviesError } from "@/core/movies/domain/errors/handleError";
import { Movie } from "@/core/movies/domain/Movie";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setMovieDetail, setMovies, setNextMovies, setTotal, toggleFavMovie } from "@/store/movies/movies.slice";
import { ServiceContext } from "@/store/repository/movies.context";
import { incrementPage, setSearchParams } from "@/store/search/search.slice";
import { useCallback, useContext } from "react";

export const useMovies = () => {
  const { serviceAPI, serviceFAVS, syncFavs } = useContext(ServiceContext);
  const dispatch = useAppDispatch();
  const searchState = useAppSelector((state) => state.searchReducer);
  const moviesState = useAppSelector((state) => state.moviesReducer);

  const getMovies = useCallback(
    async ({ title, type, page }: Search) => {
      try {
        const moviesList = await serviceAPI.getMovies({ title, type, page });
        dispatch(setMovies(syncFavs(moviesList.Movies)));
        dispatch(setTotal(Number(moviesList.Total)));
        dispatch(setSearchParams({ title, type }));
      } catch (error) {
        handleMoviesError(error as Error);
      }
    },
    [serviceAPI, searchState.title, searchState.type],
  );

  const getMoviesNextPage = useCallback(async () => {
    try {
      const moviesList = await serviceAPI.getMovies({
        title: searchState.title,
        type: searchState.type,
        page: searchState.page + 1,
      });
      dispatch(setNextMovies(syncFavs(moviesList.Movies)));
      dispatch(setTotal(Number(moviesList.Total)));
      dispatch(incrementPage());
    } catch (error) {
      handleMoviesError(error as Error);
    }
  }, [serviceAPI, searchState.page, searchState.title, searchState.type]);

  const getMovie = useCallback(
    async ({ id }: { id: string }) => {
      try {
        const movieDetail = await serviceAPI.getMovie({ id });
        dispatch(setMovieDetail({ ...movieDetail, Fav: serviceFAVS.getFav(movieDetail.Id)?.Fav ?? false }));
      } catch (error) {
        handleMoviesError(error as Error);
      }
    },
    [serviceAPI, searchState.title, searchState.type],
  );

  const toggleFav = useCallback(
    async ({ movie }: { movie: Movie }) => {
      try {
        dispatch(toggleFavMovie(movie.Id));
        if (movie.Fav) {
          serviceFAVS.removeFav(movie.Id);
        } else {
          serviceFAVS.addFav({ ...movie, Fav: true });
        }
      } catch (error) {
        handleMoviesError(error as Error);
      }
    },
    [serviceFAVS],
  );

  return {
    getMovies,
    getMovie,
    getMoviesNextPage,
    toggleFav,
    moviesState,
    searchState,
  };
};
