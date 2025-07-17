import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Spin,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useCreateMessage } from "../../hooks/useMessage";
import { useUsers } from "../../hooks/useUser";
import { useEffect, useState } from "react";
import { useSubscriptions } from "../../hooks/useSubscription";
import MessageEditor from "./MessageEditor";
import Base from "antd/es/typography/Base";

export default function SendMessageAction({
  onClose,
  open,
}: {
  onClose: () => void;
  open: boolean;
}) {
  const [form] = Form.useForm();
  const [editorValue, setEditorValue] = useState<string>("");

  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [videoUrl, setVideoUrl] = useState<string | undefined>();
  const [fileUrl, setFileUrl] = useState<string | undefined>();

  const { data: subscriptions } = useSubscriptions();
  const { data: userList, isLoading } = useUsers();
  const createMessage = useCreateMessage();

  const userOptions =
    userList?.data?.map((user) => ({
      value: user.id,
      label: `${user.firstName} ${user.lastName} (${user.phoneNumber})`,
    })) || [];

  const selectedStatus = Form.useWatch("status", form);
  const isSubscriptionDisabled =
    selectedStatus === "EXPIRED" || selectedStatus === "REGISTERED";

  useEffect(() => {
    if (isSubscriptionDisabled) {
      form.setFieldValue("subscriptionTypeId", undefined);
    }
  }, [selectedStatus, isSubscriptionDisabled, form]);

  const onFinish = (values: any) => {
    if (!editorValue.trim()) {
      message.warning("Xabar matni bo‘sh bo‘lishi mumkin emas");
      return;
    }

    const payload = {
      text: editorValue,
      status: values.status === " " ? undefined : values.status || undefined,
      userIds: values.userIds || [],
      subscriptionTypeId: values.subscriptionTypeId
        ? Number(values.subscriptionTypeId)
        : 0,
      fileIds: [imageUrl, videoUrl, fileUrl].filter(Boolean),
      buttons:
        values.buttonText && values.buttonUrl
          ? {
              inline_keyboard: [
                {
                  buttons: [
                    {
                      text: values.buttonText,
                      url: values.buttonUrl,
                    },
                  ],
                },
              ],
            }
          : undefined,
    };

    createMessage.mutate(payload, {
      onSuccess: () => {
        form.resetFields();
        setEditorValue("");
        setImageUrl(undefined);
        setVideoUrl(undefined);
        setFileUrl(undefined);
        onClose();
        message.success("Xabar muvaffaqiyatli yuborildi");
      },
      onError: (err) => {
        console.error(err);
        message.error("Xatolik yuz berdi");
      },
    });
  };

  const uploadProps = (type: "image" | "video" | "file") => ({
    name: "file",
    multiple: false,
    showUploadList: false,
    action: `${import.meta.env.VITE_API_URL}/files/upload`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    onChange(info: any) {
      if (info.file.status === "done") {
        const url = info.file.response?.id;
        if (url) {
          if (type === "image") setImageUrl(url);
          else if (type === "video") setVideoUrl(url);
          else setFileUrl(url);
          message.success(`${info.file.name} yuklandi`);
        }
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} yuklashda xatolik`);
      }
    },
  });

  useEffect(() => {
    if (!open) {
      form.resetFields();
      setEditorValue("");
      setImageUrl(undefined);
      setVideoUrl(undefined);
      setFileUrl(undefined);
    }
  }, [open]);

  return (
    <Drawer
      title="📤 Yangi xabar yuborish"
      width="70vw"
      onClose={onClose}
      open={open}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div className="flex justify-end border-t pt-4">
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
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item
              label="📝 Xabar matni"
              name="text"
              rules={[{ required: true, message: "Xabar matni kerak" }]}
            >
              <MessageEditor value={editorValue} onChange={setEditorValue} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="📦 Tarif" name="subscriptionTypeId">
              <Select
                placeholder="Tarifni tanlang"
                disabled={isSubscriptionDisabled}
                options={subscriptions?.data?.map((sub) => ({
                  value: sub.id.toString(),
                  label: sub.title,
                }))}
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

          {/* Upload Components */}
          <Col span={8}>
            <Form.Item label="🖼️ Rasm">
              <Upload {...uploadProps("image")}>
                <Button icon={<UploadOutlined />}>Rasm tanlang</Button>
              </Upload>
              {imageUrl && (
                <div className="mt-2">
                  <img
                    src={imageUrl}
                    alt="uploaded"
                    className="w-full max-h-[150px] object-contain rounded shadow"
                  />
                  <div className="text-green-600 text-xs mt-1">Yuklandi ✅</div>
                </div>
              )}
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="🎞️ Video">
              <Upload {...uploadProps("video")}>
                <Button icon={<UploadOutlined />}>Video tanlang</Button>
              </Upload>
              {videoUrl && (
                <div className="mt-2">
                  <video
                    src={videoUrl}
                    controls
                    className="w-full max-h-[150px] rounded shadow"
                  />
                  <div className="text-green-600 text-xs mt-1">Yuklandi ✅</div>
                </div>
              )}
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="📎 Fayl">
              <Upload {...uploadProps("file")}>
                <Button icon={<UploadOutlined />}>Fayl tanlang</Button>
              </Upload>
              {/* {fileUrl && (
                <div className="mt-2 truncate text-blue-600 underline text-sm">
                  <a href={fileUrl} target="_blank" rel="noreferrer">
                    {console.log(fileUrl,"aaaaa") as any||fileUrl.split("/").pop()}
                  </a>
                  <div className="text-green-600 text-xs">Yuklandi ✅</div>
                </div>
              )} */}
            </Form.Item>
          </Col>

          {/* Inline Button */}
          <Col span={12}>
            <Form.Item label="🔘 Button matni" name="buttonText">
              <Input placeholder="Masalan: Bog‘lanish" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="🔗 Button URL" name="buttonUrl">
              <Input placeholder="https://your-link.com" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
}
