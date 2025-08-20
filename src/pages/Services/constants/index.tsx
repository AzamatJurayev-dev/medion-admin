import type { ColumnsType } from "antd/es/table";
import { AppButton } from "../../../components/ui/AppButton";
import { Flex, Tooltip } from "antd";
import type { ServiceItem } from "../types";

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
  onEdit: (record: ServiceItem) => void,
  onOpenModal: () => void,
  onDelete: (id: number) => void,
  lang: "uz" | "en" | "ru",
  t: (key: string) => string
): ColumnsType<ServiceItem> => [
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
    render: (_, record) => (
      <p
        dangerouslySetInnerHTML={{ __html: record.description?.[lang] }}
        className={TextareaStyle}
      />
    ),
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "Type",
    dataIndex: "type",
    render: (_, record) => record?.type || "-",
  },
  {
    title: "Department",
    dataIndex: "department",
    render: (_, record) => {
      const title = record.department?.data?.title?.[lang];
      return title || "-";
      
    },
  },
  {
    title: "Doctors",
    dataIndex: "doctors",
    render: (_, record) => {
      const doctors = record.doctors.data;
      if (!doctors || doctors.length === 0) return "-";

      const firstDoctor = doctors[0].name?.en;
      const remaining = doctors.slice(1);

      return remaining.length > 0 ? (
        <Tooltip
          title={
            <Flex vertical>
              {remaining.map((doc) => (
                <span key={doc.id}>{doc.name?.[lang]}</span>
              ))}
            </Flex>
          }
        >
          <span>
            {firstDoctor}{" "}
            <span style={{ color: "#888" }}>+{remaining.length}</span>
          </span>
        </Tooltip>
      ) : (
        <span>{firstDoctor}</span>
      );
    },
  },
  {
    title: t("Actions"),
    // fixed: "right",
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
