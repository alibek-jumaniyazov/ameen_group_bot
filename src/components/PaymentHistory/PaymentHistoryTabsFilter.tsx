import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import { Icons } from "../../assets/icons";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";

export default function PaymentHistoryTabsFilter({
  onFilter,
}: {
  onFilter: (values: any) => void;
}) {
  const [form] = useForm();

  const onFinish = (values: any) => {
    const payload = {
      ...values,
      startDate: values.startDate
        ? dayjs(values.startDate).format("YYYY/MM/DD")
        : undefined,
      endDate: values.endDate
        ? dayjs(values.endDate).format("YYYY/MM/DD")
        : undefined,
    };
    onFilter(payload);
    form.resetFields();
  };

  return (
    <div className="bg-white border rounded-lg p-4 mt-2 shadow">
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={{
          definition: "Boshlang’ich",
          status: "Muvaffaqiyatli",
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Boshlanish sanasi" name="startDate">
              <DatePicker className="w-full" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Tugash sanasi" name="endDate">
              <DatePicker className="w-full" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Foydalanuvchi bo’yicha" name="searchUser">
              <Input
                type="search"
                placeholder="Foydalanuvchi bo’yicha"
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
            <Form.Item label="Maksimum summasi" name="maxAmount">
              <Input suffix="so'm" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Minimum summasi" name="minAmount">
              <Input suffix="so'm" />
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
                  { value: "Muvaffaqiysiz", label: "Muvaffaqiysiz" },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        <div className="flex justify-between mt-4">
          <Button
            onClick={() => form.resetFields()}
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
