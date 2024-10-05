import HomePage from "@/app/(home)/page";
import { Search } from "@/core/movies/domain/contract/MovieRepository";
import { TypesMovie } from "@/core/movies/domain/Movie";
import { createRepositoryFavsLocalStorage } from "@/core/movies/repositories/localstorage/localstorage.repository";
import { IFavsRepositoryLocalStorage } from "@/core/movies/repositories/localstorage/types/localstorage.types";
import { getMovieMockOMDB } from "@/core/movies/repositories/omdb/mocks/getMovieMockOMDB";
import { getMoviesMockOMDB } from "@/core/movies/repositories/omdb/mocks/getMoviesMockOMDB";
import { createRepositoryMoviesOMDB } from "@/core/movies/repositories/omdb/omdb.repository";
import { IMovieRepositoryOMDB } from "@/core/movies/repositories/omdb/types/omdb.types";
import { createServiceFavs } from "@/core/movies/services/favs/Fav.service";
import { IFavService } from "@/core/movies/services/favs/types/fav.types";
import { createServiceMovies } from "@/core/movies/services/movies/Movie.services";
import { IMovieService } from "@/core/movies/services/movies/types/movies.types";
import { Providers } from "@/store/providers";
import { ServiceContextProvider } from "@/store/repository/movies.context";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setSearchParams } from "../jest.setup";

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
    repositoryMoviesOMDB.getMovies = jest.fn().mockImplementation(({ title, type, page }: Search) => {
      return getMoviesMockOMDB({ title, type, page });
    });
    repositoryMoviesOMDB.getMovie = jest.fn().mockImplementation(({ id }) => {
      return getMovieMockOMDB({ id });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("❌ Checked message error in searchForm.", async () => {
    setSearchParams("batman", TypesMovie.ALL);

    await act(async () => {
      render(
        <Providers>
          <ServiceContextProvider serviceAPI={serviceMoviesOMDB} serviceFAVS={serviceFavsLocalStorage}>
            <HomePage />
          </ServiceContextProvider>
        </Providers>,
      );
    });

    const inputTitle = screen.getByRole("search");
    expect(inputTitle).toBeInTheDocument();
    await userEvent.clear(inputTitle);

    const selectButton = screen.getByRole("combobox");
    expect(selectButton).toHaveTextContent(TypesMovie.ALL.toUpperCase());

    const submitButton = screen.getByText(/Buscar películas/i);
    expect(submitButton).toBeInTheDocument();

    await userEvent.click(submitButton);

    const errorText = screen.getByText(/3 characters unless type is FAVS/i);
    expect(errorText).toBeInTheDocument();
  });

  test("✨ Checked not message error in searchForm.", async () => {
    setSearchParams("batman", TypesMovie.FAVS);

    await act(async () => {
      render(
        <Providers>
          <ServiceContextProvider serviceAPI={serviceMoviesOMDB} serviceFAVS={serviceFavsLocalStorage}>
            <HomePage />
          </ServiceContextProvider>
        </Providers>,
      );
    });

    const inputTitle = screen.getByRole("search");
    expect(inputTitle).toBeInTheDocument();
    await userEvent.clear(inputTitle);

    const selectButton = screen.getByRole("combobox");
    expect(selectButton).toHaveTextContent(TypesMovie.FAVS.toUpperCase());

    const submitButton = screen.getByText(/Buscar películas/i);
    expect(submitButton).toBeInTheDocument();

    await userEvent.click(submitButton);

    const errorText = screen.queryByText(/3 characters unless type is FAVS/i);
    expect(errorText).not.toBeInTheDocument();

    console.log(screen.debug());
  });
});
