import React from 'react';
import { useMyContext } from '../Context/AppContext';

const data = [
  { month: 'Jan', members: 20, earnings: 5000 },
  { month: 'Feb', members: 35, earnings: 9000 },
  { month: 'Mar', members: 50, earnings: 15000 },
  { month: 'Apr', members: 65, earnings: 22000 },
  { month: 'May', members: 80, earnings: 30000 },
  { month: 'Jun', members: 100, earnings: 40000 },
];

const GymGrowth = () => {
  const { member } = useMyContext();
  const totalMembers = member?.length || 100;  // Fallback
  const totalEarnings = data.reduce((sum, item) => sum + item.earnings, 0);
  const maxMembers = Math.max(...data.map(item => item.members));

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">Gym Growth Overview</h2>

      <div className="flex flex-col lg:flex-row justify-around items-center gap-6 mb-8">
        <div className="text-center">
          <p className="text-4xl font-extrabold text-orange-500">{totalMembers}+</p>
          <p className="font-medium text-gray-600">Total Members</p>
        </div>

        <div className="text-center">
          <p className="text-4xl font-extrabold text-green-500">₹ {totalEarnings.toLocaleString()}</p>
          <p className="font-medium text-gray-600">Total Earnings</p>
        </div>
      </div>

      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <span className="w-16 text-sm font-medium text-gray-600">{item.month}</span>
            <div className="flex-1 bg-gray-200 rounded-full h-5 overflow-hidden">
              <div
                className="h-5 rounded-full bg-orange-400 transition-all duration-500"
                style={{ width: `${(item.members / maxMembers) * 100}%` }}
              ></div>
            </div>
            <span className="text-sm font-bold text-gray-700">{item.members} Members</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GymGrowth;
