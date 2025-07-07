import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// ✅ Step 1: Create Context
const AppContext = createContext();

// ✅ Step 2: Provider Component
export const MyProvider = ({ children }) => {
  const [User, setUser] = useState(null);
  const [member, setMember] = useState([]);
  
  const server_Url = 'https://gym-management-system-backend-jdxv.onrender.com';  // 🌐 Backend URL

  // ✅ Fetch Current Logged-in User
  const getCurrentUser = async () => {
    try {
      const res = await axios.get(`${server_Url}/api/admin/current`, {
        withCredentials: true,
      });

      if (res.data.success) {
        console.log("✅ Current User:", res.data.user);
        setUser(res.data.user);
      } else {
        toast.error(res.data.message || "User not logged in");
        setUser(null);
      }
    } catch (error) {
      console.error("❌ Error fetching current user:", error);
      toast.error("Failed to fetch current user");
      setUser(null);
    }
  };

  // ✅ Fetch All Members
  const Allmember = async () => {
    try {
      const res = await axios.get(`${server_Url}/api/admin/all-members`, {
        withCredentials: true,
      });

      console.log("✅ All Members:", res.data.members);
      setMember(res.data.members || []);
    } catch (error) {
      console.error("❌ Error fetching members:", error);
      toast.error("Failed to fetch members");
      setMember([]);
    }
  };

  return (
    <AppContext.Provider value={{
      User,
      setUser,
      server_Url,
      member,
      setMember,
      getCurrentUser,
      Allmember
    }}>
      {children}
    </AppContext.Provider>
  );
};

// ✅ Step 3: Custom Hook
export const useMyContext = () => useContext(AppContext);
