import { Spin, Table, Tag, type TableProps } from "antd";
import { useUserSubscriptionById } from "../../hooks/useSubscriptionPayment";
import type { SubscriptionPaymentUserID } from "../../api/subscriptionPaymentApi";
import dayjs from "dayjs";

interface DataType {
  id: string;
  definition: string[];
  startDate: string;
  endDate: string[];
  status: string[];
  days: number;
}

export default function SubscriptionList({
  userId,
}: {
  userId: string | undefined;
}) {
  const { data, isLoading } = useUserSubscriptionById(Number(userId));
  console.log(data);

  const allData: DataType[] =
    data?.data.map((item: SubscriptionPaymentUserID) => ({
      id: item.id.toString(),
      definition: [item.subscriptionType?.title || "Noma'lum"],
      amout: `${item.subscriptionType?.price || 0}`,
      startDate: dayjs(item.startDate).format("YYYY-MM-DD"),
      endDate: dayjs(item.expiredDate).format("YYYY-MM-DD"),
      status: [item.status === "ACTIVE" ? "Faol" : "Tugagan"],
      days: `${item.days} Kun`,
    })) || [];

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
      dataIndex: "days",
      key: "days",
      render: (_, record: DataType) => (
        <>
          {record.days.map((tag) => {
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
      <Spin spinning={isLoading}>
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
      </Spin>
    </div>
  );
}
