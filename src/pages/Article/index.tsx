import ArticleTable from "./components/ArticleTable";
import ArticleModal from "./components/ArticleModal";
import { useState } from "react";
import type { ArticleItem } from "./types";
import HeaderComponents from "../../components/elements/HeaderComponents";
const Article = () => {
  const [open, setOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(
    null
  );
  return (
    <div>
      <HeaderComponents
        label="Articles"
        setOpenModal={() => setOpen(true)}
        setSelectedItem={setSelectedArticle}
      />
      {open && (
        <ArticleModal
          open={open}
          onClose={() => {
            setOpen(false);
            setSelectedArticle(null);
          }}
          selectedArticle={selectedArticle}
        />
      )}
      <ArticleTable
        onEdit={setSelectedArticle}
        setModalOpen={() => setOpen(true)}
      />
    </div>
  );
};

export default Article;
