import { useMemo } from "react";

interface ScoreMarketProps {
  id: string;
  score: number | "N/A";
  size?: number;
}

const getColor = (score: number | "N/A") => {
  if (score === "N/A") return "#808080";
  if (score < 20) return "#FF4136";
  if (score < 40) return "#FFDC00";
  if (score < 60) return "#FF851B";
  if (score < 80) return "#2ECC40";
  return "#0074D9";
};

export function ScoreMarket({ id, score, size = 100 }: ScoreMarketProps) {
  const bgColor = useMemo(() => getColor(score), [score]);
  const gradientId = `scoreGradient-${id}`;

  return (
    <div className="absolute left-2 top-2 z-10" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 100 100">
        <defs>
          <radialGradient id={gradientId} cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor={bgColor} stopOpacity="1" />
            <stop offset="100%" stopColor={bgColor} stopOpacity="1" />
          </radialGradient>
        </defs>

        <circle cx="50" cy="50" r="48" fill="none" stroke="white" strokeWidth="4" />
        <circle cx="50" cy="50" r="44" fill={`url(#${gradientId})`} />
      </svg>

      <div
        className="absolute inset-0 flex items-center justify-center font-bold text-white"
        style={{ fontSize: `${size * 0.5}px` }}
      >
        {score === "N/A" ? "N/A" : `${score}`}
      </div>
    </div>
  );
}
