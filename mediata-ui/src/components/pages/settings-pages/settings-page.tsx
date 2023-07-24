import { useContext, useEffect, useState } from "react";
import { Button, Col, Input, List, Row, Space, Spin, Typography } from "antd";
import { DeleteOutlined, FolderOutlined, PlusCircleOutlined } from "@ant-design/icons";
import {
  useSettingsAddFolder,
  useSettingsDeleteFolder,
  useSettingsGetFolders,
} from "@/services/settings-service";
import { FetchMoviesContext } from "@/components/layouts/components/fetch-movies";
import { useFetchMovies } from "@/services/fetch-movies-service";

const { Text, Title } = Typography;

export const SettingsPages = () => {
  const [folder, setFolder] = useState<any>();
  const { setIsFetched } = useContext(FetchMoviesContext);
  const { data: viewSettings, isFetching } = useSettingsGetFolders();
  const { mutate: serviceAddFolder } = useSettingsAddFolder();
  const { mutate: serviceDeleteFolder } = useSettingsDeleteFolder();
  const { mutate: serviceFetchMovies, isLoading: isLoadingFetch } =
    useFetchMovies();

  useEffect(() => {
    setIsFetched(isLoadingFetch);
  }, [isLoadingFetch]);

  const handleAddFolder = () => {
    if (folder) {
      serviceAddFolder(folder);
      serviceFetchMovies(folder);
      setFolder("");
    }
  };

  const handleDeleteFolder = (folder: string) => {
    if (folder) {
      serviceDeleteFolder(folder);
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
              onPressEnter={() => handleAddFolder()}
            />
            <Button type='primary' onClick={() => handleAddFolder()} icon={<PlusCircleOutlined />}>Add to list</Button>
          </Space.Compact>
          <List bordered header={<Text strong>Selected folders:</Text>}>
            {isFetching ? (
              <Spin />
            ) : (
              viewSettings &&
              viewSettings.map((item: string) => (
                <List.Item
                  key={item}
                  actions={[
                    <Button
                      shape={"circle"}
                      onClick={() => handleDeleteFolder(item)}
                    >
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
