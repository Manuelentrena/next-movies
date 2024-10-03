import { Star, StarHalf } from "lucide-react";

interface StarRatingProps {
  score: number;
}

const StarRating: React.FC<StarRatingProps> = ({ score }) => {
  const scaledScore = score / 10;
  const fullStars = Math.floor(scaledScore / 2);
  const hasHalfStar = scaledScore % 2 >= 1;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <>
      <div className="flex items-center gap-1 text-yellow-700">
        {Array(fullStars)
          .fill(0)
          .map((_, index) => (
            <Star key={`full-${index}`} fill="yellow" strokeWidth={1} className="h-5 w-5" />
          ))}

        {hasHalfStar && <StarHalf fill="yellow" strokeWidth={1} className="h-5 w-5" />}

        {Array(emptyStars)
          .fill(0)
          .map((_, index) => (
            <Star key={`empty-${index}`} strokeWidth={1} className="h-5 w-5" />
          ))}
      </div>
      <span className="text-muted-foreground">{Number(score) / 10}/10</span>
    </>
  );
};

export default StarRating;
