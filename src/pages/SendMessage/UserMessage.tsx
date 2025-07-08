import { Card, Table, Typography, Tag } from "antd";
import { useParams } from "react-router-dom";
import {
  useMessageById,
  useUserMessagesByStatus,
} from "../../hooks/useMessage";
import { UserApi, type User } from "../../api/userApi";
import { useEffect, useMemo, useState } from "react";
import type { MessageUser } from "../../api/messageApi";
import MarkdownPreview from "@uiw/react-markdown-preview";

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

  const filteredUserMessages = useMemo(() => {
    return (userMessages || []).filter((item) => item.messageId === messageId);
  }, [userMessages, messageId]);

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
          <div className="mt-2" data-color-mode="light">
            <MarkdownPreview
              source={messageData?.text || "_Bo'sh matn_"}
              style={{
                background: "transparent",
                padding: 0,
                color: "black",
              }}
            />
          </div>
        </Paragraph>

        <Paragraph>
          <strong>Yaratilgan vaqt:</strong>{" "}
          {new Date(messageData?.createdAt || "").toLocaleString("uz-UZ", {
            timeZone: "Asia/Tashkent",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
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
          ]}
        />
      </Card>
    </div>
  );
}
