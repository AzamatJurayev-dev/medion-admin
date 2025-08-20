import { Table, Modal } from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBanners, deleteBanner } from "../api";
import type { UpdateBannerForm } from "../types/schema";
import { getBannerColumns } from "../constants";
import useLang from "../../../utils/useLang";

const BannerTable = ({
  onEdit,
  onOpenModal,
}: {
  onEdit: (item: UpdateBannerForm) => void;
  onOpenModal: () => void;
}) => {
  const { lang, t } = useLang();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["banners"],
    queryFn: getBanners,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBanner,
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

export default BannerTable;
