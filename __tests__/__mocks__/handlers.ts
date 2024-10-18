import { TypesMovie } from "@/core/movies/domain/Movie";
import { MovieDetailMother } from "@/core/movies/repositories/omdb/mocks/objectsMother/MovieMother";
import { emptyMovieOMBD, MovieDetailOMBD, MovieOMBD } from "@/core/movies/repositories/omdb/types/omdb.types";
import { http, HttpResponse } from "msw";
import { createMovies } from "../utils/randomElements";

export let Movies: MovieOMBD[] | MovieDetailOMBD[] = [emptyMovieOMBD];

export const handlers = [
  http.get(`https://www.omdbapi.com`, ({ request }) => {
    const url = new URL(request.url);

    const page = url.searchParams.get("page") || null;
    const title = url.searchParams.get("s") || null;
    const id = url.searchParams.get("i") || null;
    const type = (url.searchParams.get("type") as TypesMovie.MOVIE | TypesMovie.SERIES | TypesMovie.GAME) || null;

    if ((id && title) || (!id && !title)) {
      return HttpResponse.json({
        Response: "False",
        Error: "Incorrect IMDb ID.",
      });
    }

    if (title !== "" && title !== null) {
      if (type !== null && type !== TypesMovie.MOVIE && type !== TypesMovie.SERIES && type !== TypesMovie.GAME) {
        return HttpResponse.json({
          Response: "False",
          Error: `Incorrect syntax near the keyword '${type}'.`,
        });
      }

      if (page === "0") {
        return HttpResponse.json({
          Response: "False",
          Error: "The offset specified in a OFFSET clause may not be negative.",
        });
      }

      Movies = createMovies({ length: 10, title: title, type: type });

      return HttpResponse.json({
        Search: Movies,
        totalResults: Movies.length.toString(),
        Response: "True",
      });
    }

    if (id !== "" && id !== null) {
      const movielocated = Movies.find((movie) => movie.imdbID === id);

      if (!movielocated) {
        return HttpResponse.json({
          Response: "False",
          Error: "Incorrect IMDb ID.",
        });
      }

      const MovieDetail = MovieDetailMother.create({
        imdbID: movielocated.imdbID,
        Title: movielocated.Title,
        Type: movielocated.Type,
        Poster: movielocated.Poster ?? "",
        Year: movielocated.Year,
      });

      Movies = Movies.map((movie) => (movie.imdbID === MovieDetail.imdbID ? MovieDetail : movie));

      return HttpResponse.json(MovieDetail);
    }

    return HttpResponse.json({
      Response: "False",
      Error: "Incorrect IMDb ID.",
    });
  }),
];
