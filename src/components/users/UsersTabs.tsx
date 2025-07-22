import { Table, Tag } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import EditUserModal from "./EditUserModal";
import { useNavigate } from "react-router-dom";
import {  useUsers } from "../../hooks/useUser";
import { Icons } from "../../assets/icons";

interface DataType {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string | null;
  lastActiveAt: string;
  status: string;
  definition: string;
}

export default function UsersTabs({
  filters,
}: {
  search: string;
  filters: any;
}) {
  const { data, isLoading } = useUsers();
  // const deleteUser = useDeleteUser();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<DataType | null>(null);
  console.log(data);

  const allData: DataType[] =
    data?.data.map((item) => ({
      id: item.id,
      firstName: item.firstName,
      lastName: item.lastName,
      phoneNumber: item.phoneNumber,
      email: item.email,
      lastActiveAt: item.lastActiveAt,
      status: item.status,
      definition: item.subscriptionTitle || "Noma'lum",
    })) || [];

  const filteredData = allData.filter((item) => {
    const matchUser = filters?.searchUser
      ? item.firstName
          .toLowerCase()
          .includes(filters.searchUser.toLowerCase()) ||
        item.id.toString().includes(filters.searchUser)
      : true;

    const matchDef = filters?.definition
      ? item.definition === filters.definition
      : true;

    const matchStatus = filters?.status ? item.status === filters.status : true;

    const matchDate = filters?.date
      ? dayjs(item.lastActiveAt).format("YYYY-MM-DD HH:mm") === filters.date
      : true;

    return matchUser && matchDef && matchStatus && matchDate;
  });

  // const showDeleteConfirm = (id: number) => {
  //   Modal.confirm({
  //     title: "Ushbu mijozni o'chirmoqchimisiz?",
  //     icon: <QuestionCircleOutlined style={{ color: "red" }} />,
  //     okText: "Ha",
  //     okType: "danger",
  //     cancelText: "Yo'q",
  //     onOk() {
  //       handleDelete(id);
  //     },
  //     onCancel() {
  //       console.log("O'chirish bekor qilindi");
  //     },
  //   });
  // };

  // const handleDelete = (id: number) => {
  //   if (!id) return;
  //   deleteUser.mutate(id, {
  //     onSuccess: () => {
  //       message.success("Mijoz o'chirildi");
  //     },
  //     onError: () => {
  //       message.error("O'chirishda xatolik yuz berdi");
  //     },
  //   });
  // };

  const columns = [
    { title: "Id", dataIndex: "id", key: "id" },
    { title: "Ism", dataIndex: "firstName", key: "firstName" },
    { title: "Familiya", dataIndex: "lastName", key: "lastName" },
    { title: "Telefon", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Email", dataIndex: "email", key: "email" },
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
      render: (_: any, record: DataType) => (
        <div className="flex justify-start items-center gap-6">
          <button
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedRecord(record);
              setOpen(true);
            }}
          >
            <Icons.pencil />
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

      <Table
        columns={columns}
        loading={isLoading}
        dataSource={filteredData}
        rowKey="id"
        pagination={{ showSizeChanger: false, align: "center" }}
        onRow={(record) => ({
          onClick: () => {
            setSelectedRecord(record);
            navigate(`/user/${record.id}`);
          },
        })}
      />
      <EditUserModal onClose={onClose} open={open} record={selectedRecord} />
    </div>
  );
}
