import { Button, Form, Input, message, Typography } from "antd";
import { useSearchParams, useNavigate } from "react-router-dom";
import { usePreapplyPayment } from "../../hooks/usePayment";

const { Title } = Typography;

export default function PaymentCardPage() {
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const transaction_id = Number(searchParams.get("transaction_id"));
  const { mutate, isPending: isLoading } = usePreapplyPayment();

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);

    if (value.length >= 3) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    form.setFieldsValue({ expiry: value });
  };

  const onSubmit = (values: any) => {
    const [mm, yy] = values.expiry.split("/");
    const formattedExpiry = yy + mm;

    const payload = {
      card_number: Number(values.card_number),
      transaction_id,
      expiry: formattedExpiry,
    };

    console.log("👉 Backendga yuboriladigan payload:", payload);

    mutate(payload, {
      onSuccess: () => {
        message.success("Karta ma’lumotlari yuborildi");
        navigate(`/atmos/otp?transaction_id=${transaction_id}`);
      },
      onError: (err) => {
        console.error("❌ Xatolik yuz berdi, yuborilgan payload:", payload);
        message.error("Karta ma’lumotlarini yuborishda xatolik");
        console.log(err);
      },
    });
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <Title level={3}>Karta Ma’lumotlari</Title>
      <Form form={form} layout="vertical" onFinish={onSubmit}>
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
          <Input
            placeholder="MM/YY"
            maxLength={5}
            onChange={handleExpiryChange}
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          className="w-full"
        >
          Yuborish
        </Button>
      </Form>
    </div>
  );
}
