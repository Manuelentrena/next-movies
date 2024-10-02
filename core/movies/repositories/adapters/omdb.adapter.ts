import { MovieDetail, MovieList, TypesMovie } from "@/core/movies/domain/Movie";
import { MovieDetailOMBD, MoviesListOMBD } from "@/core/movies/repositories/types/omdb.types";

export function adapterMoviesListOMDB(movies: MoviesListOMBD) {
  return {
    Movies: movies.Search.map((movie) => ({
      Title: movie.Title,
      Year: movie.Year,
      Id: movie.imdbID,
      Type: movie.Type as TypesMovie,
      Poster: movie.Poster !== "N/A" ? movie.Poster : null,
    })),
    Total: movies.totalResults,
  } as MovieList;
}

export function adapterMovieDetailOMDB(movie: MovieDetailOMBD) {
  return {
    Id: movie.imdbID,
    Title: movie.Title,
    Year: movie.Year !== "N/A" ? movie.Year : null,
    Type: movie.Type as TypesMovie,
    Poster: movie.Poster !== "N/A" ? movie.Poster : null,
    Rated: movie.Rated !== "N/A" ? movie.Rated : null,
    Released: movie.Released !== "N/A" ? movie.Released : null,
    Runtime: movie.Runtime !== "N/A" ? movie.Runtime : null,
    Genre: movie.Genre !== "N/A" ? movie.Genre : null,
    Director: movie.Director !== "N/A" ? movie.Director : null,
    Score: movie.Metascore !== "N/A" ? movie.Metascore : null,
    Plot: movie.Plot !== "N/A" ? movie.Plot : null,
  } as MovieDetail;
}
