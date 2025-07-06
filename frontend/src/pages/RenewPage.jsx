import React, { useState, useEffect } from "react";
import DetailNavbar from "../components/DetailNavbar";
import axios from "axios";
import { toast } from "react-toastify";
import { useMyContext } from "../Context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

const RenewMembership = () => {
  const { id } = useParams();
  const { server_Url, Allmember } = useMyContext();
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    plan: "1",
    startDate: today,
    endDate: "",
    paidAmount: "",
  });


  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateEndDate = (startDate, plan) => {
    const months = parseInt(plan);
    if (!months || !startDate) return "";
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + months);
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    const newEndDate = calculateEndDate(formData.startDate, formData.plan);
    setFormData((prev) => ({ ...prev, endDate: newEndDate }));
  }, [formData.plan, formData.startDate]);

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.put(`${server_Url}/api/admin/renew/${id}`, formData, {  // use formData here
      withCredentials: true,
    });

    if (res.data.success) {
      toast.success("Membership renewed successfully!");
      setFormData({
        plan: "1",
        startDate: today,
        endDate: "",
        paidAmount: "",
      });
      Allmember();
      navigate("/monthly-Joined");
    } else {
      toast.error(res.data.message || "Failed to renew membership");
    }
  } catch (error) {
    toast.error("Failed to renew membership");
    console.error(error);
  }
};


  return (
    <div>
      <DetailNavbar />
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-10 mb-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
          Renew Membership
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="text-sm text-gray-600">Membership Plan</label>
            <select
              name="plan"
              value={formData.plan}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400"
              required
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
              required
              placeholder="₹ Amount"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            <div className="w-full">
              <label className="text-sm text-gray-600">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div className="w-full">
              <label className="text-sm text-gray-600">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg shadow-lg"
          >
            Renew Membership
          </button>
        </form>
      </div>
    </div>
  );
};

export default RenewMembership;
