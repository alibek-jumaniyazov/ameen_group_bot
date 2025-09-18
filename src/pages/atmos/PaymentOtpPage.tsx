import { Button, Form, Input, Typography, message } from "antd";
import { useBindCardConfirm, useSchedulerConfirm } from "../../hooks/usePayment";
import { useNavigate, useSearchParams } from "react-router-dom";

const { Title } = Typography;

export default function PaymentOtpPage() {
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // URL query dan qiymatlarni olish
  const transaction_id = searchParams.get("transaction_id");
  const scheduler_id = searchParams.get("scheduler_id");
  const userId = Number(searchParams.get("userId"));
  const subscriptionTypeId = Number(searchParams.get("subscriptionTypeId"));

  // ikkita hook
  const { mutate: bindCardConfirm, isPending: isBindLoading } = useBindCardConfirm();
  const { mutate: schedulerConfirm, isPending: isSchedulerLoading } = useSchedulerConfirm();

  const onSubmit = (values: any) => {
    if (transaction_id) {
      // Visa / Mastercard (Octo)
      bindCardConfirm(
        { 
          transaction_id: Number(transaction_id), 
          otp: values.otp, 
          userId, 
          subscriptionTypeId 
        },
        {
          onSuccess: (data: { redirect: string }) => {
            message.success("To‘lov muvaffaqiyatli tasdiqlandi");
            navigate(`/success?url=${data.redirect}`);
          },
          onError: () => {
            message.error("OTP noto‘g‘ri kiritildi");
          },
        }
      );
    } else if (scheduler_id) {
      // Uzcard / Humo (Atmos)
      schedulerConfirm(
        { 
          scheduler_id, 
          otp: values.otp 
        },
        {
          onSuccess: (data: { redirect: string }) => {
            message.success("To‘lov muvaffaqiyatli tasdiqlandi");
            navigate(`/success?url=${data.redirect}`);
          },
          onError: () => {
            message.error("OTP noto‘g‘ri kiritildi");
          },
        }
      );
    } else {
      message.error("Xatolik: transaction_id yoki scheduler_id topilmadi");
    }
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
          <Input placeholder="123456" maxLength={6} />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          loading={isBindLoading || isSchedulerLoading}
          className="w-full"
        >
          Tasdiqlash
        </Button>
      </Form>
    </div>
  );
}
