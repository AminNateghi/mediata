import { Movie } from "@/services/fetch-movies/fetch-movies-interface";
import { useFindMovieInTmdbById } from "@/services/fetch-movies/fetch-movies-service";
import { Empty } from "antd";
import { useEffect, useState } from "react";

interface Props {
  movie: Movie;
}

export const MovieCover = ({ movie }: Props) => {
  const { mutate: serviceMovie } = useFindMovieInTmdbById();
  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    if (movie?.tmdbId) {
      serviceMovie(movie.tmdbId, {
        onSuccess(data) {
          if (data)
            setImageUrl(
              "https://www.themoviedb.org/t/p/w188_and_h282_bestv2" +
                data.poster_path
            );
        },
      });
    }
  }, [movie]);

  return (
    <>
      {imageUrl ? (
        <img loading='lazy' src={imageUrl} />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 200,
            height: 300,
          }}
        >
          <Empty description="No Poster" />
        </div>
      )}
    </>
  );
};
