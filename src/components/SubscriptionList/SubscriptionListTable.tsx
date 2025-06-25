import { Table, Tag, type TableProps } from "antd";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

interface DataType {
  id: string;
  user: string;
  definition: string[];
  amout: string;
  startDate: string;
  endDate: string;
  status: string[];
}

export default function SubscriptionListTable({ filters }: { filters: any }) {
  const [selectedRecord, setSelectedRecord] = useState<DataType | null>(null);
  const navigate = useNavigate();

  const allData: DataType[] = Array.from({ length: 30 }, (_, i) => ({
    id: (i + 1).toString(),
    user: "Alibek Jumaniyazov",
    definition: [Math.random() > 0.5 ? "Premium" : "Boshlang’ich"],
    amout: (Math.floor(Math.random() * 500000) + 50000).toString(),
    startDate: "2025/06/15",
    endDate: "2025/07/15",
    status: [Math.random() > 0.5 ? "Faol" : "Tugagan"],
  }));

  const filteredData = allData.filter((item) => {
    const matchUser = filters?.searchUser
      ? item.user.toLowerCase().includes(filters.searchUser.toLowerCase()) ||
        item.id.includes(filters.searchUser)
      : true;

    const matchDef = filters?.definition
      ? item.definition.includes(filters.definition)
      : true;

    const matchStatus = filters?.status
      ? item.status.includes(filters.status)
      : true;

    const matchAmountMin = filters?.minAmount
      ? +item.amout >= +filters.minAmount
      : true;

    const matchAmountMax = filters?.maxAmount
      ? +item.amout <= +filters.maxAmount
      : true;

    const matchStartDate = filters?.startDate
      ? dayjs(item.startDate).isSameOrAfter(dayjs(filters.startDate), "day")
      : true;

    const matchEndDate = filters?.endDate
      ? dayjs(item.endDate).isSameOrBefore(dayjs(filters.endDate), "day")
      : true;

    return (
      matchUser &&
      matchDef &&
      matchStatus &&
      matchAmountMin &&
      matchAmountMax &&
      matchStartDate &&
      matchEndDate
    );
  });

  const columns: TableProps<DataType>["columns"] = [
    { title: "To‘lov ID", dataIndex: "id", key: "id" },
    { title: "Foydalanuvchi", dataIndex: "user", key: "user" },
    {
      title: "Tarif",
      dataIndex: "definition",
      key: "definition",
      render: (def) => def[0],
    },
    { title: "Summa", dataIndex: "amout", key: "amout" },
    { title: "Boshlanish sanasi", dataIndex: "startDate", key: "startDate" },
    { title: "Tugash sanasi", dataIndex: "endDate", key: "endDate" },
    {
      title: "Holati",
      key: "status",
      dataIndex: "status",
      render: (_, record) =>
        record.status.map((tag) => {
          const colorMap: Record<string, string> = {
            Faol: "green",
            Tugagan: "red",
          };
          return (
            <Tag color={colorMap[tag]} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        }),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={filteredData}
      pagination={{
        pageSize: 10,
        showSizeChanger: false,
        total: filteredData.length,
        showTotal: (total) => `Jami: ${total} foydalanuvchi`,
      }}
      rowKey="id"
      onRow={(record) => {
        return {
          onClick: () => {
            setSelectedRecord(record);
            navigate(`/user/${record.id}`);
          },
        };
      }}
    />
  );
}
