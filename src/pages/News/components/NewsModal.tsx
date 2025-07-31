import { Modal } from "antd";

const NewsModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <div>
      <Modal
        open={open}
        onCancel={onClose}
        footer={false}
        // className="w-fit"
      ></Modal>
    </div>
  );
};

export default NewsModal;
