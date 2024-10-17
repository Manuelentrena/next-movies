import { getRandomGenres, MovieRating } from "@/__tests__/utils/randomElements";
import { TypesMovie } from "@/core/movies/domain/Movie";
import { MovieDetailOMBD, MovieOMBD } from "@/core/movies/repositories/omdb/types/omdb.types";
import { faker } from "@faker-js/faker";
import { Factory } from "fishery";

export const MovieFactory = Factory.define<MovieOMBD>(({ sequence, afterBuild }) => {
  afterBuild((movie) => {
    const movieType =
      movie.Type === TypesMovie.ALL
        ? faker.helpers.arrayElement([TypesMovie.MOVIE, TypesMovie.SERIES, TypesMovie.GAME])
        : movie.Type;

    movie.Type = movieType;
  });
  return {
    Title: faker.lorem.words(2),
    Year: faker.date.between({ from: "1900-01-01", to: "2024-12-31" }).getFullYear().toString(),
    imdbID: sequence.toString(),
    Poster: faker.image.url(),
    Type: faker.helpers.arrayElement([TypesMovie.MOVIE, TypesMovie.SERIES, TypesMovie.GAME]),
  };
});

export const MovieDetailFactory = Factory.define<MovieDetailOMBD>(({ sequence, afterBuild }) => {
  afterBuild((movie) => {
    const movieType =
      movie.Type === TypesMovie.ALL
        ? faker.helpers.arrayElement([TypesMovie.MOVIE, TypesMovie.SERIES, TypesMovie.GAME])
        : movie.Type;

    movie.Type = movieType;
  });
  return {
    Title: faker.lorem.words(2),
    Year: faker.date.between({ from: "1900-01-01", to: "2024-12-31" }).getFullYear().toString(),
    Rated: faker.helpers.enumValue(MovieRating),
    Released: faker.date.past().toLocaleDateString("en-US", { year: "2-digit", month: "short", day: "numeric" }),
    Runtime: `${faker.number.bigInt({ min: 1, max: 300 })} min`,
    Genre: getRandomGenres(),
    Director: faker.lorem.words(2),
    Writer: faker.lorem.words(3),
    Actors: faker.lorem.words(3),
    Plot: faker.lorem.paragraph(),
    Language: faker.helpers.arrayElement(["English", "Spanish", "Mandarin"]),
    Country: faker.helpers.arrayElement(["United States", "United Kingdom"]),
    Awards: faker.lorem.sentence(),
    Poster: faker.image.url(),
    Ratings: [
      { Source: "Internet Movie Database", Value: `${faker.number.float({ min: 5, max: 10 }).toFixed(1)}/10` },
      { Source: "Rotten Tomatoes", Value: `${faker.number.int({ min: 50, max: 100 })}%` },
      { Source: "Metacritic", Value: `${faker.number.int({ min: 50, max: 100 })}/100` },
    ],
    Metascore: faker.number.int({ min: 50, max: 100 }).toString(),
    imdbRating: faker.number.float({ min: 5, max: 10 }).toFixed(1),
    imdbVotes: faker.number.int({ min: 1000, max: 1000000 }).toString(),
    imdbID: sequence.toString(),
    Type: faker.helpers.arrayElement([TypesMovie.MOVIE, TypesMovie.SERIES, TypesMovie.GAME]),
    Score: faker.number.int({ min: 0, max: 100 }).toString(),
    DVD: "N/A",
    BoxOffice: `$${faker.number.int({ min: 1000000, max: 500000000 }).toLocaleString()}`,
    Production: "N/A",
    Website: "N/A",
    Response: "True",
  };
});

export const MovieMother = {
  create: (params?: Partial<MovieOMBD>): MovieOMBD => {
    return MovieFactory.build(params);
  },
  createList: (length = 5, params?: Partial<MovieOMBD>): MovieOMBD[] => {
    return MovieFactory.buildList(length, params);
  },
};

export const MovieDetailMother = {
  create: (params?: Partial<MovieDetailOMBD>): MovieDetailOMBD => {
    return MovieDetailFactory.build(params);
  },
  createList: (length = 5, params?: Partial<MovieDetailOMBD>): MovieDetailOMBD[] => {
    return MovieDetailFactory.buildList(length, params);
  },
};
