import { Table, Tag, type TableProps } from "antd";

interface DataType {
  id: string;
  date: string;
  message: string;
  status: string[];
}

export default function SentMessage({ userId }: { userId: string | undefined }) {
  const allData: DataType[] = Array.from({ length: 30 }, (_, i) => ({
    id: (i + 1).toString(),
    date: "2025/06/20 09:00",
    message: "Obuna muddati tugayapti",
    status: [Math.random() > 0.5 ? "Yetkazildi" : "Oqildi"],
  }));

  const columns: TableProps<DataType>["columns"] = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Sanasi", dataIndex: "date", key: "date" },
    { title: "Matni", dataIndex: "message", key: "message" },
    {
      title: "Holati",
      key: "status",
      dataIndex: "status",
      render: (_, record: DataType) => (
        <>
          {record.status.map((tag) => {
            const colorMap: Record<string, string> = {
              Yetkazildi: "blue",
              Oqildi: "green",
            };

            const color =
              colorMap[tag] || (tag.length > 5 ? "geekblue" : "green");

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
