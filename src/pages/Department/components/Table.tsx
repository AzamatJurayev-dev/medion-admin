import { Modal, Table } from "antd";
import { getDepartmentColums } from "../constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteDepartments } from "../api";
import { getDepartments } from "../../../api";
import { useTranslation } from "react-i18next";
import type { DepartmentItem } from "../types";

const DepartmentTable = ({
  onEdit,
  onOpenModal,
}: {
  onEdit: (item: DepartmentItem) => void;
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
  const tableData = data?.data || [];
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
      className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      rowKey="id"
      rowClassName={() =>
        "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      }
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

export default DepartmentTable;
