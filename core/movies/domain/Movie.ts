export type Movie = {
  Title: string;
  Year: string;
  Id: string;
  Type: TypeMovie;
  Poster: string | null;
};

export type TypeMovie = "movie" | "series";

export type MovieList = {
  Movies: Movie[];
  Total: string;
};

export type MovieDetail = {
  Id: string;
  Title: string;
  Year: string;
  Type: TypeMovie;
  Poster: string | null;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Score: string;
};
