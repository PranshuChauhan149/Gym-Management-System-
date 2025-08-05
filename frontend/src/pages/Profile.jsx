import React from 'react';
import { useMyContext } from '../Context/AppContext';
import moment from 'moment'; // optional: for formatting dates
import Navbar from '../components/Navbar';

const Profile = () => {
  const { User } = useMyContext(); // Assuming User is { username, email, createdAt, updatedAt, _id }

  return (
    <div className='flex flex-col gap-2.5'>
      <Navbar/>
    <div className="min-[500px] bg-gradient-to-r from-purple-300 via-pink-300 to-red-300 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-xl w-full border-4 border-purple-500">
        <div className="flex flex-col items-center mb-6">
          <div className="w-28 h-28 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center text-3xl font-bold shadow-lg">
            {User?.username?.charAt(0).toUpperCase() || "U"}
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mt-4 capitalize">
            {User?.username || "Unknown User"}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            ID: <span className="text-gray-500">{User?._id}</span>
          </p>
        </div>

        <div className="space-y-4 text-lg">
          <div className="flex justify-between">
            <span className="text-purple-700 font-semibold">Email:</span>
            <span className="text-gray-800">{User?.email}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-green-700 font-semibold">Created:</span>
            <span className="text-gray-800">{moment(User?.createdAt).format('LLL')}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-blue-700 font-semibold">Last Updated:</span>
            <span className="text-gray-800">{moment(User?.updatedAt).format('LLL')}</span>
          </div>
        </div>

     
      </div>
    </div>
    </div>
  );
};

export default Profile;
