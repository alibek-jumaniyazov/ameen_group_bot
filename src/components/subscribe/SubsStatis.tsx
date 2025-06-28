import { Table, Tag, type TableProps } from "antd";
import { useNavigate } from "react-router-dom";
import { useSubscriptionStatistics } from "../../hooks/useSubscription";

type SubscriptionStatisticsItem = {
  id: string;
  title: string;
  activeCount: number;
  expiredCount: number;
  total: number;
};

export default function SubsStatis() {
  const { data, isLoading } = useSubscriptionStatistics();
  const navigate = useNavigate();

  const columns: TableProps<SubscriptionStatisticsItem>["columns"] = [
    {
      title: "Tarif nomi",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Faol obunalar",
      dataIndex: "activeCount",
      key: "activeCount",
    },
    {
      title: "Tugagan obunalar",
      dataIndex: "expiredCount",
      key: "expiredCount",
    },
    {
      title: "Umumiy foydalanuvchilar",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Holat",
      dataIndex: "isDeleted",
      key: "isDeleted",
      render: (isDeleted: boolean) => (
        <Tag color={isDeleted ? "red" : "green"}>
          {isDeleted ? "O'chirilgan" : "Active"}
        </Tag>
      ),
    },
  ];

  const tableData: SubscriptionStatisticsItem[] = Array.isArray(data)
    ? data.map((item) => ({
        id: String(item.subscriptionType.id),
        title: item.subscriptionType.title,
        activeCount: item.activeCount,
        expiredCount: item.expiredCount,
        isDeleted: item.subscriptionType.isDeleted,
        total: item.total,
      }))
    : [];

  return (
    <div className="UserInfo">
      <Table<SubscriptionStatisticsItem>
        columns={columns}
        rowKey="id"
        dataSource={tableData}
        loading={isLoading}
        pagination={false}
        onRow={(record) => ({
          onClick: () => {
            navigate(
              `/subscription-statistics?title=${record.title}&id=${record.id}`
            );
          },
        })}
      />
    </div>
  );
}
