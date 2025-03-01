import React, { useState, useEffect } from "react";
import { 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Table, 
  Tag, 
  Typography,
  Progress
} from "antd";
import {
  UsergroupAddOutlined,
  FileProtectOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DollarOutlined
} from "@ant-design/icons";
import axios from "axios";
import { AppRoutes } from "../../routes/routes";
import Cookies from "js-cookie";

const { Title } = Typography;

const DashboardContent = () => {
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    approvedApplications: 0,
    rejectedApplications: 0,
    totalAmount: 0
  });
  const [recentApplications, setRecentApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(AppRoutes.getAllLoanRequests, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`
          }
        });

        const applications = response.data.data;
        console.log(applications);
        
        // Calculate statistics
        const totalAmount = applications.reduce((sum, app) => sum + app.amount, 0);
        const pending = applications.filter(app => app.status === "pending").length;
        const approved = applications.filter(app => app.status === "approved").length;
        const rejected = applications.filter(app => app.status === "rejected").length;

        setStats({
          totalApplications: applications.length,
          pendingApplications: pending,
          approvedApplications: approved,
          rejectedApplications: rejected,
          totalAmount: totalAmount
        });

        // Get recent applications (last 5)
        setRecentApplications(applications.slice(0, 5));
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const columns = [
    {
      title: 'Applicant',
      dataIndex: ['userId', 'fullName'],
      key: 'fullName',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `PKR ${amount.toLocaleString()}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={
          status === 'pending' ? 'gold' :
          status === 'approved' ? 'green' :
          'red'
        }>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ];

  return (
    <div className="p-6">
      <Title level={2}>Dashboard Overview</Title>
      
      {/* Statistics Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title="Total Applications"
              value={stats.totalApplications}
              prefix={<FileProtectOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title="Pending Applications"
              value={stats.pendingApplications}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title="Approved Applications"
              value={stats.approvedApplications}
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
      </Row>

      {/* Progress Section */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} md={12}>
          <Card title="Application Status Distribution" bordered={false} className="shadow-sm">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Pending</span>
                  <span>{((stats.pendingApplications / stats.totalApplications) * 100).toFixed(1)}%</span>
                </div>
                <Progress 
                  percent={(stats.pendingApplications / stats.totalApplications) * 100} 
                  strokeColor="#faad14" 
                  showInfo={false}
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Approved</span>
                  <span>{((stats.approvedApplications / stats.totalApplications) * 100).toFixed(1)}%</span>
                </div>
                <Progress 
                  percent={(stats.approvedApplications / stats.totalApplications) * 100} 
                  strokeColor="#52c41a"
                  showInfo={false}
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Rejected</span>
                  <span>{((stats.rejectedApplications / stats.totalApplications) * 100).toFixed(1)}%</span>
                </div>
                <Progress 
                  percent={(stats.rejectedApplications / stats.totalApplications) * 100} 
                  strokeColor="#ff4d4f"
                  showInfo={false}
                />
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Recent Applications" bordered={false} className="shadow-sm">
            <Table 
              dataSource={recentApplications}
              columns={columns}
              pagination={false}
              loading={loading}
              rowKey="_id"
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardContent;