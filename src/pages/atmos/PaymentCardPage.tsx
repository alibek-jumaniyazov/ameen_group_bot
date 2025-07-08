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

  const onSubmit = (values: any) => {
    mutate(
      { ...values, transaction_id },
      {
        onSuccess: () => {
          message.success("Karta ma’lumotlari yuborildi");
          navigate(`/atmos/otp?transaction_id=${transaction_id}`);
        },
        onError: () => {
          message.error("Karta ma’lumotlarini yuborishda xatolik");
        },
      }
    );
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
          <Input placeholder="1234 5678 9012 3456" />
        </Form.Item>

        <Form.Item
          label="Amal qilish muddati"
          name="expiry"
          rules={[{ required: true, message: "Muddati kerak" }]}
        >
          <Input placeholder="12/26" />
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
