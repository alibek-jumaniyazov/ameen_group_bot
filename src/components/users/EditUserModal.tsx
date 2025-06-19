import { Button, Col, Drawer, Form, Input, Row, Select, Space } from "antd";
import { useState } from "react";
import { Icons } from "../../assets/icons";

const { Option } = Select;

export default function EditUserModal({
  onClose,
  open,
}: {
  onClose: () => void;
  open: boolean;
}) {
  const [showEditInputs, setShowEditInputs] = useState(true);
  return (
    <div className="EditUserModal">
      <Drawer
        title="Foydalanuvchi ma’lumotlari"
        width={600}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <button
              onClick={() => setShowEditInputs(!showEditInputs)}
              className="p-2 border border-yellow-500 rounded-lg cursor-pointer"
            >
              <Icons.pencilY />
            </button>
            <button className=" p-2 border border-red-500 rounded-lg cursor-pointer">
              <Icons.delete />
            </button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Name"
                rules={[{ required: true, message: "Please enter user name" }]}
              >
                <Input
                  placeholder="Please enter user name"
                  name="name"
                  disabled={showEditInputs}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="surname"
                rules={[{ required: true, message: "Please enter user name" }]}
              >
                <Input
                  placeholder="Please enter user name"
                  name="surname"
                  disabled={showEditInputs}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  );
}
