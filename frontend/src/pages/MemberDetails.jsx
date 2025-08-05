import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMyContext } from '../Context/AppContext';
import DetailNavbar from '../components/DetailNavbar';
import axios from 'axios';               // ✅ You missed importing axios
import { toast } from 'react-toastify';  // ✅ You missed importing toast

const MemberDetails = () => {
  const { memberid } = useParams();
  const { member, getCurrentUser, server_Url,Allmember } = useMyContext();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        const res = await axios.delete(`${server_Url}/api/admin/delete/${id}`, {
          withCredentials: true,
        });

        if (res.data.success) {

          toast.success('Member deleted successfully');
          Allmember();
        
          navigate('/joined-members');  // ✅ Optional: Redirect after delete
        } else {
          toast.error(res.data.message || 'Failed to delete member');
        }
      } catch (error) {
        console.error(error);
        toast.error('Failed to delete member');
      }
    }
  };

  const m = member.find(item => item._id === memberid);

  const sDate = () => m?.membership?.startDate && new Date(m.membership.startDate).toLocaleDateString();
  const eDate = () => m?.membership?.endDate && new Date(m.membership.endDate).toLocaleDateString();

  if (!m) {
    return (
      <div>
        <DetailNavbar />
        <div className="flex justify-center items-center h-screen">
          <p className="text-red-500 text-lg">Member not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <DetailNavbar />
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-10 mb-10 flex flex-col lg:flex-row gap-10">

        {/* Left: Image */}
        <div className="w-full lg:w-1/3 flex justify-center items-center">
          {m.image ? (
            <img
              src={m.image}
              alt={m.name}
              className="rounded-2xl object-cover w-full h-[350px] border shadow-md"
            />
          ) : (
            <div className="w-full h-[350px] rounded-2xl bg-gray-200 flex items-center justify-center text-gray-500 text-lg">
              No Image
            </div>
          )}
        </div>

        {/* Right: Details */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          <h2 className="text-3xl font-bold text-gray-700 border-b pb-3">{m.name}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 text-sm">
            <div><span className="font-semibold">Phone:</span> {m.phone}</div>
            <div><span className="font-semibold">Address:</span> {m.address || 'N/A'}</div>
            <div><span className="font-semibold">Plan:</span> {m.membership?.plan || 'N/A'}</div>
            <div><span className="font-semibold">Paid Amount:</span> ₹{m.membership?.paidAmount || 0}</div>
            <div><span className="font-semibold">Start Date:</span> {sDate() || 'N/A'}</div>
            <div><span className="font-semibold">End Date:</span> {eDate() || 'N/A'}</div>
            <div><span className="font-semibold">Payment Mode:</span> {m.membership?.paymentMode || 'N/A'}</div>
            <div>
              <span className="font-semibold">Status:</span>{' '}
              <span className= 'text-green-600 font-semibold'>
                Active
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => navigate(`/edit-member/${m._id}`)}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 text-sm font-semibold"
            >
              Edit Member
            </button>

            <button
              onClick={() => handleDelete(m._id)}   // ✅ Fixed: Pass function not call
              className="bg-red-500 text-white px-5 py-2 rounded-lg shadow hover:bg-red-600 text-sm font-semibold"
            >
              Delete Member
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MemberDetails;
