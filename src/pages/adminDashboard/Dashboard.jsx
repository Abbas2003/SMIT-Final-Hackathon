import React, { useContext, useState } from "react";
import {
  Layout,
  Menu,
  Button,
  Typography,
  message,
  Avatar
} from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  PieChartOutlined,
  DesktopOutlined,
  LogoutOutlined,
  FileOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import Applications from "./Applications";
import { AuthContext } from "../../context/UserContext";
import DashboardContent from "./Main";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("dashboard");
  const { user } = useContext(AuthContext);
  console.log(user);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case "dashboard":
        return <DashboardContent />;
      case "profile":
        return <Typography.Title>Profile Content</Typography.Title>;
      case "applications":
        return <Applications />;
      case "reports":
        return <Typography.Title>Reports Content</Typography.Title>;
      default:
        return <Typography.Title>Thank You!</Typography.Title>;
    }
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
          <Menu.Item key="applications" icon={<FileOutlined />}>
            Applications
          </Menu.Item>
          <Menu.Item key="reports" icon={<DesktopOutlined />}>
            Reports
          </Menu.Item>
          <Menu.Item key="profile" icon={<UserOutlined />}>
            Profile
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
          <div className="flex items-center gap-2 ml-auto">
            <span>{user?.fullName}</span>
            <Avatar
            size={40}
            src={user?.imageUrl}
            style={{ 
              cursor: "pointer",
              backgroundColor: user?.imageUrl ? "transparent" : "#1890ff",
              borderColor: "black"
            }}
            icon={!user?.imageUrl && <UserAddOutlined />}
          >
              {!user?.imageUrl && user?.fullName?.[0]?.toUpperCase()}
            </Avatar>
          </div>
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
