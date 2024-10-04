import { useMovies } from "@/hooks/useMovies";
import { useAppDispatch } from "@/store/hooks";
import { setMovieDetail } from "@/store/movies/movies.slice";
import { useEffect, useState } from "react";

export default function useMovieDetail({ params }: { params: { id: string } }) {
  const dispatch = useAppDispatch();
  const { moviesState, getMovie, toggleFav } = useMovies();
  const { id } = params;

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const movieDetail = moviesState.movies.find((movie) => movie.Id === id);
    if (movieDetail) {
      dispatch(setMovieDetail(movieDetail));
      setIsLoading(false);
    } else {
      getMovie({ id }).finally(() => {
        setIsLoading(false);
      });
    }
  }, [id]);

  return { movieDetail: moviesState.movieDetail, toggleFav, isLoading };
}
