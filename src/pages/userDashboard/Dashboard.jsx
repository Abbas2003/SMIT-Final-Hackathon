import React, { useContext, useState } from "react";
import {
    Layout,
    Menu,
    Button,
    Typography
} from "antd";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    PieChartOutlined,
    DesktopOutlined,
    LogoutOutlined,
    UsergroupAddOutlined,
    FormOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../../context/UserContext";
import ViewRequest from "./Request";
import UserProfile from "./Profile";
import GuarantorAndPersonalDetails from "./Guarantor";
import User from "./User";
import ApplicationForm from "./ApplicationForm";

const { Header, Sider, Content } = Layout;

const UserDashboard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState("dashboard");

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const renderContent = () => {
        switch (selectedMenu) {
            case "dashboard":
                return <Typography.Title><User /></Typography.Title>;
            case "profile":
                return <Typography.Title><UserProfile /></Typography.Title>;
            case "form":
                return <Typography.Title><ApplicationForm /></Typography.Title>;
            case "guarantor":
                return <Typography.Title><GuarantorAndPersonalDetails /></Typography.Title>;
            case "request":
                return <Typography.Title><ViewRequest /></Typography.Title>;
            default:
                return <Typography.Title>Welcome!</Typography.Title>;
        }
    };

    const { user } = useContext(AuthContext)

    const currentUser = {
        imageUrl: user.imageUrl, // Example image URL
        name: user.fullName,
        email: user.email,
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
                    {collapsed ? "" : "Saylani Microfinance"}
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
                    <Menu.Item key="form" icon={<FormOutlined />}>
                        Application
                    </Menu.Item>
                    <Menu.Item key="request" icon={<DesktopOutlined />}>
                        View Request
                    </Menu.Item>
                    <Menu.Item key="guarantor" icon={<UsergroupAddOutlined />}>
                        Guarantors Info
                    </Menu.Item>
                    <Menu.Item key="logout" icon={<LogoutOutlined />}>
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
                        User Dashboard
                    </Typography.Title>

                    {/* Move content to the right */}
                    <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "10px" }}>
                        {/* User Info */}
                        <Typography.Text style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                            {currentUser?.name.toLocaleUpperCase()}
                        </Typography.Text>

                        {/* Profile Picture */}
                        <div
                            className="rounded-full bg-neutral-200 flex items-center justify-center"
                            style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                overflow: "hidden",
                            }}
                        >
                            {currentUser?.imageUrl ? (
                                <img
                                    src={currentUser.imageUrl}
                                    alt="User"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            ) : (
                                <span style={{ fontWeight: "bold", color: "#555" }}>
                                    {currentUser?.name?.[0]?.toUpperCase()}
                                </span>
                            )}
                        </div>
                    </div>
                </Header>
                <Content
                    style={{
                        // margin: "16px",
                        padding: "16px",
                        background: "#fff",
                        // borderRadius: "8px",
                        boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
                    }}
                >
                    {renderContent()}
                </Content>
            </Layout>

        </Layout>
    );
};

export default UserDashboard;
