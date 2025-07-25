import { useState } from "react";
import ModalForm from "./components/Modal";
import DoctorsTable from "./components/Table";
import { useTranslation } from "react-i18next";
import type { DoctorAttributes1 } from "./types";

const DoctorsPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DoctorAttributes1 | null>(
    null
  );
  const { t } = useTranslation();
  return (
    <div>
      <div className="flex justify-between mb-4">
        <p className="text-3xl">{t("Doctors")}</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={() => {
            setOpen(true);
          }}
        >
          + Create new doctor
        </button>
      </div>

      <div>
        {open && (
          <ModalForm
            open={open}
            onClose={() => {
              setSelectedItem(null);
              setOpen(false);
            }}
            selectedItem={selectedItem}
          />
        )}
        <DoctorsTable
          onEdit={setSelectedItem}
          onOpenModal={() => setOpen(true)}
        />
      </div>
    </div>
  );
};

export default DoctorsPage;
