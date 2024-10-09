import { Movie, MovieDetail, MovieList, TypesMovie } from "@/core/movies/domain/Movie";
import { faker } from "@faker-js/faker";
import { MovieMother } from "../core/movies/domain/MovieMother";

export enum MovieRating {
  G = "G",
  PG = "PG",
  PG_13 = "PG-13",
  R = "R",
  NC_17 = "NC-17",
  NR = "NR",
  Unrated = "Unrated",
}

export function generateTitleWith(title: string) {
  return `${title} ${faker.lorem.words(2)}`;
}

export function getRandomGenres() {
  const genres = [
    "Action",
    "Adventure",
    "Comedy",
    "Crime",
    "Drama",
    "Fantasy",
    "Horror",
    "Romance",
    "Sci-Fi",
    "Thriller",
    "Mystery",
    "Animation",
  ];

  const numberOfGenres = faker.number.int({ min: 1, max: 3 });
  const selectedGenres = faker.helpers.arrayElements(genres, numberOfGenres);
  return selectedGenres.join(", ");
}

export function moviesResponse({ movies }: { movies: Movie[] }): Promise<MovieList> {
  return new Promise((resolve) => {
    resolve({
      Movies: movies,
      Total: movies.length.toString(),
    });
  });
}
export function moviesDetailResponse(movieDetail: MovieDetail): Promise<MovieDetail> {
  return new Promise((resolve) => {
    resolve(movieDetail);
  });
}

export function createMovies({ length, title, type }: { length: number; title: string; type: TypesMovie }) {
  return Array.from({ length: length }, () =>
    MovieMother.create({
      Type: type,
      Title: generateTitleWith(title),
    }),
  );
}
