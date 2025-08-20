import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import { getNews } from "../api";
import { getNewsColumns } from "../constants";
import { useTranslation } from "react-i18next";

const NewsTable = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "uz" | "en" | "ru";
  const { data, isLoading } = useQuery({
    queryKey: ["news"],
    queryFn: getNews,
  });
  const tableData = data?.data || [];

  return (
    <div>
      <Table
        dataSource={tableData}
        columns={getNewsColumns(lang, t)}
        loading={isLoading}
        rowKey="id"
        size="small"
      />
    </div>
  );
};

export default NewsTable;
