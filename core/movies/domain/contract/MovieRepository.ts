import { MovieDetail, MovieList } from "@/core/movies/domain/Movie";

export interface GetMovies {
  title: string;
  type: string;
  page: number;
}

export interface GetMovie {
  id: string;
}

export interface MovieRepository {
  getMovies({ title, type, page }: GetMovies): Promise<MovieList>;
  getMovie({ id }: GetMovie): Promise<MovieDetail>;
}
