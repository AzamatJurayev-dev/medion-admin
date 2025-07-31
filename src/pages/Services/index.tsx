import { useState } from "react";
import { AppButton } from "../../components/ui/AppButton";
import type { ServiceAttributsUpdate } from "./types";
import ServiceTable from "./components/Table";
import ServiceModal from "./components/ModalForm";

const ServicePage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] =
    useState<ServiceAttributsUpdate | null>(null);
  return (
    <div>
      <div className="flex justify-between mb-4">
        <p className="text-3xl">Service</p>
        <AppButton
          onClick={() => {
            setOpenModal(true);
            setSelectedItem(null);
          }}
        >
          + Create new entry
        </AppButton>
      </div>
      <ServiceTable
        onEdit={setSelectedItem}
        onOpenModal={() => setOpenModal(true)}
      />
      {openModal && (
        <ServiceModal
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
export default ServicePage;
