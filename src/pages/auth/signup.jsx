import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Typography, Card } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState("");
  const onFinish = (values) => {
    setLoading(true);
    console.log("Success:", values);
    setCredentials(values);
    setLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  console.log("credentials", credentials);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600">
      <Card
        className="w-full max-w-md shadow-lg rounded-2xl"
        style={{ backgroundColor: "#ffff" }}
      >
        <Typography.Title level={3} className="text-center mb-4">
          Create Your Account
        </Typography.Title>
        <Form
          name="signup"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Enter your username" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: "Please enter a valid email!",
              },
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
            />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[{
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("You must accept the terms and conditions!")),
            }]}
          >
            <Checkbox>
              I agree to the <a href="">terms and conditions</a>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500"
              disabled={loading ? true : false}
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <Typography.Text className="block text-center mt-2">
          Already have an account? <a href="/auth/login">Log in</a>
        </Typography.Text>
      </Card>
    </div>
  );
};

export default Signup;
