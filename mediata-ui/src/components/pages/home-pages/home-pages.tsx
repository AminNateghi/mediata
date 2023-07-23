import { Card, Col, Row, Space, Typography } from "antd";
// const { Text, Link } = Typography;
const { Meta } = Card;

interface Movies {
  id: string;
  title: string;
  image: string;
  rate: number;
  isFavorite?: boolean;
}

export const HomePage = () => {
  const fakeList: Movies[] = [
    {
      id: "1",
      title: "Sound of Freedom",
      image: "",
      rate: 4.1,
      isFavorite: true,
    },
    { id: "2", title: "Bullet Train", image: "", rate: 4.2 },
    { id: "3", title: "Coda", image: "", rate: 4.3 },
    { id: "4", title: "Dune", image: "", rate: 4.4, isFavorite: true },
    {
      id: "5",
      title: "Everything Everywhere All At Once",
      image: "",
      rate: 4.5,
    },
  ];
  return (
    <Row>
      <Space>
        {fakeList.map((item) => (
          <Card
            key={item.id}
            hoverable
            style={{ width: 180 }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Meta title={item.title} description="www.instagram.com" />
          </Card>
        ))}
      </Space>
    </Row>
  );
};
