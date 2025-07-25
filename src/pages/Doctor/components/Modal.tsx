import { Modal } from "antd";
import DoctorForm from "./Form";
import type { DoctorAttributes1 } from "../types";

const ModalForm = ({
  open,
  onClose,
  selectedItem,
}: {
  open: boolean;
  onClose: () => void;
  selectedItem: DoctorAttributes1 | null;
}) => {
  return (
    <Modal
      title="Add new Doctor"
      open={open}
      onCancel={onClose}
      footer={false}
      centered
      className="w-[1200px]"
    >
      <DoctorForm onClose={onClose} selectedItem={selectedItem} />
    </Modal>
  );
};

export default ModalForm;
