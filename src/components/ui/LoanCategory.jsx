import { Button } from 'antd';
import React from 'react';

const LoanCategories = () => {
  const loanCategories = [
    {
      title: "Wedding Loans",
      subcategories: ["Valima", "Furniture", "Valima Food", "Jahez"],
      maxLoan: "PKR 5 Lakh",
      loanPeriod: "3 years",
    },
    {
      title: "Home Construction Loans",
      subcategories: ["Structure", "Finishing", "Loan"],
      maxLoan: "PKR 10 Lakh",
      loanPeriod: "5 years",
    },
    {
      title: "Business Startup Loans",
      subcategories: ["Buy Stall", "Advance Rent for Shop", "Shop Assets", "Shop Machinery"],
      maxLoan: "PKR 10 Lakh",
      loanPeriod: "5 years",
    },
    {
      title: "Education Loans",
      subcategories: ["University Fees", "Child Fees Loan"],
      maxLoan: "Based on Requirement",
      loanPeriod: "4 years",
    },
  ];

  return (
    <section>
        <div className='flex items-center justify-between my-5'>
            <div className='text-3xl font-bold'>Loan Categories</div>
            <div>
                <Button type="default" size='large' href='/loan-calculator'>Apply for Loan</Button>
            </div>
        </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {loanCategories.map((category, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
          <ul className="list-disc list-inside text-sm">
            {category.subcategories.map((subcategory) => (
              <li key={subcategory}>{subcategory}</li>
            ))}
          </ul>
          <div className="flex justify-between mt-4">
            <span className="text-sm font-semibold">Max Loan:</span>
            <span className="text-sm">{category.maxLoan}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-semibold">Loan Period:</span>
            <span className="text-sm">{category.loanPeriod}</span>
          </div>
        </div>
      ))}
    </div>

    </section>
  );
};

export default LoanCategories;