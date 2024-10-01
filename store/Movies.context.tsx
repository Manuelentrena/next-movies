import { MovieRepository } from "@/core/movies/domain/contract/MovieRepository";
import { MovieList } from "@/core/movies/domain/Movie";
import { createContext, useContext, useEffect, useState } from "react";

export interface MoviesContextState {
  movies: MovieList;
  getMovies: (title: string, type: string, page: number) => Promise<void>;
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
  const [title, setTitle] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  async function getMovies(title: string, type: string, page: number) {
    const movies = await service.getMovies({ title, type, page });
    setMovies(movies);
    setTitle(title);
    setType(type);
    setPage(page);
  }

  useEffect(() => {
    getMovies("batman", "movie", 1);
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
