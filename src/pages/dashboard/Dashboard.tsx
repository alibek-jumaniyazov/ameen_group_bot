import { Card, Col, Row, Statistic } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { useEffect, useState } from "react";
import {
  useStatistics,
  useUserCountBySubscription,
} from "../../hooks/useStatistics";

const MONTHS = [
  "Yanvar",
  "Fevral",
  "Mart",
  "Aprel",
  "May",
  "Iyun",
  "Iyul",
  "Avgust",
  "Sentyabr",
  "Oktyabr",
  "Noyabr",
  "Dekabr",
];

export default function Dashboard() {
  const { data: stats, isLoading: loadingStats } = useStatistics();
  const { data: subscriptionStats, isLoading: loadingSubs } =
    useUserCountBySubscription();

  const isLoading = loadingStats || loadingSubs;

  const [monthlyData, setMonthlyData] = useState<
    {
      month: string;
      revenue: number;
      activeSubscriptions: number;
      pendingPayments: number;
    }[]
  >([]);

  const [subscriptionData, setSubscriptionData] = useState<
    { title: string; active: number; expired: number }[]
  >([]);

  useEffect(() => {
    if (stats) {
      const filledMonthlyData = MONTHS.map((month) => {
        const revenueItem = stats.monthlyRevenue.find(
          (item) => item.month === month
        );
        const subsItem = stats.monthlyActiveSubscriptions.find(
          (item) => item.month === month
        );
        const pendingItem = stats.monthlyPendingPayments?.find(
          (item) => item.month === month
        );

        return {
          month,
          revenue: revenueItem?.revenue || 0,
          activeSubscriptions: subsItem?.activeSubscriptions || 0,
          pendingPayments: pendingItem?.pendingPayments || 0,
        };
      });

      setMonthlyData(filledMonthlyData);
    }
  }, [stats]);

  useEffect(() => {
    if (subscriptionStats) {
      setSubscriptionData(
        subscriptionStats.map((item) => ({
          title: item.subscriptionType.title,
          active: item.activeCount,
          expired: item.expiredCount,
        }))
      );
    }
  }, [subscriptionStats]);

  return (
    <div className="p-4 max-h-[800px] overflow-y-auto">
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card loading={isLoading}>
            <Statistic
              title="Foydalanuvchilar soni"
              value={stats?.usersCount || 0}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card loading={isLoading}>
            <Statistic
              title="Aktiv obunalar"
              value={stats?.activeSubscriptionsCount || 0}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card loading={isLoading}>
            <Statistic
              title="Joriy oy daromadi"
              value={stats?.totalRevenueThisMonth || 0}
              suffix="so'm"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card loading={isLoading}>
            <Statistic
              title="Kutilayotgan to‘lovlar"
              value={stats?.pendingPaymentsThisMonth || 0}
              suffix="so'm"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-8">
        <Col span={24}>
          <Card title="Oylik daromad, aktiv obunalar va kutilayotgan to‘lovlar">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={monthlyData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1677FF" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#1677FF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorSubs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#52C41A" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#52C41A" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FA8C16" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#FA8C16" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#1677FF"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  name="Daromad"
                />
                <Area
                  type="monotone"
                  dataKey="activeSubscriptions"
                  stroke="#52C41A"
                  fillOpacity={1}
                  fill="url(#colorSubs)"
                  name="Aktiv obunalar"
                />
                <Area
                  type="monotone"
                  dataKey="pendingPayments"
                  stroke="#FA8C16"
                  fillOpacity={1}
                  fill="url(#colorPending)"
                  name="Kutilayotgan to‘lovlar"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-4">
        <Col span={24}>
          <Card title="Tariflar bo‘yicha foydalanuvchilar statistikasi">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={subscriptionData}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="title" />
                <Tooltip />
                <Legend />
                <Bar dataKey="active" fill="#1677FF" name="Aktiv" />
                <Bar dataKey="expired" fill="#FAAD14" name="Muddati tugagan" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
