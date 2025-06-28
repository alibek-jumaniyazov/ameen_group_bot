import { Button, Col, Drawer, Form, Input, message, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import type { SubscriptionType } from "../../api/subscriptionApi";
import { useCreateSubscriptionType } from "../../hooks/useSubscription";

export default function DefnModal({
  onClose,
  open,
}: {
  onClose: () => void;
  open: boolean;
}) {
  const [form] = Form.useForm();
  const createSubscription = useCreateSubscriptionType();

  useEffect(() => {
    if (open) {
      form.resetFields();
    }
  }, [open]);

  const onFinish = (values: Partial<SubscriptionType>) => {
    const cleanedData = {
      price: Number(values.price),
      title: values.title ?? "",
      description: values.description ?? "",
      expireDays: Number(values.expireDays),
      telegramTopicIds: [123456, 654321],
    };

    createSubscription.mutate(cleanedData, {
      onSuccess: () => {
        message.success("Tarif muvaffaqiyatli qo‘shildi");
        onClose();
      },
      onError: (err) => {
        message.error("Xatolik yuz berdi");
        console.log(err);
      },
    });
  };

  return (
    <Drawer
      title="Yangi tarif qo’shish"
      width={600}
      onClose={onClose}
      open={open}
      destroyOnClose
    >
      <Form layout="vertical" form={form} onFinish={onFinish} hideRequiredMark>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Tarif nomi"
              name="title"
              rules={[{ required: true, message: "Tarif nomi kiriting" }]}
            >
              <Input placeholder="Premum" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Narxi"
              name="price"
              rules={[{ required: true, message: "Narx kiriting" }]}
            >
              <Input type="number" placeholder="Masalan: 20000" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Muddati (kunlarda)"
              name="expireDays"
              rules={[{ required: true, message: "Muddati kiriting" }]}
            >
              <Input type="number" placeholder="Masalan: 30" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Xususiyatlari"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Iltimos, xususiyatlarini kiriting",
                },
              ]}
            >
              <TextArea rows={4} placeholder="Tarif haqida ma'lumot" />
            </Form.Item>
          </Col>
        </Row>

        <Button type="primary" htmlType="submit" className="w-full mt-4">
          Qo‘shish
        </Button>
      </Form>
    </Drawer>
  );
}
