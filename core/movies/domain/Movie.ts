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
  Year: string;
  Type: TypesMovie;
  Poster: string | null;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Score: string;
};
