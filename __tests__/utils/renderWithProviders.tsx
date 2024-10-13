import { FavsRepository } from "@/core/movies/domain/contract/FavsRepository";
import { MovieRepository } from "@/core/movies/domain/contract/MovieRepository";
import { Movie, MovieDetail } from "@/core/movies/domain/Movie";
import { Search } from "@/core/movies/domain/Search";
import { createRepositoryFavsLocalStorage } from "@/core/movies/repositories/localstorage/localstorage.repository";
import { IFavsRepositoryLocalStorage } from "@/core/movies/repositories/localstorage/types/localstorage.types";
import { createRepositoryMoviesOMDB } from "@/core/movies/repositories/omdb/omdb.repository";
import { IMovieRepositoryOMDB } from "@/core/movies/repositories/omdb/types/omdb.types";
import { createServiceFavs } from "@/core/movies/services/favs/Fav.service";
import { createServiceMovies } from "@/core/movies/services/movies/Movie.services";
import { ServiceContextProvider } from "@/store/repository/movies.context";
import { store } from "@/store/store";
import { render } from "@testing-library/react";
import { PropsWithChildren, ReactElement } from "react";
import { Provider } from "react-redux";
import { MovieDetailMother } from "../core/movies/domain/MovieMother";
import { createMovies, moviesDetailResponse, moviesResponse } from "./randomElements";

const repositoryMoviesOMDB: IMovieRepositoryOMDB = createRepositoryMoviesOMDB();
const repositoryFavsLocalStorage: IFavsRepositoryLocalStorage = createRepositoryFavsLocalStorage();
const serviceMoviesOMDB: MovieRepository = createServiceMovies(repositoryMoviesOMDB);
const serviceFavsLocalStorage: FavsRepository = createServiceFavs(repositoryFavsLocalStorage);
let moviesDetail: MovieDetail[] = [];

export function renderWithProviders(ui: ReactElement, { search, length }: { search: Search; length: number }) {
  moviesDetail = [];
  console.log({ search, length });
  const movies = createMovies({ length, title: search.title, type: search.type });

  repositoryMoviesOMDB.getMovies = jest.fn(() => moviesResponse({ movies }));

  repositoryMoviesOMDB.getMovie = jest.fn(({ id }) => {
    const movieFind = movies.find((movie) => movie.Id === id) as Movie;
    const movieDetail = MovieDetailMother.create({ ...movieFind });
    moviesDetail.push(movieDetail);
    return moviesDetailResponse(movieDetail);
  });

  // repositoryMoviesOMDB.getMovies = jest.fn().mockImplementation(({ title, type, page }: Search) => {
  //   return getMoviesMockOMDB({ title, type, page });
  // });
  // repositoryMoviesOMDB.getMovie = jest.fn().mockImplementation(({ id }) => {
  //   return getMovieMockOMDB({ id });
  // });

  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <Provider store={store}>
        <ServiceContextProvider serviceAPI={serviceMoviesOMDB} serviceFAVS={serviceFavsLocalStorage}>
          {children}
        </ServiceContextProvider>
      </Provider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper }) };
}

export { moviesDetail, repositoryFavsLocalStorage, repositoryMoviesOMDB, serviceFavsLocalStorage, serviceMoviesOMDB };
