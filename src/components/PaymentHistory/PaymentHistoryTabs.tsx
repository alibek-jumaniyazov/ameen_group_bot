import { Table, Tag, type TableProps } from "antd";
import type { Transaction } from "../../api/transactionApi";

interface DataType {
  id: string;
  user: string;
  definition: string[];
  amout: string;
  date: string;
  status: string[];
}

export default function PaymentHistoryTabs({
  filters,
  data,
}: {
  filters: any;
  data: Transaction[];
}) {
  const allData: DataType[] = data
    .filter((item) => item.status === "Paid")
    .map((item) => ({
      id: item.id.toString(),
      user: `${item.user?.firstName || ""} ${item.user?.lastName || ""}`,
      definition: [item.subscriptionType?.title || "Noma'lum"],
      amout: `${item.price?.toString()} so'm`,
      date: new Date(item.createdAt).toLocaleString("uz-UZ"),
      status: ["Muvaffaqiyatli"],
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
