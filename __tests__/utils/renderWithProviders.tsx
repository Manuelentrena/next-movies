import { FavsRepository } from "@/core/movies/domain/contract/FavsRepository";
import { MovieRepository } from "@/core/movies/domain/contract/MovieRepository";
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

const repositoryMoviesOMDB: IMovieRepositoryOMDB = createRepositoryMoviesOMDB();
const repositoryFavsLocalStorage: IFavsRepositoryLocalStorage = createRepositoryFavsLocalStorage();
const serviceMoviesOMDB: MovieRepository = createServiceMovies(repositoryMoviesOMDB);
const serviceFavsLocalStorage: FavsRepository = createServiceFavs(repositoryFavsLocalStorage);

export function renderWithProviders(ui: ReactElement) {
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

export { repositoryFavsLocalStorage, repositoryMoviesOMDB, serviceFavsLocalStorage, serviceMoviesOMDB };
