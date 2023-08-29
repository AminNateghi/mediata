import { Menu, MenuProps, Spin } from "antd";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { GenresAtom } from "@/services/atoms/genres-atom";
import { useGetGenresMovies } from "@/services/fetch-movies/fetch-movies-service";
import { BuildOutlined, GroupOutlined } from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];

export const GenresMovies = () => {
  const { data: genresData, isFetching } = useGetGenresMovies();
  const [list, setList] = useState<MenuProps["items"]>([]);
  const [, setGenre] = useAtom(GenresAtom);

  useEffect(() => {
    if (genresData) {
      const subItems: MenuItem[] = [];
      subItems.push({ key: 0, label: "ALL", icon: <GroupOutlined /> });
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
    setGenre(value.key);
  };

  if (isFetching) return <Spin />;

  return (
    <Menu
      onClick={(value) => handleClick(value)}
      defaultSelectedKeys={["0"]}
      mode="inline"
      items={list}
    />
  );
};
