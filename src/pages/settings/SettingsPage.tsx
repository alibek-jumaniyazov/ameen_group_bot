import { Card, Form, Button, message, Spin } from "antd";
import { useEffect } from "react";
import { useSettings, useUpdateSettings } from "../../hooks/useSettings";
import MDEditor from "@uiw/react-md-editor";

export default function SettingsPage() {
  const [form] = Form.useForm();
  const { data, isLoading } = useSettings();
  const updateMutation = useUpdateSettings();

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        aboutAminGroup: data.aboutAminGroup,
        aboutKozimxonTorayev: data.aboutKozimxonTorayev,
      });
    }
  }, [data]);

  const onFinish = async (values: any) => {
    try {
      await updateMutation.mutateAsync(values);
      message.success("Ma'lumotlar saqlandi!");
    } catch (err: any) {
      message.error(err?.response?.data?.message || "Xatolik yuz berdi");
    }
  };

  return (
    <div className="flex justify-center mt-10 px-4">
      <Card style={{ maxWidth: 800, width: "100%" }}>
        {isLoading ? (
          <Spin />
        ) : (
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={data}
          >
            <Form.Item name="aboutAminGroup" label="Amin Group haqida">
              <MDEditor height={200} style={{ background: "#001529" }} />
            </Form.Item>

            <Form.Item
              name="aboutKozimxonTorayev"
              label="Kozimxon Torayev haqida"
            >
              <MDEditor height={200} style={{ background: "#001529" }} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Saqlash
              </Button>
            </Form.Item>
          </Form>
        )}
      </Card>
    </div>
  );
}
