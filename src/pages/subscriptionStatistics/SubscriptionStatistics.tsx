import { Modal, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { useState } from "react";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Icons } from "../../assets/icons";
import EditUserModal from "../../components/users/EditUserModal";
import { useLocation } from "react-router-dom";

interface DataType {
  key: string;
  name: string;
  lastName: string;
  phone: number;
  email: string;
  active: string;
  subscribe: string[];
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SubscriptionStatisticsTabs() {
  const [selectedTab, setSelectedTab] = useState<"faol" | "tugagan" | "umumiy">(
    "faol"
  );
  const [open, setOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<DataType | null>(null);

  const query = useQuery();
  const definition = query.get("definition");

  const showDeleteConfirm = () => {
    Modal.confirm({
      title: "Ushbu foydalanuvchini o'chirmoqchimisiz?",
      icon: <QuestionCircleOutlined style={{ color: "red" }} />,
      okText: "Ha",
      okType: "danger",
      cancelText: "Yo'q",
      onOk() {
        console.log("O'chirildi");
      },
    });
  };

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  const allData: DataType[] = Array.from({ length: 30 }, (_, i) => ({
    key: (i + 1).toString(),
    name: "Alibek",
    lastName: "Jumaniyazov",
    phone: 886003230 + i,
    email: `alibek00${i + 1}@gmail.com`,
    active: "2025.06.19 17:19",
    subscribe: [Math.random() > 0.5 ? "Aktiv" : "Deaktiv"],
  }));

  const filteredData =
    selectedTab === "faol"
      ? allData.filter((item) => item.subscribe.includes("Aktiv"))
      : selectedTab === "tugagan"
      ? allData.filter((item) => item.subscribe.includes("Deaktiv"))
      : allData;

  const columns: TableProps<DataType>["columns"] = [
    { title: "Id", dataIndex: "key", key: "key" },
    { title: "Ism", dataIndex: "name", key: "name" },
    { title: "Familiya", dataIndex: "lastName", key: "lastName" },
    { title: "Telefon", dataIndex: "phone", key: "phone" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Oxirgi aktivlik", dataIndex: "active", key: "active" },
    {
      title: "Obuna",
      key: "subscribe",
      dataIndex: "subscribe",
      render: (_, record) =>
        record.subscribe.map((tag) => (
          <Tag color={tag === "Aktiv" ? "green" : "red"} key={tag}>
            {tag.toUpperCase()}
          </Tag>
        )),
    },
    {
      title: "Amal",
      key: "action",
      render: () => (
        <div className="flex items-center gap-4">
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

  return (
    <div className="SubscriptionStatisticsTabs">
      <div className="w-full flex justify-between items-center mb-4">
        <h1 className="font-semibold text-[20px] text-start mb-4">
          {definition || "Noma'lum"} tarifi
        </h1>
        <div className=" flex justify-end items-center mb-4">
          <div className="flex bg-[#eef3fe] rounded-lg overflow-hidden p-[4px]">
            <button
              onClick={() => setSelectedTab("faol")}
              className={`px-4 py-2 text-sm font-medium ${
                selectedTab === "faol"
                  ? "bg-[#528af9] text-white rounded-[6px] cursor-pointer"
                  : "text-gray-600 cursor-pointer"
              }`}
            >
              Faol obunalar
            </button>
            <button
              onClick={() => setSelectedTab("tugagan")}
              className={`px-4 py-2 text-sm font-medium ${
                selectedTab === "tugagan"
                  ? "bg-[#528af9] text-white rounded-[6px] cursor-pointer"
                  : "text-gray-600 cursor-pointer"
              }`}
            >
              Tugagan obunalar
            </button>
            <button
              onClick={() => setSelectedTab("umumiy")}
              className={`px-4 py-2 text-sm font-medium ${
                selectedTab === "umumiy"
                  ? "bg-[#528af9] text-white rounded-[6px] cursor-pointer"
                  : "text-gray-600 cursor-pointer"
              }`}
            >
              Umumiy foydalanuvchilar
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-6 text-sm text-[#92959C] mb-4">
        <p>
          Total active:
          <span className="text-[#1D9629]">
            {allData.filter((d) => d.subscribe.includes("Aktiv")).length}
          </span>
        </p>
        <p>
          Total deactive:
          <span className="text-[#D52A2A]">
            {allData.filter((d) => d.subscribe.includes("Deaktiv")).length}
          </span>
        </p>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ showSizeChanger: false }}
        onRow={(record) => ({
          onClick: () => {
            setSelectedRecord(record);
            setOpen(true);
          },
        })}
      />

      <EditUserModal onClose={onClose} open={open} record={selectedRecord} />
    </div>
  );
}
