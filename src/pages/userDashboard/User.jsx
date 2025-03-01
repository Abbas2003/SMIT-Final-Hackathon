import React, { useState, useEffect } from "react";
import { 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Table, 
  Tag, 
  Typography,
  Button,
  Steps,
  Timeline,
  Descriptions
} from "antd";
import {
  FileProtectOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  UserOutlined,
  CalendarOutlined,
  PlusOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { AppRoutes } from "../../routes/routes";
import Cookies from "js-cookie";

const { Title, Text } = Typography;
const { Step } = Steps;

const UserDashboard = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalLoans: 0,
    activeLoans: 0,
    totalAmount: 0,
    pendingAmount: 0
  });

  useEffect(() => {
    const fetchUserLoans = async () => {
      try {
        const response = await axios.get(AppRoutes.getLoanRequests, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`
          }
        });

        const userLoans = response.data.data;
        setLoans(userLoans);

        // Calculate statistics
        setStats({
          totalLoans: userLoans.length,
          activeLoans: userLoans.filter(loan => loan.status === "approved").length,
          totalAmount: userLoans.reduce((sum, loan) => sum + loan.amount, 0),
          pendingAmount: userLoans
            .filter(loan => loan.status === "pending")
            .reduce((sum, loan) => sum + loan.amount, 0)
        });

      } catch (error) {
        console.error("Error fetching loans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserLoans();
  }, []);

  const getStepStatus = (status) => {
    switch (status) {
      case "approved": return "finish";
      case "rejected": return "error";
      case "pending": return "process";
      default: return "wait";
    }
  };

  const recentApplications = loans.slice(0, 3);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Title level={2}>My Dashboard</Title>
        <Link to="/apply-loan">
          <Button type="primary" icon={<PlusOutlined />}>
            Apply for New Loan
          </Button>
        </Link>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title="Total Applications"
              value={stats.totalLoans}
              prefix={<FileProtectOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title="Active Loans"
              value={stats.activeLoans}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title="Total Amount"
              value={stats.totalAmount}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#1890ff' }}
              formatter={value => `PKR ${value.toLocaleString()}`}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title="Pending Amount"
              value={stats.pendingAmount}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
              formatter={value => `PKR ${value.toLocaleString()}`}
            />
          </Card>
        </Col>
      </Row>

      {/* Recent Applications and Timeline */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Recent Applications" bordered={false} className="shadow-sm">
            {recentApplications.map((loan) => (
              <Card key={loan._id} className="mb-4">
                <Descriptions column={1}>
                  <Descriptions.Item label="Loan Type">
                    {loan.category} - {loan.subcategory}
                  </Descriptions.Item>
                  <Descriptions.Item label="Amount">
                    PKR {loan.amount.toLocaleString()}
                  </Descriptions.Item>
                  <Descriptions.Item label="Status">
                    <Tag color={
                      loan.status === 'pending' ? 'gold' :
                      loan.status === 'approved' ? 'green' : 'red'
                    }>
                      {loan.status.toUpperCase()}
                    </Tag>
                  </Descriptions.Item>
                </Descriptions>
                <Steps size="small" current={2} className="mt-4">
                  <Step title="Applied" status={getStepStatus(loan.status)} />
                  <Step title="Under Review" status={getStepStatus(loan.status)} />
                  <Step title="Decision" status={getStepStatus(loan.status)} />
                </Steps>
              </Card>
            ))}
            {recentApplications.length === 0 && (
              <div className="text-center py-4">
                <Text type="secondary">No applications yet</Text>
              </div>
            )}
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Activity Timeline" bordered={false} className="shadow-sm">
            <Timeline>
              {loans.map((loan, index) => (
                <Timeline.Item 
                  key={loan._id}
                  color={
                    loan.status === 'approved' ? 'green' :
                    loan.status === 'pending' ? 'blue' : 'red'
                  }
                >
                  <p><strong>{loan.category}</strong></p>
                  <p>PKR {loan.amount.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(loan.createdAt).toLocaleDateString()}
                  </p>
                </Timeline.Item>
              ))}
              {loans.length === 0 && (
                <Text type="secondary">No activity yet</Text>
              )}
            </Timeline>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserDashboard;