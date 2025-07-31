import { PlusCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import AwardTable from "./components/AwardTable";
import AwardModal from "./components/AwardModal";
import { useState } from "react";

const AwardsPage = () => {
  const [open, setOpen] = useState(false);
  //   const [selectedAward, setSelectedAward] = useState(null);
  const { t } = useTranslation();
  return (
    <div>
      <div className="flex justify-between mb-4">
        <p className="text-3xl">{t("Awards")}</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex gap-2"
          onClick={() => {
            setOpen(true);
          }}
        >
          <PlusCircleOutlined /> Create new award
        </button>
      </div>
      <AwardModal
        open={open}
        onClose={() => {
          setOpen(false);
          //   setSelectedAward(null);
        }}
        // selectedAward={selectedAward}
      />
      <AwardTable />
    </div>
  );
};

export default AwardsPage;
