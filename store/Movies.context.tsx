import { MOVIE_SEARCH_BY_DEFAULT, PAGE_BY_DEFAULT, TYPE_BY_DEFAULT } from "@/config/initial";
import { GetMovies, MovieRepository } from "@/core/movies/domain/contract/MovieRepository";
import { Movie, TypesMovie } from "@/core/movies/domain/Movie";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

export interface MoviesContextState {
  movies: Movie[];
  total: number;
  getMovies: ({ title, type, page }: GetMovies) => Promise<void>;
  currentPage: number;
  currentTitle: string;
  currentType: string;
}

export const MoviesContext = createContext({} as MoviesContextState);

export const MoviesContextProvider = ({ children, service }: React.PropsWithChildren<{ service: MovieRepository }>) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [title, setTitle] = useState<string>(MOVIE_SEARCH_BY_DEFAULT);
  const [type, setType] = useState<TypesMovie>(TYPE_BY_DEFAULT);
  const [page, setPage] = useState<number>(PAGE_BY_DEFAULT);

  const hasFetchedMovies = useRef(false);

  useEffect(() => {
    if (!hasFetchedMovies.current) {
      getMovies({ title, type, page });
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
    [service],
  );

  return (
    <MoviesContext.Provider
      value={{
        movies,
        total,
        getMovies,
        currentPage: page,
        currentTitle: title,
        currentType: type,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export const useMovies = () => useContext(MoviesContext);
