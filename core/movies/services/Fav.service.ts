import { FavsRepository } from "@/core/movies/domain/contract/FavsRepository";
import { MovieDetail } from "@/core/movies/domain/Movie";

export const createServiceFavs = (repository: FavsRepository) => {
  return {
    getFavs: ({ title }: { title: string }) => repository.getFavs({ title }),
    getFav: (id: string) => repository.getFav(id),
    addFav: (movie: MovieDetail) => repository.addFav(movie),
    removeFav: (id: string) => repository.removeFav(id),
  };
};
