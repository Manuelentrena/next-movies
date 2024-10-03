import { MOVIE_SEARCH_BY_DEFAULT, PAGE_BY_DEFAULT, TYPE_BY_DEFAULT } from "@/config/initial";
import { FavsRepository } from "@/core/movies/domain/contract/FavsRepository";
import { MovieRepository } from "@/core/movies/domain/contract/MovieRepository";
import { Movie, TypesMovie } from "@/core/movies/domain/Movie";
import { useAppDispatch } from "@/store/hooks";
import { setMovies, setTotal } from "@/store/movies/movies.slice";
import { setSearchParams } from "@/store/search/search.slice";
import { useSearchParams } from "next/navigation";
import { createContext, useEffect, useRef } from "react";

export interface ServiceContextState {
  serviceAPI: MovieRepository;
  serviceFAVS: FavsRepository;
  syncFavs(movies: Movie[]): Movie[];
}

export const ServiceContext = createContext({} as ServiceContextState);

export const ServiceContextProvider = ({
  children,
  serviceAPI,
  serviceFAVS,
}: React.PropsWithChildren<{ serviceAPI: MovieRepository; serviceFAVS: FavsRepository }>) => {
  const hasFetchedMovies = useRef(false);
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  const title = searchParams.get("title") ?? MOVIE_SEARCH_BY_DEFAULT;
  const type = (searchParams.get("type") as TypesMovie) ?? TYPE_BY_DEFAULT;

  useEffect(() => {
    const initLoading = async () => {
      if (!hasFetchedMovies.current) {
        const moviesList = await serviceAPI.getMovies({
          title: title,
          type: type,
          page: PAGE_BY_DEFAULT,
        });
        dispatch(setMovies(syncFavs(moviesList.Movies)));
        dispatch(setTotal(Number(moviesList.Total)));
        dispatch(setSearchParams({ title, type }));
        hasFetchedMovies.current = true;
      }
    };

    initLoading();
  }, []);

  function syncFavs(movies: Movie[]): Movie[] {
    const movieswithfavssync = movies.map((movie) => ({
      ...movie,
      Fav: serviceFAVS.getFav(movie.Id)?.Fav ?? false,
    }));
    return movieswithfavssync;
  }

  return (
    <ServiceContext.Provider
      value={{
        serviceAPI,
        serviceFAVS,
        syncFavs,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};
