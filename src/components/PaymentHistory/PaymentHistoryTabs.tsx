// PaymentHistoryTabs.tsx
import { Table, Tag, type TableProps } from "antd";
import type { Transaction } from "../../api/transactionApi";
import dayjs from "dayjs";

interface DataType {
  id: string;
  user: string;
  definition: string[];
  amout: string;
  date: string;
  status: string[];
}

interface PaymentHistoryTabsProps {
  data: Transaction[];
  page: number;
  limit: number;
  total: number;
  loading?: boolean;
  onPageChange: (page: number) => void;
}

export default function PaymentHistoryTabs({
  data,
  page,
  limit,
  total,
  loading,
  onPageChange,
}: PaymentHistoryTabsProps) {
  const allData = data.map((item) => ({
    id: item.id.toString(),
    user: `${item.user?.firstName || ""} ${item.user?.lastName || ""}`,
    definition: [item.subscriptionType?.title || "Noma'lum"],
    amout: `${item.price?.toString()} so'm`,
    date: new Date(item.createdAt).toISOString(),
    status: ["Muvaffaqiyatli"],
  }));

  const columns: TableProps<DataType>["columns"] = [
    { title: "To‘lov ID", dataIndex: "id", key: "id" },
    { title: "Foydalanuvchi", dataIndex: "user", key: "user" },
    { title: "Tarif", dataIndex: "definition", key: "definition" },
    { title: "Summa", dataIndex: "amout", key: "amout" },
    {
      title: "Sanasi",
      dataIndex: "date",
      key: "date",
      render: (date: string) => dayjs(date).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "Holati",
      key: "status",
      dataIndex: "status",
      render: (_, record: DataType) => (
        <>
          {record.status.map((tag) => {
            const colorMap: Record<string, string> = {
              Muvaffaqiyatli: "green",
              Muvaffaqiysiz: "red",
              Kutilmoqda: "orange",
            };
            return (
              <Tag color={colorMap[tag] || "default"} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];

  return (
    <div className="PaymentHistoryTabs">
      <Table
        columns={columns}
        dataSource={allData}
        loading={loading}
        pagination={{
          current: page,
          pageSize: limit,
          total,
          showSizeChanger: false,
          onChange: onPageChange,
          showTotal: (total) => `Jami: ${total} ta to‘lov`,
        }}
        rowKey="id"
      />
    </div>
  );
}
