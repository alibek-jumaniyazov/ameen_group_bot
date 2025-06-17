import {
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };
  return (
    <Layout className="h-[100vh] ">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="text-[#001529] text-center text-xl font-bold my-4 h-7">
          {collapsed ? " " : "Ameen Group"}
        </div>
        <Menu
          theme="light"
          mode="inline"
          onClick={handleMenuClick}
          selectedKeys={[location.pathname]}
          items={[
            {
              key: "/dashboard",
              icon: <HomeOutlined />,
              label: "Dashboard",
            },
            {
              key: "/users",
              icon: <UserOutlined />,
              label: "User",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
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
