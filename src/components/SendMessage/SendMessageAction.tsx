import { Button, Col, DatePicker, Drawer, Form, Row, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";

export default function SendMessageAction({
  onClose,
  open,
  onFilter,
}: {
  onClose: () => void;
  open: boolean;
  onFilter: (values: any) => void;
}) {
  const [form] = useForm();

  const onFinish = (values: any) => {
    const payload = {
      ...values,
      date: values.date ? dayjs(values.date).format("YYYY/MM/DD") : undefined,
    };
    onFilter(payload);
  };

  return (
    <Drawer
      title="Filter"
      width={600}
      onClose={onClose}
      open={open}
      footer={
        <div className="flex justify-end">
          <Button
            type="primary"
            className="bg-[#528AF9]"
            onClick={() => form.submit()}
          >
            Yuborish
          </Button>
        </div>
      }
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Xabar matni"
              name="message"
              rules={[
                { required: true, message: "Iltimos, xabar matnini kiriting" },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Sana" name="date">
              <DatePicker className="!w-full" format="YYYY/MM/DD" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Qabul qiluvchilar" name="receivers">
              <Select
                placeholder="Qabul qiluvchilarni tanlang"
                options={[
                  { value: "activeUsers", label: "Faol obunali" },
                  { value: "all", label: "Barchasi" },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
}
