import { MovieDetail } from "@/core/movies/domain/Movie";

export interface IFavsRepositoryLocalStorage {
  getFavs: ({ title }: { title: string }) => MovieDetail[] | null;
  getFav: (id: string) => MovieDetail | null;
  addFav: (movie: MovieDetail) => void;
  removeFav: (id: string) => void;
}
