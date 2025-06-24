import { Table, type TableProps } from "antd";

interface DataType {
  id: string;
  amount: string;
  date: string;
  status: string[];
  method: string;
  additionalInfo: string;
}

export default function UserPaymentHistory() {
  const allData: DataType[] = Array.from({ length: 30 }, (_, i) => ({
    id: (i + 1).toString(),
    amount: "100 000 so’m",
    date: "2025/09/19 14:30",
    status: [Math.random() > 0.5 ? "Muvaffaqiyatli" : "Muvaffaqiyatsiz"],
    method: "Karta(1234)",
    additionalInfo: "To‘lov rad etildi",
  }));

  const columns: TableProps<DataType>["columns"] = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Summasi", dataIndex: "amount", key: "amount" },
    { title: "Sanasi", dataIndex: "date", key: "date" },
    { title: "Holati", dataIndex: "status", key: "status" },
    { title: "Usuli", dataIndex: "method", key: "method" },
    {
      title: "Qo‘shimcha ma’lumot",
      dataIndex: "additionalInfo",
      key: "additionalInfo",
    },
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
