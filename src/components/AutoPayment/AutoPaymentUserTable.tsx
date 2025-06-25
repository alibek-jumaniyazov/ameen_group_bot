import { Table, Tag, type TableProps } from "antd";

interface DataType {
  id: string;
  date: string;
  amount: string;
  status: string[];
  error: string[];
  method: string;
}

export default function AutoPaymentUserTable() {
  const allData: DataType[] = Array.from({ length: 30 }, (_, i) => ({
    id: (i + 1).toString(),
    date: "2025/09/19 14:30",
    amount: "100 000 so’m",
    status: [Math.random() > 0.5 ? "Muvaffaqiyatli" : "Muvaffaqiyatsiz"],
    error: [Math.random() > 0.5 ? "Yechildi " : "Kartada mablag' yetarli emas"],
    method: "Karta(1234)",
  }));

  const columns: TableProps<DataType>["columns"] = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Summasi", dataIndex: "amount", key: "amount" },
    { title: "Sanasi", dataIndex: "date", key: "date" },
    {
      title: "Holati",
      dataIndex: "status",
      key: "status",
      render: (_, record) =>
        record.status.map((tag) => {
          const colorMap: Record<string, string> = {
            Muvaffaqiyatli: "green",
            Muvaffaqiyatsiz: "red",
          };
          return (
            <Tag color={colorMap[tag]} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        }),
    },
    {
      title: "Xato sababi",
      dataIndex: "error",
      key: "error",
    },
    { title: "Usuli", dataIndex: "method", key: "method" },
  ];

  return (
    <div className="UserPaymentHistory">
      <Table
        columns={columns}
        dataSource={allData}
        pagination={{
          pageSize: 6,
          showSizeChanger: false,
          align: "center",
          total: allData.length,
          showTotal: (total) => `Jami: ${total} foydalanuvchi`,
        }}
        rowKey="id"
      />
    </div>
  );
}
