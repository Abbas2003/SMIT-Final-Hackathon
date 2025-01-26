import { useState } from "react";
import { Card, Select, Input, Button, Typography, Alert, message, Modal, Form, Spin } from "antd";
import axios from "axios";
import { AppRoutes } from "../routes/routes";

const { Title, Paragraph } = Typography;
const { Option } = Select;

const loanCategories = {
  "Wedding Loans": {
    subcategories: ["Valima", "Furniture", "Valima Food", "Jahez"],
    maxLoan: 500000,
    period: 3,
  },
  "Home Construction Loans": {
    subcategories: ["Structure", "Finishing", "Loan"],
    maxLoan: 1000000,
    period: 5,
  },
  "Business Startup Loans": {
    subcategories: ["Buy Stall", "Advance Rent for Shop", "Shop Assets", "Shop Machinery"],
    maxLoan: 1000000,
    period: 5,
  },
  "Education Loans": {
    subcategories: ["University Fees", "Child Fees Loan"],
    maxLoan: "Based on requirement",
    period: 4,
  },
};

export default function LoanCalculator() {
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [subcategory, setSubcategory] = useState("");
  const [initialAmount, setInitialAmount] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [loanPeriod, setLoanPeriod] = useState("");
  const [loanBreakdown, setLoanBreakdown] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();


  const handleCategoryChange = (value) => {
    setCategory(value);
    setSubcategory("");
    setLoanPeriod(loanCategories[value]?.period || "");
  };


  const calculateLoan = () => {
    if (!category || !subcategory || !initialAmount || !depositAmount) {
      message.error("Please fill all fields");
      return;
    }

    const maxLoan = loanCategories[category].maxLoan;
    const requestedAmount = parseFloat(initialAmount) - parseFloat(depositAmount);

    if (maxLoan !== "Based on requirement" && requestedAmount > maxLoan) {
      message.error(`Maximum loan allowed is PKR ${maxLoan}`);
      return;
    }

    // Calculate total payable amount without interest
    const totalPayable = requestedAmount;
    const monthlyInstallment = totalPayable / (loanPeriod * 12);

    setLoanBreakdown({ totalPayable, monthlyInstallment });
  };

  const generateRandomPassword = (length = 6) => {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields(); // Validate fields before submission
      console.log("Form values:", values);

      const uniquePassword = generateRandomPassword(); // Generate a unique password for the user

      setLoading(true);
      // Make API request
      const res = await axios.post(AppRoutes.sendLoginPassword, {
        senderName: values.name,
        sender: "abbas.mohammad805@gmail.com",
        receiver: values.email,
        subject: "Your Account Password",
        message: `
              <html>
                <head>
                  <style>
                    body {
                      font-family: Arial, sans-serif;
                      background-color: #f4f4f9;
                      margin: 0;
                      padding: 0;
                    }
                    .container {
                      max-width: 600px;
                      margin: 0 auto;
                      padding: 20px;
                      background-color: #ffffff;
                      border-radius: 10px;
                      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                      color: #333;
                      text-align: center;
                    }
                    p {
                      color: #555;
                      line-height: 1.6;
                      font-size: 16px;
                    }
                    .highlight {
                      color: #0066cc;
                      font-weight: bold;
                    }
                    .footer {
                      text-align: center;
                      font-size: 14px;
                      color: #888;
                      margin-top: 30px;
                    }
                  </style>
                </head>
                <body>
                  <div class="container">
                    <h1>Your Account Password</h1>
                    <p>Hello <strong class="highlight">${values.name}</strong>,</p>
                    <p>Thank you for registering with us!</p>
                    <p>Your account password is: <strong class="highlight">${uniquePassword}</strong></p>
                    <p>Please keep this information secure and do not share it with anyone.</p>
                    <div class="footer">
                      <p>Best regards,</p>
                      <p><strong>Your Support Team</strong></p>
                    </div>
                  </div>
                </body>
              </html>
            `,
      });
      console.log("Email sent:", res);
      const newUser = await axios.post(AppRoutes.register, {
          fullName: values.name,
          email: values.email,
          password: uniquePassword,
          cnic: values.cnic,
      }).then((res) => {
        message.success("Form submitted successfully!");
        setLoading(false);
      }).catch((err) => {
        message.error("User already requested before. Please try again later.");
        setLoading(false);
      })
      
      setLoading(false);
      setIsModalVisible(false);
      form.resetFields(); // Clear form after submission
    } catch (error) {
      if (error.name === 'ValidationError') {
        message.error("Please fill in all fields correctly.");
      } else {
        console.error("Failed to submit form:", error);
        message.error("Failed to submit form. Please try again later.");
      }
    }
  };


  return (
    <>
      <Card style={{ maxWidth: 500, margin: "50px auto", padding: 20, boxShadow: "0px 2px 5px rgba(0,0,0,0.1)" }}>
        <Title level={3}>Loan Calculator</Title>
        <Select placeholder="Select Category" onChange={handleCategoryChange} style={{ width: "100%", marginBottom: 20 }}>
          {Object.keys(loanCategories).map((cat) => (
            <Option key={cat} value={cat}>{cat}</Option>
          ))}
        </Select>

        {category && (
          <Select placeholder="Select Subcategory" onChange={setSubcategory} style={{ width: "100%", marginBottom: 20 }}>
            {loanCategories[category].subcategories.map((sub) => (
              <Option key={sub} value={sub}>{sub}</Option>
            ))}
          </Select>
        )}

        <Input
          type="number"
          placeholder="Enter request amount"
          value={initialAmount}
          onChange={(e) => setInitialAmount(e.target.value)}
          style={{ marginBottom: 20 }}
        />

        <Input
          type="number"
          placeholder="Enter deposit amount"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
          style={{ marginBottom: 20 }}
        />

        {loanPeriod && <Paragraph>Loan Period: {loanPeriod} years</Paragraph>}

        <Button block onClick={calculateLoan} style={{ width: "100%" }}>Calculate</Button>

        {loanBreakdown && (
          <>
            <div style={{ marginTop: 20 }}>
              <Paragraph>Total Payable: PKR {loanBreakdown.totalPayable.toFixed(2)}</Paragraph>
              <Paragraph>Monthly Installment: PKR {loanBreakdown.monthlyInstallment.toFixed(2)}</Paragraph>
            </div>
            <Button style={{ width: "100%" }} type="primary" onClick={() => setIsModalVisible(true)}>Proceed</Button>
          </>
        )}
      </Card>

      <Modal title="Enter Your Details" open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
        <Form layout="vertical" form={form}>
          <Form.Item
            label="CNIC"
            name="cnic"
            rules={[
              { required: true, message: "Please enter your CNIC" },
              { pattern: /^\d{5}-\d{7}-\d{1}$/, message: "Invalid CNIC format. Use XXXXX-XXXXXXX-X" },
            ]}
          >
            <Input placeholder="Enter your CNIC" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, type: 'email', message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Enter your Email" />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please enter your Name" },
              { pattern: /^[a-zA-Z\s]+$/, message: "Name should only contain letters and spaces" },
            ]}
          >
            <Input placeholder="Enter your Name" />
          </Form.Item>
          <Button type="primary" htmlType="submit" onClick={handleSubmit} disabled={loading} style={{ width: "100%" }}>{loading ? <Spin /> : "Submit" }</Button>
        </Form>
      </Modal>
    </>


  );
}
