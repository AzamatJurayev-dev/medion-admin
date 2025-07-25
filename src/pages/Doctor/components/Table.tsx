import { Modal, Table } from "antd";
import { getDoctorColumns } from "../constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteDoctor, getDoctors } from "../api";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import type { DoctorAttributes1 } from "../types";

const DoctorsTable = ({
  onEdit,
  onOpenModal,
}: {
  onEdit: (item: DoctorAttributes1) => void;
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
  const tableData = {
    data:
      data?.data.map((item) => ({
        id: item.id,
        ...item.attributes,
      })) ?? [],
  };
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
        navigate
      })}
      rowKey="id"
      size="small"
      dataSource={tableData.data}
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
        hideOnSinglePage: true,
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
