import { Search } from "@/core/movies/domain/contract/MovieRepository";
import { MovieList, TypesMovie } from "@/core/movies/domain/Movie";
import { adapterMoviesListOMDB } from "@/core/movies/repositories/omdb/adapters/omdb.adapter";

const movie1 = {
  Title: "Batman Begins",
  Year: "2005",
  imdbID: "tt0372784",
  Type: "movie",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
};

const movie2 = {
  Title: "The Batman",
  Year: "2022",
  imdbID: "tt1877830",
  Type: "movie",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BMmU5NGJlMzAtMGNmOC00YjJjLTgyMzUtNjAyYmE4Njg5YWMyXkEyXkFqcGc@._V1_SX300.jpg",
};

const movie3 = {
  Title: "Batman: The Animated Series",
  Year: "1992–1995",
  imdbID: "tt0103359",
  Type: "series",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BZmVkNDc3YjQtZDMzOS00MTNjLTljNzUtZDhjYWQxMmVlNjE5XkEyXkFqcGdeQXVyNTgyNTA4MjM@._V1_SX300.jpg",
};

export const getMoviesMockOMDB = async ({ title, type, page }: Search): Promise<MovieList> => {
  if (title === "batman" && type === TypesMovie.ALL && page === 1) {
    const Movies = {
      Search: [movie1, movie2, movie3],
      totalResults: "3",
      Response: "True",
    };
    return adapterMoviesListOMDB(Movies);
  }

  if (title === "batman" && type === TypesMovie.MOVIE && page === 1) {
    const Movies = {
      Search: [movie1, movie2],
      totalResults: "2",
      Response: "True",
    };
    return adapterMoviesListOMDB(Movies);
  }

  if (title === "batman" && type === TypesMovie.SERIES && page === 1) {
    const Movies = {
      Search: [movie3],
      totalResults: "2",
      Response: "True",
    };
    return adapterMoviesListOMDB(Movies);
  }

  if (title === "The Batman" && type === TypesMovie.MOVIE && page === 1) {
    const Movies = {
      Search: [movie2],
      totalResults: "1",
      Response: "True",
    };
    return adapterMoviesListOMDB(Movies);
  }

  if (title === "The Batman" && type === TypesMovie.ALL && page === 1) {
    const Movies = {
      Search: [movie2, movie3],
      totalResults: "2",
      Response: "True",
    };
    return adapterMoviesListOMDB(Movies);
  }

  const MoviesEmpty = {
    Search: [],
    totalResults: "0",
    Response: "False",
  };
  return adapterMoviesListOMDB(MoviesEmpty);
};
