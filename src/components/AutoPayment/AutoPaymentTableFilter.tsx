import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { Icons } from "../../assets/icons";
import dayjs from "dayjs";
import { useSubscriptions } from "../../hooks/useSubscription";

export default function AutoPaymentTableFilter({
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
      date: values.date ? dayjs(values.date).format("YYYY-MM-DD") : undefined,
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
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="Sana" name="date">
            <DatePicker
              placeholder="YYYY-MM-DD"
              className="!w-full"
              format="YYYY-MM-DD"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="Foydalanuvchi yoki ID" name="searchUser">
            <Input
              placeholder="Foydalanuvchi ismi yoki ID"
            />
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
              allowClear
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Min summa" name="minAmount">
            <Input suffix="so'm" placeholder="Masalan: 100000" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Max summa" name="maxAmount">
            <Input suffix="so'm" placeholder="Masalan: 500000" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="Holati" name="status">
            <Select
              placeholder="Holat tanlang"
              options={[
                { value: "Muvaffaqiyatli", label: "Muvaffaqiyatli" },
                { value: "Xato", label: "Xato" },
              ]}
              allowClear
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Xato sababi" name="error">
            <Select
              placeholder="Xato sababini tanlang"
              options={[
                { value: "Yechildi", label: "Yechildi" },
                {
                  value: "Kartada mablag' yetarli emas",
                  label: "Kartada mablag' yetarli emas",
                },
              ]}
              allowClear
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
          className="!bg-[#528AF9]"
          onClick={() => form.submit()}
        >
          Ko’rish
        </Button>
      </div>
    </Form>
  );
}
