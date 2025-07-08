import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useSubscriptions } from "../../hooks/useSubscription";

export default function SubscriptionListTableFilter({
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
      startDate: values.startDate
        ? dayjs(values.startDate).format("YYYY-MM-DD")
        : undefined,
      endDate: values.endDate
        ? dayjs(values.endDate).format("YYYY-MM-DD")
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
        startDate: filters.startDate ? dayjs(filters.startDate) : undefined,
        endDate: filters.endDate ? dayjs(filters.endDate) : undefined,
      });
    }
  }, [filters]);

  return (
    <div className="bg-white shadow-[0px_12px_39px_-17px_rgba(34,60,80,0.29)] rounded-lg  shadow p-4">
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Boshlanish sanasi" name="startDate">
              <DatePicker placeholder="YYYY-MM-DD" className="!w-full" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Tugash sanasi" name="endDate">
              <DatePicker placeholder="YYYY-MM-DD" className="!w-full" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Foydalanuvchi bo’yicha" name="searchUser">
              <Input placeholder="Foydalanuvchi ismi yoki ID" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Tarif" name="definition">
              <Select
                placeholder="Tarif tanlang"
                options={data?.data.map((item) => ({
                  value: item.title,
                  label: item.title,
                }))}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Minimum summa" name="minAmount">
              <Input suffix="so'm" placeholder="Min summa" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Maksimum summa" name="maxAmount">
              <Input suffix="so'm" placeholder="Max summa" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Holati" name="status">
              <Select
                placeholder="Holat tanlang"
                options={[
                  { value: "Faol", label: "Faol" },
                  { value: "Tugagan", label: "Tugagan" },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        <div className="flex justify-between mt-4">
          <Button
            className="!text-[#EAB308] !border-[#EAB308]"
            onClick={handleClear}
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
