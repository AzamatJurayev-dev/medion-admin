import { useState } from "react";
import PromoTable from "./components/Table";
import PromoModal from "./components/ModalForm";
import type { PromoItem } from "./types";
import HeaderComponents from "../../components/elements/HeaderComponents";

const PromotionsPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PromoItem | null>(null);
  return (
    <div>
      <HeaderComponents
        label="Promotions"
        setOpenModal={() => setOpenModal(true)}
        setSelectedItem={setSelectedItem}
      />
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
