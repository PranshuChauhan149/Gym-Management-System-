import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/Db.js';
import AdminRouter from './routes/auth.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import currentUserRoute from './routes/currentUser.js';
import AddNewMember from './routes/AddUser.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());



app.use(cors({
  origin:"https://gym-management-system-2jubohcpq.vercel.app",
  credentials:true
}));

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/admin", AdminRouter);
app.use("/api/admin", currentUserRoute);
app.use("/api/admin/new", AddNewMember);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDb();
  console.log("Server is running on this PORT " + PORT);
});

