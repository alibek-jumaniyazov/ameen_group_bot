import { Button, Col, Drawer, Form, Input, Row, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { Icons } from "../../assets/icons";
import TextArea from "antd/es/input/TextArea";

export default function EditDefnModal({
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

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onFinish = (values: any) => {
    console.log("Form yuborildi:", values);
    onClose();
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
          <button className="p-2 border border-red-500 rounded-lg cursor-pointer">
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
              name="definition"
              rules={[
                { required: true, message: "Iltimos, Tarif nomi kiriting" },
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
                { required: true, message: "Iltimos, Tarif narxi kiriting" },
              ]}
            >
              <Input disabled={showEditInputs} placeholder="Tarif narxi" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Muddati"
              name="term"
              rules={[{ required: true, message: "Muddati kiriting" }]}
            >
              <Input disabled={showEditInputs} placeholder="Muddati" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Holati"
              name="status"
              rules={[{ required: true, message: "Holati kiriting" }]}
            >
              <Select
                disabled={showEditInputs}
                onChange={handleChange}
                options={[
                  {
                    value: "Aktiv",
                    label: <p className="text-green-500">Aktiv</p>,
                  },
                  {
                    value: "Deaktiv",
                    label: <p className="text-red-500">Deaktiv</p>,
                  },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Xususiyatlari"
              name="features"
              rules={[
                {
                  required: true,
                  message: "Iltimos, xususiyatlarini kiriting",
                },
              ]}
            >
              <TextArea rows={4} disabled={showEditInputs} />
            </Form.Item>
          </Col>
        </Row>

        <Button type="primary" className="w-full mt-4" htmlType="submit">
          Saqlash
        </Button>
      </Form>
    </Drawer>
  );
}
