import { Typography, message } from "antd";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCreatePayment } from "../../hooks/usePayment";

const { Title, Paragraph } = Typography;

export default function AtmosPayment() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userId = Number(searchParams.get("userId") ?? 1);
  const subscriptionTypeId = Number(
    searchParams.get("subscriptionTypeId") ?? 1
  );

  const { mutate } = useCreatePayment();

  useEffect(() => {
    if (!userId || !subscriptionTypeId) {
      message.error("URL query: userId va subscriptionTypeId kerak");
      return;
    }

    mutate(
      { userId, subscriptionTypeId },
      {
        onSuccess: (res) => {
          const id = res?.transaction_id;
          message.success("Transaction yaratildi");
          navigate(`/atmos/card?transaction_id=${id}`);
        },
        onError: () => {
          message.error("Transaction yaratishda xatolik yuz berdi");
        },
      }
    );
  }, [userId, subscriptionTypeId]);

  return (
    <div className="max-w-md mx-auto p-8 text-center">
      <Title level={3}> To‘lov yaratilmoqda...</Title>
      <Paragraph>
        Transaction avtomatik tarzda yaratilmoqda. Iltimos kuting...
      </Paragraph>
    </div>
  );
}
