import type { ColumnsType } from "antd/es/table";
import { Image } from "antd";
import { imageUrlGenerator } from "../../../utils/ImageUrlGenerate";
import type { ArticleUpdate } from "../types";
import dayjs from "dayjs";

export const getArticleColums = (
  lang: "uz" | "en" | "ru",
  t: (key: string) => string,
  onEdit: (item: ArticleUpdate) => void,
  setModalOpen: () => void,
  onDelete: (id: number) => void
): ColumnsType<ArticleUpdate> => [
  {
    title: t("Author"),
    dataIndex: "author",
    render: (_, record) => record.author || "N/A",
  },
  {
    title: t("Title"),
    dataIndex: "title",
    render: (_, record) => record.title?.[lang] || "—",
  },
  {
    title: t("Sub Description"),
    dataIndex: "subDesc",
    render: (_, record) => (
      <p dangerouslySetInnerHTML={{ __html: record.subDesc?.[lang] }} />
    ),
  },
  {
    title: t("Created At"),
    dataIndex: "createdAt",
    render: (_, record) => dayjs(record.createDate).format("DD/MM/YYYY") || "—",
  },
  {
    title: "Icon",
    dataIndex: "icon",
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
    title: "Actions",
    dataIndex: "actions",
    fixed: "right",
    width: 150,
    render: (_, record) => (
      <div className="flex gap-2">
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded"
          onClick={() => {
            setModalOpen();
            onEdit(record);
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
