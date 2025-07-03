import { Button, Col, Drawer, Form, Row, Select, Spin, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { useCreateMessage } from "../../hooks/useMessage";
import { useUsers } from "../../hooks/useUser";
import { useEffect, useState } from "react";
import { useSubscriptions } from "../../hooks/useSubscription";
import MessageEditor from "./MessageEditor";

export default function SendMessageAction({
  onClose,
  open,
}: {
  onClose: () => void;
  open: boolean;
}) {
  const [form] = useForm();
  const [editorValue, setEditorValue] = useState<string>("");

  const { data: subscriptions } = useSubscriptions();
  const { data: userList, isLoading } = useUsers();
  const createMessage = useCreateMessage();

  const userOptions =
    userList?.data?.map((user) => ({
      value: user.id,
      label: `${user.firstName} ${user.lastName} (${user.phoneNumber})`,
    })) || [];

  const onFinish = (values: any) => {
    const plainMessage = editorValue;

    const payload: any = {
      text: plainMessage,
      status: values.status == " " ? undefined : values.status || undefined,
      userIds: values.userIds || undefined,
      subscriptionTypeId: values.subscriptionTypeId
        ? Number(values.subscriptionTypeId)
        : undefined,
    };
    console.log(payload);

    createMessage.mutate(payload, {
      onSuccess: () => {
        form.resetFields();
        setEditorValue("");
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
      setEditorValue("");
    }
  }, [open]);

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
              name="text"
              rules={[{ required: true, message: "Xabar matni kerak" }]}
            >
              <MessageEditor value={editorValue} onChange={setEditorValue} />
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
            <Form.Item label="Foydalanuvchi holati" name="status">
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
