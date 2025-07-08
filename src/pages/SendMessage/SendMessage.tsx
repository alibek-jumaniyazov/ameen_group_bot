import { Icons } from "../../assets/icons";
import { Button, Input } from "antd";
import { useState } from "react";
import SendMessageTable from "../../components/SendMessage/SendMessageTable";
import SendMessageAction from "../../components/SendMessage/SendMessageAction";

export default function SendMessage() {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<any>(null);
  const [search, setSearch] = useState("");

  const onClose = () => setOpen(false);

  const handleSearch = () => {
    setFilters({ ...filters, searchUser: search });
  };

  return (
    <div className="SubscriptionListPage flex flex-col gap-4">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 w-[357px] h-[44px] rounded-lg border border-[#92959C] px-2.5">
            <Icons.search className="w-5" />
            <Input
              placeholder="Search ( yubrilgan xabar orqali )"
              variant="borderless"
              className="placeholder:!text-[#94A3B8]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onPressEnter={handleSearch}
            />
          </div>
          <Button
            type="primary"
            className="!bg-[#528AF9] !w-[87px] !h-[44px]"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
        <Button
          onClick={() => setOpen(true)}
          type="primary"
          className=" !w-[190px] !h-[44px] !rounded-lg !font-normal !text-[14.5px] flex items-center justify-center gap-1.5"
        >
          <Icons.plus /> Yangi xabar qo'shish
        </Button>
      </div>
      <SendMessageTable filters={filters} />
      <SendMessageAction open={open} onClose={onClose} />
    </div>
  );
}
