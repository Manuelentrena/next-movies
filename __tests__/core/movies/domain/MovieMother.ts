import { getRandomGenres, MovieRating } from "@/__tests__/__mocks__/randomElements";
import { Movie, MovieDetail, TypesMovie } from "@/core/movies/domain/Movie";
import { faker } from "@faker-js/faker";
import { Factory } from "fishery";

export const MovieFactory = Factory.define<Movie>(() => ({
  Title: faker.lorem.words(),
  Year: faker.date.between({ from: "1900-01-01", to: "2024-12-31" }).getFullYear().toString(),
  Id: faker.string.uuid(),
  Poster: faker.image.url(),
  Fav: faker.datatype.boolean(),
  Type: faker.helpers.enumValue(TypesMovie),
}));

export const MovieDetailFactory = Factory.define<MovieDetail>(() => ({
  Title: faker.lorem.words(),
  Year: faker.date.between({ from: "1900-01-01", to: "2024-12-31" }).getFullYear().toString(),
  Id: faker.string.uuid(),
  Poster: faker.image.url(),
  Fav: faker.datatype.boolean(),
  Type: faker.helpers.enumValue(TypesMovie),
  Rated: faker.helpers.enumValue(MovieRating),
  Released: faker.date.past().toLocaleDateString("en-US", { year: "2-digit", month: "short", day: "numeric" }),
  Runtime: `${faker.number.bigInt({ min: 1, max: 300 })} min`,
  Genre: getRandomGenres(),
  Director: faker.lorem.words(2),
  Score: faker.number.int({ min: 0, max: 100 }).toString(),
  Plot: faker.lorem.paragraph(),
}));

export const MovieMother = {
  create: (params?: Partial<Movie>): Movie => {
    return MovieFactory.build(params);
  },
  createList: (length = 5, params?: Partial<Movie>): Movie[] => {
    return MovieFactory.buildList(length, params);
  },
};

export const MovieDetailMother = {
  create: (params?: Partial<MovieDetail>): MovieDetail => {
    return MovieDetailFactory.build(params);
  },
  createList: (length = 5, params?: Partial<MovieDetail>): MovieDetail[] => {
    return MovieDetailFactory.buildList(length, params);
  },
};
