import { Table, type TableProps } from "antd";
import { useTransactionUserPaymentHistoryById } from "../../hooks/useTransaction";
import dayjs from "dayjs";

interface DataType {
  id: string;
  price: string;
  date: string;
  status: string;
}

export default function UserPaymentHistory({
  userId,
}: {
  userId: string | undefined;
}) {
  const { data, isLoading } = useTransactionUserPaymentHistoryById(userId);
  console.log(data);

  const allData: DataType[] = data?.data.map((item) => ({
    id: item.id,
    price: `${item.price?.toString()} so'm`,
    date: new Date(item.createdAt).toISOString(),
    status: item.status == "Paid" ? "Muvaffaqiyatli" : "Muvaffaqiysiz",
  }));

  const columns: TableProps<DataType>["columns"] = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Summasi", dataIndex: "price", key: "price" },
    {
      title: "Sanasi",
      dataIndex: "date",
      key: "date",
      render: (date: string) => dayjs(date).format("YYYY-MM-DD HH:mm"),
    },
    { title: "Holati", dataIndex: "status", key: "status" },
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
          total: data?.data.length,
          showTotal: (total) => `Jami: ${total} to'lov ro'yxati`,
        }}
        rowKey="id"
      />
    </div>
  );
}
