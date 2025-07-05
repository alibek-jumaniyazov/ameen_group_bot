import { Table, Tag, type TableProps } from "antd";
import { useUserMessageById } from "../../hooks/useMessage";
import type {
  Message,
  MessageUserId,
  MessageUserIdText,
} from "../../api/messageApi";

interface DataType {
  id: string;
  createdAt: string;
  message: MessageUserIdText[];
  status: string;
}

export default function SentMessage({
  userId,
}: {
  userId: string | undefined;
}) {
  const { data, isLoading } = useUserMessageById(Number(userId));
  console.log(data);

  const allData: DataType[] =
    data?.data.map((item: MessageUserId) => ({
      id: item.id.toString(),
      createdAt: item.createdAt,
      message: item.message.text,
      status: item.status,
    })) || [];

  const columns: TableProps<DataType>["columns"] = [
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "Yuborilgan vaqt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) =>
        new Date(date).toLocaleString("uz-UZ", {
          timeZone: "Asia/Tashkent",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
    },
    { title: "Matni", dataIndex: "message", key: "message" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let color: string = "default";
        let label = "Yuborilmadi";

        if (status === "DELIVERED") {
          color = "blue";
          label = "Yuborildi";
        } else if (status === "READ") {
          color = "green";
          label = "O'qildi";
        } else {
          color = "red";
          label = "Yuborilmadi";
        }

        return <Tag color={color}>{label}</Tag>;
      },
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
