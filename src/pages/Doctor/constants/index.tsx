import type { ColumnsType } from "antd/es/table";
import { imageUrlGenerator } from "../../../utils/ImageUrlGenerate";
import type { NavigateFunction } from "react-router-dom";
import { Image } from "antd";
import { AppButton } from "../../../components/ui/AppButton";
import type { DoctorItem } from "../types";

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
  onEdit: (record: DoctorItem) => void;
  onOpenModal: () => void;
  navigate: NavigateFunction;
}): ColumnsType<DoctorItem> => {
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
          <Image
            className="object-contain h-full w-full"
            src={imageUrlGenerator(record.image.data?.url)}
            alt="cover"
          />
        </div>
      ),
    },
    {
      title: t("Full Name"),
      dataIndex: "name",
      render: (_, record) => (
        <p className="w-40 overflow-ellipsis line-clamp-1">
          {record.name?.[lang] || "—"}
        </p>
      ),
    },
    {
      title: t("Work Experience"),
      dataIndex: "workExperience",
      render: (_, record) => `${record.workExperience} yil`,
    },
    {
      title: "Doctor Type",
      dataIndex: "doctorType",
      render: (_, record) => (record.doctorType ? "Mahalliy" : "Xorijiy"),
    },
    {
      title: t("Departments"),
      dataIndex: "departments",
      render: (_, record) => {
        const titles =
          record.departments?.data?.map((dep) => {
            return dep.title?.[lang];
          }) || [];

        return titles.join(", ");
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      width: 150,
      render: (_, record) => (
        <div className="flex gap-2 justify-end">
          <AppButton
            variant="edit"
            onClick={() => navigate(`/doctors/${record.id}`)}
          >
            Details
          </AppButton>
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
};

export const steps = [
  { title: "Basic" },
  { title: "Experience" },
  { title: "Award" },
  { title: "Education" },
  { title: "Other" },
];
