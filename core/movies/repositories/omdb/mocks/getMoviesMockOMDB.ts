import { Search } from "@/core/movies/domain/contract/MovieRepository";
import { MovieList } from "@/core/movies/domain/Movie";
import { adapterMoviesListOMDB } from "@/core/movies/repositories/omdb/adapters/omdb.adapter";

export const getMoviesMockOMDB = async ({ title, type, page }: Search): Promise<MovieList> => {
  if (title === "batman" && type === "all" && page === 1) {
    const Movies = {
      Search: [
        {
          Title: "Batman Begins",
          Year: "2005",
          imdbID: "tt0372784",
          Type: "movie",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
        },
        {
          Title: "The Batman",
          Year: "2022",
          imdbID: "tt1877830",
          Type: "movie",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BMmU5NGJlMzAtMGNmOC00YjJjLTgyMzUtNjAyYmE4Njg5YWMyXkEyXkFqcGc@._V1_SX300.jpg",
        },
        {
          Title: "Batman v Superman: Dawn of Justice",
          Year: "2016",
          imdbID: "tt2975590",
          Type: "movie",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BZTJkYjdmYjYtOGMyNC00ZGU1LThkY2ItYTc1OTVlMmE2YWY1XkEyXkFqcGc@._V1_SX300.jpg",
        },
      ],
      totalResults: "575",
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
