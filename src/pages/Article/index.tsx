import { useTranslation } from "react-i18next";
import ArticleTable from "./components/ArticleTable";
import ArticleModal from "./components/ArticleModal";
import { useState } from "react";
import type { ArticleUpdate } from "./types";
const Article = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<ArticleUpdate | null>(
    null
  );
  return (
    <div>
      <div className="flex justify-between mb-4">
        <p className="text-3xl">{t("Articles")}</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={() => {
            setOpen(true);
            setSelectedArticle(null);
          }}
        >
          + Create new doctor
        </button>
      </div>
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
