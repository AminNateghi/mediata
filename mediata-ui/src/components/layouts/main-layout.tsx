import { useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import { ConfigProvider, Layout, Row, theme } from "antd";
import { SiderMenu } from "./components/slider-menu";
import { HeaderMenu } from "./components/header-menu";
import { FetchMovies, FetchMoviesContext } from "./components/fetch-movies";
import styles from "./main-layout.module.scss";

const { defaultAlgorithm, darkAlgorithm } = theme;
const { Sider, Content } = Layout;

export const MainLayout = () => {
  const [fetched, setFetched] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  document.body.style.backgroundColor = isDarkMode ? "#121212" : "#e2e2e2";
  const value = useMemo(() => ({ fetched, setFetched }), [fetched]);

  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        }}
      >
        <FetchMoviesContext.Provider
          value={{ isFetched: value.fetched, setIsFetched: value.setFetched }}
        >
          <Layout>
            <Sider theme="light">
              <SiderMenu />
            </Sider>
            <Layout>
              <Row align={"middle"} className={styles.headerStyle}>
                <HeaderMenu
                  isDark={isDarkMode}
                  setIsDark={(value) => setIsDarkMode(value)}
                />
              </Row>
              <Content className={styles.content}>
                <Outlet />
              </Content>
            </Layout>
            <FetchMovies />
          </Layout>
        </FetchMoviesContext.Provider>
      </ConfigProvider>
    </>
  );
};
