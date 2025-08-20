import { useState } from "react";
import { Button, Menu } from "antd";
import type { MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  AliwangwangOutlined,
  DashboardOutlined,
  FolderOpenFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import clsx from "clsx";
import { DashboardIcon } from "../../icons";

type MenuItem = Required<MenuProps>["items"][number];

const Sidebar = () => {
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
        { key: "/departments", label: t("Departments") },
        { key: "/services", label: t("Services") },
        { key: "/doctors", label: t("Doctors") },
        { key: "/health", label: t("About health") },
        { key: "/news", label: t("News") },
        { key: "/promotions", label: t("Promotions") },
      ],
    },
    {
      key: "company",
      label: "Company",
      icon: <DashboardIcon />,
      children: [
        { key: "company-info", label: "Company info" },
        { key: "activity", label: t("Our activity") },
        { key: "Команда", label: "Команда" },
        { key: "Обучение", label: "Обучение" },
        { key: "/articles", label: t("Articles") },
        { key: "/partners", label: t("Partners") },
        { key: "Оборудование", label: "Оборудование" },
        { key: "/awards", label: t("Awards") },
        { key: "Карьера", label: "Карьера" },
      ],
    },
    {
      key: "other",
      label: "Other",
      icon: <AliwangwangOutlined className="text-xl" />,
      children: [
        { key: "/reviews", label: t("Reviews") },
        { key: "/Check-up", label: t("Check-up") },
        { key: "/Программа лояльности", label: t("Программа лояльности") },
        { key: "/Лечение в рассрочку", label: t("Лечение в рассрочку") },
        {
          key: "/Для корпоративных клиентов",
          label: t("Для корпоративных клиентов"),
        },
        { key: "/Лечение по ФМС", label: t("Лечение по ФМС ") },
        { key: "/Лечение по ДМС", label: t("Лечение по ДМС ") },
        { key: "/Медтуризм", label: t("Медтуризм") },
      ],
    },
    {
      key: "",
      label: "Service",
      icon: <DashboardIcon />,
      children: [
        { key: "/", label: t("Banner") },
        { key: "/gallery", label: "Gallery" },
        { key: "/address", label: "Address" },
      ],
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };

  // localStorage'dan boshlang‘ich qiymatni olish
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    return saved ? JSON.parse(saved) : false;
  });

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const newValue = !prev;
      localStorage.setItem("sidebar-collapsed", JSON.stringify(newValue));
      return newValue;
    });
  };

  return (
    <div
      className={clsx(
        "flex flex-col bg-white dark:bg-gray-800 overflow-y-scroll lg:overflow-y-auto no-scrollbar rounded-r-2xl",
        collapsed ? "w-fit items-center" : "w-64",
        "transition-all duration-300 ease-in-out"
      )}
    >
      <Menu
        onClick={onClick}
        inlineCollapsed={collapsed}
        className="flex flex-col gap-2 border-none bg-white dark:bg-gray-800 duration-300"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={items}
      />
      <Button
        type="primary"
        onClick={toggleCollapsed}
        className={collapsed ? "w-fit" : "w-fit ml-4"}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
    </div>
  );
};

export default Sidebar;
