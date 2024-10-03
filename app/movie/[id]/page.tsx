"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMovies } from "@/hooks/useMovies";
import { ArrowLeft, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useEffect, useRef } from "react";
import StarRating from "./_components/StarRating";

interface MovieDetailProps {
  params: {
    id: string;
  };
}

const MovieDetail: FC<MovieDetailProps> = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const { moviesState, getMovie, toggleFav } = useMovies();
  const { movieDetail } = moviesState;

  const hasFetchedMovieDetail = useRef(false);

  useEffect(() => {
    if (!hasFetchedMovieDetail.current) {
      getMovie({ id });
      hasFetchedMovieDetail.current = true;
    }
  }, []);

  const handleStarClick = () => {
    const movie = {
      Year: movieDetail.Year,
      Type: movieDetail.Type,
      Poster: movieDetail.Poster,
      Id: movieDetail.Id,
      Fav: movieDetail.Fav,
      Title: movieDetail.Title,
    };
    toggleFav({ movie });
  };

  return (
    movieDetail &&
    Object.keys(movieDetail).length > 0 && (
      <section className="w-full bg-muted py-6 text-foreground md:py-12 lg:py-20">
        {/* Navbar */}
        <div className="container flex w-full items-center justify-between px-4 py-2">
          <Button onClick={() => router.back()} variant="outline" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back Page
          </Button>
          <Button onClick={handleStarClick} variant="default" className="flex items-center">
            {movieDetail.Fav ? (
              <Star fill="yellow" strokeWidth={0} className="relative h-4 w-4" />
            ) : (
              <Star className="h-4 w-4" />
            )}
          </Button>
        </div>
        {/* MovieDetail */}
        <div className="container grid grid-cols-1 gap-8 px-4 md:grid-cols-2 md:gap-12 lg:gap-16">
          {/* Poster */}
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={movieDetail.Poster ? movieDetail.Poster : "/poster_not_found.webp"}
              width={300}
              height={450}
              alt={movieDetail.Title}
              className="h-full w-full object-cover"
              style={{ aspectRatio: "300/450", objectFit: "cover" }}
            />
          </div>
          {/* InfoDetail */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                {movieDetail.Title}
              </h1>
              <p className="text-muted-foreground md:text-xl">{movieDetail.Plot ? movieDetail.Plot : "Whitout plot"}</p>
            </div>
            <div className="flex flex-col items-start justify-start gap-2">
              <Badge variant="secondary" className="rounded-full bg-gray-600 px-4 py-1 text-sm text-white">
                {movieDetail.Type?.toLocaleUpperCase()} ({movieDetail.Runtime})
              </Badge>
              <Badge variant="default" className="rounded-full px-4 py-1 text-sm">
                {movieDetail.Genre ? movieDetail.Genre : "Unknown"}
              </Badge>
              <Badge variant="destructive" className="rounded-full px-4 py-1 text-sm">
                Rated: {movieDetail.Rated ? movieDetail.Rated : "Unknown"}
              </Badge>
              <Badge variant="outline" className="rounded-full border-gray-900 px-4 py-1 text-sm">
                Released: {movieDetail.Released ? movieDetail.Released : "Unknown"}
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              {movieDetail.Score ? <StarRating score={Number(movieDetail.Score)} /> : "Scored: Unknown"}
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default MovieDetail;
