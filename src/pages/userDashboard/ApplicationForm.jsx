import { useState } from 'react';
import { Form, Select, Input, Button, Card, Typography } from 'antd';
import QRCode from 'react-qr-code';
import { jsPDF } from 'jspdf';

const { Option } = Select;
const { Title, Paragraph } = Typography;

const loanCategories = {
  'Wedding Loans': {
    subcategories: ['Valima', 'Furniture', 'Valima Food', 'Jahez'],
    maxLoan: 500000,
    period: 3,
  },
  'Home Construction Loans': {
    subcategories: ['Structure', 'Finishing', 'Loan'],
    maxLoan: 1000000,
    period: 5,
  },
  'Business Startup Loans': {
    subcategories: ['Buy Stall', 'Advance Rent for Shop', 'Shop Assets', 'Shop Machinery'],
    maxLoan: 1000000,
    period: 5,
  },
  'Education Loans': {
    subcategories: ['University Fees', 'Child Fees Loan'],
    maxLoan: 'Based on requirement',
    period: 4,
  },
};

export default function RequestForm() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [loanPeriod, setLoanPeriod] = useState('');
  const [slipData, setSlipData] = useState(null);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setLoanPeriod(loanCategories[value]?.period);
  };

  const handleSubmit = () => {
    const slip = {
      token: `TOKEN-${Math.floor(Math.random() * 100000)}`,
      category: selectedCategory,
      subcategory: selectedSubcategory,
      amount: loanAmount,
      period: loanPeriod,
      appointment: '2025-02-01, 10:00 AM, Saylani Office'
    };
    setSlipData(slip);
  };

  const downloadSlipAsPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Loan Request Slip', 20, 20);
    doc.setFontSize(12);
    doc.text(`Token Number: ${slipData.token}`, 20, 40);
    doc.text(`Category: ${slipData.category}`, 20, 50);
    doc.text(`Subcategory: ${slipData.subcategory}`, 20, 60);
    doc.text(`Amount: PKR ${slipData.amount}`, 20, 70);
    doc.text(`Loan Period: ${slipData.period} years`, 20, 80);
    doc.text(`Appointment: ${slipData.appointment}`, 20, 90);
    doc.save('Loan_Request_Slip.pdf');
  };

  return (
    <Card style={{ maxWidth: 600, margin: '50px auto', padding: 20 }}>
      <Title level={2}>Loan Request Form</Title>
      <Form layout='vertical' onFinish={handleSubmit}>
        <Form.Item label='Select Category' required>
          <Select placeholder='Choose a category' onChange={handleCategoryChange}>
            {Object.keys(loanCategories).map((category) => (
              <Option key={category} value={category}>{category}</Option>
            ))}
          </Select>
        </Form.Item>

        {selectedCategory && (
          <Form.Item label='Select Subcategory' required>
            <Select placeholder='Choose a subcategory' onChange={setSelectedSubcategory}>
              {loanCategories[selectedCategory].subcategories.map((sub) => (
                <Option key={sub} value={sub}>{sub}</Option>
              ))}
            </Select>
          </Form.Item>
        )}

        <Form.Item label='Loan Amount' required>
          <Input type='number' placeholder='Enter loan amount' onChange={(e) => setLoanAmount(e.target.value)} />
        </Form.Item>

        <Form.Item label='Loan Period'>
          <Input value={loanPeriod} disabled />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>Submit Request</Button>
        </Form.Item>
      </Form>

      {slipData && (
        <Card style={{ marginTop: 20, textAlign: 'center' }}>
          <Title level={3}>Loan Request Slip</Title>
          <Paragraph><strong>Token Number:</strong> {slipData.token}</Paragraph>
          <Paragraph><strong>Category:</strong> {slipData.category}</Paragraph>
          <Paragraph><strong>Subcategory:</strong> {slipData.subcategory}</Paragraph>
          <Paragraph><strong>Amount:</strong> PKR {slipData.amount}</Paragraph>
          <Paragraph><strong>Loan Period:</strong> {slipData.period} years</Paragraph>
          <Paragraph><strong>Appointment:</strong> {slipData.appointment}</Paragraph>
          <QRCode value={JSON.stringify(slipData)} size={150} className='text-center' />
          <Button type='primary' onClick={downloadSlipAsPDF} style={{ marginTop: 20 }}>Download PDF</Button>
        </Card>
      )}
    </Card>
  );
}
