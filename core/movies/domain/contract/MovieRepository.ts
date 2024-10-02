import { MovieDetail, MovieList, TypesMovie } from "@/core/movies/domain/Movie";

export interface Search {
  title: string;
  type: TypesMovie;
  page: number;
}

export interface SearchById {
  id: string;
}

export interface MovieRepository {
  getMovies({ title, type, page }: Search): Promise<MovieList>;
  getMovie({ id }: SearchById): Promise<MovieDetail>;
}
