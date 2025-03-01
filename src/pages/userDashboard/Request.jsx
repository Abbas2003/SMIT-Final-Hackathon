import React, { useEffect, useState } from "react";
import { Card, Typography, Row, Col, Table } from "antd";
import axios from "axios";
import Cookies from 'js-cookie';
import { AppRoutes } from "../../routes/routes";

const LoanRequestDetails = ({ loanDetails }) => {
  const { category, subcategory, amount, loanPeriod, guarantors, personalInfo, status, initialDeposit } = loanDetails || {};

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Location", dataIndex: "location", key: "location" },
    { title: "CNIC", dataIndex: "cnic", key: "cnic" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Typography.Title level={3} style={{ textAlign: "center" }}>Loan Request Details</Typography.Title>
      <Card style={{ marginBottom: "20px" }}>
        <Row gutter={[16, 16]}>
          <Col span={12}><Typography.Text strong>Category:</Typography.Text> {category || "N/A"}</Col>
          <Col span={12}><Typography.Text strong>Subcategory:</Typography.Text> {subcategory || "N/A"}</Col>
          <Col span={12}><Typography.Text strong>Loan Amount:</Typography.Text> PKR {amount || "N/A"}</Col>
          <Col span={12}><Typography.Text strong>Loan Period:</Typography.Text> {loanPeriod || "N/A"} years</Col>
          <Col span={12}><Typography.Text strong>Initial Deposit:</Typography.Text> PKR {initialDeposit || "N/A"}</Col>
          <Col span={12} className={status === "pending" ? "text-yellow-500" : status === "approved" ? "text-green-500" : "text-red-500"}><Typography.Text strong>Status:</Typography.Text> {status || "N/A"}</Col>
        </Row>
      </Card>
      <Card >
        <Typography.Title level={4}>Guarantors</Typography.Title>
        <Table dataSource={guarantors || []} columns={columns} pagination={false} bordered />
      </Card>
      
    </div>
  );
};

export default function ViewRequest() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get(AppRoutes.getLoanRequests, {
          headers: { Authorization: `Bearer ${Cookies.get('token')}` },
        });

        console.log("API Response:", response.data);  // Debugging log

        if (response.data) {
          setLoans(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch loans');
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  useEffect(() => {
    console.log("Updated loans state:", loans);
  }, [loans]);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {loans.length >= 0 ? loans.map((loan) => (
        <LoanRequestDetails key={loan._id} loanDetails={loan} />
      )) : <div className="text-center text-3xl font-bold">No loans found</div>}
    </div>
  );
}
