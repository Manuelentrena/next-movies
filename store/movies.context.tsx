import { MOVIE_SEARCH_BY_DEFAULT, PAGE_BY_DEFAULT, TYPE_BY_DEFAULT } from "@/config/initial";
import { MovieRepository } from "@/core/movies/domain/contract/MovieRepository";
import { Movie, TypesMovie } from "@/core/movies/domain/Movie";
import { MoviesContextState } from "@/store/movies.interface";
import { createContext, useState } from "react";

export const MoviesContext = createContext({} as MoviesContextState);

export const MoviesContextProvider = ({ children, service }: React.PropsWithChildren<{ service: MovieRepository }>) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [title, setTitle] = useState<string>(MOVIE_SEARCH_BY_DEFAULT);
  const [type, setType] = useState<TypesMovie>(TYPE_BY_DEFAULT);
  const [page, setPage] = useState<number>(PAGE_BY_DEFAULT);

  return (
    <MoviesContext.Provider
      value={{
        service,
        movies,
        setMovies,
        currentTotal: total,
        setTotal,
        currentPage: page,
        setPage,
        currentTitle: title,
        setTitle,
        currentType: type,
        setType,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
