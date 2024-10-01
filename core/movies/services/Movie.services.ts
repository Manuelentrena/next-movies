import { GetMovie, GetMovies, MovieRepository } from "@/core/movies/domain/contract/MovieRepository";

export const createServiceMovies = (repository: MovieRepository) => {
  return {
    getMovies: async ({ title, type, page }: GetMovies) => repository.getMovies({ title, type, page }),
    getMovie: async ({ id }: GetMovie) => repository.getMovie({ id }),
  };
};
