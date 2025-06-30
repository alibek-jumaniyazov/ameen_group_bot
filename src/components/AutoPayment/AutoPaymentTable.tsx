import { Table, Tag, type TableProps } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import type { Transaction } from "../../api/transactionApi";

interface DataType {
  id: string;
  user: string;
  definition: string;
  amout: string;
  date: string;
  status: string;
  error: string;
}

export default function AutoPaymentTable({
  filters,
  data,
}: {
  filters: any;
  data: Transaction[];
}) {
  const navigate = useNavigate();

  const allData: DataType[] = data.map((item) => {
    const isPaid = item.status === "Paid";
    return {
      id: item.id.toString(),
      user: `${item.user?.firstName || ""} ${item.user?.lastName || ""}`,
      definition: item.subscriptionType?.title || "Noma'lum",
      amout: `${item.price?.toString()} so'm`,
      date: dayjs(item.createdAt).format("YYYY-MM-DD"),
      status: isPaid ? "Muvaffaqiyatli" : "Xato",
      error: isPaid ? "Yechildi" : "Kartada mablag' yetarli emas",
    };
  });

  const filteredData = allData.filter((item) => {
    const userMatch = filters?.searchUser
      ? item.user.toLowerCase().includes(filters.searchUser.toLowerCase()) ||
        item.id.includes(filters.searchUser)
      : true;

    const defMatch = filters?.definition
      ? item.definition === filters.definition
      : true;

    const statusMatch = filters?.status ? item.status === filters.status : true;

    const errorMatch = filters?.error ? item.error === filters.error : true;

    const amount = parseInt(item.amout.replace(/\D/g, ""));

    const minAmountMatch = filters?.minAmount
      ? amount >= Number(filters.minAmount)
      : true;

    const maxAmountMatch = filters?.maxAmount
      ? amount <= Number(filters.maxAmount)
      : true;

    const dateMatch = filters?.date
      ? dayjs(item.date).isSame(filters.date, "day")
      : true;

    return (
      userMatch &&
      defMatch &&
      statusMatch &&
      errorMatch &&
      minAmountMatch &&
      maxAmountMatch &&
      dateMatch
    );
  });

  const columns: TableProps<DataType>["columns"] = [
    { title: "To‘lov ID", dataIndex: "id", key: "id" },
    { title: "Foydalanuvchi", dataIndex: "user", key: "user" },
    { title: "Tarif", dataIndex: "definition", key: "definition" },
    { title: "Summa", dataIndex: "amout", key: "amout" },
    { title: "Sana", dataIndex: "date", key: "date" },
    {
      title: "Holati",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Muvaffaqiyatli" ? "green" : "red"}>
          {status}
        </Tag>
      ),
    },
    { title: "Xato sababi", dataIndex: "error", key: "error" },
  ];

  return (
    <Table
      columns={columns}
      dataSource={filteredData}
      pagination={{
        pageSize: 10,
        showSizeChanger: false,
        total: filteredData.length,
        showTotal: (total) => `Jami: ${total} foydalanuvchi`,
      }}
      rowKey="id"
      onRow={(record) => ({
        onClick: () => navigate(`/user-payment/${record.id}`),
      })}
    />
  );
}
