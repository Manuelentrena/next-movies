import { FavsRepository } from "@/core/movies/domain/contract/FavsRepository";
import { MovieDetail } from "@/core/movies/domain/Movie";

export function createRepositoryFavsLocalStorage(): FavsRepository {
  return {
    getFavs,
    getFav,
    addFav,
    removeFav,
  };
}

function getFavs({ title }: { title: string }): MovieDetail[] | null {
  const favs = getFavsFromLocalStorage();

  if (!favs.size) {
    return null;
  }

  if (title.trim() === "") {
    return Array.from(favs.values());
  }

  const filteredFavs = Array.from(favs.values()).filter((movie: MovieDetail) =>
    movie.Title.toLowerCase().includes(title.toLowerCase()),
  );

  return filteredFavs.length > 0 ? filteredFavs : null;
}

function addFav(fav: MovieDetail) {
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

function getFavsFromLocalStorage(): Map<string, MovieDetail> {
  const favs = localStorage.getItem("favs");

  if (favs === null) {
    return new Map();
  }

  return new Map(JSON.parse(favs) as Iterable<[string, MovieDetail]>);
}
