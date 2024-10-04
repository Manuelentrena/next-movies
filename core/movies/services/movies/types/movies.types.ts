import { Search, SearchById } from "@/core/movies/domain/contract/MovieRepository";
import { MovieDetail, MovieList } from "@/core/movies/domain/Movie";

export interface IMovieService {
  getMovies: ({ title, type, page }: Search) => Promise<MovieList>;
  getMovie: ({ id }: SearchById) => Promise<MovieDetail>;
}
