import {
  Button,
  Col,
  Drawer,
  Form,
  Row,
  Select,
  Spin,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useCreateMessage } from "../../hooks/useMessage";
import { useUsers } from "../../hooks/useUser";
import { useSubscriptions } from "../../hooks/useSubscription";
import { useButtons } from "../../hooks/useButtons";
import MessageEditor from "./MessageEditor";
import type { CreateMessageDto } from "../../api/messageApi";

export default function SendMessageAction({ onClose, open }: { onClose: () => void; open: boolean }) {
  const [form] = Form.useForm();
  const [editorValue, setEditorValue] = useState("");
  const [fileIds, setFileIds] = useState<number[]>([]);
  const [selectedButtonIds, setSelectedButtonIds] = useState<number[]>([]);

  const { data: buttonsData } = useButtons();
  const { data: subscriptions } = useSubscriptions();
  const { data: userList, isLoading } = useUsers();
  const createMessage = useCreateMessage();

  const selectedStatus = Form.useWatch("status", form);
  const isSubscriptionDisabled = ["EXPIRED", "REGISTERED"].includes(selectedStatus);

  useEffect(() => {
    if (!open) resetForm();
  }, [open]);

  useEffect(() => {
    if (isSubscriptionDisabled) {
      form.setFieldValue("subscriptionTypeId", undefined);
    }
  }, [selectedStatus]);

  const resetForm = () => {
    form.resetFields();
    setEditorValue("");
    setFileIds([]);
    setSelectedButtonIds([]);
  };

  const handleUpload = (type: string) => ({
    name: "file",
    multiple: false,
    showUploadList: false,
    action: `${import.meta.env.VITE_API_URL}/files/upload`,
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    onChange(info: any) {
      if (info.file.status === "done") {
        const id = info.file.response?.id;
        if (id) {
          setFileIds((prev) => [...prev, id]);
          message.success(`${info.file.name} yuklandi`);
        }
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} yuklashda xatolik`);
      }
    },
  });

  const userOptions = userList?.data?.map((user) => ({
    value: user.id,
    label: `${user.firstName} ${user.lastName} (${user.phoneNumber})`,
  })) || [];

  const onFinish = (values: any) => {
    if (!editorValue.trim()) {
      return message.warning("Xabar matni bo‘sh bo‘lishi mumkin emas");
    }

    const payload: CreateMessageDto = {
      text: editorValue,
      status: values.status === " " ? undefined : values.status,
      userIds: values.userIds || [],
      subscriptionTypeId: values.subscriptionTypeId ? Number(values.subscriptionTypeId) : 0,
      fileIds,
      buttonPlacements: selectedButtonIds.map((id, index) => ({
        buttonId: id,
        row: 0,
        column: index,
      })),
    };

    createMessage.mutate(payload, {
      onSuccess: () => {
        resetForm();
        onClose();
        message.success("Xabar muvaffaqiyatli yuborildi");
      },
      onError: () => message.error("Xatolik yuz berdi"),
    });
  };

  return (
    <Drawer
      title="📤 Yangi xabar yuborish"
      width="70vw"
      onClose={onClose}
      open={open}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div className="flex justify-end border-t pt-4">
          <Button type="primary" className="bg-[#528AF9] rounded-md" onClick={() => form.submit()}>
            Yuborish
          </Button>
        </div>
      }
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item label="📝 Xabar matni" name="text" rules={[{ required: true, message: "Xabar matni kerak" }]}> 
              <MessageEditor value={editorValue} onChange={setEditorValue} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="📦 Tarif" name="subscriptionTypeId">
              <Select
                placeholder="Tarifni tanlang"
                disabled={isSubscriptionDisabled}
                options={subscriptions?.data?.map((sub) => ({ value: sub.id.toString(), label: sub.title }))}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="👤 Foydalanuvchi holati" name="status">
              <Select
                placeholder="Status tanlang"
                options={[
                  { value: " ", label: "Barcha" },
                  { value: "SUBSCRIBE", label: "Obuna olingan" },
                  { value: "REGISTERED", label: "Obuna olinmagan" },
                  { value: "EXPIRED", label: "Obuna muddati tugagan" },
                ]}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="👥 Foydalanuvchilar" name="userIds">
              {isLoading ? (
                <Spin />
              ) : (
                <Select
                  mode="multiple"
                  placeholder="Foydalanuvchilarni yozing va tanlang"
                  showSearch
                  filterOption={(input, option) => (option?.label as string)?.toLowerCase()?.includes(input.toLowerCase())}
                  options={userOptions}
                />
              )}
            </Form.Item>
          </Col>

          {[
            { label: "🖼️ Rasm", type: "image" },
            { label: "🎞️ Video", type: "video" },
            { label: "📎 Fayl", type: "file" },
          ].map(({ label, type }) => (
            <Col span={8} key={type}>
              <Form.Item label={label}>
                <Upload {...handleUpload(type)}>
                  <Button icon={<UploadOutlined />}>{`${label.split(" ")[1]} tanlang`}</Button>
                </Upload>
              </Form.Item>
            </Col>
          ))}

          <Col span={24}>
            <Form.Item label="🔘 Inline tugmalarni tanlang">
              <Select
                mode="multiple"
                placeholder="Tugmalarni tanlang"
                value={selectedButtonIds}
                onChange={setSelectedButtonIds}
                options={buttonsData?.data?.map((btn) => ({ value: btn.id, label: btn.text }))}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
}
