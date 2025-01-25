import { useState } from "react";
import { Card, Select, Input, Button, Typography, Alert } from "antd";

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
  const [subcategory, setSubcategory] = useState("");
  const [initialAmount, setInitialAmount] = useState("");
  const [loanPeriod, setLoanPeriod] = useState("");
  const [loanBreakdown, setLoanBreakdown] = useState(null);

  const handleCategoryChange = (value) => {
    setCategory(value);
    setSubcategory("");
    setLoanPeriod(loanCategories[value]?.period || "");
  };

  const calculateLoan = () => {
    if (!category || !subcategory || !initialAmount) {
      Alert.error("Please fill all fields");
      return;
    }

    const maxLoan = loanCategories[category].maxLoan;
    const requestedAmount = parseFloat(initialAmount);

    if (maxLoan !== "Based on requirement" && requestedAmount > maxLoan) {
      Alert.error(`Maximum loan allowed is PKR ${maxLoan}`);
      return;
    }

    const interestRate = 0.10;
    const totalPayable = requestedAmount + requestedAmount * interestRate * loanPeriod;
    const monthlyInstallment = totalPayable / (loanPeriod * 12);

    setLoanBreakdown({ totalPayable, monthlyInstallment });
  };

  return (
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
        placeholder="Enter initial amount"
        value={initialAmount}
        onChange={(e) => setInitialAmount(e.target.value)}
        style={{ marginBottom: 20 }}
      />

      {loanPeriod && <Paragraph>Loan Period: {loanPeriod} years</Paragraph>}

      <Button type="primary" onClick={calculateLoan} style={{ width: "100%" }}>Calculate</Button>

      {loanBreakdown && (
        <div style={{ marginTop: 20 }}>
          <Paragraph>Total Payable: PKR {loanBreakdown.totalPayable.toFixed(2)}</Paragraph>
          <Paragraph>Monthly Installment: PKR {loanBreakdown.monthlyInstallment.toFixed(2)}</Paragraph>
        </div>
      )}
    </Card>
  );
}
