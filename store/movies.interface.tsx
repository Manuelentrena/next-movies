import { MovieRepository } from "@/core/movies/domain/contract/MovieRepository";
import { Movie, TypesMovie } from "@/core/movies/domain/Movie";

export interface MoviesContextState {
  service: MovieRepository;
  movies: Movie[];
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
  currentTotal: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  currentTitle: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  currentType: TypesMovie;
  setType: React.Dispatch<React.SetStateAction<TypesMovie>>;
}
