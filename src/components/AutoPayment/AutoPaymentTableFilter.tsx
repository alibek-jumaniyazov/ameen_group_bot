import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
} from "antd";
import { Icons } from "../../assets/icons";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";

export default function AutoPaymentTableFilter({
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
    const payload = {
      ...values,
      date: values.date ? dayjs(values.date).format("YYYY/MM/DD") : undefined,
    };
    onFilter(payload);
  };

  return (
    <Drawer
      title="Filtr"
      width={600}
      onClose={onClose}
      open={open}
      footer={
        <div className="flex justify-between">
          <Button
            className="!text-[#EAB308] !border-[#EAB308]"
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
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Sana" name="date">
              <DatePicker placeholder="YYYY/MM/DD" className="!w-full" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Foydalanuvchi yoki ID" name="searchUser">
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
                ]}
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
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
}
