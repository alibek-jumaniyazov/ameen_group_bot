import { Button, Form, Input, message, Typography } from "antd";
import { useSearchParams } from "react-router-dom";
import { useApplyPayment } from "../../hooks/usePayment";

const { Title } = Typography;

export default function PaymentOtpPage() {
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const transaction_id = Number(searchParams.get("transaction_id"));

  const { mutate, isPending: isLoading } = useApplyPayment();

  const onSubmit = (values: any) => {
    mutate(
      { ...values, transaction_id },
      {
        onSuccess: () => message.success("To‘lov muvaffaqiyatli tasdiqlandi"),
        onError: () => message.error("OTP noto‘g‘ri kiritildi"),
      }
    );
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <Title level={3}> OTP Kod</Title>
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item
          label="OTP"
          name="otp"
          rules={[{ required: true, message: "OTP kodini kiriting" }]}
        >
          <Input placeholder="123456" />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          className="w-full"
        >
          Tasdiqlash
        </Button>
      </Form>
    </div>
  );
}
