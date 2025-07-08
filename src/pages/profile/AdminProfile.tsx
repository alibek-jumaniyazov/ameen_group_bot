import {
  Card,
  Form,
  Input,
  Button,
  //   Typography,
  Descriptions,
  message,
  Divider,
} from "antd";
import { useEffect } from "react";
import { useAdminProfile, useUpdateAdmin } from "../../hooks/useAdminAuth";

// const { Title } = Typography;

export default function AdminProfile() {
  const [form] = Form.useForm();
  const { data: admin, isLoading } = useAdminProfile();
  const updateMutation = useUpdateAdmin();

  useEffect(() => {
    if (admin) {
      form.setFieldsValue({ name: admin.name });
    }
  }, [admin]);

  const onFinish = async (values: any) => {
    const { name, oldPassword, newPassword } = values;

    const payload: any = { name };

    if (oldPassword && newPassword) {
      payload.oldPassword = oldPassword;
      payload.newPassword = newPassword;
    }

    try {
      await updateMutation.mutateAsync(payload);
      message.success("Ma'lumotlar yangilandi");
      form.resetFields(["oldPassword", "newPassword"]);
    } catch (err: any) {
      message.error(err?.response?.data?.message || "Xatolik yuz berdi");
    }
  };

  return (
    <div className="flex justify-center items-start mt-10 px-4">
      <Card
        // title={<Title level={3}>Admin Profil</Title>}
        style={{ maxWidth: 600, width: "100%" }}
        loading={isLoading}
      >
        {admin && (
          <>
            <Descriptions column={1} bordered size="small">
              <Descriptions.Item label="Ism">{admin.name}</Descriptions.Item>
              <Descriptions.Item label="Yaratilgan vaqt">
                {new Date(admin.createdAt).toLocaleString("uz-UZ")}
              </Descriptions.Item>
              <Descriptions.Item label="Oxirgi yangilanish">
                {new Date(admin.updatedAt).toLocaleString("uz-UZ")}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              className="mt-6"
            >
              <Form.Item
                name="name"
                label="Ismni o'zgartirish"
                rules={[{ required: true, message: "Ism majburiy" }]}
              >
                <Input placeholder="Yangi ism" />
              </Form.Item>

              <Form.Item name="oldPassword" label="Joriy parol">
                <Input.Password placeholder="Joriy parol" />
              </Form.Item>

              <Form.Item
                name="newPassword"
                label="Yangi parol"
                dependencies={["oldPassword"]}
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value && !getFieldValue("oldPassword"))
                        return Promise.resolve();
                      if (value && !getFieldValue("oldPassword"))
                        return Promise.reject(
                          new Error("Avval joriy parolni kiriting")
                        );
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Yangi parol" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Yangilash
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Card>
    </div>
  );
}
