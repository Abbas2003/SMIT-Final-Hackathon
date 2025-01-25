import React, { useState } from "react";
import {
  Layout,
  Menu,
  Button,
  Typography,
  message
} from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  PieChartOutlined,
  DesktopOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("dashboard");

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case "dashboard":
        return <Typography.Title>Dashboard Content</Typography.Title>;
      case "profile":
        return <Typography.Title>Profile Content</Typography.Title>;
      case "reports":
        return <Typography.Title>Reports Content</Typography.Title>;
      default:
        return <Typography.Title>Thank You!</Typography.Title>;
    }
  };

  const user = {
    imageUrl: "currentUser.imageUrl", // Example image URL
    name: "currentUser.fullName",
    email: "currentUser.email",
  };

  const handleLogout = () => {
    Cookies.remove("token");
    message.success("Logout successful!");
    navigate("/");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="sm"
        collapsedWidth={0}
        onBreakpoint={(broken) => {
          if (broken) setCollapsed(true);
        }}
        style={{ background: "#001529" }}
      >
        <div
          style={{
            height: "64px",
            margin: "16px",
            color: "white",
            textAlign: "center",
            lineHeight: "32px",
            fontSize: "18px",
          }}
        >
          {collapsed ? "" : "SMIT Hackathon"}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          onClick={({ key }) => setSelectedMenu(key)}
        >
          <Menu.Item key="dashboard" icon={<PieChartOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="profile" icon={<UserOutlined />}>
            Profile
          </Menu.Item>
          <Menu.Item key="reports" icon={<DesktopOutlined />}>
            Reports
          </Menu.Item>
          <Menu.Item key="logout" onClick={handleLogout} icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout className="site-layout">
        <Header
          style={{
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            background: "#fff",
            boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          {/* Toggle Sidebar Button */}
          <Button type="text" onClick={toggleSidebar}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>

          {/* App Title */}
          <Typography.Title level={4} style={{ margin: 0 }}>
            Admin Dashboard
          </Typography.Title>

          {/* User Info Button */}
          <button
            // onClick={handleUserMenuClick}
            className="rounded-full p-2 bg-neutral-200 text-neutral-900 flex items-center"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              overflow: "hidden",
              marginLeft: "auto", // Move button to the right side
            }}
          >
            {/* {currentUser?.imageUrl ? (
      <img
        src={user.imageUrl}
        alt="User"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    ) : (
      <span>{user.fullName[0].toUpperCase()}</span> // Fallback to first letter (uppercase)
    )} */}
          </button>
        </Header>
        <Content
          style={{
            margin: "16px",
            padding: "16px",
            background: "#fff",
            borderRadius: "8px",
            boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
