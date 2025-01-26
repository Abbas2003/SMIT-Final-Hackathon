import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, Spin, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../routes/routes";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      console.log("Form values:", values);

      const response = await axios.post(AppRoutes.login, values); 
      console.log("Login response:", response);
      

      if (response?.status == 200) {
        const { token, user } = response.data.data;

        // Save token to cookies
        Cookies.set("token", token);
        message.success("Login successful!");

        // Redirect based on user role
        setTimeout(() => {
          if (user.role === "admin") {
            navigate("/admin-dashboard");
          } else if (user.role === "user") {
            navigate("/user-dashboard");
          } else {
            message.error("You are not authorized to login.");
          }
        }, 2300);
      } else {
        message.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error(error.response?.data?.message || "Login failed. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Validation Failed:", errorInfo);
    message.error("Please fill in the required fields correctly.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500">
      <Card
        className="w-full max-w-md shadow-lg rounded-xl"
        style={{ padding: "2rem", backgroundColor: "#fff" }}
      >
        <Typography.Title level={2} className="text-center text-blue-600">
          Welcome Back
        </Typography.Title>
        <Typography.Text type="secondary" className="block text-center mb-4">
          Please login to your account
        </Typography.Text>

        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "Please enter a valid email address!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="text-blue-400" />}
              placeholder="Enter your email"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                min: 6,
                message: "Password must be at least 6 characters long!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-blue-400" />}
              placeholder="Enter your password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-lg"
              disabled={loading}
            >
              {loading ? <Spin /> : "Login"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
