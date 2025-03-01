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
    <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-black'>
      <div className='flex flex-col sm:flex-row items-center justify-between mb-10'>
        <div className='text-3xl font-bold mb-4 sm:mb-0'>
          Loan Categories
        </div>
        <Button 
          type="default" 
          size='large' 
          href='/loan-calculator'
          className='bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl'
        >
          Apply for Loan
        </Button>
      </div>
    
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {loanCategories.map((category, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1"
          >
            <h3 className="text-xl font-bold mb-4 text-blue-800">{category.title}</h3>
            <ul className="space-y-2 mb-6">
              {category.subcategories.map((subcategory) => (
                <li key={subcategory} className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  {subcategory}
                </li>
              ))}
            </ul>
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-600">Max Loan:</span>
                <span className="text-sm font-bold text-blue-600">{category.maxLoan}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-600">Loan Period:</span>
                <span className="text-sm font-bold text-blue-600">{category.loanPeriod}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LoanCategories;