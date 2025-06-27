import { Button, Tabs, type TabsProps } from "antd";
import SubscribeList from "../../components/subscribe/SubscribeList";
import { Icons } from "../../assets/icons";
import DefnModal from "../../components/subscribe/DefnModal";
import { useState } from "react";
import SubsStatis from "../../components/subscribe/SubsStatis";

export default function Subscribe() {
  const [open, setOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("1");

  const onClose = () => {
    setOpen(false);
  };

  const onChange = (key: string) => {
    setActiveTab(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Tariflar ro‘yxati",
      children: <SubscribeList />,
    },
    {
      key: "2",
      label: "Obuna statistikasi",
      children: <SubsStatis />,
    },
  ];

  return (
    <div className="Subscribe relative">
      <Tabs activeKey={activeTab} items={items} onChange={onChange} />
      {activeTab === "1" && (
        <Button
          onClick={() => setOpen(true)}
          type="primary"
          className="!absolute right-0 top-0 !w-[180px] !h-[35px] !rounded-lg !font-normal !text-[14.5px] flex items-center justify-center gap-1.5"
        >
          <Icons.plus /> Yangi tarif qo‘shish
        </Button>
      )}
      <DefnModal onClose={onClose} open={open} />
    </div>
  );
}
