import React from "react";
import { SettingOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { DashboardIcon } from "../../icons";
import { Link } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "1",
    label: <Link to="/">Dashboard</Link>,
    icon: <DashboardIcon />,
  },
  {
    key: "sub4",
    label: "Pages",
    icon: <SettingOutlined />,
    children: [
      { key: "9", label: <Link to="/banner">Banner</Link> },
      { key: "11", label: <Link to="/service">Doctors</Link> },
      { key: "12", label: "Услуги" },
      { key: "13", label: "Врачи" },
    ],
  },
  {
    key: "3",
    label: <Link to="/categories">Category</Link>,
    icon:<DashboardIcon/>,
  }
];

const Sidebar: React.FC = () => {
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  return (
    <Menu
      onClick={onClick}
      className="w-64 flex flex-col gap-2 h-full"
      mode="inline"
      items={items}
    />
  );
};

export default Sidebar;
