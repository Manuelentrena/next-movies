export interface MovieOMBD {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string | null;
}

export interface MoviesListOMBD {
  Search: MovieOMBD[];
  totalResults: string;
  Response: string;
}

export interface RatingOMBD {
  Source: string;
  Value: string;
}

export interface MovieDetailOMBD {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: RatingOMBD[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}
