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
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setSearchParams } from "../jest.setup";
import { mockPointerEvent } from "./__mocks__/pointerEventMock";

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

    let errorText = screen.queryByText(/3 characters unless type is FAVS/i);
    expect(errorText).not.toBeInTheDocument();

    await userEvent.click(submitButton);

    errorText = screen.getByText(/3 characters unless type is FAVS/i);
    expect(errorText).toBeInTheDocument();
  });

  test("✨ Checked not message error in searchForm with Favs.", async () => {
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

    let errorText = screen.queryByText(/3 characters unless type is FAVS/i);
    expect(errorText).not.toBeInTheDocument();

    await act(async () => {
      userEvent.click(submitButton);
    });

    errorText = screen.queryByText(/3 characters unless type is FAVS/i);
    expect(errorText).not.toBeInTheDocument();
  });

  test("🦇 Checked only 'The Batman' and  'Batman: The Animated Series' is rendered", async () => {
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

    await act(async () => {
      const inputTitle = screen.getByRole("search");
      expect(inputTitle).toBeInTheDocument();
      await userEvent.clear(inputTitle);
      await userEvent.type(inputTitle, "The Batman");
    });

    const selectButton = screen.getByRole("combobox");
    expect(selectButton).toHaveTextContent(TypesMovie.ALL.toUpperCase());

    const submitButton = screen.getByText(/Buscar películas/i);
    expect(submitButton).toBeInTheDocument();

    await act(async () => {
      userEvent.click(submitButton);
    });

    await waitFor(() => {
      const imgElement1 = screen.getByRole("img", { name: "The Batman Poster" });
      expect(imgElement1).toBeInTheDocument();
      const imgElement2 = screen.queryByRole("img", { name: "Batman Begins Poster" });
      expect(imgElement2).not.toBeInTheDocument();
      const imgElement3 = screen.getByRole("img", { name: "Batman: The Animated Series Poster" });
      expect(imgElement3).toBeInTheDocument();
    });
  });

  test("🦇 Checked only 'The Batman' is rendered", async () => {
    const restorePointerEvent = mockPointerEvent();
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
    await userEvent.type(inputTitle, "The Batman");

    const selectButton = screen.getByRole("combobox");
    expect(selectButton).toHaveTextContent(TypesMovie.ALL.toUpperCase());

    fireEvent.pointerDown(
      selectButton,
      new window.PointerEvent("pointerdown", {
        ctrlKey: false,
        button: 0,
      }),
    );

    const selectedOption = await screen.findByRole("option", { name: TypesMovie.MOVIE.toUpperCase() });
    expect(selectedOption).toBeInTheDocument();
    await userEvent.click(selectedOption);

    expect(selectButton).toHaveTextContent(TypesMovie.MOVIE.toUpperCase());

    const submitButton = screen.getByText(/Buscar películas/i);
    expect(submitButton).toBeInTheDocument();

    restorePointerEvent();

    await act(async () => {
      userEvent.click(submitButton);
    });

    await waitFor(() => {
      const imgElement1 = screen.getByRole("img", { name: "The Batman Poster" });
      expect(imgElement1).toBeInTheDocument();
      const imgElement2 = screen.queryByRole("img", { name: "Batman Begins Poster" });
      expect(imgElement2).not.toBeInTheDocument();
      const imgElement3 = screen.queryByRole("img", { name: "Batman: The Animated Series Poster" });
      expect(imgElement3).not.toBeInTheDocument();
    });

    // await waitFor(() => {
    //   screen.debug(undefined, Infinity);
    // });
  });
});
