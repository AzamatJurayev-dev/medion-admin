import { Table, Modal } from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import type { PromoAttributsUpdate } from "../types";
import { deletePromo, getPromos } from "../api";
import { getPromoColumns } from "../constants";

const PromoTable = ({
  onEdit,
  onOpenModal,
}: {
  onEdit: (item: PromoAttributsUpdate) => void;
  onOpenModal: () => void;
}) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "uz" | "en" | "ru";
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["banners"],
    queryFn: getPromos,
  });

  const deleteMutation = useMutation({
    mutationFn: deletePromo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
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

  const tableData =
    data?.data.map((item) => ({
      id: item.id,
      ...item.attributes,
    })) ?? [];

  return (
    <Table
      columns={getPromoColumns(onEdit, onOpenModal, handleDeleteClick, lang, t)}
      loading={isLoading}
      dataSource={tableData}
      rowKey="id"
      scroll={{ x: "max-content" }}
    />
  );
};

export default PromoTable;
