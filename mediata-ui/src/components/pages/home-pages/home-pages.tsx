import { Card, Empty, Row } from "antd";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { MovieCover } from "@/components/movie-cover/movie-cover";
import { GenresAtom } from "@/services/atoms/genres-atom";
import { dbTheMovieDb } from "@/services/fetch-movies/database";
import { Movie } from "@/services/fetch-movies/fetch-movies-interface";
import { useGetMovies } from "@/services/fetch-movies/fetch-movies-service";

export const HomePage = () => {
  const { data: movies } = useGetMovies();
  const [selectedGenre] = useAtom(GenresAtom);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  useEffect(() => {
    if (selectedGenre == 0) setFilteredMovies(movies!);
    else {
      const list: Movie[] = [];
      movies?.map((movie) => {
        const item = dbTheMovieDb.data.movies?.find(
          (i) => i.id == movie.tmdbId
        );
        if (item) {
          const movieItem = item.genre_ids.find((i) => i == selectedGenre);
          if (movieItem) list.push(movie);
        }
      });
      setFilteredMovies(list);
    }
  }, [selectedGenre]);

  return (
    <Row style={{ padding: "10px" }}>
      {filteredMovies.length > 0 ? (
        filteredMovies?.map((movie) => (
          <Card
            key={uuidv4()}
            hoverable
            style={{ width: 200, margin: 10 }}
            cover={<MovieCover movie={movie} />}
          >
            <Card.Meta title={movie.title} description={movie.year} />
          </Card>
        ))
      ) : (
        <Empty />
      )}
    </Row>
  );
};
