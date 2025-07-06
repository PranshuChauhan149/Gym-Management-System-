import React from 'react';
import DetailNavbar from '../components/DetailNavbar';
import { FaCircle } from 'react-icons/fa';
import { useMyContext } from '../Context/AppContext';
import { useNavigate } from 'react-router-dom';

const MonthlyJoined = () => {
  const { member } = useMyContext();
  const navgaite = useNavigate();

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const filteredMembers = member.filter(m => {
    const joinDate = new Date(m.membership?.startDate);
    return joinDate.getMonth() === currentMonth && joinDate.getFullYear() === currentYear;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 pb-12">
      <DetailNavbar />

      <h2 className="text-3xl font-extrabold text-gray-800 text-center mt-8 mb-10">
        📅 Monthly Joined Members
      </h2>

      {filteredMembers.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No new members joined this month.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto">
          {filteredMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition duration-300"  onClick={()=>navgaite(`/detail/${member._id}`)}
            >
              <div className="relative mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                />
                <FaCircle className="absolute bottom-2 right-2 text-green-500 text-xs border-2 border-white rounded-full" />
              </div>

              <h3 className="text-lg font-bold text-gray-800 mb-1">{member.name}</h3>
              <p className="text-sm text-gray-500 mb-1">
                Start: <span className="font-semibold text-gray-700">
                  {member.membership?.startDate ? new Date(member.membership.startDate).toLocaleDateString() : 'N/A'}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                End: <span className="font-semibold text-gray-700">
                  {member.membership?.endDate ? new Date(member.membership.endDate).toLocaleDateString() : 'N/A'}
                </span>
              </p>

              <div className="mt-4 px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-semibold">
                Active
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MonthlyJoined;
