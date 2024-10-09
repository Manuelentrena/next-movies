import { TypesMovie } from "@/core/movies/domain/Movie";
import { Search } from "@/core/movies/domain/Search";
import { faker } from "@faker-js/faker";
import { Factory } from "fishery";

export const SearchFactory = Factory.define<Search>(() => ({
  title: faker.lorem.words(),
  page: faker.number.int({ min: 1, max: 50 }),
  type: faker.helpers.enumValue(TypesMovie),
}));

export const SearchMother = {
  create: (params?: Partial<Search>): Search => {
    return SearchFactory.build(params);
  },
};
