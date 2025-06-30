import { Button, Col, DatePicker, Drawer, Form, Row, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";

export default function SendMessageAction({
  onClose,
  open,
}: {
  onClose: () => void;
  open: boolean;
}) {
  const [form] = useForm();

  const onFinish = (values: any) => {
    const plainMessage: string = values.message || "";

    const markdownMessage: string = plainMessage
      .split("\n")
      .map((line: string, i: number) => (i === 0 ? `# ${line}` : `**${line}**`))
      .join("\n");

    const payload = {
      ...values,
      date: values.date
        ? dayjs(values.date).format("YYYY/MM/DD HH:mm")
        : undefined,
      message: markdownMessage,
    };

    console.log("Markdown formatdagi xabar:", payload);
    form.resetFields();
    onClose();
  };

  return (
    <Drawer
      title={"Yangi xabar yuborish"}
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
              <TextArea rows={6} placeholder="Xabar matnini kiriting" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Sana va vaqt" name="date">
              <DatePicker
                className="!w-full"
                format="YYYY-MM-DD HH:mm"
                showTime={{ format: "HH:mm" }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Tarif" name="receivers">
              <Select
                placeholder="Tarifni tanlang"
                options={[
                  { value: "premium", label: "Premium" },
                  { value: "biznes", label: "Biznes" },
                  { value: "beginner", label: "Boshlang'ich" },
                ]}
              />
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
