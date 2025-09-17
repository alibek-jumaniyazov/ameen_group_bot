import { Button, Checkbox, Form, Input, Spin, Typography, message } from "antd";
import { useCreatePayment, usePreapplyPayment } from "../../hooks/usePayment";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useCreateOctoCheckout } from "../../api/subscriptionPaymentApi";
import { useSubscriptions } from "../../hooks/useSubscription";

const { Title, Text } = Typography;

declare global {
  interface Window {
    Telegram: any;
  }
}

export default function AtmosPaymentPage() {
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.setBackgroundColor("#ffffff");
      window.Telegram.WebApp.setHeaderColor("#ffffff");
    }
    document.body.style.backgroundColor = "#ffffff";
    document.body.style.color = "#000000";
  }, []);

  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userId = Number(searchParams.get("userId"));

  const { mutate: createPayment, isPending } = useCreatePayment();
  const { mutate: preapplyPayment, isPending: isCardLoading } = usePreapplyPayment();
  const { mutate: createOctoCheckout, isPending: isOctoLoading } = useCreateOctoCheckout();
  const { data, isLoading } = useSubscriptions();

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [paymentType, setPaymentType] = useState<"uzcard" | "visa">("uzcard"); // default Uzcard
  const [acceptedOffer, setAcceptedOffer] = useState(false); // oferta check

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 3) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    form.setFieldsValue({ expiry: value });
  };

  const onSubmit = (values: any) => {
    if (!userId) {
      message.error("URL query: userId kerak");
      return;
    }
    if (!selectedId) {
      message.error("Iltimos, tarifni tanlang");
      return;
    }
    if (!acceptedOffer) {
      message.error("Ommaviy ofertani qabul qilishingiz kerak");
      return;
    }

    if (paymentType === "uzcard") {
      // Uzcard / Humo
      createPayment(
        { userId, subscriptionTypeId: selectedId },
        {
          onSuccess: (res) => {
            const tid = res?.transactionId;
            const [mm, yy] = values.expiry.split("/");
            const formattedExpiry = yy + mm;

            preapplyPayment(
              {
                card_number: Number(values.card_number),
                transaction_id: tid,
                expiry: formattedExpiry,
              },
              {
                onSuccess: () => {
                  message.success("OTP ga yo‘naltirilmoqda");
                  navigate(`/atmos/otp?transaction_id=${tid}`);
                },
                onError: () => {
                  message.error("Karta ma’lumotlarini yuborishda xatolik");
                },
              }
            );
          },
          onError: () => {
            message.error("Transaction yaratishda xatolik yuz berdi");
          },
        }
      );
    } else {
      // Visa / Mastercard → OctoBank
      createOctoCheckout(
        { userId, subscriptionTypeId: selectedId },
        {
          onSuccess: (res: any) => {
            if (res?.data?.octo_pay_url) {
              window.location.href = res.data.octo_pay_url;
            } else {
              message.error("OctoBank URL topilmadi");
            }
          },
          onError: () => {
            message.error("OctoBank checkout yaratishda xatolik");
          },
        }
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 !bg-white">
      <Title level={3} className="text-center mb-6">
        To‘lov turini tanlang
      </Title>

      {/* Payment type card selector */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div
          onClick={() => setPaymentType("uzcard")}
          className={`p-3 rounded-lg border cursor-pointer text-center ${
            paymentType === "uzcard" ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
        >
          <Text strong>Uzcard / Humo</Text>
        </div>
        <div
          onClick={() => setPaymentType("visa")}
          className={`p-3 rounded-lg border cursor-pointer text-center ${
            paymentType === "visa" ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
        >
          <Text strong>Visa / Mastercard</Text>
        </div>
      </div>

      <Form form={form} layout="vertical" onFinish={onSubmit}>
        {paymentType === "uzcard" && (
          <>
            <Form.Item
              label="Karta raqami"
              name="card_number"
              rules={[{ required: true, message: "Karta raqami kerak" }]}
            >
              <Input placeholder="8600 1234 5678 9012" maxLength={19} />
            </Form.Item>

            <Form.Item
              label="Amal qilish muddati"
              name="expiry"
              rules={[
                { required: true, message: "Muddati kerak" },
                {
                  pattern: /^(0[1-9]|1[0-2])\/\d{2}$/,
                  message: "Format MM/YY bo‘lishi kerak",
                },
              ]}
            >
              <Input placeholder="MM/YY" maxLength={5} onChange={handleExpiryChange} />
            </Form.Item>
          </>
        )}

        {/* Oferta check */}
        <div className="mb-4">
          <Checkbox checked={acceptedOffer} onChange={(e) => setAcceptedOffer(e.target.checked)}>
            Ommaviy ofertani qabul qildim
          </Checkbox>
        </div>

        {/* Tariflar */}
        <div className="flex flex-col gap-3 mb-6">
          {data?.data
            ?.slice()
            .sort((a, b) => a.price - b.price)
            .map((tarif) => {
              const isSelected = selectedId === tarif.id;
              return (
                <div
                  key={tarif.id}
                  onClick={() => setSelectedId(tarif.id)}
                  className={`flex justify-between items-center px-4 py-3 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-blue-400"
                  }`}
                >
                  <div>
                    <Text strong className="text-base">{tarif.title}</Text>
                  </div>
                  <Text strong>{Number(tarif.price).toLocaleString("uz-UZ")} so‘m</Text>
                </div>
              );
            })}
        </div>

        <Button
          type="primary"
          htmlType="submit"
          loading={isPending || isCardLoading || isOctoLoading}
          disabled={!selectedId}
          className="w-full py-8 text-lg font-semibold"
        >
          To‘lovni boshlash
        </Button>
      </Form>
    </div>
  );
}
