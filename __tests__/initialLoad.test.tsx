import HomePage from "@/app/(home)/page";
import { TypesMovie } from "@/core/movies/domain/Movie";
import { adapterMovieDetailOMDB } from "@/core/movies/repositories/omdb/adapters/omdb.adapter";
import { MovieDetailOMBD } from "@/core/movies/repositories/omdb/types/omdb.types";
import { store } from "@/store/store";
import { act, screen } from "@testing-library/react";
import { setSearchParams } from "../jest.setup";
import { Movies } from "./__mocks__/handlers";
import { server } from "./__mocks__/server";
import { SearchMother } from "./core/movies/domain/SearchMother";
import { renderWithProviders } from "./utils/renderWithProviders";

let callCount = 0;

describe("Initial Load of App", () => {
  beforeAll(() => {
    server.listen();
    server.events.on("request:start", async () => {
      callCount++;
    });
  });

  beforeEach(() => {
    callCount = 0;
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    jest.clearAllMocks();
    server.close();
  });

  test("👀 Checked that the URLQuery title is rendered in the container.", async () => {
    const Search = SearchMother.create({ title: "batman", type: TypesMovie.ALL, page: 1 });

    setSearchParams({ title: Search.title, type: Search.type });

    await act(async () => {
      renderWithProviders(<HomePage />);
    });

    const headingElement = await screen.findByText(/"batman"/i);
    expect(headingElement).toBeInTheDocument();
  });

  test("⚡ Checked that the Numbers of calls are optimal with type series", async () => {
    const Search = SearchMother.create({ title: "batman", type: TypesMovie.SERIES, page: 1 });
    setSearchParams({ title: Search.title, type: Search.type });

    await act(async () => {
      renderWithProviders(<HomePage />);
    });

    expect(callCount).toBe(11);
  });

  test("🔀 Checked that the params in fetch are correct", async () => {
    const Search = SearchMother.create({ title: "batman", type: TypesMovie.SERIES, page: 1 });
    setSearchParams({ title: Search.title, type: Search.type });

    const spy = jest.spyOn(global, "fetch");

    await act(async () => {
      renderWithProviders(<HomePage />);
    });

    expect(spy.mock.calls[0][0]).toContain(`s=${Search.title}&page=${Search.page}&type=${Search.type}`);

    spy.mockRestore();
  });

  test("🔖 Checked all the movies are rendered with their own alt img", async () => {
    const Search = SearchMother.create({ title: "batman", type: TypesMovie.ALL, page: 1 });
    setSearchParams({ title: Search.title, type: Search.type });

    await act(async () => {
      renderWithProviders(<HomePage />);
    });

    Movies.forEach((movie) => {
      const imgElement = screen.getByRole("img", { name: `${movie.Title} Poster` });
      expect(imgElement).toBeInTheDocument();
    });
  });

  test("🎨 Checked each badge is rendered", async () => {
    const Search = SearchMother.create({ title: "batman", type: TypesMovie.ALL, page: 1 });
    setSearchParams({ title: Search.title, type: Search.type });

    await act(async () => {
      renderWithProviders(<HomePage />);
    });

    Movies.forEach((movie) => {
      expect(screen.getByTestId(`badge-movie-${movie.imdbID}`)).toBeInTheDocument();
    });
  });

  test("🎈 Checked global store contains all the movies", async () => {
    const Search = SearchMother.create({ title: "batman", type: TypesMovie.ALL, page: 1 });
    setSearchParams({ title: Search.title, type: Search.type });

    await act(async () => {
      renderWithProviders(<HomePage />);
    });

    const formatedMovies = Movies.map((movie) => {
      return adapterMovieDetailOMDB(movie as MovieDetailOMBD);
    });

    expect(store.getState().moviesReducer.movies).toEqual(formatedMovies);
  });
});
