"use client";

import { useMovies } from "store/Movies.context";

export default function Page() {
  const { movies } = useMovies();
  console.log({ movies });
  return (
    <>
      <h1 className="text-4xl font-serif underline">Movies</h1>
    </>
  );
}
