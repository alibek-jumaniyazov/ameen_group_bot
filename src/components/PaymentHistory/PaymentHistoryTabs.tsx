import { Table, Tag, type TableProps } from "antd";

interface DataType {
  id: string;
  user: string;
  definition: string[];
  amout: string;
  date: string;
  status: string[];
}

export default function PaymentHistoryTabs({ filters }: { filters: any }) {
  const allData: DataType[] = Array.from({ length: 30 }, (_, i) => ({
    id: (i + 1).toString(),
    user: "Alibek Jumaniyazov",
    definition: [Math.random() > 0.5 ? "Premium" : "Boshlang’ich"],
    amout: "200000",
    date: "2025/06/20 09:00",
    status: [
      Math.random() > 0.6
        ? "Muvaffaqiyatli"
        : Math.random() > 0.3
        ? "Muvaffaqiysiz"
        : "Kutilmoqda",
    ],
  }));

  const filteredData = filters
    ? allData.filter((item) => {
        const matchUser = item.user
          .toLowerCase()
          .includes(filters.searchUser?.toLowerCase() || "");
        const matchDef = filters.definition
          ? item.definition.includes(filters.definition)
          : true;
        const matchStatus = filters.status
          ? item.status.includes(filters.status)
          : true;
        const matchAmountMin = filters.minAmount
          ? +item.amout >= +filters.minAmount
          : true;
        const matchAmountMax = filters.maxAmount
          ? +item.amout <= +filters.maxAmount
          : true;
        return (
          matchUser &&
          matchDef &&
          matchStatus &&
          matchAmountMin &&
          matchAmountMax
        );
      })
    : allData;

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
              Muvaffaqiyatli: "green",
              Muvaffaqiysiz: "red",
              Kutilmoqda: "orange",
            };
            return (
              <Tag color={colorMap[tag]} key={tag}>
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
        dataSource={filteredData}
        pagination={{
          pageSize: 11,
          showSizeChanger: false,
          align: "center",
          total: filteredData.length,
          showTotal: (total) => `Jami: ${total} foydalanuvchi`,
        }}
        rowKey="id"
      />
    </div>
  );
}
