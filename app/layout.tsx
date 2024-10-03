"use client";

import Footer from "@/components/global/Footer";
import { Header } from "@/components/global/Header";
import { createRepositoryMoviesOMDB } from "@/core/movies/repositories/omdb/omdb.repository";
import { createServiceMovies } from "@/core/movies/services/Movie.services";
import { Providers } from "@/store/providers";
import { ServiceMoviesContextProvider } from "@/store/repository/movies.context";

import "@/styles/global.css";

const repositoryMoviesOMDB = createRepositoryMoviesOMDB();
const serviceMoviesOMDB = createServiceMovies(repositoryMoviesOMDB);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <ServiceMoviesContextProvider service={serviceMoviesOMDB}>
        <html lang="en">
          <body className="bg-muted">
            <Header />
            {children}
            <Footer />
          </body>
        </html>
      </ServiceMoviesContextProvider>
    </Providers>
  );
}
