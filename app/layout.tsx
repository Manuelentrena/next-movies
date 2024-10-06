"use client";

import { Footer } from "@/components/global/Footer";
import { Header } from "@/components/global/Header";
import { createRepositoryFavsLocalStorage } from "@/core/movies/repositories/localstorage/localstorage.repository";
import { createRepositoryMoviesOMDB } from "@/core/movies/repositories/omdb/omdb.repository";
import { createServiceFavs } from "@/core/movies/services/favs/Fav.service";
import { createServiceMovies } from "@/core/movies/services/movies/Movie.services";
import { Providers } from "@/store/providers";
import { ServiceContextProvider } from "@/store/repository/movies.context";
import { Suspense } from "react";

import "@/styles/global.css";

const repositoryMoviesOMDB = createRepositoryMoviesOMDB();
const serviceMoviesOMDB = createServiceMovies(repositoryMoviesOMDB);

const repositoryFavsLocalStorage = createRepositoryFavsLocalStorage();
const serviceFavsLocalStorage = createServiceFavs(repositoryFavsLocalStorage);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <Providers>
        <ServiceContextProvider serviceAPI={serviceMoviesOMDB} serviceFAVS={serviceFavsLocalStorage}>
          <html lang="es">
            <body className="bg-muted">
              <Header />
              {children}
              <Footer />
            </body>
          </html>
        </ServiceContextProvider>
      </Providers>
    </Suspense>
  );
}
