import { useParams } from "react-router-dom";
import { useApi } from "../../context/ApiContext";
import { Icons } from "../../assets/icons";
import AutoPaymentUserTable from "../../components/AutoPayment/AutoPaymentUserTable";

export default function AutoPaymentUser() {
  const { id } = useParams<{ id: string }>();
  const { data } = useApi();
  const user = data.find((user) => user.key === id);

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
        <div className="flex items-start justify-start gap-1.5">
          <h1 className="text-2xl font-semibold">
            Avtomatik to‘lov urinishlari
          </h1>
        </div>
      </div>
      <div className="w-full">
        <AutoPaymentUserTable />
      </div>
    </div>
  );
}
