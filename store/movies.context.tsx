import { MovieRepository } from "@/core/movies/domain/contract/MovieRepository";
import { Movie, MovieDetail } from "@/core/movies/domain/Movie";
import { MoviesContextState } from "@/store/movies.interface";
import { createContext, useState } from "react";

export const MoviesContext = createContext({} as MoviesContextState);

export const MoviesContextProvider = ({ children, service }: React.PropsWithChildren<{ service: MovieRepository }>) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movieDetail, setMovieDetail] = useState<MovieDetail>({} as MovieDetail);
  const [total, setTotal] = useState<number>(0);

  return (
    <MoviesContext.Provider
      value={{
        service,
        movies,
        setMovies,
        movieDetail,
        setMovieDetail,
        currentTotal: total,
        setTotal,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
