import React from "react";
import { Card, Typography, Row, Col, Table } from "antd";

const LoanRequestDetails = ({ loanDetails }) => {
  // Sample data structure for loanDetails
  const {
    category,
    subcategory,
    loanAmount,
    loanPeriod,
    guarantors,
    personalInfo,
    tokenNumber,
    appointmentDetails,
  } = loanDetails || {};

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "CNIC",
      dataIndex: "cnic",
      key: "cnic",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Typography.Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
        Loan Request Details
      </Typography.Title>

      <Card style={{ marginBottom: "20px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Typography.Text strong>Category:</Typography.Text>
            <Typography.Text> {category || "N/A"}</Typography.Text>
          </Col>
          <Col span={12}>
            <Typography.Text strong>Subcategory:</Typography.Text>
            <Typography.Text> {subcategory || "N/A"}</Typography.Text>
          </Col>
          <Col span={12}>
            <Typography.Text strong>Loan Amount:</Typography.Text>
            <Typography.Text> PKR {loanAmount || "N/A"}</Typography.Text>
          </Col>
          <Col span={12}>
            <Typography.Text strong>Loan Period:</Typography.Text>
            <Typography.Text> {loanPeriod || "N/A"} years</Typography.Text>
          </Col>
        </Row>
      </Card>

      <Card style={{ marginBottom: "20px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
        <Typography.Title level={4}>Guarantors</Typography.Title>
        <Table
          dataSource={guarantors || []}
          columns={columns}
          pagination={false}
          bordered
          style={{ marginTop: "20px" }}
        />
      </Card>

      <Card style={{ marginBottom: "20px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
        <Typography.Title level={4}>Personal Information</Typography.Title>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Typography.Text strong>Address:</Typography.Text>
            <Typography.Text> {personalInfo?.address || "N/A"}</Typography.Text>
          </Col>
          <Col span={12}>
            <Typography.Text strong>Phone:</Typography.Text>
            <Typography.Text> {personalInfo?.phone || "N/A"}</Typography.Text>
          </Col>
        </Row>
      </Card>

      <Card style={{ marginBottom: "20px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Typography.Text strong>Token Number:</Typography.Text>
            <Typography.Text> {tokenNumber || "N/A"}</Typography.Text>
          </Col>
          <Col span={12}>
            <Typography.Text strong>Appointment Details:</Typography.Text>
            <Typography.Text> {appointmentDetails || "N/A"}</Typography.Text>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

// Example usage with mock data
const mockLoanDetails = {
  category: "Business Startup Loans",
  subcategory: "Shop Machinery",
  loanAmount: 800000,
  loanPeriod: 5,
  guarantors: [
    { name: "John Doe", email: "john@example.com", location: "Karachi", cnic: "42101-1234567-1" },
    { name: "Jane Smith", email: "jane@example.com", location: "Lahore", cnic: "42101-7654321-1" },
  ],
  personalInfo: { address: "123 Street, Karachi", phone: "0301-1234567" },
  tokenNumber: "12345",
  appointmentDetails: "Office A, 10:00 AM, 25th Jan 2025",
};

export default function ViewRequest() {
  return <LoanRequestDetails loanDetails={mockLoanDetails} />;
}
