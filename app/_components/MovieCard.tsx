"use client";

import { Movie } from "@/core/movies/domain/Movie";
import { cn } from "@/utils/utils";
import { memo } from "react";

interface MovieCardProps extends Omit<Movie, "Id"> {
  index: number;
  hovered: number | null;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
}

const MovieCard: React.FC<MovieCardProps> = memo(({ Title, Year, Type, Poster, hovered, index, setHovered }) => {
  return (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "relative h-60 w-full overflow-hidden rounded-lg bg-gray-100 transition-all duration-300 ease-out md:h-96 dark:bg-neutral-900",
        hovered !== null && hovered !== index && "scale-[0.98] blur-sm",
      )}
    >
      {Poster ? (
        <img src={Poster} alt={`${Title} Poster`} className="absolute inset-0 h-full w-full object-cover" />
      ) : null}
      <div
        className={cn(
          "absolute inset-0 flex cursor-pointer items-end bg-black/50 px-4 py-8 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="bg-gradient-to-b from-neutral-50 to-neutral-200 bg-clip-text text-xl font-medium text-transparent sm:text-lg md:text-2xl">
          <div className="flex flex-col">
            <span>{Title}</span>
            <span className="flex">
              {Type}
              {Year}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

MovieCard.displayName = "MovieCard";

export default MovieCard;
