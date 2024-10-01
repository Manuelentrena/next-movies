import { API_KEY, BASE_URL } from "@/config/env";
import { GetMovie, GetMovies, MovieRepository } from "@/core/movies/domain/contract/MovieRepository";
import { adapterMovieDetailOMDB, adapterMoviesListOMDB } from "@/core/movies/repositories/adapters/omdb.adapter";
import { MovieDetailOMBD, MoviesListOMBD } from "@/core/movies/repositories/types/omdb.types";

export const createRepositoryMoviesOMDB = (): MovieRepository => {
  return {
    getMovies: async ({ title, type, page }: GetMovies) => {
      const url = `${BASE_URL}${API_KEY}&s=${title}&page=${page}${type !== "all" ? `&type=${type}` : ""}`;
      const res = await fetch(url);
      const data = (await res.json()) as MoviesListOMBD;

      return adapterMoviesListOMDB(data as MoviesListOMBD);
    },
    getMovie: async ({ id }: GetMovie) => {
      const url = `${BASE_URL}${API_KEY}&i=${id}`;
      const res = await fetch(url);
      const data = (await res.json()) as MovieDetailOMBD;

      return adapterMovieDetailOMDB(data as MovieDetailOMBD);
    },
  };
};
