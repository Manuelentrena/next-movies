import { handleMoviesError } from "@/core/movies/domain/errors/handleError";
import { MovieDetail } from "@/core/movies/domain/Movie";
import { Search } from "@/core/movies/domain/Search";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setMovieDetail, setMovies, setNextMovies, setTotal, toggleFavMovie } from "@/store/movies/movies.slice";
import { ServiceContext } from "@/store/repository/movies.context";
import { incrementPage, setSearchParams } from "@/store/search/search.slice";
import { useCallback, useContext, useState } from "react";

export const useMovies = () => {
  const { serviceAPI, serviceFAVS, syncFavs, syncDetails, isInitialLoad } = useContext(ServiceContext);
  const dispatch = useAppDispatch();
  const searchState = useAppSelector((state) => state.searchReducer);
  const moviesState = useAppSelector((state) => state.moviesReducer);
  const [stopObserver, setStopObserver] = useState(false);

  const getMovies = useCallback(
    async ({ title, type, page }: Search) => {
      try {
        const moviesList = await serviceAPI.getMovies({ title, type, page });
        const moviesWithDetails = await syncDetails(moviesList.Movies);
        dispatch(setMovies(syncFavs(moviesWithDetails)));
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
      const moviesWithDetails = await syncDetails(moviesList.Movies);
      dispatch(setNextMovies(syncFavs(moviesWithDetails)));
      dispatch(setTotal(Number(moviesList.Total)));
      dispatch(incrementPage());
    } catch (error) {
      setStopObserver(true);
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
    async ({ movie }: { movie: MovieDetail }) => {
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

  const getFavs = useCallback(
    ({ title, type }: Omit<Search, "page">) => {
      try {
        const movies = serviceFAVS.getFavs({ title });
        if (!movies) {
          dispatch(setMovies([]));
          dispatch(setTotal(0));
        } else {
          dispatch(setMovies(movies));
          dispatch(setTotal(Number(movies.length)));
        }
        dispatch(setSearchParams({ title, type }));
      } catch (error) {
        handleMoviesError(error as Error);
      }
    },
    [serviceFAVS, searchState.title, searchState.type],
  );

  return {
    getMovies,
    getFavs,
    getMovie,
    getMoviesNextPage,
    toggleFav,
    moviesState,
    searchState,
    isInitialLoad,
    stopObserver,
    setStopObserver,
  };
};
