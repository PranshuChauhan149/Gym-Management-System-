import React from 'react';
import { useMyContext } from '../Context/AppContext';
import { FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import DetailNavbar from "../components/DetailNavbar";
import { toast } from 'react-toastify';

const DeleteMember = () => {
  const { member, server_Url, getCurrentUser } = useMyContext();

  const handleDelete = async (id) => {
  console.log(id);

  if (window.confirm('Are you sure you want to delete this member?')) {
    try {
      const res = await axios.delete(`${server_Url}/api/admin/delete/${id}`);
      console.log(res);

      if (res.data.success) {
        toast.success('Member deleted successfully');
        getCurrentUser();
      } else {
        toast.error(res.data.message || 'Failed to delete member');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete member');
    }
  }
};


  return (
    <div><DetailNavbar />
    <div className="max-w-7xl mx-auto p-4 bg-white rounded-2xl shadow-lg mt-8 mb-10">
    
      <h2 className="text-xl lg:text-2xl font-bold mb-6 text-gray-700 text-center">Delete Gym Members</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="bg-orange-500 text-white uppercase text-xs">
            <tr>
              <th className="p-3">Photo</th>
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Plan</th>
              <th className="p-3">Start Date</th>
              <th className="p-3">End Date</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {member && member.length > 0 ? (
              member.map((m, index) => (
                <tr key={index} className="border-b hover:bg-orange-50">
                  <td className="p-3">
                    <img
                      src={m.image || 'https://via.placeholder.com/40'}
                      alt="Member"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="p-3 font-semibold text-gray-700">{m.name}</td>
                  <td className="p-3 text-gray-600 tracking-wide">{m.phone}</td>
                  <td className="p-3">{m.membership?.plan || 'N/A'}</td>
                  <td className="p-3 text-xs text-gray-500">
                    {m.membership?.startDate ? new Date(m.membership.startDate).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="p-3 text-xs text-gray-500">
                    {m.membership?.endDate ? new Date(m.membership.endDate).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(m._id)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
};

export default DeleteMember;
