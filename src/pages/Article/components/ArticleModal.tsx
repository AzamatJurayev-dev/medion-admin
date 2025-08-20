import { Modal } from "antd";
import ArticleForm from "./ArticleForm";
import type { ArticleItem } from "../types";

const ArticleModal = ({
  open,
  onClose,
  selectedArticle,
}: {
  open: boolean;
  onClose: () => void;
  selectedArticle: null | ArticleItem;
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
