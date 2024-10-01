"use client";

import { createRepositoryMoviesOMDB } from "@/core/movies/repositories/omdb.repository";
import { createServiceMovies } from "@/core/movies/services/Movie.services";
import { MoviesContextProvider } from "store/Movies.context";

const repositoryMoviesOMDB = createRepositoryMoviesOMDB();
const serviceMoviesOMDB = createServiceMovies(repositoryMoviesOMDB);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MoviesContextProvider service={serviceMoviesOMDB}>
      <html lang="en">
        <body>{children}</body>
      </html>
    </MoviesContextProvider>
  );
}
