"use client";

import { useMovies } from "store/Movies.context";

export default function Page() {
  const { movies } = useMovies();
  console.log({ movies });
  return (
    <>
      <h1 className="font-serif text-4xl underline">Movies</h1>
    </>
  );
}
