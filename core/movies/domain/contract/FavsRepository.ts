import { Movie } from "@/core/movies/domain/Movie";

export interface FavsRepository {
  getFavs(): Movie[] | null;
  getFav(id: string): Movie | null;
  addFav(movie: Movie): void;
  removeFav(id: string): void;
}
