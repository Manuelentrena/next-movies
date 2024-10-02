export type Movie = {
  Title: string;
  Year: string;
  Id: string;
  Type: TypesMovie;
  Poster: string | null;
};

export enum TypesMovie {
  ALL = "all",
  MOVIE = "movie",
  SERIES = "series",
}

export type MovieList = {
  Movies: Movie[];
  Total: string;
};

export type MovieDetail = {
  Id: string;
  Title: string;
  Year: string | null;
  Type: TypesMovie;
  Poster: string | null;
  Rated: string | null;
  Released: string | null;
  Runtime: string | null;
  Genre: string | null;
  Director: string | null;
  Score: string | null;
  Plot: string | null;
};

export type MoviesStore = {
  movies: Movie[];
  total: number;
  movieDetail: MovieDetail;
};
