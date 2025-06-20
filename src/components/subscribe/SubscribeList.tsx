import { Table, Tag, type TableProps } from "antd";
import { Icons } from "../../assets/icons";
import EditDefnModal from "./EditDefnModal";
import { useState } from "react";

export default function SubscribeList() {
  interface DataType {
    key: string;
    definition: string;
    price: string;
    term: string;
    features: string;
    status: string[];
  }

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Tarif nomi",
      dataIndex: "definition",
      key: "definition",
    },
    {
      title: "Narxi",
      dataIndex: "price",
      key: "price",
      render: (price) => price || "-",
    },
    {
      title: "Muddati",
      dataIndex: "term",
      key: "term",
    },
    {
      title: "Xususiyatlar",
      dataIndex: "features",
      key: "features",
    },
    {
      title: "Holati",
      key: "status",
      dataIndex: "status",
      render: (_, record: DataType) => (
        <>
          {record.status.map((tag) => {
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
      render: () => (
        <div className="flex justify-start items-center gap-2">
          <button onClick={() => setOpen(true)}>
            <Icons.pencilY />
          </button>
          <button>
            <Icons.delete />
          </button>
        </div>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      definition: "Boshlang’ich",
      price: "50.000 so’m",
      term: "1 oylik",
      features: "100 xabar, asosiy xizmatlar",
      status: ["Aktiv"],
    },
    {
      key: "2",
      definition: "Premium",
      price: "100.000 so’m",
      term: "1 oylik",
      features: "Cheksiz xabar, premium xizmatlar",
      status: ["Aktiv"],
    },
    {
      key: "3",
      definition: "Biznes",
      price: "200.000 so’m",
      term: "1 oylik",
      features: "Barcha xizmatlar",
      status: ["Aktiv"],
    },
  ];
  const [open, setOpen] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<DataType | null>(null);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="SubscribeList">
      <Table<DataType>
        columns={columns}
        dataSource={data}
        pagination={false}
        onRow={(record) => {
          return {
            onClick: () => {
              setSelectedRecord(record);
              setOpen(true);
            },
          };
        }}
      />
      <EditDefnModal onClose={onClose} open={open} record={selectedRecord} />
    </div>
  );
}
