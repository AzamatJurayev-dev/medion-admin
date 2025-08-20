import { Table, Modal } from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { deletePromo, getPromos } from "../api";
import { getPromoColumns } from "../constants";
import type { PromoItem } from "../types";

const PromoTable = ({
  onEdit,
  onOpenModal,
}: {
  onEdit: (item: PromoItem) => void;
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

  const tableData = data?.data || [];

  return (
    <Table
      columns={getPromoColumns(onEdit, onOpenModal, handleDeleteClick, lang, t)}
      loading={isLoading}
      className="bg-white dark:bg-gray-800 transition-colors"
      dataSource={tableData}
      rowKey="id"
      pagination={{
        // current: page,
        // pageSize: pageSize,
        // total: data?.meta?.pagination?.total || 0,
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "20"],
        locale: { items_per_page: "/ 20" },
        showTotal: (total) => `Total: ${total}`,
        position: ["bottomCenter"],
        // showQuickJumper: true,
        // onChange: (page, pageSize) => {
        //   setPage(page);
        //   setPageSize(pageSize);
        // },
      }}
      scroll={{ x: "max-content" }}
    />
  );
};

export default PromoTable;
