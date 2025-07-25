import { Modal, Table } from "antd";
import { getArticleColums } from "../constants";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteArticle, getArticles } from "../api";
import type { ArticleUpdate } from "../types";

const ArticleTable = ({
  onEdit,
  setModalOpen,
}: {
  onEdit: (item: ArticleUpdate) => void; 
  setModalOpen: () => void;
}) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "uz" | "en" | "ru";
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: getArticles,
  });
  const tableData = {
    data:
      data?.data.map((item) => ({
        id: item.id,
        ...item.attributes,
      })) ?? [],
  };
    const deleteMutation = useMutation({
      mutationFn: deleteArticle,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["articles"] });
      },
    });
    const handleDeleteClick = (id: number) => {
      Modal.confirm({
        title: "Rostdan ham o'chirmoqchimisiz?",
        content: "Bu amalni qaytarib bo'lmaydi.",
        okText: "Ha, o'chir",
        cancelText: "Bekor qilish",
        onOk: () => deleteMutation.mutate(id),
      });
    };
  return (
    <Table
      columns={getArticleColums(lang, t, onEdit, setModalOpen,handleDeleteClick)}
      rowKey="id"
      size="small"
      loading={isLoading}
      dataSource={tableData.data}
    />
  );
};

export default ArticleTable;
