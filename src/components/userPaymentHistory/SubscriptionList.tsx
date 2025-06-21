import { Table, Tag, type TableProps } from "antd";

interface DataType {
  id: string;
  definition: string[];
  status: string[];
  term: string;
}

export default function SubscriptionList() {
  const allData: DataType[] = Array.from({ length: 30 }, (_, i) => ({
    id: (i + 1).toString(),
    term: "2025/06/15 - 2025/07/15",
    status: [Math.random() > 0.5 ? "Faol" : "Tugagan"],
    definition: [Math.random() > 0.5 ? "Premium" : "Boshlang’ich"],
  }));

  const columns: TableProps<DataType>["columns"] = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Tarif", dataIndex: "definition", key: "definition" },
    { title: "Muddat", dataIndex: "term", key: "term" },
    {
      title: "Holati",
      key: "status",
      dataIndex: "status",
      render: (_, record: DataType) => (
        <>
          {record.status.map((tag) => {
            const colorMap: Record<string, string> = {
              Faol: "green",
              Tugagan: "red",
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
