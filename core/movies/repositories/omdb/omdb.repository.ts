import { API_KEY, BASE_URL } from "@/config/env";
import { MovieRepository, Search, SearchById } from "@/core/movies/domain/contract/MovieRepository";
import { NotFoundMovieError } from "@/core/movies/domain/errors/not_found_movie.error";
import { PaginationMovieError } from "@/core/movies/domain/errors/pagination_movie.error";
import { adapterMovieDetailOMDB, adapterMoviesListOMDB } from "@/core/movies/repositories/omdb/adapters/omdb.adapter";
import { MovieDetailOMBD, MoviesListOMBD } from "@/core/movies/repositories/omdb/types/omdb.types";

export const createRepositoryMoviesOMDB = (): MovieRepository => {
  return {
    getMovies: async ({ title, type, page }: Search) => {
      const url = `${BASE_URL}${API_KEY}&s=${title}&page=${page}${type !== "all" ? `&type=${type}` : ""}`;
      const res = await fetch(url);
      const data = (await res.json()) as MoviesListOMBD;

      if ("Error" in data) {
        if (data.Error === "Movie not found!") {
          throw new NotFoundMovieError(data.Error, "OMDB");
        } else if (data.Error === "he offset specified in a OFFSET clause may not be negative.") {
          throw new PaginationMovieError(data.Error, "OMDB");
        }
      }

      if ("Search" in data) {
        return adapterMoviesListOMDB(data as MoviesListOMBD);
      }

      throw new Error("Unexpected response format.");
    },
    getMovie: async ({ id }: SearchById) => {
      const url = `${BASE_URL}${API_KEY}&i=${id}`;
      const res = await fetch(url);
      const data = (await res.json()) as MovieDetailOMBD;

      return adapterMovieDetailOMDB(data as MovieDetailOMBD);
    },
  };
};
