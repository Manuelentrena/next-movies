"use client";

import { Badge } from "@/components/ui/badge";
import { Movie } from "@/core/movies/domain/Movie";
import { cn } from "@/utils/utils";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { memo, useState } from "react";

interface MovieCardProps extends Movie {
  index: number;
  hovered: number | null;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
}

const MovieCard: React.FC<MovieCardProps> = memo(({ Title, Year, Type, Poster, hovered, index, setHovered, Id }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();

  const handleStarClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsFavorite(!isFavorite);
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
        />
      )}

      {/* Star */}
      <div className="absolute right-2 top-2 z-10 cursor-pointer" onClick={handleStarClick}>
        {isFavorite ? (
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
});

MovieCard.displayName = "MovieCard";

export default MovieCard;
