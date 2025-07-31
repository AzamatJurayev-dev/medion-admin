import { useState } from "react";
import { AppButton } from "../../components/ui/AppButton";
import type { PromoAttributsUpdate } from "./types";
import PromoTable from "./components/Table";
import PromoModal from "./components/ModalForm";

const PromotionsPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PromoAttributsUpdate | null>(
    null
  );
  return (
    <div>
      <div className="flex justify-between mb-4">
        <p className="text-3xl">Promotions</p>
        <AppButton
          onClick={() => {
            setOpenModal(true);
            setSelectedItem(null);
          }}
        >
          + Create new entry
        </AppButton>
      </div>
      <PromoTable
        onEdit={setSelectedItem}
        onOpenModal={() => setOpenModal(true)}
      />
      {openModal && (
        <PromoModal
          open={openModal}
          onClose={() => {
            setOpenModal(false);
            setSelectedItem(null);
          }}
          selectedItem={selectedItem}
        />
      )}
    </div>
  );
};
export default PromotionsPage;
