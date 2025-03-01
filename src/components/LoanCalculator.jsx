import { useContext, useEffect, useState } from "react";
import { Card, Select, Input, Button, Typography, message, Modal, Form, Spin } from "antd";
import axios from "axios";
import { AppRoutes } from "../routes/routes";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/UserContext";

const { Title, Paragraph } = Typography;
const { Option } = Select;

const loanCategories = {
  "Wedding Loans": {
    subcategories: ["Valima", "Furniture", "Valima Food", "Jahez"],
    maxLoan: 500000,
    period: [1, 2, 3],
  },
  "Home Construction Loans": {
    subcategories: ["Structure", "Finishing", "Loan"],
    maxLoan: 1000000,
    period: [1, 2, 3, 4, 5],
  },
  "Business Startup Loans": {
    subcategories: ["Buy Stall", "Advance Rent for Shop", "Shop Assets", "Shop Machinery"],
    maxLoan: 1000000,
    period: [1, 2, 3, 4, 5],
  },
  "Education Loans": {
    subcategories: ["University Fees", "Child Fees Loan"],
    maxLoan: "Based on requirement",
    period: [1, 2, 3, 4],
  },
};

export default function LoanCalculator({ isHome }) {
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [subcategory, setSubcategory] = useState("");
  const [initialAmount, setInitialAmount] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [loanPeriod, setLoanPeriod] = useState(null);
  const [loanBreakdown, setLoanBreakdown] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { user } = useContext(AuthContext)
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // useEffect(() => {
  //   submitApplication()
  // }, [])

  const handleCategoryChange = (value) => {
    setCategory(value);
    setSubcategory("");
    setLoanPeriod(null);
    setLoanBreakdown(null);
  };

  const calculateLoan = () => {
    if (!category || !subcategory || !initialAmount || !depositAmount || !loanPeriod) {
      message.error("Please fill in all fields before calculating.");
      return;
    }

    const maxLoan = loanCategories[category].maxLoan;
    const requestedAmount = parseFloat(initialAmount) - parseFloat(depositAmount);

    if (maxLoan !== "Based on requirement" && requestedAmount > maxLoan) {
      message.error(`Maximum loan allowed is PKR ${maxLoan}`);
      return;
    }

    const totalPayable = requestedAmount;
    const monthlyInstallment = totalPayable / (loanPeriod * 12);

    setLoanBreakdown({ totalPayable, monthlyInstallment });
  };

  const generateRandomPassword = (length = 6) => {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    return Array.from({ length }, () => charset[Math.floor(Math.random() * charset.length)]).join("");
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const uniquePassword = generateRandomPassword();

      setLoading(true);

      // Send email
      await axios.post(AppRoutes.sendLoginPassword, {
        senderName: "M.Abbas",
        sender: "abbas.mohammad805@gmail.com",
        receiver: values.email,
        subject: "Your Account Password",
        message: `
          <html>
            <body>
              <h1>Your Account Password</h1>
              <p>Hello <strong>${values.name}</strong>,</p>
              <p>Your account password is: <strong>${uniquePassword}</strong></p>
              <p>Please keep this information secure.</p>
            </body>
          </html>
        `,
      });

      // Register user
      await axios.post(AppRoutes.register, {
        fullName: values.name,
        email: values.email.toLowerCase(),
        password: uniquePassword,
        cnic: values.cnic,
      });

      message.success("Form submitted successfully!");
      message.success("An email with your password has been sent.");
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error(error.response?.data?.message || "Failed to submit form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const submitApplication = async () => {
    const values = await form.validateFields();
    console.log("Application values", category, subcategory, initialAmount, depositAmount, loanPeriod, user._id);

    await axios.post(AppRoutes.loanRequest, {
      category: category,
      subcategory: subcategory,
      amount: initialAmount,
      initialDeposit: depositAmount,
      loanPeriod: loanPeriod,
      userId: user?._id
    })
      .then((res) => {
        message.success(res.data.data.message)
        console.log(res)
      })
      .catch((err) => {
        message.error(err.data.data.message || "Cannot submit request right now.")
        console.log(err)
      })
  }

  return (
    <>
      <h1 className="font-bold text-3xl text-center md:mb-8 mb-4 mt-4">{isHome ? "Calculate your loan" : ""}</h1>
      <Card style={{ maxWidth: 500, margin: "50px auto", padding: 20, boxShadow: "0px 2px 5px rgba(0,0,0,0.1)" }}>
        <Title level={3}>Loan Calculator</Title>
        <Select
          placeholder="Select Category"
          onChange={handleCategoryChange}
          style={{ width: "100%", marginBottom: 20 }}
        >
          {Object.keys(loanCategories).map((cat) => (
            <Option key={cat} value={cat}>
              {cat}
            </Option>
          ))}
        </Select>

        {category && (
          <>
            <Select
              placeholder="Select Subcategory"
              onChange={setSubcategory}
              style={{ width: "100%", marginBottom: 20 }}
            >
              {loanCategories[category].subcategories.map((sub) => (
                <Option key={sub} value={sub}>
                  {sub}
                </Option>
              ))}
            </Select>

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
            <Select
              placeholder="Select Loan Period"
              onChange={setLoanPeriod}
              style={{ width: "100%", marginBottom: 20 }}
            >
              {loanCategories[category].period.map((period) => (
                <Option key={period} value={period}>
                  {period} year{period > 1 && "s"}
                </Option>
              ))}
            </Select>
          </>
        )}

        <Button block onClick={calculateLoan}>
          Calculate
        </Button>

        <div className="text-center my-3">or</div>

        <Button type="primary" block onClick={() => setIsModalVisible(true)}>
          Proceed to Application
        </Button>

        {loanBreakdown && (
          <>
            <Paragraph>Total Payable: PKR {loanBreakdown.totalPayable.toFixed(2)}</Paragraph>
            <Paragraph>Monthly Installment: PKR {loanBreakdown.monthlyInstallment.toFixed(2)}</Paragraph>
            {
              isHome ? (
                <>
                  <Button type="primary" block onClick={() => setIsModalVisible(true)}>
                    Proceed to Application
                  </Button>
                  <Button type="dashed" style={{ margin: "10px 0px" }} block onClick={() => navigate("/")}>
                    Back to home
                  </Button>
                </>
              ) : (<Button type="primary" block onClick={submitApplication}>Submit Application</Button>)
            }
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
              { required: true, type: "email", message: "Please enter a valid email" },
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
          <Button type="primary" htmlType="submit" onClick={handleSubmit} disabled={loading} block>
            {loading ? <Spin /> : "Submit"}
          </Button>
        </Form>
      </Modal>
    </>
  );
}
