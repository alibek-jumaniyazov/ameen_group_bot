import { message, Modal, Table, type TableProps } from "antd";
import { Icons } from "../../assets/icons";
import EditDefnModal from "./EditDefnModal";
import { useState } from "react";
import type { SubscriptionType } from "../../api/subscriptionApi";
import { useDeleteSubscription } from "../../hooks/useSubscription";
import { QuestionCircleOutlined } from "@ant-design/icons";

export default function SubscribeList({
  data,
  isLoading,
}: {
  data: SubscriptionType[];
  isLoading: boolean;
}) {
  const deleteSubscription = useDeleteSubscription();

  const showDeleteConfirm = (id: number) => {
    Modal.confirm({
      title: "Ushbu Ta'rif o'chirmoqchimisiz?",
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
    deleteSubscription.mutate(id, {
      onSuccess: () => {
        message.success("Ta'rif o‘chirildi");
        onClose();
      },
      onError: () => {
        message.error("O‘chirishda xatolik yuz berdi");
      },
    });
  };

  const columns: TableProps<SubscriptionType>["columns"] = [
    {
      title: "Tarif nomi",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Narxi",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `${price.toLocaleString()} so'm`,
    },
    {
      title: "Muddati",
      dataIndex: "expireDays",
      key: "expireDays",
      render: (days: number) => `${days} kun`,
    },
    {
      title: "Xususiyatlar",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex justify-start items-center gap-2">
          <button
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedRecord(record);
              setOpen(true);
            }}
          >
            <Icons.pencilY />
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

  const [open, setOpen] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<SubscriptionType | null>(
    null
  );

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="SubscribeList">
      <Table<SubscriptionType>
        columns={columns}
        dataSource={data}
        loading={isLoading}
        pagination={false}
        rowKey="id"
        onRow={(record) => ({
          onClick: () => {
            setSelectedRecord(record);
            setOpen(true);
          },
        })}
      />
      <EditDefnModal onClose={onClose} open={open} record={selectedRecord} />
    </div>
  );
}
