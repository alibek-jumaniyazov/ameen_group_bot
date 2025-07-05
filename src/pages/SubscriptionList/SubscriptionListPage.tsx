import { Icons } from "../../assets/icons";
import { Button, Input } from "antd";
import { useRef, useState } from "react";
import SubscriptionListTableFilter from "../../components/SubscriptionList/SubscriptionListTableFilter";
import SubscriptionListTable from "../../components/SubscriptionList/SubscriptionListTable";

export default function SubscriptionListPage() {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<any>(null);
  const [search, setSearch] = useState<string>("");

  const filterRef = useRef<HTMLDivElement>(null);

  const handleFilter = (values: any) => {
    setFilters(values);
    setSearch("");
    setOpen(false);
  };

  const handleSearch = () => {
    setFilters({ ...filters, searchUser: search });
  };

  return (
    <div className="SubscriptionListPage relative flex flex-col gap-4">
      <div className="w-full flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 w-[357px] h-[44px] rounded-lg border border-[#92959C] px-2.5">
            <Icons.search className="w-5" />
            <Input
              placeholder="Search (ID yoki Foydalanuvchi)"
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
          onClick={() => setOpen((prev) => !prev)}
          type="default"
          className="!bg-[#E1E4E8] !w-[100px] !h-[44px] !font-semibold !text-[16px]"
        >
          <Icons.adjustments /> Filter
        </Button>
      </div>

      {open && (
        <div ref={filterRef} className="mt-1 z-20 relative">
          <SubscriptionListTableFilter
            onFilter={handleFilter}
            filters={filters}
          />
        </div>
      )}

      <SubscriptionListTable filters={filters} />
    </div>
  );
}
