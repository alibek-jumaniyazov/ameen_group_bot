import UsersTabs from "../../components/users/UsersTabs";
import { Icons } from "../../assets/icons";
import { Button, Input } from "antd";
import { useState } from "react";

export default function Users() {
  const [search, setSearch] = useState("");

  return (
    <div className="Users flex flex-col gap-4">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center justify-start gap-1.5">
          <div className="flex items-center justify-start gap-1 w-[357px] h-[44px] rounded-lg border border-[#92959C] py-3 px-2.5">
            <Icons.search className={"w-5"} />
            <Input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              color="#92959C"
              placeholder="Search"
              bordered={false}
              className="placeholder:!text-[#94A3B8]"
            />
          </div>
          <Button type="primary" className="!bg-[#528AF9] !w-[87px] !h-[44px]">
            Search
          </Button>
        </div>
        <Button
          type="text"
          className="!bg-[#E1E4E8] !w-[100px] !h-[44px] !font-semibold !text-[16px]"
        >
          <Icons.adjustments /> Filter
        </Button>
      </div>
      <UsersTabs search={search} />
    </div>
  );
}
