import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMyContext } from '../Context/AppContext';
import DetailNavbar from '../components/DetailNavbar';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditMember = () => {
  const { editid } = useParams();   // ✅ use correct param name: editid



  console.log(editid)
  const { Allmember,member, server_Url } = useMyContext();
  const navigate = useNavigate();
const m = member.find(item => item._id?.toString() === editid);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    plan: '',
    startDate: '',
    endDate: '',
    paidAmount: '',
    paymentMode: '',
  });

  useEffect(() => {
    if (m) {
      setFormData({
        name: m.name || '',
        phone: m.phone || '',
        address: m.address || '',
        plan: m.membership?.plan || '',
        startDate: m.membership?.startDate?.slice(0, 10) || '',
        endDate: m.membership?.endDate?.slice(0, 10) || '',
        paidAmount: m.membership?.paidAmount || '',
        paymentMode: m.membership?.paymentMode || '',
      });
    }
  }, [m]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`${server_Url}/api/admin/update-member/${editid}`, formData, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success('Member updated successfully!');
        Allmember();
        navigate('/monthly-Joined');
      } else {
        toast.error(res.data.message || 'Failed to update member');
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.error(error);
    }
  };

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
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-10 mb-10 flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3 flex justify-center items-center">
          <img
            src={m.image || 'https://via.placeholder.com/300x300.png?text=No+Image'}
            alt="Member"
            className="rounded-2xl object-cover w-72 h-72 shadow-md"
          />
        </div>

        <div className="w-full lg:w-2/3">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Edit Member</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Plan</label>
                <select
                  name="plan"
                  value={formData.plan}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400"
                >
                  <option value="1">1 Month</option>
                  <option value="3">3 Months</option>
                  <option value="6">6 Months</option>
                  <option value="12">12 Months</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-600">Paid Amount (₹)</label>
                <input
                  type="number"
                  name="paidAmount"
                  value={formData.paidAmount}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Payment Mode</label>
                <select
                  name="paymentMode"
                  value={formData.paymentMode}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400"
                >
                  <option value="cash">Cash</option>
                  <option value="online">Online</option>
                  <option value="card">Card</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-600">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg shadow-lg"
            >
              Update Member
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditMember;
