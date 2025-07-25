import { Modal } from "antd";
import type { ArticleUpdate } from "../types";
import ArticleForm from "./ArticleForm";

const ArticleModal = ({
  open,
  onClose,
  selectedArticle,
}: {
  open: boolean;
  onClose: () => void;
  selectedArticle: null | ArticleUpdate;
}) => {
  return (
    <Modal
      title="Add new Article"
      open={open}
      onCancel={onClose}
      footer={false}
      centered
      className="w-[1200px]"
    >
      <ArticleForm selectedArticle={selectedArticle} onClose={onClose} />
    </Modal>
  );
};

export default ArticleModal;
