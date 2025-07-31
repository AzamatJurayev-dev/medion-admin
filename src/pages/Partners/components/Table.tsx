import { Image, Modal, Table } from "antd";
import { imageUrlGenerator } from "../../../utils/ImageUrlGenerate";
import type { PartnerAttributesUpdate } from "../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletePartners, getPartners } from "../api";
import type { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";

const PartnerTable = ({
  onEdit,
  onOpenModal,
}: {
  onEdit: (item: PartnerAttributesUpdate) => void;
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
  const TextareaStyle = "text-sm overflow-ellipsis line-clamp-1 max-w-40";
  const renderTruncatedColumn = () => (text: string) =>
    (
      <div
        className="text-sm overflow-ellipsis max-w-40 line-clamp-1"
        title={text}
      >
        {text}
      </div>
    );
  const columns: ColumnsType<PartnerAttributesUpdate> = [
    {
      title: (
        <span className="text-left font-sans text-sm font-normal leading-5 text-secondary-dark">
          №
        </span>
      ),
      key: "index",
      render: (_, __, index) => (
        <span className="font-sans text-sm font-normal leading-6 text-dark">
          {index + 1}
        </span>
      ),
      width: 48,
    },
    {
      title: t("Title"),
      dataIndex: "title",
    },
    {
      title: t("Description"),
      dataIndex: "description",
      render: (_, record) =>
        renderTruncatedColumn()(record.description?.[lang]),
    },
    {
      title: t("Sub description"),
      dataIndex: "subDesc",
      render: (_, record) => (
        <p
          className={TextareaStyle}
          dangerouslySetInnerHTML={{ __html: record.subDesc?.[lang] || "" }}
        ></p>
      ),
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
      title: t("Image"),
      dataIndex: "coverImage",
      render: (_, record) => (
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
      render: (_, record) => (
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
        size="small"
        loading={isLoading}
        scroll={{
          x: "max-content",
        }}
      />
    </div>
  );
};

export default PartnerTable;
