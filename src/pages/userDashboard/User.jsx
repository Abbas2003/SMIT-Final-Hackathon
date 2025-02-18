import { useContext, useState, useEffect } from "react";
import { Card, Typography, Avatar, Row, Col, Spin } from "antd";
import {
  MailOutlined,
  IdcardOutlined,
  HomeOutlined,
  PhoneOutlined,
  UserOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../../context/UserContext";

const { Title, Paragraph } = Typography;

export default function User() {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setIsLoading(false); // Stop loading once user data is available
    }
  }, [user]);

  // if (isLoading) {
  //   return (
  //     <div style={{ textAlign: "center", marginTop: "100px" }}>
  //       <Spin size="large" />
  //     </div>
  //   );
  // }

  const userData = {
    fullName: user?.fullName || "N/A",
    email: user?.email || "N/A",
    cnic: user?.cnic || "N/A",
    mobileNo: user?.mobileNo || "N/A",
    fatherName: user?.fatherName || "N/A",
    address: user?.address || "N/A",
    role: user?.role || "N/A",
    createdAt: user?.createdAt
      ? new Date(user.createdAt).toLocaleDateString()
      : "N/A",
    updatedAt: user?.updatedAt
      ? new Date(user.updatedAt).toLocaleDateString()
      : "N/A",
    imageUrl: user?.imageUrl || null,
  };

  return (
    isLoading
      ?
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <Spin size="large" />
      </div>
      :
      <Card
        style={{
          maxWidth: 800,
          margin: "50px auto",
          padding: 20,
          textAlign: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          borderRadius: 10,
        }}
      >
        <Avatar
          size={120}
          src={userData.imageUrl}
          icon={<UserOutlined />}
          style={{
            marginBottom: 20,
            backgroundColor: userData.imageUrl ? "transparent" : "#f56a00",
          }}
        />
        <Title level={2} style={{ marginBottom: 20 }}>
          {userData.fullName}
        </Title>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Paragraph>
              <MailOutlined /> <strong>Email:</strong> {userData.email}
            </Paragraph>
          </Col>
          <Col span={12}>
            <Paragraph>
              <IdcardOutlined /> <strong>CNIC:</strong> {userData.cnic}
            </Paragraph>
          </Col>
          <Col span={12}>
            <Paragraph>
              <PhoneOutlined /> <strong>Mobile No:</strong> {userData.mobileNo}
            </Paragraph>
          </Col>
          <Col span={12}>
            <Paragraph>
              <UserOutlined /> <strong>Father's Name:</strong>{" "}
              {userData.fatherName}
            </Paragraph>
          </Col>
          <Col span={12}>
            <Paragraph>
              <HomeOutlined /> <strong>Address:</strong> {userData.address}
            </Paragraph>
          </Col>
          <Col span={12}>
            <Paragraph>
              <UserOutlined /> <strong>Role:</strong> {userData.role}
            </Paragraph>
          </Col>
          <Col span={12}>
            <Paragraph>
              <CalendarOutlined /> <strong>Account Created:</strong>{" "}
              {userData.createdAt}
            </Paragraph>
          </Col>
          <Col span={12}>
            <Paragraph>
              <CalendarOutlined /> <strong>Last Updated:</strong>{" "}
              {userData.updatedAt}
            </Paragraph>
          </Col>
        </Row>
      </Card>
  );
}
