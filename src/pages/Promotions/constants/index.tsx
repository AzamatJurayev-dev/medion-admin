import { Image } from "antd";
import type { ColumnsType } from "antd/es/table";
import { imageUrlGenerator } from "../../../utils/ImageUrlGenerate";
import type { PromoItem } from "../types";
import { AppButton } from "../../../components/ui/AppButton";

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

export const getPromoColumns = (
  onEdit: (record: PromoItem) => void,
  onOpenModal: () => void,
  onDelete: (id: number) => void,
  lang: "uz" | "en" | "ru",
  t: (key: string) => string
): ColumnsType<PromoItem> => [
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
    render: (_, record) => renderTruncatedColumn()(record.title?.[lang]),
  },
  {
    title: t("Description"),
    dataIndex: "description",
    render: (_, record) => record.description?.[lang],
  },
  {
    title: t("Sub Description"),
    dataIndex: "subDesc",
    render: (_, record) => (
      <p
        dangerouslySetInnerHTML={{ __html: record.subDesc?.[lang] }}
        className={TextareaStyle}
      />
    ),
  },
  {
    title: t("Promotion Term"),
    dataIndex: "promotion_term",
    render: (_, record) => record.promotion_term?.[lang],
  },
  {
    title: "Start Date",
    dataIndex: "start_date",
  },
  {
    title: "End Date",
    dataIndex: "end_date",
  },
  {
    title: t("Image"),
    dataIndex: "coverImage",
    render: (_, record) => (
      <div className="size-12 justify-center items-center flex rounded-full border border-gray-200 overflow-hidden">
        <Image
          className="object-cover size-12"
          src={imageUrlGenerator(record.promoImage?.data?.url)}
          alt="cover"
        />
      </div>
    ),
  },
  {
    title: t("Actions"),
    width: 150,
    render: (_, record) => (
      <div className="flex gap-2">
        <AppButton
          variant="edit"
          onClick={() => {
            onEdit(record);
            onOpenModal();
          }}
        >
          Edit
        </AppButton>
        <AppButton
          variant="delete"
          onClick={() => {
            onDelete(record.id);
          }}
        >
          Delete
        </AppButton>
      </div>
    ),
  },
];
