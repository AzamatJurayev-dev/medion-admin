import { Dropdown, Space, type MenuProps } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import ThemeToggle from "../ui/ThemeSwitch";
const Haeder = () => {
  const { i18n } = useTranslation();

  const items: MenuProps["items"] = [
    {
      label: "Uz",
      key: "uz",
    },
    {
      label: "Ru",
      key: "ru",
    },
    {
      label: "En",
      key: "en",
    },
  ];
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    i18n.changeLanguage(e.key);
  };
  return (
    <div className="flex justify-end items-center h-16 px-5 py-3  overflow-hidden sticky top-0 before:absolute before:inset-0 before:backdrop-blur-md max-lg:before:bg-white/90 dark:max-lg:before:bg-gray-800/90 before:-z-10 z-30 lg:border-b border-gray-200 dark:border-gray-700/60">
      <div className="flex items-center gap-4 mr-4">
        <ThemeToggle />
        <Dropdown
          menu={{ items, onClick: handleMenuClick }}
          trigger={["click"]}
        >
          <Space onClick={(e) => e.preventDefault()}>
            <GlobalOutlined />
            {i18n.language.toUpperCase()}
          </Space>
        </Dropdown>
        <div className="size-10 rounded-full bg-gray-200 flex items-center justify-center"></div>
      </div>
    </div>
  );
};

export default Haeder;
