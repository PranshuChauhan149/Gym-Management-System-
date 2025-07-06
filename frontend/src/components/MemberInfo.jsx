import React from 'react';
import { FaPerson, FaMoneyBillWave, FaUserCheck } from "react-icons/fa6";
import { useMyContext } from '../Context/AppContext';

const MemberInfo = () => {
  const { member } = useMyContext();

  const totalMembers = member?.length || 0;

  const currentMonth = new Date().getMonth();
  const newJoinees = member?.filter(m => {
    const startDate = new Date(m.membership?.startDate);
    return startDate.getMonth() === currentMonth;
  }).length || 0;

  const totalEarnings = member?.reduce((sum, m) => sum + (parseInt(m.membership?.paidAmount) || 0), 0);

  const activeMembers = member?.filter(m => m.membership?.isActive).length || 0;

  const cardData = [
    { title: "All Members", value: totalMembers, color: "bg-orange-200", icon: <FaPerson className="text-4xl text-orange-600" /> },
    { title: "New Joinees", value: newJoinees, color: "bg-blue-200", icon: <FaPerson className="text-4xl text-blue-600" /> },
    { title: "Total Earnings", value: `₹ ${totalEarnings}`, color: "bg-green-200", icon: <FaMoneyBillWave className="text-4xl text-green-600" /> },
    { title: "Active Members", value: activeMembers, color: "bg-yellow-200", icon: <FaUserCheck className="text-4xl text-yellow-600" /> },
  ];

  return (
    <div className='mt-6 lg:mt-8 flex flex-col gap-6 items-center'>
    <p className="text-2xl font-semibold text-center px-6 py-3 rounded-full mb-4 shadow-md shadow-black bg-[#ba701a33] text-black">
  Information
</p>

      <div className='flex justify-center gap-6 flex-wrap'>
        {cardData.map((card, index) => (
          <div
            key={index}
            className={`w-[150px] h-[150px] shadow-lg shadow-black rounded-2xl flex flex-col items-center justify-evenly ${card.color}`}
          >
            {card.icon}
            <div className='flex flex-col items-center'>
              <p className='font-bold text-lg text-center'>{card.title}</p>
              <p className='font-extrabold text-xl text-gray-800'>{card.value}</p>
            </div>
          </div>
        ))}
      </div>
       <p className="text-2xl font-semibold text-center px-6 py-3 rounded-full mb-6 shadow-lg shadow-black bg-[#ba701a33] text-black mt-4">
          Member Details
        </p>
    </div>
  );
};

export default MemberInfo;
