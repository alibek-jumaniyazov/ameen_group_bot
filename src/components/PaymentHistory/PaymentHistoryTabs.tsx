import { Table, Tag, type TableProps } from "antd";

interface DataType {
  id: string;
  user: string;
  definition: string[];
  amout: string;
  date: string;
  status: string[];
}

export default function PaymentHistoryTabs() {
  const allData: DataType[] = Array.from({ length: 30 }, (_, i) => ({
    id: (i + 1).toString(),
    user: "Alibek Jumaniyazov",
    definition: [Math.random() > 0.5 ? "Premium" : "Boshlang’ich"],
    amout: "200,000 so’m",
    date: "2025/06/20 09:00",
    status: [Math.random() > 0.5 ? "Successful" : "Error"],
  }));

  const columns: TableProps<DataType>["columns"] = [
    { title: "To‘lov ID", dataIndex: "id", key: "id" },
    { title: "Foydalanuvchi", dataIndex: "user", key: "user" },
    { title: "Tarif", dataIndex: "definition", key: "definition" },
    { title: "Summa", dataIndex: "amout", key: "amout" },
    { title: "Sanasi", dataIndex: "date", key: "date" },
    {
      title: "Holati",
      key: "status",
      dataIndex: "status",
      render: (_, record: DataType) => (
        <>
          {record.status.map((tag) => {
            const colorMap: Record<string, string> = {
              Successful: "green",
              Error: "red",
            };
            const color = colorMap[tag];
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];
  return (
    <div className="SubscriptionList">
      <Table
        columns={columns}
        dataSource={allData}
        pagination={{
          pageSize: 11,
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
