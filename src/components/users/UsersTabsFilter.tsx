import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import { Icons } from "../../assets/icons";
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
      ...values,
      date: values.date
        ? dayjs(values.date).format("YYYY-MM-DD HH:mm")
        : undefined,
    };
    onFilter(payload);
  };

  const handleClear = () => {
    form.resetFields();
    onFilter(null);
  };

  useEffect(() => {
    if (filters) {
      form.setFieldsValue({
        ...filters,
        date: filters.date
          ? dayjs(filters.date, "YYYY-MM-DD HH:mm")
          : undefined,
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
            <Form.Item label="Foydalanuvchi bo’yicha" name="searchUser">
              <Input
                type="search"
                placeholder="Foydalanuvchi"
              
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Tarif" name="definition">
              <Select
                placeholder="Tarif tanlang"
                allowClear
                options={data?.data.map((item) => ({
                  value: item.title,
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
