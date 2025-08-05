// ... your imports remain unchanged
import React, { useState, useRef, useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import DetailNavbar from "../components/DetailNavbar";
import axios from "axios";
import { toast } from "react-toastify";
import { useMyContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

const AddMember = () => {
  const { server_Url, Allmember } = useMyContext();
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    plan: "1 Month",
    startDate: today,
    endDate: "",
    paidAmount: "",
    paymentMode: "cash",
    image: null,
  });

  const [loading, setLoading] = useState(false); // ✅ loading state added
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      if (file && file.type.startsWith("image/")) {
        setFormData((prev) => ({ ...prev, image: file }));
      } else {
        toast.error("Please select a valid image file");
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
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
    setLoading(true); // ✅ start loading

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) data.append(key, formData[key]);
    });

    try {
      const res = await axios.post(`${server_Url}/api/admin/new/member`, data, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Member Added Successfully!");
        setFormData({
          name: "",
          phone: "",
          address: "",
          plan: "1 Month",
          startDate: today,
          endDate: "",
          paidAmount: "",
          paymentMode: "cash",
          image: null,
        });

        navigate("/monthly-Joined");
        Allmember();
      } else {
        toast.error(res.data.message || "Failed to add member");
      }
    } catch (error) {
      toast.error("Failed to add member");
      console.error(error);
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  return (
    <div>
      <DetailNavbar />
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-10 mb-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
          Add New Gym Member
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Image Upload */}
          <div className="flex flex-col items-center gap-4 relative">
            <div
              className="w-36 h-36 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 overflow-hidden cursor-pointer relative shadow"
              onClick={handleImageClick}
            >
              {formData.image ? (
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="Member"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>No Image</span>
              )}

              <div className="absolute bottom-2 right-4 bg-orange-500 p-2 rounded-full shadow-md hover:bg-orange-600">
                <FaCamera className="text-white text-sm" />
              </div>
            </div>

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              ref={fileInputRef}
              className="hidden"
            />
            <label className="text-sm text-gray-600">Upload Member Photo</label>
          </div>

          {/* Name & Phone */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="w-full">
              <label className="text-sm text-gray-600">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter full name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div className="w-full">
              <label className="text-sm text-gray-600">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Enter phone number"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="text-sm text-gray-600">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="2"
              placeholder="Enter address"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 resize-none"
            ></textarea>
          </div>

          {/* Plan, Amount, Payment */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="w-full">
              <label className="text-sm text-gray-600">Membership Plan</label>
              <select
                name="plan"
                value={formData.plan}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400"
              >
                <option value="1">1 Month</option>
                <option value="3">3 Months</option>
                <option value="6">6 Months</option>
                <option value="12">12 Months</option>
              </select>
            </div>

            <div className="w-full">
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

            <div className="w-full">
              <label className="text-sm text-gray-600">Payment Mode</label>
              <select
                name="paymentMode"
                value={formData.paymentMode}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400"
              >
                <option value="cash">Cash</option>
                <option value="online">Online</option>
                <option value="card">Card</option>
              </select>
            </div>
          </div>

          {/* Dates */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="w-full">
              <label className="text-sm text-gray-600">Membership Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div className="w-full">
              <label className="text-sm text-gray-600">Membership End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg shadow-lg"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Member"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMember;
