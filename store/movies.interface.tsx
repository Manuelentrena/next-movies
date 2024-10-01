import { GetMovies } from "@/core/movies/domain/contract/MovieRepository";
import { Movie, TypesMovie } from "@/core/movies/domain/Movie";

export interface MoviesContextState {
  movies: Movie[];
  currentTotal: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  getMovies: ({ title, type, page }: GetMovies) => Promise<void>;
  currentPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  currentTitle: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  currentType: string;
  setType: React.Dispatch<React.SetStateAction<TypesMovie>>;
}
