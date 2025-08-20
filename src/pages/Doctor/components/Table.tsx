import { Modal, Table } from "antd";
import { getDoctorColumns } from "../constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteDoctor, getDoctors } from "../api";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import type { DoctorItem } from "../types";

const DoctorsTable = ({
  onEdit,
  onOpenModal,
}: {
  onEdit: (item: DoctorItem) => void;
  onOpenModal: () => void;
}) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "uz" | "en" | "ru";
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });
  const tableData = data?.data || [];
  const deleteMutation = useMutation({
    mutationFn: deleteDoctor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
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
      columns={getDoctorColumns({
        onDelete: handleDeleteClick,
        lang,
        t,
        onEdit,
        onOpenModal,
        navigate,
      })}
      rowKey="id"
      dataSource={tableData}
      className="bg-white dark:bg-gray-800 transition-colors"
      rowClassName={() =>
        "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      }
      loading={isLoading}
      scroll={{ x: "max-content" }}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "20"],
        showTotal: (total) => `Total: ${total}`,
        position: ["bottomCenter"],
        defaultCurrent: 1,
        defaultPageSize: 10,
        responsive: true,
        showLessItems: true,
        showQuickJumper: true,
        onChange: (page, pageSize) => {
          console.log(`Page: ${page}, Page Size: ${pageSize}`);
        },
        onShowSizeChange: (current, size) => {
          console.log(`Current: ${current}, Size: ${size}`);
        },
      }}
    />
  );
};

export default DoctorsTable;
