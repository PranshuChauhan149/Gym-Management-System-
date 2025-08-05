import React from "react";
import { useMyContext } from "../Context/AppContext";
import DetailNavbar from "../components/DetailNavbar";
import { FaTimesCircle, FaRedo, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ExpiredMember = () => {
  const navigate = useNavigate();
  const { member, server_Url, getCurrentUser ,Allmember} = useMyContext();
  const today = new Date();

  const expiredMembers =
    member?.filter((m) => {
      const endDate = new Date(m.membership?.endDate);
      return endDate < today;
    }) || [];

  const handleDelete = async (id) => {
    console.log(id);

    if (window.confirm("Are you sure you want to delete this member?")) {
      try {
        const res = await axios.delete(`${server_Url}/api/admin/delete/${id}`,{withCredentials:true});
        console.log(res);

        if (res.data.success) {
          toast.success("Member deleted successfully");
          Allmember();
    
        } else {
          toast.error(res.data.message || "Failed to delete member");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete member");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-100 pb-12">
      <DetailNavbar />

      <h2 className="text-3xl font-extrabold text-gray-800 text-center mt-8 mb-10">
        ❌ Expired Memberships
      </h2>

      {expiredMembers.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No expired memberships found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto">
          {expiredMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl border border-red-200 p-8 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition duration-300"
            >
              <div
                className="relative mb-4"
                onClick={() => navigate(`/detail/${member._id}`)}
              >
              {member.image ? (
  <img
    src={member.image}
    alt={member.name}
    className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-xl"
  />
) : (
  <div className="w-36 h-36 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 border-4 border-white shadow-xl text-sm font-semibold">
    No Image
  </div>
)}

                <FaTimesCircle className="absolute bottom-2 right-2 text-red-500 text-lg border-2 border-white rounded-full" />
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-1">
                {member.name}
              </h3>

              <p className="text-sm text-gray-500 mb-1">
                Start:{" "}
                <span className="font-semibold text-gray-700">
                  {new Date(member.membership?.startDate).toLocaleDateString()}
                </span>
              </p>

              <p className="text-sm text-gray-500 mb-1">
                End:{" "}
                <span className="font-semibold text-red-600">
                  {new Date(member.membership?.endDate).toLocaleDateString()}
                </span>
              </p>

              <div className="mt-3 px-4 py-1 bg-red-100 text-red-600 rounded-full text-sm font-semibold uppercase shadow">
                Expired
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => navigate(`/renew/${member._id}`)}
                  className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow"
                >
                  <FaRedo /> Renew
                </button>

                <button
                  onClick={() => {
                    navigate("/inactive-members");
                    handleDelete(member._id)
                  }}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow"
                >
                  <FaTrashAlt /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpiredMember;
