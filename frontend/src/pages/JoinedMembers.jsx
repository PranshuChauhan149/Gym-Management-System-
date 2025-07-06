import React from 'react';
import DetailNavbar from '../components/DetailNavbar';
import { FaCircle } from 'react-icons/fa';
import { useMyContext } from '../Context/AppContext';
import { useNavigate } from 'react-router-dom';

const JoinedMembers = () => {
  const navgaite = useNavigate();
  const { member } = useMyContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 pb-12">
      <DetailNavbar />

      <h2 className="text-4xl font-extrabold text-gray-800 text-center mt-10 mb-8">
        🏋️‍♂️ Gym Members Overview
      </h2>

      {(!member || member.length === 0) ? (
        <p className="text-center text-gray-600 mt-10 text-lg">No members found. Add some members to see them here.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6 max-w-7xl mx-auto"  >
          {member.map((m, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center hover:scale-[1.03] hover:shadow-2xl transition-all duration-300" onClick={()=>navgaite(`/detail/${m._id}`)}
            >
              <div className="relative mb-4">
                <img
                  src={m.image || '/default-profile.png'}
                  alt={m.name}
                  className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-xl"
                />
                <FaCircle className="absolute bottom-2 right-3 text-green-500 text-sm border-2 border-white rounded-full" />
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">{m.name}</h3>

              <p className="text-sm text-gray-500 mb-1">
                📱 <span className="font-medium text-gray-700">{m.phone}</span>
              </p>

              <p className="text-sm text-gray-500 mb-1">
                📅 Start: <span className="font-semibold text-gray-700">{new Date(m.membership?.startDate).toLocaleDateString()}</span>
              </p>
              <p className="text-sm text-gray-500 mb-2">
                ⏳ End: <span className="font-semibold text-gray-700">{new Date(m.membership?.endDate).toLocaleDateString()}</span>
              </p>

              <div className="mt-2 mb-2 px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-semibold shadow-sm">
                {m.membership?.plan || 'No Plan'}
              </div>

              <div className="text-sm text-gray-600">
                💰 ₹ {m.membership?.paidAmount || 0} &nbsp; | &nbsp; {m.membership?.paymentMode?.toUpperCase() || 'N/A'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JoinedMembers;
