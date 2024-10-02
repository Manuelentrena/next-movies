import { NotFoundMovieError } from "@/core/movies/domain/errors/not_found_movie.error";
import { PaginationMovieError } from "@/core/movies/domain/errors/pagination_movie.error";

/* You can use SENTRY, LOGGER, etc... */

export function handleMoviesError(error: Error) {
  if (error instanceof NotFoundMovieError) {
    console.error(error.name, error.repository);
  } else if (error instanceof PaginationMovieError) {
    console.error(error.name, error.repository);
  } else {
    console.error("Error Unknown", "Repo Unknown");
  }
}
