import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Modal, Table } from "antd";
import { useTranslation } from "react-i18next";
import { deleteReviews, getReviews, updateReviewsShow } from "../api";
import { getReviewsColumns } from "../constants";

const ReviewsTable = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: getReviews,
  });
  const tableData =
    data?.data.map((item) => ({
      id: item.id,
      ...item.attributes,
    })) ?? [];
  const deleteMutation = useMutation({
    mutationFn: deleteReviews,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
  const updateShow = useMutation({
    mutationFn: updateReviewsShow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] }); 
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
    <div>
      <Table
        dataSource={tableData}
        columns={getReviewsColumns(handleDeleteClick, t, updateShow.mutate)}
        loading={isLoading}
        rowKey="id"
        size="small"
      />
    </div>
  );
};

export default ReviewsTable;
