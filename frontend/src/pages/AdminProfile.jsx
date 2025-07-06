import React from "react";
import { useMyContext } from "../Context/AppContext";
import DetailNavbar from "../components/DetailNavbar";

const AdminProfile = () => {
  const { User } = useMyContext();

  return (
    <div>
      <DetailNavbar />

      <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin Profile</h2>

        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex justify-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Admin"
              className="rounded-full w-40 h-40 object-cover shadow-md"
            />
          </div>

          <div className="flex-1">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Name:</h3>
              <p className="text-gray-600">{User?.username || "N/A"}</p>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Email:</h3>
              <p className="text-gray-600">{User?.email || "N/A"}</p>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Role:</h3>
              <p className="text-gray-600">Admin</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700">Member Since:</h3>
              <p className="text-gray-600">{User?.createdAt ? new Date(User.createdAt).toLocaleDateString() : "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
