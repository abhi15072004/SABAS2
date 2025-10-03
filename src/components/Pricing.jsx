// src/components/Pricing.js
import React from 'react';
import { FaCheck } from 'react-icons/fa';

const pricingPlans = [
  { title: 'FREE', price: '₹0 /year', features: ['100 Tracked Buses', '100 Seats (Children)'] },
  { title: 'PAY AS YOU GO', price: '₹10 /year', features: ['Pay As You Go Tracked Buses', 'Pay As You Go Seats'] }
];

const Pricing = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-4xl mx-auto">
       <h2 className="text-4xl md:text-5xl font-bold text-center mb-16
  bg-clip-text text-transparent
  bg-gradient-to-r from-green-400 via-blue-500 to-purple-500
  animate-gradient-x
  hover:scale-105 transition-transform duration-500">
  PRICES
</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index} 
              className="bg-gray-800 rounded-lg p-8 text-center shadow-lg border border-gray-700
                         transition-transform transition-shadow duration-500 ease-in-out
                         hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:border-amber-500"
            >
              <h3 className="text-2xl font-bold text-white mb-4">{plan.title}</h3>
              <p className="text-3xl font-bold text-amber-500 mb-8">{plan.price}</p>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center justify-center text-gray-300 transition-transform duration-500 hover:scale-110 hover:text-amber-400">
                    <FaCheck className="text-amber-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-amber-500 text-gray-900 hover:bg-amber-400 py-3 rounded-md font-semibold transition-colors duration-300">
                GET STARTED
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
