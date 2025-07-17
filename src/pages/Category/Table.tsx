/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from "antd";
import type { CategoryType } from "../../types";
import { useCategory } from "./useCategory";

const CategoryTable = ({
  onEdit,
  onOpenModal,
}: {
  onEdit: (item: CategoryType) => void;
  onOpenModal: () => void;
}) => {
  const { data, isLoading, handleDelete } = useCategory();

  const columns = [
    {
      title: "Name (UZ)",
      dataIndex: "nameUz",
    },
    {
      title: "Name (EN)",
      dataIndex: "nameEn",
    },
    {
      title: "Name (RU)",
      dataIndex: "nameRu",
    },
    {
      title: "Actions",
      render: (_: any, record: CategoryType) => (
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
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const transformedData =
    data?.data?.map((item) => ({ id: item.id, ...item.attributes })) ?? [];

  return (
    <Table
      dataSource={transformedData}
      loading={isLoading}
      rowKey="id"
      columns={columns}
    />
  );
};

export default CategoryTable;
