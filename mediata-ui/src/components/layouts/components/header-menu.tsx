import {
  BulbFilled,
  BulbOutlined,
  LeftOutlined,
  RightOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Col, Space } from "antd";
import { useNavigate } from "react-router-dom";

interface Props {
  isDark: boolean;
  setIsDark: (status: boolean) => void;
}

export const HeaderMenu = ({ isDark, setIsDark }: Props) => {
  const navigate = useNavigate();

  return (
    <>
      <Col flex={"auto"}>
        <Space>
          <Button shape={"circle"} onClick={() => navigate(-1)}>
            <LeftOutlined />
          </Button>
          <Button shape={"circle"} onClick={() => navigate(1)}>
            <RightOutlined />
          </Button>
        </Space>
      </Col>
      <Col>
        <Space>
          <Button shape={"circle"} onClick={() => setIsDark(!isDark)}>
            {isDark ? <BulbOutlined /> : <BulbFilled />}
          </Button>
          <Button shape={"circle"} onClick={() => navigate("/settings")}>
            <SettingOutlined />
          </Button>
        </Space>
      </Col>
    </>
  );
};
