/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ColumnsType } from "antd/es/table";
import type { DepartmentAttributes } from "../types";
import { Image } from "antd";
import { imageUrlGenerator } from "../../../utils/ImageUrlGenerate";
import type { UpdateDepartmentForm } from "../types/schema";

export const getDepartmentColums = (
  onEdit: (record: UpdateDepartmentForm) => void,
  onOpenModal: () => void,
  onDelete: (id: number) => void,
  lang: "uz" | "en" | "ru",
  t: (key: string) => string
): ColumnsType<DepartmentAttributes> => [
  {
    title: t("Title"),
    dataIndex:
      lang === "uz" ? "titleUz" : lang === "en" ? "titleEn" : "titleRu",
  },
  {
    title: t("Sub Description"),
    dataIndex: "subDesc",
    render: (_, record) => record.subDesc?.[lang],
  },
  {
    title: t("Description"),
    dataIndex: "description",
    render: (_, record) => (
      <div dangerouslySetInnerHTML={{ __html: record.description?.[lang] }} />
    ),
  },
  {
    title: "Icon",
    dataIndex: "icon",
    render: (_, record) => (
      <div className="size-12 justify-center items-center flex rounded-full border border-gray-200 overflow-hidden">
        <Image
          className="object-cover size-12"
          src={imageUrlGenerator(record.icon?.data?.attributes?.url)}
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
