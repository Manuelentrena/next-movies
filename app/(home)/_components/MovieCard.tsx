"use client";

import { Badge } from "@/components/ui/badge";
import { MovieDetail } from "@/core/movies/domain/Movie";
import { useMovies } from "@/hooks/useMovies";
import { cn } from "@/utils/utils";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { memo } from "react";
import { ScoreMarket } from "./ScoreMarket";

interface MovieCardProps extends MovieDetail {
  index: number;
  hovered: number | null;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
}

const MovieCard: React.FC<MovieCardProps> = memo(
  ({
    Title,
    Year,
    Type,
    Poster,
    hovered,
    index,
    setHovered,
    Id,
    Fav,
    Rated,
    Released,
    Runtime,
    Genre,
    Director,
    Score,
    Plot,
  }) => {
    const router = useRouter();
    const { toggleFav } = useMovies();
    const ScoreClean = Score === null ? "N/A" : Number(Score);

    const handleStarClick = (event: React.MouseEvent) => {
      event.stopPropagation();
      const movie = { Year, Type, Poster, Id, Fav, Title, Rated, Released, Runtime, Genre, Director, Score, Plot };
      toggleFav({ movie });
    };

    const handleMovieDetail = (Id: string) => {
      router.push(`/movie/${Id}`);
    };

    return (
      <div
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        onClick={() => handleMovieDetail(Id)}
        className={cn(
          "relative h-60 w-full overflow-hidden rounded-lg bg-gray-100 transition-all duration-300 ease-out md:h-96 dark:bg-neutral-900",
          hovered !== null && hovered !== index && "scale-[0.98] blur-sm",
          Fav && "shadow-lg shadow-yellow-400",
        )}
      >
        {/* Image */}
        {Poster ? (
          <img src={Poster} alt={`${Title} Poster`} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <img
            src="poster_not_found.webp"
            alt={`${Title} Poster`}
            className="absolute inset-0 h-full w-full object-cover"
            role="img"
          />
        )}

        {/* Score Marker */}
        <ScoreMarket id={Id} score={ScoreClean} size={35} />

        {/* Star */}
        <div className="absolute right-2 top-2 z-10 cursor-pointer" onClick={handleStarClick}>
          {Fav ? (
            <Star fill="yellow" strokeWidth={0} className="relative h-8 w-8" />
          ) : (
            <Star className="relative h-8 w-8 text-yellow-100" />
          )}
        </div>
        {/* Background */}
        <div
          className={cn(
            "absolute inset-0 flex cursor-pointer items-end bg-black/70 px-4 py-8 transition-opacity duration-300",
            hovered === index ? "opacity-100" : "opacity-0",
          )}
        >
          <div>
            <div className="flex flex-col">
              <span className="bg-gradient-to-b from-neutral-50 to-neutral-200 bg-clip-text text-xl font-extrabold text-transparent sm:text-lg md:text-2xl">
                {Title} ({Year})
              </span>
              <span className="flex">
                <Badge variant="outline" className="mt-2 bg-primary text-white">
                  {Type}
                </Badge>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

MovieCard.displayName = "MovieCard";

export default MovieCard;
