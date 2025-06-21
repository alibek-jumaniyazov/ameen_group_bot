import { Button, Modal, Pagination, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { Icons } from "../../assets/icons";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import EditUserModal from "./EditUserModal";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../context/ApiContext";

export default function UsersTabs() {
  const { data } = useApi();
  const { confirm } = Modal;
  const navigate = useNavigate();

  const showDeleteConfirm = () => {
    confirm({
      title: "Ushbu foydalanuvchini o'chirmoqchimisiz?",
      icon: <QuestionCircleOutlined style={{ color: "red" }} />,
      okText: "Ha",
      okType: "danger",
      cancelText: "Yo'q",
      onOk() {
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  interface DataType {
    key: string;
    name: string;
    lastName: string;
    phone: number;
    email: string;
    active: string;
    subscribe: string[];
  }

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Id",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Ism",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Familiya",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Telefon",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "active",
      dataIndex: "active",
      key: "active",
    },
    {
      title: "Obuna",
      key: "subscribe",
      dataIndex: "subscribe",
      render: (_, record: DataType) => (
        <>
          {record.subscribe.map((tag) => {
            const colorMap: Record<string, string> = {
              Aktiv: "green",
              Deaktiv: "red",
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
      title: "Action",
      key: "action",
      render: (_) => (
        <div className="flex justify-start items-center gap-6">
          <button onClick={showDrawer}>
            <Icons.pencil />
          </button>
          <button onClick={showDeleteConfirm}>
            <Icons.delete />
          </button>
        </div>
      ),
    },
  ];

  const [open, setOpen] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<DataType | null>(null);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="UsersTabs !w-full">
      <div className="flex justify-start items-center gap-4 mb-4">
        <p className="font-normal text-sm text-[#92959C] leading-5">
          Total active: <span className="text-[#1D9629]">100</span>
        </p>
        <p className="font-normal text-sm text-[#92959C] leading-5">
          Total deactive: <span className="text-[#D52A2A]">100</span>
        </p>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <Table<DataType>
          columns={columns}
          dataSource={data}
          pagination={{
            showSizeChanger: false,
            align: "center",
          }}
          onRow={(record) => {
            return {
              onClick: () => {
                setSelectedRecord(record);
                navigate(`/user/${record.key}`);
              },
            };
          }}
        />
      </div>
      <EditUserModal onClose={onClose} open={open} record={selectedRecord} />
    </div>
  );
}
