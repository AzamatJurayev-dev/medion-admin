import { useState } from "react";
import ServiceTable from "./components/Table";
import ServiceModal from "./components/ModalForm";
import HeaderComponents from "../../components/elements/HeaderComponents";
import type { ServiceItem } from "./types";

const ServicePage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] =
    useState<ServiceItem | null>(null);
  return (
    <div>
      <HeaderComponents
        label="Service"
        setOpenModal={() => setOpenModal(true)}
        setSelectedItem={setSelectedItem}
      />
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
