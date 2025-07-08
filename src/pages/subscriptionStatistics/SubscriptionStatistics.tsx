// pages/SubscriptionStatisticsTabs.tsx
import { message, Modal, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { Icons } from "../../assets/icons";
import { QuestionCircleOutlined } from "@ant-design/icons";
import EditUserModal from "../../components/users/EditUserModal";
import { useDeleteUser, useUsersBySubscriptionId } from "../../hooks/useUser";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SubscriptionStatisticsTabs() {
  const [selectedTab, setSelectedTab] = useState<"faol" | "tugagan" | "umumiy">(
    "faol"
  );
  const [open, setOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  const query = useQuery();
  const subscriptionTypeId = query.get("id") ?? "";
  const title = query.get("title");
  const subscriptionStatus = useMemo(() => {
    if (selectedTab === "faol") return "SUBSCRIBED";
    if (selectedTab === "tugagan") return "EXPIRED";
    return undefined;
  }, [selectedTab]);

  const { data, isLoading } = useUsersBySubscriptionId(
    subscriptionTypeId,
    subscriptionStatus
  );
  const users = data?.data || [];

  const deleteUser = useDeleteUser();
  const onClose = () => setOpen(false);

  const showDeleteConfirm = (id: number) => {
    Modal.confirm({
      title: "Ushbu mijozni o'chirmoqchimisiz?",
      icon: <QuestionCircleOutlined style={{ color: "red" }} />,
      okText: "Ha",
      okType: "danger",
      cancelText: "Yo'q",
      onOk: () => handleDelete(id),
    });
  };

  const handleDelete = (id: number) => {
    deleteUser.mutate(id, {
      onSuccess: () => {
        message.success("Mijoz o‘chirildi");
        onClose();
      },
      onError: () => {
        message.error("O‘chirishda xatolik yuz berdi");
      },
    });
  };

  const columns: TableProps<any>["columns"] = [
    { title: "Id", dataIndex: "id", key: "id" },
    { title: "Ism", dataIndex: "firstName", key: "firstName" },
    { title: "Familiya", dataIndex: "lastName", key: "lastName" },
    { title: "Telefon", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Oxirgi aktivlik",
      dataIndex: "lastActiveAt",
      key: "lastActiveAt",
      render: (value) =>
        value ? dayjs(value).format("YYYY.MM.DD HH:mm") : "-",
    },
    {
      title: "Holat",
      key: "subscriptionStatus",
      render: (_, user) => {
        const tag =
          new Date(
            user.subscription.find(
              (sub: any) => sub.subscriptionTypeId == subscriptionTypeId
            ).expiredDate
          ).getTime() > Date.now()
            ? "Aktiv"
            : "Deaktiv";
        return (
          <Tag
            color={
              new Date(
                user.subscription.find(
                  (sub: any) => sub.subscriptionTypeId == subscriptionTypeId
                ).expiredDate
              ).getTime() > Date.now()
                ? "green"
                : "red"
            }
          >
            {tag}
          </Tag>
        );
      },
    },
    {
      title: "Amal",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center gap-4">
          <button
            className="cursor-pointer"
            onClick={() => {
              setSelectedRecord(record);
              setOpen(true);
            }}
          >
            <Icons.pencil />
          </button>
          <button
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              showDeleteConfirm(record.id);
            }}
          >
            <Icons.delete />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-[20px] font-semibold">
          {title?.toUpperCase()} tarif mijozlari
        </h1>
        <div className="flex bg-[#eef3fe] rounded-lg overflow-hidden p-[4px]">
          {["faol", "tugagan", "umumiy"].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedTab(type as any)}
              className={`px-4 py-2 text-sm font-medium cursor-pointer ${
                selectedTab === type
                  ? "bg-[#528af9] text-white rounded-[6px]"
                  : "text-gray-600"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)} obunalar
            </button>
          ))}
        </div>
      </div>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={users}
        loading={isLoading}
        pagination={false}
        onRow={(record) => ({
          onClick: () => {
            setSelectedRecord(record);
            setOpen(true);
          },
        })}
      />

      <EditUserModal open={open} onClose={onClose} record={selectedRecord} />
    </div>
  );
}
