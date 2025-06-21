import { Table, type TableProps } from "antd";

interface DataType {
  id: string;
  amount: string;
  date: string;
  status: string[];
  definition: string[];
}

export default function UserPaymentHistory() {
  const allData: DataType[] = Array.from({ length: 30 }, (_, i) => ({
    id: (i + 1).toString(),
    amount: "100 000 so’m",
    date: "2025.06.19 17:19",
    status: [Math.random() > 0.5 ? "Muvaffaqiyatli" : "Muvaffaqiyatsiz"],
    definition: [Math.random() > 0.5 ? "Premium" : "Boshlang’ich"],
  }));

  const columns: TableProps<DataType>["columns"] = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Summasi", dataIndex: "amount", key: "amount" },
    { title: "Sanasi", dataIndex: "date", key: "date" },
    { title: "Holati", dataIndex: "status", key: "status" },
    { title: "Obuna", dataIndex: "definition", key: "definition" },
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
