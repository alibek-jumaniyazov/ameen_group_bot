import { Icons } from "../../assets/icons";
import { Button, Input } from "antd";
import { useState } from "react";
import AutoPaymentTable from "../../components/AutoPayment/AutoPaymentTable";
import AutoPaymentTableFilter from "../../components/AutoPayment/AutoPaymentTableFilter";
import { useTransactionByPaymentType } from "../../hooks/useTransaction";

export default function AutoPayment() {
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState<any>(null);
  const [search, setSearch] = useState<string>("");
  const { data } = useTransactionByPaymentType("AUTO");

  const handleFilter = (values: any) => {
    setFilters(values);
    setSearch("");
    setShowFilter(false);
  };

  const handleSearch = () => {
    setFilters({ ...filters, searchUser: search });
  };

  return (
    <div className="AutoPayment flex flex-col gap-4">
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
          onClick={() => setShowFilter((prev) => !prev)}
          type="text"
          className="!bg-[#E1E4E8] !w-[100px] !h-[44px] !font-semibold !text-[16px]"
        >
          <Icons.adjustments /> Filter
        </Button>
      </div>

      {showFilter && (
        <div className="shadow-[0px_12px_39px_-17px_rgba(34,60,80,0.29)] rounded-xl p-4 bg-white z-20">
          <AutoPaymentTableFilter onFilter={handleFilter} filters={filters} />
        </div>
      )}

      <AutoPaymentTable filters={filters} data={data?.data ?? []} />
    </div>
  );
}
