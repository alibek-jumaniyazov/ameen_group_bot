import { Button, Col, Drawer, Form, Input, message, Row, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import type { SubscriptionType } from "../../api/subscriptionApi";
import {
  useCreateSubscriptionType,
  useSubscriptions,
} from "../../hooks/useSubscription";

export default function DefnModal({
  onClose,
  open,
}: {
  onClose: () => void;
  open: boolean;
}) {
  const [form] = Form.useForm();
  const createSubscription = useCreateSubscriptionType();
  const getSubscription = useSubscriptions();

  useEffect(() => {
    if (open) {
      form.resetFields();
    }
  }, [open]);
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };
  const onFinish = (values: Partial<SubscriptionType>) => {
    const cleanedData = {
      price: Number(values.price),
      title: values.title ?? "",
      description: values.description ?? "",
      expireDays: Number(values.expireDays),
      oneTime: Boolean(values.oneTime),
    };

    createSubscription.mutate(cleanedData, {
      onSuccess: () => {
        message.success("Tarif muvaffaqiyatli qo‘shildi");
        getSubscription.refetch();
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
              label="Obuna faqat 1 marta amalga oshiriladimi?"
              name="oneTime"
              valuePropName="checked"
              initialValue={false}
            >
              <Switch defaultChecked={false} onChange={onChange} />
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
