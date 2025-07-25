import { Dropdown, Input, Space, type MenuProps } from "antd";
import { DownOutlined, GlobalOutlined } from "@ant-design/icons";
import logo from "../../../public/logo.svg";
import { DashboardIcon } from "../../icons";
import { useTranslation } from "react-i18next";
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
    <div className="flex justify-between items-center px-5 py-3 border-b border-gray-200 ">
      <div className="flex items-center gap-8">
        <img src={logo} alt="" />
        <Input className="h-11 w-[400px]" />
      </div>
      <div className="flex items-center gap-4 mr-4">
        <DashboardIcon />
        <div className="size-10 rounded-full bg-gray-200 flex items-center justify-center"></div>
        <Dropdown
          menu={{ items, onClick: handleMenuClick }}
          trigger={["click"]}
        >
          <Space onClick={(e) => e.preventDefault()}>
            <GlobalOutlined />
            {i18n.language.toUpperCase()}
            <DownOutlined />
          </Space>
        </Dropdown>
      </div>
    </div>
  );
};

export default Haeder;
