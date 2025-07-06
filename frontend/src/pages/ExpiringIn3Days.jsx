import React from 'react';
import DetailNavbar from '../components/DetailNavbar';
import { FaExclamationCircle } from 'react-icons/fa';
import { useMyContext } from '../Context/AppContext';
import { useNavigate } from 'react-router-dom';

const ExpiringMembers = () => {
  const { member } = useMyContext();
  const navgaite = useNavigate();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filteredMembers = member
    .map(m => {
      const endDateRaw = m?.membership?.endDate;

      if (!endDateRaw) {
        return { ...m, daysLeft: null };
      }

      const endDate = new Date(endDateRaw);
      endDate.setHours(0, 0, 0, 0);

      const timeDiff = endDate - today;
      const daysLeft = isNaN(timeDiff) ? null : Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

      return { ...m, daysLeft };
    })
    .filter(m => m.daysLeft !== null && m.daysLeft >= 0 && m.daysLeft <= 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-red-100 pb-12">
      <DetailNavbar />

      <h2 className="text-3xl font-extrabold text-gray-800 text-center mt-8 mb-10">⏳ Memberships Expiring Soon</h2>

      {filteredMembers.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No memberships expiring within 3 days.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto">
          {filteredMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition duration-300 border-2 border-red-200" onClick={()=>navgaite(`/detail/${member._id}`)}
            >
              <div className="relative mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-md"
                />
                <FaExclamationCircle className="absolute bottom-2 right-2 text-red-500 text-lg border-2 border-white rounded-full" />
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>

              <p className="text-sm text-gray-500 mb-1">
                Start: <span className="font-semibold text-gray-700">
                  {new Date(member.membership.startDate).toLocaleDateString()}
                </span>
              </p>

              <p className="text-sm text-gray-500 mb-1">
                End: <span className="font-semibold text-red-600">
                  {new Date(member.membership.endDate).toLocaleDateString()}
                </span>
              </p>

              <div className="mt-3 px-4 py-1 bg-red-100 text-red-600 rounded-full text-sm font-semibold">
                {member.daysLeft} day{member.daysLeft > 1 ? 's' : ''} left
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpiringMembers;
