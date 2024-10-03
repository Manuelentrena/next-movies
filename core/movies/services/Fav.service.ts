import { FavsRepository } from "@/core/movies/domain/contract/FavsRepository";
import { Movie } from "@/core/movies/domain/Movie";

export const createServiceFavs = (repository: FavsRepository) => {
  return {
    getFavs: () => repository.getFavs(),
    getFav: (id: string) => repository.getFav(id),
    addFav: (movie: Movie) => repository.addFav(movie),
    removeFav: (id: string) => repository.removeFav(id),
  };
};
