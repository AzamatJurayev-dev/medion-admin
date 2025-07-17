import { useState } from "react";
import { AppButton } from "../../components/ui/AppButton";
import type { CategoryType } from "../../types";
import CategoryTable from "./Table";
import ModalForm from "./ModalForm";



const BannerPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CategoryType | null>(null);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <p className="text-3xl">Banner</p>
        <AppButton
          onClick={() => {
            setSelectedItem(null);
            setOpenModal(true);
          }}
        >
          + Create new banner
        </AppButton>
      </div>

      <CategoryTable
        onEdit={setSelectedItem}
        onOpenModal={() => setOpenModal(true)}
      />

      <ModalForm
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedItem(null);
        }}
        selectedItem={selectedItem}
      />
    </div>
  );
};

export default BannerPage;
