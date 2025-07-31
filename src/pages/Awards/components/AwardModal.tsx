import { Modal } from "antd";
import AwardForm from "./AwardForm";

const AwardModal = ({
  open,
  onClose,
//   selectedAward,
//   setSelectedAward,
}: {
  open: boolean;
  onClose: () => void;
//   selectedAward: null;
//   setSelectedAward: () => void;
}) => {
  return (
    <div>
      <Modal
        open={open}
        onCancel={onClose}
        centered
        footer={false}
              title="Add New Award"
              className="w-fit"
      >
        <AwardForm />
      </Modal>
    </div>
  );
};

export default AwardModal;
