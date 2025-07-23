import {
  Form,
  Button,
  message,
  Spin,
  Input,
  Table,
  Space,
  Popconfirm,
  Modal,
  Tabs,
  Select,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useSettings, useUpdateSettings } from "../../hooks/useSettings";
import MDEditor from "@uiw/react-md-editor";
import {
  useButtons,
  useCreateButton,
  useUpdateButton,
  useDeleteButton,
} from "../../hooks/useButtons";
import { useSubscriptions } from "../../hooks/useSubscription";
import type { Button as ButtonType } from "../../api/buttonsApi";

export default function SettingsPage() {
  const [form] = Form.useForm();
  const [buttonForm] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingButton, setEditingButton] = useState<ButtonType | null>(null);
  const [imagePreviews, setImagePreviews] = useState<{
    aboutAminGroupImageId?: string;
    aboutKozimxonTorayevImageId?: string;
  }>({});

  const { data, isLoading } = useSettings();
  const updateMutation = useUpdateSettings();
  const { data: buttonsData, isLoading: isButtonsLoading } = useButtons();
  const createButton = useCreateButton();
  const updateButton = useUpdateButton();
  const deleteButton = useDeleteButton();
  const { data: subscriptions } = useSubscriptions();

  const dataValue = Form.useWatch("data", buttonForm);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        aboutAminGroup: data.aboutAminGroup,
        aboutKozimxonTorayev: data.aboutKozimxonTorayev,
        aboutAminGroupImageId: data.aboutAminGroupImageId,
        aboutKozimxonTorayevImageId: data.aboutKozimxonTorayevImageId,
      });

      setImagePreviews({
        aboutAminGroupImageId: data.aboutAminGroupImage?.url || undefined,
        aboutKozimxonTorayevImageId:
          data.aboutKozimxonTorayevImage?.url || undefined,
      });
    }
  }, [data]);

  const onFinish = async (values: any) => {
    console.log("Submitting settings:", values);
    try {
      await updateMutation.mutateAsync(values);
      message.success("Ma'lumotlar saqlandi!");
    } catch (err: any) {
      message.error(err?.response?.data?.message || "Xatolik yuz berdi");
    }
  };

  const handleUploadChange = (fieldName: string) => (info: any) => {
    if (info.file.status === "done") {
      const fileIdRaw = info.file.response?.id;
      const fileUrl = info.file.response?.url;

      const fileId = Number(fileIdRaw);
      if (!isNaN(fileId) && fileUrl) {
        form.setFieldValue(fieldName, fileId);
        setImagePreviews((prev) => ({ ...prev, [fieldName]: fileUrl }));
        message.success("Rasm muvaffaqiyatli yuklandi");
      }
    }
  };

  const handleCreateOrUpdate = async () => {
    try {
      const values = await buttonForm.validateFields();
      if(values.subscriptionId){
        values.data = `subscribe-${values.subscriptionId}`;
        delete values.subscriptionId;
      }
      if (editingButton) {
        await updateButton.mutateAsync({
          id: editingButton.id,
          payload: values,
        });
        message.success("Tugma yangilandi");
      } else {
        await createButton.mutateAsync(values);
        message.success("Tugma yaratildi");
      }
      setIsModalOpen(false);
      buttonForm.resetFields();
      setEditingButton(null);
    } catch (err: any) {
      message.error(err?.response?.data?.message || "Xatolik");
    }
  };

  const handleDelete = async (record: ButtonType) => {
    if (record.default) {
      message.warning("Bu tugmani o‘chirish mumkin emas");
      return;
    }
    try {
      await deleteButton.mutateAsync(record.id);
      message.success("Tugma o‘chirildi");
    } catch (err: any) {
      message.error("O‘chirishda xatolik");
    }
  };

  const columns = [
    { title: "Text", dataIndex: "text" },
    { title: "Data", dataIndex: "data" },
    {
      title: "URL",
      dataIndex: "url",
      render: (url: string | null) => url || "—",
    },
    {
      title: "Amallar",
      render: (_: any, record: ButtonType) => (
        <Space>
          <Button
            size="small"
            onClick={() => {
              setEditingButton(record);
              buttonForm.setFieldsValue(record);
              setIsModalOpen(true);
            }}
          >
            Tahrirlash
          </Button>
          {!record.default && (
            <Popconfirm
              title="Ishonchingiz komilmi?"
              onConfirm={() => handleDelete(record)}
              okText="Ha"
              cancelText="Yo‘q"
            >
              <Button danger size="small">
                O‘chirish
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="">
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Owner info" key="1">
          <Spin spinning={isLoading}>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              <Form.Item name="aboutAminGroup" label="Amin Group haqida">
                <MDEditor height={200} data-color-mode="light" />
              </Form.Item>
              <Form.Item
                name="aboutKozimxonTorayev"
                label="Kozimxon Torayev haqida"
              >
                <MDEditor height={200} data-color-mode="light" />
              </Form.Item>
              <Form.Item label="Amin Group rasmi" name="aboutAminGroupImageId">
                <Upload
                  name="file"
                  action={`${import.meta.env.VITE_API_URL}/files/upload`}
                  showUploadList={false}
                  onChange={handleUploadChange("aboutAminGroupImageId")}
                >
                  <Button icon={<UploadOutlined />}>Yangi rasm yuklash</Button>
                </Upload>
                {data?.aboutAminGroupImage?.url && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">Joriy rasm:</p>
                    <img
                      src={`${import.meta.env.VITE_BASE_URL}${
                        data.aboutAminGroupImage.url
                      }`}
                      alt="Oldingi rasm"
                      className="w-24 rounded border"
                    />
                  </div>
                )}
                {imagePreviews.aboutAminGroupImageId && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">Yangi rasm:</p>
                    <img
                      src={`${import.meta.env.VITE_BASE_URL}${
                        imagePreviews.aboutAminGroupImageId
                      }`}
                      alt="Preview"
                      className="w-24 rounded border"
                    />
                  </div>
                )}
              </Form.Item>
              <Form.Item
                label="Kozimxon Torayev rasmi"
                name="aboutKozimxonTorayevImageId"
              >
                <Upload
                  name="file"
                  action={`${import.meta.env.VITE_API_URL}/files/upload`}
                  showUploadList={false}
                  onChange={handleUploadChange("aboutKozimxonTorayevImageId")}
                >
                  <Button icon={<UploadOutlined />}>Yangi rasm yuklash</Button>
                </Upload>
                {data?.aboutKozimxonTorayevImage?.url && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">Joriy rasm:</p>
                    <img
                      src={`${import.meta.env.VITE_BASE_URL}${
                        data.aboutKozimxonTorayevImage.url
                      }`}
                      alt="Oldingi rasm"
                      className="w-24 rounded border"
                    />
                  </div>
                )}
                {imagePreviews.aboutKozimxonTorayevImageId && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">Yangi rasm:</p>
                    <img
                      src={`${import.meta.env.VITE_BASE_URL}${
                        imagePreviews.aboutKozimxonTorayevImageId
                      }`}
                      alt="Preview"
                      className="w-24 rounded border"
                    />
                  </div>
                )}
              </Form.Item>
              <Form.Item className="lg:col-span-2">
                <Button type="primary" htmlType="submit" block>
                  Saqlash
                </Button>
              </Form.Item>
            </Form>
          </Spin>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Inline buttons" key="2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Tugmalar ro‘yxati</h2>
            <Button
              type="primary"
              onClick={() => {
                setEditingButton(null);
                buttonForm.resetFields();
                setIsModalOpen(true);
              }}
            >
              + Yangi tugma
            </Button>
          </div>
          <Table
            columns={columns}
            dataSource={buttonsData?.data || []}
            loading={isButtonsLoading}
            rowKey="id"
            pagination={false}
          />
        </Tabs.TabPane>
      </Tabs>

      <Modal
        open={isModalOpen}
        title={editingButton ? "Tugmani tahrirlash" : "Yangi tugma"}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleCreateOrUpdate}
        okText={editingButton ? "Saqlash" : "Qo‘shish"}
      >
        <Form form={buttonForm} layout="vertical">
          <Form.Item
            label="Text"
            name="text"
            rules={[{ required: true, message: "Text kiriting" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Data"
            name="data"
            rules={[{ required: true, message: "Data kiriting" }]}
          >
            <Select
              options={[
                { label: "SUBSCRIPTONS", value: "subscriptons" },
                { label: "BUY_SUBSCRIPTON", value: "subscribe-" },
                { label: "ABOUT_US", value: "about_us" },
                { label: "ABOUT_OWNER", value: "about_owner" },
                { label: "MY_SUBSCRIPTION", value: "my_subscriptions" },
              ]}
              placeholder="Data ni tanlang"
            />
          </Form.Item>
          {dataValue === "subscribe-" && (
            <Form.Item
              label="Obuna turini tanlang"
              name="subscriptionId"
              rules={[{ required: true, message: "Tarif tanlang" }]}
            >
              <Select
                options={subscriptions?.data?.map((s) => ({
                  label: s.title,
                  value: s.id,
                }))}
                placeholder="Obuna turini tanlang"
              />
            </Form.Item>
          )}
          <Form.Item label="URL" name="url">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
