import { Icons } from "../../assets/icons";
import { Button, Input } from "antd";
import PaymentHistoryTabs from "../../components/PaymentHistory/PaymentHistoryTabs";
import PaymentHistoryTabsFilter from "../../components/PaymentHistory/PaymentHistoryTabsFilter";
import { useState } from "react";
import { useTransactions } from "../../hooks/useTransaction";

export default function PaymentHistory() {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<any>();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useTransactions({
    ...filters,
    username: search || undefined,
    page,
    limit,
  });

  const handleFilter = (values: any) => {
    const payload = {
      subscriptionTypeId: values?.definition || undefined,
      minPrice: values?.minAmount ? Number(values.minAmount) : undefined,
      maxPrice: values?.maxAmount ? Number(values.maxAmount) : undefined,
      paymentType: filters?.paymentType,
    };
    setFilters(payload);
    setSearch("");
    setPage(1);
    setOpen(false);
  };

  const handleSearch = () => {
    setPage(1);
  };

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <div className="Users flex flex-col gap-4">
      <div className="w-full flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 w-[357px] h-[44px] rounded-lg border border-[#92959C] px-2.5">
            <Icons.search className="w-5" />
            <Input
              placeholder="Search (Foydalanuvchi username)"
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
        <div className="transition-all duration-300 ease-in-out">
          <PaymentHistoryTabsFilter onFilter={handleFilter} filters={filters} />
        </div>
      )}
      <PaymentHistoryTabs
        data={data?.data ?? []}
        loading={isLoading}
        page={page}
        limit={limit}
        total={data?.total ?? 0}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
