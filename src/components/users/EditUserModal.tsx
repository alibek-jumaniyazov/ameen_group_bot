import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Space,
  Switch,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { Icons } from "../../assets/icons";
import { useUpdateUser, useDeleteUser } from "../../hooks/useUser";
import type { User } from "../../api/userApi";

export default function EditUserModal({
  onClose,
  open,
  record,
}: {
  onClose: () => void;
  open: boolean;
  record: User | null;
}) {
  const [form] = Form.useForm();
  const [showEditInputs, setShowEditInputs] = useState(true);

  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  useEffect(() => {
    if (record) {
      form.setFieldsValue({ ...record });
    }
  }, [record, form]);

  const onFinish = (values: Partial<User>) => {
    if (!record) return;

    const cleanedData = {
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      email: values.email,
      inGroup: values.inGroup,
      status: values.status,
      username: values.username,
      lastActiveAt: values.lastActiveAt,
    };

    updateUser.mutate(
      { id: record.id, data: cleanedData },
      {
        onSuccess: () => {
          message.success("Foydalanuvchi muvaffaqiyatli yangilandi");
          onClose();
        },
        onError: (err) => {
          console.log(err);

          message.error("Xatolik yuz berdi");
        },
      }
    );
  };

  const handleDelete = () => {
    if (!record) return;
    deleteUser.mutate(record.id, {
      onSuccess: () => {
        message.success("Foydalanuvchi o‘chirildi");
        onClose();
      },
      onError: () => {
        message.error("O‘chirishda xatolik yuz berdi");
      },
    });
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
            onClick={() => setShowEditInputs((prev) => !prev)}
            className="p-2 border border-yellow-500 rounded-lg cursor-pointer"
          >
            <Icons.pencilY />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 border border-red-500 rounded-lg cursor-pointer"
          >
            <Icons.delete />
          </button>
        </Space>
      }
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Ismi"
              name="firstName"
              rules={[{ required: true, message: "Ism kiriting" }]}
            >
              <Input disabled={showEditInputs} placeholder="Ism" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Familiya"
              name="lastName"
              rules={[{ required: true, message: "Familiya kiriting" }]}
            >
              <Input disabled={showEditInputs} placeholder="Familiya" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Telefon raqam"
              name="phoneNumber"
              rules={[
                { required: true, message: "Telefon raqam kiriting" },
                {
                  pattern: /^\+998\d{9}$/,
                  message:
                    "Telefon raqam +998 bilan va 9 ta raqam bilan yozilishi kerak",
                },
              ]}
            >
              <Input disabled={showEditInputs} placeholder="+998901234567" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Email" name="email">
              <Input disabled={showEditInputs} placeholder="example@mail.com" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Username" name="username">
              <Input disabled={showEditInputs} placeholder="username" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Holat" name="status">
              <Input
                disabled={showEditInputs}
                placeholder="REGISTERED | ACTIVE"
              />
            </Form.Item>
          </Col>
        </Row>

        {/* <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Guruhda" name="inGroup" valuePropName="checked">
              <Switch disabled={showEditInputs} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Oxirgi faollik" name="lastActiveAt">
              <Input
                disabled={showEditInputs}
                placeholder="2025-06-27T10:11:59.193Z"
              />
            </Form.Item>
          </Col>
        </Row> */}

        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              className="w-full mt-4"
              disabled={showEditInputs}
              loading={updateUser.isPending}
            >
              Saqlash
            </Button>
          )}
        </Form.Item>
      </Form>
    </Drawer>
  );
}
