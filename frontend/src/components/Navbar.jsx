import React, { useState } from "react";
import gym_logo from "../assets/black_gym.jpeg";
import { IoNotificationsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const { server_Url, setUser ,getCurrentUser,member,User} = useMyContext();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

    const today = new Date();
  
    const expiredMembers = member?.filter(m => {
      const endDate = new Date(m.membership?.endDate);
      return endDate < today;
    }) || [];
  
 const handleLogout = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(`${server_Url}/api/admin/logout`, {}, { withCredentials: true });

    if (res.data.success) {
      setUser(null);
      toast.success(res.data.message);
      navigate("/login");  // ✅ Redirect to login page
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};

  return (
    <div className="flex h-[70px] bg-[#ba701a33] justify-between items-center px-4 lg:px-20 shadow-md">
      {/* Logo & Greeting */}
      <div className="flex items-center gap-3 lg:gap-8">
        <img
          src={gym_logo}
          alt="Gym Logo"
          className="w-14 h-14 object-cover rounded-full    shadow-sm shadow-black"
          onClick={() => navigate("/")}
        />
        <div className="flex flex-col">
          <p className="text-base lg:text-2xl font-bold text-gray-800">
            FITNESS GYM
          </p>
          <p className="text-sm lg:text-lg text-gray-700"> {User.username}</p>
        </div>
      </div>

      {/* Notification & Profile */}
      <div className="flex items-center gap-5 lg:gap-8 relative ">
        <IoNotificationsOutline className="text-2xl text-gray-800 cursor-pointer hover:scale-110 transition-transform  bg-white rounded-full  p-2 w-10 h-10 shadow-lg shadow-black"  onClick={()=>navigate("/expired-members")}/>
       {
      expiredMembers.length !==0 ? <div className="w-2.5 h-2.5 rounded-full bg-red-600 absolute right-15 lg:right-18 bottom-0"></div> : ""
      }

        <div
          className="w-10 h-10 shadow-black bg-red-600 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform cursor-pointer relative"
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <span className="text-white font-semibold ">P</span>

          {showMenu && (
            <div className="absolute right-0 top-12 rounded-lg bg-white shadow-lg w-[140px] py-3 flex flex-col gap-2 text-gray-700 text-sm z-70 ">
              <p className="px-4 py-1 hover:bg-gray-100 w-full cursor-pointer">
                {User.username}
              </p>
              <p
                className="px-4 py-1 hover:bg-gray-100 w-full cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                Profile
              </p>
              <p
                onClick={handleLogout}
                className="px-4 py-1 hover:bg-gray-100 w-full cursor-pointer"
              >
                Logout
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
