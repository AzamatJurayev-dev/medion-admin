import { Table, Modal } from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBannerColumns } from "../constants";
import { useTranslation } from "react-i18next";
import { deleteService, getServices } from "../api";
import type { ServiceAttributsUpdate } from "../types";

const ServiceTable = ({
  onEdit,
  onOpenModal,
}: {
  onEdit: (item: ServiceAttributsUpdate) => void;
  onOpenModal: () => void;
}) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "uz" | "en" | "ru";
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });
  const deleteMutation = useMutation({
    mutationFn: deleteService,
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
      columns={getBannerColumns(
        onEdit,
        onOpenModal,
        handleDeleteClick,
        lang,
        t
      )}
      loading={isLoading}
      dataSource={tableData}
      rowKey="id"
      scroll={{ x: "max-content" }}
    />
  );
};

export default ServiceTable;
