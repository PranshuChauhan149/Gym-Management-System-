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

// ✅ Multiple Origins Allowed
// const allowedOrigins = [
//   'http://localhost:5173',
//   'https://gym-management-system-frontend.onrender.com'
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true
// }));

const allowedOrigins = [
  'http://localhost:5173',   // Dev frontend
  'https://gym-management-system-frontend.onrender.com'  // Deployed frontend
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
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
