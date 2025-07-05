import { Table, Tag, type TableProps } from "antd";

interface DataType {
  id: string;
  definition: string[];
  startDate: string;
  endDate: string;
  status: string[];
  remainingPeriod: string[];
}

export default function SubscriptionList({ userId }: { userId: string | undefined }) {
  const allData: DataType[] = Array.from({ length: 30 }, (_, i) => ({
    id: (i + 1).toString(),
    definition: [Math.random() > 0.5 ? "Premium" : "Boshlang’ich"],
    startDate: "2025-06-15",
    endDate: "2025-07-15",
    status: [Math.random() > 0.5 ? "Faol" : "Tugagan"],
    remainingPeriod: [Math.random() > 0.5 ? "30 kun" : "Tugagan"],
  }));

  const columns: TableProps<DataType>["columns"] = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Tarif", dataIndex: "definition", key: "definition" },
    { title: "Boshlanish sanasi", dataIndex: "startDate", key: "startDate" },
    { title: "Tugash sanasi", dataIndex: "endDate", key: "endDate" },
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
    {
      title: "Qoldiq muddat",
      dataIndex: "remainingPeriod",
      key: "remainingPeriod",
      render: (_, record: DataType) => (
        <>
          {record.remainingPeriod.map((tag) => {
            const colorMap: Record<string, string> = {
              Tugagan: "red",
            };

            const color = colorMap[tag] || (tag.length > 5 ? "" : "red");
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
