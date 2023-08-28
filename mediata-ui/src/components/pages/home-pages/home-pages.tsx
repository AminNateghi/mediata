import { MovieCover } from "@/components/movie-cover/movie-cover";
import { useGetMovies } from "@/services/fetch-movies/fetch-movies-service";
import { Card, Row, Space } from "antd";
const { Meta } = Card;

interface Movies {
  id: string;
  title: string;
  image: string;
  rate: number;
  isFavorite?: boolean;
}

export const HomePage = () => {
  const { data: movies } = useGetMovies();

  return (
    <Row style={{ padding: "10px" }}>
      {movies?.map((movie) => (
        <Card
          key={movie.title}
          hoverable
          style={{ width: 200, margin: 10 }}
          cover={<MovieCover movie={movie} />}
        >
          <Meta title={movie.title} description={movie.year} />
        </Card>
      ))}
    </Row>
  );
};
