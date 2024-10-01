import { MovieDetail, MovieList, TypeMovie } from "@/core/movies/domain/Movie";
import {
  MovieDetailOMBD,
  MoviesListOMBD,
} from "@/core/movies/repositories/types/omdb.types";

export function adapterMoviesListOMDB(movies: MoviesListOMBD) {
  return {
    Movies: movies.Search.map((movie) => ({
      Title: movie.Title,
      Year: movie.Year,
      Id: movie.imdbID,
      Type: movie.Type as TypeMovie,
      Poster: movie.Poster || null,
    })),
    Total: movies.totalResults,
  } as MovieList;
}

export function adapterMovieDetailOMDB(movie: MovieDetailOMBD) {
  return {
    Id: movie.imdbID,
    Title: movie.Title,
    Year: movie.Year,
    Type: movie.Type as TypeMovie,
    Poster: movie.Poster,
    Rated: movie.Rated,
    Released: movie.Released,
    Runtime: movie.Runtime,
    Genre: movie.Genre,
    Director: movie.Director,
    Score: movie.Metascore,
  } as MovieDetail;
}
