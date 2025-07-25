/* eslint-disable @typescript-eslint/no-explicit-any */
import { Image } from "antd";
import type { ColumnsType } from "antd/es/table";
import { imageUrlGenerator } from "../../../utils/ImageUrlGenerate";
import type { BannerAttributs } from "../types";
import type { UpdateBannerForm } from "../types/schema";

const TextareaStyle = "text-sm max-w-40 overflow-ellipsis line-clamp-2";

const renderTruncatedColumn = () => (text: string) =>
  (
    <div
      className="text-sm overflow-ellipsis max-w-40 line-clamp-1"
      title={text}
    >
      {text}
    </div>
  );

export const getBannerColumns = (
  onEdit: (record: UpdateBannerForm) => void,
  onOpenModal: () => void,
  onDelete: (id: number) => void,
  lang: "uz" | "en" | "ru",
  t: (key: string) => string
): ColumnsType<BannerAttributs> => [
  {
    title: t("Title"),
    dataIndex: "title",
    render: (_, record) => renderTruncatedColumn()(record.title?.[lang]),
  },
  {
    title: t("Description"),
    dataIndex: "description",
    render: (_, record) => (
      <p
        dangerouslySetInnerHTML={{ __html: record.description?.[lang] }}
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
          src={imageUrlGenerator(record.coverImage?.data?.attributes?.url)}
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
          onClick={() => onDelete(record.id)}
        >
          Delete
        </button>
      </div>
    ),
  },
];
