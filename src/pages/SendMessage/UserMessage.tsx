import { Card, Table, Typography, Tag } from "antd";
import { useParams } from "react-router-dom";
import {
  useMessageById,
  useUserMessagesByStatus,
} from "../../hooks/useMessage";
import { UserApi, type User } from "../../api/userApi";
import { useEffect, useState } from "react";
import type { MessageUser } from "../../api/messageApi";

const { Title, Paragraph } = Typography;

export default function UserMessage() {
  const { id } = useParams<{ id: string }>();
  const messageId = Number(id);
  const [userMap, setUserMap] = useState<Record<number, User>>({});

  const { data: messageData, isLoading: isLoadingMessage } =
    useMessageById(messageId);

  const { data: userMessages = [], isLoading: isLoadingStatus } =
    useUserMessagesByStatus({}) as unknown as {
      data: MessageUser[];
      isLoading: boolean;
    };

  const filteredUserMessages = userMessages.filter(
    (item) => item.messageId === messageId
  );

  useEffect(() => {
    const fetchUsers = async () => {
      const ids = filteredUserMessages.map((um) => um.userId);
      const uniqueIds = Array.from(new Set(ids));
      const userPromises = uniqueIds.map((id) => UserApi.getById(id));
      const userDataList = await Promise.all(userPromises);
      const map: Record<number, User> = {};
      userDataList.forEach((user) => {
        map[user.id] = user;
      });
      setUserMap(map);
    };

    if (filteredUserMessages.length > 0) {
      fetchUsers();
    }
  }, [filteredUserMessages]);

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <Title level={4}>Xabar tafsilotlari</Title>
        <Paragraph>
          <strong>Matn:</strong>
          <div dangerouslySetInnerHTML={{ __html: messageData?.text || "" }} />
        </Paragraph>
        <Paragraph>
          <strong>Yaratilgan vaqt:</strong>{" "}
          {new Date(messageData?.createdAt || "").toLocaleString()}
        </Paragraph>
      </Card>

      <Card title="Xabar yuborilgan foydalanuvchilar">
        <Table
          loading={isLoadingMessage || isLoadingStatus}
          dataSource={filteredUserMessages}
          rowKey="id"
          columns={[
            {
              title: "Foydalanuvchi",
              dataIndex: "userId",
              key: "userId",
              render: (userId: number) => {
                const user = userMap[userId];
                return user
                  ? `${user.firstName} ${user.lastName} (${user.phoneNumber})`
                  : `ID: ${userId}`;
              },
            },
            {
              title: "Telegram",
              key: "telegram",
              render: (_, record) => {
                const user = userMap[record.userId];
                return user?.username ? `@${user.username}` : "-";
              },
            },
            {
              title: "Status",
              dataIndex: "status",
              key: "status",
              render: (status: string) => {
                let color: string = "default";
                if (status === "DELIVERED") color = "blue";
                else if (status === "READ") color = "green";
                else color = "red";
                return <Tag color={color}>{status}</Tag>;
              },
            },
            {
              title: "Yuborilgan vaqt",
              dataIndex: "createdAt",
              key: "createdAt",
              render: (date: string) => new Date(date).toLocaleString(),
            },
          ]}
        />
      </Card>
    </div>
  );
}
