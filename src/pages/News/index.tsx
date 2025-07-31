import { PlusCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import NewsModal from "./components/NewsModal";
import NewsTable from "./components/NewsTable";

const NewsPage = () => {
  const [open, setOpen] = useState(false);
  //   const [selectedAward, setSelectedAward] = useState(null);
  const { t } = useTranslation();
  return (
    <div>
      <div className="flex justify-between mb-4">
        <p className="text-3xl">{t("News")}</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex gap-2"
          onClick={() => {
            setOpen(true);
          }}
        >
          <PlusCircleOutlined /> Create new entry
        </button>
      </div>
      <NewsModal
        open={open}
        onClose={() => {
          setOpen(false);
          //   setSelectedAward(null);
        }}
        // selectedAward={selectedAward}
      />
      <NewsTable />
    </div>
  );
};

export default NewsPage;
