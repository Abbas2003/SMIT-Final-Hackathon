import React, { useContext, useEffect, useState } from "react";
import {
    Layout,
    Menu,
    Button,
    Typography,
    Spin,
    message,
    Modal,
    Form,
    Input,
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
import GuarantorAndPersonalDetails from "./Guarantor";
import User from "./User";
import Cookies from "js-cookie";
import ApplicationForm from "./ApplicationForm";
import { useNavigate } from "react-router";
import UserProfile from "./ProfileSection";
import FirstLoginModal from "./FirstLoginModal";
import LoanCalculator from "../../components/LoanCalculator";

const { Header, Sider, Content } = Layout;

const UserDashboard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState("dashboard");
    const [loading, setLoading] = useState(true); // Set loading to true initially
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Simulate data fetching or authentication check
        // const initializeDashboard = async () => {
        //     if (!user) {
        //         message.error("User not authenticated. Redirecting...");
        //         navigate("/"); // Redirect to login if no user is found


        //     } else {
        //         setLoading(false); // Set loading to false after initialization
        //     }
        // };


        if (user?.isFirstLogin) {
            console.log(user?.isFirstLogin);
            // <FirstLoginModal user={user} />
            
        } else {
            console.log("User is not first login");
        }
        setLoading(false);

        // initializeDashboard();
    }, [user, navigate]);

   

    const toggleSidebar = () => setCollapsed(!collapsed);

    const handleLogout = () => {
        Cookies.remove("token");
        message.success("Logout successful!");
        navigate("/");
    };

    const renderContent = () => {
        switch (selectedMenu) {
            case "dashboard":
                return <User />;
            case "profile":
                return (
                    <>
                        {/* <User /> 
                    <UserProfile />; */}
                        <UserProfile />
                    </>)
            case "form":
                return <LoanCalculator isHome={false} />;
            case "guarantor":
                return <GuarantorAndPersonalDetails />;
            case "request":
                return <ViewRequest />;
            default:
                return <Typography.Title>Welcome!</Typography.Title>;
        }
    };

    const currentUser = {
        imageUrl: user?.imageUrl || "",
        name: user?.fullName || "Guest",
        email: user?.email || "",
    };

    // if (loading) {
    //     return (
    //         <div
    //             style={{
    //                 display: "flex",
    //                 alignItems: "center",
    //                 justifyContent: "center",
    //                 height: "100vh",
    //             }}
    //         >
    //             <Spin size="large" tip="Loading Dashboard..." fullscreen />
    //         </div>
    //     );
    // }

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                breakpoint="sm"
                collapsedWidth={0}
                onBreakpoint={(broken) => broken && setCollapsed(true)}
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
                    <Button type="text" onClick={toggleSidebar}>
                        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    </Button>
                    <Typography.Title level={4} style={{ margin: 0 }}>
                        User Dashboard
                    </Typography.Title>
                    <div
                        style={{
                            marginLeft: "auto",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                        }}
                    >
                        <Typography.Text style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                            {currentUser.name.toLocaleUpperCase()}
                        </Typography.Text>
                        <div
                            style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                overflow: "hidden",
                                background: "#ccc",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {currentUser.imageUrl ? (
                                <img
                                    src={currentUser.imageUrl}
                                    alt="User"
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            ) : (
                                <span style={{ fontWeight: "bold", color: "#555" }}>
                                    {currentUser.name[0]?.toUpperCase()}
                                </span>
                            )}
                        </div>
                    </div>
                </Header>
                <Content
                    style={{
                        padding: "16px",
                        background: "#fff",
                        boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
                    }}
                >
                    {user?.isFirstLogin ? <FirstLoginModal user={user} /> : renderContent()}
                </Content>
            
            </Layout>
        </Layout>
    );


};

export default UserDashboard;
