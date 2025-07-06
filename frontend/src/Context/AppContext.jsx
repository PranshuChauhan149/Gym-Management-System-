import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Step 1: Create Context
const AppContext = createContext();

// Step 2: Provider Component
export const MyProvider = ({ children }) => {
  const [User, setUser] = useState(null);
  const [member, setMember] = useState(null);
  const server_Url = 'http://localhost:4000';  // 🔗 Your backend URL

  // ✅ Fetch Current Logged-in User
  const getCurrentUser = async () => {
    try {
      const res = await axios.get(`${server_Url}/api/admin/current`, {
        withCredentials: true,
      });

      if (res.data.success) {
        console.log("Current User:", res.data.user);
        setUser(res.data.user);
      } else {
        toast.error(res.data.message || "User Not Logged In");
      }
    } catch (error) {
      console.error("Error fetching current user:", error);
      toast.error("Failed to fetch current user");
    }
  };


  const Allmember = async () => {
  try {
    const res = await axios.get(`${server_Url}/api/admin/all-members`, {
      withCredentials: true,
    });

    console.log(res.data.members);
    setMember(res.data.members);  // Only set the actual members array
  } catch (error) {
    console.error("Error fetching current member:", error);
    toast.error("Failed to fetch current member");
  }
};

  return (
    <AppContext.Provider value={{ User, setUser, server_Url, member, setMember, getCurrentUser,Allmember }}>
      {children}
    </AppContext.Provider>
  );
};

// Step 3: Custom Hook for Easier Usage
export const useMyContext = () => useContext(AppContext);
