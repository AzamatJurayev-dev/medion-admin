import { Modal, Table, type TableProps } from "antd";
import { useTranslation } from "react-i18next";
import { useState } from "react";

interface AppTableProps<T> extends TableProps<T> {
  getColumns: (...args: any[]) => any[];
  onEdit?: (item: T) => void;
  deleteMutation?: { mutate: (id: number) => void };
  onOpenModal?: () => void;
  data?: { data: any[]; meta?: { pagination: { total: number } } };
  isServerSide?: boolean;
}

export default function AppTable<T extends { id: number }>({
  data,
  getColumns,
  onEdit,
  deleteMutation,
  onOpenModal,
  loading,
  isServerSide = false,
  pagination,
  ...rest
}: AppTableProps<T>) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "uz" | "en" | "ru";

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleDeleteClick = (id: number) => {
    Modal.confirm({
      title: t("Are you sure you want to delete?"),
      content: t("This action cannot be undone."),
      okText: t("Yes, delete"),
      cancelText: t("Cancel"),
      onOk: () => deleteMutation?.mutate(id),
    });
  };

  const tableData =
    data?.data.map((item: any) => ({
      id: item.id,
      ...item.attributes,
    })) ?? [];

  return (
    <Table
      {...rest}
      columns={getColumns(onEdit, onOpenModal, handleDeleteClick, lang, t).map(
        (col: any) => ({
          ...col,
          responsive: col.responsive || ["xs", "sm", "md", "lg"], // responsive default
        })
      )}
      loading={loading}
      dataSource={tableData}
      pagination={
        isServerSide
          ? {
              current: currentPage,
              pageSize,
              total: data?.meta?.pagination?.total || 0,
              showSizeChanger: true,
              onChange: (page, size) => {
                setCurrentPage(page);
                setPageSize(size);
              },
            }
          : pagination !== false
          ? {
              pageSize,
              showSizeChanger: true,
              onChange: (_, size) => setPageSize(size),
            }
          : false
      }
      className={`
        bg-white dark:bg-gray-800 
        shadow-sm rounded-xl
        text-gray-600 dark:text-gray-300
        border border-gray-200 dark:border-gray-700
        overflow-hidden
        [&_.ant-table-thead_th]:bg-gray-50 dark:[&_.ant-table-thead_th]:bg-gray-900
        [&_.ant-table-thead_th]:text-gray-700 dark:[&_.ant-table-thead_th]:text-gray-200
        [&_.ant-table-thead_th]:font-semibold
      `}
      rowKey="id"
      rowClassName={() =>
        "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      }
      scroll={{ x: "max-content" }}
    />
  );
}
