import { Modal } from "antd";
import PromoForm from "./PromoForm";
import type { PromoItem } from "../types";

const PromoModal = ({
  open,
  onClose,
  selectedItem,
}: {
  open: boolean;
  onClose: () => void;
  selectedItem: PromoItem | null;
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
