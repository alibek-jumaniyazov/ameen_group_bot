import { Table, Tag, type TableProps } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

interface DataType {
  id: string;
  user: string;
  definition: string[];
  amout: string;
  date: string;
  status: string[];
  error: string[];
}

export default function AutoPaymentTable({ filters }: { filters: any }) {
  const navigate = useNavigate();

  const allData: DataType[] = Array.from({ length: 30 }, (_, i) => ({
    id: (i + 1).toString(),
    user: "Alibek Jumaniyazov",
    definition: [Math.random() > 0.5 ? "Premium" : "Boshlang’ich"],
    amout: `${Math.floor(Math.random() * 500000 + 50000)} so'm`,
    date: "2025/06/25",
    status: [Math.random() > 0.5 ? "Muvaffaqiyatli" : "Xato"],
    error: [Math.random() > 0.5 ? "Yechildi" : "Kartada mablag' yetarli emas"],
  }));

  const filteredData = allData.filter((item) => {
    const userMatch = filters?.searchUser
      ? item.user.toLowerCase().includes(filters.searchUser.toLowerCase()) ||
        item.id.includes(filters.searchUser)
      : true;

    const defMatch = filters?.definition
      ? item.definition.includes(filters.definition)
      : true;

    const statusMatch = filters?.status
      ? item.status.includes(filters.status)
      : true;

    const errorMatch = filters?.error
      ? item.error.includes(filters.error)
      : true;

    const minAmountMatch = filters?.minAmount
      ? parseInt(item.amout.replace(/\D/g, "")) >= +filters.minAmount
      : true;

    const maxAmountMatch = filters?.maxAmount
      ? parseInt(item.amout.replace(/\D/g, "")) <= +filters.maxAmount
      : true;

    const dateMatch = filters?.date
      ? dayjs(item.date).format("YYYY/MM/DD") === filters.date
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
    {
      title: "Tarif",
      dataIndex: "definition",
      key: "definition",
      render: (def) => def[0],
    },
    { title: "Summa", dataIndex: "amout", key: "amout" },
    { title: "Sana", dataIndex: "date", key: "date" },
    {
      title: "Holati",
      dataIndex: "status",
      key: "status",
      render: (status: string[]) =>
        status.map((tag) => (
          <Tag color={tag === "Muvaffaqiyatli" ? "green" : "red"} key={tag}>
            {tag}
          </Tag>
        )),
    },
    {
      title: "Xato sababi",
      dataIndex: "error",
      key: "error",
      render: (error: string[]) => error.join(", "),
    },
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
