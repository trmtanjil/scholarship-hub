import React from 'react';
import { FaSearch, FaFilter, FaCheckCircle } from 'react-icons/fa';

const HowThisWork = () => {
  const steps = [
    {
      id: 1,
      icon: <FaSearch className="text-4xl text-blue-600 mb-4" />,
      title: "Find College Scholarships",
      description: "Get matched to college scholarships tailored to your profile. Complete your profile, and we will instantly search millions of scholarships to match you with the best opportunities, saving you time and maximizing your chances of success."
    },
    {
      id: 2,
      icon: <FaFilter className="text-4xl text-blue-600 mb-4" />,
      title: "Organize Your Matches",
      description: "Filter your scholarship matches by due date or award amount. Keep track of your favorite scholarships, those you've applied to, and those you've seen. With Scholarships.com, you'll never miss an opportunity or scholarship deadline!"
    },
    {
      id: 3,
      icon: <FaCheckCircle className="text-4xl text-blue-600 mb-4" />,
      title: "Apply and Win",
      description: "We've created a personalized list of college scholarships just for you. Now it's time to apply for the scholarships you've been matched with. Start your applications today and make college more affordable!"
    }
  ];

  return (
    <div className="  py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold   mb-4  ">How ScholarFinder.com Works</h1>
          <p className="text-lg   max-w-3xl mx-auto">
            Scholarships.com is a free college scholarship search platform that matches you to college scholarships you qualify for.
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-center">
                {step.icon}
                <h3 className="text-xl font-bold text-gray-800 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors duration-300 shadow-md">
            Find Scholarships Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowThisWork;