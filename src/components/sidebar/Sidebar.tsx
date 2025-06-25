import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Image, Layout, Menu, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useState, useMemo } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Icons } from "../../assets/icons";
import { useApi } from "../../context/ApiContext";
import logo from "../../assets/logo.png";
import FullLogo from "../../assets/full_logo.png";

const menuItems = [
  { key: "/", icon: <Icons.dashboard />, label: "Dashboard" },
  { key: "/users", icon: <Icons.person />, label: "Foydalanuvchilar ro'yxati" },
  { key: "/subscribe", icon: <Icons.ticket />, label: "Obuna tariflari" },
  {
    key: "/payment-history",
    icon: <Icons.files />,
    label: "To‘lovlar ro‘yxati",
  },
  {
    key: "/subscription-list",
    icon: <Icons.document />,
    label: "Obunalar ro‘yxati",
  },
  {
    key: "/auto-payment",
    icon: <Icons.refresh />,
    label: "Avtomatik to‘lov urinishlari",
  },
  {
    key: "/send-message",
    icon: <Icons.email />,
    label: "Xabar yuborish va hisobotlar",
  },
  { key: "/6", icon: <Icons.setting />, label: "Sozlamalar" },
];

export default function Sidebar() {
  const { logout } = useApi();
  const [collapsed, setCollapsed] = useState(false);
  const [hasImage] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const currentPageTitle = useMemo(() => {
    const match = menuItems.find((item) => item.key === location.pathname);
    if (match) return match.label;

    if (location.pathname.startsWith("/user")) return "Foydalanuvchi tafsiloti";
    if (location.pathname === "/subscription-statistics")
      return "Foydalanuvchilar obunasi statistikasi";

    return "Sahifa topilmadi";
  }, [location.pathname]);

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <Layout className="h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={300}
        className="relative"
      >
        <div className="flex items-center justify-center gap-2.5 pt-4 pb-2.5">
          {collapsed ? <img src={logo} width={40} /> : <img src={FullLogo} />}
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={handleMenuClick}
          items={menuItems}
        />

        <div
          className="flex items-center justify-center gap-2.5 absolute bottom-10 left-6 cursor-pointer"
          onClick={logout}
        >
          <Icons.logout />
          {!collapsed && (
            <p className="text-sm text-white font-semibold leading-6">Logout</p>
          )}
        </div>
      </Sider>

      <Layout>
        <Header
          style={{ padding: 0, background: colorBgContainer }}
          className="flex items-center justify-between !pr-10"
        >
          <div className="flex items-center gap-2.5">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: 16, width: 64, height: 64 }}
            />
            <h1 className="text-[#1D2026] text-3xl font-bold">
              {currentPageTitle}
            </h1>
          </div>
          <div className="flex items-center gap-2.5">
            <Icons.bell className="size-6 text-black" />
            <Avatar
              size="large"
              icon={
                hasImage ? (
                  <Image src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
                ) : (
                  <UserOutlined />
                )
              }
            />
          </div>
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
