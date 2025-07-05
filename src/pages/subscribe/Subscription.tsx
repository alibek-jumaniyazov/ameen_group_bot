import { Button, Tabs, type TabsProps } from "antd";
import SubscribeList from "../../components/subscribe/SubscribeList";
import { Icons } from "../../assets/icons";
import DefnModal from "../../components/subscribe/DefnModal";
import { useState } from "react";
import SubsStatis from "../../components/subscribe/SubsStatis";
import { useSubscriptions } from "../../hooks/useSubscription";
import { Spin } from "antd";
export default function Subscribe() {
  const { data, isLoading } = useSubscriptions();
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
      children: isLoading ? (
        <Spin />
      ) : (
        <SubscribeList data={data?.data ?? []} isLoading={isLoading} />
      ),
    },
    {
      key: "2",
      label: "Obuna statistikasi",
      children: <SubsStatis />,
    },
  ];

  return (
    <div className="Subscribe relative">
      <Tabs
        activeKey={activeTab}
        items={items}
        onChange={onChange}
        tabBarExtraContent={
          activeTab === "1" && (
            <Button
              onClick={() => setOpen(true)}
              type="primary"
              className="!w-[180px] !h-[35px] !rounded-lg !font-normal !text-[14.5px] flex items-center justify-center gap-1.5"
            >
              <Icons.plus /> Yangi tarif qo‘shish
            </Button>
          )
        }
      />
      <DefnModal onClose={onClose} open={open} />
    </div>
  );
}
