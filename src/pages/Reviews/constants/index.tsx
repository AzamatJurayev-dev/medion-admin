import type { ColumnsType } from "antd/es/table";
import type { ReviewsAttributesUpdate } from "../types";
import { Rate, Switch } from "antd";
import dayjs from "dayjs";

const renderTruncatedColumn = () => (text: string) =>
  (
    <div
      className="text-sm overflow-ellipsis max-w-40 line-clamp-1"
      title={text}
    >
      {text}
    </div>
  );

export const getReviewsColumns = (
  onDelete: (id: number) => void,
  t: (key: string) => string,
  onToggleShow: (data: { id: number; isShow: boolean }) => void
): ColumnsType<ReviewsAttributesUpdate> => [
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
    title: "user name",
    dataIndex: "users_permissions_users",
    render: (_, record) =>
      record.users_permissions_user?.data?.attributes?.username || "-",
  },
  {
    title: t("Title"),
    dataIndex: "review_text",
    render: (_, record) => renderTruncatedColumn()(record.review_text),
  },
  {
    title: t("Title"),
    dataIndex: "review_star",
    render: (_, record) => (
      <Rate value={record.review_star} disabled allowHalf />
    ),
  },
  {
    title: t("Date"),
    dataIndex: "createdAt",
    render: (_, record) => dayjs(record.createdAt).format("DD.MM.YYYY"),
  },
  {
    title: t("Actions"),
    fixed: "right",
    width: 180,
    render: (_, record) => (
      <div className="flex gap-4">
        <button>
          <Switch
            checked={record.isShow}
            onChange={(checked) =>
              onToggleShow({ id: record.id, isShow: checked })
            }
          />
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
