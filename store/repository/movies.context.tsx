import { MOVIE_SEARCH_BY_DEFAULT, PAGE_BY_DEFAULT, TYPE_BY_DEFAULT } from "@/config/initial";
import { FavsRepository } from "@/core/movies/domain/contract/FavsRepository";
import { MovieRepository } from "@/core/movies/domain/contract/MovieRepository";
import { Movie, MovieDetail, TypesMovie } from "@/core/movies/domain/Movie";
import { useAppDispatch } from "@/store/hooks";
import { setMovies, setTotal } from "@/store/movies/movies.slice";
import { setSearchParams } from "@/store/search/search.slice";
import { useSearchParams } from "next/navigation";
import { createContext, useEffect } from "react";

export interface ServiceContextState {
  serviceAPI: MovieRepository;
  serviceFAVS: FavsRepository;
  syncFavs(movies: MovieDetail[]): MovieDetail[];
  syncDetails(movies: Movie[]): Promise<MovieDetail[]>;
}

export const ServiceContext = createContext({} as ServiceContextState);

export const ServiceContextProvider = ({
  children,
  serviceAPI,
  serviceFAVS,
}: React.PropsWithChildren<{ serviceAPI: MovieRepository; serviceFAVS: FavsRepository }>) => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  const title = searchParams.get("title") ?? MOVIE_SEARCH_BY_DEFAULT;
  const type = (searchParams.get("type") as TypesMovie) ?? TYPE_BY_DEFAULT;

  useEffect(() => {
    const initLoading = async () => {
      if (type === TypesMovie.FAVS) {
        const favsList = serviceFAVS.getFavs({ title: title });
        if (favsList === null) return null;
        const favsListDetails = await syncDetails(favsList);
        dispatch(setMovies(favsListDetails));
        dispatch(setTotal(favsList.length));
      }
      if (type !== TypesMovie.FAVS) {
        const moviesList = await serviceAPI.getMovies({
          title: title,
          type: type,
          page: PAGE_BY_DEFAULT,
        });
        const moviesWithDetails = await syncDetails(moviesList.Movies);
        dispatch(setMovies(syncFavs(moviesWithDetails)));
        dispatch(setTotal(Number(moviesList.Total)));
      }
      dispatch(setSearchParams({ title, type }));
    };

    initLoading();
  }, []);

  function syncFavs(movies: MovieDetail[]): MovieDetail[] {
    const movieswithfavssync = movies.map((movie) => ({
      ...movie,
      Fav: serviceFAVS.getFav(movie.Id)?.Fav ?? false,
    }));
    return movieswithfavssync;
  }

  async function syncDetails(movies: Movie[]): Promise<MovieDetail[]> {
    return await Promise.all(
      movies.map(async (movie) => {
        const detail = await serviceAPI.getMovie({ id: movie.Id });
        return { ...movie, ...detail };
      }),
    );
  }

  return (
    <ServiceContext.Provider
      value={{
        serviceAPI,
        serviceFAVS,
        syncFavs,
        syncDetails,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};
