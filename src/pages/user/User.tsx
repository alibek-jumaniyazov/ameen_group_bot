import { useParams } from "react-router-dom";
import { Icons } from "../../assets/icons";
import { Button, Input, Spin } from "antd";
import { useState } from "react";
import UserPaymentHistory from "../../components/userPaymentHistory/UserPaymentHistory";
import SubscriptionList from "../../components/userPaymentHistory/SubscriptionList";
import SentMessage from "../../components/userPaymentHistory/SentMessage";
import { useUserById } from "../../hooks/useUser";
import dayjs from "dayjs";

export default function User() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useUserById(Number(id));

  const [selectedTab, setSelectedTab] = useState<
    "To’lovlar tarixi" | "Obunalar ro‘yxati" | "Yuborilgan xabarlar"
  >("To’lovlar tarixi");

  const user = data;

  if (isLoading) {
    return (
      <div className="w-full h-[300px] flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="User flex flex-col items-center justify-center gap-4">
      <div className="w-full !h-[282px] flex items-center justify-start gap-6 border-b border-[#92959C] pb-6">
        <div className="w-[258px] h-[258px]  rounded-2xl p-[65px] bg-[#E1E4E8] flex items-center justify-center">
          <Icons.avatar className="w-32 h-32" />
        </div>
        <div className="w-full h-full flex items-center justify-start">
          <div className="w-full !h-full flex flex-col justify-start items-start gap-4">
            <div>
              <span className="text-[#60646E] text-[16px]">Foydalanuvchi</span>
              <p className="text-[#111827] font-semibold text-[16px]">
                {user?.firstName} {user?.lastName}
              </p>
            </div>
            <div>
              <span className="text-[#60646E] text-[16px]">Telefon</span>
              <p className="text-[#111827] font-semibold text-[16px]">
                {user?.phoneNumber}
              </p>
            </div>
            <div>
              <span className="text-[#60646E] text-[16px]">Telegram</span>
              <p className="text-[#111827] font-semibold text-[16px]">
                {user?.username || "-"}
              </p>
            </div>
            <div>
              <span className="text-[#60646E] text-[16px]">Obuna holati</span>
              <p className="text-[#111827] font-semibold text-[16px]">
                {user?.status === "REGISTERED" ? "DEAKTIV" : "AKTIV"}
              </p>
            </div>
          </div>
          <div className="w-full !h-full flex flex-col justify-start items-start gap-4">
            <div>
              <span className="text-[#60646E] text-[16px]">Email</span>
              <p className="text-[#111827] font-semibold text-[16px]">
                {user?.email || "-"}
              </p>
            </div>
            <div>
              <span className="text-[#60646E] text-[16px]">
                Oxirgi aktivlik
              </span>
              <p className="text-[#111827] font-semibold text-[16px]">
                {user?.lastActiveAt
                  ? dayjs(user?.lastActiveAt).format("YYYY.MM.DD HH:mm")
                  : "-"}
              </p>
            </div>
            <div>
              <span className="text-[#60646E] text-[16px]">
                Ro‘yxatdan o‘tgan
              </span>
              <p className="text-[#111827] font-semibold text-[16px]">
                {user?.createdAt
                  ? dayjs(user?.createdAt).format("YYYY.MM.DD HH:mm")
                  : "-"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-between">
        <div className="flex justify-start items-center">
          <div className="flex bg-[#eef3fe] rounded-lg overflow-hidden p-[4px] ">
            {[
              "To’lovlar tarixi",
              "Obunalar ro‘yxati",
              "Yuborilgan xabarlar",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab as typeof selectedTab)}
                className={`px-4 py-2 text-sm font-medium ${
                  selectedTab === tab
                    ? "bg-[#528af9] text-white rounded-[6px]"
                    : "text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-start justify-start gap-1.5">
          <div className="flex items-center justify-start gap-1 w-[357px] h-[44px] rounded-lg border border-[#92959C] py-3 px-2.5">
            <Icons.search className={"w-5"} />
            <Input
              type="text"
              color="#92959C"
              placeholder="Search"
              bordered={false}
              className="placeholder:!text-[#94A3B8]"
            />
          </div>
          <Button type="primary" className="!bg-[#528AF9] !w-[87px] !h-[44px]">
            Search
          </Button>
        </div>
      </div>

      <div className="w-full">
        {selectedTab === "To’lovlar tarixi" && (
          <UserPaymentHistory userId={id} />
        )}
        {selectedTab === "Obunalar ro‘yxati" && (
          <SubscriptionList userId={id} />
        )}
        {selectedTab === "Yuborilgan xabarlar" && <SentMessage userId={id} />}
      </div>
    </div>
  );
}
