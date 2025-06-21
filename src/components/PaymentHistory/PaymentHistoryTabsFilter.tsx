import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  type DatePickerProps,
} from "antd";
import { Icons } from "../../assets/icons";
import { useForm } from "antd/es/form/Form";

export default function PaymentHistoryTabsFilter({
  onClose,
  open,
  onFilter,
}: {
  onClose: () => void;
  open: boolean;
  onFilter: (values: any) => void;
}) {
  const [form] = useForm();

  const onFinish = (values: any) => {
    onFilter(values); // ✅ filter qiymatlarini jo‘natish
    onClose();
  };

  const onDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log("Date selected:", dateString);
  };

  return (
    <Drawer
      title="Filter"
      width={600}
      onClose={onClose}
      open={open}
      footer={
        <div className="w-full flex justify-between items-center">
          <Button
            className="!text-[#EAB308] !border-[#EAB308] !px-4 !py-3.5"
            onClick={() => form.resetFields()}
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
      }
    >
      <Form
        layout="vertical"
        form={form}
        hideRequiredMark
        onFinish={onFinish}
        initialValues={{
          definition: "Boshlang’ich",
          status: "Muvaffaqiyatli",
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Boshlanish sanasi" name="startDate">
              <DatePicker
                onChange={onDateChange}
                placeholder="Boshlanish sanasi"
                className="!w-full"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Tugash sanasi" name="endDate">
              <DatePicker
                onChange={onDateChange}
                placeholder="Tugash sanasi"
                className="!w-full"
              />
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
              <Input suffix="so'm" placeholder="Maksimum summasi" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Minimum summasi" name="minAmount">
              <Input suffix="so'm" placeholder="Minimum summasi" />
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
      </Form>
    </Drawer>
  );
}
