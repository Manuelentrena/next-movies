import { MovieDetail, MovieList } from "@/core/movies/domain/Movie";
import { Search, SearchById } from "@/core/movies/domain/Search";

export interface IMovieService {
  getMovies: ({ title, type, page }: Search) => Promise<MovieList>;
  getMovie: ({ id }: SearchById) => Promise<MovieDetail>;
}
