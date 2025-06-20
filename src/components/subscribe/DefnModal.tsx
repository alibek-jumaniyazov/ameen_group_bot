import { Button, Col, Drawer, Form, Input, Row, Select, Space } from "antd";
import TextArea from "antd/es/input/TextArea";

export default function DefnModal({
  onClose,
  open,
}: {
  onClose: () => void;
  open: boolean;
}) {
  const [form] = Form.useForm();

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <Drawer
      title="Yangi tarif qo’shish"
      width={600}
      onClose={onClose}
      open={open}
      // extra={
      //   <Space>
      //     <button
      //       onClick={() => setShowEditInputs(!showEditInputs)}
      //       className="p-2 border border-yellow-500 rounded-lg cursor-pointer"
      //     >
      //       <Icons.pencilY />
      //     </button>
      //     <button className="p-2 border border-red-500 rounded-lg cursor-pointer">
      //       <Icons.delete />
      //     </button>
      //   </Space>
      // }
    >
      <Form layout="vertical" form={form} hideRequiredMark>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Tarif nomi"
              name="definition"
              rules={[
                { required: true, message: "Iltimos, Tarif nomi kiriting" },
              ]}
            >
              <Input placeholder="Tarif nomi" />
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
              <Input placeholder="Tarif narxi" />
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
              <Input placeholder="Muddati" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Holati"
              name="status"
              rules={[{ required: true, message: "Holati kiriting" }]}
            >
              <Select
                defaultValue="active"
                onChange={handleChange}
                options={[
                  {
                    value: "active",
                    label: <p className="text-green-500">Aktiv</p>,
                  },
                  {
                    value: "deactive",
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
              <TextArea rows={4} />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Button type="primary" className="w-full mt-4">
        Qo'shish
      </Button>
    </Drawer>
  );
}
