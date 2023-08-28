import { useGetGenresMovies } from "@/services/fetch-movies/fetch-movies-service";
import { BuildOutlined } from '@ant-design/icons';
import { Menu, MenuProps, Spin } from "antd";
import { useEffect, useState } from "react";

type MenuItem = Required<MenuProps>["items"][number];

export const GenresMovies = () => {
  const { data: genresData, isFetching } = useGetGenresMovies();
  const [list, setList] = useState<MenuProps["items"]>([]);

  useEffect(() => {
    if (genresData) {
      const subItems: MenuItem[] = [];
      genresData.genres.map((i) => subItems.push({ label: i.name, key: i.id }));
      const items: MenuProps["items"] = [
        getItem("Genres", "", <BuildOutlined />, subItems),
      ];

      setList(items);
    }
  }, [genresData]);

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  const handleClick = (value: any) => {
    console.log(value);
  };

  if (isFetching) return <Spin />;

  return (
    <Menu
      onClick={(value) => handleClick(value)}
      // style={{ width: 256 }}
      // defaultSelectedKeys={['1']}
      // defaultOpenKeys={['sub1']}
      mode="inline"
      items={list}
    />
  );
};
