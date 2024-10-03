import { FavsRepository } from "@/core/movies/domain/contract/FavsRepository";
import { Movie } from "@/core/movies/domain/Movie";

export function createRepositoryFavsLocalStorage(): FavsRepository {
  return {
    getFavs,
    getFav,
    addFav,
    removeFav,
  };
}

function getFavs() {
  const favs = getFavsFromLocalStorage();
  return Array.from(favs.values());
}

function addFav(fav: Movie) {
  const favs = getFavsFromLocalStorage();

  favs.set(fav.Id, fav);
  localStorage.setItem("favs", JSON.stringify(Array.from(favs.entries())));
}

function getFav(id: string) {
  const favs = getFavsFromLocalStorage();
  const fav = favs.get(id);

  if (!fav) {
    return null;
  }

  return fav;
}

function removeFav(id: string) {
  const favs = getFavsFromLocalStorage();

  if (favs.has(id)) {
    favs.delete(id);
    localStorage.setItem("favs", JSON.stringify(Array.from(favs.entries())));
  }
}

function getFavsFromLocalStorage(): Map<string, Movie> {
  const favs = localStorage.getItem("favs");

  if (favs === null) {
    return new Map();
  }

  return new Map(JSON.parse(favs) as Iterable<[string, Movie]>);
}
