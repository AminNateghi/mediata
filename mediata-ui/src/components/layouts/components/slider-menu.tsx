import { HomeOutlined, SearchOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";

export const SiderMenu = () => {
  type MenuItem = Required<MenuProps>["items"][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem("Home", "1", <HomeOutlined />),
    getItem("Search", "2", <SearchOutlined />),
  ];

  return (
    <>
      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
      />
    </>
  );
};
