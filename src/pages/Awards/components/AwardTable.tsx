import { Table } from "antd";
import { getAwardColumns } from "../constants";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getAwards } from "../api";

const AwardTable = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "uz" | "en" | "ru";
  const { data, isLoading } = useQuery({
    queryKey: ["awards"],
    queryFn: getAwards,
  });
  const tableData =
    data?.data.map((item) => ({
      id: item.id,
      ...item.attributes,
    })) ?? [];
  return (
    <div>
      <Table
        dataSource={tableData}
        loading={isLoading}
        columns={getAwardColumns(lang, t)}
        size="small"
        rowKey="id"
      />
    </div>
  );
};

export default AwardTable;
