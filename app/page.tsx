"use client";

import { Search } from "@/components/global/search";
import { useMovies } from "store/Movies.context";

export default function Page() {
  const { movies, getMovies } = useMovies();
  console.log({ movies });
  return (
    <>
      <h1 className="font-serif text-4xl underline">Movies</h1>
      <Search getMovies={getMovies} />
    </>
  );
}
