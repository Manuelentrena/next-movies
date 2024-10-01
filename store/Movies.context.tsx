import {
  MOVIE_SEARCH_BY_DEFAULT,
  PAGE_BY_DEFAULT,
  TYPE_BY_DEFAULT,
} from "@/config/initial";
import { MovieRepository } from "@/core/movies/domain/contract/MovieRepository";
import { MovieList, TypeMovie } from "@/core/movies/domain/Movie";
import { createContext, useContext, useEffect, useState } from "react";

export interface MoviesContextState {
  movies: MovieList;
  getMovies: (title: string, type: TypeMovie, page: number) => Promise<void>;
  currentPage: number;
  currentTitle: string;
  currentType: string;
}

const initialMovieList: MovieList = {
  Movies: [],
  Total: "0",
};

export const MoviesContext = createContext({} as MoviesContextState);

export const MoviesContextProvider = ({
  children,
  service,
}: React.PropsWithChildren<{ service: MovieRepository }>) => {
  const [movies, setMovies] = useState<MovieList>(initialMovieList);
  const [title, setTitle] = useState<string>(MOVIE_SEARCH_BY_DEFAULT);
  const [type, setType] = useState<TypeMovie>(TYPE_BY_DEFAULT);
  const [page, setPage] = useState<number>(PAGE_BY_DEFAULT);

  async function getMovies(title: string, type: TypeMovie, page: number) {
    const movies = await service.getMovies({ title, type, page });
    setMovies(movies);
    setTitle(title);
    setType(type);
    setPage(page);
  }

  useEffect(() => {
    getMovies(title, type, page);
  }, []);

  return (
    <MoviesContext.Provider
      value={{
        movies,
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
