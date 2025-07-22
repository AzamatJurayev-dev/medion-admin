/* eslint-disable @typescript-eslint/no-explicit-any */
import { Image, Modal, Table } from "antd";
import { imageUrlGenerator } from "../../../utils/ImageUrlGenerate";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteBanner, getBanners } from "../api";
import type { UpdateBannerForm } from "../types/schema";
import type { ColumnsType } from "antd/es/table";
import type { BannerAttributs } from "../types";

const BannerTable = ({
  onEdit,
  onOpenModal,
}: {
  onEdit: (item: UpdateBannerForm) => void;
  onOpenModal: () => void;
}) => {
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

  const renderTruncatedColumn = () => (text: string) =>
    (
      <div
        className="text-sm overflow-ellipsis max-w-40 line-clamp-1"
        title={text}
      >
        {text}
      </div>
    );

  const handleDeleteClick = (id: number) => {
    Modal.confirm({
      title: "Rostdan ham o'chirmoqchimisiz?",
      content: "Bu amalni qaytarib bo'lmaydi.",
      okText: "Ha, o'chir",
      cancelText: "Bekor qilish",
      onOk: () => deleteMutation.mutate(id),
    });
  };

  const TextareaStyle = "text-sm max-w-40 overflow-ellipsis line-clamp-2";
  const columns: ColumnsType<BannerAttributs> = [
    {
      title: "Title (UZ)",
      dataIndex: "titleUz",
      render: renderTruncatedColumn(),
    },
    {
      title: "Title (EN)",
      dataIndex: "titleEn",
      render: renderTruncatedColumn(),
    },
    {
      title: "Title (RU)",
      dataIndex: "titleRu",
      render: renderTruncatedColumn(),
    },
    {
      title: "Description (UZ)",
      dataIndex: "descriptionUz",
      render: (value: string) => (
        <p
          dangerouslySetInnerHTML={{ __html: value }}
          className={TextareaStyle}
        />
      ),
    },
    {
      title: "Description (EN)",
      dataIndex: "descriptionEn",
      render: (value: string) => (
        <p
          dangerouslySetInnerHTML={{ __html: value }}
          className={TextareaStyle}
        />
      ),
    },
    {
      title: "Description (RU)",
      dataIndex: "descriptionRu",
      render: (value: string) => (
        <p
          dangerouslySetInnerHTML={{ __html: value }}
          className={TextareaStyle}
        />
      ),
    },
    {
      title: "Cover Image",
      dataIndex: "coverImage",
      render: (_: any, record) => (
        <div className="size-12 justify-center items-center flex rounded-full border border-gray-200 overflow-hidden">
          <Image
            className="object-cover size-12"
            src={imageUrlGenerator(record.coverImage?.data?.attributes?.url)}
            alt="cover"
          />
        </div>
      ),
    },
    {
      title: "Actions",
      fixed: "right",
      width: 150,
      render: (_: any, record: any) => (
        <div className="flex gap-2">
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded"
            onClick={() => {
              onEdit(record);
              onOpenModal();
            }}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-2 py-1 rounded"
            onClick={() => handleDeleteClick(record.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const tableData =
    data?.data.map((item) => ({
      id: item.id,
      ...item.attributes,
    })) ?? [];

  return (
    <Table
      columns={columns}
      loading={isLoading}
      dataSource={tableData}
      rowKey="id"
      scroll={{ x: "max-content" }}
    />
  );
};

export default BannerTable;
