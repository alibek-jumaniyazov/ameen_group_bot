import { Button, Col, Drawer, Form, Row, Select, Spin, message } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { useCreateMessage } from "../../hooks/useMessage";
import { useUsers } from "../../hooks/useUser";
import { useEffect } from "react";
import { useSubscriptions } from "../../hooks/useSubscription";

export default function SendMessageAction({
  onClose,
  open,
}: {
  onClose: () => void;
  open: boolean;
}) {
  const [form] = useForm();
  const { data: subscriptions } = useSubscriptions();
  const { data: userList, isLoading } = useUsers();

  const createMessage = useCreateMessage();
  const userOptions =
    userList?.data?.map((user) => ({
      value: user.id,
      label: `${user.firstName} ${user.lastName} (${user.phoneNumber})`,
    })) || [];

  const onFinish = (values: any) => {
    const plainMessage: string = values.message || "";

    const markdownMessage: string = plainMessage
      .split("\n")
      .map((line: string, i: number) => (i === 0 ? `*${line}*` : `_${line}_`))
      .join("\n");

    const payload: any = {
      text: markdownMessage,
      status: values.status ? values.status : "",
      userIds: values.userIds ? values.userIds : [],
      subscriptionTypeId: values.subscriptionTypeId
        ? values.subscriptionTypeId
        : "",
    };

    if (values.subscriptionTypeId) {
      payload.subscriptionTypeId = Number(values.subscriptionTypeId);
    }
    console.log(payload);

    createMessage.mutate(payload, {
      onSuccess: () => {
        form.resetFields();
        onClose();
        message.success("Xabar muvaffaqiyatli yuborildi");
      },
      onError: (err) => {
        console.log(err);
        message.error("Xatolik yuz berdi");
      },
    });
  };

  useEffect(() => {
    if (!open) {
      form.resetFields();
    }
  }, [open, form]);

  return (
    <Drawer
      title="Yangi xabar yuborish"
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
              rules={[{ required: true, message: "Xabar matni kerak" }]}
            >
              <TextArea rows={6} placeholder="Xabar matnini kiriting" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Tarif" name="subscriptionTypeId">
              <Select
                placeholder="Tarifni tanlang"
                options={subscriptions?.data?.map((sub) => ({
                  value: sub.id.toString(),
                  label: sub.title,
                }))}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Foydalanuvchi holati"
              name="status"
              rules={[
                { required: true, message: "Foydalanuvchi holatini tanlang" },
              ]}
            >
              <Select
                placeholder="Status tanlang"
                options={[
                  { value: "SUBSCRIBE", label: "Faol" },
                  { value: "EXPIRED", label: "Muddati tugagan" },
                  { value: "REGISTERED", label: "Obuna olmagan" },
                  { value: " ", label: "Barcha" },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Foydalanuvchilarni tanlang" name="userIds">
              {isLoading ? (
                <Spin />
              ) : (
                <Select
                  mode="multiple"
                  placeholder="Foydalanuvchilarni yozing va tanlang"
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label as string)
                      ?.toLowerCase()
                      ?.includes(input.toLowerCase())
                  }
                  options={userOptions}
                />
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
}
