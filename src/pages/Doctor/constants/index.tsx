import type { ColumnsType } from "antd/es/table";
import type { DoctorAttributes1 } from "../types";
import { imageUrlGenerator } from "../../../utils/ImageUrlGenerate";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import type { NavigateFunction } from "react-router-dom";

export const getDoctorColumns = ({
  onDelete,
  onEdit,
  lang,
  t,
  onOpenModal,
  navigate,
}: {
  onDelete: (id: number) => void;
  lang: "uz" | "en" | "ru";
  t: (key: string) => string;
  onEdit: (record: DoctorAttributes1) => void;
  onOpenModal: () => void;
  navigate: NavigateFunction;
}): ColumnsType<DoctorAttributes1> => {
  return [
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
      title: "Image",
      dataIndex: "image",
      render: (_, record) => (
        <div className="size-16 justify-center items-center flex rounded-full border border-gray-200 overflow-hidden">
          <img
            className="object-contain h-full w-full"
            src={imageUrlGenerator(record.image.data?.attributes.url)}
            alt="cover"
          />
        </div>
      ),
    },
    {
      title: t("Full Name"),
      dataIndex: "name",
      render: (_, record) => record.name?.[lang] || "—",
    },
    {
      title: t("Work Experience"),
      dataIndex: "workExperience",
      render: (_, record) => `${record.workExperience} yil`,
    },
    {
      title: t("Departments"),
      dataIndex: "departments",
      render: (_, record) => {
        const titles =
          record.departments?.data?.map((dep) => {
            return lang === "uz"
              ? dep.attributes?.titleUz
              : lang === "en"
              ? dep.attributes?.titleEn
              : dep.attributes?.titleRu;
          }) || [];

        return titles.join(", ");
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      fixed: "right",
      width: 150,
      render: (_, record) => (
        <div className="flex gap-4">
          <button
            className="text-white rounded-lg bg-blue-500 px-4 py-2 cursor-pointer"
            onClick={() => navigate(`/doctors/${record.id}`)}
          >
            Details
          </button>
          <button
            className="btn btn-primary"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(record);
              onOpenModal();
            }}
          >
            <EditFilled className="text-blue-500 text-xl" />
          </button>
          <button
            className="btn btn-danger"
            onClick={(e) => {
              onDelete(record.id);
              e.stopPropagation();
            }}
          >
            <DeleteFilled className="text-red-500 text-xl" />
          </button>
        </div>
      ),
    },
  ];
};
