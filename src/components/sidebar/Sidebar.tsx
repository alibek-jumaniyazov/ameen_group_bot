import {
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Image, Layout, Menu, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Icons } from "../../assets/icons";
import { useApi } from "../../context/ApiContext";
import logo from "../../assets/logo.png";
import FullLogo from "../../assets/full_logo.png";
export default function Sidebar() {
  const items = [
    {
      key: "/",
      icon: <Icons.dashboard />,
      label: "Dashboard",
    },
    {
      key: "/users",
      icon: <Icons.person />,
      label: "Foydalanuvchilar ro'yxati",
    },
    {
      key: "/subscribe",
      icon: <Icons.ticket />,
      label: "Obuna tariflari",
    },
    {
      key: "/payment-history",
      icon: <Icons.files />,
      label: "To‘lovlar ro‘yxati",
    },
    {
      key: "/3",
      icon: <Icons.document />,
      label: "Obunalar ro‘yxati",
    },
    {
      key: "/4",
      icon: <Icons.refresh />,
      label: "Avtomatik to‘lov urinishlari",
    },
    {
      key: "/5",
      icon: <Icons.sim />,
      label: "Statik xabarlar",
    },
    {
      key: "/6",
      icon: <Icons.email />,
      label: "Xabar yuborish va hisobotlar",
    },
    {
      key: "/7",
      icon: <Icons.setting />,
      label: "Sozlamalar",
    },
  ];

  const { logout } = useApi();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [pathName, setPathName] = useState<string>("Dashboard");
  const [image, setImage] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const url =
    "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg";

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
    const selectedItem = items.find((item) => item.key === key);
    if (selectedItem) {
      setPathName(selectedItem.label);
    }
  };

  return (
    <Layout className="h-[100vh] ">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={300}
        className="relative"
      >
        <div className="!w-full flex items-center justify-center gap-2.5 pt-4 pb-2.5">
          {collapsed ? <img src={logo} width={40} /> : <img src={FullLogo} />}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          className=""
          onClick={handleMenuClick}
          selectedKeys={[location.pathname]}
          items={items}
        />

        <div
          className="flex items-center justify-center gap-2.5 absolute bottom-10 left-6 cursor-pointer"
          onClick={() => logout()}
        >
          <Icons.logout />
          {collapsed ? (
            ""
          ) : (
            <p className="text-sm text-white font-semibold leading-6">Logout</p>
          )}
        </div>
      </Sider>

      <Layout>
        <Header
          style={{ padding: 0, background: colorBgContainer }}
          className="flex items-center justify-between !pr-8"
        >
          <div className="flex items-center justify-center gap-2.5">
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
            <h1 className="text-[#1D2026] text-center text-3xl font-bold my-4 h-7">
              {pathName}
            </h1>
          </div>
          <div className="flex items-center justify-center gap-2.5">
            <Icons.bell className="size-6 text-[#000000]" />
            <Avatar
              size="large"
              icon={image ? <Image src={url} alt="avatar" /> : <UserOutlined />}
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
