import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import { Icons } from "../../assets/icons";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import { useEffect } from "react";

export default function SubscriptionListTableFilter({
  onFilter,
  filters,
}: {
  onFilter: (values: any) => void;
  filters: any;
}) {
  const [form] = useForm();

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
        date: filters.date ? dayjs(filters.date) : undefined,
      });
    }
  }, [filters]);

  return (
    <div className="bg-white rounded-lg border shadow p-4">
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
              <Input
                placeholder="Foydalanuvchi ismi yoki ID"
                prefix={<Icons.search />}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Tarif" name="definition">
              <Select
                placeholder="Tarif tanlang"
                options={[
                  { value: "Boshlang’ich", label: "Boshlang’ich" },
                  { value: "Premium", label: "Premium" },
                  { value: "Biznes", label: "Biznes" },
                ]}
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
