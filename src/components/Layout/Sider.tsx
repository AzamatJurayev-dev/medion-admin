import React from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { DashboardIcon } from "../../icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  AliwangwangOutlined,
  DashboardOutlined,
  FolderOpenFilled,
} from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const items: MenuItem[] = [
    {
      key: "Dashboard",
      label: "Dashboard",
      icon: <DashboardOutlined className="text-xl" />,
    },
    {
      key: "Pages",
      label: "Pages",
      icon: <FolderOpenFilled className="text-xl" />,
      children: [
        {
          key: "/departments",
          label: t("Departments"),
        },
        {
          key: "/services",
          label: t("Services"),
        },
        {
          key: "/doctors",
          label: t("Doctors"),
        },
        {
          key: "/health",
          label: t("About health"),
        },
        {
          key: "/news",
          label: t("News"),
        },
        {
          key: "/promotions",
          label: t("Promotions"),
        },
      ],
    },
    {
      key: "company",
      label: "Company",
      icon: <DashboardIcon />,
      children: [
        {
          key: "company-info",
          label: "Company info",
        },
        {
          key: "activity",
          label: t("Our activity"),
        },
        {
          key: "Команда",
          label: "Команда",
        },
        {
          key: "Обучение",
          label: "Обучение",
        },
        {
          key: "/articles",
          label: t("Articles"),
        },
        {
          key: "/partners",
          label: t("Partners"),
        },
        {
          key: "Оборудование",
          label: "Оборудование",
        },
        {
          key: "/awards",
          label: t("Awards"),
        },
        {
          key: "Карьера",
          label: "Карьера",
        },
      ],
    },
    {
      key: "other",
      label: "Other",
      icon: <AliwangwangOutlined className="text-xl" />,
      children: [
        {
          key: "/reviews",
          label: t("Reviews"),
        },
        {
          key: "/Check-up",
          label: t("Check-up"),
        },
        {
          key: "/Программа лояльности",
          label: t("Программа лояльности"),
        },
        {
          key: "/Лечение в рассрочку",
          label: t("Лечение в рассрочку"),
        },
        {
          key: "/Для корпоративных клиентов",
          label: t("Для корпоративных клиентов"),
        },
        {
          key: "/Лечение по ФМС",
          label: t("Лечение по ФМС "),
        },
        {
          key: "/Лечение по ДМС",
          label: t("Лечение по ДМС "),
        },
        {
          key: "/Медтуризм",
          label: t("Медтуризм"),
        },
      ],
    },
    {
      key: "",
      label: "Service",
      icon: <DashboardIcon />,
      children: [
        {
          key: "/",
          label: t("Banner"),
        },
        {
          key: "/gallery",
          label: "Gallery",
        },
      ],
    },
  ];
  const onClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };

  return (
    <div className=" overflow-y-auto custom-scroll">
      <Menu
        onClick={onClick}
        className="w-64 flex flex-col gap-2 h-auto"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={items}
      />
    </div>
  );
};

export default Sidebar;
