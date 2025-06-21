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

export default function PaymentHistoryTabsFilter({
  onClose,
  open,
}: {
  onClose: () => void;
  open: boolean;
}) {
  const [form] = Form.useForm();

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const handleChangeStatus = (value: string) => {
    console.log(`selected ${value}`);
  };
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <Drawer title="Filter" width={600} onClose={onClose} open={open}>
      <Form layout="vertical" form={form} hideRequiredMark>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Boshlanish sanasi"
              name="StartDate"
              rules={[
                { required: true, message: "Iltimos, Tarif nomi kiriting" },
              ]}
            >
              <DatePicker
                onChange={onChange}
                placeholder="Boshlanish sanasi"
                className="!w-full"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Tugash sanasi"
              name="EndDate"
              rules={[
                { required: true, message: "Iltimos, Tarif narxi kiriting" },
              ]}
            >
              <DatePicker
                onChange={onChange}
                placeholder="Tugash sanasi"
                className="!w-full"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Foydalanuvchi bo’yicha"
              name="term"
              rules={[{ required: true, message: "Muddati kiriting" }]}
            >
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
            <Form.Item
              label="Tarif"
              name="definition"
              rules={[{ required: true, message: "Tarifni kiriting" }]}
            >
              <Select
                defaultValue="Boshlang’ich"
                onChange={handleChange}
                options={[
                  {
                    value: "Boshlang’ich",
                    label: "Boshlang’ich",
                  },
                  {
                    value: "Premium",
                    label: "Premium",
                  },
                  {
                    value: "Biznes",
                    label: "Biznes",
                  },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Maksimum summasi"
              name="EndDate"
              rules={[
                { required: true, message: "Iltimos, Tarif narxi kiriting" },
              ]}
            >
              <Input suffix="so'm" placeholder="Maksimum summasi" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Minimum summasi"
              name="StartDate"
              rules={[
                { required: true, message: "Iltimos, Tarif nomi kiriting" },
              ]}
            >
              <Input suffix="so'm" placeholder="Minimum summasi" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Holati"
              name="status"
              rules={[{ required: true, message: "Holati kiriting" }]}
            >
              <Select
                defaultValue="Muvaffaqiyatli"
                onChange={handleChangeStatus}
                options={[
                  {
                    value: "Muvaffaqiyatli",
                    label: "Muvaffaqiyatli",
                  },
                  {
                    value: "Muvaffaqiysiz",
                    label: "Muvaffaqiysiz",
                  },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Button type="primary" className="w-full mt-4">
        Qo'shish
      </Button>
    </Drawer>
  );
}
