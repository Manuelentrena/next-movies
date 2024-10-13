import HomePage from "@/app/(home)/page";
import { TypesMovie } from "@/core/movies/domain/Movie";
import { store } from "@/store/store";
import { act, screen, waitFor } from "@testing-library/react";
import { setSearchParams } from "../jest.setup";
import { SearchMother } from "./core/movies/domain/SearchMother";
import { moviesDetail, renderWithProviders, repositoryMoviesOMDB } from "./utils/renderWithProviders";

describe("Initial Load of App", () => {
  beforeAll(() => {});

  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("👀 Checked that the URLQuery title is rendered in the container.", async () => {
    const Search = SearchMother.create({ title: "batman", type: TypesMovie.ALL, page: 1 });
    const numMovies = 3;
    setSearchParams({ title: Search.title, type: Search.type });

    await act(async () => {
      renderWithProviders(<HomePage />, { search: Search, length: numMovies });
    });

    const headingElement = await screen.findByText(/"batman"/i);
    expect(headingElement).toBeInTheDocument();
  });

  test("⚡ Checked that the Numbers of calls are optimal with type series", async () => {
    const Search = SearchMother.create({ title: "batman", type: TypesMovie.SERIES, page: 1 });
    const numMovies = 3;
    setSearchParams({ title: Search.title, type: Search.type });

    await act(async () => {
      renderWithProviders(<HomePage />, { search: Search, length: numMovies });
    });

    await waitFor(() => {
      expect(repositoryMoviesOMDB.getMovies).toHaveBeenCalledWith({
        title: Search.title,
        type: Search.type,
        page: Search.page,
      });
    });

    await waitFor(() => {
      expect(repositoryMoviesOMDB.getMovies).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(repositoryMoviesOMDB.getMovie).toHaveBeenCalledTimes(numMovies);
    });
  });

  test("⚡ Checked that the Numbers of calls are optimal with type all", async () => {
    const Search = SearchMother.create({ title: "batman", type: TypesMovie.ALL, page: 1 });
    const numMovies = 5;
    setSearchParams({ title: Search.title, type: Search.type });

    await act(async () => {
      renderWithProviders(<HomePage />, { search: Search, length: numMovies });
    });

    await waitFor(() => {
      expect(repositoryMoviesOMDB.getMovies).toHaveBeenCalledWith({
        title: Search.title,
        type: Search.type,
        page: Search.page,
      });
    });

    await waitFor(() => {
      expect(repositoryMoviesOMDB.getMovies).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(repositoryMoviesOMDB.getMovie).toHaveBeenCalledTimes(numMovies);
    });
  });

  test("🔖 Checked all the movies are rendered with their own alt img", async () => {
    const Search = SearchMother.create({ title: "batman", type: TypesMovie.ALL, page: 1 });
    const numMovies = 5;
    setSearchParams({ title: Search.title, type: Search.type });

    await act(async () => {
      renderWithProviders(<HomePage />, { search: Search, length: numMovies });
    });

    moviesDetail.forEach((movie) => {
      const imgElement = screen.getByRole("img", { name: `${movie.Title} Poster` });
      expect(imgElement).toBeInTheDocument();
    });
  });

  test("🎨 Checked each badge is rendered", async () => {
    const Search = SearchMother.create({ title: "batman", type: TypesMovie.ALL, page: 1 });
    const numMovies = 5;
    setSearchParams({ title: Search.title, type: Search.type });

    await act(async () => {
      renderWithProviders(<HomePage />, { search: Search, length: numMovies });
    });

    moviesDetail.forEach((movie) => {
      expect(screen.getByTestId(`badge-movie-${movie.Id}`)).toBeInTheDocument();
    });
  });

  test("🎈 Checked global store contains all the movies", async () => {
    const Search = SearchMother.create({ title: "batman", type: TypesMovie.ALL, page: 1 });
    const numMovies = 1;
    setSearchParams({ title: Search.title, type: Search.type });

    await act(async () => {
      renderWithProviders(<HomePage />, { search: Search, length: numMovies });
    });

    expect(store.getState().moviesReducer.movies).toEqual(moviesDetail);
  });
});
