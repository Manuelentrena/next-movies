import { FC } from "react";

interface MovieDetailProps {
  params: {
    id: string;
  };
}

const MovieDetail: FC<MovieDetailProps> = ({ params }) => {
  const { id } = params;

  return (
    <div>
      <h1>Detalles de la Película</h1>
      <p>ID de la película: {id}</p>
    </div>
  );
};

export default MovieDetail;
