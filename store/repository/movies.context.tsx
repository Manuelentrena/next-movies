import { FavsRepository } from "@/core/movies/domain/contract/FavsRepository";
import { MovieRepository } from "@/core/movies/domain/contract/MovieRepository";
import { createContext } from "react";

export interface ServiceContextState {
  serviceAPI: MovieRepository;
  serviceFAVS: FavsRepository;
}

export const ServiceContext = createContext({} as ServiceContextState);

export const ServiceContextProvider = ({
  children,
  serviceAPI,
  serviceFAVS,
}: React.PropsWithChildren<{ serviceAPI: MovieRepository; serviceFAVS: FavsRepository }>) => {
  return (
    <ServiceContext.Provider
      value={{
        serviceAPI,
        serviceFAVS,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};
