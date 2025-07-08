import { useSearchParams } from "react-router-dom";
import { Button, Form, Input, message, Typography } from "antd";
import { useEffect, useState } from "react";
import {
  useApplyPayment,
  useCreatePayment,
  usePreapplyPayment,
} from "../../hooks/usePayment";

const { Title } = Typography;

export default function AtmosPayment() {
  const [searchParams] = useSearchParams();
  const userId = Number(searchParams.get("userId"));
  const subscriptionTypeId = Number(searchParams.get("subscriptionTypeId"));

  const [form] = Form.useForm();
  const [transactionId, setTransactionId] = useState<number | null>(null);

  const { mutate: createPayment, isLoading: creating } = useCreatePayment();
  const { mutate: preapply, isLoading: preapplying } = usePreapplyPayment();
  const { mutate: apply, isLoading: applying } = useApplyPayment();

  useEffect(() => {
    if (!userId || !subscriptionTypeId) {
      message.error(
        "userId va subscriptionTypeId URL query orqali berilishi kerak"
      );
    }
  }, [userId, subscriptionTypeId]);

  const handleCreate = () => {
    if (!userId || !subscriptionTypeId) return;

    createPayment(
      { userId, subscriptionTypeId },
      {
        onSuccess: (res) => {
          message.success("Transaction yaratildi");
          setTransactionId(res?.transaction_id); 
          form.setFieldsValue({ transaction_id: res?.transaction_id });
        },
        onError: () => {
          message.error("Transaction yaratilmadi");
        },
      }
    );
  };

  const handlePreapply = () => {
    form
      .validateFields(["transaction_id", "card_number", "expiry"])
      .then((values) => {
        preapply(values, {
          onSuccess: () => message.success("Karta yuborildi"),
          onError: () => message.error("Karta yuborilmadi"),
        });
      });
  };

  const handleApply = () => {
    form.validateFields(["transaction_id", "otp"]).then((values) => {
      apply(values, {
        onSuccess: () => message.success("OTP tasdiqlandi"),
        onError: () => message.error("OTP xato"),
      });
    });
  };

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: 24 }}>
      <Title level={3}>Atmos To‘lov Sahifasi</Title>

      <Form layout="vertical" form={form}>
        <Form.Item label="Transaction ID" name="transaction_id">
          <Input disabled placeholder="Avtomatik to‘ldiriladi" />
        </Form.Item>

        <Button
          type="primary"
          onClick={handleCreate}
          loading={creating}
          block
          disabled={!userId || !subscriptionTypeId}
        >
          Create Payment
        </Button>

        <Form.Item
          label="Card Number"
          name="card_number"
          rules={[{ required: true }]}
        >
          <Input placeholder="1234 5678 9012 3456" />
        </Form.Item>

        <Form.Item label="Expiry" name="expiry" rules={[{ required: true }]}>
          <Input placeholder="12/26" />
        </Form.Item>

        <Button
          type="dashed"
          onClick={handlePreapply}
          loading={preapplying}
          block
          disabled={!transactionId}
        >
          Preapply Card
        </Button>

        <Form.Item label="OTP" name="otp" rules={[{ required: true }]}>
          <Input placeholder="123456" />
        </Form.Item>

        <Button
          type="default"
          onClick={handleApply}
          loading={applying}
          block
          disabled={!transactionId}
        >
          Apply OTP
        </Button>
      </Form>
    </div>
  );
}
