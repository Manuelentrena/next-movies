import HomePage from "@/app/(home)/page";
import { Movie, TypesMovie } from "@/core/movies/domain/Movie";
import { createRepositoryFavsLocalStorage } from "@/core/movies/repositories/localstorage/localstorage.repository";
import { IFavsRepositoryLocalStorage } from "@/core/movies/repositories/localstorage/types/localstorage.types";
import { createRepositoryMoviesOMDB } from "@/core/movies/repositories/omdb/omdb.repository";
import { IMovieRepositoryOMDB } from "@/core/movies/repositories/omdb/types/omdb.types";
import { createServiceFavs } from "@/core/movies/services/favs/Fav.service";
import { IFavService } from "@/core/movies/services/favs/types/fav.types";
import { createServiceMovies } from "@/core/movies/services/movies/Movie.services";
import { IMovieService } from "@/core/movies/services/movies/types/movies.types";
import { Providers } from "@/store/providers";
import { ServiceContextProvider } from "@/store/repository/movies.context";
import { act, render, screen, waitFor } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import { MovieDetailMother } from "@/__tests__/core/movies/domain/MovieMother";
import { setSearchParams } from "../jest.setup";
import { createMovies, moviesDetailResponse, moviesResponse } from "./__mocks__/randomElements";
import { SearchMother } from "./core/movies/domain/SearchMother";

let repositoryMoviesOMDB: IMovieRepositoryOMDB;
let serviceMoviesOMDB: IMovieService;
let repositoryFavsLocalStorage: IFavsRepositoryLocalStorage;
let serviceFavsLocalStorage: IFavService;

describe("searchForm", () => {
  beforeAll(() => {});

  beforeEach(() => {
    repositoryMoviesOMDB = createRepositoryMoviesOMDB();
    serviceMoviesOMDB = createServiceMovies(repositoryMoviesOMDB);
    repositoryFavsLocalStorage = createRepositoryFavsLocalStorage();
    serviceFavsLocalStorage = createServiceFavs(repositoryFavsLocalStorage);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("🦇 randon", async () => {
    const Search = SearchMother.create({ title: "batman", type: TypesMovie.ALL, page: 1 });
    setSearchParams({ title: Search.title, type: Search.type });

    const movies = createMovies({ length: 2, title: Search.title, type: Search.type });
    repositoryMoviesOMDB.getMovies = jest.fn(() => moviesResponse({ movies }));
    repositoryMoviesOMDB.getMovie = jest.fn(({ id }) => {
      const movieFind = movies.find((movie) => movie.Id === id) as Movie;
      return moviesDetailResponse(MovieDetailMother.create({ ...movieFind }));
    });

    await act(async () => {
      render(
        <Providers>
          <ServiceContextProvider serviceAPI={serviceMoviesOMDB} serviceFAVS={serviceFavsLocalStorage}>
            <HomePage />
          </ServiceContextProvider>
        </Providers>,
      );
    });

    await waitFor(() => {
      screen.debug(undefined, Infinity);
    });
  });
});
