import { Button, Col, Drawer, Form, Input, message, Row, Space } from "antd";
import { useEffect, useState } from "react";
import { Icons } from "../../assets/icons";
import TextArea from "antd/es/input/TextArea";
import type { SubscriptionType } from "../../api/subscriptionApi";
import {
  useDeleteSubscription,
  useUpdateSubscription,
} from "../../hooks/useSubscription";
import confirm from "antd/es/modal/confirm";
import { QuestionCircleOutlined } from "@ant-design/icons";

interface EditDefnModalProps {
  onClose: () => void;
  open: boolean;
  record: SubscriptionType | null;
}

export default function EditDefnModal({
  onClose,
  open,
  record,
}: EditDefnModalProps) {
  const [showEditInputs, setShowEditInputs] = useState(true);
  const [form] = Form.useForm();
  const updateSubscription = useUpdateSubscription();
  const deleteSubscription = useDeleteSubscription();

  useEffect(() => {
    if (record) {
      form.setFieldsValue(record);
    }
  }, [record, form]);

  const onFinish = (values: Partial<SubscriptionType>) => {
    if (!record) return;

    const cleanedData: Omit<
      SubscriptionType,
      "id" | "createdAt" | "updatedAt"
    > = {
      price: Number(values.price),
      title: values.title ?? "",
      description: values.description ?? "",
      expireDays: Number(values.expireDays),
    };

    updateSubscription.mutate(
      { id: record.id, data: cleanedData },
      {
        onSuccess: () => {
          message.success("Tarif muvaffaqiyatli yangilandi");
          onClose();
        },
        onError: (err) => {
          console.error(err);
          message.error("Xatolik yuz berdi");
        },
      }
    );
  };

  const handleDelete = () => {
    if (!record) return;
    deleteSubscription.mutate(record.id, {
      onSuccess: () => {
        message.success("Tarif o‘chirildi");
        onClose();
      },
      onError: (err) => {
        console.error(err);
        message.error("O‘chirishda xatolik yuz berdi");
      },
    });
  };
  const showDeleteConfirm = () => {
    confirm({
      title: "Ushbu Ta'rif o'chirmoqchimisiz?",
      icon: <QuestionCircleOutlined style={{ color: "red" }} />,
      okText: "Ha",
      cancelText: "Yo'q",
      okType: "danger",
      closable: true,

      onOk() {
        handleDelete();
      },
    });
  };

  return (
    <Drawer
      title="Tarifni o’zgartirish"
      width={600}
      onClose={onClose}
      open={open}
      extra={
        <Space>
          <button
            onClick={() => setShowEditInputs(!showEditInputs)}
            className="p-2 border border-yellow-500 rounded-lg cursor-pointer"
          >
            <Icons.pencilY />
          </button>
          <button
            onClick={showDeleteConfirm}
            className="p-2 border border-red-500 rounded-lg cursor-pointer"
          >
            <Icons.delete />
          </button>
        </Space>
      }
    >
      <Form layout="vertical" form={form} hideRequiredMark onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Tarif nomi"
              name="title"
              rules={[
                { required: true, message: "Iltimos, tarif nomini kiriting" },
              ]}
            >
              <Input disabled={showEditInputs} placeholder="Tarif nomi" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Tarif narxi"
              name="price"
              rules={[
                { required: true, message: "Iltimos, tarif narxini kiriting" },
              ]}
            >
              <Input
                disabled={showEditInputs}
                placeholder="Tarif narxi"
                type="number"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Muddati (kunlarda)"
              name="expireDays"
              rules={[
                { required: true, message: "Iltimos, muddatini kiriting" },
              ]}
            >
              <Input
                disabled={showEditInputs}
                placeholder="Muddati"
                type="number"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Xususiyatlari"
              name="description"
              rules={[
                { required: true, message: "Iltimos, taʼrifni kiriting" },
              ]}
            >
              <TextArea
                rows={4}
                disabled={showEditInputs}
                placeholder="Xususiyatlari"
              />
            </Form.Item>
          </Col>
        </Row>

        {!showEditInputs && (
          <Button type="primary" className="w-full mt-4" htmlType="submit">
            Saqlash
          </Button>
        )}
      </Form>
    </Drawer>
  );
}
