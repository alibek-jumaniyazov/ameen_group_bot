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
import {
  UploadOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useCreateMessage } from "../../hooks/useMessage";
import { useUsers } from "../../hooks/useUser";
import { useEffect, useState } from "react";
import { useSubscriptions } from "../../hooks/useSubscription";
import MessageEditor from "./MessageEditor";

const BUTTON_DATA_OPTIONS = [
  { label: "SUBSCRIPTONS", value: "subscriptons" },
  { label: "BUY_SUBSCRIPTON", value: "subscribe-" },
  { label: "ABOUT_US", value: "about_us" },
  { label: "ABOUT_OWNER", value: "about_owner" },
  { label: "MY_SUBSCRIPTION", value: "my_subscriptions" },
];

export default function SendMessageAction({
  onClose,
  open,
}: {
  onClose: () => void;
  open: boolean;
}) {
  const [form] = Form.useForm();
  const [editorValue, setEditorValue] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<number | undefined>();
  const [videoUrl, setVideoUrl] = useState<number | undefined>();
  const [fileUrl, setFileUrl] = useState<number | undefined>();
  const [buttons, setButtons] = useState([{ text: "", url: "", data: "" }]);
  const [subscriptionIdForButton, setSubscriptionIdForButton] = useState<
    Record<number, number | undefined>
  >({});

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
      buttons: {
        inline_keyboard: [
          {
            buttons: buttons
              .filter((btn, i) => btn.text || btn.url || btn.data)
              .map((btn, i) => {
                const url = btn.url?.trim();
                const data =
                  btn.data === "subscribe-"
                    ? `subscribe-${subscriptionIdForButton[i]}`
                    : btn.data;

                const button: { text: string; data: string; url?: string } = {
                  text: btn.text,
                  data,
                };

                if (url) {
                  button.url = url;
                }

                return button;
              }),
          },
        ],
      },
    };
    createMessage.mutate(payload, {
      onSuccess: () => {
        form.resetFields();
        setEditorValue("");
        setImageUrl(undefined);
        setVideoUrl(undefined);
        setFileUrl(undefined);
        setButtons([{ text: "", url: "", data: "" }]);
        setSubscriptionIdForButton({});
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
        const id = info.file.response?.id;
        if (id) {
          if (type === "image") setImageUrl(id);
          else if (type === "video") setVideoUrl(id);
          else setFileUrl(id);
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
      setButtons([{ text: "", url: "", data: "" }]);
      setSubscriptionIdForButton({});
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
          <Row gutter={24} className="w-full">
            <Col span={8}>
              <Form.Item label="🖼️ Rasm">
                <Upload {...uploadProps("image")}>
                  <Button icon={<UploadOutlined />}>Rasm tanlang</Button>
                </Upload>
                {imageUrl && (
                  <div className="text-green-600 text-xs mt-1">Yuklandi ✅</div>
                )}
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="🎞️ Video">
                <Upload {...uploadProps("video")}>
                  <Button icon={<UploadOutlined />}>Video tanlang</Button>
                </Upload>
                {videoUrl && (
                  <div className="text-green-600 text-xs mt-1">Yuklandi ✅</div>
                )}
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="📎 Fayl">
                <Upload {...uploadProps("file")}>
                  <Button icon={<UploadOutlined />}>Fayl tanlang</Button>
                </Upload>
                {fileUrl && (
                  <div className="text-green-600 text-xs mt-1">Yuklandi ✅</div>
                )}
              </Form.Item>
            </Col>
          </Row>

          <Col span={24}>
            <div className="flex items-center justify-start gap-8">
              <h4 className="text-base font-medium">🔘 Inline tugmalar</h4>
              <Button
                icon={<PlusOutlined />}
                onClick={() =>
                  setButtons([...buttons, { text: "", url: "", data: "" }])
                }
              >
                Button qo'shish
              </Button>
            </div>
            <Row gutter={[16, 16]} className="mt-2">
              {buttons.map((btn, idx) => (
                <Col span={24} key={idx}>
                  <Row gutter={8} align="middle">
                    <Col span={5}>
                      <Input
                        value={btn.text}
                        placeholder="Matn"
                        onChange={(e) => {
                          const newBtns = [...buttons];
                          newBtns[idx].text = e.target.value;
                          setButtons(newBtns);
                        }}
                      />
                    </Col>
                    <Col span={6}>
                      <Input
                        value={btn.url}
                        placeholder="URL"
                        onChange={(e) => {
                          const newBtns = [...buttons];
                          newBtns[idx].url = e.target.value;
                          setButtons(newBtns);
                        }}
                      />
                    </Col>
                    <Col span={6}>
                      <Select
                        className="!w-full"
                        allowClear
                        placeholder="Data"
                        value={btn.data || undefined}
                        onChange={(value) => {
                          const newBtns = [...buttons];
                          newBtns[idx].data = value;
                          setButtons(newBtns);
                        }}
                        options={BUTTON_DATA_OPTIONS}
                      />
                    </Col>
                    {btn.data === "subscribe-" && (
                      <Col span={5}>
                        <Select
                          className="!w-full"
                          placeholder="Tarif tanlang"
                          onChange={(val) => {
                            setSubscriptionIdForButton((prev) => ({
                              ...prev,
                              [idx]: val,
                            }));
                          }}
                          options={subscriptions?.data?.map((s) => ({
                            value: s.id,
                            label: s.title,
                          }))}
                        />
                      </Col>
                    )}
                    <Col span={2}>
                      <Button
                        icon={<DeleteOutlined />}
                        danger
                        onClick={() => {
                          const newBtns = buttons.filter((_, i) => i !== idx);
                          setButtons(newBtns);
                        }}
                      />
                    </Col>
                  </Row>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
}
