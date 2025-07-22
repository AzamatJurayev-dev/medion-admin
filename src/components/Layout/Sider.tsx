import React from "react";
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
    key: "3",
    label: <Link to="/categories">Category</Link>,
    icon:<DashboardIcon/>,
  },
  {
    key: "4",
    label: <Link to="/partners">Partners</Link>,
    icon: <DashboardIcon />,
  },
];

const Sidebar: React.FC = () => {
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  return (
    <Menu
      onClick={onClick}
      className="w-64 flex flex-col gap-2 h-full "
      mode="inline"
      items={items}
    />
  );
};

export default Sidebar;
