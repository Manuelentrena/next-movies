import { MOVIE_SEARCH_BY_DEFAULT, PAGE_BY_DEFAULT, TYPE_BY_DEFAULT } from "@/config/initial";
import { FavsRepository } from "@/core/movies/domain/contract/FavsRepository";
import { MovieRepository } from "@/core/movies/domain/contract/MovieRepository";
import { TypesMovie } from "@/core/movies/domain/Movie";
import { useAppDispatch } from "@/store/hooks";
import { setMovies, setTotal } from "@/store/movies/movies.slice";
import { useSearchParams } from "next/navigation";
import { createContext, useEffect, useRef } from "react";

export interface ServiceContextState {
  serviceAPI: MovieRepository;
  serviceFAVS: FavsRepository;
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

  useEffect(() => {
    const initLoading = async () => {
      if (!hasFetchedMovies.current) {
        console.log("CONTEXT");
        const moviesList = await serviceAPI.getMovies({
          title: searchParams.get("title") ?? MOVIE_SEARCH_BY_DEFAULT,
          type: (searchParams.get("type") as TypesMovie) ?? TYPE_BY_DEFAULT,
          page: PAGE_BY_DEFAULT,
        });
        dispatch(setMovies(moviesList.Movies));
        dispatch(setTotal(Number(moviesList.Total)));
        hasFetchedMovies.current = true;
      }
    };

    initLoading();
  }, []);

  return (
    <ServiceContext.Provider
      value={{
        serviceAPI,
        serviceFAVS,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};
