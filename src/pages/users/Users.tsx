import UsersTabs from "../../components/users/UsersTabs";
import { Icons } from "../../assets/icons";
import { Button, Input } from "antd";
import { useState } from "react";
import UsersTabsFilter from "../../components/users/UsersTabsFilter";

export default function Users() {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<any>({});
  const [search, setSearch] = useState("");

  const handleFilter = (values: any) => {
    setFilters(values || {});
    setSearch("");
    setOpen(false);
  };

  const handleSearch = () => {
    setFilters({
      ...filters,
      name: search,
    });
  };

  return (
    <div className="Users flex flex-col gap-4">
      <div className="w-full flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 w-[357px] h-[44px] rounded-lg border border-[#92959C] px-2.5">
            <Icons.search className={"w-5"} />
            <Input
              placeholder="Qidirib topish ismi orqali"
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
          type="text"
          className="!bg-[#E1E4E8] !w-[100px] !h-[44px] !font-semibold !text-[16px]"
          onClick={() => setOpen((prev) => !prev)}
        >
          <Icons.adjustments /> Filter
        </Button>
      </div>
      {open && (
        <div className="transition-all duration-300 ease-in-out">
          <UsersTabsFilter onFilter={handleFilter} filters={filters} />
        </div>
      )}
      <UsersTabs filters={filters} />
    </div>
  );
}
