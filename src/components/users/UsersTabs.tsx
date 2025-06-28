import { message, Modal, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { Icons } from "../../assets/icons";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import EditUserModal from "./EditUserModal";
import { useNavigate } from "react-router-dom";
import { useDeleteUser, useUsers } from "../../hooks/useUser";
import dayjs from "dayjs";

export interface Subscription {
  id: number;
  userId: number;
  expiredDate: string;
  startDate: string;
  alertCount: number;
  price: number;
  paymentType: "STRIPE" | "CLICK" | "PAYME" | string;
  status: "Created" | "Active" | "Expired" | string;
  subscriptionTypeId: number;
  createdAt: string;
  updatedAt: string;
  transactionId: string | null;
}

interface DataType {
  id: number;
  telegramId: string;
  username: string;
  firstName: string;
  lastName: string;
  lastActiveAt: string;
  lastMessageAt: string;
  phoneNumber: string;
  inGroup: boolean;
  email: string | null;
  status: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  subscription: Subscription[];
}
export default function UsersTabs({ search }: { search: string }) {
  const { data } = useUsers();
  const { confirm } = Modal;
  const deleteUser = useDeleteUser();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<DataType | null>(null);

  console.log(data);

  const filteredData = data?.data?.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return (
      user.id.toString().includes(search) ||
      fullName.includes(search.toLowerCase()) ||
      user.phoneNumber.includes(search)
    );
  });

  const showDeleteConfirm = (id: number) => {
    confirm({
      title: "Ushbu Mijozni o'chirmoqchimisiz?",
      icon: <QuestionCircleOutlined style={{ color: "red" }} />,
      okText: "Ha",
      okType: "danger",
      cancelText: "Yo'q",
      onOk() {
        handleDelete(id);
      },
      onCancel() {
        console.log("Bekor qilindi");
      },
    });
  };

  const handleDelete = (id: number) => {
    if (!id) return;
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

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Ism",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Familiya",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Telefon",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Oxirgi faollik",
      dataIndex: "lastActiveAt",
      key: "lastActiveAt",
      render: (value: string) =>
        value ? dayjs(value).format("YYYY.MM.DD HH:mm") : "-",
    },
    {
      title: "Obuna",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "REGISTERED" ? "red" : "green"}>
          {status === "REGISTERED" ? "DEAKTIV" : "AKTIV"}
        </Tag>
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex justify-start items-center gap-6">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedRecord(record);
              setOpen(true);
            }}
          >
            <Icons.pencil />
          </button>
          <button
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

  const onClose = () => {
    setOpen(false);
  };
  const activeCount =
    filteredData?.filter((user) => user.status !== "REGISTERED").length || 0;
  const deactiveCount =
    filteredData?.filter((user) => user.status === "REGISTERED").length || 0;
  return (
    <div className="UsersTabs !w-full">
      <div className="flex justify-start items-center gap-4 mb-4">
        <p className="font-normal text-sm text-[#92959C] leading-5">
          Total active: <span className="text-[#1D9629]">{activeCount}</span>
        </p>
        <p className="font-normal text-sm text-[#92959C] leading-5">
          Total deactive:{" "}
          <span className="text-[#D52A2A]">{deactiveCount}</span>
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <Table<DataType>
          columns={columns}
          dataSource={filteredData}
          pagination={{
            showSizeChanger: false,
            align: "center",
          }}
          onRow={(record) => {
            return {
              onClick: () => {
                setSelectedRecord(record);
                navigate(`/user/${record.id}`);
              },
            };
          }}
        />
      </div>
      <EditUserModal onClose={onClose} open={open} record={selectedRecord} />
    </div>
  );
}
