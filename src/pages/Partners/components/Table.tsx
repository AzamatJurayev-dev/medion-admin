/* eslint-disable @typescript-eslint/no-explicit-any */
import { Image, Modal, Table } from "antd";
import { imageUrlGenerator } from "../../../utils/ImageUrlGenerate";
import type { PartnerAttributes } from "../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletePartners, getPartners } from "../api";
import type { ColumnsType } from "antd/es/table";
import type { UpdatePartnerForm } from "../types/schema";
import { useTranslation } from "react-i18next";

const PartnerTable = ({
  onEdit,
  onOpenModal,
}: {
  onEdit: (item: UpdatePartnerForm) => void;
  onOpenModal: () => void;
}) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "uz" | "en" | "ru";
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["partners"],
    queryFn: getPartners,
  });
  const tableData =
    data?.data.map((item) => ({
      id: item.id,
      ...item.attributes,
    })) ?? [];
  const deletePartner = useMutation({
    mutationFn: deletePartners,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partners"] });
    },
  });
  const handleDeleteClick = (id: number) => {
    Modal.confirm({
      title: "Rostdan ham o'chirmoqchimisiz?",
      content: "Bu amalni qaytarib bo'lmaydi.",
      okText: "Ha, o'chir",
      cancelText: "Bekor qilish",
      onOk: () => deletePartner.mutate(id),
    });
  };
  const TextareaStyle = "text-sm overflow-ellipsis line-clamp-2";
  const columns: ColumnsType<PartnerAttributes> = [
    {
      title: t("Title"),
      dataIndex: "title",
    },
    {
      title: t("Sub description"),
      dataIndex:
        lang === "uz" ? "subdescUz" : lang === "en" ? "subdescEn" : "subdescRu",
    },
    {
      title: t("Phone Number"),
      dataIndex: "phoneNumber",
    },
    {
      title: t("Link"),
      dataIndex: "link",
    },
    {
      title: t("Description"),
      dataIndex:
        lang === "uz"
          ? "descriptionUz"
          : lang === "en"
          ? "descriptionEn"
          : "descriptionRu",
      render: (value: string) => (
        <p
          dangerouslySetInnerHTML={{ __html: value }}
          className={TextareaStyle}
        />
      ),
    },
    {
      title: t("Image"),
      dataIndex: "coverImage",
      render: (_: any, record) => (
        <div className="size-12 justify-center items-center flex rounded-full border border-gray-200 overflow-hidden">
          <Image
            className="object-cover size-12"
            src={imageUrlGenerator(record.image?.data?.attributes?.url)}
            alt="cover"
          />
        </div>
      ),
    },
    {
      title: t("Actions"),
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
  return (
    <div>
      <Table
        columns={columns}
        dataSource={tableData}
        rowKey="id"
        loading={isLoading}
        scroll={{
          x: "max-content",
        }}
      />
    </div>
  );
};

export default PartnerTable;
