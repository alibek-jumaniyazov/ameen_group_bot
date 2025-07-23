import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useSubscriptions } from "../../hooks/useSubscription";

export default function UsersTabsFilter({
  onFilter,
  filters,
}: {
  onFilter: (values: any) => void;
  filters: any;
}) {
  const [form] = useForm();
  const { data } = useSubscriptions();

  const onFinish = (values: any) => {
    const payload = {
      subscriptionTypeId: values.definition,
      status: values.status,
      name: values.searchUser,
      phoneNumber: values.phoneNumber,
      telegramId: values.telegramId,
      date: values.date
        ? dayjs(values.date).format("YYYY-MM-DD HH:mm")
        : undefined,
    };
    onFilter(payload);
  };

  const handleClear = () => {
    form.resetFields();
    onFilter({});
  };

  useEffect(() => {
    if (filters) {
      form.setFieldsValue({
        ...filters,
        date: filters.date
          ? dayjs(filters.date, "YYYY-MM-DD HH:mm")
          : undefined,
        searchUser: filters.name || filters.phoneNumber || filters.telegramId,
      });
    }
  }, [filters]);

  return (
    <div className="bg-white shadow-[0px_12px_39px_-17px_rgba(34,60,80,0.29)] rounded-lg p-4 mt-2 shadow">
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Sana va vaqt" name="date">
              <DatePicker
                showTime={{ format: "HH:mm" }}
                format="YYYY-MM-DD HH:mm"
                className="w-full"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Foydalanuvchi Ismi" name="searchUser">
              <Input
                type="search"
                placeholder="Foydalanuvchi ismi orqali qidirish"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Telefon Raqam" name="phoneNumber">
              <Input
                type="search"
                placeholder="Foydalanuvchi Telefon raqami orqali qidirish"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Telegram ID" name="telegramId">
              <Input
                type="search"
                placeholder="Foydalanuvchi Telegram ID orqali qidirish"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Status" name="status">
              <Select
                placeholder="Status tanlang"
                allowClear
                options={[
                  {
                    value: "REGISTERED",
                    label: "Ro'yxatdan o'tgan",
                  },
                  { value: "SUBSCRIBE", label: "Faol obuna" },
                  { value: "EXPIRED", label: "Muddati tugagan" },
                  { value: "INACTIVE", label: "Noaktiv" },
                  {
                    value: "UNSUBSCRIBE",
                    label: "Obunani bekor qilgan",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Tarif" name="definition">
              <Select
                placeholder="Tarif tanlang"
                allowClear
                options={data?.data.map((item) => ({
                  value: item.id,
                  label: item.title,
                }))}
              />
            </Form.Item>
          </Col>
        </Row>
        <div className="flex justify-between mt-4">
          <Button
            onClick={handleClear}
            className="!text-[#EAB308] !border-[#EAB308]"
          >
            Tozalash
          </Button>
          <Button
            type="primary"
            className="bg-[#528AF9]"
            onClick={() => form.submit()}
          >
            Ko’rish
          </Button>
        </div>
      </Form>
    </div>
  );
}
