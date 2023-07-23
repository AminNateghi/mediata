import { BulbFilled, BulbOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Col, Row, Typography } from "antd";

interface Props {
  isDark: boolean;
  setIsDark: (status: boolean) => void;
}

export const HeaderMenu = ({ isDark, setIsDark }: Props) => {
  return (
    <>
      <Col flex={"auto"}>
        <Button shape={"circle"}><LeftOutlined /></Button>
        <Button shape={"circle"}><RightOutlined /></Button>
      </Col>
      <Col>
        <Button shape={"circle"} onClick={() => setIsDark(!isDark)}>
          {isDark ? <BulbOutlined /> : <BulbFilled />}
        </Button>
      </Col>
    </>
  );
};
