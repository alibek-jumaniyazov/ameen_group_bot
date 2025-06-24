import { useParams } from "react-router-dom";
import { useApi } from "../../context/ApiContext";
import { Icons } from "../../assets/icons";
import { Button, Input } from "antd";
import { useState } from "react";
import UserPaymentHistory from "../../components/userPaymentHistory/UserPaymentHistory";
import SubscriptionList from "../../components/userPaymentHistory/SubscriptionList";
import SentMessage from "../../components/userPaymentHistory/SentMessage";

export default function User() {
  const { id } = useParams<{ id: string }>();
  const { data } = useApi();
  const user = data.find((user) => user.key === id);

  const [selectedTab, setSelectedTab] = useState<
    "To’lovlar tarixi" | "Obunalar ro‘yxati" | "Yuborilgan xabarlar"
  >("To’lovlar tarixi");

  console.log(user);
  console.log(id);

  return (
    <div className="User flex flex-col items-center justify-center gap-4">
      <div className="w-full !h-[282px] flex items-center justify-start gap-6 border-b border-[#92959C] pb-6">
        <div className="w-[258px] h-[258px]  rounded-2xl p-[65px] bg-[#E1E4E8] flex items-center justify-center">
          <Icons.avatar className="w-32 h-32" />
        </div>
        <div className="w-full h-full flex items-center justify-start">
          <div className="w-full !h-full flex flex-col justify-start items-start gap-4">
            <div className="flex flex-col justify-center items-start">
              <span className="text-[#60646E] font-normal text-[16px] leading-[24px]">
                Foydalanuvchi
              </span>
              <p className="text-[#111827] font-semibold text-[16px] leading-[24px]">
                {user?.name} {user?.lastName}
              </p>
            </div>
            <div className="flex flex-col justify-center items-start">
              <span className="text-[#60646E] font-normal text-[16px] leading-[24px]">
                Telefon
              </span>
              <p className="text-[#111827] font-semibold text-[16px] leading-[24px]">
                {user?.phone}
              </p>
            </div>
            <div className="flex flex-col justify-center items-start">
              <span className="text-[#60646E] font-normal text-[16px] leading-[24px]">
                Telegram
              </span>
              <p className="text-[#111827] font-semibold text-[16px] leading-[24px]">
                {user?.email}
              </p>
            </div>
            <div className="flex flex-col justify-center items-start">
              <span className="text-[#60646E] font-normal text-[16px] leading-[24px]">
                Obuna holati
              </span>
              <p className="text-[#111827] font-semibold text-[16px] leading-[24px]">
                {user?.subscribe}
              </p>
            </div>
          </div>
          <div className="w-full !h-full flex flex-col justify-start items-start gap-4">
            <div className="flex flex-col justify-center items-start">
              <span className="text-[#60646E] font-normal text-[16px] leading-[24px]">
                Email
              </span>
              <p className="text-[#111827] font-semibold text-[16px] leading-[24px]">
                {user?.email}
              </p>
            </div>
            <div className="flex flex-col justify-center items-start">
              <span className="text-[#60646E] font-normal text-[16px] leading-[24px]">
                Oxirgi aktivlik sanasi
              </span>
              <p className="text-[#111827] font-semibold text-[16px] leading-[24px]">
                {user?.active}
              </p>
            </div>
            <div className="flex flex-col justify-center items-start">
              <span className="text-[#60646E] font-normal text-[16px] leading-[24px]">
                Ro‘yxatdan o‘tgan sana
              </span>
              <p className="text-[#111827] font-semibold text-[16px] leading-[24px]">
                {user?.registerDate}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-between">
        <div className="flex justify-start items-center">
          <div className="flex bg-[#eef3fe] rounded-lg overflow-hidden p-[4px] ">
            <button
              onClick={() => setSelectedTab("To’lovlar tarixi")}
              className={`px-4 py-2 text-sm font-medium ${
                selectedTab === "To’lovlar tarixi"
                  ? "bg-[#528af9] text-white rounded-[6px] cursor-pointer"
                  : "text-gray-600 cursor-pointer"
              }`}
            >
              To’lovlar tarixi
            </button>
            <button
              onClick={() => setSelectedTab("Obunalar ro‘yxati")}
              className={`px-4 py-2 text-sm font-medium ${
                selectedTab === "Obunalar ro‘yxati"
                  ? "bg-[#528af9] text-white rounded-[6px] cursor-pointer"
                  : "text-gray-600 cursor-pointer"
              }`}
            >
              Obunalar ro‘yxati
            </button>
            <button
              onClick={() => setSelectedTab("Yuborilgan xabarlar")}
              className={`px-4 py-2 text-sm font-medium ${
                selectedTab === "Yuborilgan xabarlar"
                  ? "bg-[#528af9] text-white rounded-[6px] cursor-pointer"
                  : "text-gray-600 cursor-pointer"
              }`}
            >
              Yuborilgan xabarlar
            </button>
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
        {selectedTab === "To’lovlar tarixi" && <UserPaymentHistory />}
        {selectedTab === "Obunalar ro‘yxati" && <SubscriptionList />}
        {selectedTab === "Yuborilgan xabarlar" && <SentMessage />}
      </div>
    </div>
  );
}
