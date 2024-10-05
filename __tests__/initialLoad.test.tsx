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
import { act, render, screen, waitFor } from "@testing-library/react";
import { setSearchParams } from "../jest.setup";

let repositoryMoviesOMDB: IMovieRepositoryOMDB;
let serviceMoviesOMDB: IMovieService;
let repositoryFavsLocalStorage: IFavsRepositoryLocalStorage;
let serviceFavsLocalStorage: IFavService;

describe("Initial Load of App", () => {
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

  test("👀 Checked that the URLQuery title is rendered in the container.", async () => {
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

    const headingElement = await screen.findByText(/"batman"/i);
    expect(headingElement).toBeInTheDocument();
  });

  test("⚡ Checked that the Numbers of calls are optimal with type series", async () => {
    setSearchParams("batman", TypesMovie.SERIES);

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
      expect(repositoryMoviesOMDB.getMovies).toHaveBeenCalledWith({
        title: "batman",
        type: TypesMovie.SERIES,
        page: 1,
      });
    });

    await waitFor(() => {
      expect(repositoryMoviesOMDB.getMovies).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(repositoryMoviesOMDB.getMovie).toHaveBeenCalledTimes(1);
    });
  });

  test("⚡ Checked that the Numbers of calls are optimal with type all", async () => {
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

    await waitFor(() => {
      expect(repositoryMoviesOMDB.getMovies).toHaveBeenCalledWith({
        title: "batman",
        type: TypesMovie.ALL,
        page: 1,
      });
    });

    await waitFor(() => {
      expect(repositoryMoviesOMDB.getMovies).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(repositoryMoviesOMDB.getMovie).toHaveBeenCalledTimes(3);
    });
  });

  test("🎨 Checked all the movies are rendered with type all", async () => {
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

    await waitFor(() => {
      const imgElement1 = screen.getByRole("img", { name: "The Batman Poster" });
      expect(imgElement1).toBeInTheDocument();
      const imgElement2 = screen.getByRole("img", { name: "Batman Begins Poster" });
      expect(imgElement2).toBeInTheDocument();
      const imgElement3 = screen.getByRole("img", { name: "Batman: The Animated Series Poster" });
      expect(imgElement3).toBeInTheDocument();
    });
  });

  test("🎨 Checked only the movies with type movies are rendered", async () => {
    setSearchParams("batman", TypesMovie.MOVIE);

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
      const imgElement1 = screen.getByRole("img", { name: "The Batman Poster" });
      expect(imgElement1).toBeInTheDocument();
      const imgElement2 = screen.getByRole("img", { name: "Batman Begins Poster" });
      expect(imgElement2).toBeInTheDocument();
      const imgElement3 = screen.queryByRole("img", { name: "Batman: The Animated Series Poster" });
      expect(imgElement3).not.toBeInTheDocument();
    });
  });
});
