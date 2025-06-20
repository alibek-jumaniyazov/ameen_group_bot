import { Button, Col, Drawer, Form, Input, Row, Space } from "antd";
import { useEffect, useState } from "react";
import { Icons } from "../../assets/icons";

export default function EditUserModal({
  onClose,
  open,
  record,
}: {
  onClose: () => void;
  open: boolean;
  record: any;
}) {
  const [showEditInputs, setShowEditInputs] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    if (record) {
      form.setFieldsValue(record);
    }
  }, [record, form]);

  const onFinish = (values: any) => {
    console.log("Form yuborildi:", values);
    onClose();
  };
  return (
    <Drawer
      title="Foydalanuvchi ma’lumotlari"
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
          <button className="p-2 border border-red-500 rounded-lg cursor-pointer">
            <Icons.delete />
          </button>
        </Space>
      }
    >
      <Form layout="vertical" hideRequiredMark form={form} onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Ismi"
              name="name"
              rules={[{ required: true, message: "Iltimos, ismini kiriting" }]}
            >
              <Input disabled={showEditInputs} placeholder="Ism" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Familya"
              name="lastName"
              rules={[
                { required: true, message: "Iltimos, familyasini kiriting" },
              ]}
            >
              <Input disabled={showEditInputs} placeholder="Familya" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Telefon raqam"
              name="phone"
              rules={[{ required: true, message: "Telefon raqamini kiriting" }]}
            >
              <Input disabled={showEditInputs} placeholder="+998..." />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Emailni kiriting" }]}
            >
              <Input disabled={showEditInputs} placeholder="example@mail.com" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Oxirgi aktivlik sanasi"
              name="lastActive"
              rules={[
                {
                  required: true,
                  message: "Oxirgi aktivlik sanasini kiriting",
                },
              ]}
            >
              <Input disabled={showEditInputs} placeholder="2025-01-01" />
            </Form.Item>
          </Col>
        </Row>

        <h1 className="text-[#111827] mb-4 font-inter font-semibold text-[20px]">
          Obunalar tarixi
        </h1>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Tarif"
              name="tariff"
              rules={[{ required: true, message: "Tarif nomini kiriting" }]}
            >
              <Input
                disabled={showEditInputs}
                placeholder="Premium, Basic..."
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Boshlanish sanasi"
              name="tariffStart"
              rules={[
                { required: true, message: "Boshlanish sanasini kiriting" },
              ]}
            >
              <Input disabled={showEditInputs} placeholder="2025-01-01" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Tugash sanasi"
              name="tariffEnd"
              rules={[{ required: true, message: "Tugash sanasini kiriting" }]}
            >
              <Input disabled={showEditInputs} placeholder="2025-12-31" />
            </Form.Item>
          </Col>
        </Row>

        <h1 className="text-[#111827] mb-4 font-inter font-semibold text-[20px]">
          To‘lovlar tarixi
        </h1>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="To‘lov summasi"
              name="paymentAmount"
              rules={[{ required: true, message: "To‘lov summasini kiriting" }]}
            >
              <Input disabled={showEditInputs} placeholder="100 000 so'm" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="To‘lov sanasi"
              name="paymentDate"
              rules={[{ required: true, message: "To‘lov sanasini kiriting" }]}
            >
              <Input disabled={showEditInputs} placeholder="2025-05-01" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="To‘lov holati"
              name="paymentStatus"
              rules={[{ required: true, message: "To‘lov holatini kiriting" }]}
            >
              <Input
                disabled={showEditInputs}
                placeholder="To‘langan / Kutilmoqda"
              />
            </Form.Item>
          </Col>
        </Row>

        <h1 className="text-[#111827] mb-4  font-inter font-semibold text-[20px]">
          Yuborilgan xabarlar ro‘yxati
        </h1>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Yuborilgan sana"
              name="messageDate"
              rules={[{ required: true, message: "Sana kiriting" }]}
            >
              <Input disabled={showEditInputs} placeholder="2025-06-01" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Xabar matni"
              name="messageText"
              rules={[{ required: true, message: "Xabar matnini kiriting" }]}
            >
              <Input disabled={showEditInputs} placeholder="Xabar mazmuni..." />
            </Form.Item>
          </Col>
        </Row>

        <Button type="primary" className="w-full mt-4">
          Saqlash
        </Button>
      </Form>
    </Drawer>
  );
}
