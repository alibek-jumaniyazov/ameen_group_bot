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
} from "recharts";
import { useEffect, useState } from "react";
import {
  useStatistics,
  useUserCountBySubscription,
} from "../../hooks/useStatistics";

export default function Dashboard() {
  const { data: stats, isLoading: loadingStats } = useStatistics();
  const { data: subscriptionStats, isLoading: loadingSubs } =
    useUserCountBySubscription();

  const isLoading = loadingStats || loadingSubs;

  const [monthlyData, setMonthlyData] = useState<
    { month: string; revenue: number; activeSubscriptions: number }[]
  >([]);

  const [subscriptionData, setSubscriptionData] = useState<
    { title: string; active: number; expired: number }[]
  >([]);

  useEffect(() => {
    if (stats) {
      setMonthlyData(
        stats.monthlyRevenue.map((item, i) => ({
          month: item.month,
          revenue: item.revenue,
          activeSubscriptions:
            stats.monthlyActiveSubscriptions[i]?.activeSubscriptions || 0,
        }))
      );
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
      <Row gutter={[16, 16]} className="">
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
          <Card title="Oylik daromad va aktiv obunalar">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={monthlyData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#4C9AFF" name="Daromad" />
                <Bar
                  dataKey="activeSubscriptions"
                  fill="#73D13D"
                  name="Aktiv obunalar"
                />
              </BarChart>
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
                <Bar dataKey="active" fill="#52C41A" name="Aktiv" />
                <Bar dataKey="expired" fill="#FAAD14" name="Muddati tugagan" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
