import { MovieRepository } from "@/core/movies/domain/contract/MovieRepository";
import { Search, SearchById } from "@/core/movies/domain/Search";

export const createServiceMovies = (repository: MovieRepository) => {
  return {
    getMovies: async ({ title, type, page }: Search) => repository.getMovies({ title, type, page }),
    getMovie: async ({ id }: SearchById) => repository.getMovie({ id }),
  };
};
