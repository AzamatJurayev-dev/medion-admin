/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from "antd";
import type { CategoryType } from "../../../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategories } from "../../../api";
import { deleteCategory } from "../api";

const CategoryTable = ({
  onEdit,
  onOpenModal,
}: {
  onEdit: (item: CategoryType) => void;
  onOpenModal: () => void;
  }) => {
  const queryClient = useQueryClient();
    const { data, isLoading } = useQuery({
      queryKey: ["categories"],
      queryFn: getCategories,
    });
  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };
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
