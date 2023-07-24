import { HomeOutlined, SearchOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";

interface MenuType {
  key: string;
  label: string;
  link: string;
  icon?: React.ReactNode;
}

export const SiderMenu = () => {
  const navigate = useNavigate();
  type MenuItem = Required<MenuProps>["items"][number];

  const menu: MenuType[] = [
    { key: "1", label: "Home", link: "/", icon: <HomeOutlined /> },
    { key: "2", label: "Search", link: "/search", icon: <SearchOutlined /> },
  ];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode
  ): MenuItem {
    return {
      key,
      icon,
      label,
    } as MenuItem;
  }

  const items: MenuItem[] = menu.map((i) => {
    return getItem(i.label, i.key, i.icon);
  });

  const handleGoto = (key: string) => {
    const item = menu.find((i) => i?.key == key);
    navigate(item?.link!);
  };

  return (
    <>
      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
        onClick={(value) => handleGoto(value.key)}
      />
    </>
  );
};
