import { Modal, Table } from "antd";
import { getDepartmentColums } from "../constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteDepartments } from "../api";
import type { UpdateDepartmentForm } from "../types/schema";
import { getDepartments } from "../../../api";
import { useTranslation } from "react-i18next";

const DepartmentTable = ({
  onEdit,
  onOpenModal,
}: {
  onEdit: (item: UpdateDepartmentForm) => void;
  onOpenModal: () => void;
}) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "uz" | "en" | "ru";
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["departments"],
    queryFn: getDepartments,
  });
  const deleteDepartment = useMutation({
    mutationFn: deleteDepartments,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
  const handleDeleteClick = (id: number) => {
    Modal.confirm({
      title: "Rostdan ham o'chirmoqchimisiz?",
      content: "Bu amalni qaytarib bo'lmaydi.",
      okText: "Ha, o'chir",
      cancelText: "Bekor qilish",
      onOk: () => deleteDepartment.mutate(id),
    });
  };
  const tableData =
    data?.data.map((item) => ({
      id: item.id,
      ...item.attributes,
    })) ?? [];
  return (
    <Table
      columns={getDepartmentColums(
        onEdit,
        onOpenModal,
        handleDeleteClick,
        lang,
        t
      )}
      dataSource={tableData}
      loading={isLoading}
      rowKey="id"
      size="middle"
      scroll={{ x: "max-content" }}
    />
  );
};

export default DepartmentTable;
