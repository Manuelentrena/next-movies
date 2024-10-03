import { useMovies } from "@/hooks/useMovies";
import { useEffect, useState } from "react";

export default function useMovieDetail({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(false);
  const { moviesState, getMovie, toggleFav } = useMovies();
  const { movieDetail } = moviesState;
  const { id } = params;

  useEffect(() => {
    setIsLoading(true);
    getMovie({ id }).finally(() => {
      setIsLoading(false);
    });
  }, [id]);

  return { movieDetail, toggleFav, isLoading };
}
