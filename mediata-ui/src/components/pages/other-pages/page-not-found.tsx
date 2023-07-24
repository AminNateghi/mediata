import { Button, Row, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
export const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <Row
        align={"middle"}
        justify={"center"}
        gutter={[12, 12]}
        style={{ height: 300, flexDirection: "column" }}
      >
        <Title level={3}>Page not found!</Title>
        <Button onClick={() => navigate("/")}>Back to home</Button>
      </Row>
    </>
  );
};
