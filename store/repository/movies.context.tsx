import { MovieRepository } from "@/core/movies/domain/contract/MovieRepository";
import { createContext } from "react";

export interface ServiceMoviesContextState {
  service: MovieRepository;
}

export const ServiceMoviesContext = createContext({} as ServiceMoviesContextState);

export const ServiceMoviesContextProvider = ({
  children,
  service,
}: React.PropsWithChildren<{ service: MovieRepository }>) => {
  return (
    <ServiceMoviesContext.Provider
      value={{
        service,
      }}
    >
      {children}
    </ServiceMoviesContext.Provider>
  );
};
