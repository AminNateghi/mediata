import { useState } from "react";
import { Button, Col, Input, List, Row, Space, Spin, Typography } from "antd";
import { storage } from "@neutralinojs/lib";
import { DeleteOutlined, FolderOutlined } from "@ant-design/icons";
import {
  useSettingsAddFolder,
  useSettingsGetFolders,
} from "@/services/settings-service";

const { Text, Title } = Typography;

export const SettingsPages = () => {
  const [folder, setFolder] = useState<any>();
  const { data: viewSettings, isFetching } = useSettingsGetFolders();
  const { mutate: serviceAddFolder } = useSettingsAddFolder();

  const handleAddFolder = () => {
    if (folder) {
      serviceAddFolder(folder);
      setFolder("");
    }
  };

  return (
    <Row>
      <Col span={12} offset={6}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Title level={3}>Settings</Title>
          <Text>Select a folder for search movies:</Text>
          <Space.Compact style={{ width: "100%" }}>
            <Input
              placeholder="Enter folder"
              value={folder}
              onChange={(value) => setFolder(value.target.value)}
            />
            <Button onClick={() => handleAddFolder()}>Add to list</Button>
          </Space.Compact>
          <Button onClick={() => storage.setData("folders", "")}>Clear</Button>
          <List bordered header={<Text strong>Selected folders:</Text>}>
            {isFetching ? (
              <Spin />
            ) : (
              viewSettings &&
              viewSettings.map((item: string) => (
                <List.Item
                  key={item}
                  actions={[
                    <Button shape={"circle"}>
                      <DeleteOutlined />
                    </Button>,
                  ]}
                >
                  <List.Item.Meta avatar={<FolderOutlined />} title={item} />
                </List.Item>
              ))
            )}
          </List>
        </Space>
      </Col>
    </Row>
  );
};
