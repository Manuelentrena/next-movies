export type Movie = {
  Title: string;
  Year: string | null;
  Id: string;
  Type: TypesMovie;
  Poster: string | null;
  Fav: boolean;
};

export enum TypesMovie {
  ALL = "all",
  MOVIE = "movie",
  SERIES = "series",
  GAMES = "game",
  FAVS = "favs",
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
  Fav: boolean;
};

export type MoviesStore = {
  movies: MovieDetail[];
  total: number;
  movieDetail: MovieDetail;
};
