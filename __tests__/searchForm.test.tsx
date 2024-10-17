import HomePage from "@/app/(home)/page";
import { TypesMovie } from "@/core/movies/domain/Movie";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setSearchParams } from "../jest.setup";
import { Movies } from "./__mocks__/handlers";
import { mockPointerEvent } from "./__mocks__/pointerEventMock";
import { server } from "./__mocks__/server";
import { SearchMother } from "./core/movies/domain/SearchMother";
import { renderWithProviders } from "./utils/renderWithProviders";

let callCount = 0;

describe("searchForm", () => {
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

  test("❌ Checked message error in searchForm.", async () => {
    const Search = SearchMother.create({ title: "batman", type: TypesMovie.ALL, page: 1 });
    setSearchParams({ title: Search.title, type: Search.type });

    await act(async () => {
      renderWithProviders(<HomePage />);
    });

    const inputTitle = screen.getByRole("search");
    expect(inputTitle).toBeInTheDocument();
    await userEvent.clear(inputTitle);

    const selectButton = screen.getByRole("combobox");
    expect(selectButton).toHaveTextContent(TypesMovie.ALL.toUpperCase());

    const submitButton = screen.getByText(/Buscar películas/i);
    expect(submitButton).toBeInTheDocument();

    let errorText = screen.queryByLabelText("error-search-title");
    expect(errorText).not.toBeInTheDocument();

    await userEvent.click(submitButton);

    errorText = screen.queryByLabelText("error-search-title");
    expect(errorText).toBeInTheDocument();
  });

  test("✨ Checked not message error in searchForm with Favs.", async () => {
    const Search = SearchMother.create({ title: "batman", type: TypesMovie.FAVS, page: 1 });
    setSearchParams({ title: Search.title, type: Search.type });

    await act(async () => {
      renderWithProviders(<HomePage />);
    });

    const inputTitle = screen.getByRole("search");
    expect(inputTitle).toBeInTheDocument();
    await userEvent.clear(inputTitle);

    const selectButton = screen.getByRole("combobox");
    expect(selectButton).toHaveTextContent(TypesMovie.FAVS.toUpperCase());

    const submitButton = screen.getByText(/Buscar películas/i);
    expect(submitButton).toBeInTheDocument();

    let errorText = screen.queryByLabelText("error-search-title");
    expect(errorText).not.toBeInTheDocument();

    await act(async () => {
      userEvent.click(submitButton);
    });

    errorText = screen.queryByLabelText("error-search-title");
    expect(errorText).not.toBeInTheDocument();
  });

  test("🦇 Checked new movies about 'Superman' are displayed over 'batman'", async () => {
    const Search = SearchMother.create({ title: "batman", type: TypesMovie.ALL, page: 1 });
    setSearchParams({ title: Search.title, type: Search.type });

    await act(async () => {
      renderWithProviders(<HomePage />);
    });

    await act(async () => {
      const inputTitle = screen.getByRole("search");
      expect(inputTitle).toBeInTheDocument();
      await userEvent.clear(inputTitle);
      await userEvent.type(inputTitle, "Superman");
    });

    const selectButton = screen.getByRole("combobox");
    expect(selectButton).toHaveTextContent(TypesMovie.ALL.toUpperCase());

    const submitButton = screen.getByText(/Buscar películas/i);
    expect(submitButton).toBeInTheDocument();

    await act(async () => {
      userEvent.click(submitButton);
    });

    await waitFor(() => {
      Movies.forEach((movie) => {
        const imgElement = screen.getByRole("img", { name: `${movie.Title} Poster` });
        expect(imgElement).toBeInTheDocument();
      });
    });
  });

  test("🤾‍♂️ Checked only 'The Superman Series' is rendered", async () => {
    const restorePointerEvent = mockPointerEvent();
    const Search = SearchMother.create({ title: "batman", type: TypesMovie.ALL, page: 1 });
    setSearchParams({ title: Search.title, type: Search.type });

    await act(async () => {
      renderWithProviders(<HomePage />);
    });

    const inputTitle = screen.getByRole("search");
    expect(inputTitle).toBeInTheDocument();
    await userEvent.clear(inputTitle);
    await userEvent.type(inputTitle, "Superman");

    const selectButton = screen.getByRole("combobox");
    expect(selectButton).toHaveTextContent(TypesMovie.ALL.toUpperCase());

    fireEvent.pointerDown(
      selectButton,
      new window.PointerEvent("pointerdown", {
        ctrlKey: false,
        button: 0,
      }),
    );

    const selectedOption = await screen.findByRole("option", { name: TypesMovie.SERIES.toUpperCase() });
    expect(selectedOption).toBeInTheDocument();
    await userEvent.click(selectedOption);

    expect(selectButton).toHaveTextContent(TypesMovie.SERIES.toUpperCase());

    const submitButton = screen.getByText(/Buscar películas/i);
    expect(submitButton).toBeInTheDocument();

    restorePointerEvent();

    await act(async () => {
      userEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(callCount).toBe(22);
      Movies.forEach((movie) => {
        expect(screen.getByTestId(`badge-movie-${movie.imdbID}`)).toHaveTextContent("series");
        expect(screen.getByTestId(`title-movie-${movie.imdbID}`)).toHaveTextContent(`${movie.Title} (${movie.Year})`);
      });
    });

    // await waitFor(() => {
    //   screen.debug(undefined, Infinity);
    // });
  });
});
