import { Table, type TableProps } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function SubsStatis() {
  interface DataType {
    key: string;
    definition: string;
    ActiveSubscribe: number;
    ExpiredSubs: number;
    AllUsers: number;
  }

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Tarif nomi",
      dataIndex: "definition",
      key: "definition",
    },
    {
      title: "Faol obunalar",
      dataIndex: "ActiveSubscribe",
      key: "ActiveSubscribe",
    },
    {
      title: "Tugagan obunalar",
      dataIndex: "ExpiredSubs",
      key: "ExpiredSubs",
    },
    {
      title: "Umumiy foydalanuvchilar",
      dataIndex: "AllUsers",
      key: "AllUsers",
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      definition: "Boshlang’ich",
      ActiveSubscribe: 120,
      ExpiredSubs: 45,
      AllUsers: 165,
    },
    {
      key: "2",
      definition: "Premium",
      ActiveSubscribe: 300,
      ExpiredSubs: 80,
      AllUsers: 380,
    },
    {
      key: "3",
      definition: "Biznes",
      ActiveSubscribe: 180,
      ExpiredSubs: 20,
      AllUsers: 200,
    },
  ];
  const [selectedRecord, setSelectedRecord] = useState<DataType | null>(null);
  const navigate = useNavigate();

  return (
    <div className="UserInfo">
      <Table<DataType>
        columns={columns}
        dataSource={data}
        pagination={false}
        onRow={(record) => {
          return {
            onClick: () => {
              navigate(
                `/subscription-statistics?definition=${record.definition}`
              );
            },
          };
        }}
      />
    </div>
  );
}
