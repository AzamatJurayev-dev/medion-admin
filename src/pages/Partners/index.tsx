import { useState } from "react";
import { AppButton } from "../../components/ui/AppButton";
import PartnerModal from "./components/ModalForm";
import PartnerTable from "./components/Table";
import type { UpdatePartnerForm } from "./types/schema";

const Partner = () => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<UpdatePartnerForm | null>(
    null
  );
  return (
    <div>
      <div className="flex justify-between mb-4">
        <p className="text-3xl">Partner</p>
        <AppButton
          onClick={() => {
            setOpen(true);
            setSelectedItem(null);
          }}
        >
          + Create new banner
        </AppButton>
      </div>
      <PartnerTable
        onEdit={setSelectedItem}
        onOpenModal={() => setOpen(true)}
      />
      {open && (
        <PartnerModal
          open={open}
          onClose={() => {
            setOpen(false);
            setSelectedItem(null);
          }}
          selectedItem={selectedItem}
        />
      )}
    </div>
  );
};
export default Partner;
