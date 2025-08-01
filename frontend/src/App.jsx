import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { IoMdPersonAdd } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import backgroundImage from "../src/assets/backgroundImage.png";

import JoinedMembers from "./pages/JoinedMembers";
import AddMember from "./pages/AddMember";
import Footer from "./components/Footer";
import MonthlyJoined from "./pages/MontlyJoined";
import ExpiringIn3Days from "./pages/ExpiringIn3Days";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import { useMyContext } from "./Context/AppContext";
import ExpiringIn4To7Days from "./pages/ExpiringIn3to7Days";
import ExpiredMember from "./pages/ExpiredMember";
import RenewPage from "./pages/RenewPage";
import MemberDetails from "./pages/MemberDetails";
import DeleteMember from "./pages/DeleteMember";
import EditMember from "./pages/EditMember";

const App = () => {
  const { User, getCurrentUser, Allmember } = useMyContext();
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser();
    Allmember();
  }, []);

  return (
    <div
      className="bg-gradient-to-br from-orange-50 to-yellow-100 min-h-screen flex flex-col"
      
    >
      <ToastContainer position="top-right" autoClose={3000} />

      

      <div className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={User ? <Navigate to="/" replace /> : <Login />}
          />
          <Route
            path="/signup"
            element={User ? <Navigate to="/" replace /> : <Signup />}
          />

          {/* Protected Routes */}
          <Route
            path="/"
            element={User ? <Home /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/joined-members"
            element={User ? <JoinedMembers /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/monthly-joined"
            element={User ? <MonthlyJoined /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/edit-member/:editid"
            element={User ? <EditMember /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/renew/:id"
            element={User ? <RenewPage /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/detail/:memberid"
            element={User ? <MemberDetails /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/expiring-in-3-days"
            element={User ? <ExpiringIn3Days /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/expiring-in-4-to-7-days"
            element={User ? <ExpiringIn4To7Days /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/expired-members"
            element={User ? <ExpiredMember /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/inactive-members"
            element={User ? <DeleteMember /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/add-member"
            element={User ? <AddMember /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </div>

      {/* Floating Add Member Button */}
      {User && (
        <div
          onClick={() => navigate("/add-member")}
          className="fixed bottom-10 right-10 bg-orange-500 w-14 h-14 rounded-full shadow-lg cursor-pointer flex items-center justify-center"
        >
          <IoMdPersonAdd className="text-2xl text-white font-extrabold" />
        </div>
      )}

      {User && <Footer />}
    </div>
  );
};

export default App;
