import { Table, Tag, type TableProps } from "antd";
import { useMemo } from "react";
import dayjs from "dayjs";

interface DataType {
  id: string;
  message: string;
  date: string;
  numberRecipients: number;
  status: string[];
  error: string[];
}

export default function SendMessageTable({ filters }: { filters: any }) {
  const allData: DataType[] = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: (i + 1).toString(),
      message: "Yangi Tarif",
      date: "2025/06/25 07:07",
      numberRecipients: 30 + i,
      status: [Math.random() > 0.5 ? "Muvaffaqiyatli" : "Xato"],
      error: [
        Math.random() > 0.5 ? "Yechildi" : "Kartada mablag' yetarli emas",
      ],
    }));
  }, []);

  const filteredData = useMemo(() => {
    return allData.filter((item) => {
      const userMatch = filters?.searchUser
        ? item.id.includes(filters.searchUser)
        : true;

      const dateMatch = filters?.date
        ? dayjs(item.date).format("YYYY/MM/DD") === filters.date
        : true;

      return userMatch && dateMatch;
    });
  }, [filters, allData]);

  const columns: TableProps<DataType>["columns"] = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Matn", dataIndex: "message", key: "message" },
    { title: "Sana va vaqat", dataIndex: "date", key: "date" },
    {
      title: "Qabul qiluvchilar soni",
      dataIndex: "numberRecipients",
      key: "numberRecipients",
    },
    {
      title: "Holati",
      dataIndex: "status",
      key: "status",
      render: (status: string[]) =>
        status.map((tag) => (
          <Tag color={tag === "Muvaffaqiyatli" ? "green" : "red"} key={tag}>
            {tag}
          </Tag>
        )),
    },
    {
      title: "Xato sababi",
      dataIndex: "error",
      key: "error",
      render: (error: string[]) => error.join(", "),
    },
    // {
    //   title: "Harakat",
    //   key: "action",
    //   render: () => <Button type="default">Qayta yuborish</Button>,
    // },
  ];

  return (
    <Table
      columns={columns}
      dataSource={filteredData}
      pagination={{
        pageSize: 10,
        total: filteredData.length,
        showTotal: (total) => `Jami: ${total} ta yuborilgan xabar`,
        showSizeChanger: false,
      }}
      rowKey="id"
    />
  );
}
