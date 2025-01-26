import { useContext } from 'react';
import { Card, Typography, Avatar, Row, Col } from 'antd';
import { MailOutlined, IdcardOutlined, HomeOutlined, PhoneOutlined, UserOutlined, CalendarOutlined } from '@ant-design/icons';
import { AuthContext } from '../../context/UserContext';

const { Title, Paragraph } = Typography;

export default function User() {
  const { user } = useContext(AuthContext);

  return (
    <Card style={{ maxWidth: 800, margin: '50px auto', padding: 20, textAlign: 'center' }}>
      <Avatar size={120} src={user.imageUrl} style={{ marginBottom: 20 }} />
      <Title level={2}>{user.fullName}</Title>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Paragraph><MailOutlined /> <strong>Email:</strong> {user.email}</Paragraph>
        </Col>
        <Col span={12}>
          <Paragraph><IdcardOutlined /> <strong>CNIC:</strong> {user.cnic}</Paragraph>
        </Col>
        <Col span={12}>
          <Paragraph><PhoneOutlined /> <strong>Mobile No:</strong> {user.mobileNo}</Paragraph>
        </Col>
        <Col span={12}>
          <Paragraph><UserOutlined /> <strong>Father's Name:</strong> {user.fatherName}</Paragraph>
        </Col>
        <Col span={12}>
          <Paragraph><HomeOutlined /> <strong>Address:</strong> {user.address}</Paragraph>
        </Col>
        <Col span={12}>
          <Paragraph><UserOutlined /> <strong>Role:</strong> {user.role}</Paragraph>
        </Col>
        <Col span={12}>
          <Paragraph><CalendarOutlined /> <strong>Account Created:</strong> {new Date(user.createdAt).toLocaleDateString()}</Paragraph>
        </Col>
        <Col span={12}>
          <Paragraph><CalendarOutlined /> <strong>Last Updated:</strong> {new Date(user.updatedAt).toLocaleDateString()}</Paragraph>
        </Col>
      </Row>
    </Card>
  );
}