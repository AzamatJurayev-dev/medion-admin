import React from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { DashboardIcon } from "../../icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

type MenuItem = Required<MenuProps>["items"][number];

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const items: MenuItem[] = [
    {
      key: "Pages",
      label: "Pages",
      icon: <DashboardIcon />,
      children: [
        {
          key: "/departments",
          label: t("Departments"),
        },
        {
          key: "/doctors",
          label: t("Doctors"),
        },
        {
          key: "/news",
          label: t("News"),
        },
        {
          key: "/awards",
          label: t("Awards"),
        },
        {
          key: "/service",
          label: t("Service"),
        },
        {
          key: "/service",
          label: t("About health"),
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
          key: "Наша деятельность",
          label: "Наша деятельность",
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
          key: "Статьи",
          label: "Статьи",
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
          key: "Награды",
          label: "Награды",
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
      icon: <DashboardIcon />,
      children: [
        {
          key: "/Отзывы",
          label: t("Отзывы"),
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
      key: "Service",
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
        className="w-64 flex flex-col gap-2 h-auto overflow-y-scroll"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={items}
      />
    </div>
  );
};

export default Sidebar;
