import { ConfigProvider, Layout, Row, theme } from "antd";
import { Outlet } from "react-router-dom";
import { SiderMenu } from "./components/slider-menu";
import { HeaderMenu } from "./components/header-menu";
import { useState } from "react";
import styles from "./main-layout.module.scss";

const { defaultAlgorithm, darkAlgorithm } = theme;
const { Sider, Content } = Layout;

export const MainLayout = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  document.body.style.backgroundColor = isDarkMode ? "#121212" : "#e2e2e2";

  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        }}
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
            <Content>
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    </>
  );
};
