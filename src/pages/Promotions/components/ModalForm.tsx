import { Modal } from "antd";
import type { PromoAttributsUpdate } from "../types";
import PromoForm from "./PromoForm";

const PromoModal = ({
  open,
  onClose,
  selectedItem,
}: {
  open: boolean;
  onClose: () => void;
  selectedItem: PromoAttributsUpdate | null;
}) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={false}
      title={selectedItem ? "Update Promotion" : "Add new Promotion"}
      centered
      className="w-fit h-fit"
    >
      <PromoForm selectedItem={selectedItem} onClose={onClose} />
    </Modal>
  );
};

export default PromoModal;
