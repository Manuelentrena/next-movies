"use client";

import { BASE_URL } from "config/env";
import { useMovies } from "store/Movies.context";

export default function Page() {
  const { movies } = useMovies();
  console.log({ movies });
  return (
    <>
      <h1>App Router</h1>
      <p>{BASE_URL}</p>
    </>
  );
}
