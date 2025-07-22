import { useState } from "react";
import { AppButton } from "../../components/ui/AppButton";
import BannerModal from "./components/ModalForm";
import BannerTable from "./components/Table";
import type { UpdateBannerForm } from "./types/schema";

const Banner = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<UpdateBannerForm | null>(null);
  return (
    <div>
      <div className="flex justify-between mb-4">
        <p className="text-3xl">Banner</p>
        <AppButton
          onClick={() => {
            setOpenModal(true);
            setSelectedItem(null);
          }}
        >
          + Create new banner
        </AppButton>
      </div>
      <BannerTable
        onEdit={setSelectedItem}
        onOpenModal={() => setOpenModal(true)}
      />
      <BannerModal
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
export default Banner;
