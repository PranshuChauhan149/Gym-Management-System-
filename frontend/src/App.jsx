import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Route, Routes, useNavigate, Navigate, useParams } from "react-router-dom";
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
import axios from "axios";
import ExpiringIn4To7Days from "./pages/ExpiringIn3to7Days";
import ExpiredMember from "./pages/ExpiredMember";
import RenewPage from "./pages/RenewPage";
import MemberDetails from "./pages/MemberDetails";
import DeleteMember from "./pages/DeleteMember";
import EditMember from "./pages/EditMember";

const App = () => {
  
  const { User, server_Url, getCurrentUser,Allmember,member } = useMyContext();
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser();
    Allmember();
   
  }, []);  
  useEffect(() => {
    if (!User) {
      navigate('/login'); 
    }
  }, [User, navigate]);  

  return (
    <div className="bg-gradient-to-br from-orange-50 to-yellow-100 min-h-screen flex flex-col">
      {/* ✅ ToastContainer should be inside the return */}
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex-1">
        <Routes>
          <Route
            path="/login"
            element={!User ? <Login /> : <Navigate to="/" replace />}
          />
          <Route
            path="/Signup"
            element={!User ? <Signup /> : <Navigate to="/" replace />}
          />

          <Route
            path="/"
            element={User ? <Home /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/Joined-members"
            element={
              User ? <JoinedMembers /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/monthly-Joined"
            element={
              User ? <MonthlyJoined /> : <Navigate to="/login" replace />
            }
          />
          {/* <Route
            path="/profile"
            element={
              User ? <AdminProfile /> : <Navigate to="/login" replace />
            }
          /> */}
          <Route
            path="/edit-member/:editid"
            element={
              User ? <EditMember /> : <Navigate to="/login" replace />
            }
          />
          <Route
           path="renew/:id"
            element={
              User ? <RenewPage /> : <Navigate to="/login" replace />
            }
          />
          <Route
           path="detail/:memberid"
            element={
              User ? <MemberDetails /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/expiring-in-3-days"
            element={
              User ? <ExpiringIn3Days /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/expiring-in-4-to-7-days"
            element={
              User ? <ExpiringIn4To7Days /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/expired-members"
            element={
              User ? <ExpiredMember /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/inactive-members"
            element={
              User ? <DeleteMember /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/add-member"
            element={User ? <AddMember /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </div>

      {User && (
        <div
          onClick={() => navigate("/add-member")}
          className="fixed bottom-10 right-10 bg-orange-500 w-15 h-15 rounded-full shadow-lg shadow-black cursor-pointer flex items-center justify-center"
        >
          <IoMdPersonAdd className="text-2xl text-white font-extrabold" />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default App;
