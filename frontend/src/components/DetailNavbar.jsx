import React, { useState } from "react";
import gym_logo from "../assets/black_gym.jpeg";
import { IoNotificationsOutline, IoSearchOutline, IoMenu, IoClose } from "react-icons/io5";
import { useNavigate, NavLink } from "react-router-dom";
import { useMyContext } from "../Context/AppContext";

const Navbar = () => {
  const { member } = useMyContext();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const today = new Date();

  const expiredMembers = member?.filter((m) => {
    const endDate = new Date(m.membership?.endDate);
    return endDate < today;
  }) || [];

  const filteredMembers = member?.filter((m) =>
    m.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.phone?.includes(searchTerm)
  ) || [];

  const handleLogout = () => {
    // Add your logout logic here if needed
  };

  return (
    <div className="flex h-[70px] bg-[#dd903733] justify-between items-center px-4 lg:px-20 shadow-md relative">
      <div className="flex items-center gap-3 lg:gap-8">
        <img
          src={gym_logo}
          alt="Gym Logo"
          className="w-12 h-12 object-cover rounded-full shadow-sm cursor-pointer"
          onClick={() => navigate("/")}
        />
        <p className="text-lg lg:text-2xl font-bold text-gray-800">THE GYM</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="md:hidden">
          {showSearch ? (
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white rounded-lg px-3 py-1 shadow-inner text-sm text-gray-700 placeholder-gray-500 outline-none"
              onBlur={() => setShowSearch(false)}
              autoFocus
            />
          ) : (
            <IoSearchOutline
              className="text-2xl text-gray-800 cursor-pointer"
              onClick={() => setShowSearch(true)}
            />
          )}
        </div>

        <div className="hidden md:flex items-center bg-white rounded-lg px-3 py-1 shadow-inner">
          <IoSearchOutline className="text-gray-500 text-lg mr-2" />
          <input
            type="text"
            placeholder="Search Members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none text-sm placeholder-gray-500 text-gray-700 bg-transparent"
          />
        </div>

        <button
          onClick={() => navigate("/add-member")}
          className="hidden md:inline-block bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition"
        >
          + Add Member
        </button>

        <div className="relative">
          <IoNotificationsOutline
            className="text-2xl text-gray-800 cursor-pointer hover:scale-110 transition-transform bg-white rounded-full p-2 w-10 h-10 shadow-lg shadow-black"
            onClick={() => navigate("/expired-members")}
          />
          {expiredMembers.length !== 0 && (
            <div className="w-2.5 h-2.5 rounded-full bg-red-600 absolute bottom-0"></div>
          )}
        </div>

        {/* Menu Icon for Mobile */}
        <div className="md:hidden">
          {mobileMenu ? (
            <IoClose
              className="text-3xl text-gray-800 cursor-pointer"
              onClick={() => setMobileMenu(false)}
            />
          ) : (
            <IoMenu
              className="text-3xl text-gray-800 cursor-pointer"
              onClick={() => setMobileMenu(true)}
            />
          )}
        </div>
      </div>

      {mobileMenu && (
        <div className="absolute top-[70px] left-0 w-full bg-white shadow-lg z-50 flex flex-col gap-5 p-6 text-gray-800 font-medium lg:hidden">
          <NavLink to="/Joined-members" onClick={() => setMobileMenu(false)} className={({ isActive }) => isActive ? "text-orange-600 font-semibold" : ""}>Joined Members</NavLink>
          <NavLink to="/monthly-Joined" onClick={() => setMobileMenu(false)} className={({ isActive }) => isActive ? "text-orange-600 font-semibold" : ""}>Monthly Joined</NavLink>
          <NavLink to="/expiring-in-3-days" onClick={() => setMobileMenu(false)} className={({ isActive }) => isActive ? "text-orange-600 font-semibold" : ""}>Expiring in 3 Days</NavLink>
          <NavLink to="/expiring-in-4-to-7-days" onClick={() => setMobileMenu(false)} className={({ isActive }) => isActive ? "text-orange-600 font-semibold" : ""}>Expiring 4-7 Days</NavLink>
          <NavLink to="/expired-members" onClick={() => setMobileMenu(false)} className={({ isActive }) => isActive ? "text-orange-600 font-semibold" : ""}>Expired</NavLink>
          <NavLink to="/inactive-members" onClick={() => setMobileMenu(false)} className={({ isActive }) => isActive ? "text-orange-600 font-semibold" : ""}>Inactive</NavLink>
          <NavLink to="/add-member" onClick={() => setMobileMenu(false)} className={({ isActive }) => isActive ? "text-orange-600 font-semibold" : ""}>Add Member</NavLink>
          <span onClick={() => { setMobileMenu(false); handleLogout(); }} className="cursor-pointer hover:text-red-500">Logout</span>
        </div>
      )}

      {searchTerm && filteredMembers.length > 0 && (
        <div className="absolute top-16 right-8 bg-white border rounded-lg shadow-lg max-h-64 overflow-y-auto w-60 z-50">
          {filteredMembers.map((m) => (
            <div
              key={m._id}
              onClick={() => {
                navigate(`/detail/${m._id}`);
                setSearchTerm("");
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
            >
              {m.name} — {m.phone}
            </div>
          ))}
        </div>
      )}

      {searchTerm && filteredMembers.length === 0 && (
        <div className="absolute top-16 right-8 bg-white border rounded-lg shadow-lg w-60 p-4 text-sm text-gray-500">
          No members found.
        </div>
      )}
    </div>
  );
};

export default Navbar;
