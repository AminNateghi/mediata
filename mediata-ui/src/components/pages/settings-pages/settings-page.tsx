import { useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  Empty,
  Input,
  List,
  Row,
  Space,
  Typography,
  notification,
} from "antd";
import {
  DeleteOutlined,
  FolderOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { FetchMoviesContext } from "@/components/layouts/components/fetch-movies";
import { useFetchMovies } from "@/services/fetch-movies/fetch-movies-service";
import {
  checkFolderIsDuplicate,
  useSettingsAddFolder,
  useSettingsDeleteFolder,
  useSettingsGetFolders,
} from "@/services/search-folder/settings-service";

const { Text, Title } = Typography;

export const SettingsPages = () => {
  const [folder, setFolder] = useState<any>();
  const { setIsFetched } = useContext(FetchMoviesContext);
  const { data: folders } = useSettingsGetFolders();
  const { mutate: serviceAddFolder } = useSettingsAddFolder();
  const { mutate: serviceDeleteFolder } = useSettingsDeleteFolder();
  const { mutate: serviceFetchMovies, isLoading: isLoadingFetch } =
    useFetchMovies();

  useEffect(() => {
    setIsFetched(isLoadingFetch);
  }, [isLoadingFetch]);

  const handleAddFolder = () => {
    if (folder) {
      if (checkFolderIsDuplicate(folder)) {
        notification.info({
          message: "This folder exists!",
          placement: "bottomRight",
        });
      } else {
        serviceAddFolder(folder);
        serviceFetchMovies(folder);
        setFolder("");
      }
    }
  };

  const handleDeleteFolder = (folder: string) => {
    if (folder) serviceDeleteFolder(folder);
  };

  const handleFetchNow = () => {
    if (folders) {
      folders.map((item: string) => {
        serviceFetchMovies(item);
      });
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
            <Button
              type="primary"
              onClick={() => handleAddFolder()}
              icon={<PlusCircleOutlined />}
            >
              Add to list
            </Button>
          </Space.Compact>
          <Space>
            <Button onClick={() => handleFetchNow()}>Fetch movies now</Button>
            <Button>Clear all</Button>
          </Space>
          <List
            bordered
            header={<Text strong>Selected folders:</Text>}
            style={{ minHeight: "100px" }}
          >
            {folders?.length == 0 ? (
              <Empty />
            ) : (
              <>
                {folders?.map((item: string) => (
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
                ))}
              </>
            )}
          </List>
        </Space>
      </Col>
    </Row>
  );
};
