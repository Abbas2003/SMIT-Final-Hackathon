import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button, Typography, Card, Row, Col, message } from "antd";
import axios from "axios";
import { AppRoutes } from "../../routes/routes";
import { AuthContext } from "../../context/UserContext";

const GuarantorAndPersonalDetails = () => {
  const [form] = Form.useForm();
  const { user } = useContext(AuthContext);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      // Prepare guarantor data for API submission
      const guarantorData = [
        {
          userId: user._id,
          name: values.guarantor1Name,
          email: values.guarantor1Email,
          location: values.guarantor1Location,
          cnic: values.guarantor1Cnic,
          relation: values.guarantor1Relation,
        },
        {
          userId: user._id,
          name: values.guarantor2Name,
          email: values.guarantor2Email,
          location: values.guarantor2Location,
          cnic: values.guarantor2Cnic,
          relation: values.guarantor2Relation,
        },
      ];

      // API Call
      const response = await axios.post(AppRoutes.addGuarantor, guarantorData);

      message.success("Guarantor details submitted successfully!");
      console.log("API Response:", response.data);

      // Reset form after successful submission
      form.resetFields();
    } catch (error) {
      if (error.name === "ValidationError") {
        message.error("Please fill in all fields correctly.");
      } else {
        console.error("API Call Error:", error);
        message.error(error.response?.data?.message || "Failed to submit guarantor details. Please try again.");
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography.Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
        Provide Additional Details
      </Typography.Title>

      <Card
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
        }}
      >
        <Form layout="vertical" form={form}>
          {/* Guarantor Information */}
          <Typography.Title level={4}>Guarantors' Information</Typography.Title>
          {[1, 2].map((guarantor) => (
            <Row gutter={[16, 16]} key={guarantor}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label={`Guarantor ${guarantor} Name`}
                  name={`guarantor${guarantor}Name`}
                  rules={[{ required: true, message: "Please enter the guarantor's name" }]}
                >
                  <Input placeholder="Enter guarantor's name" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  label={`Guarantor ${guarantor} Email`}
                  name={`guarantor${guarantor}Email`}
                  rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}
                >
                  <Input placeholder="Enter guarantor's email" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  label={`Guarantor ${guarantor} Location`}
                  name={`guarantor${guarantor}Location`}
                  rules={[{ required: true, message: "Please enter the guarantor's location" }]}
                >
                  <Input placeholder="Enter guarantor's location" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  label={`Guarantor ${guarantor} CNIC`}
                  name={`guarantor${guarantor}Cnic`}
                  rules={[
                    { required: true, message: "Please enter the guarantor's CNIC" },
                    { pattern: /^\d{5}-\d{7}-\d{1}$/, message: "Invalid CNIC format. Use XXXXX-XXXXXXX-X" },
                  ]}
                >
                  <Input placeholder="Enter guarantor's CNIC" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  label={`Guarantor ${guarantor} Relation`}
                  name={`guarantor${guarantor}Relation`}
                  rules={[{ required: true, message: "Please specify the guarantor's relation" }]}
                >
                  <Input placeholder="Enter guarantor's relation (e.g., Friend, Relative)" />
                </Form.Item>
              </Col>
            </Row>
          ))}

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={handleSubmit} style={{ width: "100%" }}>
              Submit Details
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default GuarantorAndPersonalDetails;
