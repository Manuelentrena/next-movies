import { MovieRepository } from "@/core/movies/domain/contract/MovieRepository";
import { Movie, MovieDetail } from "@/core/movies/domain/Movie";

export interface MoviesContextState {
  service: MovieRepository;
  movies: Movie[];
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
  movieDetail: MovieDetail;
  setMovieDetail: React.Dispatch<React.SetStateAction<MovieDetail>>;
  currentTotal: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
}
