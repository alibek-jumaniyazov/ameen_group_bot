import { Button, Modal, Pagination, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { Icons } from "../../assets/icons";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import EditUserModal from "./EditUserModal";

export default function UsersTabs() {
  const { confirm } = Modal;
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
    surname: string;
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
      dataIndex: "surname",
      key: "surname",
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

  const data: DataType[] = Array.from({ length: 20 }, (_, i) => ({
    key: (i + 1).toString(),
    name: "Alibek",
    surname: "Jumaniyazov",
    phone: 886003230 + i,
    email: `alibek${i + 1}@gmail.com`,
    active: "2025.06.19 17:19",
    subscribe: [Math.random() > 0.5 ? "Aktiv" : "Deaktiv"],
  }));

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="UsersTabs !w-full">
      <div className="flex flex-col gap-4 w-full">
        <Table<DataType>
          columns={columns}
          dataSource={data}
          pagination={{
            showSizeChanger: false,
            align: "center",
          }}
          onRow={() => setOpen(true)}
        />
      </div>
      <EditUserModal onClose={onClose} open={open} />
    </div>
  );
}
