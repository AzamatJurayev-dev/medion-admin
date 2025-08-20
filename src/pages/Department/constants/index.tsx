import type { ColumnsType } from "antd/es/table";
import { Image } from "antd";
import { imageUrlGenerator } from "../../../utils/ImageUrlGenerate";
import type { DepartmentItem } from "../types";
import { AppButton } from "../../../components/ui/AppButton";

export const getDepartmentColums = (
  onEdit: (record: DepartmentItem) => void,
  onOpenModal: () => void,
  onDelete: (id: number) => void,
  lang: "uz" | "en" | "ru",
  t: (key: string) => string
): ColumnsType<DepartmentItem> => [
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
    render: (_, record) => record.title?.[lang],
  },
  {
    title: t("Sub Description"),
    dataIndex: "subDesc",
    render: (_, record) => (
      <p
        className="text-sm overflow-ellipsis max-w-40 line-clamp-1"
        dangerouslySetInnerHTML={{ __html: record.subDesc?.[lang] }}
      />
    ),
  },
  {
    title: t("Description"),
    dataIndex: "description",
    render: (_, record) => record.description?.[lang],
  },
  {
    title: "Icon",
    dataIndex: "icon",
    render: (_, record) => (
      <div className="size-12 justify-center items-center flex rounded-full border border-gray-200 overflow-hidden">
        <Image
          className="object-cover size-12"
          src={imageUrlGenerator(record.icon?.data?.url)}
          alt="cover"
        />
      </div>
    ),
  },
  {
    title: "Actions",
    dataIndex: "actions",
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
