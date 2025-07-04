import { Table, type TableProps } from "antd";
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import { useMessages } from "../../hooks/useMessage";
import type { MessageQueryParams, Message } from "../../api/messageApi";
import { useNavigate } from "react-router-dom";

interface SendMessageTableProps {
  filters?: {
    searchUser?: string;
    date?: string;
    status?: string;
  };
}

export default function SendMessageTable({ filters }: SendMessageTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const queryParams: MessageQueryParams = useMemo(() => {
    const params: MessageQueryParams = {
      page: currentPage,
      limit: pageSize,
    };
    if (filters?.searchUser) params.text = filters.searchUser;
    if (filters?.status && filters.status !== " ")
      params.status = filters.status;
    return params;
  }, [filters, currentPage, pageSize]);

  const { data, isLoading } = useMessages(queryParams);

  const messages = Array.isArray(data) ? data : data?.data || [];
  const total = data?.total || messages.length;

  const columns: TableProps<Message>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Matn",
      dataIndex: "text",
      key: "text",
      render: (text: string) => (
        <div dangerouslySetInnerHTML={{ __html: text }} />
      ),
    },
    {
      title: "Sana va vaqt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => dayjs(date).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "Qabul qiluvchilar soni",
      dataIndex: "users",
      key: "users",
    
    },
  ];
  console.log(messages);
  const navigate = useNavigate();
  return (
    <Table
      columns={columns}
      dataSource={messages}
      loading={isLoading}
      onRow={(record) => ({
        onClick: () => navigate(`/send-message/${record.id}`),
      })}
      pagination={{
        current: currentPage,
        pageSize: pageSize,
        total: total,
        onChange: (page) => setCurrentPage(page),
        showTotal: (total) => `Jami: ${total} ta yuborilgan xabar`,
        showSizeChanger: false,
      }}
      rowKey="id"
    />
  );
}
