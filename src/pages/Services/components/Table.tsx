import { Table, Modal } from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBannerColumns } from "../constants";
import { useTranslation } from "react-i18next";
import { deleteService, getServices } from "../api";
import { useState } from "react";
import type { ServiceItem } from "../types";

const ServiceTable = ({
  onEdit,
  onOpenModal,
}: {
  onEdit: (item: ServiceItem) => void;
  onOpenModal: () => void;
}) => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "uz" | "en" | "ru";
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["services", { page, pageSize }],
    queryFn: () => getServices({ page, pageSize }),
  });
  const deleteMutation = useMutation({
    mutationFn: deleteService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
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
      columns={getBannerColumns(
        onEdit,
        onOpenModal,
        handleDeleteClick,
        lang,
        t
      )}
      loading={isLoading}
      dataSource={tableData}
      className="bg-white dark:bg-gray-800 transition-colors"
      rowKey="id"
      rowClassName={() =>
        "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      }
      pagination={{
        current: page,
        pageSize: pageSize,
        total: data?.meta?.pagination?.total || 0,
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "20"],
        locale: { items_per_page: "/ 20" },
        showTotal: (total) => `Total: ${total}`,
        position: ["bottomCenter"],
        // showQuickJumper: true,
        onChange: (page, pageSize) => {
          setPage(page);
          setPageSize(pageSize);
        },
      }}
      scroll={{ x: "max-content" }}
    />
  );
};

export default ServiceTable;
