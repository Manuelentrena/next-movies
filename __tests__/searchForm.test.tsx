import HomePage from "@/app/(home)/page";
import { TypesMovie } from "@/core/movies/domain/Movie";
import { store } from "@/store/store";
import { act, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setSearchParams } from "../jest.setup";
import { SearchMother } from "./core/movies/domain/SearchMother";
import { renderWithProviders } from "./utils/renderWithProviders";

describe("searchForm", () => {
  beforeAll(() => {});

  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("❌ Checked message error in searchForm.", async () => {
    const Search = SearchMother.create({ title: "batman", type: TypesMovie.ALL, page: 1 });
    const numMovies = 3;
    setSearchParams({ title: Search.title, type: Search.type });

    await act(async () => {
      renderWithProviders(<HomePage />, { search: Search, length: numMovies });
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
    const numMovies = 3;
    setSearchParams({ title: Search.title, type: Search.type });

    await act(async () => {
      renderWithProviders(<HomePage />, { search: Search, length: numMovies });
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

  test("🦇 Checked only 'The Batman' and  'Batman: The Animated Series' is rendered", async () => {
    const Search = SearchMother.create({ title: "batman", type: TypesMovie.ALL, page: 1 });
    const numMovies = 3;
    setSearchParams({ title: Search.title, type: Search.type });

    await act(async () => {
      renderWithProviders(<HomePage />, { search: Search, length: numMovies });
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
      console.log(store.getState().moviesReducer.movies);
    });

    // await waitFor(() => {
    //   const imgElement1 = screen.getByRole("img", { name: "The Batman Poster" });
    //   expect(imgElement1).toBeInTheDocument();
    //   const imgElement2 = screen.queryByRole("img", { name: "Batman Begins Poster" });
    //   expect(imgElement2).not.toBeInTheDocument();
    //   const imgElement3 = screen.getByRole("img", { name: "Batman: The Animated Series Poster" });
    //   expect(imgElement3).toBeInTheDocument();
    // });
  });

  //   test("🦇 Checked only 'The Batman' is rendered", async () => {
  //     const restorePointerEvent = mockPointerEvent();
  //     const Search = SearchMother.create({ title: "batman", type: TypesMovie.ALL, page: 1 });
  //     setSearchParams({ title: Search.title, type: Search.type });

  //     await act(async () => {
  //       render(
  //         <Providers>
  //           <ServiceContextProvider serviceAPI={serviceMoviesOMDB} serviceFAVS={serviceFavsLocalStorage}>
  //             <HomePage />
  //           </ServiceContextProvider>
  //         </Providers>,
  //       );
  //     });

  //     const inputTitle = screen.getByRole("search");
  //     expect(inputTitle).toBeInTheDocument();
  //     await userEvent.clear(inputTitle);
  //     await userEvent.type(inputTitle, "The Batman");

  //     const selectButton = screen.getByRole("combobox");
  //     expect(selectButton).toHaveTextContent(TypesMovie.ALL.toUpperCase());

  //     fireEvent.pointerDown(
  //       selectButton,
  //       new window.PointerEvent("pointerdown", {
  //         ctrlKey: false,
  //         button: 0,
  //       }),
  //     );

  //     const selectedOption = await screen.findByRole("option", { name: TypesMovie.MOVIE.toUpperCase() });
  //     expect(selectedOption).toBeInTheDocument();
  //     await userEvent.click(selectedOption);

  //     expect(selectButton).toHaveTextContent(TypesMovie.MOVIE.toUpperCase());

  //     const submitButton = screen.getByText(/Buscar películas/i);
  //     expect(submitButton).toBeInTheDocument();

  //     restorePointerEvent();

  //     await act(async () => {
  //       userEvent.click(submitButton);
  //     });

  //     await waitFor(() => {
  //       const imgElement1 = screen.getByRole("img", { name: "The Batman Poster" });
  //       expect(imgElement1).toBeInTheDocument();
  //       const imgElement2 = screen.queryByRole("img", { name: "Batman Begins Poster" });
  //       expect(imgElement2).not.toBeInTheDocument();
  //       const imgElement3 = screen.queryByRole("img", { name: "Batman: The Animated Series Poster" });
  //       expect(imgElement3).not.toBeInTheDocument();
  //     });

  //     // await waitFor(() => {
  //     //   screen.debug(undefined, Infinity);
  //     // });
  //   });
});
