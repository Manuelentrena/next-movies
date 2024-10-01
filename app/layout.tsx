"use client";

import { Header } from "@/components/global/Header";
import { createRepositoryMoviesOMDB } from "@/core/movies/repositories/omdb.repository";
import { createServiceMovies } from "@/core/movies/services/Movie.services";
import { MoviesContextProvider } from "@/store/movies.context";

import "@/styles/global.css";

const repositoryMoviesOMDB = createRepositoryMoviesOMDB();
const serviceMoviesOMDB = createServiceMovies(repositoryMoviesOMDB);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <MoviesContextProvider service={serviceMoviesOMDB}>
      <html lang="en">
        <body><>
          <Header />
          {children}
        </></body>
      </html>
    </MoviesContextProvider>
  );
}
